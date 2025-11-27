---
status: complete
created: '2025-11-27'
tags:
  - cleanup
  - organization
  - refactoring
  - dx
priority: high
created_at: '2025-11-27T08:57:08.089Z'
updated_at: '2025-11-27T09:27:06.121Z'
transitions:
  - status: in-progress
    at: '2025-11-27T09:18:08.524Z'
  - status: complete
    at: '2025-11-27T09:27:06.121Z'
completed_at: '2025-11-27T09:27:06.121Z'
completed: '2025-11-27'
---

# Codebase Reorganization and Cleanup

> **Status**: ✅ Complete · **Priority**: High · **Created**: 2025-11-27 · **Tags**: cleanup, organization, refactoring, dx

## Overview

Organize the codebase by consolidating redundant directories, clarifying the purpose of each folder, cleaning up legacy/deprecated content, and establishing clear conventions for where different types of content should live.

## Current Issues

### 1. Redundant Content Directories

| Directory | Purpose | Issue |
|-----------|---------|-------|
| `articles/` | Legacy markdown articles (60+ files) | Duplicates content now in `blog/` |
| `blog/` | Current MDX blog posts | Active - correct location |
| `drafts/` | Old drafts with nested folders | Contains outdated drafts + `archive/` subfolder |
| `templates/drafts/` | Template fragments | Confusing nested structure |

### 2. Documentation Fragmentation

| Location | Content | Issue |
|----------|---------|-------|
| `.github/instructions/*.instructions.md` | Writing guidelines | Marked deprecated in AGENTS.md but still referenced |
| `prompts/` | New modular AI prompts | Active - should be canonical |
| `.lean-spec/templates/` | LeanSpec templates | Separate from main templates |
| `templates/` | Article templates (mostly empty) | Underutilized, confusing |

### 3. Script Clutter

`scripts/` contains 12+ files mixing:
- Active utilities (`wechat.js`, `validate-zh-*.js`)
- Migration scripts (one-time use, should archive)
- Drafts folder (`scripts/drafts/`)
- Multiple README/documentation files

### 4. Temp/Build Artifacts

| Directory | Purpose | Action |
|-----------|---------|--------|
| `.temp/` | WeChat export output | Keep, ensure gitignored |
| `build/` | Build output | Keep, ensure gitignored |
| `tmp/` | Unknown temp files | Investigate and clean |

## Design

### Proposed Directory Structure

```
marvinzhang.dev/
├── blog/                    # All published MDX posts (English)
├── i18n/zh/.../             # Chinese translations
├── specs/                   # Active specs (planning artifacts)
│   └── archived/            # Completed specs
├── prompts/                 # AI writing prompts (canonical)
│   ├── common/              # Shared rules
│   └── styles/              # Style-specific prompts
├── scripts/                 # Active utilities only
│   ├── archived/            # One-time migration scripts
│   └── README.md            # Single documentation file
├── src/                     # Docusaurus customizations
├── static/                  # Static assets
├── .github/
│   ├── workflows/           # CI/CD
│   └── CODEOWNERS          # (remove deprecated instructions/)
├── .lean-spec/              # LeanSpec config & templates
└── docs/                    # Keep minimal (Docusaurus requirement)
```

### Directories to Remove/Archive

1. **`articles/`** → Archive entirely (content migrated to `blog/`)
2. **`drafts/`** → Move any salvageable content to `specs/`, delete rest
3. **`templates/`** → Consolidate into `.lean-spec/templates/`
4. **`.github/instructions/`** → Delete (deprecated, rules in `prompts/`)
5. **`tmp/`** → Delete entirely
6. **`scripts/drafts/`** → Delete or archive

## Plan

### Phase 1: Audit & Backup
- [x] Verify `articles/` content is fully migrated to `blog/`
- [x] Audit `drafts/` for any salvageable content
- [x] Check `tmp/` contents and confirm safe to delete
- [x] Ensure `.gitignore` covers `.temp/`, `build/`, `node_modules/`

### Phase 2: Remove Redundant Content
- [x] Archive `articles/` directory (or delete if confident)
- [x] Clean up `drafts/` (move useful content, delete rest)
- [x] Delete `tmp/` directory
- [x] Remove `.github/instructions/` (deprecated)

### Phase 3: Consolidate Templates
- [x] Move `templates/drafts/` content to `.lean-spec/templates/`
- [x] Delete empty `templates/` directory
- [x] Update any references in AGENTS.md

### Phase 4: Organize Scripts
- [x] Create `scripts/archived/` for one-time migration scripts
- [x] Move migration scripts: `migrate-*.js`, `backup-*.js`
- [x] Consolidate documentation into single `scripts/README.md`
- [x] Delete `scripts/drafts/`

### Phase 5: Update Documentation
- [x] Update AGENTS.md with new directory structure
- [x] Update prompts/README.md if needed
- [x] Add DIRECTORY_STRUCTURE.md or update README.md with folder explanations

### Phase 6: Verification
- [x] Run `pnpm build` to ensure nothing broken
- [x] Run `pnpm dev` and verify blog renders correctly
- [x] Verify all scripts still work

## Test

- [x] `pnpm build` completes successfully
- [x] `pnpm dev` shows all blog posts correctly
- [x] `pnpm wechat <slug> --zh` still works
- [x] `pnpm run validate:zh-bold-source` still works
- [x] No broken internal links in blog posts

## Notes

### Files to Keep
- `AGENTS.md` - Main playbook (update with new structure)
- `README.md` - Project intro
- `prompts/` - Canonical AI prompts
- `.lean-spec/` - LeanSpec configuration

### Open Questions
1. Should we keep `articles/` as a git-tracked archive, or just delete since history is in git?
2. Any drafts in `drafts/` worth converting to specs?
3. Should deprecated `.github/instructions/` be kept in git history only?

### Impact
- This is a **breaking change** for anyone with local workflows referencing old paths
- AGENTS.md update will guide AI tools to new locations
- No impact on published blog content

## Completion Notes

**Completed**: 2025-11-27

### Changes Made

| Directory | Action |
|-----------|--------|
| `articles/` | Deleted (content was migrated to `blog/`) |
| `drafts/` | Deleted (superseded by specs workflow) |
| `templates/` | Deleted (superseded by `.lean-spec/templates/`) |
| `tmp/` | Deleted (old backup, gitignored) |
| `.github/instructions/` | Deleted (rules moved to `prompts/`) |
| `.github/LOCALIZATION_GUIDE.md` | Moved to `prompts/common/` |
| `scripts/` | Reorganized - migration scripts moved to `archived/` |

### Documentation Updates
- AGENTS.md: Added directory structure section, removed legacy references
- prompts/README.md: Updated migration table, added LOCALIZATION_GUIDE.md
- scripts/README.md: Simplified to focus on active scripts only

### Decisions
1. **Deleted vs archived**: Deleted redundant directories since git history preserves them
2. **Drafts content**: No salvageable content found - old drafts were for already-published articles
3. **LOCALIZATION_GUIDE.md**: Moved to `prompts/common/` as it's a writing reference
