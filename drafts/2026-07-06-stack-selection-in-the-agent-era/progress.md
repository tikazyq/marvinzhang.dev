# Progress Tracking

## Project Overview
- **Article**: 回望 2021 语言之争 × AI 时代选型标准 (working title: Stack Selection in the Agent Era)
- **Slug (frontmatter)**: `stack-selection-in-the-agent-era`(暂定,待作者拍板)
- **Workspace / 文件名**: `2026-07-06-stack-selection-in-the-agent-era`(日期前缀仅用于文件名与工作区,不属于 slug)
- **Start Date**: 2026-07-06
- **Current Status**: Research (Stage 1) — in progress
- **Methodology**: blog-analytical 4 阶段 (Research → Outline → Writing → Refine),本轮只做 Stage 1
- **Last Updated**: 2026-07-06

## Phase Status

### ✅ Stage 1: Research — COMPLETE (2026-07-06),等待作者反馈
- [x] Workspace scaffolded (`scripts/drafts/scaffold.js`)
- [x] 站内考古:4 篇指定旧文全部定位并精读,成色评估写入 research.md
- [x] 同期文章扫描:补充纳入 vue3 篇;source-code-reading / project-management 排除
- [x] 外部证据核验:Bun / Hono / typescript-go / agent-friendly stack(核验日期 2026-07-06;冲突口径并列;含"勿引用"红线清单)
- [x] 论点压力测试:证据支持弱形式("判据升格")、不支持强形式("目标整体迁移");训练数据反方、归因风险、Bun 双刃已标注
- [x] 候选大纲方向 3 个(A 考古驱动 / B 命题驱动 / C 叙事驱动)+ "B 为骨 C 为皮"混合建议
- [x] 开放问题清单 8 项(论点强度、大纲方向、slug、利益披露、反方篇幅、新线索取舍、外文对话、自嘲尺度)
- **Gate**: ⛔ **已停止,等作者对 research.md 的反馈后再进 Stage 2 (Outline)**

### ✅ Stage 2: Outline — COMPLETE (2026-07-07)
- [x] 作者反馈:采纳 "B 为骨(命题驱动)、C 为皮(叙事)" 混合方案
- [x] outline.md 完成:7 节 section map、每节 beats、视觉元素规划、开放问题按 research 建议值落为 Assumptions(作者可否决)

### ✅ Stage 3: Writing (EN) — COMPLETE (2026-07-07),等待作者反馈
- [x] EN 正文 ~4,600 词写入 blog/2026-07-06-stack-selection-in-the-agent-era.mdx(unlisted: true)
- [x] 7 节全部完成:会师冷开场 / 判据考古(表) / 两个新变量(mermaid 循环图) / 三组证据(表 + 1 个 Hono RPC 片段) / 反方三连(Bun 双刃表,复刻 Golang 篇格式) / 两轴框架(quadrantChart) / 塌缩结尾 + 利益披露
- [x] 全部外部数字取自 research.md 已核验条目,冲突口径按备注处理(下载量只做相对断言)
- [x] 站内链接 4 篇旧文;pnpm build 双 locale 通过
- **Gate**: ⛔ 等作者对 EN 稿反馈后进 Stage 4(润色 + 中文翻译)

### 🔄 Stage 4: Refine — 中文翻译已完成 (2026-07-07)，润色等作者评论
- [x] 中文全文翻译(形不同而意同:自然中文表达,非逐句直译;2021 旧文引语还原为中文原话;技术名词首现附英文)
- [x] zh 标题定为《AI Agent 时代的 Web 技术选型》(可改);frontmatter tags 与 EN 对齐
- [x] validate:zh-bold-source 通过(55/55);注意:仓库"加粗前后空格"约定中 `**X **，` 形式在 CommonMark 下渲染为字面星号(老文章亦存在此问题),本篇改用不触发歧义的写法,渲染已抽查为 0 残留星号
- [x] pnpm build 双 locale 通过
- [x] 作者第一轮评论(2026-07-07)处理完毕:
  - ① 中文表述:"被当成了天气"→"被当成理所当然的行业现状";"现实比预测更温柔"→"结果这个预测还保守了";§4 联动句同步修改
  - ② 3 个多列表格 + 2 个 mermaid 全部替换为 HTML→PNG 渲染图(5 图 × EN/ZH = 10 张,风格沿用 vsm 篇 figure 规范;PNG 在 static/img/blog/<slug>/,HTML 源码在 drafts/<slug>/figures/)
  - ③ 英文版正文去除全部中文引语,改为英文转述(grep CJK = 0)
