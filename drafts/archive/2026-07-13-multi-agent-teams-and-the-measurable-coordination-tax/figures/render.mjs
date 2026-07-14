// Render all figure HTMLs in this directory to 2x PNGs in static/img/blog/{slug}/.
// Uses the project's playwright; fonts load from the local fonts.css cache (file://, no network).
import { chromium } from 'playwright';
import { readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const here = dirname(fileURLToPath(import.meta.url));
const slug = '2026-07-13-multi-agent-teams-and-the-measurable-coordination-tax';
const outDir = resolve(here, '../../../static/img/blog/', slug);

const files = readdirSync(here).filter((f) => f.endsWith('.html')).sort();
const browser = await chromium
  .launch({ executablePath: '/opt/pw-browsers/chromium' })
  .catch(() => chromium.launch());

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
