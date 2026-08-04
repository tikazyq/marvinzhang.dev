# Outline — 它停下来问你，不等于它在把关 (A Pause Is Not a Gate)

## Article Metadata
- **ZH title (primary)**: 它停下来问你，不等于它在把关
- **EN title (restate)**: A Pause Is Not a Gate
- **Slug**: `a-pause-is-not-a-gate`
- **Date**: 2026-08-10
- **Primary locale**: Chinese (draft ZH natively, restate EN)
- **Target length**: ~3,200–3,800 (词/characters)
- **Sections**: Intro + 4 main + Conclusion
- **Difficulty**: intermediate (general engineering reader; no prerequisite reading, no prerequisite paper)

## Content Strategy
- **Shape**: **argument-led, not incident-led.** Author's call (2026-08-04) — no
  first-person incidents, no own-repo logs. State the direction and the argument.
  The structural core is true by construction: *if the party being constrained
  decides whether the constraint fires, it is not a constraint.*
- **Unique angle**: everyone is designing "human-in-the-loop checkpoints"; almost
  nobody separates the stops **the agent chooses to take** from the stops **it
  cannot avoid**. That single test reorganizes the whole topic.
- **Reader journey**: the everyday observation (it asks sometimes, not others) →
  the test that splits gates from courtesies → why courtesies fail exactly when
  needed (the detection literature) → the two things no gate can see (inaction,
  correlated error) → the real ceiling (verification) → where the argument leads.
- **Continuity**: two one-line callbacks to 07-27 only (杠杆＝产出÷注意力 and the
  serial ceiling; 杠杆双刃). Nothing re-derived, nothing re-argued.
- **Voice red line**: not a solution report. The piece ends on an inference that
  has never been run, and says so.
- **Term discipline**: 关卡 (gate) and 客气 (courtesy) are the two load-bearing
  words — plain Chinese, introduced in the hook, never swapped for synonyms.
  「分权」「Amdahl」「四眼原则」 may be *explained* in the body; none may be assumed.
  No 文艺腔 metaphors; reuse 双刃剑 if a metaphor is needed at all.

---

## Introduction (~400–450)

### HOOK (full draft — this is part of the Stage-2 gate)

> 你大概见过这两种情形：同样是让 agent 干活，有时候它干到一半停下来问你一句"要不要继续"，有时候它一口气干到底，招呼都不打一个。
>
> 停下来问，我们一般当成好事——说明它谨慎。但这里值得多问一句：**决定它停不停的，到底是什么？**
>
> 多数时候，这个决定权在它自己手上。它扫了一眼自己要干的活，觉得这事有点大、有点不好回头，于是停下来问一句。这不是把关，这是跟你客气一下。
>
> 把关和客气的区别，其实一句话就能分清：**这次停顿，是被这个动作本身的事实触发的——碰了哪个文件、动了哪条分支、有几条评论还没解决——还是被它对自己的判断触发的？** 只有前一种是关卡；后一种只是长得像关卡。
>
> 麻烦的地方在于：客气恰恰会在最需要它的时候失灵。你之所以要设一道关卡，防的就是它又自信又错的那一次；而"自信"正是那个把"我先问一句"压下去的东西。它错得越离谱，越不会停下来问你。
>
> 上一篇说的是[把不需要你判断的事从你这儿挪走](/blog/cheap-code-scarce-attention)。这一篇说挪走之后的事：你留下的那些关卡，有多少其实只是客气；就算全是真关卡，还有一整类事情它们根本看不见；以及为什么最后卡住整个系统的，偏偏是"验证"这一件事。

- Roadmap is the last paragraph above — implicit, one sentence, no bullet list.
- `{/* truncate */}` goes after the hook.

---

## Section 1 — 关卡和客气，差在谁按下那个开关 (~700–850)

- **Focus**: the distinction and its operational test. This section must be
  usable tomorrow by a reader who reads nothing else.
