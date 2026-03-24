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

// WeChat inline styles
const S = {
  body: 'font-size:16px;line-height:1.8;color:#333;word-wrap:break-word;',
  h1: 'font-size:24px;font-weight:bold;margin:32px 0 16px;color:#1a1a1a;',
  h2: 'font-size:22px;font-weight:bold;margin:28px 0 14px;color:#1a1a1a;border-bottom:2px solid #2563eb;padding-bottom:8px;',
  h3: 'font-size:18px;font-weight:bold;margin:24px 0 12px;color:#1a1a1a;',
  h4: 'font-size:16px;font-weight:bold;margin:20px 0 10px;color:#1a1a1a;',
  p: 'margin:16px 0;text-align:justify;',
  strong: 'font-weight:bold;color:#2563eb;',
  em: 'font-style:italic;',
  a: 'color:#2563eb;text-decoration:none;',
  img: 'max-width:100%;height:auto;display:block;margin:16px auto;border-radius:6px;',
  blockquote: 'margin:16px 0;padding:12px 20px;background:#f7f8fa;border-left:4px solid #2563eb;color:#555;',
  code: 'background:#f0f2f5;padding:2px 6px;border-radius:3px;font-size:14px;font-family:Menlo,Monaco,Consolas,monospace;color:#c7254e;',
  pre: 'background:#282c34;color:#abb2bf;padding:16px;border-radius:8px;overflow-x:auto;margin:16px 0;font-size:13px;line-height:1.6;',
  precode: 'background:none;padding:0;border-radius:0;font-size:13px;font-family:Menlo,Monaco,Consolas,monospace;color:#abb2bf;',
  table: 'border-collapse:collapse;width:100%;margin:16px 0;font-size:14px;',
  th: 'border:1px solid #ddd;padding:10px 12px;background:#f7f8fa;font-weight:bold;text-align:left;',
  td: 'border:1px solid #ddd;padding:10px 12px;',
  ul: 'margin:16px 0;padding-left:2em;',
  ol: 'margin:16px 0;padding-left:2em;',
  li: 'margin:6px 0;',
  hr: 'border:none;border-top:1px solid #e5e7eb;margin:32px 0;',
  // Info box (for ℹ️ blocks)
  infobox: 'margin:16px 0;padding:12px 20px;background:#eef6ff;border-left:4px solid #2563eb;color:#333;border-radius:0 6px 6px 0;',
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
      return `<blockquote style="${S.blockquote}">${body}</blockquote>\n`;
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

function convertMarkdownToWeChatHTML(mdContent) {
  const marked = new Marked({ renderer: createRenderer() });
  const html = marked.parse(mdContent);
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
