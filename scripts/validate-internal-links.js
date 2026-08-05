#!/usr/bin/env node

/**
 * Internal cross-link validator for blog posts.
 *
 * Why this exists
 * ---------------
 * Two failures, both invisible on a read-through:
 *
 * 1. A link to a post that doesn't exist. Docusaurus is configured to warn
 *    rather than fail on broken links, so a typo'd slug ships silently.
 *
 * 2. A post that cites nothing the author has already written. Measured across
 *    the corpus (2026-08): the eight posts from 2026-04 onward carry 4 to 13
 *    distinct internal links each, median 5. The 41 posts before that carry
 *    zero — the habit started, and it's now part of how these pieces work,
 *    each link attached to a specific claim a prior post developed.
 *
 * The second one is what an agent drafting from research notes reliably misses.
 * It has the sources it just read in front of it and no memory of the archive,
 * so a finished draft can be well-sourced externally and orphaned internally.
 * Caught in review on the babysitting article: 1 distinct internal link where
 * four prior posts spoke directly to its claims.
 *
 * Output is written to be acted on by an agent that did not write this rule:
 * every finding carries a file, a line number where applicable, and what to do.
 *
 * Usage:
 *   pnpm run validate:internal-links                     # check every post
 *   node scripts/validate-internal-links.js --file <p>   # check one (hooks)
 *   node scripts/validate-internal-links.js --update-baseline
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const EN_DIR = path.join(ROOT, 'blog');
const ZH_DIR = path.join(ROOT, 'i18n', 'zh', 'docusaurus-plugin-content-blog');
const BASELINE = path.join(__dirname, 'internal-links-baseline.json');

/**
 * A new post below this many DISTINCT internal links gets flagged. Measured,
 * not invented: recent posts run 4-13. The floor sits under that range on
 * purpose — this is a prompt to go look, not a quota to pad out.
 */
const FLOOR = 3;

/** /blog/<slug> paths that are real pages but not posts. */
const NON_POST_PATHS = new Set(['archive', 'authors', 'tags', 'page']);

/** An explicit, recorded opt-out. The reason is required; a bare marker won't do. */
const OPT_OUT = /internal-links:\s*none\s*(?:—|--|-)\s*(\S.*)/;

const LINK = /\]\(\/blog\/([a-z0-9][a-z0-9-]*)/g;

function postFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .sort()
    .map((f) => path.join(dir, f));
}

