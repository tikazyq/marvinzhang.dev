"""Annotated T3 screenshots (figures 4, 5). Canvas 760px; fonts 16-19px, title 28px."""
import pathlib
from gen_figures import HEAD, TAIL, EN as _unused  # noqa: F401  (reuses template)

HERE = pathlib.Path(__file__).parent
SRC_W = 924
# shots/*.png are already cropped by sanitize.mjs; coordinates below are in original-screenshot px.
OFF = {"sidebar.png": 240, "cpm-to-semon.png": 262, "semon-to-cpm.png": 262}

EXTRA = """
.shotwrap{position:relative;overflow:hidden;border-radius:14px;border:1.5px solid #d0d0d0;background:#111827}
.shotwrap img{position:absolute;left:0;display:block}
.box{position:absolute;border:2.5px solid;border-radius:8px}
.badge{position:absolute;width:28px;height:28px;border-radius:50%;color:#fff;font-size:16px;font-weight:700;
  display:flex;align-items:center;justify-content:center;font-family:'Inter',sans-serif}
.cols{display:flex;gap:22px;margin-top:22px}
.col{flex:1}
.cap{font-size:17px;font-weight:700;margin-bottom:8px}
.legend{margin-top:12px;font-size:16px;line-height:1.5;color:var(--soft)}
.legend div{display:flex;gap:8px;margin-top:6px}
.legend i{flex:none;width:24px;height:24px;border-radius:50%;color:#fff;font-style:normal;font-size:16px;font-weight:700;
  display:flex;align-items:center;justify-content:center}
.side{flex:1;position:relative}
.tag{position:absolute;left:0;right:0;padding:10px 14px;border-radius:10px;font-size:16px;line-height:1.45;background:#fff;border:1.5px solid}
.tag b{font-size:17px}
.brk{position:absolute;left:-14px;width:10px;border:2.5px solid #c62828;border-right:none;border-radius:6px 0 0 6px}
"""

def shot(src, w, top, bottom, marks):
    """Crop rows [top,bottom) of a 924px-wide phone screenshot to width w; marks are (y0,y1,color,num)."""
    s = w / SRC_W
    off = OFF[src]
    top = max(top, off)
    h = (bottom - top) * s
    out = [f'<div class="shotwrap" style="width:{w}px;height:{h:.0f}px">'
           f'<img src="shots/{src}" style="width:{w}px;top:{-(top-off)*s:.1f}px"/>']
    for y0, y1, col, num in marks:
        out.append(f'<div class="box" style="left:6px;right:6px;top:{(y0-top)*s:.1f}px;height:{(y1-y0)*s:.1f}px;border-color:{col}"></div>')
        if num:
            out.append(f'<div class="badge" style="right:-2px;top:{max(4,(y0-top)*s-12):.1f}px;background:{col}">{num}</div>')
    out.append("</div>")
    return "".join(out), h


def fig4():
    w = 330; s = w / SRC_W
    img, h = shot("sidebar.png", w, 100, 1820, [(262, 392, "#7b1fa2", ""), (402, 1810, "#c62828", "")])
    y = lambda v: (v - 240) * s
    side = f"""<div class="side" style="height:{h:.0f}px">
<div class="tag" style="top:{y(250):.0f}px;border-color:#7b1fa2"><b style="color:#7b1fa2">Chief PM</b><br/>跑在另一台机器上</div>
<div class="brk" style="top:{y(402):.0f}px;height:{y(1810)-y(402):.0f}px"></div>
<div class="tag" style="top:{y(700):.0f}px;border-color:#c62828"><b style="color:#c62828">9 个经理</b><br/>都是 Opus 5.5，一个项目一个</div>
<div class="tag" style="top:{y(1150):.0f}px;border-color:#2e7d32"><b style="color:#2e7d32">右侧的 +11、+53……</b><br/>各自开过的 PR 数，加起来 293 个</div>
<div class="tag" style="top:{y(1530):.0f}px;border-color:#01579b"><b style="color:#01579b">「Working」</b><br/>此刻还在跑的两个：Eval、Semon</div>
</div>"""
    body = f"""<div class="figno">图 1</div><h1>我手机上的 T3 Code：一个总监，九个经理</h1>
<div class="sub">2026 年 11 月 24 日 12:26 的真实截图。裁掉了顶栏，机器名已模糊，其余未改。</div>
<div class="cols">{img}{side}</div>
<div class="foot">截图：T3 Code iOS · 线程列表按最近活动排序</div>"""
    return HEAD.replace("{title}", "图 1").replace("{extra}", EXTRA) + body + TAIL


