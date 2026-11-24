"""Generate figure HTMLs (zh) for the Chief PM post. Canvas 760px:
phone floor 7.4px -> min font 16px; desktop ceiling 18.5px -> max 19px; title <= 28px."""
import math, pathlib

HERE = pathlib.Path(__file__).parent
W = 760
INNER = W - 2 * 44

HEAD = """<!DOCTYPE html><html lang="zh"><head><meta charset="UTF-8"/><title>{title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Noto+Sans+SC:wght@400;500;700&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet"/>
<style>
:root{--ink:#1f1f1f;--soft:#525252;--faint:#7a7a7a;--line:#e0e0e0;--canvas:#fafafa;
--blue:#01579b;--bluef:#e1f5fe;--red:#c62828;--redf:#ffebee;--green:#2e7d32;--greenf:#e8f5e9;--purple:#7b1fa2;--purplef:#f3e5f5;--orange:#e65100;--orangef:#fff3e0;}
*{box-sizing:border-box}html,body{margin:0;padding:0;background:#fff}
body{font-family:'Inter','Noto Sans SC',sans-serif;color:var(--ink);-webkit-font-smoothing:antialiased}
.canvas{width:760px;padding:40px 44px 30px;background:var(--canvas)}
.figno{font-family:'JetBrains Mono',monospace;font-size:16px;letter-spacing:.06em;color:var(--faint)}
h1{font-size:28px;font-weight:700;margin:6px 0 0;line-height:1.3}
.sub{font-size:17px;color:var(--soft);margin-top:8px;line-height:1.5}
.panel{margin-top:22px;border:1.5px solid var(--line);border-radius:12px;background:#fff;padding:16px 18px}
.panel h2{margin:0 0 4px;font-size:19px;font-weight:700}
.note{font-size:16px;color:var(--soft);line-height:1.5;margin-top:8px}
.take{margin-top:20px;padding:14px 18px;border-radius:12px;background:#fffdf0;border-left:4px solid var(--blue);font-size:17px;line-height:1.55}
.foot{margin-top:18px;border-top:1px solid var(--line);padding-top:12px;font-family:'JetBrains Mono',monospace;font-size:16px;color:var(--faint)}
svg{display:block}
{extra}
</style></head><body><div class="canvas">
"""
TAIL = "</div></body></html>\n"
PROJ = ["博客", "AWB", "Semon", "Ostrom", "Tolmap", "Eval", "Infra", "Duhem", "Kirzner"]


