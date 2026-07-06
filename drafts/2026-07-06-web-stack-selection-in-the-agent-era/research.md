# Research — 回望 2021 语言之争 × AI 时代选型标准

> Stage 1 (Research) 交付物。候选论点是**待验证假设**,不是预设结论。完成后停止,等作者确认再进 Stage 2 (Outline)。

---

## Article Metadata

| Field | Value |
| ----- | ----- |
| **Workspace** | `drafts/2026-07-06-web-stack-selection-in-the-agent-era/` |
| **Slug (暂定)** | `web-stack-selection-in-the-agent-era` |
| **EN MDX** | `blog/2026-07-06-web-stack-selection-in-the-agent-era.mdx` (`unlisted: true`) |
| **ZH MDX** | `i18n/zh/docusaurus-plugin-content-blog/2026-07-06-web-stack-selection-in-the-agent-era.mdx` (`unlisted: true`) |
| **Target Audience** | 中高级 web 工程师、技术决策者、关注 AI 辅助开发的读者 |
| **Language** | 双语(先英文后中文,循仓库 i18n 结构) |
| **Started** | 2026-07-06 |

## 候选论点(待检验假设)

> web 选型的优化目标正从"人类 DX"迁移到"人 + AI agent 联合 DX"——最佳实践 = **最小化 agent 循环延迟** + **最大化可判定验证信号密度**。

两个组成变量的操作化定义(供压力测试用):

- **agent 循环延迟**:agent 一次"改代码 → 获得反馈"循环的耗时。由安装/编译/类型检查/测试启动速度等决定。Bun 的启动与安装速度、typescript-go 的 10x 编译提速直接作用于此。
- **可判定验证信号密度**:单位循环内,机器可自动判定(无需人工判断)的正确性信号数量与质量。类型检查报错、编译错误、schema 校验失败都是零成本、确定性、机器可读的反馈;运行时才暴露的 `undefined is not a function` 则相反。

---

## 一、站内考古:旧文清单与今日成色评估

### 1. 《为什么说 TypeScript 是开发大型前端项目的必备语言》

- **路径**: `i18n/zh/docusaurus-plugin-content-blog/2021-02-03-typescript.mdx` / `blog/2021-02-03-typescript.mdx`
- **Slug**: `typescript` · **日期**: 2021-02-03
- **核心论点**: JS 的自由度在大型项目中是灾难("动态一时爽,重构火葬场");TS 的类型系统本质是**面向接口编程(IOP)的抽象契约**——先定义接口再实现,让编译器在 compile time 而非 runtime 暴露错误。文中给出了并列的 JS/TS 代码例证:同一段非法赋值,JS 到运行时才抛 `Uncaught TypeError`,TS 编译时即报错。
- **论证框架**: IOP 设计模式 → 类型 = 契约 → 编译时错误前置 → 大型项目的可维护性。引用 2020 State of JS 满意度 >70% 佐证。
- **今日成色**: **站得住,且是四篇中增值最大的一篇**。TS 已成默认选项(State of JS 历年数据可佐证);更关键的是,文中"编译时错误前置"的论证在 agent 时代获得了作者当年不可能预见的第二重意义——tsc 报错正是给 agent 的零成本、确定性、机器可读的验证信号。当年论证对象是"人类协作契约",今天同一机制服务"人机协作契约"。
- **可挖彩蛋**: 文中已点出 TS 之父 Anders Hejlsberg 是"C# 首席架构师",并预言"这个解决方案会持续多久,我们无法预测"——如今答案是:不仅持续,连编译器本身都要用 Go 重写以提速 10 倍(typescript-go,主导者仍是 Hejlsberg)。
- **站不住之处**: 文中推荐的具体工具链已过时(Vue CLI、create-react-app 均已废弃);"鸭子类型让写 TS 轻松有趣"的表述今天看略浅,结构化类型的真正价值在渐进迁移与生态兼容。

### 2. 《公元2021年,关于前端工程化你应该知道些什么》(即《Year 2021: 前端工程化》)

- **路径**: `i18n/zh/docusaurus-plugin-content-blog/2021-03-02-frontend-engineering.mdx` / `blog/2021-03-02-frontend-engineering.mdx`
- **Slug**: `frontend-engineering` · **日期**: 2021-03-02
- **核心论点**: 2021 年的前端工程师是"真正意义上的工程师",必须掌握 Webpack/Babel/Node/NPM/Yarn/ESLint/TS 等一整套工程化工具链;打包部署是与十年前最大的差异;模块化("高内聚低耦合")对抗复杂度。
- **论证框架**: 历史叙事(jQuery 石器时代 → AngularJS 铁器时代 → 三大框架三足鼎立)+ 工具链分层介绍(打包/模块化/组件化/类型约束)。
- **今日成色**: **对复杂度的"怨气"记录站得住,具体工具全线过时**。文中原话可直接引用的"考古证据":「现在稍微大一点的前端项目的依赖文件就会超过 500MB」「要学的东西实在是太多了」。当年被列为标配的 Webpack+Babel+NPM/Yarn 多工具拼装,恰是 Bun"一个二进制吃掉 runtime + package manager + bundler + test runner"的归零叙事所针对的历史包袱。文中"未来展望"押注 WebAssembly、Svelte,并未预见到工具链整合(consolidation)才是主线——esbuild 只在打包工具列表中一笔带过。
- **备注**: 文末之问「今天入坑前端的你,还学得动么?」可作为新文的回望钩子——2026 年的回答可能是"学不动也没关系,agent 替你学了一半,但选型标准换了"。

### 3. 《大红大紫的 Golang 真的是后端开发中的万能药吗?》

