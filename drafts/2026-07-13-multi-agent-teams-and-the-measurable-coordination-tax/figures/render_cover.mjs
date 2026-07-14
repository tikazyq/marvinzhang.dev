import { chromium } from 'playwright';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
const here = dirname(fileURLToPath(import.meta.url));
const out = resolve(here, '../../../static/img/blog/2026-07-13-multi-agent-teams-and-the-measurable-coordination-tax/wechat');
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'}).catch(()=>chromium.launch());
const p = await b.newPage({ viewport:{width:1300,height:700}, deviceScaleFactor: 2 });
for (const [f, name] of [['cover-main.zh.html','cover-2.35x1.png'], ['cover-square.zh.html','cover-1x1.png']]) {
  await p.goto('file://' + resolve(here, f), { waitUntil: 'networkidle' });
  await p.waitForTimeout(900);
  await p.locator('.canvas').screenshot({ path: resolve(out, name) });
  console.log('rendered', name);
}
await b.close();
