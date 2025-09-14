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
const DIAGRAM_PATTERN = /```mermaid\n([\s\S]*?)\n```/g;

console.log('🔍 Extracting Mermaid diagrams from blog articles...');

// Ensure temp directory exists
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
};

ensureDir(TEMP_DIR);

let totalDiagrams = 0;
let processedFiles = 0;

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
      
      processedFiles++;
    }
  });
});

// Generate index file
const indexData = {
  extractedAt: new Date().toISOString(),
  totalDiagrams,
  processedFiles,
  tempDir: TEMP_DIR,
  blogDirs: BLOG_DIRS
};

fs.writeFileSync(
  path.join(TEMP_DIR, 'extraction-index.json'), 
  JSON.stringify(indexData, null, 2)
);

console.log('\n📈 Extraction Summary:');
console.log(`   📁 Processed files: ${processedFiles}`);
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