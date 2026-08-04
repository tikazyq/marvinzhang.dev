# Research — 怎么才能不给 agent 当保姆？(How Do I Stop Babysitting My Agent?)

> **Stage 1 discipline note.** Every source below was opened at its primary page
> (arXiv abs/html, publisher, vendor engineering blog) and the quoted lines were
> read there. Nothing is cited from a secondary summary. Two handoff-supplied
> items were **wrong and are corrected below** (author attribution on 2505.02709;
> the actual finding of 2606.05976). Anything that could not be confirmed sits in
> **Discarded / do-not-use**. This piece is **structural**: its spine is an
> argument about who holds the trigger, and external evidence is used to show
> that the capability a courtesy depends on is the one models lack — never to
> claim a measured rate.

---

## Article Metadata

| Field | Value |
| ----- | ----- |
| **Slug** | `stop-babysitting-your-agent` |
| **Date** | 2026-08-10 |
| **ZH title (primary)** | 怎么才能不给 agent 当保姆？ |
| **EN title (restate)** | How Do I Stop Babysitting My Agent? |
| **Primary locale** | **Chinese** (公众号 audience) — draft ZH natively, restate EN |
| **Tags** (English slugs in **both** locales — repo convention) | `ai`, `agents`, `software-engineering`, `productivity` |
| **Target length** | ~3,200–3,800 词 / characters |
| **EN MDX** | `blog/2026-08-10-stop-babysitting-your-agent.mdx` |
| **ZH MDX** | `i18n/zh/docusaurus-plugin-content-blog/2026-08-10-stop-babysitting-your-agent.mdx` |
| **Relation to prior work** | Continuation of `2026-07-27-cheap-code-scarce-attention`. Two one-line callbacks only (杠杆＝产出÷注意力／串行天花板；杠杆双刃). Nothing re-derived. |

---

## The question the piece answers

作者原话（也是全文的出发点）：**"我需要 babysit 这个 agent，而不是让它自主循环去做事。"**
文章是一个问题—答案结构：**为什么你走不开？怎么才能走开？**

**主张（一句话）**：
> 你走不开，不是因为 agent 不行，是因为**"什么时候停"这件事由它自己说了算**，
> 而**验证又委托不出去**。前者能改，后者只能靠机械化一点点往回推。

The operational test, and the one line a reader should be able to use tomorrow:

> **这次停顿，是被动作本身的事实触发的，还是被 agent 对自己的评估触发的？**
> 只有前者是关卡。后者只是长得像关卡的客气。

**标题许诺"怎么办"，正文必须兑现三条可做的**：判定权换成动作事实（§2）、监管从逐条审
换成抽样查规律 + 定期核对该发生的（§3）、把判断写成不需要人点头的条件（§4）。第四条
（检查方与执行方分开）明说没跑过。**不能收在"反正很难"。**

### Four claims this piece must carry (none in the 07-27 piece)

1. **关卡 vs 客气** — the distinction and its operational test. A stop is a gate
   only if something other than the agent decides it fires.
2. **相关性错误** — delegation does not scatter errors, it clones one. Leverage
   amplifies **bias, not variance**. ⇒ the right posture is sampling for repeated
   patterns, not reviewing every item (the only posture whose cost grows
   sub-linearly).
3. **不作为盲区** — every gate hangs off an action; the dangerous failure is a
   non-event. No gate design reaches it — there is nothing to hang the predicate on.
4. **天花板是验证** — if a delegate's report cannot count as evidence, verification
   cannot be delegated ⇒ it grows linearly with delegated work ⇒ Amdahl cap.
   Delegating more execution moves nothing; only mechanizing verification does.

### ⚠ Evidentiary posture (decides the whole shape)

- **No first-person incidents.** Author's call (2026-08-04): the piece states the
  direction and the argument; it does not run on the author's own logs. The
  structural core (**the constrained party must not hold the key to its own
  condition**) is true by construction and needs no anecdote.
- **No unbuilt design presented as a solution.** The separation-of-powers ending
  is an *inference from the argument*, explicitly marked as never run — the same
  habit as 07-27's「一个诚实的空白」.
