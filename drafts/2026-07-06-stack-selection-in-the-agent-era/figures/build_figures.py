#!/usr/bin/env python3
# Build bilingual figure HTMLs for 2026-07-06-web-stack-selection-in-the-agent-era
import pathlib

OUT = pathlib.Path(__file__).parent

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
  .header { margin-bottom: 28px; }
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
"""

HEAD = """<!DOCTYPE html>
<html lang="{lang}">
<head>
<meta charset="UTF-8" />
<title>{title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet" />
<style>{base}{extra}</style>
</head>
<body>
<div class="canvas">
<div class="header">
  <div class="figno">{figno}</div>
  <h1>{h1}</h1>
  <div class="subtitle">{subtitle}</div>
</div>
{body}
<div class="footer"><div>{footleft}</div><div>marvinzhang.dev · {figname}</div></div>
</div>
</body>
</html>
"""

def emit(figname, lang, title, figno, h1, subtitle, body, footleft, extra):
    html = HEAD.format(lang=lang, title=title, base=BASE_CSS, extra=extra, figno=figno,
                       h1=h1, subtitle=subtitle, body=body, footleft=footleft, figname=figname)
    (OUT / f"{figname}.{lang}.html").write_text(html)
    print("wrote", f"{figname}.{lang}.html")

# ---------------------------------------------------------------- figure 1
F1_CSS = """
  .arts { display: flex; flex-direction: column; gap: 14px; }
  .art { border: 1.5px solid; border-radius: 12px; background: #fff; display: flex; }
  .art .side { width: 218px; flex: none; padding: 16px 18px; border-right: 1.5px dashed var(--line); }
  .art .side .name { font-weight: 600; font-size: 17px; line-height: 1.35; }
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
  .a4 { border-color: var(--hi-stroke); }   .a4 .side { background: #faf3fb; } .a4 .name { color: var(--hi-stroke); }
"""

F1 = {
 "en": dict(
  title="Figure 1 — What the 2021 articles argued from",
  figno="Figure 01 — Site archaeology",
  h1="Four articles, one unstated assumption",
  subtitle="Every criterion the 2021 series argued from was denominated in humans — learning curves, reading comfort, satisfaction surveys.",
  labels=("Criterion", "Verdict then", "Read in 2026"),
  arts=[
   ("a1", "TypeScript for large frontend projects", "2021-02",
    "Types as a <b>human collaboration contract</b>; errors surface at compile time",
    "Indispensable for large projects",
    "<b>Aged best</b> — the same mechanism now serves a second audience"),
   ("a2", "Frontend engineering in 2021", "2021-03",
    "<b>Toolchain mastery</b> as professional identity; complexity endured, not questioned",
    "Complexity is the job",
    "The complaint survived; the tool list reads like sediment layers"),
   ("a3", "Is Go a backend panacea?", "2021-03",
    "Simplicity × stability × speed, weighed <b>dialectically</b> — every strength casts a shadow",
    "No panacea; know your trade-offs",
    "<b>The method</b> aged better than any single verdict"),
   ("a4", "Why C# for large backend apps", "2021-11",
    "<b>Satisfaction vs. market share</b> — Java 47% loved vs. C# 62% (StackOverflow 2021)",
    "Loved beats large, eventually",
    "The frame transplants to 2026 unchanged (Hono vs. Express)"),
  ],
  takeaway="<b>The buried assumption.</b> Nobody asked how a machine would experience the stack — because no machine was writing the code.",
  footleft="marvinzhang.dev, 2021 series · StackOverflow Survey 2021",
 ),
 "zh": dict(
  title="图 1 — 2021 年那批文章的判据",
  figno="图 01 — 站内考古",
  h1="四篇文章，一个没说出口的假设",
  subtitle="2021 年系列文章的所有选型判据，度量的都是人——学习曲线、阅读舒适度、满意度问卷。",
  labels=("判据", "当年结论", "2026 年读来"),
  arts=[
   ("a1", "TypeScript 与大型前端项目", "2021-02",
    "类型是 <b>人类协作契约</b>；错误在编译时暴露",
    "大型项目必备",
    "<b>增值最大</b>——同一机制迎来了第二种受众"),
   ("a2", "公元 2021 年的前端工程化", "2021-03",
    "<b>工具链掌握度</b>即职业身份；复杂度被默认接受，无人质疑",
    "复杂度就是工作本身",
    "抱怨依然成立；工具清单读起来像地质沉积层"),
   ("a3", "Golang 是后端万能药吗？", "2021-03",
    "简洁 × 稳定 × 快，<b>辩证审视</b>——每个优点都是双刃剑",
    "没有万能药，认清取舍",
    "<b>方法论</b>比任何单个结论都老得慢"),
   ("a4", "为什么推荐 C# 构建大型后端", "2021-11",
    "<b>满意度 vs 市场份额</b>——Java 47% vs C# 62%（StackOverflow 2021）",
    "被爱的终将胜过庞大的",
    "框架原封不动搬到 2026 仍然成立（Hono vs Express）"),
  ],
  takeaway="<b>埋着的假设。</b>没有人问过机器会如何体验这套技术栈——因为当时没有机器在写代码。",
  footleft="marvinzhang.dev 2021 系列 · StackOverflow Survey 2021",
 ),
}

for lang, d in F1.items():
    cards = []
    for cls, name, date, crit, verd, read in d["arts"]:
        k1, k2, k3 = d["labels"]
        cards.append(f"""
      <div class="art {cls}">
        <div class="side"><div class="name">{name}</div><div class="date">{date}</div></div>
        <div class="fields">
          <div class="row"><div class="k">{k1}</div><div class="v">{crit}</div></div>
          <div class="row"><div class="k">{k2}</div><div class="v">{verd}</div></div>
          <div class="row"><div class="k">{k3}</div><div class="v">{read}</div></div>
        </div>
      </div>""")
    body = f'<div class="arts">{"".join(cards)}</div>\n<div class="takeaway">{d["takeaway"]}</div>'
    emit("figure-1-2021-criteria", lang, d["title"], d["figno"], d["h1"], d["subtitle"], body, d["footleft"], F1_CSS)

# ---------------------------------------------------------------- figure 2
F2_CSS = """
  .diagram { margin: 4px 0 0 0; }
  .density { margin-top: 18px; display: flex; gap: 14px; }
  .density .cell {
    flex: 1; border-radius: 12px; padding: 13px 16px; border: 1.5px solid;
    font-size: 13.5px; line-height: 1.5;
  }
  .density .good { border-color: var(--ok-stroke); background: #f3faf4; }
  .density .bad { border-color: var(--err-stroke); background: #fff6f6; }
  .density b { font-weight: 600; }
  .density .good b { color: var(--ok-stroke); }
  .density .bad b { color: var(--err-stroke); }
  .density code { font-family: 'JetBrains Mono', monospace; font-size: 12px; background: #f1f1f1;
    padding: 1px 5px; border-radius: 4px; }
"""

def f2_svg(d):
    T = d
    return f"""
<svg class="diagram" width="772" height="368" viewBox="0 0 772 368" font-family="Inter, 'Noto Sans SC', sans-serif">
  <defs>
    <marker id="agray" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
      <polygon points="0,0 5,2.5 0,5" fill="#8a8a8a"/></marker>
    <marker id="agreen" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
      <polygon points="0,0 5,2.5 0,5" fill="#2e7d32"/></marker>
    <marker id="ared" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
      <polygon points="0,0 5,2.5 0,5" fill="#c62828"/></marker>
  </defs>

  <!-- loop-back: from green box top, over the top, down into Edit box top -->
  <path d="M 683 56 L 683 24 L 81 24 L 81 112" fill="none" stroke="#2e7d32"
        stroke-width="2.5" stroke-dasharray="7 5" marker-end="url(#agreen)"/>
  <rect x="{385-T['loopw']//2}" y="10" width="{T['loopw']}" height="26" rx="13" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="385" y="27" text-anchor="middle" font-size="12.5" font-weight="600" fill="#2e7d32">{T['loop']}</text>

  <!-- main row -->
  <rect x="6" y="120" width="150" height="92" rx="12" fill="#e1f5fe" stroke="#01579b" stroke-width="1.5"/>
  <text x="81" y="158" text-anchor="middle" font-size="15" font-weight="600" fill="#1f1f1f">{T['edit_t']}</text>
  <text x="81" y="182" text-anchor="middle" font-size="11.5" fill="#525252">{T['edit_s']}</text>

  <line x1="160" y1="166" x2="206" y2="166" stroke="#8a8a8a" stroke-width="2.5" marker-end="url(#agray)"/>

  <rect x="214" y="120" width="170" height="92" rx="12" fill="#fff3e0" stroke="#e65100" stroke-width="1.5"/>
  <text x="299" y="158" text-anchor="middle" font-size="14" font-weight="600" fill="#1f1f1f">{T['verify_t']}</text>
  <text x="299" y="182" text-anchor="middle" font-size="11.5" fill="#525252">{T['verify_s']}</text>

  <line x1="388" y1="166" x2="434" y2="166" stroke="#8a8a8a" stroke-width="2.5" marker-end="url(#agray)"/>

  <rect x="442" y="120" width="120" height="92" rx="12" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="1.5"/>
  <text x="502" y="153" text-anchor="middle" font-size="15" font-weight="600" fill="#1f1f1f">{T['sig_t']}</text>
  <text x="502" y="174" text-anchor="middle" font-size="11.5" fill="#525252">{T['sig_s1']}</text>
  <text x="502" y="190" text-anchor="middle" font-size="11.5" fill="#525252">{T['sig_s2']}</text>

  <!-- branch arrows: signals -> two outcomes -->
  <path d="M 562 146 L 570 146 Q 580 146 580 136 L 580 107 Q 580 97 590 97 L 594 97" fill="none" stroke="#2e7d32" stroke-width="2.5" marker-end="url(#agreen)"/>
  <path d="M 562 186 L 570 186 Q 580 186 580 196 L 580 263 Q 580 273 590 273 L 594 273" fill="none" stroke="#c62828" stroke-width="2.5" marker-end="url(#ared)"/>

  <!-- outcomes -->
  <rect x="600" y="56" width="166" height="82" rx="12" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="683" y="84" text-anchor="middle" font-size="13.5" font-weight="600" fill="#2e7d32">{T['ok_t']}</text>
  <text x="683" y="103" text-anchor="middle" font-size="{T['subfs']}" fill="#525252">{T['ok_s1']}</text>
  <text x="683" y="118" text-anchor="middle" font-size="{T['subfs']}" fill="#525252">{T['ok_s2']}</text>

  <rect x="600" y="232" width="166" height="82" rx="12" fill="#ffebee" stroke="#c62828" stroke-width="1.5"/>
  <text x="683" y="260" text-anchor="middle" font-size="13.5" font-weight="600" fill="#c62828">{T['err_t']}</text>
  <text x="683" y="279" text-anchor="middle" font-size="{T['subfs']}" fill="#525252">{T['err_s1']}</text>
  <text x="683" y="294" text-anchor="middle" font-size="{T['subfs']}" fill="#525252">{T['err_s2']}</text>

  <!-- latency bracket under the edit->signals span -->
  <path d="M 6 336 L 6 344 L 766 344 L 766 336" fill="none" stroke="#e65100" stroke-width="2.5"/>
  <text x="386" y="362" text-anchor="middle" font-size="12.5" font-weight="600" fill="#e65100"
        font-family="'JetBrains Mono', monospace">{T['lat']}</text>
</svg>"""

F2 = {
 "en": dict(
  title="Figure 2 — The agent loop",
  figno="Figure 02 — Two new selection criteria",
  h1="The loop an agent runs, and what your stack controls",
  subtitle="Per task the loop closes dozens to hundreds of times. The stack sets its latency; the stack decides how much correctness is machine-decidable at the branch.",
  edit_t="Agent edits code", edit_s="the write step is cheap",
  verify_t="Build · type-check · test", verify_s="install, compile, startup",
  sig_t="Signals", sig_s1="what comes back —", sig_s2="can it be trusted?",
  ok_t="Agent self-corrects", ok_s1="deterministic, machine-readable", ok_s2="tsc error, failed assertion",
  err_t="Human must intervene", err_s1="weak or absent signals", err_s2="runtime-only failure",
  loop="self-correction loops back — hundreds of rounds per task", loopw=392, subfs=10,
  lat="LOOP LATENCY = one edit → trusted-feedback cycle",
  good="<b>Dense signal:</b> a <code>tsc</code> error is free, deterministic, machine-readable — same defect, same message, same line. 94% of compiler errors in LLM output are type-check failures.",
  bad="<b>Sparse signal:</b> a production <code>TypeError</code> is expensive to reach, stochastic to reproduce, and needs a human to interpret.",
  footleft="GitHub Blog 2026 (94% type-check failures) · loop model: this article",
 ),
 "zh": dict(
  title="图 2 — agent 循环",
  figno="图 02 — 两个新选型判据",
  h1="agent 跑的循环，以及技术栈控制着什么",
  subtitle="一个任务里这个循环要闭合几十到几百次。技术栈决定一轮要多久，也决定分叉处有多少对错能由机器直接裁决。",
  edit_t="agent 修改代码", edit_s="写代码这一步很便宜",
  verify_t="构建 · 类型检查 · 测试", verify_s="安装、编译、启动",
  sig_t="信号", sig_s1="返回了什么？", sig_s2="能不能信？",
  ok_t="agent 自我纠正", ok_s1="确定性、机器可读", ok_s2="tsc 报错、断言失败",
  err_t="人类介入", err_s1="信号微弱或缺失", err_s2="仅运行时暴露",
  loop="自我纠正后回到起点——一个任务里循环成百上千轮", loopw=330, subfs=10.8,
  lat="反馈周期 = 一次「修改 → 可信反馈」的端到端耗时",
  good="<b>密集信号：</b>一条 <code>tsc</code> 报错零成本、确定性、机器可读——同一缺陷、同一消息、同一行号。LLM 产出代码的编译错误中 94% 是类型检查失败。",
  bad="<b>稀疏信号：</b>生产环境的 <code>TypeError</code> 触达昂贵、复现随机、还需要人来解释。",
  footleft="GitHub Blog 2026（94% 为类型检查失败）· 循环模型：本文",
 ),
}

for lang, d in F2.items():
    body = f2_svg(d) + f"""
      <div class="density">
        <div class="cell good">{d['good']}</div>
        <div class="cell bad">{d['bad']}</div>
      </div>"""
    emit("figure-2-agent-loop", lang, d["title"], d["figno"], d["h1"], d["subtitle"], body, d["footleft"], F2_CSS)

# ---------------------------------------------------------------- figure 3
F3_CSS = """
  .rows { display: flex; flex-direction: column; gap: 13px; }
  .vrow { display: flex; align-items: stretch; gap: 0; }
  .cell { border: 1.5px solid; border-radius: 12px; background: #fff; padding: 12px 15px; }
  .now { width: 300px; flex: none; border-color: var(--info-stroke); background: #f4faff; }
  .then { width: 268px; flex: none; border-color: var(--line); background: #fff; }
  .cell .t { font-weight: 600; font-size: 14.5px; line-height: 1.35; }
  .now .t { color: var(--info-stroke); }
  .cell .s { font-size: 12.5px; color: var(--ink-soft); margin-top: 4px; line-height: 1.45; }
  .mid { display: flex; align-items: center; padding: 0 3px; }
  .verdict { flex: 1; display: flex; align-items: center; border-radius: 12px; border: 1.5px solid;
    padding: 10px 14px; font-size: 13px; font-weight: 600; line-height: 1.35; }
  .v-ok { border-color: var(--ok-stroke); background: var(--ok-fill); color: var(--ok-stroke); }
  .v-hi { border-color: var(--hi-stroke); background: var(--hi-fill); color: var(--hi-stroke); }
  .v-info { border-color: var(--info-stroke); background: var(--info-fill); color: var(--info-stroke); }
  .v-warn { border-color: var(--warn-stroke); background: var(--warn-fill); color: var(--warn-stroke); }
  .colheads { display: flex; margin-bottom: 8px; font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: 0.07em; text-transform: uppercase; color: var(--ink-faint); }
  .colheads .c1 { width: 300px; flex: none; }
  .colheads .c2 { width: 308px; flex: none; padding-left: 40px; }
  .colheads .c3 { flex: 1; padding-left: 40px; }
"""

F3 = {
 "en": dict(
  title="Figure 4 — 2026 evidence, 2021 echoes",
  figno="Figure 04 — The verdicts, revised",
  h1="Three exhibits and what they overturn",
  subtitle="Each 2025–2026 development lands directly on an argument from the 2021 series.",
  heads=("2026 evidence", "2021 echo", "Verdict, revised"),
  rows=[
   (("typescript-go: tsc ported to Go", "≈10x faster, at RC; same checks, a tenth of the latency"),
    ("TS piece: error front-loading · Go piece: compile-speed “joke row”",),
    ("v-ok", "Crowned — both points converge as agent economics")),
   (("Hono in the S-tier, Express leads usage", "State of JS 2025: satisfaction >90% in year one"),
    ("C# piece: satisfaction leads, market share lags",),
    ("v-hi", "Frame reused verbatim — the leading indicator leads again")),
   (("Hono RPC + Zod full-stack contract", "server types flow to the client; drift fails to compile"),
    ("TS piece: types as a collaboration contract",),
    ("v-info", "Upgraded — the contract now crosses the network boundary")),
   (("Bun: one binary swallows the toolchain", "runtime + package manager + bundler + test runner"),
    ("Frontend piece: the 500MB toolchain complaint",),
    ("v-warn", "Answered — but the double-edged sword cuts (Figure 5)")),
  ],
  footleft="Microsoft devblogs · State of JS 2025 · hono.dev · bun.com",
 ),
 "zh": dict(
  title="图 4 — 2026 年的证据与 2021 年的回声",
  figno="图 04 — 判决修订",
  h1="三组证据，各自改判了什么",
  subtitle="每一项 2025–2026 年的进展，都不偏不倚，正好落在 2021 年系列的某个论点上。",
  heads=("2026 年的证据", "对应的 2021 论点", "判决修订"),
  rows=[
   (("typescript-go：tsc 移植到 Go", "约 10 倍提速，已至 RC；同样的检查，十分之一的延迟"),
    ("TS 篇：错误前置 · Golang 篇：编译速度“玩笑行”",),
    ("v-ok", "坐实——两个论点在 agent 经济学中会合")),
   (("Hono 进 S 级，Express 使用率第一", "State of JS 2025：首年参评满意度 >90%"),
    ("C# 篇：满意度领先，市场份额滞后",),
    ("v-hi", "框架原样复用——领先指标再次领先")),
   (("Hono RPC + Zod 全栈契约", "服务端类型流向客户端；契约漂移直接编译失败"),
    ("TS 篇：类型即协作契约",),
    ("v-info", "升级——契约跨过了网络边界")),
   (("Bun：一个二进制吞下工具链", "运行时 + 包管理 + 打包 + 测试"),
    ("前端工程化篇：500MB 工具链之怨",),
    ("v-warn", "得到回应——但双刃剑同样锋利（见图 5）")),
  ],
  footleft="Microsoft devblogs · State of JS 2025 · hono.dev · bun.com",
 ),
}

SMALL_ARROW = """<div class="mid"><svg width="34" height="18" viewBox="0 0 34 18">
  <line x1="0" y1="9" x2="26" y2="9" stroke="#8a8a8a" stroke-width="2.2"/>
  <polygon points="24,3 34,9 24,15" fill="#8a8a8a"/></svg></div>"""

for lang, d in F3.items():
    rows = []
    for now, then, verdict in d["rows"]:
        vcls, vtxt = verdict
        then_t = then[0]
        rows.append(f"""
      <div class="vrow">
        <div class="cell now"><div class="t">{now[0]}</div><div class="s">{now[1]}</div></div>
        {SMALL_ARROW}
        <div class="cell then"><div class="s" style="margin-top:0">{then_t}</div></div>
        {SMALL_ARROW}
        <div class="verdict {vcls}">{vtxt}</div>
      </div>""")
    h1c, h2c, h3c = d["heads"]
    body = f"""
    <div class="colheads"><div class="c1">{h1c}</div><div class="c2">{h2c}</div><div class="c3">{h3c}</div></div>
    <div class="rows">{''.join(rows)}</div>"""
    emit("figure-4-verdicts", lang, d["title"], d["figno"], d["h1"], d["subtitle"], body, d["footleft"], F3_CSS)

# ---------------------------------------------------------------- figure 4
F4_CSS = """
  .heads { display: flex; gap: 14px; margin-bottom: 10px; }
  .heads .spacer { width: 172px; flex: none; }
  .heads .h { flex: 1; font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 600;
    letter-spacing: 0.07em; text-transform: uppercase; padding: 7px 12px; border-radius: 8px; }
  .heads .plus { color: var(--ok-stroke); background: var(--ok-fill); border: 1.5px solid var(--ok-stroke); }
  .heads .minus { color: var(--err-stroke); background: var(--err-fill); border: 1.5px solid var(--err-stroke); }
  .trows { display: flex; flex-direction: column; gap: 13px; }
  .trow { display: flex; gap: 14px; align-items: stretch; }
  .trait { width: 172px; flex: none; display: flex; align-items: center; font-weight: 600;
    font-size: 14.5px; line-height: 1.35; padding: 12px 14px; border-radius: 12px;
    background: #fff; border: 1.5px solid var(--line); }
  .pane { flex: 1; border-radius: 12px; border: 1.5px solid; padding: 12px 15px;
    font-size: 13.5px; line-height: 1.5; background: #fff; }
  .pane.plus { border-color: var(--ok-stroke); background: #f3faf4; }
  .pane.minus { border-color: var(--err-stroke); background: #fff6f6; }
  .pane b { font-weight: 600; }
  .pane.plus b { color: var(--ok-stroke); }
  .pane.minus b { color: var(--err-stroke); }
  .verdictline {
    margin-top: 22px; border-radius: 12px; border: 1.5px solid var(--ink);
    background: #fff; padding: 14px 18px; font-size: 15px; line-height: 1.5; text-align: center;
  }
  .verdictline b { font-weight: 700; }
  .verdictline code { font-family: 'JetBrains Mono', monospace; font-size: 13px;
    background: #f1f1f1; padding: 1px 6px; border-radius: 4px; }
"""

F4 = {
 "en": dict(
  title="Figure 5 — Bun through the 2021 method",
  figno="Figure 05 — Every strength casts a shadow",
  h1="The Go article's method, applied to Bun",
  subtitle="The 2021 Golang piece scored every celebrated feature against its shadow. Run Bun through the same table.",
  plus="Strength", minus="The other edge",
  rows=[
   ("Single binary, batteries included",
    "Toolchain complexity collapses toward zero; installs <b>dramatically faster</b> — the most replicated advantage across independent tests",
    "A vastly larger surface to keep compatible; <b>5,000+ open issues</b>; 16 Node modules partial, 3 unimplemented (Bun's own docs)"),
   ("Speed-first engineering culture",
    "Benchmarks and iteration pace pulled <b>21% of surveyed developers</b> (State of JS 2025, +4pt YoY)",
    "Long-running-process <b>memory leaks</b>; OpenCode migrated off citing “memory issues, crashes, terrible Windows support”"),
   ("Fast-moving, AI-accelerated development",
    "Rapid feature delivery; 1.x line shipped runtime, SQL, Redis, full-stack dev server in two years",
    "Stability discount in production; the canary-vs-stable paradox — <b>Prisma trusted the build that passed its tests</b>, not the version label"),
  ],
  verdict="Community consensus is itself a verdict: <code>bun install</code> for development speed, Node in production — <b>loop-latency optimization cannot substitute for runtime reliability.</b>",
  footleft="bun.com docs · The Register 2026-04 · Prisma 2026-06 · State of JS 2025",
 ),
 "zh": dict(
  title="图 5 — 用 2021 年的方法审视 Bun",
  figno="图 05 — 每个优点都是双刃剑",
  h1="Golang 篇的方法，原样用到 Bun 身上",
  subtitle="2021 年那篇 Golang 文章把每个被吹捧的特性都当作双刃剑来审视。现在把 Bun 放进同一张表。",
  plus="优点", minus="另一面刃",
  rows=[
   ("单二进制、开箱即全家桶",
    "工具链复杂度趋零；安装速度 <b>大幅领先</b>——各路独立评测中复现最一致的优点",
    "需要保持兼容的表面积同样暴涨；<b>5,000+ 未关闭 issue</b>；16 个 Node 模块部分兼容、3 个未实现（官方文档自认）"),
   ("速度优先的工程文化",
    "基准与迭代节奏拉来了 <b>21% 的受访使用者</b>（State of JS 2025，同比 +4pt）",
    "长时运行进程 <b>内存泄漏</b>；OpenCode 迁出，理由是“内存问题、崩溃、糟糕的 Windows 支持”"),
   ("快速演进、AI 加速开发",
    "功能交付极快；1.x 两年内塞进运行时、SQL、Redis、全栈 dev server",
    "生产环境有稳定性折价；canary 与稳定版的悖论——<b>Prisma 相信的是跑通测试的构建</b>，不是版本标签"),
  ],
  verdict="社区共识本身就是判决书：开发用 <code>bun install</code> 提速，生产继续跑 Node——<b>循环延迟的优化，替代不了运行时的可靠性。</b>",
  footleft="bun.com 文档 · The Register 2026-04 · Prisma 2026-06 · State of JS 2025",
 ),
}

for lang, d in F4.items():
    rows = []
    for trait, plus, minus in d["rows"]:
        rows.append(f"""
      <div class="trow">
        <div class="trait">{trait}</div>
        <div class="pane plus">{plus}</div>
        <div class="pane minus">{minus}</div>
      </div>""")
    body = f"""
    <div class="heads"><div class="spacer"></div><div class="h plus">{d['plus']}</div><div class="h minus">{d['minus']}</div></div>
    <div class="trows">{''.join(rows)}</div>
    <div class="verdictline">{d['verdict']}</div>"""
    emit("figure-5-bun-double-edge", lang, d["title"], d["figno"], d["h1"], d["subtitle"], body, d["footleft"], F4_CSS)

# ---------------------------------------------------------------- figure 5
F5_CSS = """
  .plotwrap { display: flex; justify-content: center; }
  .plot { position: relative; width: 700px; height: 560px; margin: 8px 0 4px 0; }
  .quad { position: absolute; width: 50%; height: 50%; }
  .q1 { right: 0; top: 0; background: #e8f5e9; border-radius: 0 14px 0 0; }
  .q2 { left: 0; top: 0; background: #eef4fb; border-radius: 14px 0 0 0; }
  .q3 { left: 0; bottom: 0; background: #f5f5f5; border-radius: 0 0 0 14px; }
  .q4 { right: 0; bottom: 0; background: #fff3e0; border-radius: 0 0 14px 0; }
  .qlabel { position: absolute; font-family: 'JetBrains Mono', monospace; font-size: 12px;
    font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; padding: 4px 10px;
    border-radius: 7px; background: rgba(255,255,255,0.85); }
  .ql1 { right: 12px; top: 12px; color: var(--ok-stroke); border: 1px solid var(--ok-stroke); }
  .ql2 { left: 12px; top: 12px; color: var(--info-stroke); border: 1px solid var(--info-stroke); }
  .ql3 { left: 12px; bottom: 12px; color: var(--ink-faint); border: 1px solid var(--ink-faint); }
  .ql4 { right: 12px; bottom: 12px; color: var(--warn-stroke); border: 1px solid var(--warn-stroke); }
  .axis { position: absolute; background: var(--ink-soft); }
  .ax-x { left: 0; right: 0; top: 50%; height: 2px; }
  .ax-y { top: 0; bottom: 0; left: 50%; width: 2px; }
  .pt { position: absolute; transform: translate(-50%, -50%); z-index: 3; }
  .pt .dot { border-radius: 50%; border: 3px solid #fff;
    margin: 0 auto; box-shadow: 0 0 0 2px currentColor; background: currentColor; }
  .pt .lbl { font-size: 13px; font-weight: 600; white-space: nowrap; margin-top: 5px;
    background: rgba(255,255,255,0.9); padding: 2px 7px; border-radius: 6px; color: #1f1f1f; }
  .legend { display: flex; justify-content: center; align-items: center; gap: 10px;
    margin: 10px auto 0 auto; font-size: 12.5px; color: var(--ink-soft); }
  .legend .d { border-radius: 50%; background: #8a8a8a; display: inline-block; }
  .axcap { display: flex; justify-content: space-between; width: 700px; margin: 6px auto 0 auto;
    font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--ink-soft); }
  .ycap { position: absolute; left: 50%; transform: translateX(-50%);
    font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--ink-soft);
    background: rgba(255,255,255,0.9); padding: 2px 8px; border-radius: 6px; z-index: 2; }
  .ycap.top { top: 8px; transform: translateX(calc(-100% - 10px)); } .ycap.bot { bottom: 8px; }
"""

F5 = {
 "en": dict(
  title="Figure 6 — A two-axis selection frame",
  figno="Figure 06 — Joint DX, qualitatively",
  h1="Loop latency × verification signal density",
  subtitle="Qualitative placements from published incremental/watch-mode data — X judges the inner loop, not cold full builds. Dot color follows the quadrant (purple = ecosystem exemplars, not languages); dot size encodes training-corpus adequacy, the ceiling on first-draft quality. Reliability and ecosystem maturity remain entry tickets outside the chart.",
  quads=("Joint-DX sweet spot", "Trustworthy but sluggish", "Hard mode for agents", "Fast but unverifiable"),
  xl=("slower feedback loop", "faster feedback loop"),
  legend=("Dot size = training corpus:", "rich", "medium", "thin", "purple = ecosystem (framework/tool)"),
  yl=("dense verification signals ↑", "sparse signals ↓"),
  pts=[
   ("Rust", 0.55, 0.96, "M", "right"),
   ("Swift", 0.38, 0.86, "S", "right"),
   ("Kotlin", 0.48, 0.80, "M", "top"),
   ("TS on JS-based tsc", 0.49, 0.71, "L", "right"),
   ("Hono + Zod contract", 0.66, 0.90, "L", "bottom"),
   ("C#", 0.70, 0.74, "L", "top"),
   ("Java", 0.70, 0.64, "L", "bottom"),
   ("TS 7 native", 0.80, 0.78, "L", "bottom"),
   ("Dart", 0.88, 0.82, "S", "top"),
   ("Bun, today", 0.95, 0.68, "L", "bottom"),
   ("Go", 0.90, 0.58, "L", "bottom"),
   ("Python, typical setup", 0.80, 0.45, "L", "top"),
   ("PHP", 0.84, 0.40, "L", "bottom"),
   ("C/C++", 0.35, 0.40, "L", "right"),
   ("Ruby", 0.82, 0.17, "S", "bottom"),
   ("Plain JavaScript", 0.96, 0.13, "L", "top"),
  ],
  footleft="Incremental-loop data, see body",
 ),
 "zh": dict(
  title="图 6 — 两轴选型框架",
  figno="图 06 — 人机联合 DX（定性）",
  h1="反馈周期 × 验证信号密度",
  subtitle="位置为基于公开增量/watch 模式数据的定性判断——X 轴衡量内循环而非全量构建；点的颜色随象限（紫色为生态层示例，非语言）；大小表示训练语料充足度，即首稿质量的上限。可靠性与生态成熟度仍是图外的入场券。",
  quads=("联合 DX 甜区", "可信但迟缓", "agent 困难模式", "快而不可验证"),
  xl=("反馈循环慢", "反馈循环快"),
  legend=("点的大小 = 训练语料：", "充足", "一般", "薄弱", "紫色 = 生态层（框架/工具）"),
  yl=("验证信号密集 ↑", "信号稀疏 ↓"),
  pts=[
   ("Rust", 0.55, 0.96, "M", "right"),
   ("Swift", 0.38, 0.86, "S", "right"),
   ("Kotlin", 0.48, 0.80, "M", "top"),
   ("TS（JS 版 tsc）", 0.49, 0.71, "L", "right"),
   ("Hono + Zod 契约", 0.66, 0.90, "L", "bottom"),
   ("C#", 0.70, 0.74, "L", "top"),
   ("Java", 0.70, 0.64, "L", "bottom"),
   ("TS 7 原生版", 0.80, 0.78, "L", "bottom"),
   ("Dart", 0.88, 0.82, "S", "top"),
   ("Bun（现状）", 0.95, 0.68, "L", "bottom"),
   ("Go", 0.90, 0.58, "L", "bottom"),
   ("Python（典型配置）", 0.80, 0.45, "L", "top"),
   ("PHP", 0.84, 0.40, "L", "bottom"),
   ("C/C++", 0.35, 0.40, "L", "right"),
   ("Ruby", 0.82, 0.17, "S", "bottom"),
   ("纯 JavaScript", 0.96, 0.13, "L", "top"),
  ],
  footleft="增量循环数据见正文",
 ),
}

SIZES = {"L": 17, "M": 12.5, "S": 9}
ECO_NAMES = {"Hono + Zod contract", "Hono + Zod 契约", "Bun, today", "Bun（现状）"}
def quad_color(x, y):
    if x >= 0.5 and y >= 0.5: return "#2e7d32"
    if x < 0.5 and y >= 0.5: return "#01579b"
    if x >= 0.5 and y < 0.5: return "#e65100"
    return "#616161"
for lang, d in F5.items():
    pts = []
    for name, x, y, tier, side in d["pts"]:
        left = x * 100
        top = (1 - y) * 100
        px = SIZES[tier]
        color = "#7b1fa2" if name in ECO_NAMES else quad_color(x, y)
        def dot(margin):
            return f'<div class="dot" style="width:{px}px;height:{px}px;margin:{margin}"></div>'
        if side == "top":
            inner = f'<div class="lbl" style="margin-top:0;margin-bottom:5px">{name}</div>{dot("0 auto")}'
        elif side == "right":
            inner = f'<div style="display:flex;align-items:center;gap:7px">{dot("0")}<div class="lbl" style="margin-top:0">{name}</div></div>'
        else:
            inner = f'{dot("0 auto")}<div class="lbl">{name}</div>'
        pts.append(f'<div class="pt" style="left:{left}%;top:{top}%;color:{color};text-align:center">{inner}</div>')
    q1, q2, q3, q4 = d["quads"]
    body = f"""
    <div class="plotwrap">
    <div class="plot">
      <div class="quad q1"></div><div class="quad q2"></div><div class="quad q3"></div><div class="quad q4"></div>
      <div class="axis ax-x"></div><div class="axis ax-y"></div>
      <div class="qlabel ql1">{q1}</div>
      <div class="qlabel ql2">{q2}</div>
      <div class="qlabel ql3">{q3}</div>
      <div class="qlabel ql4">{q4}</div>
      <div class="ycap top">{d['yl'][0]}</div>
      <div class="ycap bot">{d['yl'][1]}</div>
      {''.join(pts)}
    </div>
    </div>
    <div class="axcap"><div>← {d['xl'][0]}</div><div>{d['xl'][1]} →</div></div>
    <div class="legend"><span>{d['legend'][0]}</span>
      <span class="d" style="width:17px;height:17px"></span><span>{d['legend'][1]}</span>
      <span class="d" style="width:12.5px;height:12.5px"></span><span>{d['legend'][2]}</span>
      <span class="d" style="width:9px;height:9px"></span><span>{d['legend'][3]}</span>
      <span style="color:#d4d4d4">·</span>
      <span class="d" style="width:12.5px;height:12.5px;background:#7b1fa2"></span><span>{d['legend'][4]}</span>
    </div>"""
    emit("figure-6-quadrant", lang, d["title"], d["figno"], d["h1"], d["subtitle"], body, d["footleft"], F5_CSS)

print("done")


# ---------------------------------------------------------------- figure 3 (new): compounding
F3C_CSS = """
  .cwrap { margin-top: 4px; }
"""

def f3c_svg(T):
    slow_beads = "".join(f'<rect x="{18+i*56}" y="66" width="48" height="22" rx="6" fill="#e1f5fe" stroke="#01579b" stroke-width="1.2"/>' for i in range(6))
    fast_beads = "".join(f'<rect x="{18+i*5.6:.1f}" y="156" width="3.4" height="22" rx="1.5" fill="#2e7d32"/>' for i in range(60))
    return f"""
<svg class="cwrap" width="772" height="322" viewBox="0 0 772 322" font-family="Inter, 'Noto Sans SC', sans-serif">
  <!-- ============ Panel A: speed ============ -->
  <g>
    <text x="18" y="20" font-size="15" font-weight="700" fill="#1f1f1f">{T['pa_title']}</text>
    <text x="18" y="40" font-size="12" fill="#525252">{T['pa_sub']}</text>

    <text x="18" y="60" font-size="12" font-weight="600" fill="#01579b">{T['slow_lbl']}</text>
    {slow_beads}
    <text x="18" y="108" font-size="12.5" font-weight="700" fill="#01579b" font-family="'JetBrains Mono', monospace">{T['slow_stat']}</text>

    <text x="18" y="150" font-size="12" font-weight="600" fill="#2e7d32">{T['fast_lbl']}</text>
    {fast_beads}
    <text x="18" y="198" font-size="12.5" font-weight="700" fill="#2e7d32" font-family="'JetBrains Mono', monospace">{T['fast_stat']}</text>

    <text x="18" y="232" font-size="11.5" fill="#8a8a8a">{T['pa_cap']}</text>
  </g>

  <line x1="386" y1="10" x2="386" y2="240" stroke="#e0e0e0" stroke-width="1.5"/>

  <!-- ============ Panel B: quality ============ -->
  <g transform="translate(406,0)">
    <text x="0" y="20" font-size="15" font-weight="700" fill="#1f1f1f">{T['pb_title']}</text>
    <text x="0" y="40" font-size="12" fill="#525252">{T['pb_sub']}</text>

    <!-- axes -->
    <line x1="26" y1="58" x2="26" y2="204" stroke="#525252" stroke-width="1.5"/>
    <line x1="26" y1="204" x2="350" y2="204" stroke="#525252" stroke-width="1.5"/>
    <text x="0" y="52" font-size="10.5" fill="#8a8a8a">{T['ylab']}</text>
    <text x="350" y="218" font-size="10.5" fill="#8a8a8a" text-anchor="end">{T['xlab']}</text>

    <!-- same first draft marker -->
    <circle cx="26" cy="70" r="4.5" fill="#7b1fa2"/>
    <text x="36" y="72" font-size="11" font-weight="600" fill="#7b1fa2">{T['start']}</text>

    <!-- dense: converges -->
    <path d="M 26 70 C 60 78 85 168 130 190 C 170 200 260 202 350 202"
          fill="none" stroke="#2e7d32" stroke-width="3"/>
    <text x="112" y="188" font-size="11.5" font-weight="600" fill="#2e7d32">{T['dense_lbl']}</text>

    <!-- sparse: plateaus -->
    <path d="M 26 70 C 90 78 180 105 350 118" fill="none" stroke="#c62828" stroke-width="3"/>
    <text x="150" y="94" font-size="11.5" font-weight="600" fill="#c62828">{T['sparse_lbl']}</text>
    <line x1="320" y1="122" x2="320" y2="200" stroke="#c62828" stroke-width="1.2" stroke-dasharray="4 3"/>
    <text x="314" y="150" font-size="10.5" fill="#c62828" text-anchor="end">{T['escape1']}</text>
    <text x="314" y="164" font-size="10.5" fill="#c62828" text-anchor="end">{T['escape2']}</text>

    <text x="0" y="232" font-size="11.5" fill="#8a8a8a">{T['pb_cap']}</text>
  </g>

  <!-- ============ bottom bar ============ -->
  <rect x="6" y="254" width="760" height="56" rx="12" fill="#fffdf0" stroke="#c62828" stroke-width="0" />
  <rect x="6" y="254" width="4" height="56" rx="2" fill="#c62828"/>
  <text x="26" y="277" font-size="13.5" font-weight="700" fill="#c62828">{T['bar_t']}</text>
  <text x="26" y="298" font-size="13" fill="#1f1f1f">{T['bar_s']}</text>
</svg>"""

F3C = {
 "en": dict(
  title="Figure 3 — Why these two criteria",
  figno="Figure 03 — Speed × quality, compounded",
  h1="The loop turns both variables into compound interest",
  subtitle="Same hour of work, same quality of first draft. Latency decides how many rounds you get; signal density decides how much each round purifies.",
  pa_title="Loop latency → delivery speed",
  pa_sub="one hour of agent work, two stacks",
  slow_lbl="10 minutes per round",
  slow_stat="6 rounds/hour",
  fast_lbl="1 minute per round",
  fast_stat="60 rounds/hour — 10×",
  pa_cap="Output ceiling = round count; latency divides into throughput.",
  pb_title="Signal density → delivery quality",
  pb_sub="defects remaining, round after round",
  pb_cap="More machine adjudication per round = faster convergence.",
  ylab="defects remaining",
  xlab="rounds →",
  start="same first draft",
  dense_lbl="dense signals: converge per round",
  sparse_lbl="sparse signals: plateaus",
  escape1="the gap leaks to humans",
  escape2="and production",
  bar_t="Delivery = speed × quality.",
  bar_s="By the day these numbers barely mattered; by the round they compound into first-class criteria.",
  footleft="Illustrative dynamics — evidence in the article body",
 ),
 "zh": dict(
  title="图 3 — 为什么恰好是这两个判据",
  figno="图 03 — 速度 × 质量的复利",
  h1="循环把速度和质量都变成了复利",
  subtitle="同样一小时的工作，同样质量的首稿。反馈周期决定你能试多少轮；信号密度决定每一轮能净化多少。",
  pa_title="反馈周期 → 交付速度",
  pa_sub="agent 工作一小时，两种技术栈",
  slow_lbl="每轮 10 分钟",
  slow_stat="6 轮/小时",
  fast_lbl="每轮 1 分钟",
  fast_stat="60 轮/小时 —— 10 倍",
  pa_cap="agent 的产出上限就是循环次数：一轮越快，吞吐越大。",
  pb_title="信号密度 → 交付质量",
  pb_sub="一轮又一轮之后，还剩多少缺陷",
  pb_cap="每轮机器能裁决得越多，收敛越快；剩下的都要人来兜底。",
  ylab="剩余缺陷",
  xlab="轮次 →",
  start="同一份首稿",
  dense_lbl="密集信号：逐轮收敛",
  sparse_lbl="稀疏信号：停在半路",
  escape1="这段差距逃逸给",
  escape2="人工评审与生产",
  bar_t="交付 = 速度 × 质量。",
  bar_s="按天迭代时，这两个数字无关痛痒；按轮迭代时，它们被复利放大——这就是两个判据升为一等公民的原因。",
  footleft="示意性动态——证据见正文",
 ),
}

for lang, d in F3C.items():
    emit("figure-3-compounding", lang, d["title"], d["figno"], d["h1"], d["subtitle"], f3c_svg(d), d["footleft"], F3C_CSS)


# ---------------------------------------------------------------- figure 7: dimension table
F7_CSS = """
  .dim { width: 100%; border-collapse: collapse; }
  .dim th { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.06em;
    text-transform: uppercase; color: var(--ink-faint); text-align: left; padding: 6px 8px;
    border-bottom: 2px solid var(--line); }
  .dim td { padding: 7px 8px; border-bottom: 1px solid #ececec; font-size: 13px; line-height: 1.4;
    vertical-align: middle; }
  .dim td.name { font-weight: 600; white-space: nowrap; }
  .dim tr.eco td.name { font-weight: 600; color: var(--hi-stroke); }
  .dots { white-space: nowrap; letter-spacing: 1.5px; font-size: 13px; }
  .dots .on { color: var(--ink); } .dots .off { color: #d4d4d4; }
  .chip { display: inline-block; font-size: 11.5px; font-weight: 600; padding: 2px 9px;
    border-radius: 8px; border: 1.2px solid; white-space: nowrap; }
  .c-rich { color: var(--ok-stroke); border-color: var(--ok-stroke); background: var(--ok-fill); }
  .c-mid  { color: var(--warn-stroke); border-color: var(--warn-stroke); background: var(--warn-fill); }
  .c-thin { color: var(--err-stroke); border-color: var(--err-stroke); background: var(--err-fill); }
  .dim td.note { color: var(--ink-soft); font-size: 12px; line-height: 1.35; }
"""

def rating(v):
    n = max(1, min(5, round(v * 5)))
    return '<span class="dots">' + '<span class="on">●</span>' * n + '<span class="off">●</span>' * (5 - n) + '</span>'

F7_ROWS = [
  # key, x, y, tier, zh_name, zh_note, en_name, en_note, eco
  (0.49,0.71,"rich","TS（JS 版 tsc）","大项目 watch 增量 4–10s；strict 信号密但有 any 逃逸",
   "TS on JS-based tsc","watch-mode 4–10s on large projects; dense but any-escapable",0),
  (0.80,0.78,"rich","TS 7 原生版","同语义约 10×：VS Code 77.8s→7.5s",
   "TS 7 native","same semantics, ~10x: VS Code 77.8s→7.5s",0),
  (0.90,0.58,"rich","Go","秒级编译+构建缓存；nil 与被忽略的 error 逃逸。榜单约 #12，但基础设施语料厚、Aider 六语言核心集之一——定性上调",
   "Go","second-level builds + cache; nil and ignored errors escape. Ranks ~#12, but infra corpus is deep and it sits in Aider's six-language core set — upgraded qualitatively",0),
  (0.96,0.13,"rich","纯 JavaScript","零编译；语法错误之外几乎无编辑期信号",
   "Plain JavaScript","zero compile; almost no edit-time signals beyond syntax",0),
  (0.80,0.45,"rich","Python（典型配置）","解释执行；类型提示 86% 常态使用但属渐进",
   "Python, typical","interpreted; type hints at 86% adoption, but gradual",0),
  (0.55,0.96,"mid","Rust","cargo check 增量 1–7s（55% 用户 >10s）；借用检查是信号天花板。TIOBE 前 10 / RedMonk #20；实用上够用，但多项基准仍显示低于 Python——保守取一般",
   "Rust","cargo check 1–7s incr. (55% see >10s); borrow checker tops signals. TIOBE top-10 / RedMonk #20; serviceable in practice, yet benchmarks consistently trail Python — held at medium",0),
  (0.70,0.64,"rich","Java","Gradle 增量把小改动降到秒级；NPE 逃逸类型系统",
   "Java","Gradle incremental gets small edits to seconds; NPE escapes types",0),
  (0.55,0.80,"mid","Kotlin","K2 全量最高 +94%，增量改善有限；内建空安全",
   "Kotlin","K2 up to +94% full builds, incremental modest; built-in null safety",0),
  (0.70,0.74,"rich","C#","Roslyn 增量+热重载；NRT 新项目默认开、三方标注不齐",
   "C#","Roslyn incremental + hot reload; NRT default on new projects",0),
  (0.35,0.40,"rich","C/C++","单元秒级但头文件级联+链接慢；UB/内存错误逃逸编译期",
   "C/C++","unit rebuilds fast, header cascades slow; UB escapes compile time",0),
  (0.80,0.42,"rich","PHP","刷新即生效；类型为运行时强制，PHPStan 采用约 36%",
   "PHP","refresh-to-run; runtime-enforced types, PHPStan at ~36% adoption",0),
  (0.82,0.17,"thin","Ruby","即改即跑；Sorbet 基本限于大厂。RedMonk #9 但基准准确率极低——定性下调",
   "Ruby","edit-and-run; Sorbet stays big-co. RedMonk #9 yet benchmark accuracy collapses — downgraded qualitatively",0),
  (0.40,0.86,"thin","Swift","类型推断可超时放弃、增量级联失效；强类型+Optional",
   "Swift","type inference can bail out, incremental cascades; strong types + optionals",0),
  (0.90,0.75,"thin","Dart","亚秒热重载+健全空安全；语料与评测双薄",
   "Dart","sub-second hot reload + sound null safety; thin corpus and evals",0),
  (0.66,0.90,"rich","Hono + Zod（生态层）","契约跨栈、编译期校验——生态层抬升语言位置的示例",
   "Hono + Zod (ecosystem)","cross-stack contract checked at compile time — ecosystem lifting a language",1),
  (0.95,0.68,"rich","Bun（生态层）","install 18–30×、test ~20×——回路加速器示例",
   "Bun (ecosystem)","install 18–30x, test ~20x — a loop accelerator",1),
]

F7_META = {
 "en": dict(
  title="Figure 7 — The three dimensions, unpacked",
  figno="Figure 07 — Scores behind the quadrant",
  h1="Loop, signals, corpus — one row per stack",
  subtitle="The same judgments as Figure 6, laid out by dimension with the one-line basis for each. Corpus tiers are quantitative first (top-6 across major rankings = rich; roughly 7–15 = medium) with flagged qualitative adjustments. Languages only — frameworks, libraries and toolchains often move these scores, which is exactly what the two ecosystem rows illustrate.",
  heads=("Stack", "Feedback loop", "Signal density", "Corpus", "One-line basis"),
  chips={"rich": "rich", "mid": "medium", "thin": "thin"},
  footleft="Sources in the article body · rankings: Octoverse 2025 / RedMonk 2026-01 / TIOBE 2026-07",
 ),
 "zh": dict(
  title="图 7 — 三个维度摊开看",
  figno="图 07 — 象限图背后的打分",
  h1="反馈周期 · 信号密度 · 语料——每栈一行",
  subtitle="与图 6 同一份判断，按维度摊开并附一句依据。语料分档以榜单为定量基准（各大榜稳居前 6 = 充足；约 7–15 名 = 一般），定性修正处已注明。只比语言——框架、库与工具链常会改变这些分数，表末两行生态层示例说的就是这件事。",
  heads=("语言/栈", "反馈周期", "信号密度", "训练语料", "依据一句话"),
  chips={"rich": "充足", "mid": "一般", "thin": "薄弱"},
  footleft="来源见正文 · 榜单：Octoverse 2025 / RedMonk 2026-01 / TIOBE 2026-07",
 ),
}

for lang, meta in F7_META.items():
    rows = []
    for x, y, tier, zh_name, zh_note, en_name, en_note, eco in F7_ROWS:
        name = zh_name if lang == "zh" else en_name
        note = zh_note if lang == "zh" else en_note
        chipcls = {"rich": "c-rich", "mid": "c-mid", "thin": "c-thin"}[tier]
        rows.append(f'<tr class="{"eco" if eco else ""}"><td class="name">{name}</td>'
                    f'<td>{rating(x)}</td><td>{rating(y)}</td>'
                    f'<td><span class="chip {chipcls}">{meta["chips"][tier]}</span></td>'
                    f'<td class="note">{note}</td></tr>')
    h = meta["heads"]
    body = (f'<table class="dim"><thead><tr><th>{h[0]}</th><th>{h[1]}</th><th>{h[2]}</th>'
            f'<th>{h[3]}</th><th>{h[4]}</th></tr></thead><tbody>{"".join(rows)}</tbody></table>')
    emit("figure-7-dimensions", lang, meta["title"], meta["figno"], meta["h1"], meta["subtitle"], body, meta["footleft"], F7_CSS)
