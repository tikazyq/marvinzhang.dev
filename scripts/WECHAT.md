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
4. **In-text links** → Plain text + superscript `<sup>[n]</sup>` markers (WeChat strips
   external links, so anchor text would render colored but dead)
5. **References section appended** → Explicit `[n] Title` + URL paragraphs matching the
   in-text markers (plain paragraphs, not a markdown ordered list — the HTML renderer's
   `ol` style clips native list markers)
6. **Bold markers normalized** → `**text **` / `** text**` → `**text**`, one balanced
   pair at a time (a space-adjacent delimiter breaks CommonMark/marked bold parsing)
7. **Code blocks** → syntax-highlighted inline; long lines scroll horizontally (`overflow-x` on pre, `nowrap` on code); line breaks baked in as `<br/>`/`&nbsp;`
   horizontal scrolling on phones
8. **Truncate markers** (`{/* truncate */}`) → Removed
9. **Footer added** → Link back to original blog post

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

### Linking to Published 公众号 Articles (`wechat_url`)

WeChat rejects `<a>` tags pointing outside WeChat, so external links are
converted to footnote references. Links **within** WeChat are allowed: when a
blog article has already been published on the 公众号, declare its permanent
URL in the article's MDX frontmatter (zh version preferred):

```yaml
wechat_url: https://mp.weixin.qq.com/s/gf8Y_715rOLbvqZBY0blVA
```

During export, blog cross-references (`/blog/<slug>` or absolute
`marvinzhang.dev` links) whose target declares a `wechat_url` are rewritten to
that URL and stay clickable; targets without one degrade to footnotes.

Only use **permanent short links** (`https://mp.weixin.qq.com/s/...`, copied
from the 公众号 article page or 后台) — search-result URLs with
`signature=`/`timestamp=` parameters expire. After publishing each new
article, add its `wechat_url` so future articles can link back to it.

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

## Legacy Workflow

The original two-step workflow (`extract-blog-mermaid.js` + `process-blog-for-wechat.js`) has been retired; the scripts are preserved in `scripts/archived/` for reference. Use the unified `pnpm wechat <slug>` command instead.
