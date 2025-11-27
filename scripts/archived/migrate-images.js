#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');
const glob = require('glob');
const matter = require('gray-matter');

/**
 * Blog Image Migration Tool
 * 
 * Migrates external images to local storage in static/img/blog/.
 * Downloads images from external URLs and updates MDX file references.
 * 
 * Usage:
 *   pnpm migrate:images                  # Scan and report (dry run)
 *   pnpm migrate:images --execute        # Actually download and update files
 *   pnpm migrate:images --article slug   # Process specific article
 *   pnpm migrate:images --list           # List all external images
 */

const BLOG_DIRS = ['blog', 'i18n/zh/docusaurus-plugin-content-blog'];
const STATIC_IMG_DIR = 'static/img/blog';
const IMAGE_URL_PATTERN = /!\[([^\]]*)\]\((https?:\/\/[^)]+)\)/g;

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  help: args.includes('--help') || args.includes('-h'),
  list: args.includes('--list') || args.includes('-l'),
  execute: args.includes('--execute') || args.includes('-e'),
  verbose: args.includes('--verbose') || args.includes('-v'),
  article: null,
  skipDomains: ['github.com', 'githubusercontent.com', 'shields.io', 'badge'],
};

// Get --article value
const articleIdx = args.findIndex(a => a === '--article' || a === '-a');
if (articleIdx !== -1 && args[articleIdx + 1]) {
  options.article = args[articleIdx + 1];
}

// Show help message
if (options.help) {
  console.log(`
🖼️  Blog Image Migration Tool

Migrates external images to local storage for better sustainability.

Usage:
  pnpm migrate:images [options]

Options:
  -l, --list              List all external images found
  -e, --execute           Execute migration (download + update references)
  -a, --article <slug>    Process specific article only
  -v, --verbose           Show detailed output
  -h, --help              Show this help

Examples:
  pnpm migrate:images                     # Dry run - show what would be done
  pnpm migrate:images --list              # List all external images
  pnpm migrate:images --execute           # Download all and update files
  pnpm migrate:images -a graph-theory -e  # Migrate specific article

Output Structure:
  static/img/blog/
  └── {date}-{slug}/
      ├── image-1.png
      ├── image-2.jpg
      └── ...

Notes:
  - GitHub badges/shields are skipped by default
  - Original file extensions are preserved
  - Files are named sequentially if original name is unclear
`);
  process.exit(0);
}

// Logging helpers
const log = (msg) => console.log(msg);
const verbose = (msg) => options.verbose && console.log(msg);
const success = (msg) => console.log(`✅ ${msg}`);
const error = (msg) => console.error(`❌ ${msg}`);
const info = (msg) => console.log(`ℹ️  ${msg}`);
const warn = (msg) => console.log(`⚠️  ${msg}`);

// Ensure directory exists
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Extract filename from URL
const getFilenameFromUrl = (url, index) => {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const basename = path.basename(pathname);
    
    // If basename has a reasonable extension, use it
    const ext = path.extname(basename).toLowerCase();
    if (['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'].includes(ext)) {
      // Clean up the filename
      const name = path.basename(basename, ext)
        .replace(/[^a-zA-Z0-9-_]/g, '-')
        .replace(/-+/g, '-')
        .substring(0, 50);
      return `${name}${ext}`;
    }
    
    // Fallback: use index-based naming
    return `image-${index + 1}.png`;
  } catch {
    return `image-${index + 1}.png`;
  }
};

// Download image from URL
const downloadImage = (url, destPath) => {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const request = protocol.get(url, { 
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BlogImageMigrator/1.0)'
      }
    }, (response) => {
      // Handle redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        downloadImage(response.headers.location, destPath)
          .then(resolve)
          .catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }
      
      const file = fs.createWriteStream(destPath);
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve(destPath);
      });
      
      file.on('error', (err) => {
        fs.unlink(destPath, () => {}); // Clean up
        reject(err);
      });
    });
    
    request.on('error', reject);
    request.on('timeout', () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
};

