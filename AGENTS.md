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

## Directory Structure

```
marvinzhang.dev/
├── blog/                    # Published MDX posts (English)
├── i18n/zh/.../             # Chinese translations
├── specs/                   # Active specs (planning artifacts)
│   └── archived/            # Completed specs
├── prompts/                 # AI writing prompts (canonical)
│   ├── common/              # Shared formatting & localization rules
│   └── styles/              # Style-specific prompts
├── scripts/                 # Active utilities
│   ├── archived/            # One-time migration scripts
│   └── wechat.js            # WeChat export tool
├── src/                     # Docusaurus customizations
├── static/                  # Static assets
├── .lean-spec/              # LeanSpec config & templates
└── docs/                    # Minimal (Docusaurus requirement)
```

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

### Creating an Article Spec

**Use the style-specific template** for your article:

```bash
# For project releases, updates
lean-spec create "my-project-release" --template=announcement

# For step-by-step guides
lean-spec create "react-hooks-guide" --template=tutorial

# For technical deep-dives
lean-spec create "rice-theorem-analysis" --template=analytical

# For lessons learned, retrospectives
lean-spec create "five-years-opensource" --template=experiential
```

Each template includes a **focused questionnaire** for that style—no need to delete unused sections.

### Writing Style Selection

| Style | Template | Use Case |
|-------|----------|----------|
| **Announcement** | `--template=announcement` | Project releases, updates |
| **Tutorial** | `--template=tutorial` | Step-by-step guides, how-tos |
| **Analytical** | `--template=analytical` | Technical deep-dives, industry analysis |
| **Experiential** | `--template=experiential` | Lessons learned, personal insights |

### The Questionnaire-First Workflow

**All articles start with the embedded questionnaire in the spec file.**

```
1. Create spec with blog-article template
2. Fill out the questionnaire section for your style (delete unused styles)
3. Tell AI "questionnaire complete" 
4. AI generates outline, then writes section-by-section
5. Update spec progress as each stage completes
```

**Spec structure** (single README.md file):
```
specs/NNN-article-slug/
└── README.md
    ├── Overview          # Topic summary
    ├── Questionnaire     # Style-specific questions (author fills)
    ├── Research          # AI fills during research phase
    ├── Outline           # AI generates, author approves
    ├── Progress          # Track writing stages
    └── Prompts Reference # Links to relevant prompts
```

**Why questionnaire-first?**
- Eliminates chat ping-pong for gathering context
- Author can think deeply without time pressure
- All inputs saved in git for future reference
- One questionnaire replaces 5-10 chat exchanges

### AI Behavior: Collaborative Writing

**Never generate full articles autonomously.** Follow these checkpoints:

| Stage | AI Does | Then Waits For |
|-------|---------|----------------|
| **Questionnaire** | Identify style, point to template | Author completes questionnaire |
| **Research** | Gather sources, fill Research section | Author confirms key points |
| **Outline** | Generate structure in Outline section | Author approval/edits |
| **Writing** | Draft ONE section at a time | Feedback before next section |
| **Refine** | Polish, translate to Chinese | Final review |
| **WeChat Export** | Run `pnpm wechat <slug> --zh -o` | Author publishes to WeChat |

**AI should ask:**
- *"I see you want to write about X. Should I create a spec using the blog-article template?"*
- *"Please fill out the questionnaire section, then say 'questionnaire complete'"*
- *"Here's the proposed outline—should I adjust before writing?"*
- *"Section 1 is drafted. Review and let me know changes before I continue."*

### Content Standards (Quick Reference)

- **Section lengths**: Intro 300-500 words, Main 600-1000 words, Conclusion 250-400 words
- **Visual-first**: Prefer Mermaid diagrams and tables over prose; code ≤10 lines
- **Mermaid styling**: Always use explicit `fill,stroke,color` for theme compatibility
- **MDX comments**: Use `{/* comment */}` not `<!-- comment -->`
- **Truncate marker**: Add `{/* truncate */}` after introduction
- **Bold in Chinese**: Add space before second `**` on same line
- **Links**: Introduce on first reference only, prefer official sources

See `prompts/common/*.md` for complete formatting and localization rules.

### Progress Tracking

Update the Progress table in the spec as you complete each stage:

| Stage | Status Markers |
|-------|---------------|
| Questionnaire | ⬜ Not started → 🔄 In progress → ✅ Complete |
| Research | ⬜ → 🔄 → ✅ |
| Outline | ⬜ → 🔄 → ✅ |
| Writing (per section) | ⬜ → 🔄 → ✅ |
| Chinese Translation | ⬜ → 🔄 → ✅ |
| WeChat Export | ⬜ → 🔄 → ✅ |
| Final Review | ⬜ → 🔄 → ✅ |

When all stages are ✅, run `lean-spec update <spec> --status complete`.

## WeChat Export Workflow

After the Chinese translation is complete, export for WeChat publishing:

```bash
# Export specific article (Chinese only) and open output folder
pnpm wechat <slug> --zh -o

# Examples
pnpm wechat introducing-leanspec --zh -o
pnpm wechat sdd-tools --zh -o
```

**What gets converted:**
- Mermaid diagrams → PNG images (white background)
- Docusaurus admonitions → Standard markdown blockquotes
- Relative links → Absolute URLs
- Footer added with blog link

**Output location:** `.temp/wechat/`
- `*-zh-wechat.md` — Ready to paste into WeChat editor
- `images/*.png` — Upload these to WeChat image library

See [scripts/WECHAT.md](scripts/WECHAT.md) for full documentation.

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
| WeChat export | `pnpm wechat <slug> --zh -o` | After Chinese translation complete |

**Spec status flow:** `planned` → `in-progress` (before coding) → `complete` (after done)
