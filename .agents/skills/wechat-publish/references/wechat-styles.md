# WeChat-Compatible HTML/CSS Styles — mdnice 风格

WeChat's editor strips most CSS classes and external stylesheets. All styles **must be inline**.

**Theme**: mdnice 风格 — accent color `rgb(53, 148, 247)` / `rgb(64, 184, 250)`, matched to published 公众号 article styling.

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
2. **Serif font stack** — Use `Optima, PingFangSC-light, serif` (matches mdnice)
3. **No flexbox/grid** — WeChat's renderer has limited CSS support
4. **Max width 578px** — WeChat article body width on mobile
5. **Dark mode aware** — WeChat supports dark mode; avoid hardcoded white backgrounds for text

## Typography

### Headings

```html
<h1 style="font-size: 24px; font-weight: 600; margin: 30px 0 15px; padding-bottom: 10px; border-bottom: 4px solid rgb(64, 184, 250); color: rgb(64, 184, 250);">
  Page Title
</h1>

<h2 style="font-size: 20px; font-weight: bold; margin: 30px 0 15px; padding: 0; color: rgb(64, 184, 250); background-color: transparent; border-bottom: 4px solid rgb(64, 184, 250); line-height: 1.5em;">
  Section Title
</h2>

<h3 style="font-size: 18px; font-weight: bold; margin: 30px 0 15px; padding: 0; color: rgb(43, 43, 43); line-height: 1.5em; text-align: center;">
  Subsection Title
</h3>
```

### Body Text

```html
<p style="font-size: 14px; line-height: 1.8em; letter-spacing: 0.02em; color: rgb(43, 43, 43); text-align: left; text-indent: 0; margin: 0; padding: 8px 0;">
  Paragraph text here.
</p>
```

### Bold & Emphasis

```html
<strong style="font-weight: bold; color: rgb(53, 148, 247);">Bold text</strong>
<em style="font-style: italic;">Italic text</em>
```

### Lists

```html
<ul style="padding-left: 0; margin: 8px 0; list-style: disc;">
  <li style="margin-bottom: 4px; font-size: 14px; line-height: 1.8em; letter-spacing: 0.02em; color: rgb(43, 43, 43);">Item</li>
</ul>

<ol style="padding-left: 0; margin: 8px 0;">
  <li style="margin-bottom: 4px; font-size: 14px; line-height: 1.8em; letter-spacing: 0.02em; color: rgb(43, 43, 43);">Item</li>
</ol>
```

## Code Blocks

### Inline Code

```html
<code style="background-color: rgba(27, 31, 35, 0.05); padding: 2px 4px; border-radius: 3px; font-size: 14px; font-family: 'Operator Mono', Consolas, Monaco, Menlo, monospace; color: rgb(53, 148, 247); letter-spacing: 0;">
  variable_name
</code>
```

### Fenced Code Blocks

WeChat does not support syntax highlighting natively. Use a pre-styled block:

```html
<pre style="background-color: rgb(30, 30, 30); padding: 15px; border-radius: 5px; overflow-x: auto; margin: 10px 0;">
<code style="background: none; padding: 0; border-radius: 0; font-size: 14px; line-height: 1.6; font-family: 'Operator Mono', Consolas, Monaco, Menlo, monospace; color: #abb2bf;">
def hello():
    print("Hello, WeChat!")
</code>
</pre>
```

## Blockquotes & Admonitions

### Standard Blockquote

```html
<blockquote style="margin: 20px 0; padding: 10px 10px 10px 20px; background-color: rgba(64, 184, 250, 0.1); border: 1px solid rgba(64, 184, 255, 0.4); border-radius: 8px; color: rgb(43, 43, 43);">
  <p style="margin: 0; font-size: 14px; line-height: 1.8em; letter-spacing: 0.02em; color: rgb(43, 43, 43);">Quote text</p>
</blockquote>
```

### Admonition Variants

The `pnpm wechat` script converts Docusaurus admonitions to emoji-prefixed blockquotes. All use the same blockquote style:

```html
<blockquote style="margin: 20px 0; padding: 10px 10px 10px 20px; background-color: rgba(64, 184, 250, 0.1); border: 1px solid rgba(64, 184, 255, 0.4); border-radius: 8px; color: rgb(43, 43, 43);">
  <p style="margin: 0;">💡 <strong style="font-weight: bold; color: rgb(53, 148, 247);">提示</strong>：Tip content here</p>
</blockquote>
```

## Tables

```html
<table style="width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 14px;">
  <thead>
    <tr>
      <th style="padding: 5px 10px; text-align: left; border: 1px solid rgba(204, 204, 204, 0.4); background: rgb(240, 240, 240); color: rgb(89, 89, 89); font-weight: bold; font-size: 14px; line-height: 1.5em; letter-spacing: 0.02em; min-width: 85px;">Header</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 5px 10px; text-align: left; border: 1px solid rgba(204, 204, 204, 0.4); font-size: 14px; line-height: 1.5em; letter-spacing: 0.02em; color: rgb(89, 89, 89); min-width: 85px;">Cell</td>
    </tr>
  </tbody>
</table>
```

## Images

```html
<img src="https://marvinzhang.dev/img/blog/slug/wechat/diagram.png"
     style="max-width: 100%; width: 100%; height: auto; display: block; margin: 0;"
     alt="Description" />
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

Summary of markdown element → inline style mapping (mdnice 风格, accent `rgb(53, 148, 247)`):

| Markdown | HTML Tag | Key Inline Styles |
|----------|----------|-------------------|
| `# H1` | `<h1>` | `font-size: 24px; font-weight: 600; border-bottom: 4px solid rgb(64,184,250)` |
| `## H2` | `<h2>` | `font-size: 20px; border-bottom: 4px solid rgb(64,184,250); color: rgb(64,184,250)` |
| `### H3` | `<h3>` | `font-size: 18px; font-weight: bold; color: rgb(43,43,43); text-align: center` |
| Paragraph | `<p>` | `font-size: 14px; line-height: 1.8em; letter-spacing: 0.02em; padding: 8px 0` |
| `**bold**` | `<strong>` | `font-weight: bold; color: rgb(53, 148, 247)` |
| `` `code` `` | `<code>` | `background: rgba(27,31,35,0.05); color: rgb(53,148,247); font-size: 14px` |
| Code fence | `<pre><code>` | `background: rgb(30,30,30); color: #abb2bf` |
| `> quote` | `<blockquote>` | `border: 1px solid rgba(64,184,255,0.4); background: rgba(64,184,250,0.1); border-radius: 8px` |
| `- item` | `<ul><li>` | `font-size: 14px; line-height: 1.8em; letter-spacing: 0.02em` |
| Table | `<table>` | `border-collapse: collapse; width: 100%; th: background rgb(240,240,240)` |
| Image | `<img>` | `max-width: 100%; width: 100%; height: auto` |
| Link | `<a>` | `color: rgb(53, 148, 247); text-decoration: none` |
| `---` | `<hr>` | `border: none; border-top: 2px solid rgba(64,184,250,0.4); margin: 10px 0` |
