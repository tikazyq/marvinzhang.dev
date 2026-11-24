// Crop the phone status bar + app header and blur machine names, writing shots/*.png.
// Usage: node sanitize.mjs <sidebar.png> <cpm-to-semon.png> <semon-to-cpm.png>
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
const here = dirname(fileURLToPath(import.meta.url));
// Machine-name lines in the sidebar (second line of each row), source px.
const rows = [355, 502, 651, 799, 947, 1096, 1244, 1392, 1626, 1774];
const jobs = [
  { src: process.argv[2], out: 'sidebar.png', top: 240, blur: rows.map((y) => [100, y - 26, 240, 52]) },
  { src: process.argv[3], out: 'cpm-to-semon.png', top: 262, blur: [] },
  { src: process.argv[4], out: 'semon-to-cpm.png', top: 262, blur: [] },
];
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
const page = await browser.newPage();
for (const j of jobs) {
  const data = 'data:image/png;base64,' + readFileSync(j.src).toString('base64');
  const url = await page.evaluate(async ({ data, top, blur }) => {
    const img = new Image(); img.src = data; await img.decode();
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height - top;
    const x = c.getContext('2d');
    x.drawImage(img, 0, -top);
    for (const [bx, by, bw, bh] of blur) {
      x.save(); x.beginPath(); x.rect(bx, by - top, bw, bh); x.clip();
      x.filter = 'blur(16px)'; x.drawImage(img, 0, -top); x.filter = 'blur(16px)'; x.drawImage(c, 0, 0);
      x.restore();
    }
    return c.toDataURL('image/png');
  }, { data, top: j.top, blur: j.blur });
  writeFileSync(resolve(here, 'shots', j.out), Buffer.from(url.split(',')[1], 'base64'));
  console.log('sanitized', j.out);
}
await browser.close();
