# WeChat Blog Publishing Scripts

Tools for converting Docusaurus blog posts to WeChat-ready markdown with rendered Mermaid diagrams.

## Quick Start

```bash
# Process all blog posts (incremental by default)
pnpm wechat:extract
pnpm wechat:process

# Or run both at once
pnpm wechat:build
```

## Features

### 🚀 Incremental Processing (Default)
- Only processes files that have changed since last run
- Dramatically speeds up subsequent runs
- Cache stored in `.temp/mermaid/.extraction-cache.json`
- Use `--force` to re-process everything

### 🔍 Flexible Filtering
Filter by locale, date, tags, or filename:

```bash
# Only process Chinese articles
pnpm wechat:extract --locale zh
pnpm wechat:process --locale zh

# Only articles modified since October 1st
node scripts/extract-blog-mermaid.js --since 2025-10-01

# Only articles with specific tags
node scripts/extract-blog-mermaid.js --tags ai,computing

# Only specific article(s)
node scripts/extract-blog-mermaid.js --file rice
node scripts/process-blog-for-wechat.js --file rice
```

### 🔧 What Gets Converted

1. **Mermaid diagrams** → PNG images with white background
2. **Docusaurus admonitions** (`:::tip`, `:::warning`, etc.) → Standard markdown blockquotes
3. **Relative blog links** → Absolute URLs
4. **Truncate markers** (`{/* truncate */}`) → Removed
5. **Footer added** → Link back to original blog post

## Commands

### Extract Script (`extract-blog-mermaid.js`)

Extracts Mermaid diagrams from blog posts to `.mmd` files.

```bash
node scripts/extract-blog-mermaid.js [options]
```

**Options:**
- `-f, --force` - Force re-extraction (disables incremental mode)
- `--no-incremental` - Disable incremental processing
- `--locale <en|zh>` - Filter by locale
- `--since <YYYY-MM-DD>` - Only process files modified since date
- `--tags <tag1,tag2>` - Filter by comma-separated tags
- `--file <filename>` - Filter by filename (partial match)
- `-h, --help` - Show help

**Examples:**
```bash
# Default: incremental mode, all files
pnpm wechat:extract

# Force full re-extraction
pnpm wechat:extract --force

# Chinese articles with AI or computing tags
node scripts/extract-blog-mermaid.js --locale zh --tags ai,computing

# Articles about Rice's theorem
node scripts/extract-blog-mermaid.js --file rice --force
```

### Process Script (`process-blog-for-wechat.js`)

Generates PNG images and creates WeChat-ready markdown files.

```bash
node scripts/process-blog-for-wechat.js [options]
```

**Options:**
- `--locale <en|zh>` - Filter by locale
- `--since <YYYY-MM-DD>` - Only process files modified since date
- `--tags <tag1,tag2>` - Filter by comma-separated tags
- `--file <filename>` - Filter by filename (partial match)
- `-h, --help` - Show help

**Examples:**
```bash
# Process all extracted diagrams
pnpm wechat:process

# Only English articles
pnpm wechat:process --locale en

# Specific article only
pnpm wechat:process --file fundamental-limits
```

## Output

### Directory Structure
```
.temp/
├── mermaid/                          # Extraction stage
│   ├── .extraction-cache.json        # Incremental processing cache
│   ├── extraction-index.json         # Extraction summary
│   ├── *.mmd                         # Extracted Mermaid diagrams
│   └── *.meta.json                   # Metadata per article
└── wechat/                           # Processing stage
    ├── processing-summary.json       # Processing summary
    ├── images/                       # Generated PNG diagrams
    │   └── *.png
    └── *-wechat.md                   # WeChat-ready markdown
```

### Output Files
- `*-en-wechat.md` - English article ready for WeChat
- `*-zh-wechat.md` - Chinese article ready for WeChat
- `images/*.png` - All diagram images (white background, PNG format)

## Workflow Tips

### Daily Development
```bash
# Just run this - incremental mode handles the rest
pnpm wechat:extract
pnpm wechat:process
```

### New Article
```bash
# Process just the new article
node scripts/extract-blog-mermaid.js --file new-article-slug
node scripts/process-blog-for-wechat.js --file new-article-slug
```

### Republish Everything
```bash
# Force full rebuild
pnpm wechat:extract --force
pnpm wechat:process
```

### Language-Specific Publishing
```bash
# Only Chinese versions
pnpm wechat:extract --locale zh
pnpm wechat:process --locale zh
```

## Configuration

### Puppeteer (for Mermaid rendering)

The scripts use `puppeteer.config.json` to disable the sandbox for Linux compatibility:

```json
{
  "args": [
    "--no-sandbox",
    "--disable-setuid-sandbox"
  ]
}
```

This config is automatically used by the mmdc (mermaid-cli) command.

### Blog Directories

Configured in both scripts:
```javascript
const BLOG_DIRS = [
  'blog',
  'i18n/zh/docusaurus-plugin-content-blog'
];
```

## Troubleshooting

### Cache Issues
```bash
# Delete cache and force rebuild
rm .temp/mermaid/.extraction-cache.json
pnpm wechat:extract --force
```

### Mermaid Rendering Fails
Check that `puppeteer.config.json` exists in project root with sandbox disabled.

### Filter Not Working
Ensure:
- File filter matches part of the filename
- Date filter uses YYYY-MM-DD format
- Tags filter uses lowercase and comma-separated values
- Locale is exactly `en` or `zh`

## Performance

### First Run (All Files)
- ~38 diagrams
- ~47 seconds total
- Extracts + Processes 14 articles (EN + ZH)

### Incremental Run (No Changes)
- ~0.3 seconds
- Skips all unchanged files
- Perfect for iterative development

### Filtered Run (Single Article)
- ~1 second extraction
- ~5 seconds processing per locale
- Great for testing specific posts
