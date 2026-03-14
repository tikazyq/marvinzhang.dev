# GitHub Copilot Agent Playbook

## Mission Snapshot

**This repository hosts marvinzhang.dev, a Docusaurus 3.8.1 bilingual technical blog. Always use `pnpm`.**

| Aspect              | Details                                                                 |
| ------------------- | ----------------------------------------------------------------------- |
| **Tech Stack**      | Docusaurus 3.8.1, React 19, TypeScript, MDX, Mermaid                    |
| **Content**         | Blog only (no docs section)                                             |
| **Languages**       | English (`blog/`) + Chinese (`i18n/zh/docusaurus-plugin-content-blog/`) |
| **Package Manager** | `pnpm` only—never use `npm` or `yarn`                                   |

## Agent Skills

Composable skills live in `.agents/skills/` (with symlinks at `.skills/` and `.claude/skills/`). See `.agents/skills/README.md` for full catalog.

### Skill Composition Guide

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
| Fix formatting / translate | Load individual `foundation/*` skills |

### Tier Overview

| Tier | Skills | Purpose |
|------|--------|---------|
| **Foundation** | formatting, localization, quality, writing-style, chat-driven | Composable building blocks |
| **Installed** | leanspec-sdd, agent-browser | External skills (via `npx skills`) |
| **Research** | research-technical, research-industry, research-content-gap | Standalone research capabilities |
| **Analysis** | analysis-topic, analysis-article | Standalone analysis capabilities |
| **Workflows** | blog-analytical, blog-tutorial, blog-experiential, blog-announcement | Article pipelines (compose foundation + research) |
| **Bundle** | blog-common | Convenience bundle (all foundation skills) |

## Directory Structure

```
marvinzhang.dev/
├── .agents/skills/          # Agent Skills (canonical location)
│   ├── foundation/          # Tier 1: building blocks
│   ├── research/            # Tier 2a: research capabilities
│   ├── analysis/            # Tier 2b: analysis capabilities
│   ├── articles/            # Tier 3: workflow orchestrators
│   └── blog-common/         # Convenience bundle
├── .skills/ → .agents/skills/   # Symlink for agentskills.io tools
├── .claude/skills/ → ../.agents/skills/  # Symlink for Claude Code
├── blog/                    # Published MDX posts (English)
├── i18n/zh/.../             # Chinese translations
├── specs/                   # Active specs (planning artifacts)
├── scripts/                 # Active utilities
├── src/                     # Docusaurus customizations
├── static/                  # Static assets
└── .lean-spec/              # LeanSpec config & templates
```

## Operational Directives

**Before touching files:**
1. Use `lean-spec board` to see project state
2. Use `lean-spec search` to find related specs
3. Never create spec files manually—use `lean-spec create`

**During work:**
- Manage tasks via todo list tool (one in-progress at a time)
- Write blog content directly to final MDX paths
- Keep explanations skimmable—share deltas, not full plans

## LeanSpec Commands

| Action         | Command                                     |
| -------------- | ------------------------------------------- |
| Project status | `lean-spec board`                           |
| Create spec    | `lean-spec create <name> --template=<style>` |
| Update         | `lean-spec update <spec> --status <status>` |
| Search         | `lean-spec search "query"`                  |

### Article Spec Templates

```bash
lean-spec create "slug" --template=analytical    # Deep-dives
lean-spec create "slug" --template=tutorial      # How-to guides
lean-spec create "slug" --template=experiential  # Lessons learned
lean-spec create "slug" --template=announcement  # Releases
```

## AI Behavior: Collaborative Writing

**Never generate full articles autonomously.** All interaction happens in the chat — the AI writes all files. The author never needs to open an editor.

| Stage | AI Does | Author Does (in chat) |
|-------|---------|----------------------|
| **Questionnaire** | Asks 1-2 questions at a time in chat | Answers by voice/text |
| **Research** | Gathers sources, summarizes key findings in chat | Confirms direction |
| **Outline** | Shows proposed structure inline in chat | Approves/adjusts |
| **Writing** | Drafts ONE section, shows in chat | Gives feedback |
| **Refine** | Polishes, translates, shows changes | Final approval |

**Chat-driven principle**: The chat box is the only input surface. AI captures all input from conversation and writes to files on behalf of the author. See `foundation/chat-driven` skill for full protocol.

## Quality Gates

| Check              | Command                                | When                                  |
| ------------------ | -------------------------------------- | ------------------------------------- |
| Build              | `pnpm run build`                       | Before committing significant changes |
| Chinese formatting | `pnpm run validate:zh-bold-source`     | Before committing Chinese posts       |
| Auto-fix Chinese   | `pnpm run validate:zh-bold-source:fix` | To fix formatting issues              |
| WeChat export      | `pnpm wechat <slug> --zh -o`           | After Chinese translation complete    |
| Medium export      | `pnpm medium <slug> --en -o`           | After English article complete        |

## Localization Quick Reference

- **形不同而意同**: Chinese must read naturally, not as literal translations
- **Technical terms**: Add English annotations: `可计算性理论（Computability Theory）`
- **Famous people**: Add English names: `艾伦·图灵（Alan Turing）`
- **Punctuation**: Use Chinese ，。：throughout

Full guidelines in `foundation/localization` skill.
