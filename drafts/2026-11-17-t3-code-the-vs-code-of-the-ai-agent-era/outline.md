# Outline v3 (PENDING author approval: outline + hook + title)

- **Title (ZH)**: T3 Code：AI Agent 时代的 VS Code？
- **Slug**: t3-code-the-vs-code-of-the-ai-agent-era
- **Thesis**: 有条件成立。AI 时代功能谁都能抄，T3 自己都写着 "Steal our code"。真正的护城河是三样：中立与信任、迭代速度与品味、社区与生态。前两样 T3 已经有了，第三样还缺正式的扩展 API。
- **Evidence**: 作者日常使用（PM thread 结构、跨模型/harness/机器编排、并行、预览）+ 公开资料（research.md）。作者没用过 Paseo，只用公开评价侧面对比，正文要明说。
- **Project names (2026-11-17)**: 作者的项目不出名。开头不用项目名，用角色描述（「四个各管一个开源项目，一个管基础设施」）；第二节放一张小表，名字 + 一句话 + 链接。Duhem 链到 introducing-duhem。
- **Terminology (2026-11-17, author)**: 读者不一定懂 T3 术语和英文职位词。正文用中文说法，首次出现时括注原词一次：
  - thread → 对话（首次：「每个对话，T3 叫它 thread，背后就是一个 agent」）
  - PM / Manager → 项目经理 / 负责人；director → 总监
  - sub-agent → 子 agent（作者定）
  - harness → 保留英文，不翻译（作者定）
  - runner、clone 等能换就换成白话（「GitHub 自己的机器」「代码副本」）
  - 保留 agent、CI、PR、MCP（目标读者是开发者），MCP 首次出现给一句解释
- **Voice rules**: 正文 0 破折号；不用「不是……而是……」「恰恰」

## 开头（300-500 字）
真实场景：Semon PM、Duhem PM、Ostrom PM、Tolmap PM、Infra Manager 向作者汇报；PM 用 Claude Opus，派出去的 sub-agent 大多是 Codex。11-14 CI 迁移：Infra Manager 自己去找 Tolmap PM 对接，两个仓库各一个 PR。引出问题：大家拿它比 VS Code，可同样的功能别人也有，凭什么是它？

## 一、纵向：IDE 是怎么从「一家一个」走到 VS Code 的（700-900 字）
Visual Studio、Xcode 绑平台，Eclipse，JetBrains 全家桶一门语言一个 IDE。VS Code 刚出来时功能不如 JetBrains，赢在免费开源、LSP 带来的中立、扩展市场。结论：当年的护城河就已经不在功能上。
- 表格：VS Code 的取胜因素

## 二、T3 Code 做到了什么（800-1000 字）
重点写编排：跨模型、跨 harness、跨机器；thread 之间能通信、协作、互相管理；作者的 PM 结构，人从管 agent 变成管 manager。其余能力（并行、预览、手机端）简要带过。
- Mermaid：作者 → PM threads → sub-agents，PM 之间横向通信
- 内链：cheap-code-scarce-attention、stop-babysitting-your-agent、multi-agent-teams…、vsm-cybernetics…
- 作者实践至今没翻过车，正文如实说，同时点明运行时间还短、样本有限
- 局限：切换模型丢上下文、默认 full access、层级越多协调成本越高

## 三、横向：两类对手（800-1000 字）
1. 官方 app（Codex、Claude Code、Cursor 3、Antigravity）：发版快（三个月 Claude Code 81 次、Codex 35 次、T3 20 次），并行、远程、手机都追上了，但不跑对手的 agent。结构性原因：模型厂商不会把对手当一等公民。今天一家模型一个 app，正如当年一门语言一个 IDE。
2. 中立工具（Paseo、Happy、HAPI）：功能高度趋同，Paseo 文档里的跨 provider、跨机器、agent 互相调用和 T3 几乎一样，HN 上也有用户偏爱它。Happy、HAPI 更偏手机遥控。
- 表格：跨模型 / 跨机器 / agent 互相通信 / 协议（MIT、MIT、Apache-2.0、AGPL-3.0）/ 自带模型

## 四、功能不是护城河，那什么是（800-1000 字）
铺垫：T3 自己是从 Codex 外壳起步的（HN 发布标题 "wraps Codex"，接 Codex App Server），作者第一眼觉得界面像 Codex（写成作者感受，无来源证实抄袭）。连外观都能借，T3 又请大家 "Steal our code"：代码都送人了，留下的是什么。
- 中立与信任：不卖模型，用户敢把整套工作流押上去
- 迭代速度与品味：团队天天用自己的产品，知道什么该做、什么不做；功能能抄，取舍抄不走
- 社区与生态：63k+ star、上百贡献者，但扩展 API 的提案（#6837、#6419）至今没有维护者表态，社区只能 fork 或在预览面板里绕路。这是三样里唯一缺的


## 结尾（250-400 字）
回答问号：前两条护城河已经在手，第三条还差一步。读者的判断标准：看它什么时候发布正式扩展 API。编辑器的比喻其实低估了它，VS Code 帮一个人写代码，T3 Code 帮一个人管一个团队。
