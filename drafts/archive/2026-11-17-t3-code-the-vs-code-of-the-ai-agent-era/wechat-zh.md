


过去两周，有一百多个 agent 在替我干活，我一个都没直接管过。

我只跟五个 agent 说话。四个各管一个开源项目，一个管基础设施，相当于项目经理。它们自己拆任务、派人、互相商量，做完了向我汇报。我是这支 agent 团队的老大，有点像公司里的总监。

让这件事成为可能的，是一个叫 T3 Code 的免费工具。

T3 Code 常被称作 Agent 时代的 VS Code。可仔细想想，让我离不开的这些功能，Paseo 的文档里几乎一字不差地写着，官方的 Codex 和 Claude app 也在一周一版地追赶。功能谁都能做，凭什么是它？

这篇文章想回答这个问题。先往回看，VS Code 当年是怎么赢的；再看 T3 Code 现在做到了什么，和同类工具差在哪；最后说说，在功能可以随手复制的时代，什么才留得住人。



## 一家一个的年代

十几年前，写代码用什么工具，基本由你写什么决定。

写 C# 用 Visual Studio，它和 Windows、.NET 绑在一起。写 iOS 用 Xcode，离开苹果的平台就用不了。写 Java 的人在 Eclipse 和 IntelliJ 之间选，Eclipse 插件多，但又慢又重。JetBrains 后来把这套做法推到了极致：Java 用 IntelliJ，Python 用 PyCharm，前端用 WebStorm，Go 用 GoLand，一门语言一个 IDE，专业版各自收费。这些工具都很强，强到今天还有很多人离不开。

2015 年微软发布 VS Code 的时候，它在功能上比不过任何一个对手。调试不如 Visual Studio，重构不如 IntelliJ，它最初只是一个启动很快的编辑器。

它赢在几件和功能无关的事上。

第一是免费、开源。用户不用掏钱试，公司不用走采购流程。

第二是中立。2016 年，微软和 Red Hat 等公司一起推出了 <span class="wx-ref">LSP（Language Server Protocol，语言服务器协议）</span><sup>[1]</sup>，把「理解一门语言」这件事从编辑器里拆出去，交给各语言社区自己实现。从此 VS Code 不用为每门语言单独写支持，哪门语言的社区做好了语言服务器，它就自动支持哪门语言。一个编辑器对所有语言一视同仁，这在 JetBrains 的模式里做不到，因为它的生意就是一门语言卖一个 IDE。

第三是扩展市场。任何人都能给 VS Code 写插件，主题、语言、调试器、远程开发，几乎所有需求都有人做了。前两点让人愿意来试，这一点让人走不掉：你的工作流一旦建在几十个插件上，换编辑器的成本就高得离谱。

