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
    console.error('Example: node scripts/drafts/scaffold.js "Understanding React Hooks" "2025-09-25"');
    console.error('');
    console.error('📅 Important: Use the current date or your intended publication date.');
    console.error('    The date will be used in both filename and frontmatter consistently.');
    process.exit(1);
  }

  // Validate date format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    console.error('Error: Date must be in YYYY-MM-DD format');
    console.error('Example: 2025-09-25');
    process.exit(1);
  }

  // Validate date is reasonable (not too far in past/future)
  const inputDate = new Date(date);
  const currentDate = new Date();
  const oneYearAgo = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
  const sixMonthsAhead = new Date(currentDate.getFullYear(), currentDate.getMonth() + 6, currentDate.getDate());
  
  if (inputDate < oneYearAgo || inputDate > sixMonthsAhead) {
    console.warn(`⚠️  Warning: Date ${date} seems unusual (too far past/future).`);
    console.warn(`    Current date: ${currentDate.toISOString().split('T')[0]}`);
    console.warn('    Proceeding anyway, but please verify this is correct.');
  }

  const slug = generateSlug(title);
  const workspaceDir = `${date}-${slug}`;
  const draftsRoot = path.join(__dirname, '..', '..', 'drafts');
  const fullPath = path.join(draftsRoot, workspaceDir);
  const templatesPath = path.join(__dirname, '..', '..', 'templates', 'drafts');
  const blogRoot = path.join(__dirname, '..', '..', 'blog');
  const blogZhRoot = path.join(
    __dirname,
    '..',
    '..',
    'i18n',
    'zh',
    'docusaurus-plugin-content-blog'
  );

  console.log(`Creating article workspace: ${workspaceDir}`);
  console.log(`📅 Using date: ${date} (ensure this matches your intended publication date)`);

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

      // Replace placeholders with consistent date handling
      const currentTimestamp = new Date().toISOString().split('T')[0];
      content = content
        .replace(/\[Title\]/g, title)
        .replace(/\[YYYY-MM-DD\]/g, date)
        .replace(/\[YYYY-MM-DD-slug\]/g, workspaceDir)
        .replace(/\[Agent Name\]/g, 'Scaffold Generator')
        .replace(/\[Agent\]/g, 'Scaffold Generator')
        .replace(/\[Current Date\]/g, currentTimestamp);

      fs.writeFileSync(targetPath, content);
      console.log(`✅ Created ${template}`);
    } else {
      console.warn(`⚠️  Template ${template} not found`);
    }
  });

  // Create blog MDX drafts with `draft: true`
  const enMdxPath = path.join(blogRoot, `${date}-${slug}.mdx`);
  const zhMdxPath = path.join(blogZhRoot, `${date}-${slug}.mdx`);

  const enFrontmatter = `---
slug: ${slug}
title: "${title}"
authors: ["marvin"]
tags: ["tag1"]
date: ${date}
draft: true
---

<!-- 
IMPORTANT: Date consistency check
- Filename: ${date}-${slug}.mdx
- Frontmatter date: ${date}
- These MUST match exactly for proper blog functionality
- AI agents: Always verify date alignment when editing
-->

<!-- Write section-by-section. Keep this file as the authoritative English draft. -->

`;
  const zhFrontmatter = `---
slug: ${slug}
title: "${title}"
authors: ["marvin"]
tags: ["标签1"]
date: ${date}
draft: true
---

<!-- 
重要：日期一致性检查
- 文件名: ${date}-${slug}.mdx
- 前置数据日期: ${date}
- 这些必须完全匹配以确保博客功能正常
- AI代理：编辑时请始终验证日期对齐
-->

<!-- 中文草稿：英文稳定后再翻译。 -->

`;

  fs.mkdirSync(blogRoot, { recursive: true });
  fs.mkdirSync(blogZhRoot, { recursive: true });
  fs.writeFileSync(enMdxPath, enFrontmatter, 'utf8');
  fs.writeFileSync(zhMdxPath, zhFrontmatter, 'utf8');
  console.log(`✅ Created blog drafts:
  - ${path.relative(path.join(__dirname, '..', '..'), enMdxPath)}
  - ${path.relative(path.join(__dirname, '..', '..'), zhMdxPath)}`);
  console.log('');
  console.log('🎉 Article workspace created successfully!');
  console.log('');
  console.log('📁 Workspace structure:');
  console.log(`   drafts/${workspaceDir}/`);
  console.log('   ├── research.md       # Research sources and findings');
  console.log('   ├── outline.md        # Article structure and plan');
  console.log('   └── progress.md       # Writing progress tracking');
  console.log('   blog/YYYY-MM-DD-slug.mdx                  # English draft (draft: true)');
  console.log('   i18n/zh/docusaurus-plugin-content-blog/YYYY-MM-DD-slug.mdx  # Chinese draft (draft: true)');
  console.log('');
  console.log('📝 Writing guidelines (updated):');
  console.log('   • Introduction: 300-500 words (hook + context + roadmap)');
  console.log('   • Main sections: 600-1000 words each');
  console.log('   • Conclusion: 250-400 words (summary + takeaways)');
  console.log('   • Visual-first: Use Mermaid diagrams and tables over code');
  console.log('   • Core concepts: Highlight key ideas with callouts');
  console.log('   • Inline references: Link to official docs at first mention');
  console.log('');
  console.log('📝 Next steps:');
  console.log('1. Start with research.md to gather sources and plan visuals');
  console.log('2. Create detailed outline in outline.md');
  console.log('3. Write sections directly in blog/MDX with draft: true');
  console.log('4. Update progress.md after each section');
  console.log('5. Translate to the zh MDX during Stage 4');
  console.log('');
  console.log('🤖 For AI agents:');
  console.log(`   • Article date: ${date} (used in filename AND frontmatter)`);
  console.log('   • Always maintain date consistency between filename and frontmatter');
  console.log('   • When in doubt about current date, ask the user or check context');
  console.log('   • Filename format: YYYY-MM-DD-slug.mdx');
  console.log('   • Frontmatter date format: YYYY-MM-DD');
}

// Run the script
const title = process.argv[2];
const date = process.argv[3];

createArticleWorkspace(title, date);
