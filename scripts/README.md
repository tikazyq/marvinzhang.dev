# Blog Structure Migration Script

This script migrates the blog content from the legacy nested folder structure to a flat file structure following the `YYYY-MM-DD-post-slug.mdx` naming convention.

## Quick Usage

```bash
# 1. Create backup
pnpm run backup:blog

# 2. Preview migration  
pnpm run migrate:blog:dry

# 3. Run migration
pnpm run migrate:blog
```

For detailed instructions, see [MIGRATION.md](../MIGRATION.md) in the project root.

## Overview

**Current Structure (Legacy):**
```
blog/
├── 2022/
│   ├── 09/
│   │   └── agile-team-practices.mdx
│   ├── 10/
│   │   ├── unit-tests-love-hate.mdx
│   │   └── golang-distributed-system.mdx
│   └── 11/
│       └── architect-essential-skills.mdx
└── 2023/
    └── ...

i18n/zh/docusaurus-plugin-content-blog/
├── 2022/
│   ├── 09/
│   │   └── agile-team-practices.mdx
│   └── ...
```

**Target Structure (Flat):**
```
blog/
├── 2022-09-15-agile-team-practices.mdx
├── 2022-10-11-unit-tests-love-hate.mdx
├── 2022-10-20-golang-distributed-system.mdx
├── 2022-11-05-architect-essential-skills.mdx
└── ...

i18n/zh/docusaurus-plugin-content-blog/
├── 2022-09-15-agile-team-practices.mdx
├── 2022-10-11-unit-tests-love-hate.mdx
└── ...
```

## How It Works

1. **Scans** both English (`blog/`) and Chinese (`i18n/zh/docusaurus-plugin-content-blog/`) content directories
2. **Finds** all `.mdx` files in the nested `YYYY/MM/` folder structure
3. **Extracts** the date from the frontmatter `date` field in each file
4. **Creates** new filenames using the format: `YYYY-MM-DD-post-slug.mdx`
5. **Moves** files to the flat structure (root of their respective blog directories)
6. **Cleans up** empty year/month directories after migration

## Usage

### Prerequisites

The migration script requires the `gray-matter` package for parsing frontmatter:

```bash
pnpm add gray-matter
```

### Running the Migration

#### 1. Dry Run (Recommended First)
Test the migration without moving any files:

```bash
# Using npm script
pnpm run migrate:blog:dry

# Or directly
node scripts/migrate-blog-structure.js --dry-run
```

#### 2. Verbose Dry Run
See detailed output of what will be migrated:

```bash
# Using npm script
pnpm run migrate:blog:verbose --dry-run

# Or directly
node scripts/migrate-blog-structure.js --dry-run --verbose
```

#### 3. Live Migration
Actually migrate the files:

```bash
# Using npm script
pnpm run migrate:blog

# Or directly
node scripts/migrate-blog-structure.js
```

## Important Notes

### Date Extraction
- The script extracts dates from the frontmatter `date` field
- If date parsing fails, it falls back to `YYYY-MM-01` using the year/month from the folder structure
- Dates are formatted as `YYYY-MM-DD`

### File Safety
- **Backup recommended**: Consider backing up your content before running the live migration
- **Duplicate detection**: The script will warn if target files already exist and skip them
- **No overwrites**: Existing files in the target location will not be overwritten

### Frontmatter Requirements
Each blog post should have proper frontmatter with a date field:

```yaml
---
slug: post-slug
title: "Post Title"
authors: ["marvin"]
tags: ["tag1", "tag2"]
date: 2024-08-31  # This is required for proper migration
---
```

### What Gets Migrated
- ✅ English blog posts from `blog/YYYY/MM/*.mdx`
- ✅ Chinese blog posts from `i18n/zh/docusaurus-plugin-content-blog/YYYY/MM/*.mdx`
- ✅ Files are moved (not copied) to preserve git history
- ✅ Empty year/month directories are cleaned up after migration

### What Doesn't Get Migrated
- ❌ Files outside the nested year/month structure
- ❌ Non-MDX files
- ❌ Files that already exist in the target flat structure
- ❌ Author and tag configuration files (`authors.yml`, `tags.yml`)

## Example Output

```
🚀 Starting blog structure migration...
Mode: DRY RUN (no files will be moved)

📁 Processing blog...
  Found 15 files to migrate
✓ [DRY RUN] Would migrate: blog/2022-09-15-agile-team-practices.mdx
✓ [DRY RUN] Would migrate: blog/2022-10-11-unit-tests-love-hate.mdx
✓ [DRY RUN] Would migrate: blog/2024-08-31-llms-industrial-revolution.mdx
  Cleaning up empty directories in blog...

📁 Processing i18n/zh/docusaurus-plugin-content-blog...
  Found 14 files to migrate
✓ [DRY RUN] Would migrate: i18n/zh/docusaurus-plugin-content-blog/2022-09-15-agile-team-practices.mdx
  Cleaning up empty directories in i18n/zh/docusaurus-plugin-content-blog...

📊 Migration Summary:
  Total files found: 29
  Successfully migrated: 29
  Failed: 0

💡 This was a dry run. To actually migrate files, run:
   node scripts/migrate-blog-structure.js

✅ Migration complete!
```

## Troubleshooting

### Common Issues

1. **"gray-matter package is required"**
   - Solution: Run `pnpm add gray-matter`

2. **"Could not parse frontmatter"**
   - Check that your MDX files have valid frontmatter
   - Ensure the `date` field is present and properly formatted

3. **"Target file already exists"**
   - The script will skip files that already exist in the flat structure
   - Manually resolve conflicts if needed

### Manual Cleanup

If you need to manually clean up after a partial migration:

```bash
# Remove empty year directories
find blog -type d -name "20*" -empty -delete
find i18n/zh/docusaurus-plugin-content-blog -type d -name "20*" -empty -delete

# Remove empty month directories  
find blog -type d -name "[0-9][0-9]" -empty -delete
find i18n/zh/docusaurus-plugin-content-blog -type d -name "[0-9][0-9]" -empty -delete
```

## Post-Migration

After successful migration:

1. **Test the site**: Run `pnpm dev` to ensure everything works
2. **Update build scripts**: The flat structure should work with existing Docusaurus configuration
3. **Update any documentation**: Modify any docs that reference the old folder structure
4. **Commit changes**: The migration maintains git history for moved files

## Rollback

If you need to rollback:

1. Use git to restore the previous state: `git checkout HEAD~1 -- blog/ i18n/`
2. Or restore from backup if you created one before migration