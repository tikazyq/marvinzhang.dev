# 中文语感：作者本人的声音

依据作者 2021–2023 年手写文章（golang、typescript、csharp、frontend-engineering、
unit-tests 等）总结的中文用词习惯。中文版初稿和译文都要按这份清单校准——
2026-07 的 stack-selection 文章曾因违反这两条红线被作者两轮返工。

## 总原则

平实直白的技术博客语感，像跟同行聊天。判断标准：**这句话作者会在跟同事
聊天时说出口吗？** 说不出口的，换掉。

## 作者的惯用元素（可放心使用）

- **大众成语/俗语**：大红大紫、炙手可热、双刃剑、万能药、熊掌和鱼兼得、
  天下苦 X 久矣、酒香不怕巷子深、如鱼得水、大名鼎鼎、摸爬滚打、真金白银、
  用脚投票、盖棺定论、浮出水面
- **口语吐槽**：啰嗦、又臭又长的八股文、山寨版、划不划算、学得动么
- **自称**：笔者、我们（不端着）
- **开头**：爱引名言古语（围城、三国）
- **网络常用语**：考古、梗、入坑（语感兼容）

## 红线一：文艺腔比喻（作者从不这么写）

翻译文学式的抽象比喻一律不用：器物、承重墙、加冕、王冠、世袭、量纲、
口粮、仪器、秤、腐蚀、投下阴影、迎头相撞、收束、显形、判词、
冷幽默的公道……

需要比喻时优先复用作者自己用过的：双刃剑、万能药、围城、八股文。
不新造文学比喻。

## 红线二：英语直译表达（calque）

英语修辞直译成中文会露馅。实例对照（均出自被返工的初稿）：

| 英语思维 | ❌ 直译 | ✅ 自然中文 |
|---------|--------|-----------|
| stress-test the argument | 对论点做压力测试 | 检验它到底站不站得住 |
| candidate thesis / restrained version | 候选论点 / 克制版本 | 核心论点 / 最保守的说法 |
| promote to first-class criteria | 升为一等公民的判据 | 必须优先考虑的判据 |
| disagree efficiently | 有效率地不同意 | 能清楚分歧出在哪里 |
| put a price on X | 为 X 标了价 | 为 X 掏了真金白银 |
| what did they buy | 他们买到了什么 | 这笔投入换来了什么 |
| loop mechanics, not language loyalty | 循环力学，不是语言忠诚 | 看重反馈循环的效率，而不是对语言的感情 |
| productization of the argument | 论证的产品化 | 把论点直接做成了产品 |
| narrows the scope | 收窄命题的适用范围 | 限定论点的适用范围 / 划边界 |
| X sets the starting point | X 设定起点 | X 决定起点 |
| every strength casts a shadow | 每个优点都投下阴影 | 每个优点都是双刃剑 |
| no plausible human explanation | 找不到合理的人类解释 | 显然不是真人用户能带来的增长 |
| the judgment layer above | 之上的判断层 | （拆开直说，不造抽象名词） |
| a successor question the old grammar can't hold | 旧争论的语法装不下的后继问题 | 旧争论的框架装不下的新问题 |
| hand the agent a loop | 递给 agent 什么样的循环 | 给 agent 一个什么样的循环 |
| it sits far right on the chart | 它坐得再靠右 | 它在图上的位置再漂亮 |
| the villain of the piece | 全文的反派 | 全文批判的对象 |
| expensive to reach, random to reproduce | 触达昂贵、复现随机 | 暴露出来代价已经很高，复现全凭运气 |
| framed entirely as | 完全框定为 | 都当成 |
| interface as docs, autocomplete as comfort | 接口即文档，自动补全即舒适 | 接口就是文档，自动补全让写代码舒服了不少 |

规律：英语爱用**名词化抽象**（productization、mechanics、layer）和
**器物隐喻**（price、buy、shadow、instrument），自然中文把它们拆回
动词短语和大白话。

## 校对流程

1. 中文稿完成后单独通读一遍，只挑"聊天说不出口"的句子
2. 比喻逐个过：不是作者用过的比喻，就换成平实说法
3. 配图里的中文短语同样要过这两条红线（图文一致，改文必查图）
4. 结构性修辞（章节命名的框架，如"反方证词"）在大纲阶段与作者确认，
   正文用词一律平实
