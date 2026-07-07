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
  subtitle="2021 年系列文章的所有选型判据，量纲都是人——学习曲线、阅读舒适度、满意度问卷。",
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
    "简洁 × 稳定 × 快，<b>辩证审视</b>——每个优点都投下阴影",
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
  .loopwrap { position: relative; padding: 8px 0 0 0; }
  .lat {
    display: flex; align-items: center; gap: 10px; margin: 0 0 14px 0;
  }
  .lat .brace { flex: 1; height: 14px; border: 2.5px solid var(--warn-stroke); border-bottom: none;
    border-radius: 10px 10px 0 0; }
  .lat .label {
    flex: none; font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 600;
    color: var(--warn-stroke); background: var(--warn-fill); border: 1.5px solid var(--warn-stroke);
    border-radius: 8px; padding: 5px 12px;
  }
  .flow { display: flex; align-items: stretch; gap: 0; }
  .node {
    border: 1.5px solid; border-radius: 12px; padding: 14px 14px; background: #fff;
    display: flex; flex-direction: column; justify-content: center; text-align: center;
  }
  .node .t { font-weight: 600; font-size: 15px; line-height: 1.3; }
  .node .s { font-size: 12.5px; color: var(--ink-soft); margin-top: 5px; line-height: 1.4; }
  .n-edit { border-color: var(--info-stroke); background: var(--info-fill); width: 150px; }
  .n-verify { border-color: var(--warn-stroke); background: var(--warn-fill); width: 172px; }
  .n-sig { border-color: var(--hi-stroke); background: var(--hi-fill); width: 168px; }
  .arrow { display: flex; align-items: center; padding: 0 2px; }
  .arrow svg { display: block; }
  .outs { display: flex; flex-direction: column; gap: 12px; justify-content: center; }
  .out { border: 1.5px solid; border-radius: 12px; padding: 10px 14px; width: 240px; background: #fff; }
  .out .t { font-weight: 600; font-size: 14.5px; }
  .out .s { font-size: 12.5px; color: var(--ink-soft); margin-top: 3px; line-height: 1.4; }
  .o-ok { border-color: var(--ok-stroke); background: var(--ok-fill); }
  .o-ok .t { color: var(--ok-stroke); }
  .o-err { border-color: var(--err-stroke); background: var(--err-fill); }
  .o-err .t { color: var(--err-stroke); }
  .back { margin-top: 16px; display: flex; align-items: center; gap: 10px; }
  .back svg { flex: 1; display: block; }
  .back .label {
    flex: none; font-family: 'JetBrains Mono', monospace; font-size: 12.5px; font-weight: 600;
    color: var(--ok-stroke);
  }
  .density {
    margin-top: 20px; display: flex; gap: 14px;
  }
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

ARROW = """<div class="arrow"><svg width="34" height="20" viewBox="0 0 34 20">
  <line x1="0" y1="10" x2="26" y2="10" stroke="#8a8a8a" stroke-width="2.5"/>
  <polygon points="24,4 34,10 24,16" fill="#8a8a8a"/></svg></div>"""

F2 = {
 "en": dict(
  title="Figure 2 — The agent loop",
  figno="Figure 02 — Two new selection criteria",
  h1="The loop an agent runs, and what your stack controls",
  subtitle="Per task the loop closes dozens to hundreds of times. The stack sets its latency; the stack decides how much correctness is machine-decidable at the branch.",
  lat="LOOP LATENCY&nbsp;·&nbsp;edit → trusted feedback",
  edit=("Agent edits code", "the write step is cheap"),
  verify=("Build · type-check · test", "install, compile, startup"),
  sig=("Signals", "what comes back, and can it be trusted?"),
  ok=("Agent self-corrects", "deterministic, machine-readable — tsc error, failed assertion"),
  err=("Human must intervene", "weak or absent signals — runtime-only failure"),
  back="SELF-CORRECTION LOOPS BACK — HUNDREDS OF ROUNDS",
  good="<b>Dense signal:</b> a <code>tsc</code> error is free, deterministic, machine-readable — same defect, same message, same line. 94% of compiler errors in LLM output are type-check failures.",
  bad="<b>Sparse signal:</b> a production <code>TypeError</code> is expensive to reach, stochastic to reproduce, and needs a human to interpret.",
  footleft="GitHub Blog 2026 (94% type-check failures) · loop model: this article",
 ),
 "zh": dict(
  title="图 2 — agent 循环",
  figno="图 02 — 两个新选型判据",
  h1="agent 跑的循环，以及技术栈控制着什么",
  subtitle="一个任务里这个循环要闭合几十到几百次。技术栈决定它的延迟，也决定分叉处有多少正确性是机器可判定的。",
  lat="循环延迟 · 修改 → 可信反馈",
  edit=("agent 修改代码", "写代码这一步很便宜"),
  verify=("构建 · 类型检查 · 测试", "安装、编译、启动"),
  sig=("信号", "返回了什么？能信吗？"),
  ok=("agent 自我纠正", "确定性、机器可读——tsc 报错、断言失败"),
  err=("人类介入", "信号微弱或缺失——仅运行时暴露"),
  back="自我纠正回到起点——成百上千轮",
  good="<b>密集信号：</b>一条 <code>tsc</code> 报错零成本、确定性、机器可读——同一缺陷、同一消息、同一行号。LLM 产出代码的编译错误中 94% 是类型检查失败。",
  bad="<b>稀疏信号：</b>生产环境的 <code>TypeError</code> 触达昂贵、复现随机、还需要人来解释。",
  footleft="GitHub Blog 2026（94% 为类型检查失败）· 循环模型：本文",
 ),
}

for lang, d in F2.items():
    body = f"""
    <div class="loopwrap">
      <div class="lat"><div class="label">{d['lat']}</div><div class="brace"></div></div>
      <div class="flow">
        <div class="node n-edit"><div class="t">{d['edit'][0]}</div><div class="s">{d['edit'][1]}</div></div>
        {ARROW}
        <div class="node n-verify"><div class="t">{d['verify'][0]}</div><div class="s">{d['verify'][1]}</div></div>
        {ARROW}
        <div class="node n-sig"><div class="t">{d['sig'][0]}</div><div class="s">{d['sig'][1]}</div></div>
        {ARROW}
        <div class="outs">
          <div class="out o-ok"><div class="t">{d['ok'][0]}</div><div class="s">{d['ok'][1]}</div></div>
          <div class="out o-err"><div class="t">{d['err'][0]}</div><div class="s">{d['err'][1]}</div></div>
        </div>
      </div>
      <div class="back">
        <svg height="26" viewBox="0 0 640 26" preserveAspectRatio="none" style="width:100%">
          <path d="M 630 2 L 630 16 L 14 16 L 14 6" fill="none" stroke="#2e7d32" stroke-width="2.5" stroke-dasharray="7 5"/>
          <polygon points="8,8 14,0 20,8" fill="#2e7d32"/>
        </svg>
      </div>
      <div style="text-align:center;margin-top:2px" class="back"><div class="label" style="margin:0 auto">{d['back']}</div></div>
      <div class="density">
        <div class="cell good">{d['good']}</div>
        <div class="cell bad">{d['bad']}</div>
      </div>
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
  title="Figure 3 — 2026 evidence, 2021 echoes",
  figno="Figure 03 — The verdicts, revised",
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
    ("v-warn", "Answered — but the double-edged sword cuts (Figure 4)")),
  ],
  footleft="Microsoft devblogs · State of JS 2025 · hono.dev · bun.com",
 ),
 "zh": dict(
  title="图 3 — 2026 年的证据与 2021 年的回声",
  figno="图 03 — 判决修订",
  h1="三组证据，各自改判了什么",
  subtitle="每一项 2025–2026 年的进展，都不偏不倚落在 2021 年系列的某个论点上。",
  heads=("2026 年的证据", "2021 年的回声", "判决修订"),
  rows=[
   (("typescript-go：tsc 移植到 Go", "约 10 倍提速，已至 RC；同样的检查，十分之一的延迟"),
    ("TS 篇：错误前置 · Golang 篇：编译速度“玩笑行”",),
    ("v-ok", "加冕——两个论点在 agent 经济学中会合")),
   (("Hono 进 S 级，Express 使用率第一", "State of JS 2025：首年参评满意度 >90%"),
    ("C# 篇：满意度领先，市场份额滞后",),
    ("v-hi", "框架原样复用——领先指标再次领先")),
   (("Hono RPC + Zod 全栈契约", "服务端类型流向客户端；契约漂移直接编译失败"),
    ("TS 篇：类型即协作契约",),
    ("v-info", "升级——契约跨过了网络边界")),
   (("Bun：一个二进制吞下工具链", "运行时 + 包管理 + 打包 + 测试"),
    ("前端工程化篇：500MB 工具链之怨",),
    ("v-warn", "得到回应——但双刃剑同样锋利（见图 4）")),
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
    emit("figure-3-verdicts", lang, d["title"], d["figno"], d["h1"], d["subtitle"], body, d["footleft"], F3_CSS)

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
  title="Figure 4 — Bun through the 2021 method",
  figno="Figure 04 — Every strength casts a shadow",
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
  title="图 4 — 用 2021 年的方法审视 Bun",
  figno="图 04 — 每个优点都投下阴影",
  h1="Golang 篇的方法，原样用到 Bun 身上",
  subtitle="2021 年那篇 Golang 文章给每个被吹捧的特性都配上了阴影。现在把 Bun 放进同一张表。",
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
    emit("figure-4-bun-double-edge", lang, d["title"], d["figno"], d["h1"], d["subtitle"], body, d["footleft"], F4_CSS)

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
  .pt .dot { width: 15px; height: 15px; border-radius: 50%; border: 3px solid #fff;
    margin: 0 auto; box-shadow: 0 0 0 2px currentColor; background: currentColor; }
  .pt .lbl { font-size: 13px; font-weight: 600; white-space: nowrap; margin-top: 5px;
    background: rgba(255,255,255,0.9); padding: 2px 7px; border-radius: 6px; }
  .axcap { display: flex; justify-content: space-between; width: 700px; margin: 6px auto 0 auto;
    font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--ink-soft); }
  .ycap { position: absolute; left: 50%; transform: translateX(-50%);
    font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--ink-soft);
    background: rgba(255,255,255,0.9); padding: 2px 8px; border-radius: 6px; z-index: 2; }
  .ycap.top { top: 8px; } .ycap.bot { bottom: 8px; }
"""

F5 = {
 "en": dict(
  title="Figure 5 — A two-axis selection frame",
  figno="Figure 05 — Joint DX, qualitatively",
  h1="Loop latency × verification signal density",
  subtitle="Placements are qualitative judgments from this article's evidence — not scores. Reliability and ecosystem maturity remain entry tickets outside both axes.",
  quads=("Joint-DX sweet spot", "Trustworthy but sluggish", "Hard mode for agents", "Fast but unverifiable"),
  xl=("slower feedback loop", "faster feedback loop"),
  yl=("dense verification signals ↑", "sparse signals ↓"),
  pts=[
   ("TS on JS-based tsc", 0.36, 0.80, "#01579b", "right"),
   ("TS 7 native", 0.82, 0.82, "#2e7d32", "right"),
   ("Go", 0.86, 0.70, "#2e7d32", "bottom"),
   ("Hono + Zod contract", 0.62, 0.91, "#7b1fa2", "bottom"),
   ("Plain JavaScript", 0.60, 0.24, "#c62828", "bottom"),
   ("Python, typical setup", 0.52, 0.35, "#e65100", "top"),
   ("Bun runtime, today", 0.85, 0.44, "#e65100", "bottom"),
  ],
  footleft="Qualitative — evidence in the article body",
 ),
 "zh": dict(
  title="图 5 — 两轴选型框架",
  figno="图 05 — 人机联合 DX（定性）",
  h1="循环延迟 × 验证信号密度",
  subtitle="各点位置是基于本文证据的定性判断，不是打分。可靠性与生态成熟度是两轴之外的入场券。",
  quads=("联合 DX 甜区", "可信但迟缓", "agent 困难模式", "快而不可验证"),
  xl=("反馈循环慢", "反馈循环快"),
  yl=("验证信号密集 ↑", "信号稀疏 ↓"),
  pts=[
   ("TS（JS 版 tsc）", 0.36, 0.80, "#01579b", "right"),
   ("TS 7 原生版", 0.82, 0.82, "#2e7d32", "right"),
   ("Go", 0.86, 0.70, "#2e7d32", "bottom"),
   ("Hono + Zod 契约", 0.62, 0.91, "#7b1fa2", "bottom"),
   ("纯 JavaScript", 0.60, 0.24, "#c62828", "bottom"),
   ("Python（典型配置）", 0.52, 0.35, "#e65100", "top"),
   ("Bun 运行时（现状）", 0.85, 0.44, "#e65100", "bottom"),
  ],
  footleft="定性判断——证据见正文",
 ),
}

for lang, d in F5.items():
    pts = []
    for name, x, y, color, side in d["pts"]:
        left = x * 100
        top = (1 - y) * 100
        if side == "top":
            inner = f'<div class="lbl" style="margin-top:0;margin-bottom:5px">{name}</div><div class="dot"></div>'
        elif side == "right":
            inner = f'<div style="display:flex;align-items:center;gap:7px"><div class="dot" style="margin:0"></div><div class="lbl" style="margin-top:0">{name}</div></div>'
        else:
            inner = f'<div class="dot"></div><div class="lbl">{name}</div>'
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
    <div class="axcap"><div>← {d['xl'][0]}</div><div>{d['xl'][1]} →</div></div>"""
    emit("figure-5-quadrant", lang, d["title"], d["figno"], d["h1"], d["subtitle"], body, d["footleft"], F5_CSS)

print("done")
