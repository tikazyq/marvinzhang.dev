#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const matter = require('gray-matter');
const glob = require('glob');

/**
 * Process blog articles for WeChat publishing
 * Converts Mermaid diagrams to images and updates markdown
 */

const TEMP_DIR = '.temp/mermaid';
const WECHAT_DIR = '.temp/wechat';
const BLOG_DIRS = ['blog', 'i18n/zh/docusaurus-plugin-content-blog'];
const BASE_URL = 'https://marvinzhang.dev';

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  locale: args.includes('--locale') ? args[args.indexOf('--locale') + 1] : null,
  since: args.includes('--since') ? args[args.indexOf('--since') + 1] : null,
  tags: args.includes('--tags') ? args[args.indexOf('--tags') + 1].split(',') : null,
  file: args.includes('--file') ? args[args.indexOf('--file') + 1] : null,
  help: args.includes('--help') || args.includes('-h')
};

// Show help message
if (options.help) {
  console.log(`
📖 WeChat Processing Tool

Usage: node scripts/process-blog-for-wechat.js [options]

Options:
  --locale <en|zh>         Only process files in specified locale
  --since <date>           Only process files modified since date (YYYY-MM-DD)
  --tags <tag1,tag2>       Only process files with specified tags (comma-separated)
  --file <filename>        Only process specific file (partial match)
  -h, --help               Show this help message

Note: Run 'pnpm wechat:extract' first to extract Mermaid diagrams.

Examples:
  node scripts/process-blog-for-wechat.js
  node scripts/process-blog-for-wechat.js --locale zh
  node scripts/process-blog-for-wechat.js --since 2025-10-01
  node scripts/process-blog-for-wechat.js --file fundamental-limits
  node scripts/process-blog-for-wechat.js --tags ai,computing
`);
  process.exit(0);
}

console.log('📱 Processing blog articles for WeChat publishing...');
if (options.locale) console.log(`   🌐 Filtering by locale: ${options.locale}`);
if (options.since) console.log(`   📅 Filtering files since: ${options.since}`);
if (options.tags) console.log(`   🏷️  Filtering by tags: ${options.tags.join(', ')}`);
if (options.file) console.log(`   📄 Filtering by file: ${options.file}`);

// Ensure directories exist
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

ensureDir(WECHAT_DIR);
ensureDir(`${WECHAT_DIR}/images`);

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
  
  return true;
};

// Check if extraction was run
if (!fs.existsSync(`${TEMP_DIR}/extraction-index.json`)) {
  console.log('❌ No extraction index found. Run `npm run wechat:extract` first.');
  process.exit(1);
}

const extractionIndex = JSON.parse(fs.readFileSync(`${TEMP_DIR}/extraction-index.json`, 'utf8'));

if (extractionIndex.totalDiagrams === 0) {
  console.log('ℹ️  No diagrams to process.');
  process.exit(0);
}

console.log(`📊 Found ${extractionIndex.totalDiagrams} diagrams to process`);

// Process diagrams to images
const mmdFiles = glob.sync(`${TEMP_DIR}/*.mmd`);
const diagramMap = new Map(); // filename -> image path

// Function to convert relative internal links to absolute URLs
const convertRelativeLinks = (content, locale) => {
  const baseUrl = locale === 'zh' ? `${BASE_URL}/zh` : BASE_URL;
  
  // Track conversions for logging
  let conversionCount = 0;
  
  // Convert relative blog links like /blog/post-slug to absolute URLs
  const converted = content.replace(
    /\[([^\]]+)\]\(\/blog\/([^)]+)\)/g,
    (match, linkText, postSlug) => {
      conversionCount++;
      return `[${linkText}](${baseUrl}/blog/${postSlug})`;
    }
  );
  
  return { content: converted, conversionsCount: conversionCount };
};

// Function to convert Docusaurus admonitions to standard Markdown
const convertAdmonitions = (content) => {
  // Remove Docusaurus-specific truncate markers
  let processed = content.replace(/\{\/\*\s*truncate\s*\*\/\}/g, '');
  
  // Convert :::tip, :::info, :::warning, :::danger, :::note, :::caution
  processed = processed.replace(
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
      const heading = title ? `${emoji} **${title}**` : `${emoji} **${type.charAt(0).toUpperCase() + type.slice(1)}**`;
      
      // Convert to blockquote format for better WeChat compatibility
      const lines = body.split('\n');
      const quotedLines = lines.map(line => line.trim() ? `> ${line}` : '>').join('\n');
      
      return `${heading}\n\n${quotedLines}`;
    }
  );
  
  return processed;
};

mmdFiles.forEach((mmdFile) => {
  const fileName = path.basename(mmdFile, '.mmd');
  const outputImage = `${WECHAT_DIR}/images/${fileName}.png`;
  
  try {
    // Generate PNG with white background for WeChat
    execSync(`npx mmdc -i "${mmdFile}" -o "${outputImage}" -t default -b white --outputFormat png -p puppeteer.config.json`, {
      stdio: 'pipe'
    });
    
    diagramMap.set(fileName, `images/${fileName}.png`);
    console.log(`✅ Generated: ${fileName}.png`);
  } catch (error) {
    console.error(`❌ Failed to generate: ${fileName}.png`);
    console.error(`   Error: ${error.message}`);
  }
});

// Process blog files
const processedFiles = [];

