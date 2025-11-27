#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const matter = require('gray-matter');
const glob = require('glob');

/**
 * Medium Publishing Tool
 * 
 * Converts Docusaurus blog posts to Medium-ready markdown format.
 * Handles Mermaid diagrams, code blocks, and Medium-specific formatting.
 * 
 * Medium Import Limitations:
 * - No custom HTML support (only standard markdown)
 * - Code blocks work but no syntax highlighting control
 * - Images need to be hosted externally or uploaded manually
 * - No frontmatter support (stripped)
 * - Headers limited to H1-H4 (H5/H6 become bold text)
 * - Tables converted to simple format or images
 * 
 * Usage:
 *   pnpm medium                      # Process all changed articles
 *   pnpm medium article-slug         # Process specific article
 *   pnpm medium --en                 # Process English articles only
 *   pnpm medium --open               # Open output directory after processing
 *   pnpm medium --list               # List available articles
 */

const TEMP_DIR = '.temp/mermaid';
const FALLBACK_DIR = '.temp/medium';
const STATIC_IMG_DIR = 'static/img/blog';
const SPECS_DIR = 'specs';
const BLOG_DIRS = ['blog', 'i18n/zh/docusaurus-plugin-content-blog'];
const BASE_URL = 'https://marvinzhang.dev';
const CACHE_FILE = '.temp/medium/.extraction-cache.json';

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
📰 Medium Blog Publishing Tool

Converts Docusaurus blog posts to Medium-ready markdown format.

Usage:
  pnpm medium [article] [options]

Arguments:
  article              Article slug or partial filename to process (optional)

Options:
  -l, --list           List available articles
  -o, --open           Open output directory after processing
  -f, --force          Force re-process all files (ignore cache)
  --zh                 Only process Chinese articles
  --en                 Only process English articles
  -q, --quiet          Minimal output
  -v, --verbose        Detailed output
  -h, --help           Show this help

Examples:
  pnpm medium                         # Process all changed articles
  pnpm medium rice                    # Process article matching "rice"
  pnpm medium --en                    # Only English articles
  pnpm medium fundamental-limits -o   # Process and open output
  pnpm medium --list                  # Show available articles
  pnpm medium --force                 # Force full rebuild

Output:
  specs/{spec-folder}/medium-{locale}.md   Medium markdown (if spec exists)
  .temp/medium/                            Fallback for articles without specs
  static/img/blog/{slug}/medium/           PNG diagrams (permanent)

Medium Import Tips:
  1. Go to Medium.com → Stories → Import a story
  2. Paste the markdown content directly
  3. Or use the URL if hosting the markdown file
  4. Manually upload images after import
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

// Get the static image directory for an article
const getStaticImageDir = (articleFileName) => {
  return path.join(STATIC_IMG_DIR, articleFileName, 'medium');
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

// Find all blog articles
const findArticles = () => {
  const articles = [];
  
  BLOG_DIRS.forEach((blogDir) => {
    if (!fs.existsSync(blogDir)) return;
    
    const markdownFiles = glob.sync(`${blogDir}/**/*.{md,mdx}`);
    
    markdownFiles.forEach((filePath) => {
      const content = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter, content: markdownContent } = matter(content);
      
      // Check for Mermaid diagrams
      const diagrams = [];
      let match;
      const pattern = /```mermaid\n([\s\S]*?)```/g;
      while ((match = pattern.exec(markdownContent)) !== null) {
        diagrams.push(match[1].trim());
      }
      
      const locale = blogDir.includes('/zh/') ? 'zh' : 'en';
      const fileName = path.parse(filePath).name;
      
      articles.push({
        filePath,
        fileName,
        locale,
        title: frontmatter.title || fileName,
        slug: frontmatter.slug || fileName,
        description: frontmatter.description || '',
        tags: frontmatter.tags || [],
        authors: frontmatter.authors || [],
        diagramCount: diagrams.length,
        diagrams,
        frontmatter,
        mtime: fs.statSync(filePath).mtime.toISOString()
      });
    });
  });
  
  return articles;
};

