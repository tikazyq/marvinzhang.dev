# Blog Migration Guide

This guide walks you through migrating your blog from the legacy nested folder structure to the flat file structure required by modern Docusaurus conventions.

## Quick Start

If you just want to migrate immediately:

```bash
# 1. Create backup (recommended)
pnpm run backup:blog

# 2. Preview what will be migrated
pnpm run migrate:blog:dry

# 3. Run the actual migration
pnpm run migrate:blog

# 4. Test the result
pnpm dev
```

## Detailed Migration Process

### Step 1: Understanding the Migration

**Before (Legacy Structure):**
```
blog/
├── 2022/09/agile-team-practices.mdx
├── 2022/10/unit-tests-love-hate.mdx
└── 2024/08/llms-industrial-revolution.mdx

i18n/zh/docusaurus-plugin-content-blog/
├── 2022/09/agile-team-practices.mdx
├── 2022/10/unit-tests-love-hate.mdx
└── 2024/08/llms-industrial-revolution.mdx
```

**After (Flat Structure):**
```
blog/
├── 2022-09-28-agile-team-practices.mdx
├── 2022-10-11-unit-tests-love-hate.mdx
└── 2024-08-31-llms-industrial-revolution.mdx

i18n/zh/docusaurus-plugin-content-blog/
├── 2022-09-28-agile-team-practices.mdx
├── 2022-10-11-unit-tests-love-hate.mdx
└── 2024-08-31-llms-industrial-revolution.mdx
```

The migration extracts the actual date from each post's frontmatter and uses it to create the new filename.

### Step 2: Create a Backup (Highly Recommended)

```bash
pnpm run backup:blog
```

This creates a timestamped backup in the `tmp/` directory and generates a restore script.

### Step 3: Preview the Migration

```bash
# Basic preview
pnpm run migrate:blog:dry

# Detailed preview with file paths
pnpm run migrate:blog:verbose --dry-run
```

Review the output to ensure:
- All expected files are found
- The new filenames look correct
- No conflicts with existing files

### Step 4: Run the Migration

```bash
pnpm run migrate:blog
```

The script will:
- Move all nested MDX files to the flat structure
- Clean up empty year/month directories
- Preserve git history (files are moved, not copied)
- Skip any files that already exist in the target location

### Step 5: Verify the Migration

```bash
# Start the development server
pnpm dev
```

Check that:
- All blog posts are visible
- Dates are displayed correctly
- Both English and Chinese content work
- No broken links or missing content

## Available Commands

| Command | Description |
|---------|-------------|
| `pnpm run analyze:blog` | Analyze current blog structure and preview migration |
| `pnpm run backup:blog` | Create a timestamped backup |
| `pnpm run migrate:blog:dry` | Preview migration without changes |
| `pnpm run migrate:blog:verbose --dry-run` | Detailed preview with file paths |
| `pnpm run migrate:blog` | Execute the migration |

## Troubleshooting

### Common Issues

**1. "gray-matter package is required"**
```bash
pnpm add gray-matter
```

**2. "Could not parse frontmatter"**
- Check that your MDX files have valid YAML frontmatter
- Ensure each post has a `date` field

**3. "Target file already exists"**
- The script safely skips existing files
- Manually resolve any conflicts if needed

**4. Missing files after migration**
- Check the console output for any error messages
- Use the backup restore script if needed

### Manual Verification

Check that the migration worked correctly:

```bash
# Count files before and after
echo "English posts:"
find blog -name "*.mdx" | wc -l

echo "Chinese posts:"
find i18n/zh/docusaurus-plugin-content-blog -name "*.mdx" | wc -l

# Check for remaining nested structure
find blog i18n/zh/docusaurus-plugin-content-blog -type d -name "20*" 2>/dev/null
```

### Rollback

If something goes wrong, restore from backup:

```bash
# Find your backup directory
ls -la tmp/blog-backup-*

# Run the restore script (replace with your backup timestamp)
bash tmp/blog-backup-YYYY-MM-DDTHH-MM-SS/restore.sh
```

Or use git if you committed before migration:

```bash
git checkout HEAD~1 -- blog/ i18n/
```

## Post-Migration

After successful migration:

1. **Commit the changes:**
   ```bash
   git add .
   git commit -m "Migrate blog structure to flat file organization"
   ```

2. **Update any documentation** that references the old folder structure

3. **Deploy and test** in your production environment

## Technical Details

- **File matching:** Only `.mdx` files in `YYYY/MM/` folders are migrated
- **Date extraction:** Uses the `date` field from frontmatter
- **Fallback:** If date parsing fails, uses `YYYY-MM-01` from folder structure
- **Safety:** Never overwrites existing files
- **Cleanup:** Removes empty year/month directories after migration
- **History:** Uses file moves to preserve git history

## Benefits of Flat Structure

- ✅ Consistent with Docusaurus best practices
- ✅ Easier file management and navigation
- ✅ Better sorting and organization
- ✅ Simpler automated tooling
- ✅ Future-proof for Docusaurus updates