#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const matter = require('gray-matter');

/**
 * Extract Mermaid diagrams from blog articles
 * Scans blog posts and creates temporary .mmd files for processing
 */

const BLOG_DIRS = ['blog', 'i18n/zh/docusaurus-plugin-content-blog'];
const TEMP_DIR = '.temp/mermaid';
const CACHE_FILE = '.temp/mermaid/.extraction-cache.json';
const DIAGRAM_PATTERN = /```mermaid\n([\s\S]*?)```/g;

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  incremental: !args.includes('--no-incremental') && !args.includes('--force'),
  force: args.includes('--force') || args.includes('-f'),
  locale: args.includes('--locale') ? args[args.indexOf('--locale') + 1] : null,
  since: args.includes('--since') ? args[args.indexOf('--since') + 1] : null,
  tags: args.includes('--tags') ? args[args.indexOf('--tags') + 1].split(',') : null,
  file: args.includes('--file') ? args[args.indexOf('--file') + 1] : null,
  help: args.includes('--help') || args.includes('-h')
};

// Show help message
if (options.help) {
  console.log(`
📖 WeChat Mermaid Extraction Tool

Usage: node scripts/extract-blog-mermaid.js [options]

Options:
  -f, --force              Force re-extraction of all files (disables incremental mode)
  --no-incremental         Disable incremental processing
  --locale <en|zh>         Only process files in specified locale
  --since <date>           Only process files modified since date (YYYY-MM-DD)
  --tags <tag1,tag2>       Only process files with specified tags (comma-separated)
  --file <filename>        Only process specific file (partial match)
  -h, --help               Show this help message

Note: Incremental mode is enabled by default - only changed files are processed.

Examples:
  node scripts/extract-blog-mermaid.js
  node scripts/extract-blog-mermaid.js --force
  node scripts/extract-blog-mermaid.js --locale zh --tags ai,computing
  node scripts/extract-blog-mermaid.js --since 2025-10-01
  node scripts/extract-blog-mermaid.js --file fundamental-limits
`);
  process.exit(0);
}

console.log('🔍 Extracting Mermaid diagrams from blog articles...');
if (options.incremental) console.log('   ⚡ Incremental mode: only processing changed files');
if (options.force) console.log('   🔄 Force mode: re-extracting all files');
if (options.locale) console.log(`   🌐 Filtering by locale: ${options.locale}`);
if (options.since) console.log(`   📅 Filtering files since: ${options.since}`);
if (options.tags) console.log(`   🏷️  Filtering by tags: ${options.tags.join(', ')}`);
if (options.file) console.log(`   📄 Filtering by file: ${options.file}`);

// Ensure temp directory exists
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
};

ensureDir(TEMP_DIR);

// Load cache
let cache = {};
if (options.incremental && !options.force && fs.existsSync(CACHE_FILE)) {
  try {
    cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    console.log(`📦 Loaded cache with ${Object.keys(cache).length} entries`);
  } catch (error) {
    console.warn('⚠️  Failed to load cache, will process all files');
    cache = {};
  }
}

// Helper to check if file should be processed
const shouldProcessFile = (filePath, frontmatter) => {
  // Check file filter
  if (options.file && !filePath.includes(options.file)) {
    return false;
  }
  
  // Check locale filter
  const locale = filePath.includes('/zh/') ? 'zh' : 'en';
  if (options.locale && locale !== options.locale) {
    return false;
  }
  
  // Check tags filter
  if (options.tags && frontmatter.tags) {
    const postTags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [frontmatter.tags];
    const hasMatchingTag = options.tags.some(tag => 
      postTags.some(postTag => postTag.toLowerCase().includes(tag.toLowerCase()))
    );
    if (!hasMatchingTag) {
      return false;
    }
  }
  
  // Check date filter
  if (options.since) {
    const sinceDate = new Date(options.since);
    const stats = fs.statSync(filePath);
    if (stats.mtime < sinceDate) {
      return false;
    }
  }
  
  // Check incremental processing
  if (options.incremental && !options.force) {
    const stats = fs.statSync(filePath);
    const cached = cache[filePath];
    
    if (cached && cached.mtime === stats.mtime.toISOString()) {
      return false; // File hasn't changed
    }
  }
  
  return true;
};

let totalDiagrams = 0;
let processedFiles = 0;
let skippedFiles = 0;
const newCache = {};