// List available articles
if (options.list) {
  const articles = findArticles();
  
  if (articles.length === 0) {
    info('No articles found.');
    process.exit(0);
  }
  
  console.log('\n📚 Available Articles:\n');
  
  const enArticles = articles.filter(a => a.locale === 'en');
  const zhArticles = articles.filter(a => a.locale === 'zh');
  
  if (enArticles.length > 0) {
    console.log('🇬🇧 English:');
    enArticles.forEach(a => {
      const diagrams = a.diagramCount > 0 ? ` (${a.diagramCount} diagrams)` : '';
      console.log(`   ${a.fileName}${diagrams}`);
    });
    console.log();
  }
  
  if (zhArticles.length > 0) {
    console.log('🇨🇳 Chinese:');
    zhArticles.forEach(a => {
      const diagrams = a.diagramCount > 0 ? ` (${a.diagramCount} diagrams)` : '';
      console.log(`   ${a.fileName}${diagrams}`);
    });
  }
  
  console.log(`\n📊 Total: ${articles.length} articles`);
  process.exit(0);
}

/**
 * Convert Docusaurus admonitions to Medium-friendly blockquotes
 */
const convertAdmonitions = (content) => {
  return content.replace(
    /:::(tip|info|warning|danger|note|caution)(?:\s+(.+?))?\n([\s\S]*?)\n:::/g,
    (match, type, title, body) => {
      const emojis = { 
        tip: '💡', 
        info: 'ℹ️', 
        warning: '⚠️', 
        danger: '🚨', 
        note: '📝', 
        caution: '⚠️' 
      };
      const emoji = emojis[type] || '📌';
      const heading = title 
        ? `**${emoji} ${title}**` 
        : `**${emoji} ${type.charAt(0).toUpperCase() + type.slice(1)}**`;
      
      // Convert to blockquote format
      const quotedLines = body.split('\n').map(line => `> ${line}`).join('\n');
      return `${heading}\n\n${quotedLines}`;
    }
  );
};

/**
 * Convert MDX-specific syntax to standard markdown
 */
const convertMdxToMarkdown = (content) => {
  let result = content;
  
  // Remove MDX imports
  result = result.replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '');
  
  // Remove MDX exports
  result = result.replace(/^export\s+.*$/gm, '');
  
  // Convert MDX comments to nothing (remove them)
  result = result.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
  
  // Remove truncate markers
  result = result.replace(/\{\/\*\s*truncate\s*\*\/\}/g, '');
  
  // Convert JSX-style components to markdown alternatives where possible
  // Remove <details> and <summary> tags, keep content
  result = result.replace(/<details[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi, 
    (match, summary, content) => {
      return `**${summary.trim()}**\n\n${content.trim()}`;
    }
  );
  
  // Remove any remaining HTML-like tags that Medium doesn't support
  result = result.replace(/<\/?(?:div|span|br|hr)[^>]*>/gi, '');
  
  return result;
};

/**
 * Convert H5/H6 headers to bold text (Medium only supports H1-H4)
 */
const convertDeepHeaders = (content) => {
  // H6 to bold
  let result = content.replace(/^######\s+(.+)$/gm, '**$1**');
  // H5 to bold
  result = result.replace(/^#####\s+(.+)$/gm, '**$1**');
  return result;
};

/**
 * Convert relative links to absolute URLs
 */
const convertLinks = (content, locale) => {
  const baseUrl = locale === 'zh' ? `${BASE_URL}/zh` : BASE_URL;
  
  // Convert relative blog links
  let result = content.replace(
    /\[([^\]]+)\]\(\/blog\/([^)]+)\)/g,
    (match, linkText, postSlug) => `[${linkText}](${baseUrl}/blog/${postSlug})`
  );
  
  // Convert other relative links
  result = result.replace(
    /\[([^\]]+)\]\(\/(?!\/|http)([^)]+)\)/g,
    (match, linkText, path) => `[${linkText}](${baseUrl}/${path})`
  );
  
  return result;
};

