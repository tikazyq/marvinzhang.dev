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

## When to Use

- Technical deep-dives and comprehensive analysis
- Industry landscape overviews and trends
- Comparative evaluations (tools, frameworks, approaches)
- Theoretical concepts with practical implications

**Example topics**: "Understanding Rice's Theorem", "SDD Ecosystem in 2026", "LLM Architecture Evolution"

## Questionnaire-First Workflow

```bash
lean-spec create "article-slug" --template=analytical
```

Fill out the questionnaire (core thesis, evidence, counterarguments, practical implications, scope), then say "questionnaire complete".

[See questionnaire: references/questionnaire.md]

## Workflow: 4 Stages

### Stage 1: Research (1-2 interactions)

**Use `research-technical` and optionally `research-industry` skills.**

Deliverables:
- `specs/{spec-number}-{slug}/research.md` with 5+ authoritative sources
- Unique value proposition identified
- Target complexity level defined

### Stage 2: Outline (1 interaction)

Generate structural blueprint:
- Introduction (300-500 words): Hook, context, value proposition, roadmap
- 2-4 main sections (600-1000 words each): One concept per section with visual element
- Conclusion (250-400 words): Synthesis, takeaways, future implications

Deliverables: `specs/{spec-number}-{slug}/outline.md`

### Stage 3: Writing (3-6 interactions)

**Write ONE section per interaction** directly to `blog/YYYY-MM-DD-slug.mdx` (with `unlisted: true`).

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
