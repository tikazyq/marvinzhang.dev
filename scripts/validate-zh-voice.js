#!/usr/bin/env node

/**
 * Chinese voice validator (AI sentence-rhythm drift).
 *
 * Why this exists
 * ---------------
 * The author's hand-written articles (2019-2022, ~64,000 characters) contain
 * ZERO em dashes. AI-assisted posts climbed 3 → 41 → 94 per article over
 * eighteen months. Nobody decided that; it drifted one draft at a time, and no
 * amount of "remember the voice rules" catches a drift that slow.
 *
 * So the rule stops being a judgment call and becomes a condition. Files are
 * measured against a committed baseline: nothing may get worse, and a file with
 * no baseline entry is held to the author's own measured rate. Legacy posts keep
 * their history instead of being retroactively rewritten.
 *
 * Output is written to be *acted on by an agent that did not write this rule*:
 * every hit carries a file, a line number, the offending sentence, and what to
 * do instead. If you change the output, keep those four things.
 *
 * Usage:
 *   pnpm run validate:zh-voice                     # check every Chinese post
 *   node scripts/validate-zh-voice.js --file <p>   # check one file (hooks use this)
 *   node scripts/validate-zh-voice.js --update-baseline
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const ZH_DIR = path.join(ROOT, 'i18n', 'zh', 'docusaurus-plugin-content-blog');
const BASELINE = path.join(__dirname, 'zh-voice-baseline.json');

/**
 * Each rule is a pattern the author uses far less often than a drafting model
 * does. `allowance` is what a NEW file may contain, calibrated against the
 * author's own hand-written corpus (2019-2023) rather than invented.
 * See .agents/skills/foundation/writing-style/references/zh-voice.md 红线三.
 */
const RULES = [
  {
    id: 'em-dash',
    label: '破折号（——）',
    pattern: /——/g,
    allowance: 0, // measured: 0 across ~64,000 characters of hand-written work
    fix: '换成逗号或冒号；补充说明放进括号；本来就是两句话的直接断开。',
  },
  {
    id: 'not-a-but-b',
    label: '不是……而是',
    pattern: /不是[^。！？\n]{0,25}而是/g,
    allowance: 1, // measured: about once per article, always to disambiguate
    fix:
      '作者自己也用，但一篇最多一次，且只用来澄清一个具体误解' +
      '（「这里不是说 Go 无法构建通用框架，而是它没有 Java、C# 这么容易」）。' +
      '当行文节奏反复用就露馅。改写成「其实」「并不」「相反」，或拆成两句正着说。',
  },
  {
    id: 'qiaqia',
    label: '恰恰',
    pattern: /恰恰/g,
    allowance: 0, // measured: absent before 2025, appears only in AI-assisted posts
    fix: '换成「偏偏」「正好」，或直接删掉。',
  },
  {
    id: 'rather-than',
    label: '与其说……不如说',
    pattern: /与其说[^。！？\n]{0,30}不如说/g,
    allowance: 0,
    fix: '书面腔。直接说结论，或用「说是 X，其实是 Y」。',
  },
];

const RULES_BY_ID = Object.fromEntries(RULES.map((r) => [r.id, r]));

/**
 * Scan a file line by line so every hit keeps its real line number.
 * Frontmatter, JSX/HTML comments and fenced code are skipped: they are not prose.
 */
