---
status: planned
created: '2025-11-27'
tags:
  - cleanup
  - organization
  - refactoring
  - dx
priority: high
created_at: '2025-11-27T08:57:08.089Z'
---

# Codebase Reorganization and Cleanup

> **Status**: 📅 Planned · **Priority**: High · **Created**: 2025-11-27

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
- [ ] Verify `articles/` content is fully migrated to `blog/`
- [ ] Audit `drafts/` for any salvageable content
- [ ] Check `tmp/` contents and confirm safe to delete
- [ ] Ensure `.gitignore` covers `.temp/`, `build/`, `node_modules/`

### Phase 2: Remove Redundant Content
- [ ] Archive `articles/` directory (or delete if confident)
- [ ] Clean up `drafts/` (move useful content, delete rest)
- [ ] Delete `tmp/` directory
- [ ] Remove `.github/instructions/` (deprecated)

### Phase 3: Consolidate Templates
- [ ] Move `templates/drafts/` content to `.lean-spec/templates/`
- [ ] Delete empty `templates/` directory
- [ ] Update any references in AGENTS.md

### Phase 4: Organize Scripts
- [ ] Create `scripts/archived/` for one-time migration scripts
- [ ] Move migration scripts: `migrate-*.js`, `backup-*.js`
- [ ] Consolidate documentation into single `scripts/README.md`
- [ ] Delete `scripts/drafts/`

### Phase 5: Update Documentation
- [ ] Update AGENTS.md with new directory structure
- [ ] Update prompts/README.md if needed
- [ ] Add DIRECTORY_STRUCTURE.md or update README.md with folder explanations

### Phase 6: Verification
- [ ] Run `pnpm build` to ensure nothing broken
- [ ] Run `pnpm dev` and verify blog renders correctly
- [ ] Verify all scripts still work

## Test

- [ ] `pnpm build` completes successfully
- [ ] `pnpm dev` shows all blog posts correctly
- [ ] `pnpm wechat <slug> --zh` still works
- [ ] `pnpm run validate:zh-bold-source` still works
- [ ] No broken internal links in blog posts

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
