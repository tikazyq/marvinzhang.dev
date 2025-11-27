#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync, spawnSync } = require('child_process');
const matter = require('gray-matter');
const glob = require('glob');

/**
 * Streamlined WeChat Publishing Tool
 * 
 * Single-command solution for converting blog posts to WeChat-ready format.
 * Handles Mermaid extraction, image generation, and markdown processing in one go.
 * 
 * Usage:
 *   pnpm wechat                     # Process all changed articles
 *   pnpm wechat article-slug        # Process specific article
 *   pnpm wechat --zh                # Process Chinese articles only
 *   pnpm wechat --open              # Open output directory after processing
 *   pnpm wechat --list              # List available articles
 * 
 * Output:
 *   - Mermaid diagrams: static/img/blog/{slug}/wechat/*.png (permanent)
 *   - WeChat markdown: specs/{spec-folder}/wechat-{locale}.md (if spec exists)
 *   - Fallback output: .temp/wechat/ (for articles without specs)
 */

const TEMP_DIR = '.temp/mermaid';
const WECHAT_DIR = '.temp/wechat';
const STATIC_IMG_DIR = 'static/img/blog';
const SPECS_DIR = 'specs';
const BLOG_DIRS = ['blog', 'i18n/zh/docusaurus-plugin-content-blog'];
const BASE_URL = 'https://marvinzhang.dev';
const CACHE_FILE = '.temp/mermaid/.extraction-cache.json';
const DIAGRAM_PATTERN = /```mermaid\n([\s\S]*?)```/g;

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  help: args.includes('--help') || args.includes('-h'),
  list: args.includes('--list') || args.includes('-l'),
  open: args.includes('--open') || args.includes('-o'),
  force: args.includes('--force') || args.includes('-f'),
  zh: args.includes('--zh'),
  en: args.includes('--en'),
  quiet: args.includes('--quiet') || args.includes('-q'),
  verbose: args.includes('--verbose') || args.includes('-v'),
  // Get positional argument (article name)
  article: args.find(arg => !arg.startsWith('-')) || null
};

// Determine locale filter
const localeFilter = options.zh ? 'zh' : (options.en ? 'en' : null);

// Show help message
if (options.help) {
  console.log(`
📱 WeChat Blog Publishing Tool (Streamlined)

Converts Docusaurus blog posts to WeChat-ready markdown with rendered diagrams.

Usage:
  pnpm wechat [article] [options]

Arguments:
  article              Article slug or partial filename to process (optional)

Options:
  -l, --list           List available articles with Mermaid diagrams
  -o, --open           Open output directory after processing
  -f, --force          Force re-process all files (ignore cache)
  --zh                 Only process Chinese articles
  --en                 Only process English articles
  -q, --quiet          Minimal output
  -v, --verbose        Detailed output
  -h, --help           Show this help

Examples:
  pnpm wechat                         # Process all changed articles
  pnpm wechat rice                    # Process article matching "rice"
  pnpm wechat --zh                    # Only Chinese articles
  pnpm wechat fundamental-limits -o   # Process and open output
  pnpm wechat --list                  # Show available articles
  pnpm wechat --force                 # Force full rebuild

Output:
  static/img/blog/{slug}/wechat/      PNG diagrams (permanent, Git LFS tracked)
  specs/{spec-folder}/                WeChat markdown (if spec exists)
  .temp/wechat/                       Fallback for articles without specs
`);
  process.exit(0);
}

// Logging helpers
const log = (msg) => !options.quiet && console.log(msg);
const verbose = (msg) => options.verbose && console.log(msg);
const success = (msg) => console.log(`✅ ${msg}`);
const error = (msg) => console.error(`❌ ${msg}`);
const info = (msg) => console.log(`ℹ️  ${msg}`);

// Ensure directories exist
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Load cache for incremental processing
const loadCache = () => {
  if (options.force || !fs.existsSync(CACHE_FILE)) {
    return {};
  }
  try {
    return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  } catch {
    return {};
  }
};

// Save cache
const saveCache = (cache) => {
  ensureDir(path.dirname(CACHE_FILE));
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
};

