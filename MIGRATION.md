# Article Migration Template

Use this template when migrating articles from the previous blog:

## Migration Checklist

- [ ] Copy original content
- [ ] Add proper frontmatter
- [ ] Convert to MDX format
- [ ] Update image paths
- [ ] Add appropriate tags
- [ ] Test formatting
- [ ] Update internal links

## Frontmatter Template

```yaml
---
title: Article Title Here
date: YYYY/M/D
description: Brief description of the article (1-2 sentences)
tag: comma, separated, tags, relevant-to-content
author: Marvin Zhang
---
```

## Content Guidelines

### Images
- Place images in `public/images/` directory
- Use relative paths: `/images/filename.jpg`
- Add alt text for accessibility

### Code Blocks
- Use language-specific syntax highlighting
- Add comments for complex code
- Include runnable examples when possible

### Links
- Update all internal links to new site structure
- Verify external links are still valid
- Use descriptive link text

### Components
Available Nextra components:
- `Callout` for important notes
- `Steps` for tutorials
- `Tabs` for multiple options
- `Cards` for feature highlights

## File Naming
- Use kebab-case: `my-article-title.mdx`
- Include publication date for organization
- Keep names descriptive but concise

## SEO Considerations
- Unique title for each post
- Descriptive meta description
- Relevant tags for discoverability
- Proper heading hierarchy (H1, H2, H3)

## Testing
After migration:
1. Build the site: `npm run build`
2. Check for any broken links
3. Verify formatting in both light and dark modes
4. Test on mobile devices