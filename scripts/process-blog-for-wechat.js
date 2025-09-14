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

mmdFiles.forEach((mmdFile) => {
  const fileName = path.basename(mmdFile, '.mmd');
  const outputImage = `${WECHAT_DIR}/images/${fileName}.png`;
  
  try {
    // Generate PNG with white background for WeChat
    execSync(`mmdc -i "${mmdFile}" -o "${outputImage}" -t default -b white --outputFormat png`, {
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
    const hasMermaid = /```mermaid\n[\s\S]*?\n```/g.test(markdownContent);
    
    if (!hasMermaid) return;
    
    const relativePath = path.relative(blogDir, filePath);
    const fileNameWithoutExt = path.parse(relativePath).name;
    const locale = blogDir.includes('/zh/') ? 'zh' : 'en';
    
    console.log(`\n🔄 Processing: ${relativePath}`);
    
    // Replace mermaid blocks with image references
    let diagramIndex = 0;
    const processedContent = markdownContent.replace(
      /```mermaid\n([\s\S]*?)\n```/g,
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
    
    // Create WeChat-ready markdown
    const wechatContent = matter.stringify(processedContent, frontmatter);
    
    // Save to WeChat directory
    const outputPath = `${WECHAT_DIR}/${fileNameWithoutExt}-${locale}-wechat.md`;
    fs.writeFileSync(outputPath, wechatContent);
    
    processedFiles.push({
      original: filePath,
      wechat: outputPath,
      locale,
      title: frontmatter.title || fileNameWithoutExt,
      diagramsReplaced: diagramIndex
    });
    
    console.log(`✅ Created WeChat version: ${path.basename(outputPath)}`);
    console.log(`   📊 Replaced ${diagramIndex} diagram(s) with images`);
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