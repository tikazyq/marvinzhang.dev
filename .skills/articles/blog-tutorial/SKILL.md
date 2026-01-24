---
name: blog-tutorial
description: Write step-by-step tutorial articles for marvinzhang.dev following 3-stage workflow (Outline → Writing → Refine). Use for how-to guides, implementation tutorials, and practical walkthroughs. Produces clear, actionable bilingual content with minimal code. Requires blog-common skill.
metadata:
  author: marvinzhang
  version: "1.0"
  workflow: "3-stage"
  style: "tutorial"
---

# Blog Writing: Tutorial Style

Write clear, actionable step-by-step guides that help readers implement specific solutions.

## Prerequisites

**Load blog-common skill** for formatting, localization, quality standards, and writing principles.

## When to Use

- Step-by-step implementation guides
- How-to articles for specific tasks
- Setup and configuration tutorials
- Practical walkthroughs with working results
- Skill-building exercises

**Example topics**: "Building a Custom React Hook", "Setting Up CI/CD with GitHub Actions", "Implementing Dark Mode in Docusaurus"

## Questionnaire-First Workflow

**Start every tutorial with the questionnaire** to gather structured input:

```bash
lean-spec create "article-slug" --template=tutorial
```

This creates a spec with embedded questionnaire covering:
- Learning objectives and prerequisites
- Step sequence overview
- Environment and tools
- Common pitfalls
- Success criteria

**Fill out the questionnaire**, then tell AI "questionnaire complete". This ensures clear scope and helps structure the tutorial effectively.

[See questionnaire guide in references/questionnaire.md]

## Workflow: 3-Stage Process

### Stage 1: Outline (1 interaction)

**Objective**: Create clear step-by-step structure

**Activities**:
1. **Define prerequisites**: What readers need to know/have before starting
2. **Map steps**: Sequential tasks from start to working result
3. **Identify checkpoints**: Verification points to ensure progress
4. **Plan troubleshooting**: Common errors and solutions

**Structure Template**:
```markdown
## Introduction (300-400 words)
- What readers will build/achieve
- Prerequisites (skills, tools, versions)
- Time estimate
- Final result preview

## Prerequisites
- Tool/technology versions
- Required knowledge level
- Setup requirements

## Step 1: [Action] (400-600 words)
- What you'll do in this step
- Conceptual explanation (diagrams preferred)
- Implementation approach (minimal code)
- Verification checkpoint
- Common errors and fixes

[Repeat for 3-6 steps]

## Verification & Testing (200-300 words)
- How to verify everything works
- Expected output/behavior
- Troubleshooting guide

## Conclusion (200-300 words)
- What was accomplished
- Next steps or extensions
- Related resources
```

**Deliverables**:
- Complete `specs/{spec-number}-{slug}/outline.md`
- Clear step sequence
- Checkpoint verification points
- Common errors documented

**Quality Gates**:
- [ ] Steps are sequential and logical
- [ ] Each step has clear verification
- [ ] Prerequisites clearly stated
- [ ] Final working result defined

### Stage 2: Writing (2-4 interactions)

**Objective**: Create clear, testable content step-by-step

**Approach**: **Write ONE step per interaction** directly to final files:
- English: `blog/YYYY-MM-DD-slug.mdx` (with `unlisted: true`)
- Track progress in spec folder

**Step Standards**:
- **Clear action**: Each step starts with what reader will do
- **Conceptual explanation**: Use diagrams/tables to explain approach
- **Minimal code**: Only essential configuration/syntax (≤10 lines)
- **Checkpoint**: How to verify this step worked
- **Troubleshooting**: Common errors specific to this step

**Step Completion Checklist**:
- [ ] Clear action statement at start
- [ ] Conceptual explanation (diagram/table preferred)
- [ ] Minimal essential code only
- [ ] Verification checkpoint included
- [ ] Common errors addressed
- [ ] Transition to next step

[See complete writing guidelines in blog-common/SKILL.md]

### Stage 3: Refine (1 interaction)

**Objective**: Validate, polish, and finalize

**Activities**:
1. **Test walkthrough**: Follow steps yourself to ensure they work
2. **Clarity review**: Ensure each step is self-contained and clear
3. **Chinese translation**: Apply 形不同而意同 principle
4. **Final validation**: Build, format, links

**Quality Assessment**:
- [ ] All steps tested and working
- [ ] Prerequisites accurate and complete
- [ ] Verification points clear
- [ ] Troubleshooting comprehensive
- [ ] Code examples minimal but sufficient
- [ ] Chinese reads naturally
- [ ] Build succeeds: `pnpm run build`

**Publication Files**:
- English: `blog/YYYY-MM-DD-slug.mdx` (remove `unlisted: true`)
- Chinese: `i18n/zh/docusaurus-plugin-content-blog/YYYY-MM-DD-slug.mdx`

## Tutorial-Specific Principles

### Clarity and Actionability
Every step must be:
- **Actionable**: Reader knows exactly what to do
- **Verifiable**: Reader can confirm it worked
- **Self-contained**: Can understand step without rereading whole article

### Conceptual Over Code
Prefer diagrams and explanations over code dumps:
```markdown
❌ 50 lines of code without explanation
✅ Mermaid diagram showing the flow + 5 lines of key configuration
```

### Progressive Disclosure
Build complexity gradually:
- Start with simplest working version
- Add features incrementally
- Explain why at each step, not just how

### Error Handling
Address common issues proactively:
```markdown
:::warning Common Issue
If you see "Module not found", ensure you ran `pnpm install` in step 2.
:::
```

## Quality Gates (Tutorial-Specific)

Beyond blog-common standards:

- [ ] Steps are testable and reproducible
- [ ] Prerequisites clearly stated with versions
- [ ] Common errors proactively addressed
- [ ] Working end result demonstrated
- [ ] Each step has verification checkpoint
- [ ] Code minimal (≤10 lines per block)
- [ ] Diagrams/tables explain concepts
- [ ] Time estimate provided

## References

- [blog-common/SKILL.md](../../blog-common/SKILL.md) - Formatting, localization, quality, style
- [references/questionnaire.md](references/questionnaire.md) - Questionnaire guide
- [LeanSpec template](../../../.lean-spec/templates/articles/tutorial.md) - Full spec template with questionnaire
