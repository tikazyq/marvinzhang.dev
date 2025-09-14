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

## Adding New Posts

1. Create English MDX in `blog/YYYY-MM-DD-post-slug.mdx`
2. Create Chinese version in `i18n/zh/docusaurus-plugin-content-blog/YYYY-MM-DD-post-slug.mdx`
3. Sync author configs in both `blog/authors.yml` and `i18n/zh/docusaurus-plugin-content-blog/authors.yml`