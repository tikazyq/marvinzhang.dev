# marvinzhang.dev

Marvin Zhang's personal website and blog built with [Docusaurus](https://docusaurus.io/).

## 🚀 Features

- **Modern Blog**: Built with Docusaurus blog theme
- **MDX Support**: Write content in Markdown with React components
- **Responsive Design**: Mobile-friendly and accessible
- **SEO Optimized**: Proper meta tags and structured data
- **Dark Mode**: Built-in dark mode support
- **Fast Performance**: Powered by Docusaurus
- **Internationalization**: Support for English and Chinese content

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm run serve
```

## ✍️ Writing Blog Posts

Create a new `.mdx` file in the `blog/` directory with frontmatter:

```yaml
---
slug: my-post-slug
title: Your Post Title
authors: [marvin]
tags: ["tag1", "tag2"]
date: YYYY-MM-DD
---

# Your content here

Your blog post content in Markdown format.
```

For Chinese posts, create files in the `i18n/zh/docusaurus-plugin-content-blog/` directory.

## 🎨 Customization

### Theme Configuration

Edit `docusaurus.config.ts` to customize:
- Site metadata
- Navigation links
- Footer content
- Internationalization settings

### Styling

The blog uses Docusaurus's built-in styling. For custom styles:
1. Edit `src/css/custom.css`
2. Add custom CSS classes and styles

## 🌐 Internationalization

The site supports both English and Chinese:
- English posts go in the `blog/` directory
- Chinese posts go in the `i18n/zh/docusaurus-plugin-content-blog/` directory
- Use the language switcher to toggle between languages

## 🔗 Links

- [Docusaurus Documentation](https://docusaurus.io/)
- [GitHub Repository](https://github.com/tikazyq/marvinzhang.dev)

## 📄 License

MIT License - see LICENSE file for details.
