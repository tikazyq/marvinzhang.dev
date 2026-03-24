---
name: wechat-publish
description: Automated publishing of blog articles to WeChat Official Account (微信公众号). Generates WeChat-ready markdown, converts to styled content, and delivers via Telegram for easy copy-paste into 公众号助手 app. Triggers include "publish to WeChat", "发布到微信", "微信公众号发布", "wechat publish".
allowed-tools: Bash(pnpm wechat*), Bash(curl*api.telegram.org*)
metadata:
  author: marvinzhang
  version: "2.0"
  tier: workflow
---

# WeChat Publish

Generates WeChat-ready content and delivers it via Telegram for publishing through the 公众号助手 app.

## End-to-End Workflow

```
pnpm wechat <slug> --zh          ← Step 1: Generate markdown + images
        ↓
Convert MD → styled content      ← Step 2: Apply WeChat formatting
        ↓
Telegram: send content + images   ← Step 3: Deliver to user's phone
        ↓
User: 公众号助手 → paste → publish ← Step 4: User publishes on mobile
```

## Environment Variables

```bash
TELEGRAM_BOT_TOKEN   # Bot token from @BotFather
TELEGRAM_CHAT_ID     # User's numeric chat ID (from @userinfobot)
```

## Quick Start

When the user says "publish X to WeChat" or "发布 X 到微信公众号":

### 1. Generate WeChat-Ready Content

```bash
pnpm wechat <article-slug> --zh --force
```

Output:
- WeChat markdown: `.temp/wechat/<slug>-zh-wechat.md`
- Diagram PNGs: `static/img/blog/<slug>/wechat/*.png`
- JSX screenshots: `static/img/blog/<slug>/wechat/*.png`

### 2. Prepare Content for Mobile

Read the generated markdown and prepare it for the user:

1. **Extract metadata** from the markdown frontmatter: title, author, tags
2. **Extract article summary** (first 120 chars or custom digest)
3. **Identify all images** that need to be sent separately
4. **Split content** into chunks if it exceeds Telegram's 4096-char message limit

### 3. Send via Telegram

Send the content to the user in a structured sequence:

```bash
# Send article metadata first
curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -F "chat_id=${TELEGRAM_CHAT_ID}" \
  --form-string "text=📝 WeChat 发布就绪

标题：<title>
作者：Marvin Zhang
摘要：<digest>

请按以下步骤操作：
1. 打开公众号助手 app
2. 点击 + 新建图文
3. 填写标题和作者
4. 逐条复制下方内容粘贴到编辑器
5. 保存图片到相册后插入文章" \
  -F "parse_mode=HTML"

# Send images (each as a separate photo message)
for img in .temp/wechat/images/*.png; do
  curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto" \
    -F "chat_id=${TELEGRAM_CHAT_ID}" \
    -F "photo=@${img}" \
    -F "caption=$(basename $img)"
done

# Send article content (split into chunks if needed)
curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -F "chat_id=${TELEGRAM_CHAT_ID}" \
  --form-string "text=<article-content-chunk>" \
  -F "parse_mode=HTML"

# Send markdown file as document (for copy-paste)
curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument" \
  -F "chat_id=${TELEGRAM_CHAT_ID}" \
  -F "document=@.temp/wechat/<slug>-zh-wechat.md" \
  -F "caption=完整 Markdown 文件 - 可在 markdown-nice 中渲染后复制"
```

### 4. User Publishes via 公众号助手

User workflow on mobile:
1. Save images from Telegram to photo album
2. Open 公众号助手 app → New article (新建图文)
3. Set title and author
4. Paste content into editor (or use markdown-nice to render first)
5. Insert images from photo album
6. Set cover image
7. Preview → Publish

## HTML Rendering Methods

Two methods are available for converting WeChat markdown to styled HTML:

### Method A: Custom Renderer (Recommended)

Uses `scripts/generate-wechat-html.js` with `marked` library. Full control over all inline styles.

```bash
node scripts/generate-wechat-html.js <slug>
# Output: static/wechat/<slug>.html
```