/** Every slug that resolves to a post, taken from the EN files' frontmatter. */
function knownSlugs() {
  const slugs = new Set();
  for (const p of postFiles(EN_DIR)) {
    const text = fs.readFileSync(p, 'utf8');
    const m = text.match(/^slug:\s*(.+)$/m);
    const slug = m
      ? m[1].trim().replace(/^["']|["']$/g, '')
      : path.basename(p, '.mdx').replace(/^\d{4}-\d{2}-\d{2}-/, '');
    slugs.add(slug.replace(/^\//, ''));
  }
  return slugs;
}

/**
 * Collect internal links with line numbers, skipping frontmatter, comments and
 * fenced code. Self-links don't count: a post citing itself cites nothing.
 */
function scan(file) {
  const selfSlug = path.basename(file, '.mdx').replace(/^\d{4}-\d{2}-\d{2}-/, '');
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  const links = [];
  let optOut = null;

  let inFrontmatter = false;
  let inFence = false;
  let inComment = false;

  lines.forEach((rawLine, i) => {
    const lineNo = i + 1;
    const trimmed = rawLine.trim();

    const optMatch = rawLine.match(OPT_OUT);
    if (optMatch) optOut = optMatch[1].trim();

    if (lineNo === 1 && trimmed === '---') { inFrontmatter = true; return; }
    if (inFrontmatter) { if (trimmed === '---') inFrontmatter = false; return; }
    if (trimmed.startsWith('```')) { inFence = !inFence; return; }
    if (inFence) return;

    if (inComment) { if (/-->|\*\/\}/.test(rawLine)) inComment = false; return; }
    if (/^\s*(<!--|\{\/\*)/.test(rawLine)) {
      if (!/-->|\*\/\}/.test(rawLine)) inComment = true;
      return;
    }

    const line = rawLine
      .replace(/\{\/\*.*?\*\/\}/g, '')
      .replace(/<!--.*?-->/g, '')
      .replace(/`[^`]*`/g, '');

    LINK.lastIndex = 0;
    let m;
    while ((m = LINK.exec(line)) !== null) {
      const slug = m[1];
      if (NON_POST_PATHS.has(slug) || slug === selfSlug) continue;
      links.push({ slug, line: lineNo });
    }
  });

  return { links, distinct: new Set(links.map((l) => l.slug)), optOut };
}

function loadBaseline() {
  if (!fs.existsSync(BASELINE)) return {};
  return JSON.parse(fs.readFileSync(BASELINE, 'utf8')).files || {};
}

function key(file) {
  return `${path.dirname(file) === ZH_DIR ? 'zh' : 'en'}/${path.basename(file)}`;
}

function targetFiles() {
  const flagIndex = process.argv.indexOf('--file');
  if (flagIndex !== -1 && process.argv[flagIndex + 1]) {
    const p = path.resolve(process.argv[flagIndex + 1]);
    if (!fs.existsSync(p) || !p.endsWith('.mdx')) return [];
    const dir = path.dirname(p);
    if (dir !== EN_DIR && dir !== ZH_DIR) return [];
    return [p];
  }
  return [...postFiles(EN_DIR), ...postFiles(ZH_DIR)];
}

function main() {
  const updating = process.argv.includes('--update-baseline');
  const singleFile = process.argv.includes('--file');

  if (updating) {
    const recorded = {};
    for (const p of [...postFiles(EN_DIR), ...postFiles(ZH_DIR)]) {
      recorded[key(p)] = scan(p).distinct.size;
    }
    fs.writeFileSync(
      BASELINE,
      JSON.stringify(
        {
          note:
            'Distinct internal /blog/ links per post. A post may not drop below its ' +
            'recorded count, and a post with no entry (i.e. a new one) must reach the ' +
            'floor in scripts/validate-internal-links.js. Raise these numbers freely; ' +
            'lowering one means cross-links were removed.',
          updated: new Date().toISOString().split('T')[0],
          files: recorded,
        },
        null,
        2
      ) + '\n',
      'utf8'
    );
    console.log(`✅ baseline updated — ${Object.keys(recorded).length} file(s) recorded`);
    return;
  }

  const files = targetFiles();
  if (!files.length) return; // nothing in scope, stay quiet (hook-friendly)

  const slugs = knownSlugs();
  const baseline = loadBaseline();
  const broken = [];
  const thin = [];

  for (const p of files) {
    const name = path.relative(ROOT, p);
    const { links, distinct, optOut } = scan(p);

    for (const l of links) {
      if (!slugs.has(l.slug)) broken.push({ name, ...l });
    }

    const recorded = baseline[key(p)];
    const min = recorded === undefined ? FLOOR : Math.min(recorded, FLOOR);
    if (distinct.size < min && !optOut) {
      thin.push({ name, count: distinct.size, min, isNew: recorded === undefined });
    }
  }

  if (!broken.length && !thin.length) {
    if (!singleFile) {
      console.log('\n🔗 站内互链检查\n');
      console.log(`✅ PASS — ${files.length} 篇文章，无失效 slug，无孤立新文\n`);
    }
    return;
  }

  if (broken.length) {
    console.log('\n❌ 站内链接指向了不存在的文章\n');
    for (const b of broken) {
      console.log(`${b.name}:${b.line}  /blog/${b.slug}`);
    }
    console.log('\n  💡 怎么改：slug 以 blog/*.mdx 的 frontmatter 为准，不是文件名。');
    console.log('     Docusaurus 对失效链接只告警不报错，所以这类错误会一路发到线上。\n');
  }

  if (thin.length) {
    console.log('\n⚠️  这篇文章几乎没引用你自己写过的东西\n');
    for (const t of thin) {
      console.log(
        `${t.name} — ${t.count} 篇站内互链，${t.isNew ? `新文章至少 ${t.min} 篇` : `原有 ${t.min} 篇，不该变少`}`
      );
    }
    console.log('\n  💡 怎么改：翻一遍 blog/ 目录，找出跟本文某个具体论点直接对上的旧文，');
    console.log('     挂在那句话上，顺带用一句话说清它当时论证了什么。别为凑数硬塞。');
    console.log('     参考：2026-04 之后的八篇，每篇 4 到 13 条互链，中位数 5。');
    console.log('     写研究笔记的 agent 手里只有刚读的外部资料，对仓库里的旧文没有记忆，');
    console.log('     所以初稿常常外部引用很扎实、站内一条没有。');
    console.log('\n     确实无可引（比如开某个新话题的第一篇），在正文里写明原因：');
    console.log('     {/* internal-links: none — 第一篇讲 X，仓库里没有可引的前文 */}\n');
  }

  console.log('----------------------------------------------------------------------');
  console.log('基线：pnpm run validate:internal-links:update-baseline');
  console.log('----------------------------------------------------------------------\n');
  process.exit(1);
}

main();
