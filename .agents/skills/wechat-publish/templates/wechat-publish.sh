#!/bin/bash
# Template: WeChat Official Account End-to-End Publishing
# Purpose: Generate WeChat-ready content, login via QR, and publish
# Usage: ./wechat-publish.sh <article-slug> [--zh|--en] [--publish]
#
# Prerequisites:
#   - agent-browser installed and available
#   - pnpm wechat script configured
#   - markdown-nice running locally (for MD→HTML rendering)
#
# Workflow:
#   1. Generate WeChat markdown via pnpm wechat
#   2. Render MD→HTML via markdown-nice
#   3. Login to mp.weixin.qq.com via QR scan
#   4. Create article with rendered content
#   5. Save as draft (or publish with --publish flag)

set -euo pipefail

SLUG="${1:?Usage: $0 <article-slug> [--zh|--en] [--publish]}"
LOCALE="zh"
PUBLISH=false
STATE_FILE=".temp/wechat-auth-state.json"
QR_SCREENSHOT="/tmp/wechat-qr.png"

# Parse args
for arg in "$@"; do
    case $arg in
        --en) LOCALE="en" ;;
        --zh) LOCALE="zh" ;;
        --publish) PUBLISH=true ;;
    esac
done

echo "=== WeChat Publishing: $SLUG ($LOCALE) ==="

# ================================================================
# STEP 1: Generate WeChat-ready markdown
# ================================================================
echo "[1/5] Generating WeChat markdown..."
pnpm wechat "$SLUG" --"$LOCALE" --force

# Find the generated markdown
WECHAT_MD=$(find .temp/wechat -name "*${SLUG}*${LOCALE}*wechat.md" 2>/dev/null | head -1)
if [[ -z "$WECHAT_MD" ]]; then
    # Try specs directory
    WECHAT_MD=$(find specs -name "wechat-${LOCALE}.md" -path "*${SLUG}*" 2>/dev/null | head -1)
fi

if [[ -z "$WECHAT_MD" ]]; then
    echo "ERROR: Could not find generated WeChat markdown for $SLUG"
    exit 1
fi
echo "  Found: $WECHAT_MD"

# ================================================================
# STEP 2: Render MD→HTML via markdown-nice
# ================================================================
echo "[2/5] Rendering MD→HTML via markdown-nice..."
# TODO: Integrate with local markdown-nice instance
# For now, the HTML conversion will be done by Claude during execution
WECHAT_HTML=".temp/wechat/${SLUG}-${LOCALE}-wechat.html"
echo "  HTML output: $WECHAT_HTML"

# ================================================================
# STEP 3: Login to WeChat MP
# ================================================================
echo "[3/5] Logging in to WeChat MP..."

if [[ -f "$STATE_FILE" ]]; then
    echo "  Trying saved session..."
    agent-browser state load "$STATE_FILE"
    agent-browser open "https://mp.weixin.qq.com/cgi-bin/home"
    agent-browser wait --load networkidle

    URL=$(agent-browser get url)
    if echo "$URL" | grep -q "cgi-bin/home"; then
        echo "  Session restored successfully"
    else
        echo "  Session expired, need QR scan"
        rm -f "$STATE_FILE"
        # Fall through to QR login
    fi
fi

if [[ ! -f "$STATE_FILE" ]]; then
    agent-browser --headed open "https://mp.weixin.qq.com/"
    agent-browser wait --load networkidle
    agent-browser screenshot "$QR_SCREENSHOT"

    echo ""
    echo "  ================================================"
    echo "  Please scan the QR code to login:"
    echo "  Screenshot saved to: $QR_SCREENSHOT"
    echo "  ================================================"
    echo ""

    # Wait for login (up to 120 seconds)
    agent-browser wait --url "**/cgi-bin/home**" --timeout 120000
    agent-browser state save "$STATE_FILE"
    echo "  Login successful, session saved"
fi

# ================================================================
# STEP 4: Create article
# ================================================================
echo "[4/5] Creating article in WeChat editor..."

agent-browser open "https://mp.weixin.qq.com/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=77"
agent-browser wait --load networkidle
agent-browser snapshot -i

# TODO: Fill title, author, content, cover image
# These steps require dynamic ref discovery via snapshot
echo "  Editor opened — fill content via agent-browser commands"

# ================================================================
# STEP 5: Save or publish
# ================================================================
if [[ "$PUBLISH" == true ]]; then
    echo "[5/5] Publishing article..."
    echo "  WARNING: Publishing requires a second QR scan for confirmation"
else
    echo "[5/5] Saving as draft..."
    echo "  To publish later, use --publish flag or publish from WeChat dashboard"
fi

echo ""
echo "=== Done ==="
