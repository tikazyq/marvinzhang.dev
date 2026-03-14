---
name: blog-common
description: Convenience bundle that loads all foundation skills for marvinzhang.dev blog article writing. Composes formatting, localization, quality, and writing-style skills. Load this when you want all foundation standards at once. For targeted work (e.g., just fixing formatting), load individual foundation skills instead.
metadata:
  author: marvinzhang
  version: "2.0"
  tier: bundle
  composes: "foundation/formatting, foundation/localization, foundation/quality, foundation/writing-style"
---

# Blog Common (Convenience Bundle)

Loads all foundation skills for blog article writing on marvinzhang.dev.

## Composed Of

| Skill | Purpose |
| ----- | ------- |
| `foundation/formatting` | MDX syntax, Mermaid diagrams, code blocks, section structure |
| `foundation/localization` | EN/ZH bilingual translation, 形不同而意同 principle |
| `foundation/quality` | Validation commands, checklists, pre-publish gates |
| `foundation/writing-style` | Economist-inspired principles, tone, voice |

## When to Use

**Load this bundle** when writing or editing any blog article — it gives you all foundation standards in one skill.

**Load individual skills instead** when:
- Fixing formatting only → `foundation/formatting`
- Translating to Chinese → `foundation/localization`
- Running quality audit → `foundation/quality`
- Reviewing writing style → `foundation/writing-style`

## Usage with Article Workflows

Always combine this bundle (or the individual foundation skills) with one article workflow:

```
blog-common + blog-analytical   → Deep-dive technical analysis
blog-common + blog-tutorial     → Step-by-step guide
blog-common + blog-experiential → Personal insights article
blog-common + blog-announcement → Project release
```

## Quick Reference

- **Package manager**: `pnpm` only (never npm or yarn)
- **Date**: Always get current date programmatically: `date +%Y-%m-%d`
- **Section-by-section**: Write one section per interaction to final MDX files
- **Validation**: `pnpm run build` + `pnpm run validate:zh-bold-source`
