# WeChat-Compatible HTML/CSS Styles

WeChat's editor strips most CSS classes and external stylesheets. All styles **must be inline**.

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
<h2 style="margin-top: 2em; margin-bottom: 0.8em; font-size: 1.3em; font-weight: bold; border-bottom: 1px solid #eee; padding-bottom: 0.3em;">
  Section Title
</h2>

<h3 style="margin-top: 1.5em; margin-bottom: 0.6em; font-size: 1.15em; font-weight: bold;">
  Subsection Title
</h3>
```

### Body Text

```html
<p style="margin: 1em 0; line-height: 1.8; font-size: 15px; color: #333;">
  Paragraph text here.
</p>
```

### Bold & Emphasis

```html
<strong style="font-weight: bold; color: #000;">Bold text</strong>
<em style="font-style: italic;">Italic text</em>
```

### Lists

```html
<ul style="margin: 1em 0; padding-left: 2em;">
  <li style="margin: 0.5em 0; line-height: 1.8; font-size: 15px; color: #333;">Item</li>
</ul>

<ol style="margin: 1em 0; padding-left: 2em;">
  <li style="margin: 0.5em 0; line-height: 1.8; font-size: 15px; color: #333;">Item</li>
</ol>
```

## Code Blocks

### Inline Code

```html
<code style="background-color: #f5f5f5; padding: 2px 6px; border-radius: 3px; font-size: 13px; font-family: Menlo, Monaco, Consolas, monospace; color: #c7254e;">
  variable_name
</code>
```

### Fenced Code Blocks

WeChat does not support syntax highlighting natively. Use a pre-styled block:

```html
<pre style="background-color: #2d2d2d; color: #ccc; padding: 16px; border-radius: 6px; overflow-x: auto; font-size: 13px; line-height: 1.6; margin: 1em 0;">
<code style="font-family: Menlo, Monaco, Consolas, monospace; white-space: pre;">
def hello():
    print("Hello, WeChat!")
</code>
</pre>
```

## Blockquotes & Admonitions

### Standard Blockquote

```html
<blockquote style="margin: 1em 0; padding: 12px 16px; border-left: 4px solid #ddd; background-color: #f9f9f9; color: #666;">
  <p style="margin: 0; line-height: 1.8; font-size: 15px;">Quote text</p>
</blockquote>
```

### Admonition Variants

The `pnpm wechat` script converts Docusaurus admonitions to emoji-prefixed blockquotes. Style them with distinct left borders:

```html
<!-- Tip (green) -->
<blockquote style="margin: 1em 0; padding: 12px 16px; border-left: 4px solid #00b894; background-color: #f0fff4;">
  <p style="margin: 0;">💡 <strong>提示</strong>：Tip content here</p>
</blockquote>

<!-- Warning (orange) -->
<blockquote style="margin: 1em 0; padding: 12px 16px; border-left: 4px solid #fdcb6e; background-color: #fffbf0;">
  <p style="margin: 0;">⚠️ <strong>注意</strong>：Warning content here</p>
</blockquote>

<!-- Info (blue) -->
<blockquote style="margin: 1em 0; padding: 12px 16px; border-left: 4px solid #74b9ff; background-color: #f0f7ff;">
  <p style="margin: 0;">ℹ️ <strong>信息</strong>：Info content here</p>
</blockquote>

<!-- Danger (red) -->
<blockquote style="margin: 1em 0; padding: 12px 16px; border-left: 4px solid #ff7675; background-color: #fff5f5;">
  <p style="margin: 0;">🚨 <strong>危险</strong>：Danger content here</p>
</blockquote>
```

## Tables

```html
<table style="width: 100%; border-collapse: collapse; margin: 1em 0; font-size: 14px;">
  <thead>
    <tr style="background-color: #f5f5f5;">
      <th style="border: 1px solid #ddd; padding: 8px 12px; text-align: left; font-weight: bold;">Header</th>
      <th style="border: 1px solid #ddd; padding: 8px 12px; text-align: left; font-weight: bold;">Header</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px 12px;">Cell</td>
      <td style="border: 1px solid #ddd; padding: 8px 12px;">Cell</td>
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

Summary of markdown element → inline style mapping:

| Markdown | HTML Tag | Key Inline Styles |
|----------|----------|-------------------|
| `# H1` | `<h1>` | `font-size: 1.5em; font-weight: bold; margin: 1.5em 0 0.8em` |
| `## H2` | `<h2>` | `font-size: 1.3em; border-bottom: 1px solid #eee` |
| `### H3` | `<h3>` | `font-size: 1.15em; font-weight: bold` |
| Paragraph | `<p>` | `line-height: 1.8; font-size: 15px; color: #333` |
| `**bold**` | `<strong>` | `font-weight: bold; color: #000` |
| `` `code` `` | `<code>` | `background: #f5f5f5; padding: 2px 6px; font-size: 13px` |
| Code fence | `<pre><code>` | `background: #2d2d2d; color: #ccc; padding: 16px` |
| `> quote` | `<blockquote>` | `border-left: 4px solid #ddd; background: #f9f9f9` |
| `- item` | `<ul><li>` | `padding-left: 2em; margin: 0.5em 0` |
| Table | `<table>` | `border-collapse: collapse; width: 100%` |
| Image | `<img>` | `max-width: 100%; height: auto` |
| Link | `<span>` | Footnote reference (no clickable links) |
| `---` | `<hr>` | `border: none; border-top: 1px solid #eee; margin: 2em 0` |
