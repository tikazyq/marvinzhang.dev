#!/usr/bin/env node

/**
 * Blog Article Scaffold Generator
 * 
 * Creates a new article workspace with all necessary template files
 * Usage: node scaffold.js "article-title" "YYYY-MM-DD"
 */

const fs = require('fs');
const path = require('path');

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim('-'); // Remove leading/trailing hyphens
}

function createArticleWorkspace(title, date) {
  if (!title || !date) {
    console.error('Usage: node scaffold.js "article-title" "YYYY-MM-DD"');
    console.error('Example: node scaffold.js "Understanding React Hooks" "2025-09-14"');
    process.exit(1);
  }

  // Validate date format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    console.error('Error: Date must be in YYYY-MM-DD format');
    process.exit(1);
  }

  const slug = generateSlug(title);
  const workspaceDir = `${date}-${slug}`;
  const fullPath = path.join(__dirname, '..', 'active', workspaceDir);
  const templatesPath = path.join(__dirname, '..', 'templates');
  
  console.log(`Creating article workspace: ${workspaceDir}`);
  
  // Create workspace directory
  if (fs.existsSync(fullPath)) {
    console.error(`Error: Workspace ${workspaceDir} already exists`);
    process.exit(1);
  }
  
  fs.mkdirSync(fullPath, { recursive: true });
  
  // Copy and customize templates
  const templates = ['research.md', 'outline.md', 'progress.md', 'notes.md'];
  
  templates.forEach(template => {
    const templatePath = path.join(templatesPath, template);
    const targetPath = path.join(fullPath, template);
    
    if (fs.existsSync(templatePath)) {
      let content = fs.readFileSync(templatePath, 'utf8');
      
      // Replace placeholders
      content = content
        .replace(/\[Title\]/g, title)
        .replace(/\[YYYY-MM-DD\]/g, date)
        .replace(/\[YYYY-MM-DD-slug\]/g, workspaceDir)
        .replace(/\[Agent Name\]/g, 'Scaffold Generator')
        .replace(/\[Agent\]/g, 'Scaffold Generator');
      
      fs.writeFileSync(targetPath, content);
      console.log(`✅ Created ${template}`);
    } else {
      console.warn(`⚠️  Template ${template} not found`);
    }
  });
  
  // Create article.md file
  const articleContent = `# ${title}

[Article content will be written here section by section]

## Introduction
[Introduction section - 500-800 words]

## Main Content Sections
[Main sections - 600-1000 words each]

## Conclusion
[Conclusion section - 400-600 words]

---
**Status**: Not Started
**Word Count**: 0
**Last Updated**: ${date}
**Writing Progress**: Ready for Stage 3 (Writing)
`;
  
  fs.writeFileSync(path.join(fullPath, 'article.md'), articleContent);
  console.log(`✅ Created article.md file`);
  
  // Create initial frontmatter files
  const frontmatterEN = `---
slug: ${slug}
title: "${title}"
authors: ["marvin"]
tags: ["tag1", "tag2", "tag3"]
date: ${date}
---

# ${title}

[Article content will be assembled here from article.md]
`;

  const frontmatterCN = `---
slug: ${slug}
title: "${title}"
authors: ["marvin"]
tags: ["tag1", "tag2", "tag3"]
date: ${date}
---

# ${title}

[Article content will be assembled here from article.md]
`;

  fs.writeFileSync(path.join(fullPath, 'article-en.mdx'), frontmatterEN);
  fs.writeFileSync(path.join(fullPath, 'article-cn.mdx'), frontmatterCN);
  
  console.log('✅ Created frontmatter files');
  console.log('');
  console.log('🎉 Article workspace created successfully!');
  console.log('');
  console.log('📁 Workspace structure:');
  console.log(`   drafts/active/${workspaceDir}/`);
  console.log('   ├── research.md       # Research sources and findings');
  console.log('   ├── outline.md        # Article structure and plan');
  console.log('   ├── article.md        # Complete article content');
  console.log('   ├── progress.md       # Writing progress tracking');
  console.log('   ├── notes.md          # Writing notes and ideas');
  console.log('   ├── article-en.mdx    # English version template');
  console.log('   └── article-cn.mdx    # Chinese version template');
  console.log('');
  console.log('📝 Next steps:');
  console.log('1. Start with research.md to gather sources');
  console.log('2. Create detailed outline in outline.md');
  console.log('3. Begin writing sections directly in article.md');
  console.log('4. Update progress.md after each section');
  console.log('5. Use notes.md for ideas and writing strategies');
}

// Run the script
const title = process.argv[2];
const date = process.argv[3];

createArticleWorkspace(title, date);