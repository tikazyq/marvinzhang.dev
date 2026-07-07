# Writing Prompts System

This directory contains **modular, tool-agnostic prompts** for AI-assisted blog writing. The system is designed to work with any AI coding assistant (VS Code Copilot, Cursor, Claude, ChatGPT, etc.).

## Quick Start

1. **Choose a style** based on your article type
2. **Combine prompts**: Always include `common/` modules + your chosen style
3. **Scaffold a draft workspace** for the article (`node scripts/drafts/scaffold.js "Article Title" "YYYY-MM-DD"`)
4. **Reference prompts** when working with AI assistants

## Directory Structure

```
prompts/
├── common/                    # Always include these
│   ├── formatting.md          # MDX syntax, Mermaid, tables, code blocks
│   ├── localization.md        # EN/ZH bilingual rules, 形不同而意同
│   ├── quality-standards.md   # Universal quality gates
│   └── LOCALIZATION_GUIDE.md  # Detailed CN adaptation examples
├── styles/                    # Choose ONE based on article type
│   ├── analytical.md          # Deep-dive technical analysis
│   ├── tutorial.md            # Step-by-step practical guides
│   ├── experiential.md        # Personal insights & lessons learned
│   └── announcement.md        # Project updates & releases
└── README.md                  # This file
```

## Style Selection Guide

| Style | When to Use | Example Topics |
|-------|-------------|----------------|
| **Analytical** | Technical deep-dives, industry analysis, comparisons | "Rice's Theorem implications", "SDD ecosystem landscape" |
| **Tutorial** | Step-by-step guides, how-tos, implementations | "Building a React hook", "Setting up CI/CD" |
| **Experiential** | Lessons learned, personal insights, project retrospectives | "What I learned from 5 years of open source", "My debugging journey" |
| **Announcement** | Project releases, feature announcements, updates | "Crawlab 2.0 released", "New blog feature: dark mode" |

## Workflow by Style

Different styles have different workflows:

### Analytical (Full 4-Stage)
```
Research → Outline → Writing → Refine
```
- Deep research phase with multiple sources
- Comprehensive outline with visual planning
- Section-by-section writing with data validation
- Thorough refinement and fact-checking

### Tutorial (3-Stage)
```
Outline → Writing → Refine
```
- Direct outline from known implementation
- Code-focused writing with clear steps
- Validation through testing

### Experiential (3-Stage)
```
Outline → Writing → Refine
```
- Story arc planning
- Narrative-focused writing
- Voice and flow refinement

### Announcement (2-Stage)
```
Writing → Refine
```
- Direct drafting from feature knowledge
- Polish and call-to-action optimization

## Using with AI Assistants

### Method 1: Copy-Paste Prompts
Copy the relevant prompt content into your AI conversation:
```
[Paste common/formatting.md]
[Paste common/localization.md]
[Paste styles/analytical.md]

Now help me write an article about...
```

### Method 2: Reference Files
Point AI assistants to read the files:
```
Read prompts/common/formatting.md, prompts/common/localization.md, 
and prompts/styles/tutorial.md, then help me write a tutorial about...
```

### Method 3: In-Editor Context
If your editor supports context files (Cursor, etc.), add prompts to context:
- Add `prompts/common/*.md` files
- Add your chosen style file

## Drafts Workflow Integration

Deep articles are drafted in a `drafts/{date-slug}/` workspace using the research → outline → progress three-piece kit:

```bash
# Scaffold a draft workspace (three-piece kit + unlisted MDX drafts)
node scripts/drafts/scaffold.js "My Article Topic" "YYYY-MM-DD"
```

Track progress in the generated `progress.md`. The three-piece kit is the default path for deep articles, not a hard requirement — lightweight posts can be written directly. Templates live in `templates/drafts/`.

## Common + Style Combination

Always combine:
1. **All common modules** (formatting + localization + quality)
2. **One style module** (based on article type)

Example prompt header:
```markdown
# Writing Context

## Common Guidelines
- See: prompts/common/formatting.md
- See: prompts/common/localization.md  
- See: prompts/common/quality-standards.md

## Style: Tutorial
- See: prompts/styles/tutorial.md

## Article Details
- Topic: Building a custom React hook
- Language: Bilingual (EN + ZH)
- Target: Intermediate developers
```

## Migration from Old System

The previous `.github/instructions/*.instructions.md` files have been removed. This new system:

| Old | New |
|-----|-----|
| `writing-guidelines.instructions.md` | Split into `common/formatting.md` + `common/localization.md` |
| `economist-style-principles.instructions.md` | `styles/analytical.md` |
| `writing-workflow.instructions.md` | Drafts three-piece kit + style-specific workflows |
| `.github/LOCALIZATION_GUIDE.md` | `common/LOCALIZATION_GUIDE.md` |
