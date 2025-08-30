# marvinzhang.dev

Marvin Zhang's personal website and blog built with [Nextra](https://nextra.site/).

## 🚀 Features

- **Modern Blog**: Built with Nextra blog theme
- **MDX Support**: Write content in Markdown with React components
- **Responsive Design**: Mobile-friendly and accessible
- **SEO Optimized**: Proper meta tags and structured data
- **Dark Mode**: Built-in dark mode support
- **Fast Performance**: Powered by Next.js

## 📁 Project Structure

```
├── pages/
│   ├── index.mdx              # Homepage
│   ├── about.mdx              # About page
│   └── posts/                 # Blog posts
│       └── *.mdx              # Individual blog posts
├── theme.config.jsx           # Nextra theme configuration
├── next.config.js             # Next.js configuration
└── package.json               # Dependencies and scripts
```

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
npm start
```

## ✍️ Writing Blog Posts

Create a new `.mdx` file in the `pages/posts/` directory with frontmatter:

```yaml
---
title: Your Post Title
date: YYYY/M/D
description: Brief description of the post
tag: comma, separated, tags
author: Author Name
---

# Your content here

Your blog post content in Markdown format.
```

## 🎨 Customization

### Theme Configuration

Edit `theme.config.jsx` to customize:
- Footer content
- Navigation links
- Meta tags
- Dark mode settings

### Styling

The blog uses Nextra's built-in styling. For custom styles:
1. Create a `styles/` directory
2. Add CSS files and import them in your pages

## 📝 Migration Notes

This blog is set up to accommodate articles migrated from previous content sources. The structure supports:

- Multiple blog posts with proper categorization
- SEO-friendly URLs
- Tag-based organization
- Author attribution
- Date-based sorting

## 🔗 Links

- [Nextra Documentation](https://nextra.site/)
- [Next.js Documentation](https://nextjs.org/docs)
- [GitHub Repository](https://github.com/tikazyq/marvinzhang.dev)

## 📄 License

MIT License - see LICENSE file for details.
>>>>>>> 82e3264fd55b7f5dd4472f3d095fe3c97ae15a97