- **No numbers the author has not measured.** Any illustrative figure is 示意.

---

## Cluster A — Self-verification fails from the inside (claim ①)

### A1 ✅ PRIMARY — Tyen et al., ACL 2024 Findings
- Gladys Tyen, Hassan Mansoor, Victor Cărbune, Peter Chen, Tony Mak,
  "LLMs cannot find reasoning errors, but can correct them given the error location",
  Findings of ACL 2024. https://arxiv.org/abs/2311.08516 (v1 2023-11-14, v3 2024-06-04)
- **Key finding:** "poor self-correction performance stems from LLMs' inability to
  find logical mistakes, rather than their ability to correct a known mistake."
- **Numbers (read in the v3 full text):**
  - Table 4 — best mistake-finding accuracy is GPT-4 at **52.87** overall with
    direct step-level prompting. Models: GPT-4-Turbo, GPT-4, GPT-3.5-Turbo,
    Gemini Pro, PaLM 2 Unicorn.
  - Table 6 — given the oracle mistake location (backtracking), correction on
    originally-incorrect traces improves **+18% to +44%**.
  - Human annotator agreement Krippendorff's α = **0.979–0.998** — i.e. these
    cases are unambiguous to people, and models still miss them.
  - 5 tasks: word sorting, tracking shuffled objects, logical deduction,
    multi-step arithmetic, Dyck languages.
- **Relevance:** the load-bearing citation. A courtesy asks the agent to *notice*
  it should stop; noticing is exactly the capability measured here as weakest.
- **⚠ Usage rule:** BIG-Bench-style reasoning traces, not code review. Borrow the
  mechanism by analogy and **say so in the text** (same discipline as Baumol in 07-27).

### A2 ✅ SUPPORTING — Huang et al., ICLR 2024
- "Large Language Models Cannot Self-Correct Reasoning Yet",
  https://arxiv.org/abs/2310.01798 (v1 2023-10-03, v2 2024-03-14)
- Defines **intrinsic self-correction**: correcting "based solely on its inherent
  capabilities, without the crutch of external feedback." Finding: models
  "struggle to self-correct their responses without external feedback, and at
  times, their performance even degrades after self-correction."
- **Relevance:** establishes "without external feedback" as the operative
  condition — precisely the condition a courtesy runs under. One sentence.

### A3 ⚠️ REAL PAPER, TITLE MISLEADS — Chen et al. 2026
- "The Self-Correction Illusion: Role Relabeling Gates Explicit Error Flagging in
  Large Language Models" — Kuan-Yen Chen, Fang-Yi Su, Shih-Yen Lin, Bao Li,
  Jung-Hsien Chiang. https://arxiv.org/abs/2606.05976 (submitted 2026-06-04,
  revised 2026-07-31). **Preprint, no venue.**
- **Actual finding:** keep the erroneous claim byte-identical and change only its
  message *role* — from the agent's own `<thought>` to a user message, a tool
  response, or a `<memory>` block — and the explicit-correction rate rises
  **23 to 93 percentage points**, significant in **10 of 12** model-domain
  settings. The authors conclude the failure is "largely an artifact of how the
  claim is role-labeled in the chat template, rather than a pure cognitive
  deficit", and are optimistic that instruction tuning closes the gap.
- **Relevance:** the sharpest possible statement of our point — *the same content
  gets caught when it is not the agent's own*. That is the courtesy/gate
  distinction visible at the token level.
- **⚠ Usage rule (hard):** must be cited **with** the authors' optimistic reading.
  Citing it as "self-correction is an illusion" contradicts the paper. One
  sentence plus the caveat, or cut.

---

## Cluster B — The inaction blind spot (claim ③)

### B1 ✅ PRIMARY — Arike, Donoway, Bartsch & Hobbhahn (Apollo Research)
- "Technical Report: Evaluating Goal Drift in Language Model Agents",
  https://arxiv.org/abs/2505.02709 (2025-05-05).
- **⚠ HANDOFF CORRECTION:** this is **not** "Backlund & Petersson". Cite the real
  authors.
