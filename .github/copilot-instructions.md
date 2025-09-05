# marvinzhang.dev Copilot Instructions

This is a **Docusaurus 3.8.1** personal blog site with bilingual content (English/Chinese) and custom deployment configuration.

## Architecture Overview

- **Framework**: Docusaurus blog-only site (docs disabled via `docs: false`)
- **Blog Route**: Root path (`/`) serves blog content, not docs
- **Package Manager**: **pnpm** (not npm/yarn) - critical for all commands
- **Deployment**: Vercel with custom config in `vercel.json`
- **Internationalization**: Full i18n with parallel content structures

## Content Structure

### Blog Posts
- **English**: `blog/YYYY-MM-DD-post-slug.mdx`
- **Chinese**: `i18n/zh/docusaurus-plugin-content-blog/YYYY-MM-DD-post-slug.mdx`
- **Required frontmatter**:
  ```yaml
  ---
  slug: post-slug
  title: "Post Title"
  authors: ["marvin"]
  tags: ["tag1", "tag2"]
  date: YYYY-MM-DD
  ---
  ```

### Author Configuration
- Both `blog/authors.yml` and `i18n/zh/docusaurus-plugin-content-blog/authors.yml` must be synchronized
- Single author: `marvin` with GitHub profile integration

## Key Development Commands

```bash
# Development server
pnpm dev

# Production build
pnpm run build

# Generate translations
pnpm run write-translations -l zh

# Type checking
pnpm run typecheck
```

## Critical Configuration Files

### `docusaurus.config.ts`
- **Blog-first site**: `routeBasePath: '/'` serves blog at root
- **Future v4 compatibility**: `future.v4: true` enabled
- **Locales**: `['en', 'zh']` with English default
- **Theme**: Custom CSS in `src/css/custom.css` with dark mode support

### `vercel.json`
- **Build**: Uses `pnpm run build` (not npm)
- **Caching**: Static assets cached for 1 year
- **SPA routing**: All routes redirect to `/index.html`

## Internationalization Patterns

### Content Duplication
- Chinese content lives in `i18n/zh/docusaurus-plugin-content-blog/`
- Translation keys in `i18n/zh/code.json`
- Blog metadata (authors.yml, tags.yml) must exist in both locations

### Translation Workflow
1. Write English post in `blog/`
2. Run `pnpm run write-translations -l zh`
3. Translate content in `i18n/zh/docusaurus-plugin-content-blog/`
4. Update `i18n/zh/code.json` for UI strings

## Writing Guidelines

### MDX Format
- Use `.mdx` extension for React component support
- Rich content with images hosted on external CDN
- Technical posts often include code blocks with syntax highlighting

### Content Patterns
- Long-form technical articles (AI, programming, data analysis)
- External image references with descriptive alt text
- Code examples with proper language tagging

## Project-Specific Conventions

- **No docs section**: This is blog-only, avoid doc-related features
- **pnpm lock file**: Always commit `pnpm-lock.yaml`, never `package-lock.json`
- **TypeScript config**: Extends Docusaurus TypeScript presets
- **CSS customization**: Use CSS custom properties in `src/css/custom.css`

## Common Tasks

### Adding New Blog Post
1. Create English MDX in `blog/YYYY-MM-DD-post-slug.mdx`
2. Add required frontmatter with `slug`, `title`, `authors`, `tags`, `date`
3. Create Chinese version in `i18n/zh/docusaurus-plugin-content-blog/YYYY-MM-DD-post-slug.mdx`
4. Test both language versions

### Deployment
- Vercel automatically deploys from main branch
- Build uses `pnpm run build` and outputs to `build/` directory
- Static files cached aggressively via headers configuration
- Adhoc scripts or files should be put in `./tmp` folder

When working on this codebase, always use pnpm commands and be mindful of the bilingual content structure requiring parallel file management.