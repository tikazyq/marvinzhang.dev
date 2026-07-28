// Reusable one-off screenshot helper for this repo.
//
// Why this exists: ad-hoc Playwright scripts keep re-hitting two papercuts —
//   (1) ERR_MODULE_NOT_FOUND when the script lives outside the project (Node
//       can't resolve `playwright`), so ALWAYS run it from within the repo, and
//   (2) the pinned Chromium mismatch, which needs an explicit executablePath
//       plus --no-sandbox in this environment.
// This wrapper bakes both fixes in. Prefer it over hand-writing a new script.
//
// Usage:
//   node scripts/screenshot.mjs <url-or-file> <out.png> [width] [height] [selector]
//
// Examples:
//   node scripts/screenshot.mjs static/wechat/foo.html /tmp/foo.png 390 1500
//   node scripts/screenshot.mjs https://example.com out.png 1280 800
//   node scripts/screenshot.mjs page.html el.png 960 1600 ".canvas"   # clip to selector
import { chromium } from 'playwright';
import { resolve } from 'path';

const [target, out, width = '960', height = '1200', selector] = process.argv.slice(2);
if (!target || !out) {
  console.error('usage: node scripts/screenshot.mjs <url-or-file> <out.png> [width] [height] [selector]');
  process.exit(1);
}
const url = /^https?:\/\//.test(target) ? target : 'file://' + resolve(target);

const browser = await chromium
  .launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] })
  .catch(() => chromium.launch({ args: ['--no-sandbox'] }));
const page = await browser.newPage({
  viewport: { width: Number(width), height: Number(height) },
  deviceScaleFactor: 2,
});
await page.goto(url, { waitUntil: 'networkidle' }).catch(() => page.goto(url, { waitUntil: 'load' }));
await page.waitForTimeout(800); // font-paint safety margin
if (selector) {
  await page.locator(selector).screenshot({ path: resolve(out) });
} else {
  await page.screenshot({ path: resolve(out), fullPage: true });
}
await browser.close();
console.log('screenshot ->', out);
