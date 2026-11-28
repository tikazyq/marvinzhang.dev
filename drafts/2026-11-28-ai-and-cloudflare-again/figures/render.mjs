// Render the bilingual article figures to crisp 2x PNGs under static/img/blog/.
import { chromium } from 'playwright';
import { mkdirSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const slug = '2026-11-28-ai-and-cloudflare-again';
const outDir = resolve(here, '../../../static/img/blog/', slug);
const files = [
  'cover.zh.html',
  'cover.en.html',
  'figure-1-then-vs-now.zh.html',
  'figure-1-then-vs-now.en.html',
  'figure-2-fit-vs-stuck.zh.html',
  'figure-2-fit-vs-stuck.en.html',
];

mkdirSync(outDir, { recursive: true });
let browser;
let launchError;
for (const executablePath of [
  '/home/marvin/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome',
  '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  undefined,
]) {
  try {
    browser = await chromium.launch({ ...(executablePath ? { executablePath } : {}), args: ['--no-sandbox'] });
    console.log(`using Chromium${executablePath ? ` at ${executablePath}` : ' from Playwright'}`);
    break;
  } catch (error) {
    launchError = error;
  }
}
if (!browser) throw launchError;
const page = await browser.newPage({ viewport: { width: 1360, height: 1800 }, deviceScaleFactor: 2 });
page.setDefaultNavigationTimeout(45000);

try {
  for (const file of files) {
    await page.goto(pathToFileURL(resolve(here, file)).href, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1200);
    const canvas = page.locator('.canvas');
    const output = resolve(outDir, file.replace(/\.html$/, '.png'));
    await canvas.screenshot({ path: output });

    const png = readFileSync(output);
    const validSignature = png.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    if (!validSignature || png.length <= 8) throw new Error(`Invalid or empty PNG: ${output}`);
    const width = png.readUInt32BE(16);
    const height = png.readUInt32BE(20);
    console.log(`rendered ${file} -> ${output} (${width}x${height}, ${png.length} bytes)`);
  }
} finally {
  await browser.close();
}
