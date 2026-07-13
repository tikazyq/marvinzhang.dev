#!/usr/bin/env python3
"""Generate the 5 bilingual figures (10 HTML files) for the coordination-tax article.

Style follows the house figure template (860px canvas, semantic palette matching
the site's Mermaid colors). Fonts: local fonts.css (render-time cache) with the
Google Fonts <link> kept as fallback so the committed HTML renders anywhere.
"""

BASE_CSS = """
  :root {
    --info-fill: #e1f5fe;  --info-stroke: #01579b;
    --warn-fill: #fff3e0;  --warn-stroke: #e65100;
    --ok-fill:   #e8f5e9;  --ok-stroke:   #2e7d32;
    --hi-fill:   #f3e5f5;  --hi-stroke:   #7b1fa2;
    --err-fill:  #ffebee;  --err-stroke:  #c62828;
    --canvas: #fafafa; --ink: #1f1f1f; --ink-soft: #525252;
    --ink-faint: #8a8a8a; --line: #e0e0e0;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: #ffffff; }
  body {
    font-family: 'Inter', 'Noto Sans SC', -apple-system, BlinkMacSystemFont, sans-serif;
    color: var(--ink); -webkit-font-smoothing: antialiased;
  }
  .canvas { width: 860px; padding: 42px 44px 34px 44px; background: var(--canvas); }
  .header { margin-bottom: 26px; }
  .figno {
    font-family: 'JetBrains Mono', monospace; font-size: 13px;
    letter-spacing: 0.08em; color: var(--ink-faint); text-transform: uppercase;
  }
  h1 { font-size: 30px; font-weight: 600; margin: 6px 0 0 0; letter-spacing: -0.005em; line-height: 1.25; }
  .subtitle { font-size: 16px; color: var(--ink-soft); margin-top: 8px; line-height: 1.5; }
  .takeaway {
    margin-top: 24px; padding: 15px 20px; border-radius: 12px;
    background: #fffdf0; border-left: 4px solid var(--err-stroke);
    font-size: 15px; line-height: 1.55;
  }
  .takeaway b { color: var(--err-stroke); }
  .footer {
    margin-top: 22px; display: flex; justify-content: space-between; align-items: center;
    border-top: 1px solid var(--line); padding-top: 13px;
    font-family: 'JetBrains Mono', monospace; font-size: 11.5px;
    color: var(--ink-faint); letter-spacing: 0.06em; text-transform: uppercase;
  }
  .mono { font-family: 'JetBrains Mono', monospace; }
"""

HEAD = """<!DOCTYPE html>
<html lang="{lang}">
<head>
<meta charset="UTF-8" />
<title>{title}</title>
<link rel="stylesheet" href="fonts.css" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet" />
<style>{base_css}{extra_css}</style>
</head>
<body>
<div class="canvas">
<div class="header">
  <div class="figno">{figno}</div>
  <h1>{h1}</h1>
  <div class="subtitle">{subtitle}</div>
</div>
{body}
<div class="takeaway">{takeaway}</div>
<div class="footer"><span>{footL}</span><span>{footR}</span></div>
</div>
</body>
</html>
"""

def emit(name, lang, title, figno, h1, subtitle, body, takeaway, footL, footR, extra_css):
    html = HEAD.format(lang=lang, title=title, base_css=BASE_CSS, extra_css=extra_css,
                       figno=figno, h1=h1, subtitle=subtitle, body=body,
                       takeaway=takeaway, footL=footL, footR=footR)
    fn = f"{name}.{lang}.html"
    open(fn, "w").write(html)
    print("wrote", fn)