def fig5():
    w = 322
    a, ha = shot("cpm-to-semon.png", w, 280, 1590,
                 [(420, 940, "#01579b", "1"), (1515, 1585, "#2e7d32", "2")])
    b, hb = shot("semon-to-cpm.png", w, 268, 1640,
                 [(272, 358, "#7b1fa2", "3"), (500, 700, "#01579b", "4")])
    body = f"""<div class="figno">图 4</div><h1>Chief PM 和经理直接对话，我在旁边看</h1>
<div class="sub">11 月 24 日上午的一个来回，两张截图来自两个不同的对话。</div>
<div class="cols">
<div class="col"><div class="cap" style="color:#7b1fa2">Chief PM 的对话</div>{a}
<div class="legend"><div><i style="background:#01579b">1</i>给 Semon PM 发消息：数据格式批了，CI 绿就合并，开始做 11-28 的版本</div>
<div><i style="background:#2e7d32">2</i>回头告诉我：「不需要你拍板」</div></div></div>
<div class="col"><div class="cap" style="color:#01579b">Semon PM 的对话</div>{b}
<div class="legend"><div><i style="background:#7b1fa2">3</i>收到的消息标着 Agent：Chief PM 转达了我的意思</div>
<div><i style="background:#01579b">4</i>调研做完，结论直接发回 Chief PM</div></div></div>
</div>
<div class="foot">截图：T3 Code iOS · 12:27 / 12:28</div>"""
    return HEAD.replace("{title}", "图 4").replace("{extra}", EXTRA) + body + TAIL


EN5 = [
    ('lang="zh"', 'lang="en"'),
    ("图 1", "FIGURE 1"), ("图 2", "FIGURE 2"), ("图 3", "FIGURE 3"), ("图 4", "FIGURE 4"), ("图 5", "FIGURE 5"), 
    ("我手机上的 T3 Code：一个总监，九个经理", "T3 Code on my phone: one director, nine managers"),
    ("2026 年 11 月 24 日 12:26 的真实截图。裁掉了顶栏，机器名已模糊，其余未改。", "A real screenshot from 12:26 on 24 Nov 2026. Top bar cropped and machine names blurred; nothing else changed."),
    ("跑在另一台机器上", "runs on another machine"),
    ("9 个经理", "9 managers"),
    ("都是 Opus 5.5，一个项目一个", "all Opus 5.5, one per project"),
    ("右侧的 +11、+53……", "The +11, +53… on the right"),
    ("各自开过的 PR 数，加起来 293 个", "PRs each has opened, 293 in total"),
    ("「Working」", "“Working”"),
    ("此刻还在跑的两个：Eval、Semon", "the two running right now: Eval and Semon"),
    ("截图：T3 Code iOS · 线程列表按最近活动排序", "Screenshot: T3 Code iOS · threads sorted by recent activity"),
    ("Chief PM 和经理直接对话，我在旁边看", "The Chief PM and a manager talk directly; I watch"),
    ("11 月 24 日上午的一个来回，两张截图来自两个不同的对话。", "One exchange on the morning of 24 Nov, seen from both threads."),
    ("Chief PM 的对话", "The Chief PM's thread"), ("Semon PM 的对话", "Semon PM's thread"),
    ("给 Semon PM 发消息：数据格式批了，CI 绿就合并，开始做 11-28 的版本", "Messages Semon PM: format approved, merge while CI is green, start the 11-28 build"),
    ("回头告诉我：「不需要你拍板」", "Then tells me: “Nothing needs your decision”"),
    ("收到的消息标着 Agent：Chief PM 转达了我的意思", "The incoming message is tagged Agent: the Chief PM relaying my call"),
    ("调研做完，结论直接发回 Chief PM", "Research done, the conclusion goes straight back to the Chief PM"),
    ("截图：T3 Code iOS · 12:27 / 12:28", "Screenshots: T3 Code iOS · 12:27 / 12:28"),
]
EN5.sort(key=lambda p: -len(p[0]))
for name, fn in (("figure-1-sidebar", fig4), ("figure-4-peer-talk", fig5)):
    zh = fn()
    (HERE / f"{name}.zh.html").write_text(zh, encoding="utf-8")
    en = zh
    for x, y in EN5:
        en = en.replace(x, y)
    (HERE / f"{name}.en.html").write_text(en, encoding="utf-8")
    print("wrote", name)
