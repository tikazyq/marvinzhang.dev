# Outline — Multi-Agent Teams and the Measurable Coordination Tax

**Genre:** analytical narrative essay (blog-analytical). **Reader:** AI-curious general-tech + practitioners. **Length:** EN ~3,400–3,900 words; ZH ~3,400–3,900 chars. **Voice:** Economist-inspired, first person, narrative prose. Sources inline-linked. USL appears once, then exits — no derivations after.

**Budget guardrail:** management content (PO / two-pizza / man-month) is hook + analogy only, ≤ ¼ of the piece. Body Two (measurability — the original argument) is the centre of gravity.

---

## Title
- **EN:** "The Same Curve: What the Mythical Man-Month Predicted About AI Agents"
- **ZH:** 《同一条曲线：AI Agent 团队正在复刻人类组织的老病》
- No time anchor, no hype words. σ/κ/λ get plain-language aliases on reuse.

---

## Structure

### 0. Double hook (≈450 words) — no heading, ends with `{/* truncate */}`
1. **Human old ledger:** the illustrative USL team. 16 engineers, but the math says you're getting the output of ≈3.4 full-timers (η≈21%, ≈15.6 PR/week — *below* the 8-person team's 19.2). Label explicitly as an **illustrative model**, not a survey.
2. **Hard cut to agents:** the same shape shows up in agent teams — with *verified* numbers. Google/MIT scaling study: multi-agent helps on parallel work (+80.9%) but on sequential tasks every variant they tested got *worse* (−39–70%); the practical ceiling is 3–4 agents. Silo-Bench: at just k=2 agents you already lose 15–49% of single-agent performance.
3. **Turn:** the disease is old; what's new is that for the first time we can *measure* it exactly.

### Interactive component (right after the hook)
`<ScaleCurveWidget lang="en" />` / `lang="zh"`. Mode toggle human/agent, slider N. Reader sees the identical curve shape under both. One-line lead-in + one-line takeaway after.

### 1. The math that names the disease (≈550 words) — USL's single appearance
- Gunther's **Universal Scalability Law** (Guerrilla Capacity Planning, 2007). Show the formula **once**:
  `X(N) = λN / (1 + σ(N−1) + κN(N−1))`
- Translate the three terms with plain aliases:
  - **λ (solo throughput):** what one worker ships alone.
  - **σ (contention / "fighting over the shared resource"):** linear queueing drag.
  - **κ (coherence / "keeping everyone on the same page"):** the **N² term**.
- Point: the κ·N² term **is** the strict mathematical form of Brooks's man-month — communication paths grow n(n−1)/2 (4→6, 16→120, quadratic, *not* exponential). And **N\* = √((1−σ)/κ)** is the closed-form "two-pizza team" — the optimum falls out of the algebra.
- **Kitchen metaphor (one pass, author-requested):** cooks fighting for the one stove = σ; everyone shouting across a crowded kitchen = κ; the ticket-rail system = structural investment that buys κ down.
- Then **retire the formula** — no more derivations past this point.

### 2. Body One — the agent team's medical chart (≈850 words)
- The pathology, now in verified agent data:
  - **MAST** (Cemri et al., Berkeley, NeurIPS 2025): 1600+ traces, 7 frameworks; ~37% of failures are **inter-agent misalignment** (42% specification, 21% verification); failure rates 40–86%, ChatDev correctness as low as 25%.
  - **Google/MIT scaling law** (Kim et al.): the **tool-coordination trade-off** (β=−0.330) is the strongest predictor; independent agents amplify errors **17.2×**, centralized coordination contains it to **4.4×**.
