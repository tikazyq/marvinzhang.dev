# GitHub Copilot Agent Playbook

## Mission Snapshot

**This repository hosts marvinzhang.dev, a Docusaurus 3.8.1 bilingual technical blog. Always use `pnpm`.**

| Aspect | Details |
|--------|---------|
| **Tech Stack** | Docusaurus 3.8.1, React 19, TypeScript, MDX, Mermaid |
| **Content** | Blog only (no docs section) |
| **Languages** | English (`blog/`) + Chinese (`i18n/zh/docusaurus-plugin-content-blog/`) |
| **Package Manager** | `pnpm` only—never use `npm` or `yarn` |

Here is a list of instruction files that contain rules for modifying or creating new code.
These files are important for ensuring that the code is modified or created correctly.
Please make sure to follow the rules specified in these files when working with the codebase.
If the file is not already available as attachment, use the `read_file` tool to acquire it.
Make sure to acquire the instructions before making any changes to the code.
| File | Applies To | Description |
| ------- | --------- | ----------- |
| '.github/instructions/writing-guidelines.instructions.md' | **/*.md* | Markdown style, tone, and formatting rules |
| '.github/instructions/writing-workflow.instructions.md' | **/*.md* | 4-stage article creation workflow (Research → Outline → Writing → Refine) |
| '.github/instructions/economist-style-principles.instructions.md' | **/*.md* | The Economist-inspired writing principles: clarity, precision, active voice, concrete examples, and data-driven argumentation |

## Operational Directives

**Before touching files:**
1. Use `lean-spec board` to see project state
2. Use `lean-spec search` to find related specs
3. Never create spec files manually—use `lean-spec create`

**During work:**
- Manage tasks via todo list tool (one in-progress at a time)
- Write blog content directly to final MDX paths (visible in preview)
- Keep explanations skimmable—share deltas, not full plans

## 🔧 LeanSpec Commands

Use MCP tools if available, otherwise CLI:

| Action | Command | Description |
|--------|---------|-------------|
| Project status | `lean-spec board` | Kanban view + health metrics |
| List specs | `lean-spec list` | All specs with metadata |
| Search | `lean-spec search "query"` | Semantic search |
| Create spec | `lean-spec create <name>` | Auto-sequences, proper structure |
| Update | `lean-spec update <spec> --status <status>` | Validates transitions |
| Dependencies | `lean-spec deps <spec>` | Visual dependency graph |

## Spec Workflow

| Phase | Actions |
|-------|--------|
| **Before** | `board` → `search` → check if spec exists |
| **During** | Update to `in-progress` → document decisions → link related specs |
| **After** | Update to `complete` → document learnings → create follow-ups if needed |

**When to write a spec:** Features affecting multiple areas, breaking changes, design decisions needing alignment.  
**Skip specs for:** Bug fixes, trivial changes, self-explanatory refactors.

## Content Authoring Standards

**Core concept: Blog posts follow a four-stage, section-by-section writing process that balances depth with readability.**

- **Always determine the current date programmatically** for new articles (use `date +%Y-%m-%d` command, not training data memory). Pass the actual system date when scaffolding: `node scripts/drafts/scaffold.js "title" "YYYY-MM-DD"`.
- Use the scaffold script to create `drafts/YYYY-MM-DD-slug/` with `research.md`, `outline.md`, and `progress.md` helpers.
- Structure each article with the prescribed section lengths (Intro 300–500 words, Main sections 600–1000 words, Conclusion 250–400 words).
- Highlight each section's main idea in bold at first mention, add short takeaways, and prefer diagrams/tables over long code blocks (≤10 lines when unavoidable).
- **Mermaid diagrams**: Style all nodes with explicit colors (`fill,stroke,color`) for light/dark theme compatibility.
- **MDX syntax**: Use JSX-style comments `{/* comment */}` not HTML comments `<!-- comment -->`. Add `{/* truncate */}` after the introduction to control blog list previews.
- **Bold formatting in Chinese**: When using multiple bold sections on the same line in Chinese text, add a space before the second `**` to ensure proper rendering (e.g., `这与 **语法属性（Syntactic Properties）** 形成对比`).
- **Bold formatting with quotes**: When bolding text that contains double quotes, add spaces inside the bold markers (e.g., `** "quoted text" **` not `**"quoted text"**`) to prevent MDX parsing issues.
- Introduce links on first reference only, aiming for official sources and meaningful anchor text.

### 4-Stage Workflow Quick Reference

1. **Research**: Validate topic viability, gather ≥5 authoritative sources, identify unique angle → complete `research.md`
2. **Outline**: Create detailed structure with section breakdown, word targets, visual plan → complete `outline.md`
3. **Writing**: Draft section-by-section directly in `blog/YYYY-MM-DD-slug.mdx` → one section per interaction
4. **Refine**: Review holistically, validate technical accuracy, ensure EN/ZH parity → archive draft folder

> Full workflow details, quality gates, and handoff protocols available in `.github/instructions/writing-workflow.instructions.md` (auto-loads when editing blog posts).

## Localization & Draft Workflow

**Core concept: Maintain synchronized bilingual content and move drafts through the archive flow when publishing.**

- Every English post must have a matching Chinese translation with the same slug and metadata.
- Draft Markdown lives in the final location (`blog/...` and `i18n/zh/...`) and will be visible in the preview environment; move the scaffold folder to `drafts/archive/` at publication.
- Keep frontmatter aligned (title, tags, date, authors) and ensure translations reflect updates made to the English version.
- **形不同而意同 (Same Meaning, Different Form)**: Chinese articles must read naturally and idiomatically, not as literal translations. Adapt sentence structures, expressions, and rhetoric to feel native to Chinese readers while preserving core concepts and technical accuracy.
- **Chinese articles must include English term annotations**: Add capitalized English translations in parentheses at first mention of technical terms (e.g., `可计算性理论（Computability Theory）`, `大型语言模型（Large Language Model，LLM）`), and use Chinese punctuation throughout (，、：instead of , ・ :).
- **Chinese articles must include English names for famous people**: Add English names in parentheses at first mention of notable individuals (e.g., `艾兹格·迪杰斯特拉（Edsger Dijkstra）`, `亨利·戈登·莱斯（Henry Gordon Rice）`, `艾伦·图灵（Alan Turing）`).
- **Chinese punctuation consistency**: Always use Chinese commas (，) instead of English commas (,) throughout Chinese articles, including in technical explanations and sentence structures.

| Step | English Path | Chinese Path |
| --- | --- | --- |
| Drafting | `blog/YYYY-MM-DD-slug.mdx` | `i18n/zh/docusaurus-plugin-content-blog/YYYY-MM-DD-slug.mdx` |
| Research assets | `drafts/YYYY-MM-DD-slug/` | Shared resources |
| Post-publication archive | `drafts/archive/YYYY-MM-DD-slug/` | Shared resources |

**Slug naming convention**: Keep slugs concise (prefer 2-4 words). Examples: `sdd-tools-practices`, `ai-coding-guide`, `spec-driven-basics`. Avoid long descriptive slugs like `implementing-spec-driven-development-tools-and-workflows-in-practice`.

## Spec Relationships

| Type | Behavior | Use When |
|------|----------|----------|
| `related` | Bidirectional, informational | Related topics, coordinated work |
| `depends_on` | Directional, blocking | True dependency, work order matters |

**Default:** Use `related`. Reserve `depends_on` for true blockers.

## Quality Gates

| Check | Command | When |
|-------|---------|------|
| Build | `pnpm run build` | Before committing significant changes |
| Dev preview | `pnpm dev` | Smoke testing |
| Chinese formatting | `pnpm run validate:zh-bold-source` | Before committing Chinese posts |
| Auto-fix Chinese | `pnpm run validate:zh-bold-source:fix` | To fix formatting issues |

**Spec status flow:** `planned` → `in-progress` (before coding) → `complete` (after done)
