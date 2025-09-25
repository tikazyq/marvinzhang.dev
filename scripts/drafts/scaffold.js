#!/usr/bin/env node

/**
 * Blog Article Scaffold Generator
 *
 * Creates a new article workspace with all necessary template files
 * Usage: node scripts/drafts/scaffold.js "article-title" "YYYY-MM-DD"
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
    console.error('Usage: node scripts/drafts/scaffold.js "article-title" "YYYY-MM-DD"');
    console.error('Example: node scripts/drafts/scaffold.js "Understanding React Hooks" "2025-09-14"');
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
  const draftsRoot = path.join(__dirname, '..', '..', 'drafts');
  const fullPath = path.join(draftsRoot, workspaceDir);
  const templatesPath = path.join(__dirname, '..', '..', 'templates', 'drafts');

  console.log(`Creating article workspace: ${workspaceDir}`);

  // Create workspace directory
  if (fs.existsSync(fullPath)) {
    console.error(`Error: Workspace ${workspaceDir} already exists`);
    process.exit(1);
  }

  fs.mkdirSync(fullPath, { recursive: true });

  // Copy and customize templates
  const templates = ['research.md', 'outline.md', 'progress.md'];

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

  // Create article.mdx file (English draft authoritative)
  const articleContent = `# ${title}

[Write the article section-by-section directly in this file.]

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

  fs.writeFileSync(path.join(fullPath, 'article.mdx'), articleContent);
  console.log(`✅ Created article.mdx (English draft)`);

  // Create placeholder for Chinese translation draft
  fs.writeFileSync(path.join(fullPath, 'article-zh.mdx'), '# 待翻译：完成英文稿 article.mdx 后在此撰写中文稿');
  console.log('');
  console.log('🎉 Article workspace created successfully!');
  console.log('');
  console.log('📁 Workspace structure:');
  console.log(`   drafts/${workspaceDir}/`);
  console.log('   ├── research.md       # Research sources and findings');
  console.log('   ├── outline.md        # Article structure and plan');
  console.log('   ├── article.mdx       # English draft (authoritative)');
  console.log('   ├── article-zh.mdx    # Chinese translation draft');
  console.log('   └── progress.md       # Writing progress tracking');
  console.log('');
  console.log('📝 Next steps:');
  console.log('1. Start with research.md to gather sources');
  console.log('2. Create detailed outline in outline.md');
  console.log('3. Write sections directly in article.mdx');
  console.log('4. Update progress.md after each section');
  console.log('5. Translate to article-zh.mdx during Stage 4');
}

// Run the script
const title = process.argv[2];
const date = process.argv[3];

createArticleWorkspace(title, date);
