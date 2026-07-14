# Research — Multi-Agent Teams and the Measurable Coordination Tax

> **Stage 1 discipline note.** The prompt's "research leads" were memory-based quotes, explicitly flagged as possibly wrong. Every number below was independently re-verified via web search against a primary source (paper / official blog). Numbers that could not be traced to a primary source are listed under **Discarded** and must not appear in the article.

---

## Article Metadata

| Field | Value |
| ----- | ----- |
| **Slug** | `multi-agent-teams-and-the-measurable-coordination-tax` |
| **Date** | 2026-07-13 |
| **EN title (primary)** | Why AI Agent Teams Can't Escape the Mythical Man-Month |
| **ZH title (primary)** | 《为什么 AI Agent 团队也逃不过"人多了反而慢"？》（2026-07-14 第五轮：标题不预设读者认识《人月神话》）|
| **EN tags** | `ai`, `agents`, `multi-agent`, `scalability`, `software-engineering` |
| **ZH tags** | `AI`, `智能体`, `多智能体`, `可扩展性`, `软件工程` |
| **EN target length** | ~3,400–3,900 words |
| **ZH target length** | ~3,400–3,900 characters |
| **EN MDX** | `blog/2026-07-13-multi-agent-teams-and-the-measurable-coordination-tax.mdx` |
| **ZH MDX** | `i18n/zh/docusaurus-plugin-content-blog/2026-07-13-...mdx` |
| **Component** | `src/components/ScaleCurveWidget.tsx` (+ `.module.css`), imported in both locales |

---

## Core Thesis

Multi-agent LLM systems are reproducing, with mathematical precision, the same "more people, slower team" pathology that has haunted human organisations for fifty years — the Universal Scalability Law's coherence/coordination term. But agents are the **first organisational form in history that can be fully instrumented**: every interaction is token-accounted, team size N is a free variable you can re-run, and agents don't game their metrics. The twenty-year-old answer (Gunther's USL, Brooks's man-month) is, for the first time, empirically verifiable and measurable.

USL appears **once** as the mathematical authority, then exits. The article is about *measurability*, not about deriving USL.

---

## Cluster A — Google/MIT: "Towards a Science of Scaling Agent Systems" ✅ VERIFIED

