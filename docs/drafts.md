# Drafts Workflow

This document describes how to use the drafts workflow for creating blog articles.

## Layout

```
 drafts/
 ├── YYYY-MM-DD-slug/
 │   ├── research.md      # Stage 1: Research findings and sources
 │   ├── outline.md       # Stage 2: Article structure and plan
 │   ├── article.mdx      # Stage 3: English draft (authoritative)
 │   ├── article-zh.mdx   # Stage 4: Chinese translation draft
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
2. Complete research.md and outline.md
3. Write section-by-section directly in article.mdx
4. Translate to article-zh.mdx during refinement
5. After publication, move the dated folder into `drafts/archive/`

## Notes

- We no longer maintain separate `active` and `completed` folders
- We no longer create `notes.md` by default
- We no longer use `article.md`; `article.mdx` is the authoritative English draft