// Check if URL should be skipped
const shouldSkipUrl = (url) => {
  return options.skipDomains.some(domain => url.includes(domain));
};

// Find all external images in blog posts
const findExternalImages = () => {
  const results = [];
  
  BLOG_DIRS.forEach((blogDir) => {
    if (!fs.existsSync(blogDir)) return;
    
    const files = glob.sync(`${blogDir}/**/*.{md,mdx}`);
    
    files.forEach((filePath) => {
      const content = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter } = matter(content);
      
      const images = [];
      let match;
      const pattern = new RegExp(IMAGE_URL_PATTERN.source, 'g');
      
      while ((match = pattern.exec(content)) !== null) {
        const [fullMatch, altText, imageUrl] = match;
        
        if (!shouldSkipUrl(imageUrl)) {
          images.push({
            fullMatch,
            altText,
            url: imageUrl,
            position: match.index
          });
        }
      }
      
      if (images.length > 0) {
        const fileName = path.parse(filePath).name;
        const locale = blogDir.includes('/zh/') ? 'zh' : 'en';
        
        // Extract date prefix if present (e.g., 2023-01-18)
        const dateMatch = fileName.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
        const datePrefix = dateMatch ? dateMatch[1] : '';
        const slug = dateMatch ? dateMatch[2] : fileName;
        
        results.push({
          filePath,
          fileName,
          locale,
          datePrefix,
          slug,
          title: frontmatter.title || fileName,
          images,
          imageCount: images.length
        });
      }
    });
  });
  
  return results;
};

// Calculate new local path for an image
const getLocalImagePath = (article, imageIndex, imageUrl) => {
  const folderName = article.datePrefix 
    ? `${article.datePrefix}-${article.slug}`
    : article.slug;
  
  const fileName = getFilenameFromUrl(imageUrl, imageIndex);
  const localFolder = `${STATIC_IMG_DIR}/${folderName}`;
  const localPath = `${localFolder}/${fileName}`;
  
  // Reference path for MDX (relative to static/)
  const mdxRef = `/img/blog/${folderName}/${fileName}`;
  
  return { localFolder, localPath, mdxRef, fileName };
};

// List mode
if (options.list) {
  const articles = findExternalImages();
  
  if (articles.length === 0) {
    info('No external images found in blog posts.');
    process.exit(0);
  }
  
  console.log('\n🖼️  External Images in Blog Posts\n');
  
  let totalImages = 0;
  const domains = {};
  
  articles.forEach((article) => {
    console.log(`📄 ${article.title} (${article.locale.toUpperCase()})`);
    console.log(`   File: ${article.filePath}`);
    console.log(`   Images:`);
    
    article.images.forEach((img, i) => {
      console.log(`   ${i + 1}. ${img.url}`);
      if (img.altText) console.log(`      Alt: "${img.altText}"`);
      
      // Track domains
      try {
        const domain = new URL(img.url).hostname;
        domains[domain] = (domains[domain] || 0) + 1;
      } catch {}
    });
    
    totalImages += article.images.length;
    console.log();
  });
  
  console.log('─'.repeat(50));
  console.log(`📊 Summary: ${totalImages} external images in ${articles.length} articles`);
  console.log('\n🌐 Domains:');
  Object.entries(domains)
    .sort((a, b) => b[1] - a[1])
    .forEach(([domain, count]) => {
      console.log(`   ${domain}: ${count}`);
    });
  
  process.exit(0);
}

