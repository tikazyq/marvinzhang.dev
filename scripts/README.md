# Blog Scripts

This directory contains active utilities for managing blog content.

## Active Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| `wechat.js` | Export articles for WeChat | `pnpm wechat <slug> --zh -o` |
| `generate-wechat-html.js` | Render WeChat markdown to inline-styled HTML | Called by `wechat.js`; standalone via `pnpm wechat:html` |
| `medium.js` | Export articles for Medium | `pnpm medium <slug>` |
| `screenshot-jsx-components.js` | Screenshot JSX/React figures for exports | Called by `wechat.js` / `medium.js` |
| `validate-zh-bold-formatting-source.js` | Validate Chinese formatting | `pnpm run validate:zh-bold-source` |
| `drafts/scaffold.js` | Scaffold a drafts workspace | `node scripts/drafts/scaffold.js "title" "YYYY-MM-DD"` |

## Chinese Bold Formatting Validation

AI coding agents sometimes fail to follow MDX bold formatting rules for Chinese articles. The source validator catches issues before commit (also enforced in CI via `.github/workflows/validate-zh-formatting.yml`):

### Formatting Rules

1. **Multiple bold sections on same line**: Must have space before second `**`
   ```markdown
   ✅ 这与 **语法属性** 形成对比
   ❌ 这与**语法属性**形成对比
   ```

2. **Bold text with quotes**: Must have spaces inside bold markers
   ```markdown
   ✅ ** "所有程序行为" ** 是一个语义属性
   ❌ **"所有程序行为"** 是一个语义属性
   ```

### Source Validator

Fast, static analysis of MDX source files:

```bash
# Validate all Chinese blog posts
pnpm run validate:zh-bold-source

# Auto-fix detected issues
pnpm run validate:zh-bold-source:fix
```

## WeChat Export

See [WECHAT.md](WECHAT.md) for full documentation.

```bash
# Export Chinese article and open output folder
pnpm wechat <slug> --zh -o
```

## Medium Export

See [MEDIUM.md](MEDIUM.md) for full documentation.

## Archived Scripts

One-time migration scripts and superseded utilities are preserved in `archived/` for reference:
- `migrate-blog-structure.js` - Migrated nested to flat blog structure
- `migrate-legacy-articles.js` - Migrated articles/ to blog/
- `backup-blog.js` - Blog backup utility
- `extract-blog-mermaid.js` / `process-blog-for-wechat.js` - Legacy two-step WeChat flow (superseded by `wechat.js`)
- `validate-zh-bold-formatting.js` - Rendered-output validator (superseded by the source validator)
- Others - Various one-time utilities
