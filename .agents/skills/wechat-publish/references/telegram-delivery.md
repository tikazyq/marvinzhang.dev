# Telegram Delivery Reference

Details for delivering WeChat-ready content via Telegram Bot API.

**Related**: [SKILL.md](../SKILL.md) for quick start, [wechat-styles.md](wechat-styles.md) for styling.

## Contents

- [Setup](#setup)
- [API Basics](#api-basics)
- [Sending Content](#sending-content)
- [Rate Limits](#rate-limits)
- [Formatting](#formatting)

## Setup

### Environment Variables

```bash
# Set in your shell profile or .env (NEVER commit these)
export TELEGRAM_BOT_TOKEN="<from @BotFather>"
export TELEGRAM_CHAT_ID="<your numeric chat ID>"
```

### Getting Your Chat ID

1. Create a bot via [@BotFather](https://t.me/BotFather) on Telegram
2. Send `/start` to your new bot
3. Call `getUpdates` to find your chat ID:
   ```bash
   curl -s "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates" | python3 -m json.tool
   ```
4. Look for `"chat": {"id": <NUMBER>}` — that's your chat ID

## API Basics

Base URL: `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/`

| Method | Purpose |
|--------|---------|
| `sendMessage` | Send text (max 4096 chars) |
| `sendPhoto` | Send image (max 10MB) |
| `sendDocument` | Send file (max 50MB) |
| `sendMediaGroup` | Send album of photos (2-10) |

## Sending Content

### Text Message

```bash
curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -F "chat_id=${TELEGRAM_CHAT_ID}" \
  --form-string "text=Your message here" \
  -F "parse_mode=HTML"
```

**Important**: Use `--form-string` (not `-F`) for text values that might start with `@` or contain special characters.

### Photo

```bash
curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto" \
  -F "chat_id=${TELEGRAM_CHAT_ID}" \
  -F "photo=@/path/to/image.png;type=image/png" \
  -F "caption=Image description"
```

### Document (File)

```bash
curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument" \
  -F "chat_id=${TELEGRAM_CHAT_ID}" \
  -F "document=@/path/to/file.md" \
  -F "caption=File description"
```

### Photo Album (Multiple Images)

```bash
# Send up to 10 photos as an album
curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMediaGroup" \
  -F "chat_id=${TELEGRAM_CHAT_ID}" \
  -F "media=[{\"type\":\"photo\",\"media\":\"attach://photo1\"},{\"type\":\"photo\",\"media\":\"attach://photo2\"}]" \
  -F "photo1=@/path/to/image1.png" \
  -F "photo2=@/path/to/image2.png"
```

## Rate Limits

- Max 30 messages per second to the same chat
- Max 20 messages per minute to the same group
- Add `sleep 1` between batch sends to be safe

## Formatting

### Supported HTML Tags (parse_mode=HTML)

```html
<b>bold</b>
<i>italic</i>
<code>inline code</code>
<pre>code block</pre>
<pre><code class="language-python">highlighted code</code></pre>
<a href="url">link</a>
<s>strikethrough</s>
<u>underline</u>
<blockquote>quote</blockquote>
```

### Chunking Long Messages

Telegram limits messages to 4096 characters. For long articles, split by sections:

```bash
# Split markdown by ## headings and send each section
awk '/^## /{if(buf)print buf; buf=$0; next}{buf=buf"\n"$0}END{print buf}' article.md | \
while IFS= read -r -d '' section; do
  curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
    -F "chat_id=${TELEGRAM_CHAT_ID}" \
    --form-string "text=${section}"
  sleep 1
done
```
