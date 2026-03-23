# WeChat MP Editor DOM Structure

Detailed reference for interacting with the WeChat Official Account article editor at `mp.weixin.qq.com`.

**Related**: [wechat-styles.md](wechat-styles.md) for HTML/CSS styles, [qr-login.md](qr-login.md) for login flow.

## Contents

- [Editor Page URL](#editor-page-url)
- [Key DOM Elements](#key-dom-elements)
- [Rich Text Editor](#rich-text-editor)
- [Content Injection Strategies](#content-injection-strategies)
- [Image Handling](#image-handling)
- [Cover Image](#cover-image)
- [Draft & Publish Buttons](#draft--publish-buttons)
- [Common Pitfalls](#common-pitfalls)

## Editor Page URL

```
# Create new article
https://mp.weixin.qq.com/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=77

# Edit existing draft (by appmsgid)
https://mp.weixin.qq.com/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=77&appmsgid=<ID>
```

## Key DOM Elements

WeChat MP frequently updates its DOM. **Always use `agent-browser snapshot -i` before interacting.** The selectors below are reference points — actual refs will vary.

### Title Input

```
Selector hints: #title, input[placeholder*="标题"], .title_input
Max length: 64 characters
```

```bash
agent-browser snapshot -i
agent-browser fill @title_ref "<title>"
```

### Author Input

```
Selector hints: #author, input[placeholder*="作者"]
Max length: 16 characters
```

### Digest / Summary

```
Selector hints: #digest, textarea[placeholder*="摘要"]
Max length: 120 characters
Auto-generated if left empty (first 120 chars of body)
```

### Original Declaration

```
Selector hints: #js_original, .original-checkbox
Check this to declare original content (原创声明)
```

## Rich Text Editor

WeChat uses a custom contentEditable `<div>` editor (UEditor-based).

### Editor Container

```
Selector hints:
  - #edui_editor          (main editable div)
  - .edui-editor-body     (editor body wrapper)
  - [contenteditable=true] (generic)
  - iframe > body          (sometimes in iframe)
```

### Content Injection Strategies

#### Strategy 1: Direct innerHTML (Preferred)

```bash
agent-browser execute "
  const editor = document.querySelector('#edui_editor') ||
                 document.querySelector('[contenteditable=true]');
  if (editor) {
    editor.innerHTML = arguments[0];
    editor.dispatchEvent(new Event('input', { bubbles: true }));
    editor.dispatchEvent(new Event('change', { bubbles: true }));
  }
" "<html-content>"
```

#### Strategy 2: Clipboard Paste (Fallback)

If direct injection doesn't trigger WeChat's save mechanism:

```bash
# Focus the editor
agent-browser click @editor_ref

# Select all existing content
agent-browser press Control+a

# Paste from system clipboard (requires clipboard API)
agent-browser execute "
  const html = arguments[0];
  const blob = new Blob([html], { type: 'text/html' });
  const item = new ClipboardItem({ 'text/html': blob });
  navigator.clipboard.write([item]);
" "<html-content>"

agent-browser press Control+v
agent-browser wait 2000
```

#### Strategy 3: Paragraph-by-Paragraph (Most Reliable)

For maximum compatibility, type content paragraph by paragraph:

```bash
agent-browser click @editor_ref
# Type each block sequentially
agent-browser type @editor_ref "<first-paragraph>"
agent-browser press Enter
agent-browser press Enter
agent-browser type @editor_ref "<second-paragraph>"
```

This is slow but bypasses all editor quirks.

### Verifying Content

After injection, verify content was accepted:

```bash
agent-browser snapshot -s "#edui_editor"
# Or screenshot the editor area
agent-browser screenshot /tmp/wechat-editor-preview.png
```

## Image Handling

### In-Article Images

WeChat auto-fetches remote images when HTML contains `<img src="https://...">`. Two approaches:

**Approach A: Remote URLs (Simpler)**

Use absolute URLs from `marvinzhang.dev`. WeChat fetches and re-hosts automatically:

```html
<img src="https://marvinzhang.dev/img/blog/slug/wechat/diagram-zh-1.png" />
```

**Approach B: Pre-upload to WeChat CDN (More Reliable)**

Upload via the media library first, then use WeChat CDN URLs:

```bash
# Navigate to media library
agent-browser open "https://mp.weixin.qq.com/cgi-bin/filepage?type=2"
agent-browser wait --load networkidle
agent-browser snapshot -i

# Upload
agent-browser click @upload_btn
agent-browser file "/path/to/image.png"
agent-browser wait --load networkidle

# Get CDN URL from the uploaded item
agent-browser snapshot -i
# Look for the newly uploaded item's data attributes or img src
```

### Image Size Limits

- Max single image: 10MB
- Supported formats: JPG, PNG, GIF
- Recommended width: 900px–1080px (retina-ready for 578px display)

## Cover Image

```
Selector hints: .cover-upload, #js_cover_area, .js_cover
Dimensions: 2.35:1 ratio recommended (900×383px or 1080×460px)
```

```bash
agent-browser snapshot -i
agent-browser click @cover_area
agent-browser wait --load networkidle
agent-browser snapshot -i

# Upload cover image
agent-browser click @upload_cover_btn
agent-browser file "/path/to/cover.png"
agent-browser wait --load networkidle

# May need to crop — snapshot and interact with crop dialog
agent-browser snapshot -i
agent-browser click @confirm_crop_btn
```

## Draft & Publish Buttons

### Save Draft

```
Selector hints: #js_save, .js_save, button:has-text("保存")
```

```bash
agent-browser click @save_btn
agent-browser wait 3000
agent-browser snapshot -i  # Verify success toast/message
```

### Preview

```
Selector hints: #js_preview, button:has-text("预览")
```

Preview sends the article to your WeChat for mobile preview.

### Publish

```
Selector hints: #js_send, .js_send, button:has-text("群发"), button:has-text("发表")
```

Publishing triggers a confirmation dialog and may require a second QR scan:

```bash
agent-browser click @publish_btn
agent-browser wait --load networkidle
agent-browser snapshot -i  # Check for confirmation dialog

# Confirm
agent-browser click @confirm_btn

# Second QR scan may be required
agent-browser screenshot /tmp/wechat-publish-confirm.png
# Show to user, wait for scan
```

## Common Pitfalls

| Issue | Cause | Solution |
|-------|-------|----------|
| Content disappears after save | Editor events not triggered | Use `dispatchEvent` after innerHTML injection |
| Images show broken | WeChat couldn't fetch remote URL | Pre-upload to WeChat CDN instead |
| Formatting lost | WeChat stripped unsupported CSS | Use only inline styles from wechat-styles.md |
| "Session expired" after idle | WeChat auto-logouts after ~30min | Reload page and check; re-login if needed |
| Save button grayed out | Title or content empty | Ensure both are filled before saving |
| Editor in iframe | Some account types use iframe editor | Use `agent-browser execute` to target iframe document |