# ---------------------------------------------------------------- figure 1
F1_CSS = """
  .arts { display: flex; flex-direction: column; gap: 14px; }
  .art { border: 1.5px solid; border-radius: 12px; background: #fff; display: flex; }
  .art .side { width: 226px; flex: none; padding: 16px 18px; border-right: 1.5px dashed var(--line); }
  .art .side .name { font-weight: 600; font-size: 16.5px; line-height: 1.35; }
  .art .side .date { font-family: 'JetBrains Mono', monospace; font-size: 12.5px; color: var(--ink-faint); margin-top: 6px; }
  .art .fields { padding: 14px 20px; flex: 1; display: flex; flex-direction: column; gap: 7px; }
  .art .row { display: flex; font-size: 14.5px; line-height: 1.45; }
  .art .row .k {
    width: 118px; flex: none; font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase;
    color: var(--ink-faint); padding-top: 3px;
  }
  .art .row .v { flex: 1; color: var(--ink); }
  .art .row .v b { font-weight: 600; }
  .a1 { border-color: var(--info-stroke); } .a1 .side { background: #f4faff; } .a1 .name { color: var(--info-stroke); }
  .a2 { border-color: var(--warn-stroke); } .a2 .side { background: #fffaf2; } .a2 .name { color: var(--warn-stroke); }
  .a3 { border-color: var(--ok-stroke); }   .a3 .side { background: #f3faf4; } .a3 .name { color: var(--ok-stroke); }
"""

def art(cls, name, date, rows):
    rs = "".join(f'<div class="row"><div class="k">{k}</div><div class="v">{v}</div></div>' for k, v in rows)
    return f'<div class="art {cls}"><div class="side"><div class="name">{name}</div><div class="date">{date}</div></div><div class="fields">{rs}</div></div>'

f1_zh_body = '<div class="arts">' + "".join([
    art("a1", "为什么现代软件工程离不开项目管理", "2021-04", [
        ("话题", "瀑布与敏捷之争：流程如何保住交付"),
        ("当年的答案", "拥抱敏捷，但流程与计划不可少——<b>&ldquo;坏计划也好过没有计划&rdquo;</b>"),
        ("现在读来", "争的其实是：用哪种流程摊薄<b>对齐成本</b>"),
    ]),
    art("a2", "你的团队在正确实践敏捷吗", "2022-09", [
        ("话题", "&ldquo;敏捷 = 快&rdquo;是实践者最大的误区"),
        ("当年的答案", "<b>敏捷并不一定意味着快</b>，它还会引入额外工作"),
        ("现在读来", "小团队、短迭代 = 把 N 压回 N* 以内"),
    ]),
    art("a3", "为什么需要在软件项目中考虑复杂度", "2022-12", [
        ("话题", "复杂度随规模增长，失控则项目失败"),
        ("当年的答案", "用架构手段控制复杂度"),
        ("现在读来", "&ldquo;指数级&rdquo;其实是<b>平方级</b>——κN(N−1) 那一项"),
    ]),
]) + "</div>"

f1_en_body = '<div class="arts">' + "".join([
    art("a1", "Why Modern Software Engineering Needs Project Management", "2021-04", [
        ("Topic", "Waterfall vs. agile: how process protects delivery"),
        ("Answer then", "Embrace agile, but keep the plan — <b>&ldquo;a bad plan is better than no plan&rdquo;</b>"),
        ("Read today", "The real fight was over how to amortise <b>alignment cost</b>"),
    ]),
    art("a2", "Is Your Team Practising Agile Correctly?", "2022-09", [
        ("Topic", "“Agile = fast” as the practitioners’ biggest myth"),
        ("Answer then", "<b>Agile does not necessarily mean fast</b> — it adds work"),
        ("Read today", "Small teams, short iterations = pushing N back under N*"),
    ]),
    art("a3", "Why Consider Complexity in Software Projects?", "2022-12", [
        ("Topic", "Complexity grows with scale; uncontrolled, it kills projects"),
        ("Answer then", "Contain complexity through architecture"),
        ("Read today", "“Exponential” was really <b>quadratic</b> — the κN(N−1) term"),
    ]),
]) + "</div>"

