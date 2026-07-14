---
name: wechat-publish
description: Automated publishing of blog articles to WeChat Official Account (微信公众号). Generates WeChat-ready markdown, converts to styled content, and delivers the bundle directly in the Claude chat for copy-paste into 公众号助手 / 公众号后台. Triggers include "publish to WeChat", "发布到微信", "微信公众号发布", "wechat publish".
allowed-tools: Bash(pnpm wechat*)
metadata:
  author: marvinzhang
  version: "2.0"
  tier: workflow
---

# WeChat Publish

Generates WeChat-ready content and delivers it directly in the Claude chat for publishing through 公众号助手 or the 公众号 web editor.

## End-to-End Workflow

```
pnpm wechat <slug> --zh          ← Step 1: Generate markdown + images
        ↓
Convert MD → styled content      ← Step 2: Apply WeChat formatting
        ↓
Send files in the Claude chat     ← Step 3: HTML + md + screenshots + covers + digest
        ↓
User: 公众号助手 → paste → publish ← Step 4: User publishes
```

## Delivery Channel

**Chat-direct is the canonical channel (author decision 2026-07): send the
bundle as files in the Claude conversation** — rendered HTML first (it is
the paste source, viewable inline), then the markdown, component
screenshots, covers, and the digest as message text. Do NOT use Telegram;
that path is deprecated (see Legacy section at the end).

## Per-Article Checklist (codified 2026-07)

Run through these in order — each item came from a real publishing round:

1. **Timing gate**: the article's images are referenced by
   `https://www.marvinzhang.dev/...` URLs. The article PR must be **merged
   and production-deployed** before the user pastes into 公众号 — otherwise
   WeChat's image importer gets 404s.
2. **Interactive JSX components need a screenshot config.** Before running
   `pnpm wechat`, add the article's components to `COMPONENT_CONFIGS` in
   `scripts/screenshot-jsx-components.js`. CSS-module components use the
   `cssSelector` path (e.g. `{ name: 'ScaleCurveWidget', cssSelector:
   '[class*="widget"]' }`). The script needs a fresh `pnpm build`, hides the
   fixed navbar before capture, and prefers the environment Chromium.
   Visually verify the PNG: full component, no chrome overlap.
3. **Adapt interactive prose for the static channel.** Lead-ins like
   "拖动滑杆" are wrong under a screenshot. Edit `wechat-zh.md` AFTER the
   final `wechat.js` run (it regenerates and would overwrite), rewording to
   "下图是交互小工具的截图……点文末'阅读原文'即可体验", then re-run ONLY
   `node scripts/generate-wechat-html.js <slug>`.
4. **Cover + digest are part of the deliverable.**
   - Cover: 2.35:1 main (900×383) + optional 1:1 small. Two routes: (a)
     code-drawn via the article's figures pipeline; (b) — author's current
     preference — write text-to-image prompts and hand off to an external
     model. T2I prompts must request **no embedded text** (CJK text renders
     garbled), leave the left third empty for a later title overlay, and
     specify `--ar 21:9` (crop to 2.35:1) plus a 1:1 variant.
   - Digest: ≤120 chars, hook-first, no symbols the reader hasn't met.
5. **Delivery**: send the bundle as files in the Claude chat — HTML
   first (paste source), then markdown, component screenshots, covers;
   digest goes in the message text. Telegram is deprecated — do not use it
   even if credentials exist.
6. **Post-publish**: user sends back the permanent
   `https://mp.weixin.qq.com/s/...` link → add `wechat_url` to BOTH locale
   MDX frontmatters, then archive the drafts workspace to `drafts/archive/`.

## Quick Start

When the user says "publish X to WeChat" or "发布 X 到微信公众号":

### 1. Generate WeChat-Ready Content

```bash
pnpm wechat <article-slug> --zh --force
```

Output:
- WeChat markdown: `drafts/<date>-<slug>/wechat-zh.md` if a draft workspace exists,
  plus a copy in `.temp/wechat/<slug>-zh-wechat.md`
- Rendered HTML (Method A, auto-generated): `static/wechat/<slug>.html`
- Diagram PNGs: `static/img/blog/<slug>/wechat/*.png`
- JSX screenshots: `static/img/blog/<slug>/wechat/*.png`

The generator already handles WeChat's rendering traps — do NOT hand-fix these
in the output; if one regresses, fix the scripts:
- In-text links become link-blue labels (`<span class="wx-ref">`, styled inline
  by `generate-wechat-html.js`) + `<sup>[n]</sup>` markers, with a matching
  `[n] Title` + URL references section appended (`scripts/wechat.js`)
- Bold markers are normalized pair-safely (`**text **` → `**text**`) before
  rendering (`scripts/generate-wechat-html.js: fixBoldMarkers`)
- Code blocks scroll horizontally on long lines (`overflow-x:auto` on pre,
  `nowrap` on code) — mid-token wrapping reads badly on phones
