#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { Marked } = require('marked');
const matter = require('gray-matter');
const glob = require('glob');
const { Prism, themes } = require('prism-react-renderer');

/**
 * Generate WeChat-compatible HTML from WeChat markdown files.
 * Outputs styled HTML with inline styles to static/wechat/<slug>.html
 *
 * Usage:
 *   node scripts/generate-wechat-html.js                # Process all
 *   node scripts/generate-wechat-html.js agent-landscape # Process specific slug
 */

const WECHAT_DIR = '.temp/wechat';
const DRAFTS_DIR = 'drafts';
const OUTPUT_DIR = 'static/wechat';
const BLOG_DIRS = ['blog', 'i18n/zh/docusaurus-plugin-content-blog'];

// WeChat inline styles — mdnice 风格，匹配已发布微信公众号文章样式
// Primary accent: rgb(53, 148, 247) / #3594F7
const S = {
  // NOTE: no quotes inside style values — nested double quotes terminate the
  // HTML style="..." attribute early and silently drop every declaration
  // after them. CSS allows unquoted multi-word font family names.
  body: 'font-family:Optima,PingFangSC-light,PingFangTC-light,PingFang SC,Hiragino Sans GB,Source Han Sans CN,Source Han Sans SC,serif;font-size:16px;line-height:1.5em;color:#000;word-break:break-word;overflow-wrap:break-word;text-align:left;padding:0 10px;',
  h1: 'font-size:24px;font-weight:600;margin:30px 0 15px;padding-bottom:10px;border-bottom:4px solid rgb(64,184,250);color:rgb(64,184,250);',
  h2: 'font-size:20px;font-weight:bold;margin:30px 0 15px;padding:0;color:rgb(64,184,250);background-color:transparent;border-bottom:4px solid rgb(64,184,250);line-height:1.5em;',
  h3: 'font-size:18px;font-weight:bold;margin:30px 0 15px;padding:0;color:rgb(43,43,43);line-height:1.5em;text-align:center;',
  h4: 'font-size:16px;font-weight:600;margin:20px 0 10px;color:rgb(43,43,43);',
  p: 'font-size:14px;line-height:1.8em;letter-spacing:0.02em;color:rgb(43,43,43);text-align:left;text-indent:0;margin:0;padding:8px 0;',
  strong: 'font-weight:bold;color:rgb(53,148,247);',
  em: 'font-style:italic;',
  img: 'max-width:100%;width:100%;height:auto;display:block;margin:0;',
  blockquote: 'margin:20px 0;padding:10px 10px 10px 20px;background-color:rgba(64,184,250,0.1);border:1px solid rgba(64,184,255,0.4);border-radius:8px;color:rgb(43,43,43);',
  blockquotep: 'margin:0;font-size:14px;line-height:1.8em;letter-spacing:0.02em;color:rgb(43,43,43);',
  code: 'background-color:rgba(27,31,35,0.05);padding:2px 4px;border-radius:3px;font-size:14px;font-family:Operator Mono,Consolas,Monaco,Menlo,monospace;color:rgb(53,148,247);letter-spacing:0;',
  pre: 'background-color:rgb(30,30,30);padding:15px;border-radius:5px;overflow-x:auto;margin:10px 0;',
  precode: 'background:none;padding:0;border-radius:0;font-size:13px;line-height:1.6;font-family:Operator Mono,Consolas,Monaco,Menlo,monospace;color:#abb2bf;white-space:pre-wrap;word-break:break-all;',
  table: 'width:100%;border-collapse:collapse;margin:10px 0;font-size:14px;',
  th: 'padding:5px 10px;text-align:left;border:1px solid rgba(204,204,204,0.4);background:rgb(240,240,240);color:rgb(89,89,89);font-weight:bold;font-size:14px;line-height:1.5em;letter-spacing:0.02em;min-width:85px;',
  td: 'padding:5px 10px;text-align:left;border:1px solid rgba(204,204,204,0.4);font-size:14px;line-height:1.5em;letter-spacing:0.02em;color:rgb(89,89,89);min-width:85px;',
  ul: 'padding-left:0;margin:8px 0;list-style:disc;',
  ol: 'padding-left:0;margin:8px 0;',
  li: 'margin-bottom:4px;font-size:14px;line-height:1.8em;letter-spacing:0.02em;color:rgb(43,43,43);',
  hr: 'border:none;border-top:2px solid rgba(64,184,250,0.4);margin:10px 0;',
  // Info box (for ℹ️ blocks)
  infobox: 'margin:20px 0;padding:10px 10px 10px 20px;background-color:rgba(64,184,250,0.1);border:1px solid rgba(64,184,255,0.4);border-radius:8px;color:rgb(43,43,43);',
  // Real anchors are emitted ONLY for WeChat-internal (mp.weixin.qq.com)
  // links — WeChat rejects <a> tags pointing outside WeChat.
  a: 'color:rgb(53,148,247);text-decoration:none;',
  // Reference label (former external in-text link) + its superscript [n]
  // marker — link-blue text, no anchor.
  ref: 'color:rgb(53,148,247);',
  sup: 'color:rgb(53,148,247);font-size:11px;',
};