- **Naming the roles:** the orchestrator = the agent world's project manager. Hierarchy is the trade: it presses κ down (fewer all-to-all paths) by **becoming σ itself** (a serial bottleneck). Same deal a PM strikes.
- **Honest counterweight (not a footnote):** multi-agent is not always worse. Anthropic's research system beat single-agent Opus 4 by **90.2%** on breadth-first research; Google's data says centralized coordination *helps* on parallel tasks. Cognition's "Don't Build Multi-Agents" and its later "what's actually working" bracket the real rule: **architecture–task alignment** decides — parallel work rewards more agents, sequential work punishes them. This is exactly what the curve's N\* encodes.

### 3. Body Two — the first fully instrumentable organisation (≈1,050 words) — CENTRE OF GRAVITY, original argument
- **The century-long data drought in org economics:** three obstacles that made "how much does coordination cost?" unanswerable for human orgs:
  1. No per-interaction log — you can't `log()` a company's meetings.
  2. Can't randomly re-run team size — no company re-runs Q3 with 8 people instead of 16.
  3. Goodhart — people game whatever you measure.
- **All three vanish for agents:**
  1. **Every interaction is token-accounted** — complete, timestamped ledger by construction.
  2. **N is a free variable** — re-run the same task batch at any team size, hold everything else fixed.
  3. **Agents don't game the observability layer** they can't see.
- **The honesty guardrail (critical — do NOT overclaim):** it is *wrong* to say "count the inter-agent message tokens = coordination cost."
  - **AgentTaxo** (ICLR 2025 workshop): the biggest token cost hides in **verification / redundant shared context**, not the visible hand-off messages.
  - **LatentMAS** (arXiv 2511.20639): coordination can happen entirely in **latent space** — there may be *no natural-language message to count at all* (and it's cheaper: 70–84% fewer output tokens).
- **So measure it two honest ways:**
  1. **Result-side / whole-outcome:** vary N, watch the curve bend away from the ideal line. Coordination cost = the gap. No decomposition, no attribution. Exemplars: Silo-Bench's **RCC = 1 − SR(k)/SR(1)**; Google's scaling law. **Duhem–Quine** aside: you can measure the aggregate deviation without isolating which mechanism caused it.
  2. **Process-side / a basket of proxies:** context-duplication accounting (AgentTaxo), agent utilisation, per-delegation cost, error-amplification ratio (17.2×/4.4×). Each a proxy, none the whole.
- **Payoff line:** the twenty-year-old answer was never wrong; it was just never *checkable*. Agents make Brooks and Gunther, for the first time, empirical.

### 4. Close — the scarce skill shifts (≈450 words)
- AI turns the *doing* (W — the work itself) into a commodity: agents wholesale the raw execution.
- So the scarce, valuable skill migrates to **pressing κ down**: protocol design, boundary-drawing, verification standards, orchestration. The engineering object is no longer "write faster" but "coordinate without the N² tax."
- Landing line: *last era, the job was to raise λ; this era, the job is to become the person who lowers κ.*
- Optional soft pointer to a `/labs` deploy of the full interactive reports (per author note).

---

## Interactive component spec (build notes)
- `src/components/ScaleCurveWidget.tsx` + `.module.css`, `lang` prop for EN/ZH, imported in both MDX files (no inline duplication).
- Zero deps, hand-drawn SVG, theme-aware via CSS vars ([data-theme='dark']).
- Modes: human (λ=4.64, σ=0.0158, κ=0.0146, PR/wk, N*≈8) / agent (λ=1.0, σ=0.08, κ=0.02, tasks/M tokens, N*≈7). Identical shape = the point.
- Output curve + grey dashed ideal λN + gold N* marker + 3 readouts (output / effective % / coordination tax %). Slider N 2–24 default 16. Curve area ~260px. Mobile-friendly.

## Citation style
- Inline one-liner links at first mention (house style). No heavy footnote apparatus. Every number traces to a research.md source entry.

## Do-not-cross list (from research.md Discards)
- No "gao2025singleagent", no "72/86/53% duplication", no "1.5–7× tokens", no "42k–71k / 29–38% redundant", no "E1–E4 framework". No calling path-growth "exponential". 17×/4.4× attributed to Kim et al., never to MAST.
