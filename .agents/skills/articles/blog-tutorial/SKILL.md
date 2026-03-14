---
name: blog-tutorial
description: Write step-by-step tutorial articles for marvinzhang.dev following 3-stage workflow (Outline → Writing → Refine). Use for how-to guides, implementation tutorials, and practical walkthroughs. Composes foundation skills.
metadata:
  author: marvinzhang
  version: "2.0"
  workflow: "3-stage"
  style: "tutorial"
  composes: "foundation/*"
---

# Blog Writing: Tutorial Style

Clear, actionable step-by-step guides that help readers implement specific solutions.

## Required Skills

Load these alongside this workflow:
- `foundation/formatting` — MDX, Mermaid, code blocks
- `foundation/localization` — EN/ZH bilingual translation
- `foundation/quality` — Validation commands, checklists
- `foundation/writing-style` — Economist principles, tone

## When to Use

- Step-by-step implementation guides
- How-to articles for specific tasks
- Setup and configuration tutorials
- Practical walkthroughs with working results

**Example topics**: "Building a Custom React Hook", "Setting Up CI/CD with GitHub Actions"

## Questionnaire-First Workflow

```bash
lean-spec create "article-slug" --template=tutorial
```

Fill out the questionnaire (learning objectives, prerequisites, step sequence, common pitfalls, success criteria), then say "questionnaire complete".

[See questionnaire: references/questionnaire.md]

## Workflow: 3 Stages

### Stage 1: Outline (1 interaction)

Structure template:
- Introduction (300-400 words): What readers will build, prerequisites, time estimate
- Prerequisites: Tool versions, required knowledge
- 3-6 Steps (400-600 words each): Action, conceptual explanation, verification checkpoint
- Verification & Testing (200-300 words)
- Conclusion (200-300 words)

Deliverables: `specs/{spec-number}-{slug}/outline.md`

### Stage 2: Writing (2-4 interactions)

**Write ONE step per interaction** directly to `blog/YYYY-MM-DD-slug.mdx` (with `unlisted: true`).

Step checklist:
- [ ] Clear action statement at start
- [ ] Conceptual explanation (diagram/table preferred)
- [ ] Minimal essential code only (≤10 lines)
- [ ] Verification checkpoint included
- [ ] Common errors addressed
- [ ] Transition to next step

### Stage 3: Refine (1 interaction)

1. Test walkthrough: follow steps to ensure they work
2. Clarity review: each step self-contained and clear
3. Chinese translation: apply 形不同而意同 principle
4. Final validation: `pnpm run build` + `pnpm run validate:zh-bold-source`

## Tutorial-Specific Principles

### Clarity and Actionability
Every step must be **actionable** (reader knows what to do), **verifiable** (reader can confirm it worked), and **self-contained** (understandable without rereading the whole article).

### Conceptual Over Code
```markdown
❌ 50 lines of code without explanation
✅ Mermaid diagram showing the flow + 5 lines of key configuration
```

### Progressive Disclosure
Start simple, add complexity incrementally. Explain *why* at each step, not just *how*.

### Error Handling
```markdown
:::warning Common Issue
If you see "Module not found", ensure you ran `pnpm install` in step 2.
:::
```

## Quality Gates (Tutorial-Specific)

- [ ] Steps are testable and reproducible
- [ ] Prerequisites clearly stated with versions
- [ ] Common errors proactively addressed
- [ ] Working end result demonstrated
- [ ] Each step has verification checkpoint
- [ ] Time estimate provided

## References

- [references/questionnaire.md](references/questionnaire.md) — Questionnaire guide
