# marvinzhang.dev Copilot Instructions

**Docusaurus 3.8.1** bilingual blog site (English/Chinese) deployed on Vercel.

## Technical Setup

- **Package Manager**: Always use `pnpm` (not npm/yarn)
- **Blog-only**: Root path serves blog content, no docs section
- **Bilingual**: Parallel content in `blog/` (English) and `i18n/zh/docusaurus-plugin-content-blog/` (Chinese)

## Blog Post Structure

```yaml
# File paths:
# English: blog/YYYY-MM-DD-post-slug.mdx
# Chinese: i18n/zh/docusaurus-plugin-content-blog/YYYY-MM-DD-post-slug.mdx

---
slug: post-slug
title: "Post Title"
authors: ["marvin"]
tags: ["tag1", "tag2"]
date: YYYY-MM-DD
---
```

## Essential Commands

```bash
pnpm dev                           # Development server
pnpm run build                     # Production build
pnpm run write-translations -l zh  # Generate translations
```

## Blog Writing Process

**4-Stage Structured Approach** (see `.github/prompts/write.prompt.md` for full details)

### Context File Management

#### Article Workspace Setup (Automatic via Scaffold)
```bash
drafts/
├── YYYY-MM-DD-slug/
│   ├── research.md     # Stage 1: Research findings and sources
│   ├── outline.md      # Stage 2: Article structure and plan
│   ├── article.mdx     # Stage 3: English draft (authoritative source)
│   ├── article-zh.mdx  # Stage 4: Chinese translation draft
│   └── progress.md     # Cross-stage: Progress tracking
└── archive/            # Move dated folders here once the article is published
```

Scaffold: `node scripts/drafts/scaffold.js "title" "YYYY-MM-DD"`

Templates live in `templates/drafts/`. After publication, move the entire dated folder to `drafts/archive/`.