// Process each blog directory
BLOG_DIRS.forEach((blogDir) => {
  if (!fs.existsSync(blogDir)) {
    console.log(`⚠️  Blog directory not found: ${blogDir}`);
    return;
  }

  console.log(`\n📁 Processing: ${blogDir}/`);
  
  // Find all markdown files
  const markdownFiles = glob.sync(`${blogDir}/**/*.{md,mdx}`);
  
  markdownFiles.forEach((filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content: markdownContent } = matter(content);
    
    // Check if file should be processed based on filters
    if (!shouldProcessFile(filePath, frontmatter)) {
      skippedFiles++;
      // Keep existing cache entry if in incremental mode
      if (options.incremental && cache[filePath]) {
        newCache[filePath] = cache[filePath];
      }
      return;
    }
    
    // Extract all mermaid diagrams
    const diagrams = [];
    let match;
    
    while ((match = DIAGRAM_PATTERN.exec(markdownContent)) !== null) {
      diagrams.push(match[1].trim());
    }
    
    if (diagrams.length > 0) {
      const relativePath = path.relative(blogDir, filePath);
      const fileNameWithoutExt = path.parse(relativePath).name;
      const locale = blogDir.includes('/zh/') ? 'zh' : 'en';
      
      console.log(`  📊 Found ${diagrams.length} diagram(s) in: ${relativePath}`);
      
      // Create metadata file
      const metadata = {
        sourceFile: filePath,
        relativePath,
        locale,
        title: frontmatter.title || fileNameWithoutExt,
        slug: frontmatter.slug || fileNameWithoutExt,
        extractedAt: new Date().toISOString(),
        diagramCount: diagrams.length
      };
      
      // Save each diagram as separate .mmd file
      diagrams.forEach((diagram, index) => {
        const diagramFileName = `${fileNameWithoutExt}-${locale}-${index + 1}.mmd`;
        const diagramPath = path.join(TEMP_DIR, diagramFileName);
        
        fs.writeFileSync(diagramPath, diagram);
        console.log(`    💾 Saved: ${diagramFileName}`);
        totalDiagrams++;
      });
      
      // Save metadata
      const metadataPath = path.join(TEMP_DIR, `${fileNameWithoutExt}-${locale}.meta.json`);
      fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
      
      // Update cache
      const stats = fs.statSync(filePath);
      newCache[filePath] = {
        mtime: stats.mtime.toISOString(),
        diagramCount: diagrams.length,
        processedAt: new Date().toISOString()
      };
      
      processedFiles++;
    } else if (options.incremental && cache[filePath]) {
      // No diagrams but keep cache entry
      newCache[filePath] = cache[filePath];
      skippedFiles++;
    }
  });
});

// Save cache
if (options.incremental || options.force) {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(newCache, null, 2));
  console.log(`\n💾 Saved cache with ${Object.keys(newCache).length} entries`);
}

// Generate index file
const indexData = {
  extractedAt: new Date().toISOString(),
  totalDiagrams,
  processedFiles,
  skippedFiles,
  tempDir: TEMP_DIR,
  blogDirs: BLOG_DIRS,
  filters: {
    incremental: options.incremental,
    locale: options.locale,
    since: options.since,
    tags: options.tags,
    file: options.file
  }
};

fs.writeFileSync(
  path.join(TEMP_DIR, 'extraction-index.json'), 
  JSON.stringify(indexData, null, 2)
);

console.log('\n📈 Extraction Summary:');
console.log(`   📁 Processed files: ${processedFiles}`);
if (skippedFiles > 0) {
  console.log(`   ⏭️  Skipped files: ${skippedFiles}`);
}
console.log(`   📊 Total diagrams: ${totalDiagrams}`);
console.log(`   💾 Output directory: ${TEMP_DIR}/`);
console.log(`   📋 Index file: ${TEMP_DIR}/extraction-index.json`);

if (totalDiagrams === 0) {
  console.log('\nℹ️  No Mermaid diagrams found in blog articles.');
  console.log('   💡 Add diagrams to your blog posts using:');
  console.log('   ```mermaid');
  console.log('   graph TD');
  console.log('     A --> B');
  console.log('   ```');
} else {
  console.log('\n🎉 Mermaid diagrams extracted successfully!');
  console.log('   💡 Run `npm run wechat:process` to generate WeChat-ready markdown');
}