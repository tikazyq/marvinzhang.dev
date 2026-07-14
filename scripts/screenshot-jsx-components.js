#!/usr/bin/env node

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');

/**
 * Screenshot JSX Components for WeChat Publishing
 *
 * Renders interactive JSX components from blog posts as static PNG images.
 * Used by wechat.js to replace <Component /> tags with images.
 *
 * Usage:
 *   node scripts/screenshot-jsx-components.js [article-slug] [--locale en|zh]
 *   node scripts/screenshot-jsx-components.js agent-landscape --locale zh
 *
 * Requirements:
 *   - Site must be built first (pnpm build)
 *   - Playwright with Chromium installed
 */

const STATIC_IMG_DIR = 'static/img/blog';
const BUILD_DIR = 'build';
const PORT = 4173;

// JSX component selectors and their names
// Components are identified by unique text/structure patterns in the rendered HTML
const COMPONENT_CONFIGS = {
  'multi-agent-teams-and-the-measurable-coordination-tax': {
    components: [
      // CSS-module widget: match by hashed class name (contains "widget")
      { name: 'ScaleCurveWidget', cssSelector: '[class*="widget"]' },
    ],
  },
  'agent-landscape': {
    components: [
      { name: 'ProtocolStack', selector: 'div:has(> div:first-child > span:first-child)', matchText: 'Click a layer', matchTextZh: '点击层级' },
      { name: 'AutomationSpectrum', selector: 'div:has(> div:first-child > div:first-child)', matchText: 'L0', nearText: 'Key shift' , nearTextZh: '关键转变' },
      { name: 'ToolEcosystem', selector: 'div:has(> div:first-child > span:first-child)', matchText: 'All', matchTextZh: '全部', nearText: 'of' , nearTextZh: '/' },
    ],
  },
};

async function findComponentElements(page, config, locale) {
  const components = [];

  for (const comp of config.components) {
    // Direct CSS selector path (for CSS-module components declaring cssSelector)
    if (comp.cssSelector) {
      const el = await page.$(comp.cssSelector);
      if (el) {
        const box = await el.boundingBox();
        if (box && box.height > 50) components.push({ name: comp.name, element: el, box });
      }
      continue;
    }
    // Find the component's outer container by looking for the dark background wrapper
    // All components share the same pattern: dark bg (#06080d), rounded corners, border
    const elements = await page.$$('div[style*="background"]');

    for (const el of elements) {
      const style = await el.getAttribute('style');
      if (!style || !style.includes('#06080d')) continue;

      // Check if this element contains identifying text
      const text = await el.textContent();
      const matchText = locale === 'zh' ? (comp.matchTextZh || comp.matchText) : comp.matchText;
      const nearText = locale === 'zh' ? (comp.nearTextZh || comp.nearText) : comp.nearText;

      if (text.includes(matchText) && (!nearText || text.includes(nearText))) {
        // Verify it's not a nested child of another component
        const box = await el.boundingBox();
        if (box && box.height > 50) {
          components.push({ name: comp.name, element: el, box });
          break;
        }
      }
    }
  }

  return components;
}