def fig1():
    w = INNER - 36  # panel padding
    # Panel A: star
    h = 330; cx, cy, r = w / 2, h / 2, 128
    s = [f'<svg width="{w}" height="{h}" viewBox="0 0 {w} {h}">']
    pts = []
    for i, p in enumerate(PROJ):
        a = -math.pi / 2 + 2 * math.pi * i / 9
        x, y = cx + r * math.cos(a), cy + r * math.sin(a)
        pts.append((x, y, p))
        s.append(f'<line x1="{cx}" y1="{cy}" x2="{x:.1f}" y2="{y:.1f}" stroke="#c62828" stroke-width="2.5"/>')
    for x, y, p in pts:
        s.append(f'<rect x="{x-38:.1f}" y="{y-17:.1f}" width="76" height="34" rx="8" fill="#e1f5fe" stroke="#01579b" stroke-width="1.5"/>')
        s.append(f'<text x="{x:.1f}" y="{y+6:.1f}" text-anchor="middle" font-size="16" fill="#01579b">{p}</text>')
    s.append(f'<circle cx="{cx}" cy="{cy}" r="38" fill="#ffebee" stroke="#c62828" stroke-width="2.5"/>')
    s.append(f'<text x="{cx}" y="{cy+7}" text-anchor="middle" font-size="19" font-weight="700" fill="#c62828">我</text>')
    s.append('</svg>')
    star = "".join(s)

    # Panel B: hierarchy
    h2 = 330; col = w / 9
    t = [f'<svg width="{w}" height="{h2}" viewBox="0 0 {w} {h2}">']
    t.append(f'<rect x="{w/2-150}" y="6" width="300" height="56" rx="10" fill="#ffebee" stroke="#c62828" stroke-width="2"/>')
    t.append(f'<text x="{w/2}" y="30" text-anchor="middle" font-size="19" font-weight="700" fill="#c62828">我 · S5</text>')
    t.append(f'<text x="{w/2}" y="53" text-anchor="middle" font-size="16" fill="#525252">花钱、对外发声、凭据、产品方向</text>')
    t.append(f'<line x1="{w/2}" y1="62" x2="{w/2}" y2="98" stroke="#c62828" stroke-width="2.5"/>')
    t.append(f'<rect x="{w/2-150}" y="98" width="300" height="56" rx="10" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2"/>')
    t.append(f'<text x="{w/2}" y="122" text-anchor="middle" font-size="19" font-weight="700" fill="#7b1fa2">Chief PM · S3</text>')
    t.append(f'<text x="{w/2}" y="145" text-anchor="middle" font-size="16" fill="#525252">合并、发版、技术选型、巡检</text>')
    for i, p in enumerate(PROJ):
        x = col * i + col / 2
        t.append(f'<line x1="{w/2}" y1="154" x2="{x:.1f}" y2="200" stroke="#7b1fa2" stroke-width="1.5"/>')
        t.append(f'<rect x="{x-col/2+3:.1f}" y="200" width="{col-6:.1f}" height="34" rx="7" fill="#e1f5fe" stroke="#01579b" stroke-width="1.5"/>')
        t.append(f'<text x="{x:.1f}" y="223" text-anchor="middle" font-size="16" fill="#01579b">{p}</text>')
        for k in range(3):
            wx = x - 18 + k * 18
            t.append(f'<line x1="{x:.1f}" y1="234" x2="{wx:.1f}" y2="262" stroke="#9e9e9e" stroke-width="1"/>')
            t.append(f'<circle cx="{wx:.1f}" cy="268" r="6" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1.2"/>')
    t.append(f'<text x="{w/2}" y="306" text-anchor="middle" font-size="16" fill="#2e7d32">9 个经理（S1），下面挂着约 300 个 Worker 对话</text>')
    t.append('</svg>')
    tree = "".join(t)

    body = f"""<div class="figno">图 1</div><h1>从星形到两层：日常决策交给 Chief PM</h1>
<div class="sub">同样 9 个经理，同样是 Opus 5.5。变的是谁站在中心。</div>
<div class="panel"><h2 style="color:var(--red)">之前：9 条辐条都通向我</h2>{star}
<div class="note">11 月 20 日至 23 日 17:20，81 小时里我给经理们发了<b>至少 135 条</b>消息。</div></div>
<div class="panel"><h2 style="color:var(--purple)">之后：我只管 S5，日常由 Chief PM 拍板</h2>{tree}
<div class="note">交接后的 14.7 小时里，我给 9 个经理发了 <b>4 条</b>，给 Chief PM 发了 <b>9 条</b>。</div></div>
<div class="foot">S1 / S3 / S5：Stafford Beer 可生存系统模型的层级 · 北京时间</div>"""
    return HEAD.replace("{title}", "图 1").replace("{extra}", "") + body + TAIL


def fig2():
    rows = [
        ("上任前", "81 小时", 135 / 81.33, 0.0, "≥135 条 · 每小时 ≥1.66 条"),
        ("巡检、划权责", "3.3 小时", 0.0, 3 / 3.32, "3 条 · 全部发给 Chief PM"),
        ("交接之后", "14.7 小时", 4 / 14.73, 9 / 14.73, "13 条 · 4 条给经理，9 条给 Chief PM"),
    ]
    w = INNER - 36; lab = 0; barw = w; scale = barw / 1.8
    s = []
    for name, dur, peers, cpm, txt in rows:
        a, b = peers * scale, cpm * scale
        s.append(f"""<div class="row"><div class="rl"><b>{name}</b><span>{dur}</span></div>
<svg width="{w}" height="34" viewBox="0 0 {w} 34"><rect x="0" y="4" width="{w}" height="26" rx="5" fill="#f1f1f1"/>
<rect x="0" y="4" width="{a:.1f}" height="26" fill="#c62828"/><rect x="{a:.1f}" y="4" width="{b:.1f}" height="26" fill="#7b1fa2"/></svg>
<div class="rv">{txt}</div></div>""")
    extra = """.row{margin-top:16px}.rl{display:flex;justify-content:space-between;font-size:18px;margin-bottom:4px}
.rl span{color:var(--soft);font-size:16px}.rv{font-size:16px;color:var(--soft);margin-top:4px}
.leg{display:flex;gap:22px;font-size:16px;margin-top:6px}.sw{display:inline-block;width:16px;height:16px;border-radius:3px;vertical-align:-2px;margin-right:6px}"""
    body = f"""<div class="figno">图 2</div><h1>我每小时发出的消息</h1>
<div class="sub">只数我亲手打的字，按北京时间分三段。条越长，我越像队列。</div>
<div class="panel"><div class="leg"><span><i class="sw" style="background:#c62828"></i>发给 9 个经理</span><span><i class="sw" style="background:#7b1fa2"></i>发给 Chief PM</span></div>
{''.join(s)}</div>
<div class="take">注意力从 9 条线收到了 1 条线上。两点折扣：交接后的窗口大半在夜里；回答选择题的点击没有计入。</div>
<div class="foot">数据：T3 Code 对话记录 · 2026-11-20 至 11-24</div>"""
    return HEAD.replace("{title}", "图 2").replace("{extra}", extra) + body + TAIL


