#!/usr/bin/env node

/**
 * X Articles export.
 *
 * Turns a blog post into a paste-ready page for X Articles (x.com/compose/articles).
 * X's editor takes rich text, not Markdown, so the output is an HTML page you
 * open in a browser, select, copy and paste into the article body.
 *
 * What X's editor can't take, and what this does instead:
 * - Pasted images: each image becomes an "[IMAGE n]" marker paragraph. Upload
 *   the files listed in the checklist at each marker (Insert → Media).
 * - SVG uploads: SVGs are rendered to PNG at 2x in static/img/blog/{post}/x/.
 * - Code blocks: become blockquotes (X has no code block).
 * - Tables: each row becomes a bullet ("**first cell**: header value; ...").
 * - H3+ beyond subheading: H2 stays a heading, H3 and deeper become subheadings.
 *
 * Usage:
 *   pnpm x <slug>          # both languages
 *   pnpm x <slug> --en     # English only
 *   pnpm x <slug> --zh     # Chinese only
 *
 * Output: static/x/{slug}-{locale}.html, served at marvinzhang.dev/x/... after
 * deploy. Open it in a normal desktop browser (an in-app file viewer may hand
 * X plain text), click Copy body, paste.
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const matter = require('gray-matter');
const glob = require('glob');
const { Marked } = require('marked');

const BLOG_DIRS = { en: 'blog', zh: 'i18n/zh/docusaurus-plugin-content-blog' };
const OUT_DIR = 'static/x';
const BASE_URL = 'https://marvinzhang.dev';

const args = process.argv.slice(2);
const slugArg = args.find((a) => !a.startsWith('-'));
const locales = args.includes('--en') ? ['en'] : args.includes('--zh') ? ['zh'] : ['en', 'zh'];

if (!slugArg || args.includes('--help') || args.includes('-h')) {
  console.log('Usage: pnpm x <slug> [--en|--zh]');
  process.exit(slugArg ? 0 : 1);
}

const escapeHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function findPost(locale) {
  const files = glob.sync(`${BLOG_DIRS[locale]}/*.{md,mdx}`);
  return files.find((f) => {
    const name = path.parse(f).name;
    const { data } = matter(fs.readFileSync(f, 'utf8'));
    return data.slug === slugArg || name === slugArg || name.endsWith(`-${slugArg}`);
  });
}

// Headless Chromium renders SVG → PNG. The browser build in the Playwright
// cache often doesn't match the pinned playwright package, so take any build
// found there; CHROMIUM_PATH overrides.
function chromiumPath() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  const cache = path.join(require('os').homedir(), '.cache/ms-playwright');
  return glob.sync(`${cache}/chromium_headless_shell-*/*/chrome-headless-shell`)
    .concat(glob.sync(`${cache}/chromium-*/*/chrome`))[0] || null;
}

function svgToPng(svgPath, pngPath) {
  const svg = fs.readFileSync(svgPath, 'utf8');
  const vb = svg.match(/viewBox="[\d.\s-]*?([\d.]+)\s+([\d.]+)"/);
  const [w, h] = vb ? [Math.ceil(+vb[1]), Math.ceil(+vb[2])] : [1200, 800];
  const exe = chromiumPath();
  if (!exe || !fs.existsSync(exe)) throw new Error('Playwright Chromium not found; set CHROMIUM_PATH');
  const html = path.resolve(pngPath + '.html');
  fs.writeFileSync(html, `<html><body style="margin:0;background:#fff"><img src="file://${path.resolve(svgPath)}" style="width:${w}px;height:${h}px;display:block"></body></html>`);
  try {
    execFileSync(exe, ['--headless', '--no-sandbox', '--hide-scrollbars', '--force-device-scale-factor=2',
      `--window-size=${w},${h}`, `--screenshot=${path.resolve(pngPath)}`, `file://${html}`], { stdio: 'pipe' });
  } finally {
    fs.rmSync(html, { force: true });
  }
}

function preprocess(md, locale) {
  const base = locale === 'zh' ? `${BASE_URL}/zh` : BASE_URL;
  return md
    .replace(/^import\s+.*$/gm, '')
    .replace(/^export\s+.*$/gm, '')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/:::(\w+)(?:[ \t]+(.+))?\n([\s\S]*?)\n:::/g, (m, type, title, body) =>
      `> **${title || type[0].toUpperCase() + type.slice(1)}**\n>\n` + body.split('\n').map((l) => `> ${l}`).join('\n'))
    // zh sources pad bold delimiters; CommonMark won't close `**text **`.
    .replace(/\*\*[ \t]*([^*\n]+?)[ \t]*\*\*/g, '**$1**')
    .replace(/\]\(\/blog\//g, `](${base}/blog/`);
}

