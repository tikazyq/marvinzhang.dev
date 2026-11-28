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
  /\$\$[\s\S]*?\$\$|\$(?![\d\s])[^$\n]+\$/g,
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
  if (!ADJACENCY.test(value)) return false;
  console.error(`${path.relative(process.cwd(), file)}:${line}${label}: missing space between Chinese and Latin text/digits`);
  console.error(`  ${value.trim()}`);
  return true;
}

function mask(text, pattern) {
  return text.replace(pattern, (m) => m.replace(/[^\n]/g, ' '));
}

function prose(line) {
  return PROTECTED.reduce((text, pattern) => mask(text, pattern), line);
}

function frontmatterValue(line) {
  const quoted = line.match(/^(title|description):(\s*)(["'])((?:\\.|(?!\3)[\s\S])*)\3([ \t]*(?:#.*)?)$/);
  if (quoted) return { key: quoted[1], value: quoted[4] };
  const unquoted = line.match(/^(title|description):(\s*)(.*)$/);
  if (!unquoted) return null;
  const comment = unquoted[3].match(/([ \t]+#.*)$/);
  return {
    key: unquoted[1],
    value: comment ? unquoted[3].slice(0, -comment[1].length) : unquoted[3],
  };
}

function fixFrontmatter(line) {
  const quoted = line.match(/^(title|description):(\s*)(["'])((?:\\.|(?!\3)[\s\S])*)\3([ \t]*(?:#.*)?)$/);
  if (quoted) {
    const fixed = spaceText(quoted[4]);
    return fixed === quoted[4] ? line : `${quoted[1]}:${quoted[2]}${quoted[3]}${fixed}${quoted[3]}${quoted[5]}`;
  }
  const unquoted = line.match(/^(title|description):(\s*)(.*)$/);
  if (!unquoted) return line;
  const comment = unquoted[3].match(/([ \t]+#.*)$/);
  const value = comment ? unquoted[3].slice(0, -comment[1].length) : unquoted[3];
  const fixed = spaceText(value);
  return fixed === value ? line : `${unquoted[1]}:${unquoted[2]}${fixed}${comment ? comment[1] : ''}`;
}

function transformWithComments(line, state) {
  let result = '';
  let offset = 0;
  let inComment = state.inComment;
  while (offset < line.length) {
    if (inComment) {
      const end = inComment === 'jsx' ? line.indexOf('*/}', offset) : line.indexOf('-->', offset);
      if (end < 0) return { line: result + line.slice(offset), inComment };
      result += line.slice(offset, end + 3);
      offset = end + 3;
      inComment = null;
      continue;
    }
    const jsxStart = line.indexOf('{/*', offset);
    const htmlStart = line.indexOf('<!--', offset);
    const starts = [jsxStart, htmlStart].filter((index) => index >= 0);
    if (starts.length === 0) {
      result += transformProse(line.slice(offset));
      break;
    }
    const start = Math.min(...starts);
    result += transformProse(line.slice(offset, start));
    const kind = start === jsxStart ? 'jsx' : 'html';
    const close = kind === 'jsx' ? '*/}' : '-->';
    const end = line.indexOf(close, start + 3);
    if (end < 0) {
      result += line.slice(start);
      inComment = kind;
      break;
    }
    result += line.slice(start, end + 3);
    offset = end + 3;
  }
  return { line: result, inComment };
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
      const fixed = fixFrontmatter(raw);
      if (fixed !== raw) { lines[i] = fixed; changed = true; }
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

    const transformed = transformWithComments(raw, { inComment: blockComment });
    blockComment = transformed.inComment;
    if (transformed.line !== raw) { lines[i] = transformed.line; changed = true; }
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
      const field = frontmatterValue(raw);
      if (field) {
        failed = report(field.value, file, i + 1, ` (${field.key})`) || failed;
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