- **Finding 8, §4.2, verbatim:** "Goal drift tends to be larger through inaction
  than through action. Across models and conditions, G_inaction scores
  consistently exceed G_actions scores." Clearest in Claude 3.5 Haiku, which
  "maintains near-zero G_actions scores while showing increasing G_inaction
  scores over longer instrumental phases."
- **Definitions, §3.3:** `GD_actions` = actively investing in misaligned stocks,
  or saving budget when the goal-directed action would be to invest.
  `GD_inaction` = "the agent fails to sell stocks from the
  instrumental-goal-aligned cluster after completing the instrumental phase"
  (goal-switching scenarios only).
- **Finding 6:** "All models show increasing goal drift with longer instrumental
  phases" — Claude 3.5 Sonnet still held after 64 steps / >90,000 tokens.
- **Finding 2:** "Strong goal elicitation significantly increases robustness to
  goal drift across all models and goal configurations."
- **Abstract:** the best agent (scaffolded Claude 3.5 Sonnet) holds nearly
  perfect adherence for **>100,000 tokens** in the hardest setting; **all** models
  show some drift; drift correlates with pattern-matching susceptibility as
  context grows.
- **⚠ Usage rule:** narrow domain (stock-trading simulation), and `GD_inaction`
  has a very specific operationalization. Present as a **measured instance**, not
  a law — and carry the counter-evidence (Sonnet holding past 90k tokens) in the
  same paragraph. The structural point (gates hang off actions; a non-event
  triggers nothing) stands on its own regardless.

### B2 ✅ MINOR — Menon et al. 2026
- "Inherited Goal Drift: Contextual Pressure Can Undermine Agentic Goals",
  https://arxiv.org/abs/2603.03258 (2026-03-03). ICLR 2026 Lifelong Agents
  Workshop, 22pp.
- Models resist direct adversarial pressure but drift when conditioned on
  prefilled trajectories from **weaker agents**; only GPT-5.1 consistently
  resilient; instruction-hierarchy skill did **not** predict drift resistance.
- **Relevance:** one line, subagent-heavy workflows only.

---

## Cluster C — Correlated error (claim ②)

### C1 ✅ PRIMARY — Kleinberg & Raghavan, PNAS 2021
- Jon Kleinberg, Manish Raghavan, "Algorithmic Monoculture and Social Welfare",
  *PNAS* 2021. Preprint: https://arxiv.org/abs/2101.05853 (2021-01-14, rev 2021-06-01)
- **Verbatim:** "monocultural convergence on a single algorithm by a group of
  decision-making agents, even when the algorithm is more accurate for any one
  agent in isolation, can reduce the overall quality of the decisions being made."
  Holds "even under 'normal' operations" — no shock needed to expose it.
- **Relevance:** the formal backing for *delegation clones one error rather than
  scattering many*. Shared policy ⇒ correlated errors ⇒ the diversity benefit of
  independent judgment disappears.
- **⚠ Usage rule:** their setting is many decision-makers selecting candidates,
  not one person delegating across many runs. Borrow the correlation mechanism,
  **name the difference in the text**.

### C2 ✅ SUPPORTING — Bommasani, Creel, Kumar, Jurafsky, Liang, NeurIPS 2022
- "Picking on the Same Person: Does Algorithmic Monoculture lead to Outcome
  Homogenization?" https://arxiv.org/abs/2211.13972 (2022-11-25)
- "sharing training data reliably exacerbates homogenization, with individual-level
  effects generally exceeding group-level effects."
- **Nuance that must survive:** for foundation models specifically the result is
  **mixed** — "the specific methods for adapting a foundation model significantly
  influence the degree of outcome homogenization", varying between vision and
  language. Homogenization is not automatic.
- **⚠ Usage rule:** one clause, using only the shared-training-data half. Do not
  present homogenization as inevitable.

---

## Cluster D — Verification is the ceiling (claim ④)

### D1 ✅ TAXONOMY ONLY — Cemri et al., NeurIPS 2025
- "Why Do Multi-Agent LLM Systems Fail?" https://arxiv.org/abs/2503.13657
  (2025-03-17, v3 2025-10-26).
- **1600+ annotated traces** across **7 popular MAS frameworks**; 150 traces used
  for taxonomy development. **14 failure modes in 3 categories:** (i) system
  design issues, (ii) inter-agent misalignment, (iii) **task verification**.