function exportPost(locale) {
  const file = findPost(locale);
  if (!file) {
    console.error(`❌ ${locale}: no post matching "${slugArg}"`);
    return false;
  }
  const postName = path.parse(file).name;
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  const images = [];
  const warnings = [];

  const renderer = {
    heading({ tokens, depth }) {
      const tag = depth <= 2 ? 'h2' : 'h3';
      return `<${tag}>${this.parser.parseInline(tokens)}</${tag}>\n`;
    },
    image({ href, text }) {
      let local = href.startsWith('/') ? path.join('static', href) : null;
      if (local && local.endsWith('.svg')) {
        const pngDir = path.join('static/img/blog', postName, 'x');
        fs.mkdirSync(pngDir, { recursive: true });
        const png = path.join(pngDir, path.basename(local, '.svg') + '.png');
        svgToPng(local, png);
        local = png;
      }
      images.push({ n: images.length + 1, url: local ? '/' + path.relative('static', local) : href, alt: text });
      return `</p><p><strong>[IMAGE ${images.length}]</strong></p><p>`;
    },
    code({ text, lang }) {
      if (lang === 'mermaid') warnings.push('Mermaid block found: render it to PNG and upload it as an image.');
      const lines = escapeHtml(text).split('\n').join('<br>');
      return `<blockquote>${lines}</blockquote>\n`;
    },
    table({ header, rows }) {
      const heads = header.map((c) => this.parser.parseInline(c.tokens));
      const items = rows.map((row) => {
        const cells = row.map((c) => this.parser.parseInline(c.tokens));
        const rest = cells.slice(1).map((c, i) => `${heads[i + 1]}: ${c}`).join('; ');
        return `<li><strong>${cells[0].replace(/<\/?strong>/g, '')}</strong>: ${rest}</li>`;
      });
      return `<ul>\n${items.join('\n')}\n</ul>\n`;
    },
  };

  const marked = new Marked({ renderer });
  // No whitespace between block tags: X's editor turns each stray newline
  // between blocks into an empty paragraph.
  const body = marked.parse(preprocess(content, locale))
    .replace(/<p>\s*<\/p>/g, '')
    .replace(/>\s*\n\s*</g, '><');

  const postUrl = `${locale === 'zh' ? `${BASE_URL}/zh` : BASE_URL}/blog/${data.slug}`;
  const footer = locale === 'zh'
    ? `<p>本文首发于 <a href="${postUrl}">marvinzhang.dev</a>。</p>`
    : `<p>Originally published on <a href="${postUrl}">marvinzhang.dev</a>.</p>`;

  const cover = ['x/cover.png', 'wechat/cover.png']
    .map((p) => path.join('static/img/blog', postName, p))
    .find((p) => fs.existsSync(p));

  const link = (u) => `<a href="${escapeHtml(u)}" download>${escapeHtml(path.basename(u))}</a>`;
  const checklist = [
    `<li>Title: <code>${escapeHtml(data.title)}</code></li>`,
    `<li>Cover (5:2): ${cover ? link('/' + path.relative('static', cover)) : 'none found, add static/img/blog/' + postName + '/x/cover.png'}</li>`,
    ...images.map((im) => `<li>[IMAGE ${im.n}]: ${link(im.url)}</li>`),
    ...warnings.map((w) => `<li>⚠️ ${escapeHtml(w)}</li>`),
  ].join('\n');

  const page = `<!DOCTYPE html>
<html lang="${locale === 'zh' ? 'zh-CN' : 'en'}"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>X Article: ${escapeHtml(data.title)}</title>
<style>
body{font:16px/1.6 system-ui,sans-serif;max-width:680px;margin:24px auto;padding:0 16px}
#checklist{background:#f4f4f4;padding:12px 16px;border-radius:8px;margin-bottom:24px;word-break:break-all}
#body{border:1px dashed #bbb;padding:16px}
button{font-size:16px;padding:8px 14px}
</style></head><body>
<section id="checklist"><strong>X Article checklist</strong>
<ol>${checklist}</ol>
<p>Click <em>Copy body</em>, paste into the article body, then upload each image at its marker (Insert → Media) and delete the marker.</p>
<button id="copy">Copy body</button>
</section>
<article id="body">
${body}${footer}
</article>
<script>
// Put the article HTML on the clipboard explicitly. Copying a selection
// carries the page's computed styles, and some viewers hand over plain text
// only; either way X drops headings, bold and links.
const html = ${JSON.stringify(body + footer).replace(/</g, '\\u003c')};
document.getElementById('copy').onclick = (ev) => {
  const onCopy = (e) => {
    e.clipboardData.setData('text/html', html);
    e.clipboardData.setData('text/plain', document.getElementById('body').innerText);
    e.preventDefault();
  };
  document.addEventListener('copy', onCopy, { once: true });
  document.execCommand('copy');
  ev.target.textContent = 'Copied';
};
</script>
</body></html>
`;

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const out = path.join(OUT_DIR, `${data.slug}-${locale}.html`);
  fs.writeFileSync(out, page);
  console.log(`✅ ${locale}: ${out} (${images.length} images)`);
  warnings.forEach((w) => console.log(`   ⚠️  ${w}`));
  return true;
}

const ok = locales.map(exportPost).every(Boolean);
process.exit(ok ? 0 : 1);