function scan(file) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  const hits = {};

  let inFrontmatter = false;
  let inFence = false;
  let inComment = false;

  lines.forEach((rawLine, i) => {
    const lineNo = i + 1;
    const trimmed = rawLine.trim();

    if (lineNo === 1 && trimmed === '---') { inFrontmatter = true; return; }
    if (inFrontmatter) { if (trimmed === '---') inFrontmatter = false; return; }
    if (trimmed.startsWith('```')) { inFence = !inFence; return; }
    if (inFence) return;

    if (inComment) { if (/-->|\*\/\}/.test(rawLine)) inComment = false; return; }
    if (/^\s*(<!--|\{\/\*)/.test(rawLine)) {
      if (!/-->|\*\/\}/.test(rawLine)) inComment = true;
      return;
    }

    // Drop inline comments and inline code before matching.
    const line = rawLine
      .replace(/\{\/\*.*?\*\/\}/g, '')
      .replace(/<!--.*?-->/g, '')
      .replace(/`[^`]*`/g, '');

    for (const rule of RULES) {
      rule.pattern.lastIndex = 0;
      let m;
      while ((m = rule.pattern.exec(line)) !== null) {
        (hits[rule.id] ||= []).push({
          line: lineNo,
          snippet: excerpt(line, m.index, m[0].length),
        });
      }
    }
  });

  return hits;
}

/** A short window around the match, with the match itself marked. */
function excerpt(line, index, length) {
  const before = line.slice(Math.max(0, index - 18), index);
  const match = line.slice(index, index + length);
  const after = line.slice(index + length, index + length + 22);
  const lead = index > 18 ? '…' : '';
  const tail = index + length + 22 < line.length ? '…' : '';
  return `${lead}${before}〖${match}〗${after}${tail}`;
}

function loadBaseline() {
  if (!fs.existsSync(BASELINE)) return {};
  return JSON.parse(fs.readFileSync(BASELINE, 'utf8')).files || {};
}

function targetFiles() {
  const flagIndex = process.argv.indexOf('--file');
  if (flagIndex !== -1 && process.argv[flagIndex + 1]) {
    const p = path.resolve(process.argv[flagIndex + 1]);
    if (!fs.existsSync(p)) return [];
    // Only Chinese blog posts are in scope.
    if (path.dirname(p) !== ZH_DIR || !p.endsWith('.mdx')) return [];
    return [p];
  }
  return fs
    .readdirSync(ZH_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .sort()
    .map((f) => path.join(ZH_DIR, f));
}

function main() {
  const updating = process.argv.includes('--update-baseline');
  const singleFile = process.argv.includes('--file');
  const files = targetFiles();

  if (!files.length) return; // nothing in scope, stay quiet (hook-friendly)

  if (updating) {
    const recorded = {};
    for (const p of fs.readdirSync(ZH_DIR).filter((f) => f.endsWith('.mdx')).sort()) {
      const hits = scan(path.join(ZH_DIR, p));
      const counts = {};
      for (const [id, list] of Object.entries(hits)) counts[id] = list.length;
      if (Object.keys(counts).length) recorded[p] = counts;
    }
    fs.writeFileSync(
      BASELINE,
      JSON.stringify(
        {
          note:
            'Recorded counts of AI sentence-rhythm patterns per file. The check fails ' +
            'when a file exceeds its recorded count, or when a file with no entry goes ' +
            'past the allowance measured from the author\'s own writing. Lower these ' +
            'numbers; never raise them.',
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

  const baseline = loadBaseline();
  const report = [];

  for (const p of files) {
    const name = path.basename(p);
    const hits = scan(p);
    const allowed = baseline[name] || {};
    for (const rule of RULES) {
      const list = hits[rule.id] || [];
      const max = Math.max(allowed[rule.id] || 0, rule.allowance);
      if (list.length > max) report.push({ name, rule, list, max });
    }
  }

  if (!report.length) {
    if (!singleFile) {
      console.log('\n📝 中文语感检查（AI 句式）\n');
      console.log(`✅ PASS — 无新增 AI 句式（${Object.keys(baseline).length} 个历史文件保留在基线内）\n`);
    }
    return;
  }

  console.log('\n❌ 中文语感检查未通过（AI 句式漂移）\n');

  for (const { name, rule, list, max } of report) {
    console.log(`${name} — ${rule.label}：${list.length} 处，允许 ${max} 处`);
    for (const hit of list) {
      console.log(`  第 ${hit.line} 行  ${hit.snippet}`);
    }
    console.log(`  💡 怎么改：${rule.fix}\n`);
  }

  console.log('----------------------------------------------------------------------');
  console.log('每条的允许量都是照作者手写文章（2019-2023）量出来的，不是拍脑袋定的。');
  console.log('这类句式靠通读很难发现，破折号在十八个月里从 0 涨到每篇 94 个也没人察觉。');
  console.log('替换对照表：.agents/skills/foundation/writing-style/references/zh-voice.md（红线三）');
  console.log('确属有意为之：pnpm run validate:zh-voice:update-baseline');
  console.log('----------------------------------------------------------------------\n');
  process.exit(1);
}

main();