- [x] 作者第二轮评论(2026-07-07)处理完毕:
  - 翻译腔系统修复(病因:英文修辞装置被保形移植)——"控方/辩方""回声""挥舞下载量""被证明是一个市场""配得上最强的反对""判决书"等全部按中文语感重写;图 3 中文版列头"2021 年的回声"→"对应的 2021 论点"并重渲染
  - 两轴框架三条规则重写(中英):从"原则宣言"改为可执行三步(资格赛→双侧打分→主流生态内比较)
  - §4/§5 结构重写(中英):§4 改为"钱→票→半个反例"递进,每组证据判决句开头;§5 明示三条反对分量不同(真对手/边界/附记),Bun 小节与证据三显式衔接
- [x] 作者第三轮评论(2026-07-08)处理完毕:
  - 图 2 重做:整图改为单 SVG 精确绘制(回环从"自我纠正"框出发落回起点、信号处双色分叉箭头、延迟标尺框住"修改→信号"区间);箭头 marker 按反馈缩小
  - 新增图 3「速度 × 质量的复利」概念图(双面板:同一小时 6 轮 vs 60 轮;同一首稿下密集/稀疏信号的收敛曲线 + 逃逸区),直观回答"两个判据为何在 agent 时代生死攸关——交付速度与质量的极致优化";插入 §3 机制句之后
  - 后续图重编号:verdicts→图4、bun→图5、quadrant→图6(文件名同步改名,"见图4"引用更新为"见图5")
- [x] 作者第四轮评论(2026-07-08)处理完毕:
  - 术语去翻译腔:循环延迟→反馈周期,可判定验证信号密度→验证信号密度(图 2/3/6 zh 重渲染)
  - 扩主题:web → 通用技术选型(改题/改 slug/文件与图片目录重命名/范围声明句)
  - 象限图循证重排:专项调研(逐语言增量编译数据、类型检查主流实践、LLM 准确率)后重摆全部 16 点——Rust 修正到中游偏右(cargo check 1-7s)、TS(jstsc) 右移、Python Y 上调(类型提示 86% 采用)、新增 Swift/Dart(Dart 带训练语料星号并与第三步规则互文)、Bun 归位为 X 轴加速器
- [ ] 等作者下一轮评论/定稿

## Work Session Log
- **2026-07-07 (round 2)** by Claude (Stage 4 agent): 作者第二轮评论——翻译腔全篇清理、三条规则操作化重写、§4/§5 判决句优先重构(中英同步);figure-3.zh 重渲染;build + 校验通过。

- **2026-07-06** by Claude (Stage 1 agent): scaffold 工作区;精读 2021-02-03-typescript / 2021-03-02-frontend-engineering / 2021-03-24-golang / 2021-11-19-csharp / 2021-02-22-vue3;完成旧文清单与成色评估;启动 4 路外部证据研究(Bun 现状与 Anthropic 收购、Hono 采用度多口径、typescript-go 进展、agent-friendly stack 既有讨论饱和度)。

- **2026-07-06 (later)** by Claude (Stage 1 agent): 4 路外部研究返回并整合;完成压力测试/候选大纲/开放问题;处理 Copilot PR review 4 条意见(占位 tags → 真实 taxonomy、zh 标题中文化、slug/文件名口径澄清、lean-spec 备注注明出处为作者指示)。Stage 1 完成,PR #39,等作者反馈。

- **2026-07-07 (later)** by Claude (Stage 4 agent): 处理作者三条评论(中文表述 × 2、表格与 mermaid 全部图片化、英文版去中文);新增 10 张 figure(build_figures.py 可再生);双 locale build + zh 加粗校验通过。

- **2026-07-07** by Claude (Stage 2/3 agent): 作者确认 "B 为骨 C 为皮" → 完成 outline.md(7 节 + Assumptions);随后完成 Stage 3 英文正稿(~4,600 词,2 mermaid + 3 表 + 1 代码片段);pnpm build 通过;zh 占位稿加 truncate 标记。等作者对 EN 稿反馈后进 Stage 4。

## Notes & Conventions (Stage 2+ 生效,先记录勿执行)
- 遵循仓库 frontmatter / slug / tags / truncate 约定;双语按 i18n 结构
- 技术评论文风,少代码:每节至多一个短片段且须增强论证
- 外部数字必须来自 Stage 1 核验过的证据;冲突口径并列呈现
- 标题无时间锚、无夸饰形容词;build 通过、站内链接有效
- 忽略 lean-spec 工作流,以 drafts/ 三件套为准——此为**作者在本次任务(2026-07-06)中的明确指示**("该工作流已弃用");注意 AGENTS.md 中仍有 LeanSpec 指引未同步更新,如有冲突以作者指示为准

## Next Steps
1. 外部研究返回 → 填充 research.md 第二节(外部证据表)
2. 完成论点压力测试 + 候选大纲方向 + 开放问题清单
3. 停止,等作者反馈后再进 Stage 2
