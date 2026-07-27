// Render all figure HTMLs in this directory to 2x PNGs in static/img/blog/{slug}/.
import { chromium } from 'playwright';
import { readdirSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const here = dirname(fileURLToPath(import.meta.url));
const slug = '2026-07-27-cheap-code-scarce-attention';
const outDir = resolve(here, '../../../static/img/blog/', slug);
mkdirSync(outDir, { recursive: true });

const files = readdirSync(here).filter((f) => f.endsWith('.html')).sort();
const browser = await chromium
  .launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] })
  .catch(() => chromium.launch({ args: ['--no-sandbox'] }));

const page = await browser.newPage({ viewport: { width: 960, height: 1600 }, deviceScaleFactor: 2 });
for (const f of files) {
  await page.goto('file://' + resolve(here, f), { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200); // font paint safety margin
  const el = page.locator('.canvas');
  const out = resolve(outDir, f.replace(/\.html$/, '.png'));
  await el.screenshot({ path: out });
  console.log('rendered', f, '->', out.split('/').pop());
}
await browser.close();
console.log('all rendered');