/**
 * Add title and metadata as article header
 */
const addArticleHeader = (content, article) => {
  const lines = [];
  
  // Add title as H1
  lines.push(`# ${article.title}`);
  lines.push('');
  
  // Add description as subtitle/lead if exists
  if (article.description) {
    lines.push(`*${article.description}*`);
    lines.push('');
  }
  
  // Add tags as hashtags (Medium style)
  if (article.tags && article.tags.length > 0) {
    const tags = article.tags.slice(0, 5).map(tag => 
      `#${tag.replace(/\s+/g, '')}`
    ).join(' ');
    lines.push(`Tags: ${tags}`);
    lines.push('');
  }
  
  lines.push('---');
  lines.push('');
  
  return lines.join('\n') + content;
};

/**
 * Add footer with original article link
 */
const addFooter = (content, article) => {
  const baseUrl = article.locale === 'zh' ? `${BASE_URL}/zh` : BASE_URL;
  const postUrl = `${baseUrl}/blog/${article.slug}`;
  
  const footer = article.locale === 'zh'
    ? `\n\n---\n\n*📝 本文首发于我的个人技术博客 [marvinzhang.dev](${postUrl})*\n\n*🔗 原文链接：${postUrl}*`
    : `\n\n---\n\n*📝 Originally published on my personal blog [marvinzhang.dev](${postUrl})*\n\n*🔗 Original article: ${postUrl}*`;
  
  return content + footer;
};