// Main processing function
const migrateImages = async () => {
  log('\n🖼️  Blog Image Migration Tool\n');
  
  let articles = findExternalImages();
  
  if (articles.length === 0) {
    info('No external images found in blog posts.');
    return;
  }
  
  // Filter by article if specified
  if (options.article) {
    articles = articles.filter(a => 
      a.fileName.toLowerCase().includes(options.article.toLowerCase()) ||
      a.slug.toLowerCase().includes(options.article.toLowerCase())
    );
    
    if (articles.length === 0) {
      error(`No articles matching "${options.article}" found.`);
      process.exit(1);
    }
  }
  
  const totalImages = articles.reduce((sum, a) => sum + a.imageCount, 0);
  log(`📊 Found ${totalImages} external images in ${articles.length} article(s)`);
  
  if (!options.execute) {
    log('\n🔍 DRY RUN - showing what would be done:\n');
  } else {
    log('\n🚀 EXECUTING migration...\n');
    ensureDir(STATIC_IMG_DIR);
  }
  
  const results = {
    success: 0,
    failed: 0,
    skipped: 0,
    errors: []
  };
  
  for (const article of articles) {
    log(`\n📄 ${article.title}`);
    verbose(`   File: ${article.filePath}`);
    
    const imageMapping = [];
    const localFolder = getLocalImagePath(article, 0, article.images[0].url).localFolder;
    
    if (options.execute) {
      ensureDir(localFolder);
    }
    
    // Download each image
    for (let i = 0; i < article.images.length; i++) {
      const img = article.images[i];
      const { localPath, mdxRef, fileName } = getLocalImagePath(article, i, img.url);
      
      if (!options.execute) {
        log(`   📥 ${img.url}`);
        log(`      → ${mdxRef}`);
        imageMapping.push({ original: img.fullMatch, url: img.url, localRef: mdxRef });
        continue;
      }
      
      // Check if already downloaded
      if (fs.existsSync(localPath)) {
        verbose(`   ⏭️  Skipped (exists): ${fileName}`);
        imageMapping.push({ original: img.fullMatch, url: img.url, localRef: mdxRef });
        results.skipped++;
        continue;
      }
      
      // Download
      try {
        verbose(`   📥 Downloading: ${img.url}`);
        await downloadImage(img.url, localPath);
        success(`Downloaded: ${fileName}`);
        imageMapping.push({ original: img.fullMatch, url: img.url, localRef: mdxRef });
        results.success++;
      } catch (err) {
        error(`Failed: ${img.url} - ${err.message}`);
        results.failed++;
        results.errors.push({ url: img.url, error: err.message, article: article.fileName });
      }
    }
    
    // Update MDX file
    if (options.execute && imageMapping.length > 0) {
      let content = fs.readFileSync(article.filePath, 'utf8');
      let modified = false;
      
      for (const mapping of imageMapping) {
        if (content.includes(mapping.url)) {
          // Replace the URL in markdown image syntax
          const oldPattern = `](${mapping.url})`;
          const newPattern = `](${mapping.localRef})`;
          
          if (content.includes(oldPattern)) {
            content = content.replace(oldPattern, newPattern);
            modified = true;
            verbose(`   🔄 Updated reference: ${mapping.localRef}`);
          }
        }
      }
      
      if (modified) {
        fs.writeFileSync(article.filePath, content);
        success(`Updated: ${article.filePath}`);
      }
    }
  }
  
  // Summary
  console.log('\n' + '─'.repeat(50));
  
  if (options.execute) {
    console.log('📊 Migration Results:');
    console.log(`   ✅ Downloaded: ${results.success}`);
    console.log(`   ⏭️  Skipped: ${results.skipped}`);
    console.log(`   ❌ Failed: ${results.failed}`);
    
    if (results.errors.length > 0) {
      console.log('\n❌ Failed downloads:');
      results.errors.forEach(e => {
        console.log(`   ${e.article}: ${e.url}`);
        console.log(`      Error: ${e.error}`);
      });
    }
    
    console.log(`\n📦 Images stored in: ${path.resolve(STATIC_IMG_DIR)}`);
  } else {
    console.log('ℹ️  This was a dry run. Use --execute to actually migrate.');
    console.log('   pnpm migrate:images --execute');
  }
  
  console.log('\n🎉 Done!\n');
};

// Run
migrateImages().catch(err => {
  error(err.message);
  process.exit(1);
});
