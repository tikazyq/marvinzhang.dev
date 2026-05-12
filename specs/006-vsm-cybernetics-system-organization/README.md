---
status: planned
created: '2026-05-12'
tags:
  - style:analytical
  - lang:bilingual
priority: medium
created_at: '2026-05-12T00:51:50.037999471+00:00'
---

# VSM × Cybernetics — How Systems Stay Viable

> **Status**: 🗓️ Planned · **Priority**: Medium · **Created**: 2026-05-12 · **Style**: 🔬 Analytical

## Overview

| | |
| ----- | ----- |
| **Topic** | Beer's Viable System Model and cybernetics as a diagnostic language for AI agent systems |
| **Audience** | Senior engineers, architects, and AI-systems builders familiar with mainstream architecture languages but new to cybernetics |
| **Languages** | English + Chinese (bilingual, written section-by-section in lockstep) |
| **Slug** | `vsm-cybernetics-system-organization` |
| **EN MDX** | `blog/2026-05-12-vsm-cybernetics-system-organization.mdx` (`unlisted: true`) |
| **ZH MDX** | `i18n/zh/docusaurus-plugin-content-blog/2026-05-12-vsm-cybernetics-system-organization.mdx` (`unlisted: true`) |

## Spec Layout

The Stage 1 Research questionnaire was skipped per the author's instruction — thesis, angle, and citation targets are pre-supplied. The spec is split across three files instead of being collapsed into this README:

- **[`research.md`](./research.md)** — thesis, unique angle, citations, scope, style and quality constraints
- **[`outline.md`](./outline.md)** — full section-by-section blueprint with word counts and figure placeholders
- **`README.md`** (this file) — index and progress tracker

## Workflow

1. ✅ Research and outline seeded directly (no questionnaire)
2. 🔄 Author confirms outline
3. ⬜ Stage 3 Writing — section by section, EN then ZH for the *same* section before advancing
4. ⬜ Stage 4 Refine — `pnpm run validate:zh-bold-source:fix` + `pnpm run build`; leave `unlisted: true` for manual publication

## Progress

| Stage | Status | Notes |
|-------|--------|-------|
| Research | ✅ Seeded | See `research.md` |
| Outline | 🔄 Awaiting confirmation | See `outline.md` |
| Writing §1 Hook | ⬜ | EN → ZH |
| Writing §2 History | ⬜ | EN → ZH |
| Writing §3 Mainstream failure | ⬜ | EN → ZH |
| Writing §4 VSM walk-through | ⬜ | EN → ZH; Figure 1 placeholder |
| Writing §5 Counterintuitive points | ⬜ | EN → ZH |
| Writing §6 Conant-Ashby + Goodhart | ⬜ | EN → ZH; theoretical climax |
| Writing §7 Footnote | ⬜ | EN → ZH; Onsager mention, <200 words |
| Refine | ⬜ | validate + build, leave unlisted |

**Status legend**: ⬜ Not started · 🔄 In progress · ✅ Complete

## Notes

- `lean-spec create --template=analytical` (v0.2.28) populated this `README.md` from the **default** template (`.lean-spec/templates/spec-template.md`) rather than the analytical template configured in `.lean-spec/config.json`. The analytical-template fields (questionnaire, research, outline) live in `research.md` and `outline.md` instead, per the author's chosen layout (Option B).
- Onsager is the author's in-progress agent-factory project. It appears in exactly one place in the article — the Section 7 footnote, under 200 words, with no subsystem names and no tech stack.