emit("figure-1-archaeology", "zh", "图 1 — 三篇旧文，同一个问题", "图 01 — 站内考古",
     "三篇旧文，同一个问题", "2021–2022 年的三篇文章各写各的话题，回头看都在绕着同一个问题打转。",
     f1_zh_body,
     "三篇文章殊途同归：<b>人多了，为什么反而慢了？</b>当年只能从流程与架构上&ldquo;防&rdquo;，如今这个问题第一次可以被测量。",
     "marvinzhang.dev", "图 1 / 5", F1_CSS)

emit("figure-1-archaeology", "en", "Fig. 1 — Three old posts, one question", "FIG 01 — SITE ARCHAEOLOGY",
     "Three old posts, one question", "Three articles from 2021–2022, each on its own topic — all circling the same question in hindsight.",
     f1_en_body,
     "All three converge on one question: <b>why do more people make a team slower?</b> Back then you could only design around it; now, for the first time, it can be measured.",
     "marvinzhang.dev", "FIG 1 / 5", F1_CSS)

# ---------------------------------------------------------------- figure 2
F2_CSS = """
  .panels { display: flex; gap: 16px; }
  .panel { flex: 1; border: 1.5px solid; border-radius: 12px; background: #fff; padding: 18px 18px 14px; }
  .p-mesh { border-color: var(--err-stroke); }
  .p-star { border-color: var(--ok-stroke); }
  .panel h2 { margin: 0 0 2px; font-size: 17px; font-weight: 600; }
  .p-mesh h2 { color: var(--err-stroke); } .p-star h2 { color: var(--ok-stroke); }
  .panel .sub { font-size: 13px; color: var(--ink-soft); margin-bottom: 10px; }
  .panel svg { display: block; margin: 0 auto; }
  .stats { margin-top: 10px; display: flex; gap: 8px; }
  .stat { flex: 1; border-radius: 9px; padding: 8px 10px; text-align: center; }
  .p-mesh .stat { background: var(--err-fill); } .p-star .stat { background: var(--ok-fill); }
  .stat .num { font-family: 'JetBrains Mono', monospace; font-weight: 600; font-size: 17px; }
  .p-mesh .num { color: var(--err-stroke); } .p-star .num { color: var(--ok-stroke); }
  .stat .lab { font-size: 11.5px; color: var(--ink-soft); margin-top: 2px; line-height: 1.35; }
  .trade { margin-top: 16px; display: flex; gap: 12px; }
  .trade .cell { flex: 1; border-radius: 10px; padding: 11px 15px; font-size: 14px; line-height: 1.5; }
  .t-down { background: var(--ok-fill); border-left: 4px solid var(--ok-stroke); }
  .t-up { background: var(--warn-fill); border-left: 4px solid var(--warn-stroke); }
  .trade b.k { font-family: 'JetBrains Mono', monospace; }
"""

