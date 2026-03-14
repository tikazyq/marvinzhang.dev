# Agent Skills Refactor: Implementation Plan

## Problem

The current `.skills/` system has three structural issues:

1. **`blog-common` is a monolith** (~235 lines) that bundles four unrelated concerns: formatting, localization, quality standards, and writing style. You can't load one without the others.

2. **No standalone research or analysis skills.** Research is embedded inside `blog-analytical`'s Stage 1, making it unavailable outside the article-writing workflow. There's no way to say "analyze this topic" or "research this technology" without triggering the full article pipeline.

3. **AGENTS.md duplicates skill content.** At 292 lines, it restates formatting rules, localization patterns, and workflow details that already exist in skills.

## Directory Layout

**Canonical location**: `.agents/skills/` — the source of truth for all agent skills.

**Symlinks for tool compatibility**:
- `.skills/` → `.agents/skills/` (for agentskills.io-compatible tools)
- `.claude/skills/` → `../.agents/skills/` (for Claude Code)

```
.agents/
└── skills/
    ├── foundation/                    # Tier 1: Composable building blocks
    │   ├── formatting/
    │   │   ├── SKILL.md              # MDX, Mermaid, code blocks, admonitions
    │   │   └── references/
    │   │       └── formatting.md     # (moved from blog-common/references/)
    │   ├── localization/
    │   │   ├── SKILL.md              # EN/ZH bilingual, 形不同而意同
    │   │   └── references/
    │   │       └── localization.md   # (moved from blog-common/references/)
    │   ├── quality/
    │   │   ├── SKILL.md              # Validation commands, checklists, pre-commit gates
    │   │   └── references/
    │   │       └── quality-standards.md  # (moved from blog-common/references/)
    │   └── writing-style/
    │       ├── SKILL.md              # Economist principles, tone, voice
    │       └── references/
    │           └── economist-principles.md  # (moved from blog-common/references/)
    │
    ├── research/                      # Tier 2a: Research capabilities (NEW)
    │   ├── research-technical/
    │   │   └── SKILL.md              # Docs, repos, APIs, benchmarks, design patterns
    │   ├── research-industry/
    │   │   └── SKILL.md              # Market trends, adoption data, expert opinions
    │   └── research-content-gap/
    │       └── SKILL.md              # Existing content review, unique angle discovery
    │
    ├── analysis/                      # Tier 2b: Analysis capabilities (NEW)
    │   ├── analysis-topic/
    │   │   └── SKILL.md              # Evaluate topic potential, audience, depth, angle
    │   └── analysis-article/
    │       └── SKILL.md              # Review/improve drafts, quality audit, style check
    │
    ├── articles/                      # Tier 3: Workflow orchestrators (SLIMMED)
    │   ├── blog-analytical/
    │   │   ├── SKILL.md              # References foundation + research skills
    │   │   └── references/
    │   │       └── questionnaire.md  # (kept from existing)
    │   ├── blog-tutorial/
    │   │   ├── SKILL.md              # References foundation skills
    │   │   └── references/
    │   │       └── questionnaire.md
    │   ├── blog-experiential/
    │   │   ├── SKILL.md              # References foundation skills
    │   │   └── references/
    │   │       └── questionnaire.md
    │   └── blog-announcement/
    │       ├── SKILL.md              # References foundation skills
    │       └── references/
    │           └── questionnaire.md
    │
    ├── blog-common/                   # Convenience bundle (SLIMMED)
    │   └── SKILL.md                  # ~30 lines, references foundation/*
    │
    └── README.md                      # Skill catalog and composition guide

.skills/ → .agents/skills/             # Symlink for agentskills.io tools
.claude/
└── skills/ → ../.agents/skills/       # Symlink for Claude Code
```

## Implementation Steps

### Step 0: Set up directory structure and symlinks

1. Create `.agents/skills/` directory
2. Move contents of `.skills/` → `.agents/skills/`
3. Remove `.skills/` directory
4. Create symlinks:
   - `.skills/` → `.agents/skills/`
   - `.claude/skills/` → `../.agents/skills/`
5. Verify symlinks resolve correctly

### Step 1: Create foundation skills (extract from blog-common)

Split `blog-common/SKILL.md` into four focused skills:

**`foundation/formatting/SKILL.md`** — Extract:
- Visual-first approach (Mermaid, tables, code blocks)
- MDX syntax (frontmatter, comments, truncate, admonitions)
- Bold formatting rules (critical for Chinese)
- Mermaid theme-aware styling with color semantics
- File locations (blog/, i18n/zh/...)
- Move `blog-common/references/formatting.md` → `foundation/formatting/references/formatting.md`

**`foundation/localization/SKILL.md`** — Extract:
- 形不同而意同 core principle
- Required annotations (technical terms, notable people)
- Chinese punctuation rules
- Translation patterns table
- Move `blog-common/references/localization.md` → `foundation/localization/references/localization.md`

**`foundation/quality/SKILL.md`** — Extract:
- Content structure standards (word counts per section)
- Technical precision rules
- Validation commands (build, zh-bold, export)
- Pre-commit checklist
- Move `blog-common/references/quality-standards.md` → `foundation/quality/references/quality-standards.md`

**`foundation/writing-style/SKILL.md`** — Extract:
- Five Economist principles (summary)
- Tone & voice guidelines
- Sentence variety rules
- Move `blog-common/references/economist-principles.md` → `foundation/writing-style/references/economist-principles.md`

### Step 2: Create research skills (new)

