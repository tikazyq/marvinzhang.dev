# Agent Skills for marvinzhang.dev

This directory contains **Agent Skills** following the [agentskills.io](https://agentskills.io) format for structured, discoverable AI-assisted blog writing.

## Structure

```
.skills/
├── blog-common/                # Shared standards for all articles
│   ├── SKILL.md               # Main skill: formatting, localization, quality, style
│   └── references/            # Detailed guidelines
│       ├── formatting.md
│       ├── localization.md
│       ├── quality-standards.md
│       └── economist-principles.md
│
└── articles/                   # Article-specific workflows
    ├── blog-analytical/        # Deep-dive analysis (4-stage)
    ├── blog-tutorial/          # Step-by-step guides (3-stage)
    ├── blog-experiential/      # Personal insights (3-stage)
    └── blog-announcement/      # Project releases (2-stage)
```

## Usage

### With Compatible AI Tools

Compatible with Claude, Cursor, GitHub Copilot, and other Agent Skills-supporting tools:

1. **Auto-discovery**: AI tools recognize SKILL.md files automatically
2. **On-demand loading**: AI loads skills when relevant to the task
3. **Progressive disclosure**: Loads metadata → instructions → references as needed

### Manual Loading

For AI tools without native skills support:

```markdown
Load the following skills for writing a blog article:

1. .skills/blog-common/SKILL.md
2. .skills/articles/blog-analytical/SKILL.md (or tutorial/experiential/announcement)

Then help me write an article about [topic].
```

## Skills Overview

### blog-common (Required for All Articles)

**Core standards shared across all blog articles:**
- MDX formatting (comments, truncate, admonitions, bold)
- Mermaid diagrams with theme-aware styling
- EN/ZH bilingual translation (形不同而意同 principle)
- Quality validation commands and checklists
- Economist-inspired writing principles

**Load first**: All article types require blog-common

### blog-analytical (Deep-Dive Analysis)

**4-stage workflow**: Research → Outline → Writing → Refine

**Use for:**
- Technical deep-dives
- Technology comparisons
- Industry analysis
- Theoretical concepts with practical implications

**Characteristics:**
- Data-driven argumentation
- 5+ authoritative sources
- Multiple perspectives
- Precision over vagueness

### blog-tutorial (Step-by-Step Guides)

**3-stage workflow**: Outline → Writing → Refine

**Use for:**
- How-to guides
- Implementation tutorials
- Setup and configuration
- Skill-building exercises

**Characteristics:**
- Clear sequential steps
- Verification checkpoints
- Troubleshooting guidance
- Minimal code (conceptual focus)

### blog-experiential (Personal Insights)

**3-stage workflow**: Outline → Writing → Refine

**Use for:**
- Lessons learned
- Project retrospectives
- Career reflections
- Problem-solving journeys

**Characteristics:**
- Narrative-driven
- Honest about failures
- Specific stories
- Actionable takeaways

### blog-announcement (Project Releases)

**2-stage workflow**: Writing → Refine

**Use for:**
- Project releases
- Product updates
- Feature announcements
- Major milestones

**Characteristics:**
- Concise and scannable
- Clear value proposition
- Strong call-to-action
- Optional questionnaire input

## Skill Selection Guide

| Article Type            | Skill             | Workflow Stages | Key Focus                    |
| ----------------------- | ----------------- | --------------- | ---------------------------- |
| Deep technical analysis | blog-analytical   | 4               | Data-driven, multi-source    |
| How-to guide            | blog-tutorial     | 3               | Step-by-step, actionable     |
| Lessons learned         | blog-experiential | 3               | Narrative, honest reflection |
| Project launch          | blog-announcement | 2               | Concise, clear CTA           |

## Progressive Disclosure

Skills are structured for efficient context usage:

1. **Metadata** (~100 tokens): Name and description loaded at startup
2. **Instructions** (<5000 tokens): Main SKILL.md loaded when activated
3. **References** (as needed): Detailed guides loaded only when required

This ensures AI agents use context efficiently while having access to comprehensive guidelines.

## Quality Standards

All articles must pass:
- [ ] Build succeeds: `pnpm run build`
- [ ] Both EN and ZH versions exist with matching metadata
- [ ] Visual elements (diagrams/tables) in main sections
- [ ] Chinese formatting validated: `pnpm run validate:zh-bold-source`
- [ ] All claims sourced with inline links
- [ ] Core concepts highlighted

See [blog-common/references/quality-standards.md](blog-common/references/quality-standards.md) for complete checklist.

## Integration with LeanSpec

Article planning uses LeanSpec for tracking:

```bash
# Create article spec
lean-spec create "article-topic" --tags article,style:analytical,lang:bilingual

# Track progress
lean-spec update "article-topic" --status in-progress

# Complete
lean-spec update "article-topic" --status complete
```

All planning artifacts (research, outline, progress) live in `specs/{number}-{slug}/`.

## Migration from prompts/

Previous `prompts/` system has been superseded by Agent Skills:

| Old Location                | New Location                  |
| --------------------------- | ----------------------------- |
| `prompts/common/*.md`       | `blog-common/references/*.md` |
| `prompts/styles/*.md`       | `articles/blog-*/SKILL.md`    |
| `.github/instructions/*.md` | Integrated into skills        |

Legacy `prompts/` can be archived after verification.

## Validation

Validate skills using [skills-ref](https://github.com/agentskills/agentskills/tree/main/skills-ref):

```bash
# Install validator
npm install -g @agentskills/skills-ref

# Validate all skills
skills-ref validate .skills/blog-common
skills-ref validate .skills/articles/blog-analytical
skills-ref validate .skills/articles/blog-tutorial
skills-ref validate .skills/articles/blog-experiential
skills-ref validate .skills/articles/blog-announcement
```

## Contributing

When updating skills:

1. **Test with real articles**: Ensure guidelines work in practice
2. **Keep concise**: SKILL.md < 500 lines, move details to references
3. **Update metadata**: Bump version on significant changes
4. **Validate**: Run skills-ref validator before committing

## Further Reading

- [Agent Skills Specification](https://agentskills.io/specification)
- [Anthropic's Skills Repository](https://github.com/anthropics/skills)
- [LeanSpec Documentation](https://github.com/codervisor/lean-spec)
