# WeChat MP QR Code Login

Detailed reference for the QR code scanning login flow on `mp.weixin.qq.com`.

**Related**: [mp-editor.md](mp-editor.md) for editor interaction, [SKILL.md](../SKILL.md) for quick start.

## Contents

- [Login Flow Overview](#login-flow-overview)
- [QR Code Capture](#qr-code-capture)
- [Waiting for Scan](#waiting-for-scan)
- [Session Persistence](#session-persistence)
- [Session Restoration](#session-restoration)
- [Publish Confirmation QR](#publish-confirmation-qr)
- [Troubleshooting](#troubleshooting)

## Login Flow Overview

```
mp.weixin.qq.com → QR code displayed → User scans with WeChat app
                                      → Confirm on phone
                                      → Redirect to /cgi-bin/home
```

WeChat MP does **not** support username/password login — QR scan is the only method.

## QR Code Capture

```bash
# Use --headed so the browser is visible (helpful for debugging)
agent-browser --headed open "https://mp.weixin.qq.com/"
agent-browser wait --load networkidle

# Take a screenshot of the full page (QR is prominently displayed)
agent-browser screenshot /tmp/wechat-qr.png

# Alternative: scope to just the QR area
agent-browser snapshot -i
# Find the QR image element ref
agent-browser screenshot /tmp/wechat-qr-focused.png -s ".login__type__container__scan__qrcode"
```

After taking the screenshot, **show it to the user** using the Read tool on the screenshot file. The user scans with their WeChat mobile app.

## Waiting for Scan

After showing the QR code, wait for the redirect:

```bash
# Wait up to 120 seconds for login to complete
agent-browser wait --url "**/cgi-bin/home**" --timeout 120000
```

### QR Code Expiry

The QR code expires after approximately **5 minutes**. If expired:

```bash
# Refresh to get a new QR code
agent-browser open "https://mp.weixin.qq.com/"
agent-browser wait --load networkidle
agent-browser screenshot /tmp/wechat-qr-new.png
# Show new QR to user
```

### Verifying Login Success

```bash
# Check current URL
agent-browser get url
# Should contain: /cgi-bin/home

# Verify by checking for dashboard elements
agent-browser snapshot -i
# Should show account name, menu items, etc.
```

## Session Persistence

Save the authenticated session immediately after login:

```bash
agent-browser state save .temp/wechat-auth-state.json
```

**Security notes:**
- The state file contains session cookies — never commit it to git
- `.temp/` is already in `.gitignore`
- Session typically lasts 4-8 hours before expiring

## Session Restoration

Before initiating a new QR login, try restoring a saved session:

```bash
# Check if state file exists
# If yes, try loading it:
agent-browser state load .temp/wechat-auth-state.json
agent-browser open "https://mp.weixin.qq.com/cgi-bin/home"
agent-browser wait --load networkidle

# Check if we're on the dashboard or redirected to login
agent-browser get url
```

Decision logic:
- URL contains `/cgi-bin/home` → Session valid, proceed
- URL is `mp.weixin.qq.com` (root) or contains login elements → Session expired, re-scan

```bash
# Full restoration flow
STATE=".temp/wechat-auth-state.json"

if [ -f "$STATE" ]; then
    agent-browser state load "$STATE"
    agent-browser open "https://mp.weixin.qq.com/cgi-bin/home"
    agent-browser wait --load networkidle
    URL=$(agent-browser get url)

    if echo "$URL" | grep -q "cgi-bin/home"; then
        echo "Session restored"
    else
        echo "Session expired, need QR scan"
        rm -f "$STATE"
        # ... QR login flow ...
    fi
else
    echo "No saved session, need QR scan"
    # ... QR login flow ...
fi
```

## Publish Confirmation QR

When publishing (群发/发表), WeChat requires a **second QR scan** to confirm:

```bash
# After clicking publish button
agent-browser click @publish_btn
agent-browser wait --load networkidle

# A modal/dialog appears with a new QR code
agent-browser snapshot -i
agent-browser screenshot /tmp/wechat-publish-qr.png

# Show to user for second scan
# "Please scan this QR code to confirm publishing"

# Wait for publish confirmation
agent-browser wait 120000  # Wait for user to scan
agent-browser snapshot -i  # Check for success message
```

## Troubleshooting

| Symptom | Cause | Solution |
|---------|-------|----------|
| QR code is blank/missing | Page not fully loaded | Add `agent-browser wait --load networkidle` before screenshot |
| QR expired before scan | Took too long | Refresh page to get new QR |
| Scan succeeds but page doesn't redirect | JavaScript not executing | Use `--headed` mode; check for popup blockers |
| "此操作需要验证身份" after idle | Session partial expiry | Full re-login required — delete state file |
| Multiple QR scans required | WeChat security policy | Normal for publish; capture each QR and show to user |
| Redirected to mobile verification | New device/IP detected | User must verify on phone first; then retry |