- Styles defined in the script's `S` object (matches `references/wechat-styles.md`)
- Tables, headings, spacing all fully customizable
- Send the output HTML file via Telegram for copy-paste into 公众号助手

### Method B: md2weixin-core (Theme-based)

Uses `md2weixin-core` npm package with pre-built themes (e.g., `quanzhanlan`).

```js
const { getHtml } = require('md2weixin-core');
const html = await getHtml({ markdown, theme: 'quanzhanlan', font: 'cx' });
```

- Faster setup, nice themes out of the box
- **Limitation**: Theme CSS overrides element styles (margins, padding) — cannot be controlled via markdown
- **Known issue**: `<h3>` has `margin-bottom: 20px` creating excessive gap before tables — requires HTML post-processing after `getHtml()` returns (see `references/wechat-styles.md` > Tables > Known Issues)
- Requires post-processing for production-quality output

### Method C: markdown-nice Mini Program

1. Send the markdown file via Telegram
2. User opens markdown-nice 微信小程序
3. Paste markdown → auto-renders with WeChat styles
4. One-tap copy → paste into 公众号助手

## Telegram API Helpers

### Send Text (with chunking)

```bash
send_telegram_text() {
  local text="$1"
  local max_len=4096

  if [ ${#text} -le $max_len ]; then
    curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
      -F "chat_id=${TELEGRAM_CHAT_ID}" \
      --form-string "text=${text}"
  else
    # Split by double newlines, send in chunks
    echo "$text" | fold -s -w $max_len | while IFS= read -r chunk; do
      curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
        -F "chat_id=${TELEGRAM_CHAT_ID}" \
        --form-string "text=${chunk}"
      sleep 1  # Rate limit
    done
  fi
}
```

### Send Image

```bash
send_telegram_photo() {
  local path="$1"
  local caption="$2"
  curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto" \
    -F "chat_id=${TELEGRAM_CHAT_ID}" \
    -F "photo=@${path}" \
    -F "caption=${caption}"
}
```

### Send Document

```bash
send_telegram_doc() {
  local path="$1"
  local caption="$2"
  curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument" \
    -F "chat_id=${TELEGRAM_CHAT_ID}" \
    -F "document=@${path}" \
    -F "caption=${caption}"
}
```

## Deep-Dive Documentation

| Reference | When to Use |
|-----------|-------------|
| [references/wechat-styles.md](references/wechat-styles.md) | WeChat-compatible HTML/CSS inline styles (for manual rendering) |
| [references/telegram-delivery.md](references/telegram-delivery.md) | Telegram Bot API details, rate limits, formatting |

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Telegram `chat not found` | Use numeric chat ID, not @username. Send `/start` to bot first |
| `chat_id=@xxx` curl error | Use `--form-string` for values starting with `@` |
| Message too long | Split into chunks ≤4096 chars |
| Images not sending | Check file path; max 10MB per photo |
| Content formatting lost in paste | Use markdown-nice mini program for rendering |
| 公众号助手 paste loses styles | Paste rendered HTML (from markdown-nice), not raw markdown |
| Table spacing/gap issues (md2weixin-core) | Theme CSS adds margins to headings before tables. Post-process HTML to reduce `margin-bottom` on `<h3>` preceding `<table>`. See `references/wechat-styles.md` > Tables > Known Issues |
| Table styles not matching design | Use Method A (custom renderer) for full style control instead of md2weixin-core themes |

## Future: API-Based Publishing

If the account is upgraded to a verified subscription or service account, the full API workflow becomes available:

```bash
# 1. Get access_token
curl "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}"

# 2. Upload image
curl -F "media=@image.png" "https://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token=${TOKEN}"

# 3. Create draft
curl -H "Content-Type: application/json" -d '{"articles":[...]}' \
  "https://api.weixin.qq.com/cgi-bin/draft/add?access_token=${TOKEN}"

# 4. Publish
curl -H "Content-Type: application/json" -d '{"media_id":"..."}' \
  "https://api.weixin.qq.com/cgi-bin/freepublish/submit?access_token=${TOKEN}"
```

See [WeChat Draft API docs](https://developers.weixin.qq.com/doc/subscription/api/draftbox/draftmanage/api_draft_add.html) for details.
