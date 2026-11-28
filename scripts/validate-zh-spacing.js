#!/usr/bin/env node

/** Check Chinese prose for missing spaces next to Latin letters and digits. */
const fs = require('fs');
const path = require('path');

const ZH_DIR = path.join(__dirname, '..', 'i18n', 'zh', 'docusaurus-plugin-content-blog');
const flag = process.argv.indexOf('--file');
const specific = flag >= 0 ? process.argv[flag + 1] : null;
const autoFix = process.argv.includes('--fix');
const CJK = '\\u4e00-\\u9fff';
const ADJACENCY = new RegExp(`(?:[${CJK}][A-Za-z0-9]|[A-Za-z0-9][${CJK}])`, 'g');
const MISSING_SPACE = new RegExp(`([${CJK}])([A-Za-z0-9])|([A-Za-z0-9])([${CJK}])`, 'g');

const PROTECTED = [
  /`+[^`]*`+/g,
  /\]\([^)]*\)/g,
  /https?:\/\/[^\s)>]+/g,
  /\{\/\*[\s\S]*?\*\/\}/g,
  /<!--[\s\S]*?-->/g,
  /<[^>]*>/g,
  /\$[^$]*\$/g,
];

function spaceText(value) {
  return value.replace(MISSING_SPACE, (_, leftCjk, rightLatin, leftLatin, rightCjk) =>
    leftCjk ? `${leftCjk} ${rightLatin}` : `${leftLatin} ${rightCjk}`);
}

function transformProse(line) {
  const parts = [];
  let remainder = line;
  while (remainder) {
    let earliest = null;
    for (const pattern of PROTECTED) {
      pattern.lastIndex = 0;
      const match = pattern.exec(remainder);
      if (match && (!earliest || match.index < earliest.index)) earliest = { index: match.index, text: match[0] };
    }
    if (!earliest) { parts.push(spaceText(remainder)); break; }
    parts.push(spaceText(remainder.slice(0, earliest.index)), earliest.text);
    remainder = remainder.slice(earliest.index + earliest.text.length);
  }
  return parts.join('');
}

function report(value, file, line, label = '') {
  ADJACENCY.lastIndex = 0;
  let match;
  let failed = false;
  while ((match = ADJACENCY.exec(value)) !== null) {
    if (!failed) console.error(`${path.relative(process.cwd(), file)}:${line}${label}: missing space between Chinese and Latin text/digits`);
    console.error(`  ${value.trim()}`);
    failed = true;
  }
  return failed;
}

function mask(text, pattern) {
  return text.replace(pattern, (m) => m.replace(/[^\n]/g, ' '));
}

function prose(line) {
  return PROTECTED.reduce((text, pattern) => mask(text, pattern), line);
}

function fixFile(file) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  let inFrontmatter = lines[0]?.trim() === '---';
  let inFence = false;
  let fence = null;
  let blockComment = null;
  let changed = false;

  lines.forEach((raw, i) => {
    const trimmed = raw.trim();
    if (i === 0 && inFrontmatter) return;
    if (inFrontmatter) {
      if (trimmed === '---') { inFrontmatter = false; return; }
      const field = raw.match(/^(title|description):(\s*)(.*)$/);
      if (field) {
        const scalar = field[3];
        const quote = scalar[0] === '"' || scalar[0] === "'" ? scalar[0] : '';
        const quoted = quote && scalar.endsWith(quote);
        const value = quoted ? scalar.slice(1, -1) : scalar;
        const fixed = spaceText(value);
        if (fixed !== value) {
          lines[i] = `${field[1]}:${field[2]}${quote}${fixed}${quoted ? quote : ''}`;
          changed = true;
        }
      }
      return;
    }
    const fenceMatch = trimmed.match(/^(```+|~~~+)/);
    if (fenceMatch) {
      const marker = fenceMatch[1][0];
      if (!inFence) { inFence = true; fence = marker; }
      else if (marker === fence) { inFence = false; fence = null; }
      return;
    }
    if (inFence || /^\s*(?:import|export)\b/.test(raw)) return;

    let line = raw;
    if (blockComment) {
      const end = blockComment === 'jsx' ? line.indexOf('*/}') : line.indexOf('-->');
      if (end < 0) return;
      line = line.slice(end + 3);
      blockComment = null;
    }
    const commentStart = line.search(/\{\/\*|<!--/);
    if (commentStart >= 0) {
      const marker = line.slice(commentStart).startsWith('{/*') ? 'jsx' : 'html';
      const close = marker === 'jsx' ? '*/}' : '-->';
      if (!line.slice(commentStart).includes(close)) blockComment = marker;
      line = line.slice(0, commentStart);
    }
    const fixed = transformProse(line);
    if (fixed !== line) { lines[i] = fixed; changed = true; }
  });

  if (changed) fs.writeFileSync(file, lines.join('\n'));
}

function scan(file) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  let failed = false;
  let inFrontmatter = lines[0]?.trim() === '---';
  let inFence = false;
  let fence = null;
  let blockComment = null;

  lines.forEach((raw, i) => {
    const trimmed = raw.trim();
    if (i === 0 && inFrontmatter) return;
    if (inFrontmatter) {
      if (trimmed === '---') { inFrontmatter = false; return; }
      const field = raw.match(/^(title|description):\s*(.*)$/);
      if (field) {
        const scalar = field[2].replace(/^(?:"([^"]*)"|'([^']*)').*$/, (_, a, b) => a ?? b);
        failed = report(scalar, file, i + 1, ` (${field[1]})`) || failed;
      }
      return;
    }
    const fenceMatch = trimmed.match(/^(```+|~~~+)/);
    if (fenceMatch) {
      const marker = fenceMatch[1][0];
      if (!inFence) { inFence = true; fence = marker; }
      else if (marker === fence) { inFence = false; fence = null; }
      return;
    }
    if (inFence || /^\s*(?:import|export)\b/.test(raw)) return;

    let line = raw;
    if (blockComment) {
      const end = blockComment === 'jsx' ? line.indexOf('*/}') : line.indexOf('-->');
      if (end < 0) return;
      line = line.slice(end + (blockComment === 'jsx' ? 3 : 3));
      blockComment = null;
    }
    line = line.replace(/\{\/\*.*?\*\/\}/g, ' ').replace(/<!--.*?-->/g, ' ');
    const commentStart = line.search(/\{\/\*|<!--/);
    if (commentStart >= 0) {
      const marker = line.slice(commentStart).startsWith('{/*') ? 'jsx' : 'html';
      const close = marker === 'jsx' ? '*/}' : '-->';
      if (!line.slice(commentStart).includes(close)) blockComment = marker;
      line = line.slice(0, commentStart);
    }
    failed = report(prose(line), file, i + 1) || failed;
  });
  return failed;
}

const files = specific
  ? [path.resolve(specific)].filter((file) => path.dirname(file) === ZH_DIR && /\.mdx?$/.test(file) && fs.existsSync(file))
  : fs.readdirSync(ZH_DIR).filter((name) => /\.mdx?$/.test(name)).sort().map((name) => path.join(ZH_DIR, name));

if (autoFix) {
  for (const file of files) fixFile(file);
}

let failed = false;
for (const file of files) failed = scan(file) || failed;
if (failed) process.exitCode = 1;