![IDE 时代：Visual Studio 绑 Windows 和 .NET，Xcode 绑苹果平台，Eclipse 插件多但又慢又重，JetBrains 一门语言一个 IDE，最后汇向免费开源、靠 LSP 接住所有语言、有扩展市场的 VS Code。Agent 时代：Claude 和 Codex 的官方 app 各自只跑自家 agent，Cursor 和 Antigravity 也各有自家的一套，汇向免费开源、接住各家 agent 的 T3 Code，后面打了问号，还缺扩展生态](https://www.marvinzhang.dev/img/blog/2026-11-17-t3-code-the-vs-code-of-the-ai-agent-era/figure-1-history.zh.png)

今天的 agent 工具，正在重走这条路。Claude Code 有官方 app，Codex 有官方 app，Cursor 有自己的 harness 和模型，Google 有 Antigravity。每家做得都不差，但每家都只把自家的 agent 当一等公民。一家模型一个 app，和当年一门语言一个 IDE，是同一个格局。

所以问题就变成了：谁会成为 agent 时代那个中立的工作台？

## T3 Code 做到了什么

<span class="wx-ref">T3 Code</span><sup>[2]</sup> 是 Ping Labs 做的开源桌面应用，MIT 协议，免费。牵头的 Theo Browne 在美国开发者圈很有名，做过 Twitch 的工程师，后来创业，T3 Stack、T3 Chat 都出自他的团队，他本人也是一个观点鲜明的技术 YouTuber。T3 Code 自己不带模型，它在你的机器上起一个本地服务，去驱动你已经装好的各家 agent：Claude Code、Codex、Cursor、OpenCode、Grok Build 等等，用的是你自己的订阅。桌面端、网页端、手机端都只是这个本地服务的窗口。

![T3 Code 桌面端：左边是按项目排列的对话列表，中间是 agent 的工作结果和改动文件，右边是分支、提交和 PR；旁边的手机端正在请求批准一条命令](https://www.marvinzhang.dev/img/blog/2026-11-17-t3-code-the-vs-code-of-the-ai-agent-era/wechat/screenshot-desktop-mobile.png)

*图片来源：<span class="wx-ref">T3 Code 官网</span><sup>[2]</sup>*

并行跑多个 agent、在应用里直接预览页面、手机上批准下一步，这些它都有，也都好用。但让我真正离不开的，是另一件事：**编排**。

T3 里的 agent 可以开新对话（T3 叫它 thread，每个对话背后就是一个 agent），可以给别的对话发消息，可以等别的对话的结果，还可以把任务派到另一台机器、另一个 harness、另一家的模型上。对话和对话之间能通信、能协作，甚至能互相管理。

![T3 Code 里一个对话同时派出四个子 agent，分别跑在 Claude、Codex、Muse 和 Gemini 上，右侧列出这几个子 agent 的进度](https://www.marvinzhang.dev/img/blog/2026-11-17-t3-code-the-vs-code-of-the-ai-agent-era/wechat/screenshot-subagents.png)

*图片来源：<span class="wx-ref">T3 Code 的 GitHub 仓库</span><sup>[3]</sup>。一句话派出四个子 agent，用的是四家的模型。*

我现在的用法是这样的：

| 常驻的 agent | 负责的项目 | 项目是做什么的 |
|---|---|---|
| Semon 项目经理 | <span class="wx-ref">Semon</span><sup>[4]</sup> | 收集、查询、分析各台机器上的 agent 会话记录 |
| Duhem 项目经理 | <span class="wx-ref">Duhem</span><sup>[5]</sup> | 对 AI 写出来的软件做整体验证（[之前写过一篇](https://mp.weixin.qq.com/s/Pe1FQCg0Cm5s0VhLd5liDg)） |
| Ostrom 项目经理 | <span class="wx-ref">Ostrom</span><sup>[6]</sup> | 接收 GitHub 事件，自动派出后台 agent 去处理 |
| Tolmap 项目经理 | <span class="wx-ref">Tolmap</span><sup>[7]</sup> | 把代码仓库画成一张人能装进脑子里的地图 |
| 基础设施负责人 | 无 | CI、部署这些跨项目的事 |

这几个项目都不出名，放在这里只是为了说明每个项目经理管的是什么。

我只跟这五个 agent 说话。项目经理收到任务后，自己拆分，自己决定派给谁：难的设计交给强一点的模型，简单的实现交给便宜的模型，写完了再派一个子 agent 去审。项目经理之间有事，自己去对方的对话里商量，商量完了告诉我结论。

![作者在最上面，只和五个常驻 agent 说话：四个项目经理和一个基础设施负责人，它们跑在 Claude Opus 上。每个项目经理下面挂着一串子 agent，干实现、调研、审 PR，大多用 GPT 模型。基础设施负责人和 Tolmap 项目经理之间有一条横向的线，表示它们自己商量](https://www.marvinzhang.dev/img/blog/2026-11-17-t3-code-the-vs-code-of-the-ai-agent-era/figure-2-org.zh.png)

举个例子。11 月 14 日，我跟一个 agent 说了一句：把两个项目的 CI 都换回 GitHub 自己的机器上跑。

接下来的事我基本没插手。它新开了一个对话，交给一个专管基础设施的 agent。这个 agent 读完两个仓库的配置，发现其中一个项目归另一个 agent 负责，就自己去找对方商量。对方回问它，改动该基于哪个分支提交。几分钟后，两个仓库各提了一个 PR。它还发现，CI 在之前一次节省开支的清理中被关掉了，就顺手重新打开；本地有一份代码副本坏了，它没去碰，只是告诉了我。

把谁和谁说了话画出来：

![11 月 14 日那次 CI 迁移里谁和谁说了话：作者向一个 agent 提出要求；那个 agent 新开了基础设施负责人的对话，附上权限边界；基础设施负责人发现 tolmap-hub 归 Tolmap 项目经理管，去问归属，对方回问 PR 该基于哪个分支；基础设施负责人给 semon-hub 和 tolmap-hub 各开一个 PR，重新打开 CI；碰到损坏的代码副本和会冲突的旧 PR，属于权限之外，只报告；最后向作者汇报结论](https://www.marvinzhang.dev/img/blog/2026-11-17-t3-code-the-vs-code-of-the-ai-agent-era/figure-3-topology.zh.png)

有两个细节值得一提。

一是**权限有边界**。派给基础设施负责人的任务说明里写着：不许自己删掉旧的 CI 服务器，要整套删除部署流程之前先问我。所以它碰到损坏的代码副本和会冲突的旧 PR 时，只报告，不动手。带团队的人给手下授权，本来就该这样：说清楚能做什么，也说清楚哪些事得先请示。

二是**跨模型几乎没有成本**。项目经理用 Claude，子 agent 大多用 GPT，切换只是派任务时填的一个参数。这里我用了 <span class="wx-ref">Magpie</span><sup>[8]</sup>，一个在技术圈挺流行的开源模型网关，它能让同一个 harness 调用好几家的模型。T3 本身也支持把任务直接派给另一个 harness，比如从 Claude Code 派给 Codex。

这套做法在我手上跑了两周左右，暂时没出过问题：没有汇报失真，没有项目经理之间扯皮，也没有越权。不过时间还短，样本也不大，我不敢说它能一直这样。[多 agent 团队的协调成本](https://mp.weixin.qq.com/s/8vgli6pMvq65CEqKc5_efg)是真实存在的，层级越多，信息在传递中走样的机会就越多。我之所以愿意多加一层项目经理，是因为[我的注意力比代码贵](https://mp.weixin.qq.com/s/h_q2Q_EAlZywcAphGWMqCw)。以前我得盯着每一个 agent，现在只用盯五个，[不再给 agent 当保姆](https://mp.weixin.qq.com/s/ar9_o5ROMI-BScTDoBF5Jg)。这和<span class="wx-ref">控制论里的可生存系统模型</span><sup>[9]</sup>讲的是同一件事：每一层只处理自己那一层的复杂度，处理不了的才往上报。

T3 也有明显的短板。中途给一个对话换模型，新模型拿不到之前的推理过程和工具调用记录，上下文会丢一部分。新对话默认给 agent 完全权限，而 T3 自己的文档也说，权限模式算不上真正的安全边界。各家 agent 的新功能，T3 的适配层也总要晚一步才跟上。

## 别人为什么做不成这样

和 T3 Code 比较的工具，可以分成两类。

**第一类是模型厂商的官方 app**：Claude Code、Codex、Cursor、Antigravity。它们的问题不在能力。一位日本开发者<span class="wx-ref">统计过</span><sup>[10]</sup>，从 8 月 8 日到 11 月 8 日这三个月里，Claude Code 发了 81 个正式版本，Codex 发了 35 个，T3 Code 只发了 20 个。并行 agent、远程控制、手机端、云端会话，这些官方 app 都有了。

但这两家官方 app 的更新日志里，没有一条是支持运行对手 agent 的。Codex 能导入 Claude Code 的配置，却不能跑 Claude Code 的 agent。Cursor 做了很漂亮的多 agent 窗口，用的是自家的 harness 和模型。

这是结构决定的，和工程能力无关。模型厂商靠卖模型赚钱，它没有理由把对手的模型放到和自家一样的位置上。当年 JetBrains 不会做一个对所有语言免费的编辑器，今天 Anthropic 也不会做一个让你方便地把活派给 GPT 的 app。

**第二类是中立的第三方工具**：Paseo、Happy、HAPI。它们和 T3 一样不卖模型，问题在另一个方向：功能已经高度趋同。

| | T3 Code | Paseo | Happy | HAPI |
|---|---|---|---|---|
| 跨模型、跨 harness | ✅ | ✅ | ✅ | ✅ |
| 跨机器 | ✅ | ✅ | 文档未写 | ✅ |
| agent 之间互相派活、通信 | ✅ | ✅ | 只有派子 agent | ✅ |
| 主要形态 | 桌面 + 手机 | 桌面 + 手机 | 手机优先 | 手机优先 |
| 开源协议 | MIT | Apache-2.0 | MIT | AGPL-3.0 |
| GitHub 星标 | 63k+ | 24.2k | 24.7k | 5.4k |



Happy 更像手机上的遥控器，编排做得浅。Paseo 和 HAPI 不一样。Paseo 的 <span class="wx-ref">README</span><sup>[11]</sup> 写着 agent 可以「创建 worktree、启动别的 agent、和它们对话，跨 provider」，也支持多台机器。HAPI 的<span class="wx-ref">文档</span><sup>[12]</sup>里有一组给 agent 用的工具，能找到其他会话、读它们的内容、给它们发消息、新开会话，对方在另一台机器上也行。从文档看，我在 T3 里用的那套编排，这两家几乎都有。

我没有用过 Paseo，所以没法说它做得好还是不好。网上的评价不少是正面的：在 <span class="wx-ref">Hacker News 的一个讨论</span><sup>[13]</sup>里，有用户说喜欢它是因为可以自由搭配不同的 harness 和模型，有人说它的手机端和桌面端一致，还有人说它的会话同步比 Claude Code 的手机 app 好用。

开源协议也值得多看一眼。MIT 和 Apache-2.0 都很宽松，拿去改、拿去卖都行，Apache-2.0 多了一条专利授权。AGPL-3.0 是强传染性的协议，你改了 HAPI 并通过网络提供服务，就得把改动开源出来，这对想在它上面做商业产品的人是个门槛。T3 在这一点上最激进，官网上有个按钮直接写着「Steal our code (legally)」，意思是欢迎合法地抄。

那么问题又回来了：功能大家都有，代码 T3 自己也送出去了，它凭什么？

## 功能留不住人，那什么留得住

我第一眼看到 T3 Code 的时候，觉得它很像 Codex 的官方 app。这个感觉有来由：T3 Code 今年 3 月在 Hacker News 上发布时，标题就是「<span class="wx-ref">一个包装 Codex 的开源 agent 编程应用</span><sup>[14]</sup>」。它最早就是一个 Codex 的外壳，到今天还通过 OpenAI 的 <span class="wx-ref">Codex App Server</span><sup>[15]</sup> 接入 Codex，Claude 等其他 agent 是后来才接进来的。

T3 借鉴了 Codex，又请所有人来借鉴它。到了 agent 能几天写完一个功能的时代，功能、界面、甚至代码，都算不上护城河了。我觉得真正留得住人的有三样东西。

**第一是中立与信任。** T3 不卖模型。它今天支持 Claude，明天支持 GPT，后天支持一个还没发布的模型，对它的生意都没有影响。这意味着用户敢把整套工作流押在它上面，不用担心哪天它为了推自家模型而冷落别家。Theo 的团队在 T3 Chat 上走的也是这条路：自己不做模型，把各家模型放在一个界面里。中立是这家公司一贯的打法。官方 app 发版再快，这一点它们在结构上做不到。

**第二是迭代速度与品味。** 功能可以抄，取舍抄不走。什么该做、什么不做、做到什么程度，靠的是团队天天用自己的产品攒下来的判断。T3 的版本号还在 0.1，但它已经有一百多位贡献者，0.0.34 一个版本就有 114 人参与。我用了这么久，最大的感受是它的很多设计像是被真实工作流磨出来的，比如 agent 之间派活、等结果、跨机器调度，这些都是你同时管几个 agent 之后才会觉得刚需的东西。

**第三是社区与生态。** 这是 VS Code 最终赢下来的那条护城河，也是 T3 目前唯一缺的一条。

社区的需求很明确。今年 7 月，有人在 GitHub 上<span class="wx-ref">提议做一套扩展 API</span><sup>[16]</sup>，允许第三方挂接生命周期事件、往界面里加设置项和面板。8 月，又有人<span class="wx-ref">提议做一套插件 SDK</span><sup>[17]</sup>，让外部网页以受限权限嵌进 T3 的面板。社区成员前后提交了大约 18 个插件相关的 PR。到 11 月，这些提案下面都没有维护者的正式回应，一位社区成员在讨论里写道：「还没有维护者同意这个方向。」等不及的人，有的直接 fork 一份自己改，代价是失去签名的自动更新；有的在 T3 的预览面板里跑小网页应用，<span class="wx-ref">绕开这个限制</span><sup>[18]</sup>。

维护者的谨慎可以理解。VS Code 的插件出了问题，最坏是编辑器卡死；T3 的插件出了问题，它挂在一个拥有完整机器权限的 agent 旁边，后果要严重得多。这个安全模型很难设计。但不管多难，这一步不迈出去，T3 就只是一个很好用的壳。今天它靠中立和品味领先，可这两样东西，下一个同样中立、同样有品味的团队也能做到。只有生态，才会让人在离开的时候掂量一下。

## 所以，它是 Agent 时代的 VS Code 吗

现在还不是，但已经走到了一半。

VS Code 当年赢在三件事：免费开源、中立、扩展生态。T3 Code 前两样已经到手，第三样还在门外。如果你想判断它到底能不能成，有一个很简单的信号：看它什么时候发布一套正式的、有版本号的扩展 API。那一天到来之前，它领先的每一步，对手都追得上；那一天之后，追赶的成本会越来越高。

不过我也想说，拿编辑器来比，其实低估了它。VS Code 解决的是一个人怎么更顺手地写代码。我在 T3 里做的事，更接近一个人怎么管一个团队：我不写代码，也不盯 agent，我只跟几个项目经理说话，它们之间自己协作。这件事 VS Code 从来没有做过，因为它出现的时候，还没有需要被管理的 agent。

也许十年后再回头看，人们会记得 T3 Code 是第一个让普通开发者带起一支 agent 团队的工具。前提是，它得先把生态这一步走完。


## 参考资料

[1] LSP（Language Server Protocol，语言服务器协议）  
https://microsoft.github.io/language-server-protocol/

[2] T3 Code  
https://t3.codes/

[3] T3 Code 的 GitHub 仓库  
https://github.com/pingdotgg/t3code

[4] Semon  
https://github.com/onsager-ai/semon

[5] Duhem  
https://github.com/onsager-ai/duhem

[6] Ostrom  
https://github.com/onsager-ai/ostrom

[7] Tolmap  
https://github.com/onsager-ai/tolmap

[8] Magpie  
https://github.com/yetone/magpie

[9] 控制论里的可生存系统模型  
https://www.marvinzhang.dev/zh/blog/vsm-cybernetics-system-organization

[10] 统计过  
https://zenn.dev/53able/articles/57952c1982de3d

[11] README  
https://github.com/getpaseo/paseo

[12] 文档  
https://github.com/tiann/hapi/blob/main/docs/guide/how-it-works.md

[13] Hacker News 的一个讨论  
https://news.ycombinator.com/item?id=49234056

[14] 一个包装 Codex 的开源 agent 编程应用  
https://news.ycombinator.com/item?id=47283655

[15] Codex App Server  
https://openai.com/index/unlocking-the-codex-harness/

[16] 提议做一套扩展 API  
https://github.com/pingdotgg/t3code/discussions/6837

[17] 提议做一套插件 SDK  
https://github.com/pingdotgg/t3code/issues/6419

[18] 绕开这个限制  
https://github.com/maddada/t3code-extensions

---

📝 **本文同步发布于我的个人技术博客** [marvinzhang.dev](https://www.marvinzhang.dev/zh/blog/t3-code-the-vs-code-of-the-ai-agent-era)

🔗 **完整文章链接：** https://www.marvinzhang.dev/zh/blog/t3-code-the-vs-code-of-the-ai-agent-era

💬 **欢迎访问我的博客了解更多技术文章！**