- FC3 definition, Appendix A.3, verbatim: "Failures involving inadequate
  verification processes that fail to detect or correct errors, or premature
  termination of tasks." Modes: FM-3.1 premature termination; FM-3.2
  no/incomplete verification; FM-3.3 incorrect verification.
- **⛔ CONFIRMED ABSENT:** the paper gives **no** overall percentage distribution
  across the three categories. Figure 1 reports per-mode percentages only
  (FC1 1.5–15.7%, FC2 0.85–13.2%, FC3 6.2–9.1%). **The category-level split
  circulating in secondary summaries is not in the paper — do not cite it.**
- **Relevance:** verification is one of three top-level failure categories named
  by a 1600-trace study. Taxonomy only.

### D2 ✅ FRAMING ONLY — Cai et al. 2026 (PushBench)
- "Push Your Agent: Measuring and Enforcing Quantitative Goal Persistence in
  Long-Horizon LLM Agents" — Yuandao Cai, Yuzhang Zhu, Liyou Gao, Wensheng Tang,
  Shengchao Qin. https://arxiv.org/abs/2605.23574 (**v1**, 2026-05-22, no venue).
- Quantitative Goal Persistence: "whether an agent keeps working until an
  **external verifier** confirms enough distinct valid items." Measures duplicated
  work and false completion directly instead of behind a success flag. Evaluated
  on Claude Code (Sonnet 4.6) and Codex CLI (gpt-5.4).
- **⚠ Usage rule:** v1 preprint, largely independent researchers, venue unclear.
  **Framing only, no numbers.**

### D3 ✅ CLASSICAL — Amdahl 1967
- G. M. Amdahl, "Validity of the Single Processor Approach to Achieving Large
  Scale Computing Capabilities", AFIPS Spring Joint Computer Conference, 1967,
  pp. 483–485. https://dl.acm.org/doi/10.1145/1465482.1465560
  PDF: https://www3.cs.stonybrook.edu/~rezaul/Spring-2012/CSE613/reading/Amdahl-1967.pdf
- If a fraction *s* of the work is serial, the maximum speedup from even an
  infinite number of parallel processors is **1/s**.
- **⚠ Usage rule (constraint 6.3):** must be explained in plain language before
  the name is used; the reader may not own the term. Connects directly to the
  07-27 σ / 1/σ ceiling — same shape, now named.

### D4 ✅ DURABLE ANCHOR — Anthropic, "Building Effective Agents" (2024-12-19)
- https://www.anthropic.com/engineering/building-effective-agents
- Workflows = "LLMs and tools are orchestrated through predefined code paths";
  agents = "LLMs dynamically direct their own processes and tool usage."
- **The line that is our distinction in Anthropic's own words:** "During
  execution, it's crucial for the agents to gain 'ground truth' from the
  environment at each step (such as tool call results or code execution)."
- **On the ceiling:** "automated testing helps verify functionality, human review
  remains crucial for ensuring solutions align with broader system requirements."
- Also notes agents "can pause for human feedback at checkpoints or when
  encountering blockers", stopping conditions such as max iterations, and warns of
  "compounding errors."
- **Relevance:** ground-truth-from-the-environment vs. self-assessment *is* the
  gate/courtesy line. The one durable anchor in the agent-design discourse.

---

## Cluster E — Management / organizational control (the spine)

### E1 ✅ PRIMARY, READ IN FULL TEXT — Ouchi, *Management Science* 1979
- William G. Ouchi, "A Conceptual Framework for the Design of Organizational
  Control Mechanisms", *Management Science* **25(9): 833–848**, 1979.
  https://pubsonline.informs.org/doi/10.1287/mnsc.25.9.833
- **Table 3, "Conditions Determining the Measurement of Behavior and of Output"**,
  read verbatim from the PDF. Axes: *Ability to Measure Outputs* (High / Low) ×
  *Knowledge of the Transformation Process* (Perfect / Imperfect).
  - High × Perfect → "Behavior or Output Measurement (Apollo Program)"
  - Low × Perfect → "Behavior Measurement (Tin Can Plant)"
  - High × Imperfect → "Output Measurement (Women's Boutique)"
  - Low × Imperfect → "Ritual and Ceremony, 'Clan' Control (Research Laboratory)"
