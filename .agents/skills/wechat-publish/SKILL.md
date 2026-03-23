---
name: wechat-publish
description: End-to-end automated publishing of blog articles to WeChat Official Account (微信公众号). Use when the user wants to publish a blog article to WeChat, automate WeChat MP login, upload images, fill the rich text editor, or save/publish drafts. Triggers include "publish to WeChat", "发布到微信", "微信公众号发布", "wechat publish", or any request involving mp.weixin.qq.com automation.
allowed-tools: Bash(agent-browser:*), Bash(pnpm wechat*)
metadata:
  author: marvinzhang
  version: "1.0"
  tier: workflow
  composes: "agent-browser"
---

# WeChat Publish

Automates the full pipeline: generate WeChat-ready markdown → browser login via QR → upload images → fill editor → save draft.

## End-to-End Workflow

```
pnpm wechat <slug> --zh        ← Step 1: Generate markdown + images
        ↓
agent-browser (QR login)       ← Step 2: User scans QR code
        ↓
Upload images to WeChat CDN    ← Step 3: Get CDN URLs
        ↓
Fill rich text editor           ← Step 4: Inject HTML content
        ↓
Save draft / publish            ← Step 5: Done
```

## Quick Start

When the user says "publish X to WeChat" or "发布 X 到微信公众号":

### 1. Generate WeChat-Ready Content

```bash
pnpm wechat <article-slug> --zh --force
```

This produces:
- WeChat markdown: `.temp/wechat/<slug>-zh-wechat.md` (or `specs/*/wechat-zh.md`)
- Diagram PNGs: `static/img/blog/<slug>/wechat/*.png`
- JSX screenshots: `static/img/blog/<slug>/wechat/*.png`

### 2. Convert Markdown → WeChat HTML via markdown-nice

Use the locally running [markdown-nice](https://github.com/tikazyq/markdown-nice) instance to render markdown into WeChat-compatible styled HTML:

```bash
# Start markdown-nice locally (if not already running)
cd ~/markdown-nice && npm start  # Runs on http://localhost:3000

# Open markdown-nice in browser
agent-browser open "http://localhost:3000"
agent-browser wait --load networkidle
agent-browser snapshot -i

# Paste the WeChat markdown into the editor (left panel)
agent-browser click @editor_panel
agent-browser press Control+a
# Read the markdown file content and type/paste it into the editor
agent-browser type @editor_panel "<markdown-content>"

# The right panel auto-renders styled HTML
# Copy the rendered HTML from the preview panel
agent-browser click @copy_btn  # Or use the "复制" button
```

markdown-nice handles:
- WeChat-compatible inline CSS styles
- Code block syntax highlighting with WeChat-friendly themes
- Proper image sizing and alignment
- Chinese typography optimization

See [references/wechat-styles.md](references/wechat-styles.md) for manual style reference when markdown-nice is unavailable.

### 3. QR Code Login

```bash
# Open WeChat MP platform
agent-browser --headed open "https://mp.weixin.qq.com/"
agent-browser wait --load networkidle

# Screenshot the QR code for the user to scan
agent-browser screenshot /tmp/wechat-qr.png
```

**Show the screenshot to the user** and ask them to scan with WeChat. Then wait:

```bash
# Wait for login redirect (up to 120s)
agent-browser wait --url "**/cgi-bin/home**" --timeout 120000

# Save session for reuse
agent-browser state save .temp/wechat-auth-state.json
```

### 4. Upload Images to WeChat CDN

For each image that needs to appear in the article:

```bash
# Navigate to media library
agent-browser open "https://mp.weixin.qq.com/cgi-bin/filepage?type=2&begin=0&count=12"
agent-browser wait --load networkidle
agent-browser snapshot -i

# Click upload button, use file chooser
agent-browser click @upload_btn
agent-browser file <image-path>
agent-browser wait --load networkidle

# Extract the CDN URL from the newly uploaded item
agent-browser snapshot -i
agent-browser get text @first_media_item
```

Replace image `src` attributes in the HTML with WeChat CDN URLs.

### 5. Create Article in Editor

```bash
# Open the article editor
agent-browser open "https://mp.weixin.qq.com/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=77"
agent-browser wait --load networkidle
agent-browser snapshot -i

# Fill title
agent-browser fill @title_input "<article-title>"

# Fill author
agent-browser fill @author_input "Marvin Zhang"

# Inject HTML content into the rich text editor
agent-browser execute "document.querySelector('#edui_editor').innerHTML = arguments[0]" "<html-content>"

# Set cover image (upload from local file)
agent-browser click @cover_upload_btn
agent-browser file <cover-image-path>
agent-browser wait --load networkidle

# Fill digest/summary
agent-browser fill @digest_input "<article-summary>"

# Save as draft
agent-browser click @save_btn
agent-browser wait 3000
agent-browser screenshot /tmp/wechat-saved.png
```

Show the final screenshot to confirm success.

## Important Notes

### Selector Discovery

WeChat MP's DOM changes frequently. **Always snapshot before interacting**:

```bash
agent-browser snapshot -i  # Discover current refs
```

Never assume fixed refs — re-snapshot after every navigation or DOM change.

### Rich Text Editor Injection

WeChat uses a custom contentEditable editor. Two approaches:

1. **Direct innerHTML** (preferred): Inject via `agent-browser execute`
2. **Clipboard fallback**: If innerHTML fails, copy HTML to clipboard and paste:
   ```bash
   agent-browser press Control+a
   agent-browser press Control+v
   ```

### Session Reuse

Save and restore login state to avoid repeated QR scans:

```bash
# Check for saved state first
agent-browser state load .temp/wechat-auth-state.json
agent-browser open "https://mp.weixin.qq.com/cgi-bin/home"
# If redirected to login → state expired → re-scan QR
```

### Safety: Draft First

**Always save as draft first**, never publish directly. Show the user a screenshot of the draft preview and ask for confirmation before publishing.

### Publish (After User Confirmation)

```bash
agent-browser click @publish_btn
agent-browser wait --load networkidle

# Publishing requires a second QR scan for confirmation
agent-browser screenshot /tmp/wechat-publish-qr.png
# Show to user, wait for scan
agent-browser wait --url "**/success**" --timeout 120000
```

## Deep-Dive Documentation

| Reference | When to Use |
|-----------|-------------|
| [references/wechat-styles.md](references/wechat-styles.md) | WeChat-compatible HTML/CSS inline styles |
| [references/mp-editor.md](references/mp-editor.md) | WeChat MP editor DOM structure, selectors, gotchas |
| [references/qr-login.md](references/qr-login.md) | QR code login flow details, session persistence |

## Ready-to-Use Template

| Template | Description |
|----------|-------------|
| [templates/wechat-publish.sh](templates/wechat-publish.sh) | Full end-to-end publish script |

## Troubleshooting

| Problem | Solution |
|---------|----------|
| QR code not visible | Use `--headed` mode; ensure `agent-browser screenshot` captures the login area |
| Login state expired | Delete `.temp/wechat-auth-state.json`, re-scan |
| Editor content empty after inject | Use clipboard paste fallback instead of innerHTML |
| Images not loading in preview | Ensure using absolute URLs (`https://marvinzhang.dev/img/...`) |
| "Confirm identity" prompt | WeChat sometimes requires a second QR scan — screenshot and show to user |
