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

**4-Stage Structured Approach** (see `.github/prompts/write.prompt.md` for full details):

### Stage 1: Research 🔍
- Gather comprehensive sources and validate topic viability
- Create `drafts/active/YYYY-MM-DD-slug/research.md`
- Quality gates: 5+ sources, unique angle, audience validation

### Stage 2: Outline 📋  
- Design detailed article structure and content roadmap
- Create `drafts/active/YYYY-MM-DD-slug/outline.md`
- Quality gates: logical flow, balanced sections, unified narrative

### Stage 3: Writing ✍️
- Create content section-by-section to avoid response limits
- Draft in `drafts/active/YYYY-MM-DD-slug/sections/`
- Quality gates: Marvin's voice, technical accuracy, engagement

### Stage 4: Refine 🔧
- Review, optimize, and prepare for publication
- Finalize bilingual MDX files
- Quality gates: full validation, consistency, publication-ready

**Workspace Setup**: Use `node drafts/scripts/scaffold.js "title" "YYYY-MM-DD"` to initialize article workspace with all necessary context files.

## Adding New Posts

1. Create English MDX in `blog/YYYY-MM-DD-post-slug.mdx`
2. Create Chinese version in `i18n/zh/docusaurus-plugin-content-blog/YYYY-MM-DD-post-slug.mdx`
3. Sync author configs in both `blog/authors.yml` and `i18n/zh/docusaurus-plugin-content-blog/authors.yml`