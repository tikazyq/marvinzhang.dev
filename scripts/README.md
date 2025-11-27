# Blog Scripts

This directory contains active utilities for managing blog content.

## Active Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| `wechat.js` | Export articles for WeChat | `pnpm wechat <slug> --zh -o` |
| `validate-zh-bold-formatting-source.js` | Validate Chinese formatting | `pnpm run validate:zh-bold-source` |
| `validate-zh-bold-formatting.js` | Validate rendered output | `pnpm run validate:zh-bold` |
| `extract-blog-mermaid.js` | Extract Mermaid diagrams | Internal use |

## Chinese Bold Formatting Validation

AI coding agents sometimes fail to follow MDX bold formatting rules for Chinese articles. Two validators help catch issues:

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

### Source Validator (Recommended)

Fast, static analysis of MDX source files:

```bash
# Validate all Chinese blog posts
pnpm run validate:zh-bold-source

# Auto-fix detected issues
pnpm run validate:zh-bold-source:fix
```

### Rendered Validator

Validates actual rendered HTML using Playwright (requires `npx playwright install chromium`):

```bash
pnpm run validate:zh-bold
```

## WeChat Export

See [WECHAT.md](WECHAT.md) for full documentation.

```bash
# Export Chinese article and open output folder
pnpm wechat <slug> --zh -o
```

## Archived Scripts

One-time migration scripts are preserved in `archived/` for reference:
- `migrate-blog-structure.js` - Migrated nested to flat blog structure
- `migrate-legacy-articles.js` - Migrated articles/ to blog/
- `backup-blog.js` - Blog backup utility
- Others - Various one-time utilities
