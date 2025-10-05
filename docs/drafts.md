# Drafts Workflow

This document describes how to use the drafts workflow for creating blog articles.

## Layout

```
 drafts/
 ├── YYYY-MM-DD-slug/
 │   ├── research.md      # Stage 1: Research findings and sources
 │   ├── outline.md       # Stage 2: Article structure and plan
 │   └── progress.md      # Cross-stage: Progress tracking
 └── archive/             # Move dated folders here once the article is published
```

## Templates and Scripts

- Templates live in `templates/drafts/`
  - research.md, outline.md, progress.md
- Scaffold script: `scripts/drafts/scaffold.js`
  - Usage: `node scripts/drafts/scaffold.js "title" "YYYY-MM-DD"`

## Workflow

1. Run the scaffold to create a workspace
2. Complete research.md and outline.md under drafts/YYYY-MM-DD-slug/
3. Write section-by-section directly in blog/YYYY-MM-DD-slug.mdx with `draft: true`
4. Translate in i18n/zh/.../YYYY-MM-DD-slug.mdx with `draft: true`
5. When ready to publish, set `unlisted: false` in both MDX files and move the drafts workspace to `drafts/archive/`

## Notes

- We no longer maintain separate `active` and `completed` folders
- We no longer create `notes.md` by default
- Authoritative drafts now live in blog/ and i18n zh with `draft: true`