// Find matching spec folder for an article
const findSpecFolder = (articleSlug, articleFileName) => {
  if (!fs.existsSync(SPECS_DIR)) return null;
  
  const specFolders = fs.readdirSync(SPECS_DIR).filter(f => {
    const fullPath = path.join(SPECS_DIR, f);
    return fs.statSync(fullPath).isDirectory() && f !== 'archived';
  });
  
  // Extract slug from filename (remove date prefix like 2025-11-27-)
  const slugFromFileName = articleFileName.replace(/^\d{4}-\d{2}-\d{2}-/, '');
  
  // Exact match: spec folder should be like "002-introducing-leanspec" for article "introducing-leanspec"
  for (const folder of specFolders) {
    // Spec folders are like "002-introducing-leanspec"
    const specSlug = folder.replace(/^\d+-/, '');
    
    // Exact match only
    if (specSlug === slugFromFileName || specSlug === articleSlug) {
      return path.join(SPECS_DIR, folder);
    }
  }
  
  return null;
};

// Get the static image directory for an article
const getStaticImageDir = (articleFileName) => {
  // Use the full filename (with date) as the folder name
  return path.join(STATIC_IMG_DIR, articleFileName, 'wechat');
};

// Find all blog articles with Mermaid diagrams
const findArticlesWithDiagrams = () => {
  const articles = [];
  
  BLOG_DIRS.forEach((blogDir) => {
    if (!fs.existsSync(blogDir)) return;
    
    const markdownFiles = glob.sync(`${blogDir}/**/*.{md,mdx}`);
    
    markdownFiles.forEach((filePath) => {
      const content = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter, content: markdownContent } = matter(content);
      
      const diagrams = [];
      let match;
      const pattern = /```mermaid\n([\s\S]*?)```/g;
      while ((match = pattern.exec(markdownContent)) !== null) {
        diagrams.push(match[1].trim());
      }
      
      if (diagrams.length > 0) {
        const locale = blogDir.includes('/zh/') ? 'zh' : 'en';
        const fileName = path.parse(filePath).name;
        
        articles.push({
          filePath,
          fileName,
          locale,
          title: frontmatter.title || fileName,
          slug: frontmatter.slug || fileName,
          diagramCount: diagrams.length,
          diagrams,
          frontmatter,
          mtime: fs.statSync(filePath).mtime.toISOString()
        });
      }
    });
  });
  
  return articles;
};

// List available articles
if (options.list) {
  const articles = findArticlesWithDiagrams();
  
  if (articles.length === 0) {
    info('No articles with Mermaid diagrams found.');
    process.exit(0);
  }
  
  console.log('\n📚 Articles with Mermaid Diagrams:\n');
  
  const enArticles = articles.filter(a => a.locale === 'en');
  const zhArticles = articles.filter(a => a.locale === 'zh');
  
  if (enArticles.length > 0) {
    console.log('🇬🇧 English:');
    enArticles.forEach(a => {
      console.log(`   ${a.fileName} (${a.diagramCount} diagrams)`);
    });
    console.log();
  }
  
  if (zhArticles.length > 0) {
    console.log('🇨🇳 Chinese:');
    zhArticles.forEach(a => {
      console.log(`   ${a.fileName} (${a.diagramCount} diagrams)`);
    });
  }
  
  console.log(`\n📊 Total: ${articles.length} articles, ${articles.reduce((sum, a) => sum + a.diagramCount, 0)} diagrams`);
  process.exit(0);
}

