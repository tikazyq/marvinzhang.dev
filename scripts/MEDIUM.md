# Medium Blog Publishing Scripts

Tool for converting Docusaurus blog posts to Medium-ready markdown format.

## Quick Start

```bash
# Process all changed articles (recommended)
pnpm medium

# Process specific article
pnpm medium article-slug

# Process and open output folder
pnpm medium --open

# List available articles
pnpm medium:list
```

## Commands

| Command | Description |
|---------|-------------|
| `pnpm medium` | Process all changed articles (incremental) |
| `pnpm medium <slug>` | Process specific article(s) |
| `pnpm medium:open` | Process and open output directory |
| `pnpm medium:list` | List all available articles |
| `pnpm medium:en` | Process English articles only |
| `pnpm medium:zh` | Process Chinese articles only |

## Options

| Option | Description |
|--------|-------------|
| `-o, --open` | Open output directory after processing |
| `-f, --force` | Force rebuild (ignore cache) |
| `--zh` | Only Chinese articles |
| `--en` | Only English articles |
| `-l, --list` | List available articles |
| `-q, --quiet` | Minimal output |
| `-v, --verbose` | Detailed output |

## What Gets Converted

| Source | Target |
|--------|--------|
| **Mermaid diagrams** | PNG images with white background (hosted URLs) |
| **Docusaurus admonitions** (`:::tip`, etc.) | Blockquotes with emoji headers |
| **MDX comments** (`{/* */}`) | Removed |
| **MDX imports/exports** | Removed |
| **H5/H6 headers** | Bold text (Medium only supports H1-H4) |
| **Relative links** | Absolute URLs |
| **Truncate markers** | Removed |
| **Frontmatter** | Converted to article header |
| **Tags** | Hashtag format in header |

## Output

Output is saved to the spec folder if one exists for the article, otherwise to `.temp/medium/`:

```
# If spec exists (e.g., specs/002-introducing-leanspec/)
specs/{spec-folder}/
├── medium-en.md           # English Medium-ready markdown
└── medium-zh.md           # Chinese Medium-ready markdown

# Fallback (no matching spec)
.temp/medium/
└── *-medium.md            # Medium-ready markdown

# Diagram images (always here)
static/img/blog/{slug}/medium/
└── *.png                  # Diagram images (if any)
```

Output files:
- `medium-en.md` - English article ready for Medium (in spec folder)
- `medium-zh.md` - Chinese article ready for Medium (in spec folder)
- `*-en-medium.md` / `*-zh-medium.md` - Fallback format in `.temp/medium/`

## Medium Import Instructions

### Option 1: Copy & Paste (Recommended)

1. Open the generated `.md` file
2. Copy all content
3. Go to Medium.com → New Story
4. Paste content into the editor
5. Review formatting and adjust as needed
6. Add images manually if they don't load

### Option 2: Import Feature

1. Host the `.md` file at a public URL
2. Go to Medium.com → Stories → Import a story
3. Enter the URL
4. Review and edit the imported content

## Medium Limitations

Medium's markdown support has some limitations:

- **No custom HTML** - Only standard markdown elements
- **Headers H1-H4 only** - H5/H6 converted to bold text
- **Limited code highlighting** - Basic syntax detection
- **External images** - Must be hosted or uploaded manually
- **No frontmatter** - Stripped during conversion (added as header)
- **No tables** - May need to convert to images or lists

## Example Workflows

### Publish English Article

```bash
pnpm medium my-article-slug --en -o
```

### Force Rebuild All

```bash
pnpm medium --force
```

### Check Available Articles

```bash
pnpm medium:list
```

## Comparison with WeChat Export

| Feature | WeChat | Medium |
|---------|--------|--------|
| Output format | WeChat-optimized MD | Standard MD |
| Image handling | Absolute URLs | Absolute URLs |
| Header limit | None | H1-H4 only |
| Code blocks | Preserved | Preserved |
| Tables | Preserved | May need adjustment |
| Admonitions | Blockquotes | Blockquotes |
| Footer | Chinese/English | Chinese/English |

## Troubleshooting

### Cache Issues
```bash
# Force rebuild
pnpm medium --force
```

### Mermaid Rendering Fails
Check that `puppeteer.config.json` exists in project root.

### Images Not Loading on Medium
- Medium may not load all external images
- Download from `static/img/blog/{slug}/medium/` and upload manually
- Or use Medium's image upload feature

### Formatting Issues After Import
- Medium's import can be imperfect
- Manual adjustments may be needed for:
  - Code block languages
  - Image captions
  - Section breaks