- Code blocks are syntax-highlighted with inline-styled spans (Prism oneDark
  via prism-react-renderer) — WeChat strips classes/CSS, so highlighting must
  be inline. bash/csharp aren't in the vendored Prism build and fall back to
  plain text (`scripts/generate-wechat-html.js`)
- Inside code blocks, newlines are baked in as `<br/>` and spaces as `&nbsp;`
  — WeChat's paste sanitizer collapses raw whitespace text nodes between
  spans, gluing all code onto one line (`hardenCodeWhitespace`)
- `<a>` tags are emitted ONLY for WeChat-internal (`mp.weixin.qq.com`) links —
  WeChat rejects anchors pointing outside WeChat. External links render as
  link-blue text + footnote; raw URLs stay plain copyable text
  (`scripts/generate-wechat-html.js`)
- Blog cross-references become clickable WeChat-internal links when the target
  article declares its permanent 公众号 URL in MDX frontmatter as
  `wechat_url: https://mp.weixin.qq.com/s/...` (zh version preferred);
  articles without one degrade to footnotes. After publishing an article on
  公众号, add `wechat_url` to its frontmatter so future articles can link to
  it — permanent short links only, signed search URLs expire

### 2. Prepare Content for Mobile

Read the generated markdown and prepare it for the user:

1. **Extract metadata** from the markdown frontmatter: title, author, tags
2. **Extract article summary** (first 120 chars or custom digest)
3. **Identify all images** that need to be sent separately
4. **Split content** into chunks if it exceeds Telegram's 4096-char message limit

### 3. Deliver in the Claude Chat

Send the files directly in the conversation (HTML → markdown → images), with the digest and paste instructions as message text.

### Legacy: Telegram delivery (deprecated 2026-07, do not use)

<details>
<summary>Kept for reference only</summary>

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

</details>

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

## Telegram API Helpers (deprecated 2026-07 — do not use)

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

## Rendering-Defect Response SOP (codified 2026-07)

When the author spots a rendering defect after pasting into 公众号 (usually a
phone screenshot — e.g. the ul hanging-indent bug):

1. **Reproduce in the generator's output**, not in WeChat: find the exact
   inline style/markup in `static/wechat/<slug>.html` that causes it.
2. **Fix the script, never hand-edit the artifact** — `generate-wechat-html.js`
   (styles/rendering) or `wechat.js` (markdown transforms). Add a code
   comment naming the trap.
3. **Sweep the committed historical exports**: other `static/wechat/*.html`
   files carry the same defect. Apply the identical fix as a mechanical
   string substitution (do NOT regenerate old exports — their sources may be
   archived and re-rendering risks content drift).
4. **Verify at phone width**: render the regenerated HTML at a ~390px
   viewport and screenshot the affected element. Exit codes and diffs are
   not enough for visual defects — look at the pixels.
5. **Re-deliver the corrected HTML in chat** so the author re-pastes from
   the fixed source.
6. **Close the loop in this skill**: add a row to the Troubleshooting table
   below so the defect is recognizable next time.

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Telegram `chat not found` | Use numeric chat ID, not @username. Send `/start` to bot first |
| `chat_id=@xxx` curl error | Use `--form-string` for values starting with `@` |
| Message too long | Split into chunks ≤4096 chars |
| Images not sending | Check file path; max 10MB per photo |
| Content formatting lost in paste | Use markdown-nice mini program for rendering |
| Literal `**` visible in published article | Bold delimiter has an adjacent space or a broken pair; ensure `fixBoldMarkers` in `scripts/generate-wechat-html.js` runs and consumes one balanced pair at a time (never write a regex that requires a space after the opening `**` — it will match across pairs) |
| Wrapped bullet lines flow back under the marker (no hanging indent) | `S.ul` needs non-zero `padding-left` (1.4em) with `list-style:disc outside` — `padding-left:0` puts markers in the margin and kills the hanging indent. Fixed in `generate-wechat-html.js` 2026-07; if editing list styles, re-verify at a 390px viewport |
| Long code lines wrap mid-token / read badly on phone | Code scrolls horizontally: `overflow-x:auto` + `-webkit-overflow-scrolling:touch` on `<pre>`, `white-space:nowrap` on `<code>` (see `S.pre`/`S.precode`). If a published article ever clips instead of scrolling, fall back to `pre-wrap` + `break-all` |
| Reference list shows no numbers | The `ol` style uses `padding-left: 0`, which clips native markers; emit explicit `[n]` prefixes as plain paragraphs (handled in `scripts/wechat.js`) |
| In-text reference labels look like plain prose | `wechat.js` wraps former link labels in `<span class="wx-ref">`; `generate-wechat-html.js` swaps the class for inline link-blue styles (`S.ref`/`S.sup`) since WeChat strips classes |
| Code loses line breaks when pasted into WeChat | WeChat collapses raw `\n`/space text nodes inside `<pre>`; `hardenCodeWhitespace` bakes them in as `<br/>`/`&nbsp;` — never rely on `white-space` alone |
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
