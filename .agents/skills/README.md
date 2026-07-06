# Agent Skills for marvinzhang.dev

Composable AI-assisted skills following the [agentskills.io](https://agentskills.io) format. Organized in three tiers for maximum reuse.

## Directory Layout

**Canonical location**: `.agents/skills/`
**Symlinks**: `.skills/` and `.claude/skills/` point here for tool compatibility.

```
.agents/skills/
├── foundation/              # Tier 1: Composable building blocks
│   ├── formatting/          # MDX, Mermaid, code blocks
│   ├── localization/        # EN/ZH bilingual, 形不同而意同
│   ├── quality/             # Validation, checklists, gates
│   ├── writing-style/       # Economist principles, tone
│   └── chat-driven/         # Chat-first interaction (mobile/voice)
│
├── research/                # Tier 2a: Research capabilities
│   ├── research-technical/  # Docs, repos, APIs, benchmarks
│   ├── research-industry/   # Market trends, adoption, competition
│   └── research-content-gap/# Existing content review, unique angles
│
├── analysis/                # Tier 2b: Analysis capabilities
│   ├── analysis-topic/      # Topic viability assessment
│   └── analysis-article/    # Draft review, quality audit
│
├── articles/                # Tier 3: Workflow orchestrators
│   ├── blog-analytical/     # 4-stage: Research → Outline → Write → Refine
│   ├── blog-tutorial/       # 3-stage: Outline → Write → Refine
│   ├── blog-experiential/   # 3-stage: Outline → Write → Refine
│   └── blog-announcement/   # 2-stage: Write → Refine
│
├── blog-common/             # Convenience bundle (all foundation skills)
│
├── wechat-publish/          # Publishing: WeChat Official Account automation
│
├── agent-browser/           # Installed: Browser automation CLI (vercel-labs/agent-browser)
└── README.md
```

## Composition Guide

Skills are designed to be mixed and matched. Here's what to load for common tasks:

| Task | Skills to Load |
|------|---------------|
| Write analytical article | `blog-common` + `blog-analytical` |
| Write tutorial | `blog-common` + `blog-tutorial` |
| Write experiential article | `blog-common` + `blog-experiential` |
| Write announcement | `blog-common` + `blog-announcement` |
| Research a technology | `research-technical` |
| Analyze market trends | `research-industry` |
| "Should I write about X?" | `analysis-topic` |
| Review a draft article | `analysis-article` |
| Fix Chinese formatting | `foundation/formatting` + `foundation/localization` |
| Translate EN → ZH | `foundation/localization` |
| Style review only | `foundation/writing-style` |
| Quality audit only | `foundation/quality` |
| Publish article to WeChat | `wechat-publish` (composes `agent-browser`) |

## Three-Tier Architecture

### Tier 1: Foundation (Building Blocks)

Independently loadable standards. Each handles one concern:

| Skill | Lines | Purpose | Load When |
|-------|-------|---------|-----------|
| `formatting` | ~90 | MDX, Mermaid, visual-first | Any content creation or formatting fix |
| `localization` | ~70 | EN/ZH bilingual rules | Translation or bilingual work |
| `quality` | ~70 | Validation, checklists | Pre-publish checks or audits |
| `writing-style` | ~70 | Economist principles | Writing or style review |
| `chat-driven` | ~120 | Chat-first interaction mode | Mobile, voice dictation, or any non-editor context |

### Tier 2: Capabilities (Research & Analysis)

Standalone skills that don't require the article pipeline:

| Skill | Purpose | Standalone? |
|-------|---------|-------------|
| `research-technical` | Deep-dive into docs, repos, benchmarks | Yes |
| `research-industry` | Market trends, competitive landscape | Yes |
| `research-content-gap` | Find unique angles, validate topics | Yes |
| `analysis-topic` | Evaluate topic viability | Yes |
| `analysis-article` | Review/improve articles | Yes |

### Tier 3: Workflows (Orchestrators)

Article-writing pipelines that compose Tier 1 + Tier 2 skills:

| Skill | Stages | Composes |
|-------|--------|----------|
| `blog-analytical` | Research → Outline → Write → Refine | foundation/* + research/* |
| `blog-tutorial` | Outline → Write → Refine | foundation/* |
| `blog-experiential` | Outline → Write → Refine | foundation/* |
| `blog-announcement` | Write → Refine | foundation/{formatting,localization,quality} |

## Progressive Disclosure

Skills are structured for efficient context usage:

1. **Metadata** (~100 tokens): Name and description loaded at startup
2. **Instructions** (<3000 tokens): Main SKILL.md loaded when activated
3. **References** (as needed): Detailed guides loaded only when required

## Installed Skills (via `npx skills`)

Installed from external repos using the [skills CLI](https://skills.sh):

| Skill | Source | Purpose |
|-------|--------|---------|
| `agent-browser` | `vercel-labs/agent-browser` | Browser automation CLI |

Install: `npx skills add vercel-labs/agent-browser --skill agent-browser -y`

## Drafts Workflow

Deep articles are drafted in `drafts/{date-slug}/` using the research → outline → progress three-piece kit. Scaffold a new workspace:

```bash
node scripts/drafts/scaffold.js "Article Title" "YYYY-MM-DD"
```

This creates `drafts/{date-slug}/` (research.md, outline.md, progress.md from `templates/drafts/`) plus unlisted MDX drafts in `blog/` and `i18n/zh/`. The three-piece kit is the default path for deep articles, not a hard requirement — lightweight posts can be driven directly in chat.

## Quality Standards

All articles must pass:
- [ ] `pnpm run build` succeeds
- [ ] Both EN and ZH versions exist with matching metadata
- [ ] Visual elements in main sections
- [ ] `pnpm run validate:zh-bold-source` passes
- [ ] All claims sourced with inline links