def fig3():
    w = INNER - 36; h = 360; ml, mr, mt, mb = 52, 16, 16, 52
    pw, ph = w - ml - mr, h - mt - mb
    nmax, ymax = 40, 14
    X = lambda n: ml + (n / nmax) * pw
    Y = lambda v: mt + ph - (v / ymax) * ph
    def curve(k):
        return " ".join(f"{'M' if n == 1 else 'L'}{X(n):.1f},{Y(n/(1+k*n*(n-1))):.1f}" for n in range(1, nmax + 1))
    s = [f'<svg width="{w}" height="{h}" viewBox="0 0 {w} {h}">']
    for v in range(0, ymax + 1, 2):
        s.append(f'<line x1="{ml}" x2="{ml+pw}" y1="{Y(v):.1f}" y2="{Y(v):.1f}" stroke="#eee"/>')
        s.append(f'<text x="{ml-8}" y="{Y(v)+5:.1f}" text-anchor="end" font-size="16" fill="#7a7a7a">{v}</text>')
    for n in (1, 10, 20, 30, 40):
        s.append(f'<text x="{X(n):.1f}" y="{mt+ph+24}" text-anchor="middle" font-size="16" fill="#7a7a7a">{n}</text>')
    s.append(f'<text x="{ml+pw/2}" y="{h-4}" text-anchor="middle" font-size="16" fill="#525252">直接下属数 N</text>')
    for k, col, nstar in ((0.0146, "#c62828", math.sqrt(1/0.0146)), (0.00146, "#2e7d32", math.sqrt(1/0.00146))):
        s.append(f'<path d="{curve(k)}" fill="none" stroke="{col}" stroke-width="3"/>')
        peak = nstar / (1 + k * nstar * (nstar - 1))
        s.append(f'<line x1="{X(nstar):.1f}" x2="{X(nstar):.1f}" y1="{Y(peak):.1f}" y2="{Y(0):.1f}" stroke="{col}" stroke-dasharray="4 4"/>')
        s.append(f'<circle cx="{X(nstar):.1f}" cy="{Y(peak):.1f}" r="5" fill="{col}"/>')
    s.append(f'<text x="{X(8.3)+8:.1f}" y="{Y(4.3)-10:.1f}" font-size="16" fill="#c62828">κ = 0.0146，N* ≈ 8</text>')
    s.append(f'<text x="{X(26.2)-6:.1f}" y="{Y(13.3)-8:.1f}" text-anchor="end" font-size="16" fill="#2e7d32">κ 降到十分之一，N* ≈ 26</text>')
    s.append('</svg>')
    body = f"""<div class="figno">图 3</div><h1>σ 接近零时，管理上限只看 κ</h1>
<div class="sub">USL 有效产出 X(N)/λ = N / (1 + κN(N−1))，取 σ = 0。</div>
<div class="panel">{''.join(s)}<div class="note">示意参数，算出来的，没有测过。κ 由项目之间的依赖决定，跟模型多聪明关系不大。</div></div>
<div class="foot">N* = √((1−σ)/κ) · κ = 0.0146 沿用 7 月文章的示意参数</div>"""
    return HEAD.replace("{title}", "图 3").replace("{extra}", "") + body + TAIL


for name, fn in (("figure-1-topology.zh.html", fig1), ("figure-2-touches.zh.html", fig2), ("figure-3-ceiling.zh.html", fig3)):
    (HERE / name).write_text(fn(), encoding="utf-8")
    print("wrote", name)
