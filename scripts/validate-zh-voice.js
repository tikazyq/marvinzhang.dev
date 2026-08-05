#!/usr/bin/env node

/**
 * Chinese voice validator (AI-tell detection).
 *
 * Why this exists
 * ---------------
 * The author's hand-written articles (2019-2022, ~64,000 characters) contain
 * ZERO em dashes and ZERO "不是……而是……" constructions. Both crept in during the
 * AI-assisted era and climbed steadily: 3 dashes in 2025-02, 41 by 2025-10,
 * 94 by 2026-06. Nobody decided that; it drifted, one draft at a time, and no
 * amount of "remember the voice rules" catches a drift that slow.
 *
 * So the rule stops being a judgment call and becomes a condition. Files are
 * measured against a committed baseline: nothing may get worse, and any file
 * without a baseline entry must be clean. Legacy posts keep their history
 * instead of being retroactively rewritten.
 *
 * Usage:
 *   node scripts/validate-zh-voice.js                  # check
 *   node scripts/validate-zh-voice.js --update-baseline # re-record after an
 *                                                       # intentional change
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
 * See .agents/skills/foundation/writing-style/references/zh-voice.md.
 */
const RULES = [
  {
    id: 'em-dash',
    label: '破折号',
    pattern: /——/g,
    allowance: 0, // measured: 0 across ~64,000 characters of hand-written work
    hint: '作者手写文章从不用破折号。改用逗号、冒号、括号，或断成两句。',
  },
  {
    id: 'not-a-but-b',
    label: '不是……而是',
    pattern: /不是[^。！？\n]{0,25}而是/g,
    allowance: 1, // measured: the author uses it about once per article, to disambiguate
    hint: '作者自己也用，但一篇最多一次，且只用来澄清歧义（"这里不是说 X，而是 Y"）。' +
      '当成行文节奏反复用就露馅了，换「其实」「并不」「相反」，或拆成两句正着说。',
  },
  {
    id: 'qiaqia',
    label: '恰恰',
    pattern: /恰恰/g,
    allowance: 0, // measured: absent before 2025, then appears only in AI-assisted posts
    hint: '换成「偏偏」「正好」，或直接去掉。',
  },
  {
    id: 'rather-than',
    label: '与其说……不如说',
    pattern: /与其说[^。！？\n]{0,30}不如说/g,
    allowance: 0,
    hint: '书面腔。直接说结论，或用「说是 X，其实是 Y」。',
  },
];

/** Strip frontmatter, JSX/HTML comments and fenced code so only prose is measured. */
function proseOf(raw) {
  return raw
    .replace(/^---\n[\s\S]*?\n---\n/, '')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`\n]*`/g, '');
}

function countsFor(file) {
  const prose = proseOf(fs.readFileSync(file, 'utf8'));
  const counts = {};
  for (const rule of RULES) {
    const hits = prose.match(rule.pattern);
    if (hits && hits.length) counts[rule.id] = hits.length;
  }
  return counts;
}

function loadBaseline() {
  if (!fs.existsSync(BASELINE)) return {};
  return JSON.parse(fs.readFileSync(BASELINE, 'utf8')).files || {};
}

function main() {
  const updating = process.argv.includes('--update-baseline');
  const files = fs
    .readdirSync(ZH_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .sort();

  const current = {};
  for (const f of files) {
    const counts = countsFor(path.join(ZH_DIR, f));
    if (Object.keys(counts).length) current[f] = counts;
  }

  if (updating) {
    fs.writeFileSync(
      BASELINE,
      JSON.stringify(
        {
          note:
            'Recorded counts of AI-tell patterns per file. The check fails when a ' +
            'file exceeds its recorded count, or when a file with no entry has any ' +
            'hit at all. Lower these numbers; never raise them.',
          updated: new Date().toISOString().split('T')[0],
          files: current,
        },
        null,
        2
      ) + '\n',
      'utf8'
    );
    console.log(`✅ baseline updated — ${Object.keys(current).length} file(s) recorded`);
    return;
  }

  const baseline = loadBaseline();
  const failures = [];

  for (const f of files) {
    const counts = current[f] || {};
    const allowed = baseline[f] || {};
    for (const rule of RULES) {
      const got = counts[rule.id] || 0;
      // A file keeps whatever it already had (legacy posts aren't rewritten),
      // but a file with no history is held to the author's own rate.
      const max = Math.max(allowed[rule.id] || 0, rule.allowance);
      if (got > max) failures.push({ file: f, rule, got, max });
    }
  }

  console.log('\n📝 中文语感检查（AI 句式）\n');

  if (!failures.length) {
    const drifting = Object.keys(baseline).length;
    console.log(`✅ PASS — 无新增 AI 句式（${drifting} 个历史文件保留在基线内）\n`);
    return;
  }

  for (const { file, rule, got, max } of failures) {
    console.log(`❌ ${file}`);
    console.log(`   ${rule.label}：${got} 处，允许 ${max} 处`);
    console.log(`   💡 ${rule.hint}\n`);
  }

  console.log('======================================================================');
  console.log(`共 ${failures.length} 项超出基线。`);
  console.log('每条的允许量都是照作者手写文章（2019-2023）量出来的，不是拍脑袋定的。');
  console.log('完整替换对照表：.agents/skills/foundation/writing-style/references/zh-voice.md');
  console.log('如果确实是有意为之，运行 node scripts/validate-zh-voice.js --update-baseline');
  console.log('======================================================================\n');
  process.exit(1);
}

main();