async function main() {
  const args = process.argv.slice(2);
  const articleSlug = args.find(a => !a.startsWith('-')) || null;
  const localeIdx = args.indexOf('--locale');
  const locale = localeIdx !== -1 ? args[localeIdx + 1] : null;

  if (!articleSlug) {
    console.error('Usage: node scripts/screenshot-jsx-components.js <article-slug> [--locale en|zh]');
    process.exit(1);
  }

  const config = COMPONENT_CONFIGS[articleSlug];
  if (!config) {
    console.error(`No component config found for article: ${articleSlug}`);
    console.error(`Available: ${Object.keys(COMPONENT_CONFIGS).join(', ')}`);
    process.exit(1);
  }

  const locales = locale ? [locale] : ['en', 'zh'];

  // Check build exists
  if (!fs.existsSync(BUILD_DIR)) {
    console.log('Building site...');
    execSync('pnpm build', { stdio: 'inherit' });
  }

  // Kill any existing server on the port
  try {
    execSync(`lsof -ti :${PORT} | xargs kill -9 2>/dev/null`, { stdio: 'pipe' });
    await new Promise(resolve => setTimeout(resolve, 500));
  } catch {}

  // Start a local server
  console.log(`Starting local server on port ${PORT}...`);
  const server = spawn('npx', ['serve', BUILD_DIR, '-l', String(PORT), '--no-clipboard'], {
    stdio: 'pipe',
    detached: false,
  });

  // Wait for server to be ready by polling
  const http = require('http');
  const waitForServer = () => new Promise((resolve, reject) => {
    let attempts = 0;
    const check = () => {
      attempts++;
      if (attempts > 30) return reject(new Error('Server startup timeout'));
      const req = http.get(`http://localhost:${PORT}/`, (res) => {
        res.resume();
        resolve();
      });
      req.on('error', () => setTimeout(check, 500));
      req.end();
    };
    check();
  });
  await waitForServer();
  console.log('Server ready.');

  // Prefer the environment-provided Chromium (e.g. /opt/pw-browsers/chromium in
  // sandboxed runners); fall back to Playwright's own download.
  const launchOpts = { args: ['--no-sandbox', '--disable-setuid-sandbox'] };
  const browser = await chromium
    .launch({ ...launchOpts, executablePath: '/opt/pw-browsers/chromium' })
    .catch(() => chromium.launch(launchOpts));

  try {
    for (const loc of locales) {
      const urlPrefix = loc === 'zh' ? `http://localhost:${PORT}/zh` : `http://localhost:${PORT}`;
      const pageUrl = `${urlPrefix}/blog/${articleSlug}`;

      console.log(`\nProcessing ${loc.toUpperCase()}: ${pageUrl}`);

      const context = await browser.newContext({
        viewport: { width: 800, height: 600 },
        deviceScaleFactor: 2,
        colorScheme: 'dark',
      });
      const page = await context.newPage();

      try {
        await page.goto(pageUrl, { waitUntil: 'networkidle', timeout: 30000 });
        // Fixed navbars overlap element screenshots — hide chrome before capture
        await page.addStyleTag({ content: 'nav.navbar, .navbar { display: none !important; }' });
      } catch (err) {
        console.error(`Failed to load ${pageUrl}: ${err.message}`);
        await context.close();
        continue;
      }

      // Wait a bit for any animations/transitions
      await page.waitForTimeout(1000);

      // Find article filename for image output dir
      const glob = require('glob');
      const pattern = loc === 'zh'
        ? `i18n/zh/docusaurus-plugin-content-blog/*${articleSlug}*`
        : `blog/*${articleSlug}*`;
      const files = glob.sync(pattern);
      const articleFileName = files.length > 0 ? path.parse(files[0]).name : articleSlug;

      const outputDir = path.join(STATIC_IMG_DIR, articleFileName, 'wechat');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Find and screenshot each component
      const found = await findComponentElements(page, config, loc);

      if (found.length === 0) {
        console.log(`  No components found on page`);
        await context.close();
        continue;
      }

      for (const { name, element } of found) {
        const outputPath = path.join(outputDir, `${name}-${loc}.png`);

        // Scroll element into view
        await element.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);

        // Screenshot the element
        await element.screenshot({
          path: outputPath,
          type: 'png',
        });

        console.log(`  ✅ ${name} → ${outputPath}`);
      }

      await context.close();
    }
  } finally {
    await browser.close();
    // Gracefully stop server
    server.kill();
    await new Promise(resolve => setTimeout(resolve, 300));
    // Force kill if still alive
    try { server.kill('SIGKILL'); } catch {}
    try { execSync(`lsof -ti :${PORT} | xargs kill -9 2>/dev/null`, { stdio: 'pipe' }); } catch {}
  }

  console.log('\nDone!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