// --- Syntax highlighting (inline styles only — WeChat strips classes/CSS) ---
// Token colors come from prism-react-renderer's oneDark theme, which matches
// the code block's rgb(30,30,30) background and #abb2bf base color.

function hslToRgb(value) {
  // WeChat clients handle rgb() more reliably than hsl(); convert eagerly.
  return value.replace(/hsl\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)/g, (m, h, s, l) => {
    h = +h / 360; s = +s / 100; l = +l / 100;
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const f = (t) => {
      t = ((t % 1) + 1) % 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const [r, g, b] = [f(h + 1 / 3), f(h), f(h - 1 / 3)].map((x) => Math.round(x * 255));
    return `rgb(${r},${g},${b})`;
  });
}

const TOKEN_STYLES = (() => {
  const map = {};
  for (const { types, style } of themes.oneDark.styles) {
    const css = Object.entries(style)
      .map(([k, v]) => `${k.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase())}:${hslToRgb(String(v))}`)
      .join(';');
    for (const t of types) map[t] = css;
  }
  return map;
})();

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderPrismTokens(tokens) {
  let out = '';
  for (const tok of tokens) {
    if (typeof tok === 'string') {
      out += escapeHtml(tok);
      continue;
    }
    const inner = Array.isArray(tok.content)
      ? renderPrismTokens(tok.content)
      : escapeHtml(String(tok.content));
    const aliases = [].concat(tok.alias || []);
    const css = [tok.type, ...aliases].map((t) => TOKEN_STYLES[t]).find(Boolean);
    out += css ? `<span style="${css}">${inner}</span>` : inner;
  }
  return out;
}

function highlightCode(code, lang) {
  // The Prism build vendored by prism-react-renderer covers js/ts/jsx/tsx,
  // go, rust, python, c/cpp, css, yaml, sql, json, md… — but NOT bash or
  // csharp; unsupported languages fall back to unhighlighted text.
  const grammar = Prism.languages[(lang || '').trim().toLowerCase()];
  if (!grammar) return escapeHtml(code);
  try {
    return renderPrismTokens(Prism.tokenize(code, grammar));
  } catch {
    return escapeHtml(code);
  }
}

