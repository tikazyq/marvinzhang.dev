#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { Marked } = require('marked');
const matter = require('gray-matter');
const glob = require('glob');

/**
 * Generate WeChat-compatible HTML from WeChat markdown files.
 * Outputs styled HTML with inline styles to static/wechat/<slug>.html
 *
 * Usage:
 *   node scripts/generate-wechat-html.js                # Process all
 *   node scripts/generate-wechat-html.js agent-landscape # Process specific slug
 */

const WECHAT_DIR = '.temp/wechat';
const SPECS_DIR = 'specs';
const OUTPUT_DIR = 'static/wechat';
const BLOG_DIRS = ['blog', 'i18n/zh/docusaurus-plugin-content-blog'];

// WeChat inline styles — "极客蓝" (Geek Blue) theme
// Based on: https://github.com/openclaw/skills wechat-article-formatter-pro
const S = {
  body: 'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-size:16px;line-height:1.8;color:#333;word-wrap:break-word;max-width:677px;margin:0 auto;',
  h1: 'font-size:24px;font-weight:600;margin:30px 0 20px;padding-bottom:15px;border-bottom:3px solid #1890FF;color:#000;',
  h2: 'font-size:17px;font-weight:bold;margin:20px 0 12px;padding:12px 16px;color:#1890FF;background-color:#E6F7FF;border-radius:8px;border-left:4px solid #1890FF;text-align:justify;',
  h3: 'font-size:18px;font-weight:600;margin:25px 0 15px;color:#1890FF;',
  h4: 'font-size:16px;font-weight:600;margin:20px 0 10px;color:#1890FF;',
  p: 'margin:15px 0;text-align:justify;',
  strong: 'font-weight:600;color:#1890FF;',
  em: 'font-style:italic;',
  a: 'color:#1890FF;text-decoration:none;',
  img: 'max-width:100%;height:auto;display:block;margin:15px auto;border-radius:6px;',
  blockquote: 'margin:20px 0;padding:12px 15px;background:#E6F7FF;border-left:4px solid #1890FF;color:#666;border-radius:0 8px 8px 0;',
  blockquotep: 'margin:0;',
  code: 'background:#E6F7FF;padding:2px 6px;border-radius:3px;font-size:14px;font-family:"SF Mono",Monaco,Consolas,"Liberation Mono","Courier New",monospace;color:#1890FF;',
  pre: 'background:#282c34;padding:15px;border-radius:8px;overflow-x:auto;margin:20px 0;border-left:3px solid #1890FF;',
  precode: 'background:none;padding:0;border-radius:0;font-size:14px;line-height:1.6;font-family:"SF Mono",Monaco,Consolas,"Liberation Mono","Courier New",monospace;color:#abb2bf;',
  table: 'width:100%;border-collapse:collapse;margin:20px 0;font-size:14px;overflow:hidden;',
  th: 'padding:12px;text-align:left;border:1px solid #e0e0e0;background:#E6F7FF;color:#1890FF;font-weight:600;',
  td: 'padding:12px;text-align:left;border:1px solid #e0e0e0;',
  ul: 'padding-left:22px;margin:15px 0;',
  ol: 'padding-left:22px;margin:15px 0;',
  li: 'margin-bottom:8px;',
  hr: 'border:none;border-top:2px dashed #BAE0FF;margin:30px 0;',
  // Info box (for ℹ️ blocks)
  infobox: 'margin:20px 0;padding:12px 15px;background:#E6F7FF;border-left:4px solid #1890FF;color:#333;border-radius:0 8px 8px 0;',
};

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
      return `<a style="${S.a}" href="${href}">${text}</a>`;
    },
    image({ href, text }) {
      return `<img style="${S.img}" src="${href}" alt="${text || ''}" />\n`;
    },
    blockquote({ tokens }) {
      const body = this.parser.parse(tokens);
      // Replace paragraph margins inside blockquotes with tighter spacing
      const tightBody = body.replace(/style="[^"]*"/g, `style="${S.blockquotep}"`);
      return `<blockquote style="${S.blockquote}">${tightBody}</blockquote>\n`;
    },
    code({ text, lang }) {
      const escaped = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `<pre style="${S.pre}"><code style="${S.precode}">${escaped}</code></pre>\n`;
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
      const text = this.parser.parse(tokens);
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

  // Check specs/*/wechat-*.md
  const specFiles = glob.sync(`${SPECS_DIR}/*/wechat-*.md`);
  for (const f of specFiles) {
    const basename = path.basename(f);
    const match = basename.match(/^wechat-(zh|en)\.md$/);
    if (match) {
      const locale = match[1];
      // Derive slug from spec folder name (strip numeric prefix)
      const specFolder = path.basename(path.dirname(f));
      const slug = specFolder.replace(/^\d+-/, '');
      if (!slugFilter || slug.includes(slugFilter)) {
        // Avoid duplicates (prefer spec version)
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
  // Fix spaces inside bold markers: `** text **`, `**text **`, `** text**` → `**text**`
  // Standard markdown requires no spaces adjacent to ** delimiters
  return md.replace(/\*\*\s+(.*?)\s*\*\*/g, '**$1**')
           .replace(/\*\*\s*(.*?)\s+\*\*/g, '**$1**');
}

function convertMarkdownToWeChatHTML(mdContent) {
  const fixed = fixBoldMarkers(mdContent);
  const marked = new Marked({ renderer: createRenderer() });
  const html = marked.parse(fixed);
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

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(outputPath, htmlBody, 'utf-8');

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