- **路径**: `i18n/zh/docusaurus-plugin-content-blog/2021-03-24-golang.mdx` / `blog/2021-03-24-golang.mdx`
- **Slug**: `golang` · **日期**: 2021-03-24
- **核心论点**: Go 不是万能药。方法论核心是**辩证法:「Golang 的一些突出特性将成为它的双刃剑」**——语法简单 ↔ 难以处理复杂工程问题;强制错误处理 ↔ `err` 满天飞;鸭子类型 ↔ 缺乏严格约束。结论:选型应基于"候选技术与业务需求的切合度、与团队的融合度、学习/开发/时间成本",拒绝"XXX 是世界上最好的语言"式断言。
- **论证框架**: 语言特性逐项分析 → 优缺点对照表(每个特性同时列优点与缺点) → 适用场景收敛(分布式/爬虫/后端 API)。
- **今日成色**: **方法论完全站得住,个别预测已被证实/证伪**。"突出特性即双刃剑"分析框架可原样搬来审视 Bun(极简单二进制 ↔ Node 兼容长尾;快速迭代 ↔ 生产稳定性存疑)。文中预测"泛型问题在 2.0 版本很可能解决"——实际 Go 1.18(2022-03)就加入了泛型,没等 2.0。"编译迅速:这绝对是一个优点/怎么可能是缺点?"的玩笑,在 agent 时代升格为核心选型指标(循环延迟)。
- **彩蛋素材**: 当年"Go vs TS"是两个互不相干的阵营之争;2026 年 tsc 用 Go 重写(typescript-go),两篇旧文的主角会师同一个项目。

### 4. 《为什么推荐你用 C# 构建大型后端应用?- Part 1》

- **路径**: `i18n/zh/docusaurus-plugin-content-blog/2021-11-19-csharp.mdx` / `blog/2021-11-19-csharp.mdx`
- **Slug**: `csharp` · **日期**: 2021-11-19
- **核心论点**: 用户最多的语言(Java)不一定是开发者最满意的语言。援引 StackOverflow 2021(n=82,914):Java 满意度 47% vs C# 62%。**"满意度 vs 市场份额"的错位是信号**:C# 在开发体验(空值操作符、`var` 隐式类型、LINQ、属性语法)上占优,市场地位滞后于语言质量。
- **论证框架**: 满意度调查数据开篇 → 逐项语法特性对比 Java → "酒香不怕巷子深"式收尾。
- **今日成色**: **分析框架站得住并可直接复用**:Hono vs Express 正是同构局面——Express 下载量仍占绝对优势(市场份额),Hono 在 State of JS 满意度/关注度上领跑(开发者心智),错位再现。文中明确点出「TypeScript 的创建者正是 C# 之父 Anders Hejlsberg」,与 TS 篇互为伏笔,是 typescript-go 彩蛋的第二处站内锚点。
- **考古趣味**: 标题标注 "Part 1",承诺的 .NET Core / Entity Framework 系列续篇**从未发布**(blog/ 中无 Part 2)。可在新文中自嘲一笔,也侧面说明:2021 年的"语言布道"写作范式本身已经翻篇。

### 5. 补充纳入:《TS 加持的 Vue 3,如何帮你轻松构建企业级前端应用》

- **路径**: `i18n/zh/docusaurus-plugin-content-blog/2021-02-22-vue3.mdx` / `blog/2021-02-22-vue3.mdx`
- **Slug**: `vue3` · **日期**: 2021-02-22
- **核心论点**: Vue 易上手的优势"同时也成为了一把双刃剑"(与 Golang 篇同款辩证法);Vue 3 的 TS 原生支持 + 组合式 API 补齐大型项目能力;技术方案"没有高低贵贱,只有合不合适"。
- **今日成色**: 框架评论部分已随 Vue 生态演进而过时,但它证明"双刃剑"辩证法与"TS = 企业级门票"是作者 2021 系列的**一贯方法论**,不是单篇偶然。建议新文中一笔带过或仅列入"2021 系列"清单,不做主线。

### 扫描结论(完整性说明)

- 四篇指定旧文**全部找到**,无缺失、无虚构。用户记忆的《为什么我推荐使用 C# 构建大型后端应用(一)》在仓库中实际标题为《为什么推荐你用 C# 构建大型后端应用?- Part 1》(slug `csharp`);《Year 2021: 前端工程化》实际标题为《公元2021年,关于前端工程化你应该知道些什么》(slug `frontend-engineering`)。
- 同期(2021-02 ~ 2021-11)其余文章扫描:`2021-02-22-vue3`(已补充纳入,见上)、`2021-03-09-source-code-reading`(源码阅读方法论,非语言/框架评论,不纳入)、`2021-04-05-project-management`(项目管理,不纳入)。
- 站内近期可衔接文章(内链候选):`2026-01-24-ai-agents-engineering`、`2026-03-23-agent-landscape`、`2025-09-14-context-engineering`、`2026-06-25-industrialization-of-intelligence`。

---

## 二、外部证据表

> ⏳ 待四路外部研究返回后填充:Bun 现状与 Anthropic 收购、Hono 采用度(多口径并列)、typescript-go 进展、"agent-friendly stack"既有讨论饱和度。

---

## 三、论点压力测试

> ⏳ 待外部证据到齐后完成。

---

## 四、候选大纲方向(2-3 个)

> ⏳ 待压力测试结论后给出。

---

## 五、开放问题(需作者拍板)

> ⏳ 汇总中。

---

## Research Status

- [x] 站内考古完成(4 篇指定旧文 + 1 篇补充,含成色评估)
- [ ] 外部证据核验(Bun / Hono / typescript-go / agent-friendly stack)
- [ ] 论点压力测试
- [ ] 候选大纲方向
- [ ] 开放问题清单
