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

// Parse command line arguments
const args = process.argv.slice(2);
const singleFile = args.includes('--file') ? args[args.indexOf('--file') + 1] : null;

console.log('📱 Processing blog articles for WeChat publishing...');

// Ensure directories exist
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

ensureDir(WECHAT_DIR);
ensureDir(`${WECHAT_DIR}/images`);

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
    execSync(`npx mmdc -i "${mmdFile}" -o "${outputImage}" -t default -b white --outputFormat png`, {
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
    // Skip if processing single file and this isn't it
    if (singleFile && !filePath.includes(singleFile)) {
      return;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content: markdownContent } = matter(content);
    
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
    const finalContent = convertAdmonitions(processedContent);
    
    // Add footer message with link to original blog post
    const blogUrl = locale === 'zh' ? 'https://marvinzhang.dev/zh' : 'https://marvinzhang.dev';
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
      truncateMarkersRemoved: truncateCount
    });
    
    console.log(`✅ Created WeChat version: ${path.basename(outputPath)}`);
    console.log(`   📊 Replaced ${diagramIndex} diagram(s) with images`);
    if (admonitionCount > 0) {
      console.log(`   💡 Converted ${admonitionCount} admonition(s) to standard Markdown`);
    }
    if (truncateCount > 0) {
      console.log(`   ✂️ Removed ${truncateCount} truncate marker(s)`);
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
  wechatDir: WECHAT_DIR
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