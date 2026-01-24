---
name: blog-announcement
description: Write announcement articles for marvinzhang.dev following 2-stage workflow (Writing → Refine) with optional questionnaire input. Use for project releases, product updates, and feature announcements. Produces concise, scannable bilingual content with clear call-to-action. Requires blog-common skill.
metadata:
  author: marvinzhang
  version: "1.0"
  workflow: "2-stage"
  style: "announcement"
---

# Blog Writing: Announcement Style

Write concise, engaging announcements for project releases and updates with clear value propositions and calls-to-action.

## Prerequisites

**Load blog-common skill** for formatting, localization, quality standards, and writing principles.

## When to Use

- Project releases and launches
- Product updates and new features
- Major milestone announcements
- Community updates
- Tool and library introductions

**Example topics**: "Introducing LeanSpec", "Crawlab 2.0 Released", "New Blog Feature: Skills-Based Writing"

## Input Methods

### Method 1: Questionnaire-Driven (Recommended)

For projects you know well, use questionnaire to gather structured input:

**Create spec with questionnaire**:
```bash
lean-spec create "project-name-announcement" --template=announcement
```

**Fill out questionnaire sections**:
- The News (what, version, date)
- Why It Matters (problem, audience, unique angle)
- Key Features (3-5 highlights)
- Personal Story (origin, journey, dogfooding)
- Call to Action (primary CTA, links)

**Signal completion**: Tell AI "questionnaire complete"

[See questionnaire details in references/questionnaire.md]

**Note**: The full template with questionnaire is in `.lean-spec/templates/articles/announcement.md` and auto-loads when you create specs.

### Method 2: Direct Writing

Start writing directly if structure is clear.

## Workflow: 2-Stage Process

### Stage 1: Writing (1-2 interactions)

**Objective**: Create concise, scannable announcement directly

**Approach**: Write complete article in 1-2 interactions:
- English: `blog/YYYY-MM-DD-slug.mdx` (with `unlisted: true`)
- Use questionnaire answers if available

**Article Structure**:
```markdown
## Introduction (300-400 words)
- Hook: What's new (1-2 sentences)
- Why now: Problem solved or opportunity addressed
- Key value: Primary benefit
- Preview: What's coming

## What It Does (400-600 words)
- 3-5 key features/capabilities
- Use table or list for scannability
- Focus on benefits over technical details
- Visual: Diagram or screenshot if helpful

## Why I Built It (300-500 words) [Optional]
- Origin story (keep brief)
- Key design decisions
- Dogfooding results
- Community feedback

## Getting Started (200-300 words)
- Quick start (1-3 steps)
- Links to docs, repo, demo
- Installation command or signup link
- Community resources

## Conclusion (150-200 words)
- Summary of value
- Clear call-to-action
- Future roadmap teaser
- Thank you to contributors/community
```

**Section Standards**:
- **Concise**: Every word earns its place
- **Scannable**: Use lists, tables, short paragraphs
- **Visual**: Diagrams for architecture, tables for features
- **Actionable**: Clear next steps for readers
- **Minimal code**: Installation commands only

**Quality Gates**:
- [ ] Key features highlighted (3-5 max)
- [ ] Clear call-to-action
- [ ] Links to resources (docs, demo, repo)
- [ ] Concise and scannable
- [ ] Value proposition clear

### Stage 2: Refine (1 interaction)

**Objective**: Polish and finalize

**Activities**:
1. **Clarity review**: Ensure value proposition is crystal clear
2. **CTA optimization**: Make call-to-action compelling
3. **Scannability**: Add visual breaks, lists, highlights
4. **Chinese translation**: Apply 形不同而意同 principle
5. **Final validation**: Build, format, links

**Quality Assessment**:
- [ ] Value proposition clear in first paragraph
- [ ] Key features highlighted and scannable
- [ ] Call-to-action clear and compelling
- [ ] All links working (docs, repo, demo)
- [ ] Concise (no unnecessary words)
- [ ] Chinese reads naturally
- [ ] Build succeeds: `pnpm run build`

**Publication Files**:
- English: `blog/YYYY-MM-DD-slug.mdx` (remove `unlisted: true`)
- Chinese: `i18n/zh/docusaurus-plugin-content-blog/YYYY-MM-DD-slug.mdx`

## Announcement-Specific Principles

### Lead with Value
Get to the point immediately:
```markdown
❌ "After months of hard work, we're excited to announce something amazing..."
✅ "LeanSpec is a lightweight spec-driven development toolkit that reduced our 
    feature development time by 50%."
```

### Scannable Format
Use visual hierarchy for quick reading:
- **Lists** for features
- **Tables** for comparisons
- **Bold** for key benefits
- **Short paragraphs** (2-3 sentences)

### Clear Call-to-Action
Make next steps obvious:
```markdown
## Get Started

1. Install: `npm install leanspec`
2. Read docs: [leanspec.dev/docs](https://leanspec.dev/docs)
3. Join Discord: [discord.gg/leanspec](https://discord.gg/leanspec)
```

### Minimal Technical Depth
Focus on benefits over implementation:
```markdown
❌ "We implemented a recursive AST parser using visitor pattern..."
✅ "Automatically validates specs against first principles, catching 80% of 
    design issues before coding starts."
```

## Quality Gates (Announcement-Specific)

Beyond blog-common standards:

- [ ] Key features highlighted (3-5 maximum)
- [ ] Clear call-to-action (install, try, join)
- [ ] Links to resources (docs, demo, repo)
- [ ] Concise and scannable format
- [ ] Value proposition clear in intro
- [ ] No unnecessary background or fluff
- [ ] Table or list for features
- [ ] Community/contact info included

## Export for Distribution

After publication, export for other platforms:

```bash
# WeChat (Chinese)
pnpm wechat <slug> --zh -o

# Medium (English)
pnpm medium <slug> --en -o
```

## References

- [blog-common/SKILL.md](../../blog-common/SKILL.md) - Formatting, localization, quality, style
- [references/questionnaire.md](references/questionnaire.md) - Questionnaire guide
- [LeanSpec template](../../../.lean-spec/templates/articles/announcement.md) - Full spec template with questionnaire