- **Beats**:
  1. Define both plainly. **关卡** = the trigger reads a fact about the action
     (path touched, branch, count of unresolved threads, whether a command is
     destructive). **客气** = the trigger reads the agent's own assessment of its
     own work（"这个改动有点大，我确认一下"）.
  2. The test, stated once and bolded: **触发它的是动作的事实，还是它对自己的评估？**
     Everything else follows from this one question.
  3. Why the difference is not academic: a courtesy is *negatively correlated*
     with need. The case you built the stop for is the case where the agent is
     confident and wrong — and confidence is exactly what suppresses the pause.
     A courtesy is most reliable when it is least necessary.
  4. **The structural point, by construction (replaces the cut incident):** a
     condition whose satisfaction is judged by the party it constrains is not a
     condition. No anecdote needed — it is the same reason nobody grades their own
     exam. Applies to any condition an agent can move by itself:
     "评论都解决了""测试都过了""该改的都改完了".
  5. Anthropic's own framing as the outside anchor:
     [Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)
     (2024-12) says agents must "gain 'ground truth' from the environment at each
     step (such as tool call results or code execution)". Ground truth from the
     environment vs. the agent's self-report **is** this distinction, in the
     vendor's own words.
- **Visual — Figure 1 (示意)**: the same pause, two trigger sources. Left: a fact
  about the action reaches the gate → it fires whether or not the agent agrees.
  Right: the agent's self-assessment is the trigger → the party being constrained
  is holding the switch. Same-looking pause, different circuitry.
- **Takeaway**: 不要问"它有没有停下来问你"，要问"这一下是谁按的".
- **Transition**: 客气靠 agent 先发现自己该停——那它发现得了吗？

## Section 2 — 自己查不出自己 (~750–850)

- **Focus**: a courtesy asks the agent to *notice* it should stop. Detection is
  precisely the capability the literature measures as weakest — so the courtesy
  is built on the softest ground available.