**`research/research-technical/SKILL.md`**
- When to use: Gathering evidence for technical claims, understanding a technology deeply
- Activities: Official docs, GitHub repos, API references, design patterns, benchmark data
- Deliverables: Structured research notes with source list, key findings, evidence inventory
- Quality gates: Minimum 5 authoritative sources, all claims verifiable, methodology documented

**`research/research-industry/SKILL.md`**
- When to use: Understanding market context, trends, competitive landscape
- Activities: Market data, adoption statistics, expert opinions, case studies, trend analysis
- Deliverables: Industry context brief with data points, trend summary, competitive positioning
- Quality gates: Current data (dated), multiple perspectives, primary sources preferred

**`research/research-content-gap/SKILL.md`**
- When to use: Before starting any article, to validate the topic has a unique angle
- Activities: Search existing content, identify what's missing, find unique value proposition
- Deliverables: Content gap analysis with unique angle recommendation, differentiation strategy
- Quality gates: Reviewed 5+ existing articles on topic, unique value proposition identified

### Step 3: Create analysis skills (new)

**`analysis/analysis-topic/SKILL.md`**
- When to use: "Should I write about X?" decisions
- Activities: Audience assessment, topic depth analysis, angle exploration, timing evaluation
- Deliverables: Topic viability assessment with recommended angle, audience, depth, and style
- Output: Recommends which article workflow skill to use

**`analysis/analysis-article/SKILL.md`**
- When to use: Reviewing a draft or published article for improvement
- Activities: Structure review, style consistency check, claim verification, readability assessment
- Deliverables: Article audit report with specific improvement suggestions
- Composes: foundation/writing-style + foundation/quality for evaluation criteria

### Step 4: Slim down article workflow skills

Rewrite each article skill to be an **orchestrator** that references composable skills instead of re-explaining rules.

Example for `blog-analytical`:
```markdown
## Required Skills
Load these skills alongside this workflow:
- foundation/formatting
- foundation/localization
- foundation/quality
- foundation/writing-style
- research/research-technical (Stage 1)
- research/research-industry (Stage 1, if applicable)
```

The SKILL.md then only contains:
- When to use (kept)
- Questionnaire-first workflow (kept)
- Stage definitions with stage-specific guidance (kept, but trimmed)
- Analytical-specific principles (kept)
- Quality gates specific to this style (kept)
- **Remove**: All formatting, localization, quality, and style content (now in foundation/)
- **Remove**: Generic research instructions (now in research/ skills)

### Step 5: Slim blog-common to convenience bundle

Convert `blog-common` from a monolith to a **convenience bundle** (~30 lines):

```markdown
# blog-common (Convenience Bundle)

Loads all foundation skills for blog article writing.

## Composed Of
- foundation/formatting
- foundation/localization
- foundation/quality
- foundation/writing-style

Load this skill when you want all foundation standards at once.
For targeted work, load individual foundation skills instead.
```

Move all `blog-common/references/` files to their respective foundation skill directories.

### Step 6: Slim down AGENTS.md

Reduce from ~292 lines to ~100 lines:
- Keep: Mission snapshot, directory structure, LeanSpec commands
- Keep: Skill composition guide (which skills to combine for which task)
- **Remove**: Duplicated formatting, localization, quality content (point to skills)
- **Remove**: Duplicated article workflow details (point to skills)
- **Add**: New skill categories (research, analysis) in the skill table
- **Update**: Directory structure to show `.agents/skills/` with symlinks
- Keep: Quality gates table (just commands, not rules)

### Step 7: Update README.md

Update `.agents/skills/README.md` to reflect the three-tier structure with composition examples.

### Step 8: Clean up legacy prompts/

The `prompts/` directory is already marked as superseded. After verifying all content is migrated to skills, archive or remove it.

## Composition Examples (for README)

| Task | Skills to Load |
|------|---------------|
| Write analytical article | blog-analytical + blog-common (or foundation/*) |
| Write tutorial | blog-tutorial + blog-common |
| Research a technology | research-technical |
| "Should I write about X?" | analysis-topic |
| Review a draft article | analysis-article |
| Fix Chinese formatting | foundation/formatting + foundation/localization |
| Translate EN → ZH | foundation/localization |
| Quick announcement | blog-announcement + foundation/formatting + foundation/localization |

## Migration Notes

- `.skills/*` → `.agents/skills/*` (move, then symlink `.skills/` back)
- `.claude/skills/` → symlink to `../.agents/skills/`
- `blog-common/references/formatting.md` → `foundation/formatting/references/formatting.md`
- `blog-common/references/localization.md` → `foundation/localization/references/localization.md`
- `blog-common/references/quality-standards.md` → `foundation/quality/references/quality-standards.md`
- `blog-common/references/economist-principles.md` → `foundation/writing-style/references/economist-principles.md`
- `blog-common/SKILL.md` → slim bundle pointing to foundation skills
- Article skills → trimmed to orchestration + style-specific content only

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| AI tools may not support multi-skill composition natively | blog-common remains as convenience bundle |
| Too many small files increase cognitive load | Clear README with composition table |
| Breaking existing workflows | blog-common still works, just delegates |
| Reference file moves break links | Update all cross-references in same PR |
| Symlinks not followed by some tools | Test with Claude Code, Cursor, Copilot |

## Success Criteria

- [ ] `.agents/skills/` is the canonical location
- [ ] `.skills/` and `.claude/skills/` symlinks work correctly
- [ ] Each foundation skill is independently useful
- [ ] Research and analysis work without triggering article workflow
- [ ] Article workflow skills are 40-50% smaller (orchestration only)
- [ ] AGENTS.md is under 120 lines
- [ ] blog-common still works as a convenience bundle
- [ ] All reference files accessible from their new locations
- [ ] README clearly explains composition patterns
