# WeChat-Compatible HTML/CSS Styles — 极客蓝 (Geek Blue) Theme

WeChat's editor strips most CSS classes and external stylesheets. All styles **must be inline**.

**Theme**: 极客蓝 (Geek Blue) — primary color `#1890FF`, accent backgrounds `#E6F7FF`.

**Related**: [mp-editor.md](mp-editor.md) for editor DOM structure, [SKILL.md](../SKILL.md) for quick start.

## Contents

- [Style Principles](#style-principles)
- [Typography](#typography)
- [Code Blocks](#code-blocks)
- [Blockquotes & Admonitions](#blockquotes--admonitions)
- [Tables](#tables)
- [Images](#images)
- [Links](#links)
- [Complete Style Map](#complete-style-map)

## Style Principles

1. **All inline** — WeChat strips `<style>` blocks and `class` attributes
2. **No external fonts** — Use system font stack only
3. **No flexbox/grid** — WeChat's renderer has limited CSS support
4. **Max width 578px** — WeChat article body width on mobile
5. **Dark mode aware** — WeChat supports dark mode; avoid hardcoded white backgrounds for text

## Typography

### Headings

```html
<h1 style="font-size: 24px; font-weight: 600; margin: 30px 0 20px; padding-bottom: 15px; border-bottom: 3px solid #1890FF; color: #000;">
  Page Title
</h1>

<h2 style="font-size: 17px; font-weight: bold; margin: 20px 0 12px; padding: 12px 16px; color: #1890FF; background-color: #E6F7FF; border-radius: 8px; border-left: 4px solid #1890FF; text-align: justify;">
  Section Title
</h2>

<h3 style="font-size: 18px; font-weight: 600; margin: 25px 0 15px; color: #1890FF;">
  Subsection Title
</h3>
```

### Body Text

```html
<p style="margin: 15px 0; text-align: justify;">
  Paragraph text here.
</p>
```

### Bold & Emphasis

```html
<strong style="font-weight: 600; color: #1890FF;">Bold text</strong>
<em style="font-style: italic;">Italic text</em>
```

### Lists

```html
<ul style="padding-left: 22px; margin: 15px 0;">
  <li style="margin-bottom: 8px;">Item</li>
</ul>

<ol style="padding-left: 22px; margin: 15px 0;">
  <li style="margin-bottom: 8px;">Item</li>
</ol>
```

## Code Blocks

### Inline Code

```html
<code style="background: #E6F7FF; padding: 2px 6px; border-radius: 3px; font-size: 14px; font-family: 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; color: #1890FF;">
  variable_name
</code>
```

### Fenced Code Blocks

WeChat does not support syntax highlighting natively. Use a pre-styled block:

```html
<pre style="background: #282c34; padding: 15px; border-radius: 8px; overflow-x: auto; margin: 20px 0; border-left: 3px solid #1890FF;">
<code style="background: none; padding: 0; border-radius: 0; font-size: 14px; line-height: 1.6; font-family: 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; color: #abb2bf;">
def hello():
    print("Hello, WeChat!")
</code>
</pre>
```

## Blockquotes & Admonitions

### Standard Blockquote

```html
<blockquote style="margin: 20px 0; padding: 12px 15px; background: #E6F7FF; border-left: 4px solid #1890FF; color: #666; border-radius: 0 8px 8px 0;">
  <p style="margin: 0;">Quote text</p>
</blockquote>
```

### Admonition Variants

The `pnpm wechat` script converts Docusaurus admonitions to emoji-prefixed blockquotes. All use the unified 极客蓝 blockquote style:

```html
<blockquote style="margin: 20px 0; padding: 12px 15px; background: #E6F7FF; border-left: 4px solid #1890FF; color: #666; border-radius: 0 8px 8px 0;">
  <p style="margin: 0;">💡 <strong style="font-weight: 600; color: #1890FF;">提示</strong>：Tip content here</p>
</blockquote>
```

## Tables

```html
<table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px; overflow: hidden;">
  <thead>
    <tr>
      <th style="padding: 12px; text-align: left; border: 1px solid #e0e0e0; background: #E6F7FF; color: #1890FF; font-weight: 600;">Header</th>
      <th style="padding: 12px; text-align: left; border: 1px solid #e0e0e0; background: #E6F7FF; color: #1890FF; font-weight: 600;">Header</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 12px; text-align: left; border: 1px solid #e0e0e0;">Cell</td>
      <td style="padding: 12px; text-align: left; border: 1px solid #e0e0e0;">Cell</td>
    </tr>
  </tbody>
</table>
```

## Images

```html
<!-- Full-width image with caption -->
<figure style="margin: 1.5em 0; text-align: center;">
  <img src="https://marvinzhang.dev/img/blog/slug/wechat/diagram.png"
       style="max-width: 100%; height: auto; border-radius: 4px;"
       alt="Description" />
  <figcaption style="margin-top: 0.5em; font-size: 13px; color: #999;">
    图：Image caption here
  </figcaption>
</figure>
```

WeChat auto-fetches remote images and re-hosts them on its CDN. Absolute URLs from `marvinzhang.dev` work directly.

## Links

WeChat articles **cannot contain external hyperlinks** in most account types. Convert links to footnote-style references:

```html
<!-- Instead of clickable links, show URL as reference -->
<span style="color: #576b95;">[1]</span>

<!-- Add footnotes section at the end -->
<section style="margin-top: 2em; padding-top: 1em; border-top: 1px solid #eee; font-size: 13px; color: #999;">
  <p>[1] https://example.com/reference</p>
  <p>[2] https://github.com/example/repo</p>
</section>
```

## Complete Style Map

Summary of markdown element → inline style mapping (极客蓝 theme, primary `#1890FF`):

| Markdown | HTML Tag | Key Inline Styles |
|----------|----------|-------------------|
| `# H1` | `<h1>` | `font-size: 24px; font-weight: 600; border-bottom: 3px solid #1890FF` |
| `## H2` | `<h2>` | `font-size: 17px; background: #E6F7FF; border-left: 4px solid #1890FF; color: #1890FF` |
| `### H3` | `<h3>` | `font-size: 18px; font-weight: 600; color: #1890FF` |
| Paragraph | `<p>` | `margin: 15px 0; text-align: justify` |
| `**bold**` | `<strong>` | `font-weight: 600; color: #1890FF` |
| `` `code` `` | `<code>` | `background: #E6F7FF; color: #1890FF; font-size: 14px` |
| Code fence | `<pre><code>` | `background: #282c34; color: #abb2bf; border-left: 3px solid #1890FF` |
| `> quote` | `<blockquote>` | `border-left: 4px solid #1890FF; background: #E6F7FF; border-radius: 0 8px 8px 0` |
| `- item` | `<ul><li>` | `padding-left: 22px; margin-bottom: 8px` |
| Table | `<table>` | `border-collapse: collapse; width: 100%; th: background #E6F7FF` |
| Image | `<img>` | `max-width: 100%; height: auto; border-radius: 6px` |
| Link | `<a>` | `color: #1890FF; text-decoration: none` |
| `---` | `<hr>` | `border: none; border-top: 2px dashed #BAE0FF; margin: 30px 0` |