- **Real paper.** Yubin Kim (MIT), Ken Gu, Chanwoo Park, et al., MIT + Google Research / Google DeepMind.
- **arXiv:** [2512.08296](https://arxiv.org/abs/2512.08296) — v1 **Dec 9, 2025**; revised to v3 **Apr 8, 2026**.
- **Google Research blog:** https://research.google/blog/towards-a-science-of-scaling-agent-systems-when-and-why-agent-systems-work/
- **Full text (v1):** https://arxiv.org/html/2512.08296v1

| Sub-claim (lead) | Verified from primary source | Verdict |
|---|---|---|
| ~180 configurations | v1 + blog: **180 configurations**; revised v3 expanded to **260** across six benchmarks | MATCH (v1/blog = 180) |
| Centralized +80.9% on parallelizable | Blog + paper: **+80.9%** (mean 0.631 vs single-agent 0.349) on Finance-Agent | MATCH (exact) |
| Sequential (PlanCraft) degrade 39–70% | Blog: "every multi-agent variant we tested degraded performance by **39–70%**"; centralized on PlanCraft −50.4% | MATCH (exact) |
| Optimal cluster ~3–4 agents | "per-agent reasoning capacity becomes prohibitively thin beyond **3–4 agents**, creating a hard resource ceiling" | MATCH (as ceiling) |
| "tool-coordination trade-off" | Verbatim term; **β = −0.330, p < 0.001**, strongest predictor in their scaling law | MATCH (exact) |

- **Error-amplification (belongs to THIS paper, NOT MAST):** Independent MAS amplify errors **17.2×** (95% CI [14.3, 20.1]); centralized contains to **4.4×** (95% CI [3.8, 5.0]) via validation bottlenecks. Decentralized 7.8×, Hybrid 5.1×.
- Predictive model picks the optimal coordination strategy for **87%** of unseen configurations.
- Central thesis phrase: **"architecture–task alignment determines collaborative success."**
- **Usage rule:** cite "180 configurations" with the Google Research blog. Use +80.9% / 39–70% / 3–4 agents / tool-coordination trade-off / 17.2× / 4.4× — all confirmed.

---

## Cluster B — Cemri et al.: "Why Do Multi-Agent LLM Systems Fail?" (MAST) ✅ VERIFIED

- **Real paper.** Mert Cemri, Melissa Z. Pan, … Matei Zaharia, Joseph E. Gonzalez, Ion Stoica (UC Berkeley et al.).
- **arXiv:** [2503.13657](https://arxiv.org/abs/2503.13657) — v1 Mar 17 2025; **NeurIPS 2025** Datasets & Benchmarks Track.
- Proposes **MAST** (Multi-Agent System Failure Taxonomy): 3 categories, 14 failure modes, 7 frameworks, Cohen's κ = 0.88.

| Sub-claim (lead) | Verified | Verdict |
|---|---|---|
| 200+ vs 1600+ traces | v1 ≈ **200 tasks / ~150–200 traces**; v3/NeurIPS adds **MAST-Data, 1600+ annotated traces** | MATCH (cite 1600+) |
| 36.9% inter-agent misalignment | **Specification 41.77% / Inter-Agent Misalignment 36.94% / Task Verification 21.30%** | MATCH (≈37%) |
| Failure rates 40–80% | Correctness as low as **25% (ChatDev)**; failure rates roughly **41–86.7%** | MATCH (say "40–86%") |
| No-coordination 17× / centralized 4.4× | ❌ **MISATTRIBUTED** → Kim et al. (Cluster A) | Move to A |

- **Usage rule:** MAST supports the taxonomy, 1600+ traces, 7 frameworks, 14 modes, **~37% inter-agent misalignment** (with 42% specification / 21% verification), failure rates 40–86%. Do **not** attribute 17×/4.4× to MAST.

---

## Cluster C — Coordination-cost / token-overhead studies (heavily contaminated leads)

> Method note: web-search AI summaries in this cluster parrot the query's numbers, so only primary-confirmed facts are kept. Most leads DISCARDED.

### C1 — "72/86/53% token duplication" ❌ DIFFERS → reframe or discard the numbers
- **Underlying paper is real:** *AgentTaxo: Dissecting and Benchmarking Token Distribution of LLM Multi-Agent Systems*, OpenReview [`0iLbiYYIpC`](https://openreview.net/forum?id=0iLbiYYIpC), ICLR 2025 Workshop on Foundation Models in the Wild (~Mar 2025).
- The **Galileo blog** (https://galileo.ai/blog/multi-agent-coordination-strategies) relays it but **mislabels** the finding as "token duplication rates of 72% (MetaGPT), 86% (CAMEL), 53% (AgentVerse)."
- **What AgentTaxo actually shows:** it categorises tokens by role (planner / reasoner / verifier), frames duplicated context as a **"communication tax,"** reports input:output token ratios of **2:1–3:1**, and finds the **verification phase dominates consumption (~72% of tokens in one MetaGPT "2048" experiment)** — a phase-share, not a duplication rate. The 86%/53% could NOT be confirmed against the primary.
- **Usage rule:** DO NOT cite "72/86/53% duplication." MAY cite AgentTaxo for the qualitative point that **most tokens go to verification/redundant shared context, not to the visible hand-off messages** (this is a load-bearing point for the "measurement honesty" section). Cite as AgentTaxo, ICLR 2025 FM-Wild workshop.

### C2 — "1.5×–7× necessary tokens" ❌ DISCARD (Galileo-blog-only, no primary)

### C3 — "5-agent code review 42k–71k tok, 29–38% redundant" (arXiv 2604.17400) ❌ DISCARD numbers, keep the real paper
- **arXiv [2604.17400](https://arxiv.org/abs/2604.17400) is real:** *Phase-Scheduled Multi-Agent Systems for Token-Efficient Coordination* (PSMAS), Mohit Dubey, Apr 2026.
- It reports a **mean token reduction of 27.3% (range 21.4–34.8%)** from phase-scheduling — NOT the "42k–71k tokens / 29–38% redundant" figures, which appear in no primary.
- **Usage rule:** DISCARD the fabricated numbers. MAY cite PSMAS for "coordination overhead is real and reducible — scheduling cut tokens ~27% at equal accuracy," as evidence overhead is a measurable engineering quantity.

### C4 — "E1/E2/E3/E4 four-dimension eval framework" (arXiv 2605.02801) ❌ DISCARD
- arXiv 2605.02801 is a DIFFERENT (RL orchestration) paper; no E1–E4 framework found. Related real benchmarks: MultiAgentBench (2503.01935), but not this taxonomy. Do not cite the E1–E4 scheme or ID.

### C5 — "LatentMAS": collaboration without natural-language messages ✅ VERIFIED
- **Real paper:** *Latent Collaboration in Multi-Agent Systems* (framework **LatentMAS**), arXiv [2511.20639](https://arxiv.org/abs/2511.20639), Nov 2025.
- Training-free; agents collaborate in continuous **latent space** (last-layer hidden embeddings + shared latent working memory) instead of NL text.
- Results: **up to 14.6% higher accuracy, 70.8–83.7% fewer output tokens, 4–4.3× faster inference.**
- **Usage rule:** KEY for the measurement-honesty section — proves **coordination can happen without any natural-language message to count.** Name is "LatentMAS" (not "Latent-MAS").

---

## Cluster D — Silo-Bench, single>multi, USL origin, Brooks ✅ VERIFIED

### D1 — Silo-Bench / RCC ✅ VERIFIED
- **Real paper.** Zhang, Liu, Shan, et al., *"Silo-Bench: A Scalable Environment for Evaluating Distributed Coordination in Multi-Agent LLM Systems,"* arXiv [2603.01045](https://arxiv.org/abs/2603.01045) (Mar 1 2026). Code: https://github.com/jwyjohn/acl26-silo-bench
- **RCC = 1 − SR(N=k)/SR(N=1)** — "the fraction of single-agent performance lost to coordination overhead."
- **At k=2, multi-agent systems lose 15–49%** of single-agent performance (Level I 15.2%, Level II 31.1%, Level III 48.8%); RCC reaches **80–100% at k=50** for Level-II/III.
- **Usage rule:** use RCC definition + "15–49% lost at k=2." This is the cleanest example of the **whole-outcome measurement route**.

### D2 — Strong single agent vs multi-agent ✅ thesis VERIFIED, ❌ lead citation fake
- **`gao2025singleagent` does not exist — DISCARD key.**
- Real: **Cognition — "Don't Build Multi-Agents"**, Walden Yan, Jun 2025 (https://cognition.com/blog/dont-build-multi-agents); follow-up **"Multi-Agents: What's Actually Working"**, Apr 2026 (https://cognition.com/blog/multi-agents-working).
- **Honest counterpoint — Anthropic — "How we built our multi-agent research system"**, Jun 2025 (https://www.anthropic.com/engineering/multi-agent-research-system): multi-agent **beat single-agent Opus 4 by 90.2%** on breadth-first research. Use as counterweight — multi-agent wins when the task is genuinely parallel (consistent with Cluster A).

### D3 — USL origin ✅ VERIFIED
- **Neil J. Gunther, *Guerrilla Capacity Planning*, Springer, 2007** (https://link.springer.com/book/10.1007/978-3-540-31010-5).
- Canonical: **C(N) = N / [1 + α(N−1) + βN(N−1)]**, α = contention, β = coherency-delay. Synopsis: https://www.perfdynamics.com/Manifesto/USLscalability.pdf
- Article's throughput form **X(N) = λN / (1 + σ(N−1) + κN(N−1))** = λ·C(N); σ = contention, κ = coherency. Equivalent.
- Translate: **λ** solo throughput; **σ** queueing/contention; **κ** coherence/coordination = the **N² term** = strict Mythical-Man-Month. **N\* = √((1−σ)/κ)** = closed-form two-pizza optimum.

### D4 — Brooks, *The Mythical Man-Month* ✅ VERIFIED
- **Fred Brooks, 1975, Addison-Wesley.** Communication paths = **n(n−1)/2** (4→6, 16→120). Growth is **quadratic**, NOT exponential. **Brooks's Law:** "Adding manpower to a late software project makes it later."

---

## Author's illustrative USL data — ✅ re-derived and confirmed

Constructed by the author from the USL formula (an **illustrative fit**, not an empirical survey — MUST be labelled as such in-article). Verified by direct computation:

**Human team:** λ=4.64 PR/person/week, σ=0.0158, κ=0.0146.

| N | X(N) = output | η(N) = X/λN | FTE-equivalent (X/λ) |
|---|---|---|---|
| 2 | 8.88 PR/wk | **95.7%** ("≈96%") | 1.91 |
| 8 | **19.25** PR/wk ("≈19.2") | **51.9%** ("≈52%") | 4.15 |
| 16 | **15.66** PR/wk ("≈15.6") | **21.1%** ("≈21%") | **3.37** ("≈3.4 full-timers") |

- **N\* = √((1−0.0158)/0.0146) = 8.21** ("≈8.2"). ✔ All author figures confirmed.

**Agent team (widget only):** λ=1.0, σ=0.08, κ=0.02 → **N\* = √(0.92/0.02) = 6.78** (widget computes live; label "≈7"). Same curve *shape* is intentional.

**Communication paths:** 4 → **6**, 16 → **120**. ✔ (pure combinatorics)

---

## Measurement-honesty logic (for Body Two)

The prompt's key intellectual guardrail — do NOT claim "count the inter-agent message tokens = coordination cost." Evidence:
- **AgentTaxo (C1):** the largest token cost sits in verification / redundant shared context, not the visible hand-off messages.
- **LatentMAS (C5):** coordination can happen entirely in latent space — there is no NL message to count at all.
- Therefore two honest routes:
  1. **Whole-outcome (result-side):** measure output at different N; coordination cost shows up as the **curve bending away from the ideal line** — no decomposition, no attribution needed. Exemplars: Silo-Bench RCC (D1), Google's scaling law (A). Pair with **Duhem–Quine**: you can measure the aggregate deviation without isolating which mechanism caused it.
  2. **Process-side (a basket of proxies):** context-duplication accounting (AgentTaxo), agent utilisation, per-delegation cost, error-amplification ratio (17.2× / 4.4×, Cluster A). Each is a proxy, not the whole.

Why agents are the first fully instrumentable organisation (three classic obstacles removed):
- Org economics never had per-interaction logs → agents: **every token accounted.**
- Never able to randomly re-run team size N → agents: **re-run the same task batch at any N.**
- Humans game the metric (Goodhart) → agents: **don't optimise against the observ­ability layer they can't see.**

---

## Source URL master list

1. Kim et al., Science of Scaling Agent Systems — https://arxiv.org/abs/2512.08296 · blog https://research.google/blog/towards-a-science-of-scaling-agent-systems-when-and-why-agent-systems-work/
2. Cemri et al., MAST — https://arxiv.org/abs/2503.13657
3. AgentTaxo — https://openreview.net/forum?id=0iLbiYYIpC
4. PSMAS (Dubey) — https://arxiv.org/abs/2604.17400
5. LatentMAS — https://arxiv.org/abs/2511.20639
6. Silo-Bench — https://arxiv.org/abs/2603.01045
7. Cognition, Don't Build Multi-Agents — https://cognition.com/blog/dont-build-multi-agents
8. Cognition, Multi-Agents: What's Actually Working — https://cognition.com/blog/multi-agents-working
9. Anthropic, Multi-Agent Research System — https://www.anthropic.com/engineering/multi-agent-research-system
10. Gunther, Guerrilla Capacity Planning (2007) — https://link.springer.com/book/10.1007/978-3-540-31010-5 · USL synopsis https://www.perfdynamics.com/Manifesto/USLscalability.pdf
11. Brooks, The Mythical Man-Month (1975) — https://en.wikipedia.org/wiki/The_Mythical_Man-Month

---

## Discarded leads (must NOT appear in article)

- **`gao2025singleagent`** — fabricated citation key. Thesis kept via Cognition + Anthropic.
- **17×/4.4× as MAST findings** — misattribution; belong to Kim et al. (Cluster A). Kept, re-attributed.
- **"72% / 86% / 53% token duplication rates"** — Galileo-blog mislabel of AgentTaxo; 72% is a verification-phase share, 86%/53% unconfirmed. Qualitative AgentTaxo point kept; the three percentages dropped.
- **"1.5×–7× necessary tokens"** — no primary source. Dropped.
- **"5-agent code review: 42k–71k tokens/call, 29–38% redundant context"** — appears in no primary; the cited arXiv 2604.17400 actually reports 27.3% reduction. Numbers dropped; PSMAS's real 27.3% figure kept.
- **"E1/E2/E3/E4 four-dimension evaluation framework" (arXiv 2605.02801)** — that ID is an unrelated RL paper; framework unfindable. Dropped entirely.

---

## 追加验算（2026-07-13，作者提问"能不能压 σ"）

σ vs κ 不对称性（agent 模式参数验算，公式 N\* = √((1−σ)/κ)）：
- 基线 σ=0.08, κ=0.02 → N\* = 6.8
- 压 σ 四倍（0.08→0.02，κ 不变）→ N\* = 7.0（曲线抬高 ~18%，峰位几乎不动）
- 压 κ 四倍（0.02→0.005，σ 不变）→ N\* = 13.6（有效协作规模翻倍）

结论写入职业发展一节：σ 线性、可用钱买（加环境/并发/副本），不构成稀缺；κ 平方、只能靠设计。压 σ 让现有团队更顺，压 κ 推远规模天花板。
另：职业发展一节新增站内引用《除了画架构图，架构师还需要些什么》(/blog/architect-essential-skills)——架构师的"软技能"（沟通/协调/划边界）= 压 κ 的活。
