---
name: blog-announcement
description: Write announcement articles for marvinzhang.dev following 2-stage workflow (Writing → Refine). Use for project releases, product updates, and feature announcements. Composes foundation skills.
metadata:
  author: marvinzhang
  version: "2.0"
  workflow: "2-stage"
  style: "announcement"
  composes: "foundation/formatting, foundation/localization, foundation/quality"
---

# Blog Writing: Announcement Style

Concise, engaging announcements with clear value propositions and calls-to-action.

## Required Skills

Load these alongside this workflow:
- `foundation/formatting` — MDX, Mermaid, code blocks
- `foundation/localization` — EN/ZH bilingual translation
- `foundation/quality` — Validation commands, checklists

## When to Use

- Project releases and launches
- Product updates and new features
- Major milestone announcements
- Tool and library introductions

**Example topics**: "Introducing LeanSpec", "Crawlab 2.0 Released"

## Input Methods

### Method 1: Questionnaire-Driven (Recommended)

```bash
lean-spec create "project-name-announcement" --template=announcement
```

Fill out: The News, Why It Matters, Key Features, Personal Story, Call to Action.

[See questionnaire: references/questionnaire.md]

### Method 2: Direct Writing

Start writing directly if structure is clear.

## Workflow: 2 Stages

### Stage 1: Writing (1-2 interactions)

Write complete article directly to `blog/YYYY-MM-DD-slug.mdx` (with `unlisted: true`).

Structure:
- Introduction (300-400 words): What's new, why now, key value
- What It Does (400-600 words): 3-5 features, table/list for scannability
- Why I Built It (300-500 words): Origin story, design decisions [Optional]
- Getting Started (200-300 words): Quick start steps, links
- Conclusion (150-200 words): Summary, CTA, roadmap teaser

### Stage 2: Refine (1 interaction)

1. Clarity review: value proposition crystal clear
2. CTA optimization: compelling call-to-action
3. Scannability: visual breaks, lists, highlights
4. Chinese translation: apply 形不同而意同 principle
5. Final validation: `pnpm run build` + `pnpm run validate:zh-bold-source`

## Announcement-Specific Principles

### Lead with Value
```markdown
❌ "After months of hard work, we're excited to announce something amazing..."
✅ "LeanSpec reduced our feature development time by 50%."
```

### Scannable Format
- **Lists** for features, **tables** for comparisons, **bold** for key benefits, **short paragraphs** (2-3 sentences)

### Clear Call-to-Action
```markdown
## Get Started
1. Install: `npm install leanspec`
2. Read docs: [leanspec.dev/docs](https://leanspec.dev/docs)
```

### Minimal Technical Depth
```markdown
❌ "We implemented a recursive AST parser using visitor pattern..."
✅ "Automatically validates specs, catching 80% of design issues before coding."
```

## Quality Gates (Announcement-Specific)

- [ ] Key features highlighted (3-5 maximum)
- [ ] Clear call-to-action (install, try, join)
- [ ] Links to resources (docs, demo, repo)
- [ ] Concise and scannable format
- [ ] Value proposition clear in intro

## Export for Distribution

```bash
pnpm wechat <slug> --zh -o    # WeChat
pnpm medium <slug> --en -o    # Medium
```

## References

- [references/questionnaire.md](references/questionnaire.md) — Questionnaire guide
