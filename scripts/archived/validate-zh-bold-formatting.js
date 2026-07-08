#!/usr/bin/env node

/**
 * Validate Bold Formatting in Chinese Blog Posts
 * 
 * This script uses Playwright to:
 * 1. Build and serve the Docusaurus site locally
 * 2. Navigate to Chinese blog posts
 * 3. Check for improperly rendered bold formatting
 * 4. Report issues with specific file locations
 * 
 * Usage:
 *   node scripts/validate-zh-bold-formatting.js
 *   node scripts/validate-zh-bold-formatting.js --file 2025-10-04-fundamental-limits-in-computing.mdx
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Configuration
const ZH_BLOG_DIR = path.join(__dirname, '..', 'i18n', 'zh', 'docusaurus-plugin-content-blog');
const BUILD_DIR = path.join(__dirname, '..', 'build');
const PORT = 3001;
const BASE_URL = `http://localhost:${PORT}`;

// Parse command line arguments
const args = process.argv.slice(2);
const specificFile = args.includes('--file') ? args[args.indexOf('--file') + 1] : null;
const skipBuild = args.includes('--skip-build');
const verbose = args.includes('--verbose');

/**
 * Build the Docusaurus site
 */
async function buildSite() {
  if (skipBuild) {
    console.log('⏭️  Skipping build (--skip-build flag set)');
    return;
  }

  console.log('🔨 Building Docusaurus site...');
  return new Promise((resolve, reject) => {
    const build = spawn('pnpm', ['run', 'build'], {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit',
      shell: true
    });

    build.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Build failed with code ${code}`));
      } else {
        console.log('✅ Build completed successfully');
        resolve();
      }
    });
  });
}

/**
 * Start the Docusaurus server
 */
async function startServer() {
  console.log(`🚀 Starting server on port ${PORT}...`);
  return new Promise((resolve, reject) => {
    const server = spawn('npx', ['docusaurus', 'serve', '--port', PORT.toString(), '--no-open'], {
      cwd: path.join(__dirname, '..'),
      stdio: 'pipe',
      shell: true
    });

    let resolved = false;

    const checkServer = async () => {
      try {
        const http = require('http');
        const options = {
          hostname: 'localhost',
          port: PORT,
          path: '/zh/',
          method: 'GET',
          timeout: 2000
        };

        return new Promise((checkResolve) => {
          const req = http.request(options, (res) => {
            checkResolve(res.statusCode === 200 || res.statusCode === 302 || res.statusCode === 304);
          });
          req.on('error', () => checkResolve(false));
          req.on('timeout', () => {
            req.destroy();
            checkResolve(false);
          });
          req.end();
        });
      } catch {
        return false;
      }
    };

    server.stdout.on('data', (data) => {
      if (verbose) {
        console.log(data.toString());
      }
    });

    server.stderr.on('data', (data) => {
      if (verbose) {
        console.error(data.toString());
      }
    });

    server.on('error', (error) => {
      if (!resolved) {
        reject(error);
      }
    });

    // Poll for server availability
    const startTime = Date.now();
    const pollInterval = setInterval(async () => {
      if (resolved) {
        clearInterval(pollInterval);
        return;
      }

      const isUp = await checkServer();
      if (isUp) {
        resolved = true;
        clearInterval(pollInterval);
        console.log('✅ Server started successfully');
        resolve(server);
      } else if (Date.now() - startTime > 30000) {
        resolved = true;
        clearInterval(pollInterval);
        reject(new Error('Server startup timeout'));
      }
    }, 500);
  });
}

/**
 * Get all Chinese blog post files
 */
function getZhBlogFiles() {
  const files = fs.readdirSync(ZH_BLOG_DIR)
    .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
    .filter(file => !file.includes('authors.yml'));

  if (specificFile) {
    return files.filter(file => file === specificFile);
  }

  return files;
}

/**
 * Extract slug from blog file
 */
function extractSlug(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const slugMatch = content.match(/slug:\s*(.+)/);
  if (slugMatch) {
    return slugMatch[1].trim();
  }
  
  // Fallback: extract from filename
  const filename = path.basename(filePath);
  const dateMatch = filename.match(/^\d{4}-\d{2}-\d{2}-(.+)\.mdx?$/);
  return dateMatch ? dateMatch[1] : filename.replace(/\.mdx?$/, '');
}

/**
 * Check for bold formatting issues in the page
 */
async function checkBoldFormatting(page, url) {
  const issues = [];

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 10000 });

    // Check for literal "**" appearing in the text (indicates failed bold parsing)
    const literalBoldMarkers = await page.locator('text=/\\*\\*[^*]+\\*\\*/').count();
    
    if (literalBoldMarkers > 0) {
      const markers = await page.locator('text=/\\*\\*[^*]+\\*\\*/').all();
      for (const marker of markers) {
        const text = await marker.textContent();
        issues.push({
          type: 'literal-markers',
          issue: `Found literal bold markers in rendered content: "${text.substring(0, 100)}..."`,
          suggestion: 'Add space before the second ** marker or add spaces inside bold markers with quotes'
        });
      }
    }

    // Check for multiple bold elements on the same line that might be missing space
    // This is trickier - we need to check the source and compare to rendered
    const strongElements = await page.locator('strong').all();
    
    // Get parent paragraphs with multiple bold elements
    const paragraphs = await page.locator('p:has(strong), li:has(strong), td:has(strong)').all();
    
    for (const para of paragraphs) {
      const strongs = await para.locator('strong').all();
      if (strongs.length > 1) {
        // Check if there's Chinese text and multiple bold sections
        const paraText = await para.textContent();
        const hasChinese = /[\u4e00-\u9fa5]/.test(paraText);
        
        if (hasChinese) {
          // Get the innerHTML to check spacing
          const innerHTML = await para.innerHTML();
          
          // Check for pattern: ）**text** (closing paren followed immediately by bold)
          // This is likely missing a space before the second **
          const problematicPattern = /）\*\*[^*]+\*\*/;
          if (problematicPattern.test(innerHTML)) {
            issues.push({
              type: 'missing-space',
              issue: `Multiple bold sections in Chinese text may be missing space`,
              context: paraText.substring(0, 150) + (paraText.length > 150 ? '...' : ''),
              suggestion: 'Ensure space before second ** marker: "text1** text2 **text3**"'
            });
          }
        }
      }
    }

    // Check for bold text with quotes that might have parsing issues
    const quoteBoldPattern = await page.locator('strong:has-text("""")').count();
    if (quoteBoldPattern > 0) {
      const elements = await page.locator('strong:has-text("""")').all();
      for (const elem of elements) {
        const text = await elem.textContent();
        if (text.includes('"')) {
          const html = await elem.innerHTML();
          // Check if there's no space around the quotes
          if (/^\s*"/.test(html) || /"\s*$/.test(html)) {
            issues.push({
              type: 'quote-spacing',
              issue: `Bold text with quotes may need spacing: "${text.substring(0, 50)}..."`,
              suggestion: 'Add spaces inside bold markers: ** "quoted text" **'
            });
          }
        }
      }
    }

  } catch (error) {
    issues.push({
      type: 'error',
      issue: `Failed to check page: ${error.message}`
    });
  }

  return issues;
}

/**
 * Validate all Chinese blog posts
 */
async function validateBlogPosts() {
  console.log('\n📝 Validating Chinese blog posts for bold formatting...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const files = getZhBlogFiles();
  console.log(`Found ${files.length} Chinese blog post(s) to validate\n`);

  const results = {
    total: files.length,
    passed: 0,
    failed: 0,
    issues: []
  };

  for (const file of files) {
    const filePath = path.join(ZH_BLOG_DIR, file);
    const slug = extractSlug(filePath);
    const url = `${BASE_URL}/zh/blog/${slug}`;

    console.log(`Checking: ${file}`);
    console.log(`  URL: ${url}`);

    const issues = await checkBoldFormatting(page, url);

    if (issues.length === 0) {
      console.log('  ✅ PASS - No bold formatting issues detected\n');
      results.passed++;
    } else {
      console.log('  ❌ FAIL - Found formatting issues:\n');
      issues.forEach((issue, idx) => {
        console.log(`     ${idx + 1}. [${issue.type}] ${issue.issue}`);
        if (issue.context) {
          console.log(`        Context: ${issue.context}`);
        }
        if (issue.suggestion) {
          console.log(`        💡 ${issue.suggestion}`);
        }
        console.log();
      });
      
      results.failed++;
      results.issues.push({
        file,
        url,
        issues
      });
    }
  }

  await browser.close();

  return results;
}

/**
 * Generate summary report
 */
function printSummary(results) {
  console.log('\n' + '='.repeat(70));
  console.log('📊 VALIDATION SUMMARY');
  console.log('='.repeat(70));
  console.log(`Total files checked: ${results.total}`);
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  
  if (results.failed > 0) {
    console.log('\n⚠️  Files with issues:');
    results.issues.forEach(({ file, issues }) => {
      console.log(`  - ${file} (${issues.length} issue${issues.length > 1 ? 's' : ''})`);
    });
    console.log('\n💡 See details above for specific issues and suggestions.');
    console.log('\n📖 Formatting rules:');
    console.log('  1. Multiple bold on same line: 这与 **term1** 形成对比');
    console.log('     (note the space before the second **)');
    console.log('  2. Bold with quotes: ** "quoted text" ** 是一个属性');
    console.log('     (note spaces inside the bold markers)');
  }
  
  console.log('='.repeat(70) + '\n');
}

/**
 * Main execution
 */
async function main() {
  let server = null;

  try {
    // Step 1: Build the site
    await buildSite();

    // Step 2: Start the server
    server = await startServer();

    // Step 3: Validate blog posts
    const results = await validateBlogPosts();

    // Step 4: Print summary
    printSummary(results);

    // Exit with appropriate code
    process.exit(results.failed > 0 ? 1 : 0);

  } catch (error) {
    console.error('\n❌ Error during validation:', error.message);
    if (verbose) {
      console.error(error.stack);
    }
    process.exit(1);
  } finally {
    // Cleanup: Kill the server
    if (server) {
      console.log('🛑 Stopping server...');
      server.kill();
    }
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { checkBoldFormatting, extractSlug };