// Main processing function
const processArticles = async () => {
  log('\n📱 WeChat Blog Publishing Tool\n');
  
  ensureDir(TEMP_DIR);
  ensureDir(WECHAT_DIR);
  ensureDir(`${WECHAT_DIR}/images`);
  
  const cache = loadCache();
  const articles = findArticlesWithDiagrams();
  
  if (articles.length === 0) {
    info('No articles with Mermaid diagrams found.');
    return;
  }
  
  // Filter articles based on options
  let toProcess = articles;
  
  // Filter by article name
  if (options.article) {
    toProcess = toProcess.filter(a => 
      a.fileName.toLowerCase().includes(options.article.toLowerCase()) ||
      a.slug.toLowerCase().includes(options.article.toLowerCase())
    );
    
    if (toProcess.length === 0) {
      error(`No articles matching "${options.article}" found.`);
      console.log('\nAvailable articles:');
      articles.forEach(a => console.log(`   ${a.fileName}`));
      process.exit(1);
    }
  }
  
  // Filter by locale
  if (localeFilter) {
    toProcess = toProcess.filter(a => a.locale === localeFilter);
  }
  
  // Filter by cache (incremental mode)
  if (!options.force) {
    toProcess = toProcess.filter(a => {
      const cached = cache[a.filePath];
      return !cached || cached.mtime !== a.mtime;
    });
    
    if (toProcess.length === 0 && !options.article) {
      success('All articles up to date. Use --force to rebuild.');
      return;
    }
  }
  
  log(`📊 Processing ${toProcess.length} article(s)...`);
  
  const results = [];
  const newCache = { ...cache };
  
  for (const article of toProcess) {
    verbose(`\n📄 ${article.title}`);
    verbose(`   File: ${article.filePath}`);
    verbose(`   Diagrams: ${article.diagramCount}`);
    
    // Determine output locations
    const staticImageDir = getStaticImageDir(article.fileName);
    const specFolder = findSpecFolder(article.slug, article.fileName);
    
    // Ensure directories exist
    ensureDir(staticImageDir);
    
    verbose(`   📁 Images: ${staticImageDir}`);
    if (specFolder) {
      verbose(`   📁 Spec: ${specFolder}`);
    }
    
    // Extract and render diagrams to static folder
    const diagramFiles = [];
    
    for (let i = 0; i < article.diagrams.length; i++) {
      const diagramFileName = `diagram-${article.locale}-${i + 1}`;
      const mmdPath = `${TEMP_DIR}/${article.fileName}-${article.locale}-${i + 1}.mmd`;
      const pngPath = `${staticImageDir}/${diagramFileName}.png`;
      
      // Save .mmd file (temporary)
      fs.writeFileSync(mmdPath, article.diagrams[i]);
      
      // Generate PNG to static folder
      try {
        execSync(
          `npx mmdc -i "${mmdPath}" -o "${pngPath}" -t default -b white --outputFormat png -p puppeteer.config.json`,
          { stdio: 'pipe' }
        );
        
        // Path relative to WeChat markdown location
        const relativePath = `/${staticImageDir.replace(/^static\//, '')}/${diagramFileName}.png`;
        
        diagramFiles.push({
          index: i + 1,
          name: diagramFileName,
          staticPath: pngPath,
          relativePath: relativePath
        });
        verbose(`   ✅ Diagram ${i + 1} rendered → ${pngPath}`);
      } catch (err) {
        error(`Failed to render diagram ${i + 1} in ${article.fileName}`);
        verbose(`   Error: ${err.message}`);
      }
    }
    
    // Process markdown content
    const content = fs.readFileSync(article.filePath, 'utf8');
    const { content: markdownContent } = matter(content);
    
    // Replace mermaid blocks with image references (using absolute URLs for WeChat)
    let diagramIndex = 0;
    let processedContent = markdownContent.replace(
      /```mermaid\n([\s\S]*?)```/g,
      (match) => {
        const diagram = diagramFiles[diagramIndex];
        diagramIndex++;
        if (diagram) {
          // Use absolute URL for WeChat, no alt text for cleaner output
          const absoluteUrl = `${BASE_URL}${diagram.relativePath}`;
          return `![](${absoluteUrl})`;
        }
        return match;
      }
    );
    
    // Remove truncate markers
    processedContent = processedContent.replace(/\{\/\*\s*truncate\s*\*\/\}/g, '');
    
    // Convert admonitions
    processedContent = processedContent.replace(
      /:::(tip|info|warning|danger|note|caution)(?:\s+(.+?))?\n([\s\S]*?)\n:::/g,
      (match, type, title, body) => {
        const emojis = { tip: '💡', info: 'ℹ️', warning: '⚠️', danger: '🚨', note: '📝', caution: '⚠️' };
        const emoji = emojis[type] || '📌';
        const heading = title ? `${emoji} **${title}**` : `${emoji} **${type.charAt(0).toUpperCase() + type.slice(1)}**`;
        const quotedLines = body.split('\n').map(line => line.trim() ? `> ${line}` : '>').join('\n');
        return `${heading}\n\n${quotedLines}`;
      }
    );
    
    // Convert relative links to absolute
    const baseUrl = article.locale === 'zh' ? `${BASE_URL}/zh` : BASE_URL;
    processedContent = processedContent.replace(
      /\[([^\]]+)\]\(\/blog\/([^)]+)\)/g,
      (match, linkText, postSlug) => `[${linkText}](${baseUrl}/blog/${postSlug})`
    );
    
    // Add footer
    const postUrl = `${baseUrl}/blog/${article.slug}`;
    const footer = article.locale === 'zh'
      ? `\n\n---\n\n📝 **本文同步发布于我的个人技术博客** [marvinzhang.dev](${postUrl})\n\n🔗 **完整文章链接：** ${postUrl}\n\n💬 **欢迎访问我的博客了解更多技术文章！**`
      : `\n\n---\n\n📝 **Originally published on my personal blog** [marvinzhang.dev](${postUrl})\n\n🔗 **Full article link:** ${postUrl}\n\n💬 **Visit my blog for more tech articles!**`;
    
    processedContent += footer;
    
    // Determine output path: spec folder if exists, otherwise .temp/wechat
    let outputPath;
    let outputLocation;
    
    if (specFolder) {
      outputPath = `${specFolder}/wechat-${article.locale}.md`;
      outputLocation = 'spec';
    } else {
      outputPath = `${WECHAT_DIR}/${article.fileName}-${article.locale}-wechat.md`;
      outputLocation = 'temp';
    }
    
    fs.writeFileSync(outputPath, processedContent);
    
    // Also save to temp for easy access
    const tempOutputPath = `${WECHAT_DIR}/${article.fileName}-${article.locale}-wechat.md`;
    if (outputLocation === 'spec') {
      fs.writeFileSync(tempOutputPath, processedContent);
    }
    
    // Update cache
    newCache[article.filePath] = {
      mtime: article.mtime,
      processedAt: new Date().toISOString(),
      diagramCount: article.diagramCount,
      staticImageDir,
      specFolder: specFolder || null
    };
    
    results.push({
      title: article.title,
      locale: article.locale,
      output: outputPath,
      outputLocation,
      specFolder,
      staticImageDir,
      diagrams: diagramFiles.length
    });
    
    const locationEmoji = outputLocation === 'spec' ? '📋' : '📁';
    log(`✅ ${article.locale.toUpperCase()}: ${article.fileName} (${diagramFiles.length} diagrams) ${locationEmoji}`);
  }
  
  // Save cache
  saveCache(newCache);
  
  // Summary
  console.log('\n' + '─'.repeat(50));
  
  const specResults = results.filter(r => r.outputLocation === 'spec');
  const tempResults = results.filter(r => r.outputLocation === 'temp');
  
  console.log(`📦 Static Images: ${path.resolve(STATIC_IMG_DIR)}`);
  console.log(`📄 Files: ${results.length}`);
  console.log(`🖼️  Images: ${results.reduce((sum, r) => sum + r.diagrams, 0)}`);
  
  if (specResults.length > 0) {
    console.log(`\n📋 Saved to spec folders (${specResults.length}):`);
    specResults.forEach(r => {
      console.log(`   ${r.specFolder}/wechat-${r.locale}.md`);
    });
  }
  
  if (tempResults.length > 0) {
    console.log(`\n📁 Saved to temp (no spec found) (${tempResults.length}):`);
    tempResults.forEach(r => {
      console.log(`   ${path.basename(r.output)}`);
    });
  }
  
  if (results.length > 0) {
    console.log(`\n🖼️  Image folders created:`);
    const uniqueDirs = [...new Set(results.map(r => r.staticImageDir))];
    uniqueDirs.forEach(dir => {
      console.log(`   ${dir}`);
    });
  }
  
  // Open output directory if requested
  if (options.open && results.length > 0) {
    // Open the first spec folder if available, otherwise temp
    const openDir = specResults.length > 0 
      ? path.resolve(specResults[0].specFolder)
      : path.resolve(WECHAT_DIR);
    
    console.log(`\n📂 Opening ${openDir}...`);
    
    try {
      const platform = process.platform;
      if (platform === 'darwin') {
        execSync(`open "${openDir}"`);
      } else if (platform === 'win32') {
        execSync(`explorer "${openDir}"`);
      } else {
        execSync(`xdg-open "${openDir}"`);
      }
    } catch {
      info(`Could not open directory automatically. Path: ${openDir}`);
    }
  }
  
  console.log('\n🎉 Done!\n');
};

// Run
processArticles().catch(err => {
  error(err.message);
  process.exit(1);
});
