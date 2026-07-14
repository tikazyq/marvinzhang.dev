---
name: blog-analytical
description: Write deep-dive analytical technical articles for marvinzhang.dev following 4-stage workflow (Research → Outline → Writing → Refine). Use for technical deep-dives, technology comparisons, industry analysis, and theoretical concepts with practical implications. Composes foundation and research skills.
metadata:
  author: marvinzhang
  version: "2.0"
  workflow: "4-stage"
  style: "analytical"
  composes: "foundation/*, research/research-technical, research/research-industry"
---

# Blog Writing: Analytical Style

Comprehensive technical analysis with data-driven argumentation and Economist-inspired clarity.

## Required Skills

Load these alongside this workflow:
- `foundation/formatting` — MDX, Mermaid, code blocks
- `foundation/localization` — EN/ZH bilingual translation
- `foundation/quality` — Validation commands, checklists
- `foundation/writing-style` — Economist principles, tone
- `research/research-technical` — Stage 1: source gathering
- `research/research-industry` — Stage 1: market context (if applicable)
- `foundation/chat-driven` — All interaction happens in chat

## When to Use

- Technical deep-dives and comprehensive analysis
- Industry landscape overviews and trends
- Comparative evaluations (tools, frameworks, approaches)
- Theoretical concepts with practical implications

**Example topics**: "Understanding Rice's Theorem", "SDD Ecosystem in 2026", "LLM Architecture Evolution"

## Getting Started

For a deep article, AI scaffolds the draft workspace, then gathers input through conversation:

```bash
node scripts/drafts/scaffold.js "Article Title" "YYYY-MM-DD"
```

This creates `drafts/{YYYY-MM-DD-slug}/` with the research/outline/progress three-piece kit plus unlisted MDX drafts in `blog/` and `i18n/zh/`. The three-piece kit is the default path for deep articles, not a hard requirement — lightweight posts (news, short announcements) can skip the scaffold and be driven directly in chat.

AI asks questions from the conversation guide 1-2 at a time — covering core thesis, evidence, counterarguments, implications, and scope. Author answers in chat. AI writes everything to the draft workspace.

[See conversation guide: references/questionnaire.md]

## Workflow: 4 Stages

### Stage 1: Research (1-2 interactions)

**Use `research-technical` and optionally `research-industry` skills.**

Deliverables:
- `drafts/{YYYY-MM-DD-slug}/research.md` with 5+ authoritative sources
- Unique value proposition identified
- Target complexity level defined

### Stage 2: Outline (1 interaction) — HARD ALIGNMENT GATE

Generate structural blueprint:
- Introduction (300-500 words): Hook, context, value proposition, roadmap
- 2-4 main sections (600-1000 words each): One concept per section with visual element
- Conclusion (250-400 words): Synthesis, takeaways, future implications

Deliverables: `drafts/{YYYY-MM-DD-slug}/outline.md`

**Do not start Stage 3 until the author approves the outline AND a hook sample.**
Present both inline in chat: the outline plus the actual opening paragraphs
drafted in full. The hook is where voice problems show first — a wrong hook
approved late costs a full rewrite (learned 2026-07: a complete draft was
rejected for hook/voice/balance issues that one alignment round would have
caught). Title is part of this gate: it must not presuppose knowledge of a
book, paper, or niche reference — the body may explain 《人月神话》, the
title may not depend on it.

### Stage 3: Writing (3-6 interactions)

**Write ONE section per interaction** directly to `blog/YYYY-MM-DD-slug.mdx` (with `unlisted: true`).

**Chinese-first for zh-primary articles.** When the main readership is the
公众号 audience, draft the ZH version natively in the author's voice
(`foundation/writing-style` → zh-voice red lines), then *restate* — never
sentence-translate — the EN version from the final ZH. Translation direction
EN→ZH produces 翻译腔 that survives editing; drafting direction must match
the primary audience. Record which locale is authoritative in an MDX comment.

**Figures are a default deliverable, not an extra.** Deep articles ship with
3-6 static figures in the house style (860px canvas, semantic palette,
bilingual variants), generated from HTML sources in `drafts/{slug}/figures/`
and rendered to `static/img/blog/{slug}/`. Reference workflow: the
stack-selection and coordination-tax articles' `figures/gen_figures.py` +
`render.mjs`. An interactive widget complements figures; it does not replace
them (exports like WeChat need static images).

**Notation for general readers.** Introduce symbols (λ, σ, κ, …) once with
plain-language aliases, then keep the alias and symbol riding together at key
mentions ("对齐成本 κ", "queueing cost σ"). Bare symbols belong only in
formulas and parameter lists. Add a one-line reader note after the
definitions ("记不住字母没关系，跟着中文走就行").

Section checklist:
- [ ] Appropriate word count (600-1000 for main sections)
- [ ] Visual element included (diagram or table)
- [ ] All claims sourced with inline links
- [ ] Core concepts bolded at first mention
- [ ] Smooth transition to next section

### Stage 4: Refine (1-2 interactions)

1. Content review: narrative flow, technical accuracy, style consistency
2. Chinese translation: apply 形不同而意同 principle
3. Final validation: `pnpm run build` + `pnpm run validate:zh-bold-source`

Publication: remove `unlisted: true` from both EN and ZH files.

## Analytical-Specific Principles

### Data-Driven Argumentation
```markdown
❌ "This approach is much faster"
✅ "Vite builds our app in 12s vs Webpack's 47s—a 4x speedup measured across 50 CI runs"
```

### Precision Over Vagueness
- Specific numbers: "40% faster" not "significantly faster"
- Named technologies: "React 18.2" not "modern framework"
- Time-stamped claims: "As of December 2025"

### Multiple Perspectives
- Acknowledge different viewpoints
- Discuss trade-offs explicitly
- Present balanced analysis

## Quality Gates (Analytical-Specific)

- [ ] Minimum 5 authoritative sources cited and linked
- [ ] All numerical claims have verifiable sources
- [ ] Multiple perspectives represented fairly
- [ ] Trade-offs explicitly discussed
- [ ] Unique angle clearly articulated

## References

- [references/questionnaire.md](references/questionnaire.md) — Questionnaire guide
