---
status: complete
created: '2025-11-27'
tags:
  - workflow
  - writing
  - methodology
  - ai-collaboration
priority: high
created_at: '2025-11-27T06:47:31.831Z'
updated_at: '2025-11-27T06:50:31.777Z'
transitions:
  - status: in-progress
    at: '2025-11-27T06:47:36.367Z'
  - status: complete
    at: '2025-11-27T06:50:31.777Z'
completed_at: '2025-11-27T06:50:31.777Z'
completed: '2025-11-27'
---

# Questionnaire-Driven Article Writing Workflow

> **Status**: ✅ Complete · **Priority**: High · **Created**: 2025-11-27 · **Tags**: workflow, writing, methodology, ai-collaboration

## Overview

A streamlined article writing process that replaces back-and-forth chat with a structured questionnaire. The AI generates targeted questions in a markdown file, the author fills it out asynchronously, then the AI continues writing based on the completed input.

## Problem

The current 4-stage writing workflow has friction at the research/outline stages:
- **Chat ping-pong**: AI asks questions, waits for response, asks follow-up, repeat
- **Context loss**: Important details shared in chat may be forgotten or buried
- **Inefficient**: Author can't batch their thinking; constantly interrupted by AI prompts
- **No persistence**: Chat answers aren't saved for future reference

## Solution: Questionnaire-First Approach

### Workflow

```
1. AI generates → questionnaire.md (in drafts/ folder)
2. Author fills out → questionnaire.md (async, at their pace)
3. Author signals → "questionnaire complete"
4. AI reads & writes → article based on answers
```

### Questionnaire Structure

The questionnaire adapts based on article style:

| Style | Focus Areas |
|-------|-------------|
| **Announcement** | What's new, why it matters, key features, call-to-action |
| **Tutorial** | Prerequisites, steps, expected outcomes, common pitfalls |
| **Analytical** | Thesis, evidence, counterarguments, implications |
| **Experiential** | Context, challenge, approach, lessons, advice |

### File Location

All writing artifacts live in the spec folder for unified management:

```
specs/NNN-article-slug/
├── README.md           # Spec metadata and status
├── questionnaire.md    # AI generates, author fills
├── research.md         # Optional: AI-gathered sources
├── outline.md          # Generated from questionnaire answers
└── progress.md         # Stage tracking (optional)
```

**Benefits of spec-based storage:**
- Single source of truth (LeanSpec manages everything)
- `lean-spec board` shows article progress alongside other work
- `lean-spec search` finds article-related content
- Git history tracks all changes in one place
- No separate `drafts/` folder to manage

### Benefits

- **Async-friendly**: Author can think deeply without time pressure
- **Persistent**: Answers saved in git, referenceable later
- **Structured**: Targeted questions produce focused content
- **Efficient**: One questionnaire replaces 5-10 chat exchanges

## Implementation

### Questionnaire Template (Announcement Style)

```markdown
# Article Questionnaire: [Topic]

## The News
- **What are you announcing?**
  <!-- One sentence: what exists now that didn't before -->

- **Version/date?**
  <!-- e.g., "v0.2.7, released Nov 26, 2025" -->

## Why It Matters
- **What problem does this solve?**
  <!-- The pain point this addresses -->

- **Who is the target audience?**
  <!-- Be specific: "Solo devs using AI assistants" not "developers" -->

- **What's the unique angle?**
  <!-- Why this over alternatives -->

## Key Features (pick 3-5)
1. **Feature name**: [one-line benefit]
2. **Feature name**: [one-line benefit]
3. **Feature name**: [one-line benefit]

## Personal Story
- **Origin**: Why did you build this?
- **Journey**: How long? Key milestones?
- **Dogfooding**: Are you using it yourself? Results?

## Call to Action
- **Primary CTA**: What should readers do first?
- **Links**: GitHub, docs, demo, etc.

## Tone & Positioning
- [ ] Humble/practical: "I built this to solve my own problem"
- [ ] Industry positioning: "Here's what's missing in the market"
- [ ] Technical deep-dive: Focus on architecture/principles
```

## Plan

- [x] Design questionnaire workflow
- [x] Create questionnaire template for announcement style
- [ ] Generate questionnaire for LeanSpec article (spec 002)
- [ ] Update AGENTS.md with questionnaire workflow option
- [ ] Add questionnaire templates for other styles (tutorial, analytical, experiential)

## Test

- [ ] Author can complete questionnaire in <15 minutes
- [ ] AI can generate complete article from questionnaire alone
- [ ] Questionnaire eliminates need for clarifying chat exchanges

## Notes

This workflow is especially valuable for:
- Busy authors who prefer async work
- Articles requiring personal input (experiences, opinions, project announcements)
- Reducing AI token usage by consolidating context gathering
