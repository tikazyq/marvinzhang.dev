---
name: blog-experiential
description: Write experiential articles for marvinzhang.dev following 3-stage workflow (Outline → Writing → Refine). Use for personal insights, lessons learned, project retrospectives, and reflective pieces. Composes foundation skills.
metadata:
  author: marvinzhang
  version: "2.0"
  workflow: "3-stage"
  style: "experiential"
  composes: "foundation/*"
---

# Blog Writing: Experiential Style

Personal, reflective articles sharing lessons learned and practical insights from real experiences.

## Required Skills

Load these alongside this workflow:
- `foundation/formatting` — MDX, Mermaid, code blocks
- `foundation/localization` — EN/ZH bilingual translation
- `foundation/quality` — Validation commands, checklists
- `foundation/writing-style` — Economist principles, tone
- `foundation/chat-driven` — All interaction happens in chat

## When to Use

- Lessons learned from projects or experiences
- Project retrospectives and case studies
- Career reflections and growth stories
- Problem-solving journeys

**Example topics**: "What I Learned from 5 Years in Open Source", "My Journey from Vibe Coding to SDD"

## Getting Started

AI creates the spec, then gathers input through conversation:

```bash
lean-spec create "article-slug" --template=experiential
```

AI asks questions from the conversation guide 1-2 at a time — covering context, challenge, approach, lessons, and advice. Author answers in chat. AI writes everything to the spec.

[See conversation guide: references/questionnaire.md]

## Workflow: 3 Stages

### Stage 1: Outline (1 interaction)

Narrative arc: Context → Challenge → Approach → Outcome → Lessons

- Introduction (300-500 words): Compelling moment, context, relevance
- The Context (400-600 words): Situation, initial assumptions
- The Challenge (500-700 words): What went wrong, turning points
- The Approach (500-700 words): How you tackled it, iterations
- The Outcome (400-600 words): Results, unexpected learnings
- Lessons & Takeaways (400-600 words): 3-5 concrete lessons

Deliverables: `specs/{spec-number}-{slug}/outline.md`

### Stage 2: Writing (3-5 interactions)

**Write ONE section per interaction** directly to `blog/YYYY-MM-DD-slug.mdx` (with `unlisted: true`).

Section checklist:
- [ ] Specific examples with details
- [ ] Honest about challenges and failures
- [ ] Visual element where helpful
- [ ] Lessons clearly articulated
- [ ] Natural story flow

### Stage 3: Refine (1 interaction)

1. Story review: narrative cohesion and flow
2. Lesson validation: insights clear and actionable
3. Tone check: balance humility with authority
4. Chinese translation: apply 形不同而意同 principle
5. Final validation: `pnpm run build` + `pnpm run validate:zh-bold-source`

## Experiential-Specific Principles

### Specificity Over Generality
```markdown
❌ "Communication is important in teams"
✅ "When our team missed a critical deadline because I assumed others understood
   the database migration requirements, I learned to over-communicate technical
   dependencies"
```

### Honesty and Vulnerability
Share failures openly — what went wrong, what you misunderstood, how you recovered, what you'd do differently.

### Actionable Lessons
```markdown
❌ "Be more careful with technical debt"
✅ "Set a 'debt ceiling': if fixing takes >2 hours, create a spec and schedule it.
    We reduced emergency fixes by 60% after implementing this rule."
```

## Quality Gates (Experiential-Specific)

- [ ] Specific stories with details, not vague generalities
- [ ] Lessons clearly articulated and actionable
- [ ] Honest about failures and mistakes
- [ ] Balance of narrative and technical content
- [ ] Natural story flow throughout

## References

- [references/questionnaire.md](references/questionnaire.md) — Questionnaire guide
