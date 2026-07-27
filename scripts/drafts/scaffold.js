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

  // Create blog MDX drafts with `unlisted: true`
  const enMdxPath = path.join(blogRoot, `${date}-${slug}.mdx`);
  const zhMdxPath = path.join(blogZhRoot, `${date}-${slug}.mdx`);

  const enFrontmatter = `---
slug: ${slug}
title: "${title}"
authors: ["marvin"]
tags: ["TODO"]
date: ${date}
unlisted: true
---

<!--
Date consistency: filename ${date}-${slug}.mdx and frontmatter date ${date} MUST match.

Before writing (SOP):
- Tags: replace ["TODO"] with the real set — English slugs, IDENTICAL in the EN and
  ZH files. Do NOT localize tag slugs (repo convention: English tags in both locales).
- Primary locale: this is a bilingual article — decide which locale is authoritative for
  THIS piece. 公众号 deep-dives are Chinese-primary: draft the ZH file natively, then
  restate this EN version from the final ZH (形不同而意同), never sentence-translate.
- Write section-by-section; keep the authoritative-locale file as the source of truth.
-->

`;
  const zhFrontmatter = `---
slug: ${slug}
title: "${title}"
authors: ["marvin"]
tags: ["TODO"]
date: ${date}
unlisted: true
---

<!--
日期一致性：文件名 ${date}-${slug}.mdx 与 frontmatter date ${date} 必须一致。

开始写作前（SOP）：
- 标题：本篇若以中文为主稿，请将上方 title 改为中文主标题（脚手架默认填入的是英文标题）。
- 标签：将 ["TODO"] 换成真实标签——英文 slug，且 EN/ZH 两个文件完全一致，勿本地化标签（仓库惯例：两个语言都用英文标签）。
- 主稿语言：双语文章，请先确定本篇主稿语言。公众号深度文一般以中文为主稿——
  先用中文原生成文，英文再由定稿中文复述而来（形不同而意同），非逐句翻译。
- 逐节写作，以主稿语言的文件为准。
-->

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
  console.log('   blog/YYYY-MM-DD-slug.mdx                  # English draft (unlisted: true)');
  console.log('   i18n/zh/docusaurus-plugin-content-blog/YYYY-MM-DD-slug.mdx  # Chinese draft (unlisted: true)');
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
  console.log('3. Write sections into the authoritative-locale MDX (unlisted: true) — ZH for 公众号 deep-dives');
  console.log('4. Update progress.md after each section');
  console.log('5. Restate the other locale from the finalized primary draft (Stage 4; 形不同而意同, not sentence translation)');
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
