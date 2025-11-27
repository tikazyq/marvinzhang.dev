# WeChat Blog Publishing Scripts

Tools for converting Docusaurus blog posts to WeChat-ready markdown with rendered Mermaid diagrams.

## Quick Start

```bash
# Process all changed articles (recommended)
pnpm wechat

# Process specific article
pnpm wechat article-slug

# Process and open output folder
pnpm wechat --open

# List available articles with diagrams
pnpm wechat:list
```

## Streamlined Workflow

The unified `wechat` command combines extraction and processing in one step:

```bash
pnpm wechat                    # Process changed articles
pnpm wechat rice               # Process article matching "rice"
pnpm wechat --zh               # Chinese articles only
pnpm wechat fundamental -o     # Process + open output
```

### Available Commands

| Command | Description |
|---------|-------------|
| `pnpm wechat` | Process all changed articles (incremental) |
| `pnpm wechat <slug>` | Process specific article(s) |
| `pnpm wechat:open` | Process and open output directory |
| `pnpm wechat:list` | List articles with Mermaid diagrams |
| `pnpm wechat:zh` | Process Chinese articles only |
| `pnpm wechat:en` | Process English articles only |

### Options

| Option | Description |
|--------|-------------|
| `-o, --open` | Open output directory after processing |
| `-f, --force` | Force rebuild (ignore cache) |
| `--zh` | Only Chinese articles |
| `--en` | Only English articles |
| `-l, --list` | List available articles |
| `-q, --quiet` | Minimal output |
| `-v, --verbose` | Detailed output |

### What Gets Converted

1. **Mermaid diagrams** → PNG images with white background
2. **Docusaurus admonitions** (`:::tip`, `:::warning`, etc.) → Standard markdown blockquotes
3. **Relative blog links** → Absolute URLs
4. **Truncate markers** (`{/* truncate */}`) → Removed
5. **Footer added** → Link back to original blog post

## Output

```
.temp/wechat/
├── images/                # Generated PNG diagrams
│   └── *.png
└── *-wechat.md            # WeChat-ready markdown
```

Output files:
- `*-en-wechat.md` - English article ready for WeChat
- `*-zh-wechat.md` - Chinese article ready for WeChat
- `images/*.png` - All diagram images (white background)

## Example Workflows

### New Article
```bash
pnpm wechat new-article-slug -o
```

### Force Rebuild All
```bash
pnpm wechat --force
```

### Chinese Only
```bash
pnpm wechat:zh
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

### Blog Directories

Configured in the script:
```javascript
const BLOG_DIRS = [
  'blog',
  'i18n/zh/docusaurus-plugin-content-blog'
];
```

## Troubleshooting

### Cache Issues
```bash
# Force rebuild
pnpm wechat --force
```

### Mermaid Rendering Fails
Check that `puppeteer.config.json` exists in project root.

### No Articles Found
```bash
# List available articles first
pnpm wechat:list
```

---

## Legacy Commands

The original two-step workflow is still available:

```bash
# Two-step process
pnpm wechat:extract
pnpm wechat:process

# Combined legacy command
pnpm wechat:build

# With filters
node scripts/extract-blog-mermaid.js --locale zh --tags ai
node scripts/process-blog-for-wechat.js --file rice
```

See `extract-blog-mermaid.js` and `process-blog-for-wechat.js` for full options.