function createRenderer() {
  const renderer = {
    heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens);
      const style = S[`h${depth}`] || S.h4;
      return `<h${depth} style="${style}">${text}</h${depth}>\n`;
    },
    paragraph({ tokens }) {
      const text = this.parser.parseInline(tokens);
      return `<p style="${S.p}">${text}</p>\n`;
    },
    strong({ tokens }) {
      const text = this.parser.parseInline(tokens);
      return `<strong style="${S.strong}">${text}</strong>`;
    },
    em({ tokens }) {
      const text = this.parser.parseInline(tokens);
      return `<em style="${S.em}">${text}</em>`;
    },
    link({ href, tokens }) {
      const text = this.parser.parseInline(tokens);
      // WeChat rejects <a> tags pointing outside WeChat but allows internal
      // ones, so mp.weixin.qq.com links stay real anchors. Everything else:
      // raw URLs that GFM autolinked (label === href) become plain copyable
      // text; labeled links keep the link-blue pseudo-link look.
      if (/^https?:\/\/mp\.weixin\.qq\.com\//.test(href)) {
        return `<a style="${S.a}" href="${href}">${text}</a>`;
      }
      if (text === href) return text;
      return `<span style="${S.ref}">${text}</span>`;
    },
    image({ href, text }) {
      return `<img style="${S.img}" src="${href}" alt="${text || ''}" />\n`;
    },
    blockquote({ tokens }) {
      const body = this.parser.parse(tokens);
      // Only replace <p> styles inside blockquotes, preserve other element styles (links, strong, etc.)
      const tightBody = body.replace(/<p style="[^"]*">/g, `<p style="${S.blockquotep}">`);
      return `<blockquote style="${S.blockquote}">${tightBody}</blockquote>\n`;
    },
    code({ text, lang }) {
      return `<pre style="${S.pre}"><code style="${S.precode}">${highlightCode(text, lang)}</code></pre>\n`;
    },
    codespan({ text }) {
      return `<code style="${S.code}">${text}</code>`;
    },
    table({ header, rows }) {
      let html = `<table style="${S.table}">\n<thead>\n<tr>\n`;
      for (const cell of header) {
        const text = this.parser.parseInline(cell.tokens);
        html += `<th style="${S.th}">${text}</th>\n`;
      }
      html += '</tr>\n</thead>\n<tbody>\n';
      for (const row of rows) {
        html += '<tr>\n';
        for (const cell of row) {
          const text = this.parser.parseInline(cell.tokens);
          html += `<td style="${S.td}">${text}</td>\n`;
        }
        html += '</tr>\n';
      }
      html += '</tbody>\n</table>\n';
      return html;
    },
    list({ ordered, items }) {
      const tag = ordered ? 'ol' : 'ul';
      const style = ordered ? S.ol : S.ul;
      let body = '';
      for (const item of items) {
        body += this.listitem(item);
      }
      return `<${tag} style="${style}">${body}</${tag}>\n`;
    },
    listitem({ tokens }) {
      // Use parseInline-like approach: parse block tokens but strip wrapping <p> tags
      // to avoid double spacing (published WeChat articles use <section> inside <li>, not <p>)
      let text = this.parser.parse(tokens);
      // Remove wrapping <p> tags and their styles, keep inner content
      text = text.replace(/<p style="[^"]*">([\s\S]*?)<\/p>/g, '$1').trim();
      return `<li style="${S.li}">${text}</li>\n`;
    },
    hr() {
      return `<hr style="${S.hr}" />\n`;
    },
  };
  return renderer;
}

