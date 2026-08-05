#!/usr/bin/env node

/**
 * Figure type-size validator.
 *
 * Why this exists
 * ---------------
 * A figure PNG fills the article column, so one image is delivered at 358px on
 * a phone and 738px on a wide desktop. The size written in the CSS is not the
 * size either reader sees:
 *
 *     phone   = font-size * 358 / canvas
 *     desktop = font-size * 738 / canvas
 *
 * Nobody performs that arithmetic while designing, which is how all 60 figures
 * in this repo came to put their smallest text at 4.5-5.7px effective on a
 * phone (median 5.2px). Nobody chose a 5px font.
 *
 * The correction then over-shot in the other direction: a uniform 1.6x scale
 * put the figure title at 36px on desktop against 18px body copy. So this
 * checks BOTH ends. A floor alone would have passed that.
 *
 * See .agents/skills/foundation/formatting/SKILL.md for the per-element rule.
 * There is no --fix: the remedy is per-element and usually needs copy cut to
 * pay for it, which is a judgment call.
 *
 * Usage:
 *   pnpm run validate:figure-type
 *   node scripts/validate-figure-type.js --file <path>
 *   node scripts/validate-figure-type.js --update-baseline
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DRAFTS = path.join(ROOT, 'drafts');
const BASELINE = path.join(__dirname, 'figure-type-baseline.json');

const PHONE = 358;   // article column on a 390px phone; ~公众号 too
const DESKTOP = 738; // article column on a wide desktop

/** Smallest text a reader should have to deal with, in phone px. */
const PHONE_FLOOR = 7.4;
/** Largest non-title text, in desktop px. Body copy is 18px; a figure is a
 *  supporting element and does not get to out-typeset the prose. */
const DESKTOP_CEILING = 18.5;
/** The title is allowed to exceed the ceiling, up to this, in desktop px. */
const TITLE_CEILING = 28.5;

function figureFiles() {
  const out = [];
  if (!fs.existsSync(DRAFTS)) return out;
  for (const slug of fs.readdirSync(DRAFTS)) {
    // Archived articles are published and frozen; re-rendering them risks
    // content drift for no reader benefit.
    if (slug === 'archive' || slug.startsWith('_')) continue;
    const dir = path.join(DRAFTS, slug, 'figures');
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (f.endsWith('.html')) out.push(path.join(dir, f));
    }
  }
  return out.sort();
}

/** Canvas width, and every declared size with the selector it came from. */
function parse(file) {
  const s = fs.readFileSync(file, 'utf8');
  const cw = Number((s.match(/\.canvas\s*\{[^}]*?width:\s*(\d+)px/) || [])[1]);
  if (!cw) return null;

  const sizes = [];
  // CSS declarations, tagged with the rule they sit in so the report can name it.
  const ruleRe = /([^{}]+)\{([^}]*)\}/g;
  let m;
  while ((m = ruleRe.exec(s)) !== null) {
    const sel = m[1].trim().split('\n').pop().trim();
    const decl = m[2];
    const fs_ = decl.match(/font-size:\s*([0-9.]+)px/);
    if (fs_) sizes.push({ where: sel, px: Number(fs_[1]), isTitle: /(^|\s|,)h1\b/.test(sel) });
  }
  // SVG font-size attributes are a separate syntax and get missed by any sweep
  // that only looks at CSS.
  const attrRe = /font-size="([0-9.]+)"/g;
  while ((m = attrRe.exec(s)) !== null) {
    sizes.push({ where: 'svg font-size attr', px: Number(m[1]), isTitle: false });
  }
  return { cw, sizes };
}

const rel = (p) => path.relative(ROOT, p);
const loadBaseline = () =>
  fs.existsSync(BASELINE) ? JSON.parse(fs.readFileSync(BASELINE, 'utf8')).files || {} : {};

function check(file) {
  const parsed = parse(file);
  if (!parsed) return null;
  const { cw, sizes } = parsed;
  const small = [];
  const big = [];
  for (const s of sizes) {
    const phone = (s.px * PHONE) / cw;
    const desktop = (s.px * DESKTOP) / cw;
    const ceiling = s.isTitle ? TITLE_CEILING : DESKTOP_CEILING;
    if (phone < PHONE_FLOOR) small.push({ ...s, phone, desktop });
    if (desktop > ceiling) big.push({ ...s, phone, desktop, ceiling });
  }
  return { cw, small, big };
}

function main() {
  const updating = process.argv.includes('--update-baseline');
  const idx = process.argv.indexOf('--file');
  let files = figureFiles();
  if (idx !== -1 && process.argv[idx + 1]) {
    const p = path.resolve(process.argv[idx + 1]);
    files = files.filter((f) => f === p);
  }
  if (!files.length) return;

  if (updating) {
    const recorded = {};
    for (const f of figureFiles()) {
      const r = check(f);
      if (r && (r.small.length || r.big.length)) {
        recorded[rel(f)] = { tooSmall: r.small.length, tooBig: r.big.length };
      }
    }
    fs.writeFileSync(
      BASELINE,
      JSON.stringify(
        {
          note:
            'Figures with type outside the band, grandfathered. Lower these ' +
            'numbers; never raise them. A figure with no entry must sit inside ' +
            'the band entirely.',
          updated: new Date().toISOString().split('T')[0],
          files: recorded,
        },
        null, 2
      ) + '\n',
      'utf8'
    );
    console.log(`✅ baseline updated — ${Object.keys(recorded).length} file(s) recorded`);
    return;
  }

  const baseline = loadBaseline();
  const report = [];
  for (const f of files) {
    const r = check(f);
    if (!r) continue;
    const allowed = baseline[rel(f)] || { tooSmall: 0, tooBig: 0 };
    if (r.small.length > allowed.tooSmall || r.big.length > allowed.tooBig) {
      report.push({ file: rel(f), ...r, allowed });
    }
  }

  if (!report.length) {
    if (idx === -1) {
      console.log('\n📐 图表字号检查\n');
      console.log(`✅ PASS — ${files.length} 张图，手机端 ≥${PHONE_FLOOR}px，桌面端不压过正文\n`);
    }
    return;
  }

  console.log('\n❌ 图表字号超出可读区间\n');
  for (const r of report) {
    console.log(`${r.file}  (画布 ${r.cw}px)`);
    for (const s of r.small) {
      console.log(`  手机上太小  ${String(s.px).padStart(5)}px → ${s.phone.toFixed(1)}px   ${s.where}`);
    }
    for (const s of r.big) {
      console.log(`  桌面上太大  ${String(s.px).padStart(5)}px → ${s.desktop.toFixed(1)}px   ${s.where}` +
                  `   (上限 ${s.ceiling}px)`);
    }
    console.log('');
  }
  console.log('----------------------------------------------------------------------');
  console.log(`一张图同时送到 ${PHONE}px（手机 / 公众号）和 ${DESKTOP}px（桌面），2.06 倍跨度。`);
  console.log('两端都要算：只看一端，就是 60 张图全部 5px 和后来标题 36px 的由来。');
  console.log('按元素调，别整体缩放；放大要靠删字来还高度，同时收 min-height。');
  console.log('规则：.agents/skills/foundation/formatting/SKILL.md');
  console.log('确属有意为之：pnpm run validate:figure-type:update-baseline');
  console.log('----------------------------------------------------------------------\n');
  process.exit(1);
}

main();
