# GitHub Copilot Agent Playbook

## Mission Snapshot

**This repository hosts marvinzhang.dev, a Docusaurus 3.8.1 bilingual technical blog. Always use `pnpm`.**

| Aspect | Details |
|--------|---------|
| **Tech Stack** | Docusaurus 3.8.1, React 19, TypeScript, MDX, Mermaid |
| **Content** | Blog only (no docs section) |
| **Languages** | English (`blog/`) + Chinese (`i18n/zh/docusaurus-plugin-content-blog/`) |
| **Package Manager** | `pnpm` only—never use `npm` or `yarn` |

## Writing Prompts (Tool-Agnostic)

Modular prompts for AI-assisted writing live in `prompts/`. These work with any AI tool (VS Code Copilot, Cursor, Claude, ChatGPT, etc.).

| Prompt | Purpose |
|--------|---------|
| `prompts/common/formatting.md` | MDX syntax, Mermaid diagrams, tables, code blocks |
| `prompts/common/localization.md` | EN/ZH bilingual rules, 形不同而意同 principle |
| `prompts/common/quality-standards.md` | Universal quality gates and checklists |
| `prompts/styles/analytical.md` | Deep-dive technical analysis (Economist-inspired) |
| `prompts/styles/tutorial.md` | Step-by-step practical guides |
| `prompts/styles/experiential.md` | Personal insights and lessons learned |
| `prompts/styles/announcement.md` | Project releases and updates |

**Usage**: Always include all `common/` prompts + one style prompt based on article type. See `prompts/README.md` for details.

> **Legacy**: The `.github/instructions/*.instructions.md` files are deprecated but retained for backward compatibility.

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

## Article Writing Workflow

### Writing Style Selection

Choose based on article type:

| Style | Use Case | Workflow |
|-------|----------|----------|
| **Analytical** | Technical deep-dives, industry analysis | Research → Outline → Writing → Refine |
| **Tutorial** | Step-by-step guides, how-tos | Outline → Writing → Refine |
| **Experiential** | Lessons learned, personal insights | Outline → Writing → Refine |
| **Announcement** | Project releases, updates | Writing → Refine |

### Creating an Article

Just tell the AI what you want to write about. Example prompts:
- *"I want to write a tutorial about building React hooks"*
- *"Help me write an announcement for Crawlab 2.0"*
- *"I'd like to share my lessons learned from 5 years of open source"*

The AI will:
1. **Create article spec** via LeanSpec MCP tools (with appropriate `style:` and `lang:` tags)
2. **Load prompts**: Read `prompts/common/*` + the chosen `prompts/styles/*.md`
3. **Scaffold files** if needed (for research/outline)
4. **Write directly** to final MDX paths
5. **Update spec status** as work progresses

### Collaborative Writing: AI Behavior

**Two collaboration modes:**

#### Mode 1: Questionnaire-First (Recommended for Announcements/Experiential)

More efficient for articles requiring personal input:

```
1. AI creates spec with questionnaire.md
2. Author fills out questionnaire async
3. Author says "questionnaire complete"
4. AI writes article based on answers
```

All artifacts live in the spec folder:
```
specs/NNN-article-slug/
├── README.md           # Spec metadata and status
├── questionnaire.md    # AI generates, author fills
├── research.md         # Optional: AI-gathered sources
└── outline.md          # Generated from questionnaire
```

#### Mode 2: Interactive Chat (For Research-Heavy/Analytical)

**Always collaborate—never generate full articles autonomously.** Pause for human input at these checkpoints:

| Stage | You Do | Then Ask User For |
|-------|--------|-------------------|
| **Topic** | Suggest structure, identify style | Their angle, specific examples to include |
| **Research** | Gather sources, find data | Key points they want to make, experiences to reference |
| **Outline** | Propose structure | Approval, reordering, sections to add/remove |
| **Writing** | Draft ONE section | Feedback before writing next section |
| **Refine** | Polish, translate | Final review, tone adjustments |

**Prompt the user with questions like:**
- *"What specific angle or argument do you want to make?"*
- *"Any personal experiences or examples you want me to include?"*
- *"Here's the outline—should I adjust any sections before writing?"*
- *"I've drafted section 1. Review it and let me know what to change before I continue."*

**Never assume**—ask when uncertain about the user's perspective, tone preference, or which examples to use.

### Content Standards (Quick Reference)

- **Section lengths**: Intro 300-500 words, Main 600-1000 words, Conclusion 250-400 words
- **Visual-first**: Prefer Mermaid diagrams and tables over prose; code ≤10 lines
- **Mermaid styling**: Always use explicit `fill,stroke,color` for theme compatibility
- **MDX comments**: Use `{/* comment */}` not `<!-- comment -->`
- **Truncate marker**: Add `{/* truncate */}` after introduction
- **Bold in Chinese**: Add space before second `**` on same line
- **Links**: Introduce on first reference only, prefer official sources

See `prompts/common/*.md` for complete formatting and localization rules.

### 4-Stage Workflow Quick Reference

1. **Research**: Validate topic viability, gather ≥5 authoritative sources, identify unique angle → complete `research.md`
2. **Outline**: Create detailed structure with section breakdown, word targets, visual plan → complete `outline.md`
3. **Writing**: Draft section-by-section directly in `blog/YYYY-MM-DD-slug.mdx` → one section per interaction
4. **Refine**: Review holistically, validate technical accuracy, ensure EN/ZH parity → archive draft folder

> Full workflow details, quality gates, and handoff protocols available in `.github/instructions/writing-workflow.instructions.md` (auto-loads when editing blog posts).

## Localization & Draft Workflow

**Core concept: Specs manage article planning; final MDX files live in blog folders.**

- Every English post must have a matching Chinese translation with the same slug and metadata.
- **Planning artifacts** (questionnaire, research, outline) live in `specs/NNN-slug/`
- **Draft MDX** lives in final location (`blog/...` and `i18n/zh/...`) and will be visible in preview
- On publication: update spec status to `complete`, optionally archive to `specs/archived/`
- Keep frontmatter aligned (title, tags, date, authors) and ensure translations reflect updates made to the English version.
- **形不同而意同 (Same Meaning, Different Form)**: Chinese articles must read naturally and idiomatically, not as literal translations. Adapt sentence structures, expressions, and rhetoric to feel native to Chinese readers while preserving core concepts and technical accuracy.
- **Chinese articles must include English term annotations**: Add capitalized English translations in parentheses at first mention of technical terms (e.g., `可计算性理论（Computability Theory）`, `大型语言模型（Large Language Model，LLM）`), and use Chinese punctuation throughout (，、：instead of , ・ :).
- **Chinese articles must include English names for famous people**: Add English names in parentheses at first mention of notable individuals (e.g., `艾兹格·迪杰斯特拉（Edsger Dijkstra）`, `亨利·戈登·莱斯（Henry Gordon Rice）`, `艾伦·图灵（Alan Turing）`).
- **Chinese punctuation consistency**: Always use Chinese commas (，) instead of English commas (,) throughout Chinese articles, including in technical explanations and sentence structures.

| Artifact | Location |
|----------|----------|
| Planning (questionnaire, research, outline) | `specs/NNN-article-slug/` |
| English draft | `blog/YYYY-MM-DD-slug.mdx` |
| Chinese draft | `i18n/zh/docusaurus-plugin-content-blog/YYYY-MM-DD-slug.mdx` |

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
