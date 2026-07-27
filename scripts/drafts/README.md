# Drafts Scripts

This directory contains automation helpers for the drafts workflow.

- `scaffold.js`: Generates an article workspace under `drafts/YYYY-MM-DD-slug/`, plus
  unlisted EN + ZH MDX stubs in `blog/` and `i18n/zh/docusaurus-plugin-content-blog/`.

## Usage

```bash
node scripts/drafts/scaffold.js "Article Title" "YYYY-MM-DD"
```

The title is used to derive the ASCII `slug` (and filenames), so pass an **English**
title even for Chinese-primary pieces; localize the ZH `title:` afterward (see below).

## Frontmatter / bilingual conventions (SOP)

The scaffold writes placeholder frontmatter. Fix these before writing — the generated
MDX comment block repeats them as a reminder:

- **Tags — English slugs, identical in both locales.** Replace the `["TODO"]`
  placeholder with the real tag set. The repo keeps the *same English tag slugs* in the
  EN and ZH files (e.g. both use `["ai", "agents", ...]`); do **not** localize tag slugs.
  Leaving the placeholder risks creating a stray `/tags/todo` page.
- **Title — localize the ZH file.** The scaffold stamps the passed (English) title into
  both locales. For a Chinese-primary piece, change the ZH file's `title:` to the Chinese
  title; the EN file keeps the English title (a restate).
- **Primary locale — decide per article.** These are bilingual articles. 公众号
  deep-dives are **Chinese-primary**: draft the ZH file natively, then restate the EN
  version from the finalized ZH (形不同而意同), never sentence-translate. Keep the
  authoritative-locale file as the source of truth and write section-by-section.

See `.agents/skills/articles/blog-analytical/SKILL.md` (Stage 3) and
`.agents/skills/foundation/localization` for the full writing workflow.