function findWeChatMarkdownFiles(slugFilter) {
  const files = [];

  // Check .temp/wechat/
  const tempFiles = glob.sync(`${WECHAT_DIR}/*-wechat.md`);
  for (const f of tempFiles) {
    const basename = path.basename(f);
    // Extract slug: 2026-03-23-agent-landscape-zh-wechat.md → agent-landscape
    const match = basename.match(/^\d{4}-\d{2}-\d{2}-(.+?)-(zh|en)-wechat\.md$/);
    if (match) {
      const slug = match[1];
      const locale = match[2];
      if (!slugFilter || slug.includes(slugFilter)) {
        files.push({ path: f, slug, locale });
      }
    }
  }

  // Check drafts/*/wechat-*.md
  const draftFiles = glob.sync(`${DRAFTS_DIR}/*/wechat-*.md`);
  for (const f of draftFiles) {
    const basename = path.basename(f);
    const match = basename.match(/^wechat-(zh|en)\.md$/);
    if (match) {
      const locale = match[1];
      // Derive slug from draft folder name (strip date prefix like 2025-11-27-)
      const draftFolder = path.basename(path.dirname(f));
      const slug = draftFolder.replace(/^\d{4}-\d{2}-\d{2}-/, '');
      if (!slugFilter || slug.includes(slugFilter)) {
        // Avoid duplicates (prefer draft version)
        const existing = files.findIndex(e => e.slug === slug && e.locale === locale);
        if (existing >= 0) {
          files[existing] = { path: f, slug, locale };
        } else {
          files.push({ path: f, slug, locale });
        }
      }
    }
  }

  return files;
}

function fixBoldMarkers(md) {
  // Fix spaces inside bold markers: `** text **`, `**text **`, `** text**` → `**text**`.
  // Content is restricted to non-asterisk chars so the regex consumes one balanced
  // pair at a time, left to right. The previous two-pass version required a space
  // after the opening ** and therefore skipped well-formed pairs — the engine then
  // matched from a CLOSING ** across to the NEXT pair's opening **, gluing the
  // space after bold (`。** 这`→`。**这`) and scrambling every following pair.
  return md.replace(/\*\*[ \t]*([^*\n]+?)[ \t]*\*\*/g, '**$1**');
}

function convertMarkdownToWeChatHTML(mdContent) {
  const fixed = fixBoldMarkers(mdContent);
  const marked = new Marked({ renderer: createRenderer() });
  let html = marked.parse(fixed);
  // wechat.js marks former in-text links with class="wx-ref"; WeChat strips
  // classes, so swap in inline styles here (same for the [n] superscripts).
  html = html
    .replace(/<span class="wx-ref">/g, `<span style="${S.ref}">`)
    .replace(/<sup>/g, `<sup style="${S.sup}">`);
  return `<section style="${S.body}">${html}</section>`;
}

function generateHTMLFile(wechatFile) {
  const content = fs.readFileSync(wechatFile.path, 'utf-8');
  // Strip frontmatter if present
  const { content: mdContent } = matter(content);
  const htmlBody = convertMarkdownToWeChatHTML(mdContent.trim());

  const outputName = wechatFile.locale === 'zh'
    ? `${wechatFile.slug}.html`
    : `${wechatFile.slug}-${wechatFile.locale}.html`;
  const outputPath = path.join(OUTPUT_DIR, outputName);

  // Wrap the inline-styled body in a minimal UTF-8 document so the file
  // renders correctly when opened directly (e.g. on mobile). Selecting-all and
  // copying still yields just the rendered <section> for pasting into 公众号.
  const lang = wechatFile.locale === 'zh' ? 'zh-CN' : 'en';
  const fullDoc = `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${wechatFile.slug}</title>
</head>
<body>
${htmlBody}
</body>
</html>
`;

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(outputPath, fullDoc, 'utf-8');

  return outputPath;
}

// Main
const slugFilter = process.argv.find((a, i) => i >= 2 && !a.startsWith('-')) || null;
const files = findWeChatMarkdownFiles(slugFilter);

if (files.length === 0) {
  console.log('No WeChat markdown files found.');
  process.exit(0);
}

console.log(`\n🔄 Generating WeChat HTML for ${files.length} file(s)...\n`);

const results = [];
for (const f of files) {
  try {
    const outputPath = generateHTMLFile(f);
    results.push(outputPath);
    console.log(`  ✅ ${f.slug} (${f.locale}) → ${outputPath}`);
  } catch (err) {
    console.error(`  ❌ ${f.slug} (${f.locale}): ${err.message}`);
  }
}

console.log(`\n📦 Generated ${results.length} HTML file(s) in ${OUTPUT_DIR}/\n`);
