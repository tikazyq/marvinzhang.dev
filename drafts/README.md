# Blog Article Drafts & Work-in-Progress

This directory contains ongoing blog article projects that are tracked in git for collaboration between AI agents and persistence across sessions.

## Structure

```
drafts/
├── templates/                   # Reusable scaffold templates
│   ├── research.md
│   ├── outline.md
│   ├── progress.md
│   └── notes.md
├── active/                      # Currently active projects
│   └── YYYY-MM-DD-slug/        # Per-article workspace
│       ├── research.md         # Research sources and findings
│       ├── outline.md          # Article structure and plan
│       ├── progress.md         # Writing progress tracking
│       ├── sections/           # Draft sections
│       │   ├── intro.md
│       │   ├── section-1.md
│       │   └── conclusion.md
│       └── notes.md            # Writing notes and ideas
├── completed/                   # Finished but not yet published
└── scripts/                     # Automation helpers
    └── scaffold.js              # Article workspace generator
```

## Quick Start

### Initialize New Article Project
```bash
# Manual setup
mkdir drafts/active/YYYY-MM-DD-slug
cp drafts/templates/* drafts/active/YYYY-MM-DD-slug/
mkdir drafts/active/YYYY-MM-DD-slug/sections

# Or use scaffold script (recommended)
node drafts/scripts/scaffold.js "article-title" "YYYY-MM-DD"
```

### Resume Existing Project
1. Navigate to `drafts/active/YYYY-MM-DD-slug/`
2. Check `progress.md` for current status
3. Continue from where previous agent left off

## Benefits

- **Git Tracked**: All work is version controlled and persistent
- **Agent Collaboration**: Any AI agent can pick up work-in-progress
- **Progress Transparency**: Clear status tracking across sessions
- **Template Consistency**: Standardized structure for all projects
- **Research Persistence**: Sources and findings preserved indefinitely

## Workflow

1. **Create**: Use scaffold to initialize new article workspace
2. **Research**: Gather sources and technical information
3. **Plan**: Create detailed outline and structure
4. **Write**: Draft sections incrementally with progress tracking
5. **Complete**: Move to completed/ when ready for final review
6. **Publish**: Transfer to blog/ directory when finalized

## File Naming Convention

- Article directories: `YYYY-MM-DD-slug` (matches final blog post naming)
- Section files: descriptive names matching article structure
- Always use `.md` extension for compatibility and readability