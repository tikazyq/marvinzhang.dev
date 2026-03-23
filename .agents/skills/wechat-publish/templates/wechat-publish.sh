#!/bin/bash
# Template: WeChat Publishing via Telegram Delivery
# Purpose: Generate WeChat-ready content and deliver to user's phone via Telegram
# Usage: ./wechat-publish.sh <article-slug> [--zh|--en]
#
# Environment variables (required):
#   TELEGRAM_BOT_TOKEN - Bot token from @BotFather
#   TELEGRAM_CHAT_ID   - User's numeric chat ID
#
# Workflow:
#   1. Generate WeChat markdown via pnpm wechat
#   2. Send images to Telegram
#   3. Send markdown content to Telegram
#   4. User copies into 公众号助手 app

set -euo pipefail

SLUG="${1:?Usage: $0 <article-slug> [--zh|--en]}"
LOCALE="zh"
: "${TELEGRAM_BOT_TOKEN:?Set TELEGRAM_BOT_TOKEN environment variable}"
: "${TELEGRAM_CHAT_ID:?Set TELEGRAM_CHAT_ID environment variable}"

TG_API="https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}"

# Parse args
for arg in "$@"; do
    case $arg in
        --en) LOCALE="en" ;;
        --zh) LOCALE="zh" ;;
    esac
done

echo "=== WeChat Publishing: $SLUG ($LOCALE) ==="

# ================================================================
# STEP 1: Generate WeChat-ready markdown
# ================================================================
echo "[1/3] Generating WeChat markdown..."
pnpm wechat "$SLUG" --"$LOCALE" --force

# Find the generated markdown
WECHAT_MD=$(find .temp/wechat -name "*${SLUG}*${LOCALE}*wechat.md" 2>/dev/null | head -1)
if [[ -z "$WECHAT_MD" ]]; then
    echo "ERROR: Could not find generated WeChat markdown for $SLUG"
    exit 1
fi
echo "  Found: $WECHAT_MD"

# Extract title from first H1
TITLE=$(grep -m1 '^# ' "$WECHAT_MD" | sed 's/^# //')
echo "  Title: $TITLE"

# ================================================================
# STEP 2: Send images to Telegram
# ================================================================
echo "[2/3] Sending images to Telegram..."

IMG_DIR=".temp/wechat/images"
if [[ -d "$IMG_DIR" ]]; then
    for img in "$IMG_DIR"/*.png; do
        [[ -f "$img" ]] || continue
        echo "  Sending: $(basename "$img")"
        curl -s -X POST "${TG_API}/sendPhoto" \
            -F "chat_id=${TELEGRAM_CHAT_ID}" \
            -F "photo=@${img};type=image/png" \
            -F "caption=$(basename "$img")" > /dev/null
        sleep 1
    done
fi

# Also check for wechat-specific images
WECHAT_IMG_DIR="static/img/blog/${SLUG}/wechat"
if [[ -d "$WECHAT_IMG_DIR" ]]; then
    for img in "$WECHAT_IMG_DIR"/*.png; do
        [[ -f "$img" ]] || continue
        echo "  Sending: $(basename "$img")"
        curl -s -X POST "${TG_API}/sendPhoto" \
            -F "chat_id=${TELEGRAM_CHAT_ID}" \
            -F "photo=@${img};type=image/png" \
            -F "caption=$(basename "$img")" > /dev/null
        sleep 1
    done
fi

# ================================================================
# STEP 3: Send content to Telegram
# ================================================================
echo "[3/3] Sending content to Telegram..."

# Send instructions
curl -s -X POST "${TG_API}/sendMessage" \
    -F "chat_id=${TELEGRAM_CHAT_ID}" \
    --form-string "text=📝 WeChat 发布就绪

标题：${TITLE}
作者：Marvin Zhang

步骤：
1. 打开公众号助手 → 新建图文
2. 填写标题和作者
3. 打开下方 Markdown 文件
4. 用 markdown-nice 渲染后复制粘贴
5. 插入上方图片
6. 预览 → 发布" > /dev/null

# Send markdown file as document
curl -s -X POST "${TG_API}/sendDocument" \
    -F "chat_id=${TELEGRAM_CHAT_ID}" \
    -F "document=@${WECHAT_MD}" \
    -F "caption=Markdown 源文件 - 用 markdown-nice 渲染" > /dev/null

echo ""
echo "=== Done! Check Telegram for content ==="