- **Verbatim, the tin-can passage:** "if all behaviors and processes conform to our
  desired transformation steps, then we know with certainty that proper tin cans
  are coming out the other end, even without looking."
- **Verbatim, the boutique passage:** "What it takes to be a successful buyer or
  merchandiser is beyond our understanding, so we could not possibly hope to
  create a set of rules which, if followed by our buyers, would assure success."
  They can, however, measure markdowns, turnover, volume and margin — "thus
  giving us the alternative of an output control mechanism."
- **Also verbatim:** "the ability to measure either output or behavior which is
  relevant to the desired performance is critical to the 'rational' application of
  market and bureaucratic forms of control."
- **How the article uses it (the diagnosis):** we do not understand the agent's
  transformation process ⇒ Imperfect column ⇒ behavior control cannot produce
  control, which is exactly what babysitting attempts. Output is not measurable
  either ⇒ we fall into the bottom-right cell, where only clan control remains —
  and clan control presumes long shared socialization we do not have with an
  agent. **The only exit is to make the output measurable**, i.e. mechanize
  acceptance. Tests / compilers / type checks are precisely that, which is why the
  same agent runs far in a well-tested repo and needs watching in an untested one.
- **⚠ Usage rule:** the Chinese rendering of the tin-can line in the article is
  **my own translation**, not an established published translation — the author
  should decide whether it keeps quotation marks.

### E2 ⚠️ CONCEPT CORROBORATED, PRIMARY BOOK NOT REACHED — March & Simon 1958
- James G. March & Herbert A. Simon, *Organizations*, Wiley, 1958 — the concept
  of **uncertainty absorption**.
- **Status:** no full-text-searchable copy of the book was reachable. The widely
  circulated verbatim definition ("Uncertainty absorption takes place when
  inferences are drawn from a body of evidence and the inferences, instead of the
  evidence itself, are then communicated", cited to p. 165) is attested
  identically across many sources but **was not read in the book itself**.
- **What IS corroborated by a peer-reviewed source** — the *Journal of Management
  Studies* 60-years special-issue introduction (escholarship qt811454w1) states
  M&S's own sense directly: uncertainty absorption "means that, because
  organization members have very limited capacity to assess objective evidence
  directly, most of their decisions rely on information from other people." The
  same paper warns that management scholars commonly stretch the term into a
  generic label for "uncertainty reduction" — **our usage is the narrow, correct
  one.**
- **⚠ Usage rule (as written in the draft):** the article paraphrases the concept
  and attributes it to the book. It asserts **no page number and no verbatim
  quotation**, so nothing is claimed beyond what is corroborated. If the author
  prefers zero residual risk, the sentence can be cut — the chain (report is not
  evidence ⇒ acceptance cannot be delegated) stands without it.

### E3 ✅ CLASSICAL — Amdahl 1967
- See D3 above. Explained in plain language in the body before the name appears.

---

## Discarded / do-not-use

| Item | Why |
| --- | --- |
| Category-level % split for Cemri et al. | Verified absent from the paper; exists only in secondary summaries |
| "Backlund & Petersson" as authors of 2505.02709 | Wrong attribution; real authors are Arike, Donoway, Bartsch & Hobbhahn |
| 2606.05976 read as "self-correction is an illusion" | Contradicts the paper's own conclusion (role-labeling artifact, closable) |
| loop engineering / graph engineering vocabulary | Mid-2026 discourse, partly joke-origin, three competing definitions within 48h, at least one fabricated study circulating. Background reading only — not cited, not used as structure |
| First-person incidents / own-repo logs | Author's call 2026-08-04: state the direction and the argument instead |
| Exception-ratio thresholds, loop cadences, gate designs | Proposals discussed privately, never measured. Any illustrative figure marked 示意 |

## Open questions

- None blocking. Optional second anchor for claim ② (acceptance/audit sampling
  theory, systematic vs random error) — C1 + C2 likely sufficient on their own.