// Main processing function
const processArticles = async () => {
  log('\n📰 Medium Blog Publishing Tool\n');
  
  ensureDir(TEMP_DIR);
  ensureDir(FALLBACK_DIR);
  
  const cache = loadCache();
  const articles = findArticles();
  
  if (articles.length === 0) {
    info('No articles found.');
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
      articles.slice(0, 10).forEach(a => console.log(`   ${a.fileName}`));
      if (articles.length > 10) {
        console.log(`   ... and ${articles.length - 10} more`);
      }
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
    
    // Determine output locations
    const staticImageDir = getStaticImageDir(article.fileName);
    const specFolder = findSpecFolder(article.slug, article.fileName);
    
    // Ensure directories exist
    if (article.diagramCount > 0) {
      ensureDir(staticImageDir);
    }
    
    verbose(`   📁 Images: ${staticImageDir}`);
    if (specFolder) {
      verbose(`   📁 Spec: ${specFolder}`);
    }
    
    // Extract and render diagrams
    const diagramFiles = [];
    
    if (article.diagramCount > 0) {
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
          
          // Path relative to static folder for absolute URL
          const relativePath = `/${staticImageDir.replace(/^static\//, '')}/${diagramFileName}.png`;
          
          diagramFiles.push({
            index: i + 1,
            name: diagramFileName,
            staticPath: pngPath,
            relativePath: relativePath,
            absoluteUrl: `${BASE_URL}${relativePath}`
          });
          verbose(`   ✅ Diagram ${i + 1} rendered → ${pngPath}`);
        } catch (err) {
          error(`Failed to render diagram ${i + 1} in ${article.fileName}`);
          verbose(`   Error: ${err.message}`);
        }
      }
    }
    
    // Process markdown content
    const content = fs.readFileSync(article.filePath, 'utf8');
    const { content: markdownContent } = matter(content);
    
    let processedContent = markdownContent;
    
    // Replace mermaid blocks with image references
    if (article.diagramCount > 0) {
      let diagramIndex = 0;
      processedContent = processedContent.replace(
        /```mermaid\n([\s\S]*?)```/g,
        (match) => {
          const diagram = diagramFiles[diagramIndex];
          diagramIndex++;
          if (diagram) {
            // Use absolute URL for Medium
            return `![Diagram ${diagram.index}](${diagram.absoluteUrl})`;
          }
          return match;
        }
      );
    }
    
    // Convert MDX to standard markdown
    processedContent = convertMdxToMarkdown(processedContent);
    
    // Convert admonitions
    processedContent = convertAdmonitions(processedContent);
    
    // Convert deep headers (H5/H6)
    processedContent = convertDeepHeaders(processedContent);
    
    // Convert relative links to absolute
    processedContent = convertLinks(processedContent, article.locale);
    
    // Add article header with title and metadata
    processedContent = addArticleHeader(processedContent, article);
    
    // Add footer
    processedContent = addFooter(processedContent, article);
    
    // Clean up extra blank lines
    processedContent = processedContent.replace(/\n{3,}/g, '\n\n');
    
    // Determine output path: spec folder if exists, otherwise fallback
    let outputPath;
    let outputLocation;
    
    if (specFolder) {
      outputPath = `${specFolder}/medium-${article.locale}.md`;
      outputLocation = 'spec';
    } else {
      outputPath = `${FALLBACK_DIR}/${article.fileName}-${article.locale}-medium.md`;
      outputLocation = 'temp';
    }
    
    fs.writeFileSync(outputPath, processedContent);
    
    // Also save to fallback for easy access if saved to spec
    const fallbackOutputPath = `${FALLBACK_DIR}/${article.fileName}-${article.locale}-medium.md`;
    if (outputLocation === 'spec') {
      fs.writeFileSync(fallbackOutputPath, processedContent);
    }
    
    // Update cache
    newCache[article.filePath] = {
      mtime: article.mtime,
      processedAt: new Date().toISOString(),
      diagramCount: article.diagramCount,
      specFolder: specFolder || null
    };
    
    results.push({
      title: article.title,
      locale: article.locale,
      output: outputPath,
      outputLocation,
      specFolder,
      staticImageDir: article.diagramCount > 0 ? staticImageDir : null,
      diagrams: diagramFiles.length
    });
    
    const locationEmoji = outputLocation === 'spec' ? '📋' : '📁';
    const diagramInfo = article.diagramCount > 0 ? ` (${diagramFiles.length} diagrams)` : '';
    log(`✅ ${article.locale.toUpperCase()}: ${article.fileName}${diagramInfo} ${locationEmoji}`);
  }
  
  // Save cache
  saveCache(newCache);
  
  // Summary
  console.log('\n' + '─'.repeat(50));
  
  const specResults = results.filter(r => r.outputLocation === 'spec');
  const tempResults = results.filter(r => r.outputLocation === 'temp');
  const totalDiagrams = results.reduce((sum, r) => sum + r.diagrams, 0);
  
  console.log(`📦 Files: ${results.length}`);
  if (totalDiagrams > 0) {
    console.log(`🖼️  Images: ${totalDiagrams}`);
  }
  
  if (specResults.length > 0) {
    console.log(`\n📋 Saved to spec folders (${specResults.length}):`);
    specResults.forEach(r => {
      console.log(`   ${r.specFolder}/medium-${r.locale}.md`);
    });
  }
  
  if (tempResults.length > 0) {
    console.log(`\n📁 Saved to temp (no spec found) (${tempResults.length}):`);
    tempResults.forEach(r => {
      console.log(`   ${path.basename(r.output)}`);
    });
  }
  
  if (totalDiagrams > 0) {
    console.log(`\n🖼️  Image folders:`);
    const uniqueDirs = [...new Set(results.filter(r => r.staticImageDir).map(r => r.staticImageDir))];
    uniqueDirs.forEach(dir => {
      console.log(`   ${dir}`);
    });
  }
  
  // Medium import instructions
  console.log('\n📰 Medium Import Instructions:');
  console.log('   1. Go to Medium.com → Stories → Import a story');
  console.log('   2. Copy content from the generated .md file');
  console.log('   3. Paste into Medium editor');
  console.log('   4. Review and adjust formatting as needed');
  console.log('   5. Add images manually if not loading from URLs');
  
  // Open output directory if requested
  if (options.open && results.length > 0) {
    // Open the first spec folder if available, otherwise fallback
    const openDir = specResults.length > 0 
      ? path.resolve(specResults[0].specFolder)
      : path.resolve(FALLBACK_DIR);
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