BLOG_DIRS.forEach((blogDir) => {
  if (!fs.existsSync(blogDir)) return;
  
  const markdownFiles = glob.sync(`${blogDir}/**/*.{md,mdx}`);
  
  markdownFiles.forEach((filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content: markdownContent } = matter(content);
    
    // Check if file should be processed based on filters
    if (!shouldProcessFile(filePath, frontmatter)) {
      return;
    }
    
    // Check if this file has mermaid diagrams
    const hasMermaid = /```mermaid\n[\s\S]*?```/g.test(markdownContent);
    
    if (!hasMermaid) return;
    
    const relativePath = path.relative(blogDir, filePath);
    const fileNameWithoutExt = path.parse(relativePath).name;
    const locale = blogDir.includes('/zh/') ? 'zh' : 'en';
    
    console.log(`\n🔄 Processing: ${relativePath}`);
    
    // Replace mermaid blocks with image references
    let diagramIndex = 0;
    const processedContent = markdownContent.replace(
      /```mermaid\n([\s\S]*?)```/g,
      (match, diagramContent) => {
        diagramIndex++;
        const diagramFileName = `${fileNameWithoutExt}-${locale}-${diagramIndex}`;
        const imagePath = diagramMap.get(diagramFileName);
        
        if (imagePath) {
          return `![Diagram ${diagramIndex}](${imagePath})`;
        } else {
          console.warn(`⚠️  No image found for diagram: ${diagramFileName}`);
          return match; // Keep original if image not found
        }
      }
    );
    
    // Convert Docusaurus admonitions to standard Markdown
    let finalContent = convertAdmonitions(processedContent);
    
    // Convert relative internal links to absolute URLs
    const linkConversion = convertRelativeLinks(finalContent, locale);
    finalContent = linkConversion.content;
    const linksConverted = linkConversion.conversionsCount;
    
    // Add footer message with link to original blog post
    const blogUrl = locale === 'zh' ? `${BASE_URL}/zh` : BASE_URL;
    const postUrl = `${blogUrl}/${frontmatter.slug || fileNameWithoutExt}`;
    
    const footerMessage = locale === 'zh' 
      ? `\n\n---\n\n📝 **本文同步发布于我的个人技术博客** [marvinzhang.dev](${postUrl})\n\n🔗 **完整文章链接：** ${postUrl}\n\n💬 **欢迎访问我的博客了解更多技术文章！**`
      : `\n\n---\n\n📝 **Originally published on my personal blog** [marvinzhang.dev](${postUrl})\n\n🔗 **Full article link:** ${postUrl}\n\n💬 **Visit my blog for more tech articles!**`;
    
    const contentWithFooter = finalContent + footerMessage;
    
    // Count admonitions converted
    const admonitionCount = (processedContent.match(/:::(tip|info|warning|danger|note|caution)/g) || []).length;
    
    // Count truncate markers removed
    const truncateCount = (processedContent.match(/\{\/\*\s*truncate\s*\*\/\}/g) || []).length;
    
    // Create WeChat-ready markdown (without frontmatter)
    const wechatContent = contentWithFooter;
    
    // Save to WeChat directory
    const outputPath = `${WECHAT_DIR}/${fileNameWithoutExt}-${locale}-wechat.md`;
    fs.writeFileSync(outputPath, wechatContent);
    
    processedFiles.push({
      original: filePath,
      wechat: outputPath,
      locale,
      title: frontmatter.title || fileNameWithoutExt,
      diagramsReplaced: diagramIndex,
      admonitionsConverted: admonitionCount,
      truncateMarkersRemoved: truncateCount,
      linksConverted: linksConverted
    });
    
    console.log(`✅ Created WeChat version: ${path.basename(outputPath)}`);
    console.log(`   📊 Replaced ${diagramIndex} diagram(s) with images`);
    if (admonitionCount > 0) {
      console.log(`   💡 Converted ${admonitionCount} admonition(s) to standard Markdown`);
    }
    if (truncateCount > 0) {
      console.log(`   ✂️ Removed ${truncateCount} truncate marker(s)`);
    }
    if (linksConverted > 0) {
      console.log(`   🔗 Converted ${linksConverted} relative link(s) to absolute URLs`);
    }
  });
});

// Generate processing summary
const summary = {
  processedAt: new Date().toISOString(),
  originalDiagrams: extractionIndex.totalDiagrams,
  generatedImages: diagramMap.size,
  processedFiles: processedFiles.length,
  files: processedFiles,
  wechatDir: WECHAT_DIR,
  filters: {
    locale: options.locale,
    since: options.since,
    tags: options.tags,
    file: options.file
  }
};

fs.writeFileSync(
  `${WECHAT_DIR}/processing-summary.json`, 
  JSON.stringify(summary, null, 2)
);

console.log('\n📈 WeChat Processing Summary:');
console.log(`   📊 Original diagrams: ${extractionIndex.totalDiagrams}`);
console.log(`   🖼️  Generated images: ${diagramMap.size}`);
console.log(`   📄 Processed files: ${processedFiles.length}`);
console.log(`   📁 Output directory: ${WECHAT_DIR}/`);

if (processedFiles.length > 0) {
  console.log('\n🎉 WeChat-ready files generated successfully!');
  console.log('   📁 Check the .temp/wechat/ directory for your files');
  console.log('   🖼️  Images are in .temp/wechat/images/');
  console.log('   📄 Markdown files are ready for WeChat publishing');
} else {
  console.log('\nℹ️  No files were processed.');
  if (singleFile) {
    console.log(`   File "${singleFile}" not found or has no Mermaid diagrams.`);
  }
}