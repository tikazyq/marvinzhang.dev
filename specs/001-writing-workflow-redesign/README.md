---
status: complete
created: '2025-11-27'
tags:
  - workflow
  - writing
  - methodology
  - ai-prompts
priority: high
created_at: '2025-11-27T03:32:07.702Z'
updated_at: '2025-11-27T03:40:54.293Z'
transitions:
  - status: in-progress
    at: '2025-11-27T03:32:15.534Z'
  - status: complete
    at: '2025-11-27T03:40:54.293Z'
completed_at: '2025-11-27T03:40:54.293Z'
completed: '2025-11-27'
---

# Writing Workflow Redesign: Modular Styles with LeanSpec Integration

> **Status**: ✅ Complete · **Priority**: High · **Created**: 2025-11-27 · **Tags**: workflow, writing, methodology, ai-prompts

## Overview

Redesign the blog writing workflow to:
1. Use LeanSpec for article lifecycle management
2. Support multiple writing styles as modular prompts
3. Maintain tool-agnostic guidelines (works with any AI assistant)
4. Preserve common formatting/localization rules across all styles

## Design

### Problem Statement

The previous workflow had limitations:
- **Tool-locked**: `.github/instructions/*.instructions.md` files only work with VS Code's instruction system
- **Single style**: Only analytical/Economist-style writing, not suitable for tutorials or announcements
- **Heavy process**: 4-stage workflow for all articles, even simple announcements
- **Redundancy**: Guidelines scattered across multiple overlapping files

### Solution Architecture

```
prompts/
├── common/                    # Always include (tool-agnostic)
│   ├── formatting.md          # MDX syntax, Mermaid, tables
│   ├── localization.md        # EN/ZH bilingual rules
│   └── quality-standards.md   # Universal quality gates
├── styles/                    # Choose ONE based on article type
│   ├── analytical.md          # Deep-dive technical analysis
│   ├── tutorial.md            # Step-by-step practical guides
│   ├── experiential.md        # Personal insights & lessons
│   └── announcement.md        # Project releases & updates
└── README.md                  # Usage guide
```

### Writing Styles

| Style | Use Case | Workflow | Stages |
|-------|----------|----------|--------|
| **Analytical** | Deep-dives, comparisons | Research → Outline → Writing → Refine | 4 |
| **Tutorial** | How-tos, implementations | Outline → Writing → Refine | 3 |
| **Experiential** | Lessons learned, reflections | Outline → Writing → Refine | 3 |
| **Announcement** | Releases, updates | Writing → Refine | 2 |

### LeanSpec Integration

Articles are managed as specs with special tags:
```bash
lean-spec create "article-topic" --tags article,style:analytical,lang:bilingual
```

Tag patterns:
- `article` - Required, marks as blog article
- `style:*` - Writing style (`analytical`, `tutorial`, `experiential`, `announcement`)
- `lang:*` - Target language (`en`, `zh`, `bilingual`)

### Migration Path

| Old (Deprecated) | New |
|------------------|-----|
| `writing-guidelines.instructions.md` | `prompts/common/formatting.md` + `prompts/common/localization.md` |
| `economist-style-principles.instructions.md` | `prompts/styles/analytical.md` |
| `writing-workflow.instructions.md` | LeanSpec + style-specific workflows |

Old files retained for backward compatibility.

## Plan

- [x] Design architecture (prompts directory structure)
- [x] Create `prompts/common/formatting.md` (MDX syntax, Mermaid, tables)
- [x] Create `prompts/common/localization.md` (EN/ZH rules, 形不同而意同)
- [x] Create `prompts/common/quality-standards.md` (universal quality gates)
- [x] Create `prompts/styles/analytical.md` (Economist-style deep dives)
- [x] Create `prompts/styles/tutorial.md` (step-by-step guides)
- [x] Create `prompts/styles/experiential.md` (personal insights)
- [x] Create `prompts/styles/announcement.md` (project updates)
- [x] Create `prompts/README.md` (usage documentation)
- [x] Update `AGENTS.md` to reference new system
- [x] Create `specs/README.md` for article workflow

## Test

- [x] Prompts directory structure created with all files
- [x] AGENTS.md updated with new workflow section
- [ ] Test article creation with new workflow (next article uses this)
- [ ] Verify prompts work with external AI tools (Claude, ChatGPT)

## Notes

### Key Decisions

1. **Tool-agnostic over VS Code-specific**: Plain markdown prompts work with any AI assistant, not just VS Code Copilot

2. **Modular composition over monolithic docs**: Combine `common/*` + `styles/*` rather than maintaining separate complete workflows

3. **Style-appropriate complexity**: Announcements don't need research phases; analytical pieces do

4. **LeanSpec for article lifecycle**: Track articles as specs for consistent project management

### Files Created

```
prompts/
├── README.md
├── common/
│   ├── formatting.md
│   ├── localization.md
│   └── quality-standards.md
└── styles/
    ├── analytical.md
    ├── tutorial.md
    ├── experiential.md
    └── announcement.md

specs/
└── README.md (LeanSpec + article workflow docs)
```

### AGENTS.md Changes

- Added "Writing Prompts" section referencing new `prompts/` directory
- Updated "Article Writing Workflow" with style selection guide
- Marked old `.github/instructions/` as deprecated
- Simplified content standards to reference prompts

### Future Considerations

- Consider adding more styles: `opinion.md`, `news.md`, `interview.md`
- Could add a CLI tool to scaffold articles with style selection
- May want prompt validation tooling to ensure consistency