def mesh_svg(w=340, h=200, n=8, r=78):
    import math
    cx, cy = w/2, h/2 + 4
    pts = [(cx + r*math.cos(2*math.pi*i/n - math.pi/2), cy + r*math.sin(2*math.pi*i/n - math.pi/2)) for i in range(n)]
    lines = "".join(
        f'<line x1="{pts[i][0]:.1f}" y1="{pts[i][1]:.1f}" x2="{pts[j][0]:.1f}" y2="{pts[j][1]:.1f}" stroke="#c62828" stroke-opacity="0.38" stroke-width="1.2"/>'
        for i in range(n) for j in range(i+1, n))
    dots = "".join(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="9" fill="#ffebee" stroke="#c62828" stroke-width="2"/>' for x, y in pts)
    return f'<svg width="{w}" height="{h}" viewBox="0 0 {w} {h}">{lines}{dots}</svg>'

def star_svg(w=340, h=200, n=8, r=78, pm_label="PM"):
    import math
    cx, cy = w/2, h/2 + 4
    pts = [(cx + r*math.cos(2*math.pi*i/n - math.pi/2), cy + r*math.sin(2*math.pi*i/n - math.pi/2)) for i in range(n)]
    lines = "".join(f'<line x1="{cx}" y1="{cy}" x2="{x:.1f}" y2="{y:.1f}" stroke="#2e7d32" stroke-opacity="0.55" stroke-width="1.6"/>' for x, y in pts)
    dots = "".join(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="9" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/>' for x, y in pts)
    hub = (f'<circle cx="{cx}" cy="{cy}" r="17" fill="#fff3e0" stroke="#e65100" stroke-width="2.4"/>'
           f'<text x="{cx}" y="{cy+4.5}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="12" font-weight="600" fill="#e65100">{pm_label}</text>')
    return f'<svg width="{w}" height="{h}" viewBox="0 0 {w} {h}">{lines}{dots}{hub}</svg>'

f2_zh_body = f'''
<div class="panels">
  <div class="panel p-mesh">
    <h2>人人对齐人人</h2><div class="sub">全连接：渠道数 n(n−1)/2，随人数平方增长</div>
    {mesh_svg()}
    <div class="stats"><div class="stat"><div class="num">6</div><div class="lab">4 人</div></div>
    <div class="stat"><div class="num">28</div><div class="lab">8 人</div></div>
    <div class="stat"><div class="num">120</div><div class="lab">16 人</div></div></div>
  </div>
  <div class="panel p-star">
    <h2>人人只对齐 PM</h2><div class="sub">星型：渠道数 n，随人数线性增长</div>
    {star_svg()}
    <div class="stats"><div class="stat"><div class="num">4</div><div class="lab">4 人</div></div>
    <div class="stat"><div class="num">8</div><div class="lab">8 人</div></div>
    <div class="stat"><div class="num">16</div><div class="lab">16 人</div></div></div>
  </div>
</div>
<div class="trade">
  <div class="cell t-down"><b class="k">κ ↓</b>&nbsp;&nbsp;平方级的对齐成本被压成线性</div>
  <div class="cell t-up"><b class="k">σ ↑</b>&nbsp;&nbsp;代价：PM 自己成为新的排队点（串行瓶颈）</div>
</div>
'''

f2_en_body = f'''
<div class="panels">
  <div class="panel p-mesh">
    <h2>Everyone aligns with everyone</h2><div class="sub">Full mesh: n(n−1)/2 channels — quadratic in headcount</div>
    {mesh_svg()}
    <div class="stats"><div class="stat"><div class="num">6</div><div class="lab">4 people</div></div>
    <div class="stat"><div class="num">28</div><div class="lab">8 people</div></div>
    <div class="stat"><div class="num">120</div><div class="lab">16 people</div></div></div>
  </div>
  <div class="panel p-star">
    <h2>Everyone aligns with the PM</h2><div class="sub">Star: n channels — linear in headcount</div>
    {star_svg()}
    <div class="stats"><div class="stat"><div class="num">4</div><div class="lab">4 people</div></div>
    <div class="stat"><div class="num">8</div><div class="lab">8 people</div></div>
    <div class="stat"><div class="num">16</div><div class="lab">16 people</div></div></div>
  </div>
</div>
<div class="trade">
  <div class="cell t-down"><b class="k">κ ↓</b>&nbsp;&nbsp;quadratic alignment cost compressed to linear</div>
  <div class="cell t-up"><b class="k">σ ↑</b>&nbsp;&nbsp;the price: the PM becomes the new queue (a serial bottleneck)</div>
</div>
'''

emit("figure-2-topology", "zh", "图 2 — 两种拓扑", "图 02 — 平方换线性",
     "项目经理的本质：一笔拓扑交易", "同样 8 个节点，两种协作结构的渠道数量级完全不同。",
     f2_zh_body,
     "项目经理（以及 agent 世界的 orchestrator）做的是同一笔交易：<b>用平方换线性</b>——压下 κ，代价是自己成为 σ。",
     "marvinzhang.dev", "图 2 / 5", F2_CSS)

emit("figure-2-topology", "en", "Fig. 2 — Two topologies", "FIG 02 — QUADRATIC FOR LINEAR",
     "The project manager as a topology trade", "Same 8 nodes; the two collaboration structures differ by an order of magnitude in channels.",
     f2_en_body,
     "The PM — and the orchestrator in the agent world — strikes the same deal: <b>trade quadratic for linear</b>. κ goes down; the price is becoming σ yourself.",
     "marvinzhang.dev", "FIG 2 / 5", F2_CSS)

# ---------------------------------------------------------------- figure 3
F3_CSS = """
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .card { border: 1.5px solid; border-radius: 12px; background: #fff; padding: 16px 18px 14px; }
  .card .num { font-family: 'JetBrains Mono', monospace; font-size: 30px; font-weight: 600; letter-spacing: -0.01em; }
  .card .what { font-size: 14.5px; font-weight: 600; margin-top: 5px; line-height: 1.4; }
  .card .how { font-size: 12.5px; color: var(--ink-soft); margin-top: 5px; line-height: 1.45; }
  .c-ok   { border-color: var(--ok-stroke); }   .c-ok .num { color: var(--ok-stroke); }
  .c-err  { border-color: var(--err-stroke); }  .c-err .num { color: var(--err-stroke); }
  .c-warn { border-color: var(--warn-stroke); } .c-warn .num { color: var(--warn-stroke); }
  .c-hi   { border-color: var(--hi-stroke); }   .c-hi .num { color: var(--hi-stroke); }
  .wide { margin-top: 14px; border: 1.5px solid var(--info-stroke); border-radius: 12px; background: #fff;
          padding: 13px 18px; display: flex; align-items: center; gap: 16px; }
  .wide .num { font-family: 'JetBrains Mono', monospace; font-size: 26px; font-weight: 600; color: var(--info-stroke); flex: none; }
  .wide .txt { font-size: 13.5px; color: var(--ink); line-height: 1.5; }
"""

def f3_body(lang):
    if lang == "zh":
        cards = [
            ("c-ok", "+80.9%", "可并行任务：多 agent 确实有效", "中心化协调 vs 单 agent（Kim et al., 180 种配置）"),
            ("c-err", "−39%~−70%", "顺序任务：所有多 agent 变体全部劣化", "超过 3–4 个 agent 后，加得越多越糟（同上）"),
            ("c-warn", "15%–49%", "只加到两个 agent，就损失这么多", "k=2 时损失的单 agent 性能占比（Silo-Bench, RCC）"),
            ("c-hi", "17.2× → 4.4×", "错误放大：编排器把它压回来", "独立集群 vs 中心化协调的错误放大倍数（Kim et al.）"),
        ]
        wide = ("≈37%", "1600 多条执行轨迹里，最大的一类失败是 <b>agent 之间没对齐</b>——各说各话、丢上下文、推翻队友已定的方案（MAST, Cemri et al., NeurIPS 2025）")
    else:
        cards = [
            ("c-ok", "+80.9%", "Parallelisable tasks: multi-agent genuinely works", "Centralized coordination vs. single agent (Kim et al., 180 configs)"),
            ("c-err", "−39%~−70%", "Sequential tasks: every multi-agent variant degrades", "Beyond 3–4 agents, more only makes it worse (ibid.)"),
            ("c-warn", "15%–49%", "Lost by merely going to two agents", "Share of single-agent performance lost at k=2 (Silo-Bench, RCC)"),
            ("c-hi", "17.2× → 4.4×", "Error amplification: the orchestrator reins it in", "Independent swarm vs. centralized coordination (Kim et al.)"),
        ]
        wide = ("≈37%", "Across 1,600+ execution traces, the single largest failure class is <b>inter-agent misalignment</b> — talking past each other, dropping context, re-litigating settled decisions (MAST, Cemri et al., NeurIPS 2025)")
    cs = "".join(f'<div class="card {c}"><div class="num">{n}</div><div class="what">{w}</div><div class="how">{h}</div></div>' for c, n, w, h in cards)
    return f'<div class="grid">{cs}</div><div class="wide"><div class="num">{wide[0]}</div><div class="txt">{wide[1]}</div></div>'

emit("figure-3-evidence", "zh", "图 3 — agent 团队的读数", "图 03 — 实证读数",
     "agent 团队的五组读数", "多 agent 系统的实证研究结果，每一组都能在管理学教材里找到原型。",
     f3_body("zh"),
     "研究者的原话是&ldquo;架构与任务的匹配决定协作成败&rdquo;。翻译一下：<b>活能不能拆，决定了人多是帮忙还是添乱。</b>",
     "arXiv 2512.08296 · 2503.13657 · 2603.01045", "图 3 / 5", F3_CSS)

emit("figure-3-evidence", "en", "Fig. 3 — Readings from agent teams", "FIG 03 — THE RELAPSE",
     "Five readings from agent teams", "Empirical results on multi-agent systems — each one has a textbook ancestor in management science.",
     f3_body("en"),
     "The researchers’ phrase is “architecture–task alignment determines collaborative success.” In plain words: <b>whether the work splits decides whether more agents help or hurt.</b>",
     "arXiv 2512.08296 · 2503.13657 · 2603.01045", "FIG 3 / 5", F3_CSS)

# ---------------------------------------------------------------- figure 4
F4_CSS = """
  .walls { display: flex; flex-direction: column; gap: 12px; }
  .wall { display: flex; align-items: stretch; gap: 0; }
  .wall .left { flex: 1; border: 1.5px solid var(--err-stroke); border-radius: 12px 0 0 12px; border-right: none;
                background: var(--err-fill); padding: 13px 16px; }
  .wall .arrow { flex: none; width: 44px; display: flex; align-items: center; justify-content: center;
                 font-size: 20px; color: var(--ink-faint); }
  .wall .right { flex: 1; border: 1.5px solid var(--ok-stroke); border-radius: 0 12px 12px 0; border-left: none;
                 background: var(--ok-fill); padding: 13px 16px; }
  .wall h3 { margin: 0; font-size: 14.5px; font-weight: 600; }
  .wall .left h3 { color: var(--err-stroke); } .wall .right h3 { color: var(--ok-stroke); }
  .wall p { margin: 4px 0 0; font-size: 12.5px; color: var(--ink-soft); line-height: 1.45; }
  .routes { margin-top: 18px; display: flex; gap: 12px; }
  .route { flex: 1; border: 1.5px solid var(--info-stroke); border-radius: 12px; background: #fff; padding: 13px 16px; }
  .route h3 { margin: 0; font-size: 14px; font-weight: 600; color: var(--info-stroke); }
  .route p { margin: 5px 0 0; font-size: 12.5px; color: var(--ink-soft); line-height: 1.5; }
  .routes-label { margin-top: 18px; font-family: 'JetBrains Mono', monospace; font-size: 11.5px;
                  letter-spacing: 0.07em; text-transform: uppercase; color: var(--ink-faint); }
"""

def wall(l_h, l_p, r_h, r_p):
    return (f'<div class="wall"><div class="left"><h3>{l_h}</h3><p>{l_p}</p></div>'
            f'<div class="arrow">→</div>'
            f'<div class="right"><h3>{r_h}</h3><p>{r_p}</p></div></div>')

f4_zh_body = ('<div class="walls">'
    + wall("墙一：没有日志", "走廊里的闲聊、会议室里的眼神，都不留记录——公司没法打 log",
           "每次交互都走 API", "token 用量、时间戳、完整内容，天然全量记账")
    + wall("墙二：不能重跑", "历史只发生一次；没有公司能用 8 人和 16 人各过一遍同一个季度",
           "N 是自由变量", "同一批任务，2 / 4 / 8 / 16 个 agent 各跑一遍，其他全部锁死")
    + wall("墙三：人会应付指标", "古德哈特定律：指标一旦用于考核，就不再是好指标",
           "agent 不应付账本", "它不知道自己被测量，也不为绩效虚报工作量")
    + '</div><div class="routes-label">测量的两条路线（协调成本 ≠ 消息 token 数）</div><div class="routes">'
    + '<div class="route"><h3>结果侧 · 整体测量</h3><p>固定任务集、扫描 N，看曲线弯离理想直线多少——弯掉的就是协调税，无需拆解归因（Silo-Bench 的 RCC 走的就是这条路）</p></div>'
    + '<div class="route"><h3>过程侧 · 指标篮子</h3><p>上下文重复率、agent 利用率、每次委派成本、错误放大倍数——每个都只是一个侧面，合起来当仪表盘看</p></div>'
    + '</div>')

f4_en_body = ('<div class="walls">'
    + wall("Wall 1: no log", "Hallway chats and glances in meeting rooms leave no record — you can't instrument a company",
           "Every interaction is an API call", "Token usage, timestamps, full content — a complete ledger by default")
    + wall("Wall 2: no re-runs", "History happens once; no company runs the same quarter with 8 people, then 16",
           "N is a free variable", "Same task batch at 2 / 4 / 8 / 16 agents, everything else pinned")
    + wall("Wall 3: people game metrics", "Goodhart's Law: once a measure becomes a target, it stops being a good measure",
           "Agents don't game the ledger", "They don't know they're measured and don't inflate for performance reviews")
    + '</div><div class="routes-label">Two measurement routes (coordination cost ≠ message-token count)</div><div class="routes">'
    + '<div class="route"><h3>Outcome side · whole-system</h3><p>Fix the task set, sweep N, watch the curve bend away from the ideal line — the gap is the tax; no attribution needed (Silo-Bench\'s RCC works this way)</p></div>'
    + '<div class="route"><h3>Process side · a basket of proxies</h3><p>Context-duplication rate, agent utilisation, cost per delegation, error amplification — each a facet; together, a dashboard</p></div>'
    + '</div>')

emit("figure-4-walls", "zh", "图 4 — 三堵墙的倒塌", "图 04 — 可测量性",
     "组织经济学的三堵墙，agent 一次拆完", "让&ldquo;协调成本&rdquo;测不了的三个百年难题，与 agent 系统给出的解法。",
     f4_zh_body,
     "对人类团队，那些数字只能<b>算</b>；对 agent 团队，第一次可以<b>量</b>——人月神话从格言变成可复现实验的定律。",
     "marvinzhang.dev", "图 4 / 5", F4_CSS)

emit("figure-4-walls", "en", "Fig. 4 — Three walls come down", "FIG 04 — MEASURABILITY",
     "Org economics' three walls, demolished at once", "The three century-old obstacles that made coordination cost unmeasurable — and the agent-side answers.",
     f4_en_body,
     "For human teams those numbers could only be <b>computed</b>; for agent teams they can finally be <b>measured</b> — the man-month goes from aphorism to reproducible law.",
     "marvinzhang.dev", "FIG 4 / 5", F4_CSS)

# ---------------------------------------------------------------- figure 5
F5_CSS = """
  .cols { display: flex; gap: 0; align-items: stretch; }
  .col { flex: 1; border: 1.5px solid; border-radius: 12px; background: #fff; padding: 16px 18px; }
  .col-old { border-color: var(--ink-faint); }
  .col-new { border-color: var(--hi-stroke); background: #fdfaff; }
  .col h2 { margin: 0; font-size: 16px; font-weight: 600; }
  .col-old h2 { color: var(--ink-soft); } .col-new h2 { color: var(--hi-stroke); }
  .col .tag { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.07em;
              text-transform: uppercase; color: var(--ink-faint); margin-top: 3px; }
  .col ul { margin: 12px 0 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .col li { font-size: 14px; line-height: 1.45; padding: 8px 12px; border-radius: 8px; }
  .col-old li { background: #f1f1f1; color: var(--ink-soft); }
  .col-new li { background: var(--hi-fill); color: var(--ink); }
  .col-new li b { color: var(--hi-stroke); }
  .mid { flex: none; width: 58px; display: flex; align-items: center; justify-content: center;
         font-size: 26px; color: var(--hi-stroke); }
  .roles { margin-top: 16px; display: flex; gap: 12px; }
  .role { flex: 1; border: 1.5px solid var(--info-stroke); border-radius: 12px; background: #fff; padding: 12px 15px; }
  .role h3 { margin: 0; font-size: 13.5px; font-weight: 600; color: var(--info-stroke); }
  .role p { margin: 5px 0 0; font-size: 12.5px; color: var(--ink-soft); line-height: 1.5; }
"""

f5_zh_body = ('<div class="cols">'
    '<div class="col col-old"><h2>λ 时代的硬通货</h2><div class="tag">正在被 agent 批发化</div><ul>'
    '<li>写得快</li><li>bug 少</li><li>精通框架与语言</li><li>单兵产能溢价</li></ul></div>'
    '<div class="mid">→</div>'
    '<div class="col col-new"><h2>κ 时代的手艺</h2><div class="tag">新的稀缺能力</div><ul>'
    '<li><b>任务拆分</b>——拆到能并行、边界不打架</li>'
    '<li><b>协议设计</b>——什么必须同步、什么不许广播</li>'
    '<li><b>验证标准</b>——机器能裁决的对错越多越好</li>'
    '<li><b>编排</b>——何时中心化收口、何时放手并行</li></ul></div>'
    '</div><div class="roles">'
    '<div class="role"><h3>一线工程师</h3><p>把功夫从&ldquo;写得快&rdquo;挪一部分到&ldquo;拆得好&rdquo;——你的拆分决定 agent 集群的 κ</p></div>'
    '<div class="role"><h3>架构师 · 技术管理者</h3><p>带团队攒下的直觉，升级为可拿数据验证的工程判断</p></div>'
    '<div class="role"><h3>组织</h3><p>两个披萨、小团队、流程投资——老经验以编排配置的形式被逐字重写</p></div>'
    '</div>')

f5_en_body = ('<div class="cols">'
    '<div class="col col-old"><h2>Hard currency of the λ era</h2><div class="tag">Being wholesaled by agents</div><ul>'
    '<li>Writing fast</li><li>Few bugs</li><li>Framework & language mastery</li><li>Premium on solo throughput</li></ul></div>'
    '<div class="mid">→</div>'
    '<div class="col col-new"><h2>Craft of the κ era</h2><div class="tag">The new scarcity</div><ul>'
    '<li><b>Task decomposition</b> — parallelisable, non-colliding boundaries</li>'
    '<li><b>Protocol design</b> — what must sync, what must never broadcast</li>'
    '<li><b>Verification standards</b> — maximise machine-decidable correctness</li>'
    '<li><b>Orchestration</b> — when to centralise, when to fan out</li></ul></div>'
    '</div><div class="roles">'
    '<div class="role"><h3>Engineers</h3><p>Shift effort from "writing fast" to "splitting well" — your decomposition sets your agent fleet\'s κ</p></div>'
    '<div class="role"><h3>Architects · tech leads</h3><p>Instincts earned managing people upgrade into data-verifiable engineering judgement</p></div>'
    '<div class="role"><h3>Organisations</h3><p>Two-pizza teams, process investment — old lessons rewritten verbatim as orchestration configs</p></div>'
    '</div>')

emit("figure-5-skills", "zh", "图 5 — 能力迁移", "图 05 — 职业地图",
     "上个时代提高 λ，这个时代压低 κ", "当单兵产能被批发化，稀缺的位置从分子挪到了分母。",
     f5_zh_body,
     "<b>谁能把 κ 压下去，谁就是下一个时代的稀缺人才</b>——而且这门手艺第一次有了仪表盘。",
     "marvinzhang.dev", "图 5 / 5", F5_CSS)

emit("figure-5-skills", "en", "Fig. 5 — The skill migration", "FIG 05 — CAREER MAP",
     "Last era: raise λ. This era: lower κ.", "With solo throughput commoditised, scarcity moves from the numerator to the denominator.",
     f5_en_body,
     "<b>Whoever can press κ down is the scarce talent of the next era</b> — and for the first time, the craft comes with a gauge.",
     "marvinzhang.dev", "FIG 5 / 5", F5_CSS)

print("all done")
