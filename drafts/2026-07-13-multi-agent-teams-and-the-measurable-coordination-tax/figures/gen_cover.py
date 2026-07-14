#!/usr/bin/env python3
"""WeChat cover images for the coordination-tax article.

Two sizes: 2.35:1 main cover (1175x500 CSS px) and 1:1 small cover (500x500).
Same visual language as the article figures (light canvas, semantic palette),
but bigger type — covers must survive thumbnail scaling.
"""
import math

def usl(N, lam, sig, kap):
    return lam * N / (1 + sig * (N - 1) + kap * N * (N - 1))

def curve_svg(w, h, pad=8):
    """USL curve vs ideal line, gold N* dot — the article's signature motif."""
    lam, sig, kap = 4.64, 0.0158, 0.0146
    ns = math.sqrt((1 - sig) / kap)
    ymax = usl(ns, lam, sig, kap) * 2.0
    def mx(N): return pad + (N - 2) / 22.0 * (w - 2 * pad)
    def my(v): return pad + (1 - v / ymax) * (h - 2 * pad)
    pts = []
    N = 2.0
    while N <= 24.001:
        pts.append(f"{mx(N):.1f},{my(usl(N, lam, sig, kap)):.1f}")
        N += 0.5
    curve = "M" + "L".join(pts)
    ideal = f"M{mx(2):.1f},{my(lam*2):.1f}L{mx(ymax/lam):.1f},{my(ymax):.1f}"
    xs, ys = mx(ns), my(usl(ns, lam, sig, kap))
    x16, y16 = mx(16), my(usl(16, lam, sig, kap))
    return f'''<svg width="{w}" height="{h}" viewBox="0 0 {w} {h}">
<path d="{ideal}" fill="none" stroke="#b6c2d2" stroke-width="3" stroke-dasharray="8 7"/>
<path d="{curve}L{mx(24):.1f},{h-pad}L{mx(2):.1f},{h-pad}Z" fill="rgba(37,99,235,0.10)"/>
<path d="{curve}" fill="none" stroke="#2563eb" stroke-width="5" stroke-linecap="round"/>
<line x1="{xs:.1f}" y1="{ys:.1f}" x2="{xs:.1f}" y2="{h-pad}" stroke="#d9930b" stroke-width="2.5" stroke-dasharray="5 4"/>
<circle cx="{xs:.1f}" cy="{ys:.1f}" r="9" fill="#d9930b"/>
<circle cx="{x16:.1f}" cy="{y16:.1f}" r="8" fill="#fff" stroke="#c62828" stroke-width="4"/>
</svg>'''

HEAD = """<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8" />
<title>{title}</title>
<link rel="stylesheet" href="fonts.css" />
<style>
  * {{ box-sizing: border-box; }}
  html, body {{ margin: 0; padding: 0; background: #fff; }}
  body {{ font-family: 'Inter', 'Noto Sans SC', sans-serif; -webkit-font-smoothing: antialiased; }}
  .canvas {{ width: {w}px; height: {h}px; background: #fafafa; position: relative; overflow: hidden;
             border-top: 10px solid #2563eb; }}
  {css}
</style>
</head>
<body>
<div class="canvas">
{body}
</div>
</body>
</html>
"""

# ------------------------------------------------ 2.35:1 main cover
main_css = """
  .txt { position: absolute; left: 56px; top: 74px; width: 560px; }
  .kicker { font-family: 'JetBrains Mono', monospace; font-size: 19px; letter-spacing: .12em;
            color: #d9930b; font-weight: 600; margin-bottom: 18px; }
  h1 { margin: 0; font-size: 64px; line-height: 1.22; font-weight: 700; color: #1f1f1f; letter-spacing: .01em; }
  h1 b { color: #2563eb; font-weight: 700; }
  .sub { margin-top: 22px; font-size: 23px; color: #525252; letter-spacing: .02em; }
  .plot { position: absolute; right: 40px; top: 60px; }
  .cap { position: absolute; right: 52px; bottom: 26px; font-family: 'JetBrains Mono', monospace;
         font-size: 15px; color: #8a8a8a; letter-spacing: .06em; }
"""
main_body = f"""
<div class="txt">
  <div class="kicker">AI AGENT × 人月神话</div>
  <h1>人多了，<br/>为什么<b>反而慢</b>？</h1>
  <div class="sub">五十年前的老曲线，agent 团队第一次把它量了出来</div>
</div>
<div class="plot">{curve_svg(500, 380)}</div>
<div class="cap">marvinzhang.dev</div>
"""

open('cover-main.zh.html', 'w').write(HEAD.format(title='封面 2.35:1', w=1175, h=500, css=main_css, body=main_body))

# ------------------------------------------------ 1:1 small cover
sq_css = """
  .plot { position: absolute; left: 30px; right: 30px; top: 42px; }
  .txt { position: absolute; left: 36px; right: 36px; bottom: 44px; text-align: center; }
  h1 { margin: 0; font-size: 44px; line-height: 1.25; font-weight: 700; color: #1f1f1f; }
  h1 b { color: #2563eb; }
"""
sq_body = f"""
<div class="plot">{curve_svg(440, 260)}</div>
<div class="txt"><h1>人多了，<br/>为什么<b>反而慢</b>？</h1></div>
"""
open('cover-square.zh.html', 'w').write(HEAD.format(title='封面 1:1', w=500, h=500, css=sq_css, body=sq_body))
print('cover HTMLs written')