- **Beats**:
  1. [Tyen et al., ACL 2024 Findings](https://arxiv.org/abs/2311.08516) — the
     load-bearing citation. Best model (GPT-4) finds the mistake **52.87** of the
     time; hand it the location and correction jumps **+18%–44%**. Human
     annotators agree at α 0.979–0.998, i.e. **the cases are obvious to people**.
     Plain reading: 会改，但找不到；瓶颈在发现，不在修。
     ⚠ State the limit in the text: these are reasoning traces, not code review —
     borrowing the mechanism by analogy (same discipline as Baumol last time).
  2. [Huang et al., ICLR 2024](https://arxiv.org/abs/2310.01798) — one sentence:
     without external feedback, self-correction can make things *worse*. The
     operative words are 没有外部反馈 — exactly a courtesy's operating condition.
  3. [Chen et al. 2026](https://arxiv.org/abs/2606.05976) — the sharpest version,
     handled honestly. Keep the wrong statement byte-identical and change only
     *whose* it appears to be — the agent's own thought vs. a tool result vs. a
     user message — and the explicit-correction rate moves **23–93 percentage
     points** across 10 of 12 settings. 同一句话，换个来源，就查出来了。
     ⚠ **Must carry the authors' own reading**: they call it an artifact of role
     labeling rather than a capability deficit, and expect training to close it.
     Preprint, no venue. Say all of that in the same breath.
  4. The inference this section earns: 这不是提示词写得不够好的问题。把"发现"这一步
     留在被检查的一方身上，关卡就建在了最薄的地方——而且薄得很有规律，不是随机地薄。
- **Visual — Figure 2 (示意)**: same erroneous claim, three source labels
  （自己的想法／工具返回／别人说的）→ detection steps up as the content stops being
  "its own". Caption marks it 示意 and names the source paper's caveat.
- **Takeaway**: 客气依赖的那个能力，正是研究里最差的那个。
- **Transition**: 那就把客气都换成真关卡——不够。真关卡也有两类事看不见。

## Section 3 — 就算全是真关卡，也有两件事看不见 (~800–900)

- **Focus**: two blind spots that better gate *design* does not fix. Must not read
  as a checklist — both beats end in the same place (verification).
- **Beats — (a) 不作为**:
  1. Every gate is a predicate evaluated **when something happens**. No event, no
     evaluation. An agent that quietly *doesn't* do a thing — 没跑那个检查、没扫完
     剩下的一半、没把那个问题重新提出来 — trips nothing at all.
  2. [Arike, Donoway, Bartsch & Hobbhahn (Apollo, 2025)](https://arxiv.org/abs/2505.02709),
     Finding 8: "Goal drift tends to be larger through inaction than through
     action" — inaction scores consistently exceed action scores across models and
     conditions.
     ⚠ Honesty in the same paragraph: stock-trading simulation, and "不作为" there
     means one specific thing（工具阶段结束后没把该卖的卖掉）. Also report the
     counter-evidence — scaffolded Claude 3.5 Sonnet held goal adherence past
     90,000 tokens. The structural point stands without the study; the study is one
     measured instance, not a law.
  3. Why no gate design reaches this: 你没法给"没发生的事"挂钩子。补救只能来自另一
     侧——定期核对该发生的事有没有发生，而那是验证，不是关卡。（引出第四节）
- **Beats — (b) 相关性错误**:
  4. Callback to 07-27 in one line: 上一篇说杠杆会放大你错的判断。其实还要更狠一点。
  5. The sharpening: 一个人自己干，犯的是五十个各不相同的错；一条规范交给五十次执行，
     犯的是同一个错五十次。杠杆放大的不是方差，是偏差。
  6. [Kleinberg & Raghavan, PNAS 2021](https://arxiv.org/abs/2101.05853): a group
     of decision-makers converging on a single algorithm "even when the algorithm
     is more accurate for any one agent in isolation, can reduce the overall
     quality of the decisions" — under normal operation, no shock required.
     ⚠ Name the difference: their setting is many organizations sharing one
     algorithm, ours is one person delegating across many runs; the shared
     mechanism is that errors stop being independent.
     [Bommasani et al., NeurIPS 2022](https://arxiv.org/abs/2211.13972) in one
     clause (shared training data reliably increases homogenization), with its own
     nuance flagged (the foundation-model result is mixed, depends on adaptation).
  7. **The operational payoff — what the section is for**: 逐条审是为"各不相同的错"
     设计的姿势，成本随委托量线性涨，而且照样漏；抽样查重复的规律是为"同一个错很多遍"
     设计的，成本次线性。既更便宜，也更对症。
- **Visual — Figure 3 (示意)**: independent error (scatter around the target,
  found one at a time) vs. correlated error (one tight cluster off-target, a small
  sample reveals the whole pattern).
- **Takeaway**: 关卡挡的是动作；漏掉的是"没发生"和"重复发生"。
- **Transition**: 这两条补救指向同一件事——验证。而验证正是那个卡住全局的东西。

## Section 4 — 天花板是验证 (~700–800)

- **Focus**: name which part of the serial bottleneck is doing the work. This is
  where the piece turns from a taxonomy into an argument.
- **Beats**:
  1. One-line callback: 上一篇说注意力是串行的、卡住全局。这一篇把那部分点名：是验证。
  2. The chain, stated cleanly: 第二节说了 agent 自己的报告不能算证据 ⇒ 验证没法委托
     出去 ⇒ 委托的活越多，要验的就越多，而且是线性地涨 ⇒ 它成了整个系统的上限。
  3. [Amdahl 1967](https://dl.acm.org/doi/10.1145/1465482.1465560) — **explained
     before it is named** (constraint 6.3): 一件工作里如果有一部分必须一件一件按顺序
     做，那不管你堆多少并行的机器，总加速最多也就是那部分占比的倒数。1967 年 Amdahl
     讲的是处理器，形状跟这里一模一样。Ties back to 07-27's 1/σ ceiling.
  4. The consequence that matters: 多委托执行不动这个上限——分子涨了，串行的那部分也
     跟着涨。只有把验证机械化才动它。
  5. Mechanizing verification is **a different kind of work from delegating
     execution**: 委托是"把活派出去"；机械化验证是"把判定条件写成不需要人、也不需要
     agent 点头的东西"——测试、断言、可复算的检查、外部裁判。
     [PushBench](https://arxiv.org/abs/2605.23574) framing in one line: 干完的活要
     外部裁判认了才算数，重复劳动和假完成直接量出来，而不是藏在一个"成功"标志后面
     (v1 preprint — framing only, no numbers).
  6. Outside corroboration that verification is a first-class failure category,
     not a footnote: [Cemri et al.](https://arxiv.org/abs/2503.13657) annotated
     1600+ traces across 7 frameworks; of the three top-level failure categories,
     one is **task verification**（提前收工／没验／验错了）.
     ⛔ No percentages — the paper publishes no category-level split.
  7. Anthropic, same anchor as §1, closing the loop: automated testing verifies
     functionality, "human review remains crucial" for whether the solution fits
     the broader system. 能机械化的和不能机械化的，边界大致就在这儿。
- **Visual (optional Figure 4; cut if the piece runs long)**: delegated execution
  scales out, verification stays serial → output flattens against the verification
  line.
- **Takeaway**: 加委托不动天花板，机械化验证才动。
- **Transition**: 那按这个论证走下去，关卡该长什么样？

---

## Conclusion — 论证指向哪里（以及它没被跑过） (~350–400)

- **Not a solution report.** Constraints 6.1 and 6.2 both bite here.
- **Beats**:
  1. Where the argument leads, stated as an inference: 如果条件的判定权不能落在被约束
     的一方手上，那么检查的一方就得和执行的一方分开——各自独立、只通过留下的产物交流
     （代码、日志、测试结果），而条件本身两边都改不了。别的行业里这是老做法（财务上的
     复核、发布上的双人签字），这里只是把它搬到 agent 身上。
     ⚠ 「分权」「四眼原则」 explained in half a sentence if used at all; never assumed.
  2. **The honest blank, explicitly**: 这套东西我没跑过。上一篇留的空白是一个没人量过
     的倍数，这一篇留的空白是一个没被验证过的设计。把洞指出来，比端出一个还没试过的
     方案要诚实。
  3. What the reader can use tomorrow — the one-line test, restated: 下次 agent 停下来
     问你，先问一句：**这一下，是谁按的？**
  4. Final beat tying back to 07-27 without repeating it: 上一篇说把不需要你判断的事挪
     走；这一篇说，挪的时候要看清楚——你以为设了关卡的地方，可能只是它跟你客气。

---

## Figures (deliverable, not extra)

| # | Section | Content | Status |
| - | ------- | ------- | ------ |
| 1 | §1 | 同一个停顿，两种触发源：动作事实 → 关卡；自我评估 → 被约束方握着开关 | required |
| 2 | §2 | 同一句错误内容，来源标签一换，被发现的概率就跳（示意，标注来源论文 caveat） | required |
| 3 | §3 | 独立错误（散布，需逐条审）vs 相关性错误（一簇偏在同一处，抽样即现形） | required |
| 4 | §4 | 委托可以横向扩张，验证仍是串行 → 产出撞上验证线 | optional |

House style: 860px canvas, semantic palette, bilingual variants, HTML sources in
`drafts/2026-08-10-a-pause-is-not-a-gate/figures/`, rendered to
`static/img/blog/2026-08-10-a-pause-is-not-a-gate/`. All illustrative values
marked **示意**.

## Stage-3 guard rails (re-read before writing each section)

- [ ] No first-person incident, no own-repo logs, no private numbers
- [ ] Every study carries its own limit in the same paragraph, not in a footnote
- [ ] No category-level percentages from Cemri; no numbers from PushBench
- [ ] 2606.05976 always cited with the authors' optimistic reading
- [ ] 2505.02709 attributed to Arike et al., with the Sonnet counter-evidence
- [ ] Amdahl explained in plain words before the name appears
- [ ] Conclusion states the design has never been run
- [ ] zh-voice red lines: no 文艺腔 metaphor, no calque; read every sentence as
      "would the author say this to a colleague out loud?"
