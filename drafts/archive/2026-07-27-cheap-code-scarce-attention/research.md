# Research — Cheap Code, Scarce Attention (便宜的是代码，贵的是注意力)

> **Stage 1 discipline note.** Every source below was verified against a primary or authoritative secondary source (publisher page, DOI, arXiv, primary PDF). Figures that are vendor-self-reported, working-paper-only, or not cross-comparable are flagged inline. Anything that could not be traced is in **Discarded / do-not-use**. This piece is **structural**, not empirical: its spine is an economics argument about factor shares; external numbers are used to bound what is and isn't known, never to claim a measured leverage multiplier.

---

## Article Metadata

| Field | Value |
| ----- | ----- |
| **Slug** | `cheap-code-scarce-attention` |
| **Date** | 2026-07-27 |
| **ZH title (primary)** | 便宜的是代码，贵的是注意力（副题精神：杠杆与代价） |
| **EN title (restate)** | Cheap Code, Scarce Attention *(working; adjustable at Stage 3/4)* |
| **Primary locale** | **Chinese** (公众号 audience) — draft ZH natively, restate EN |
| **Tags** (English slugs in **both** locales — repo convention) | `ai`, `agents`, `economics`, `productivity`, `software-engineering` |
| **Target length** | ~3,000–3,600 词 / characters |
| **EN MDX** | `blog/2026-07-27-cheap-code-scarce-attention.mdx` |
| **ZH MDX** | `i18n/zh/docusaurus-plugin-content-blog/2026-07-27-cheap-code-scarce-attention.mdx` |
| **Relation to prior work** | **Independent claim**, single callback to the coordination-tax piece; USL/σ/κ invoked once as an already-built tool, not re-derived |

---

## Core Thesis

**In the AI-agent era, human attention becomes more valuable, because the leverage on a unit of human attention rises sharply.** The move is a **factor-shares** argument, not a "humans matter more" sentiment: when one input (code generation, single-unit output) becomes cheap and abundant, economic rent migrates to the remaining scarce, complementary factor — human attention/judgment. AI wholesales the *numerator* (per-unit output, the λ of the prior piece); value shifts to the *denominator*.

Two faces of one coin, both must be told:
- **Upside:** leverage per unit of attention rises → attention is where the value concentrates.
- **Constraint:** attention is a scarce serial resource → the human becomes the binding constraint (the σ face). Leverage = output / attention; **piling on the numerator hits a ceiling, shrinking the denominator does not.** The operational core: *raise leverage by reducing what must pass through a human, not by making the human handle more.*

**Two honesty obligations** (or the thesis reads like a recruiting ad):
1. Leverage is **symmetric** — it amplifies a mistaken decision by the same multiple it amplifies a good one.
2. Once "attention" becomes the measured scarce factor, the metric gets **gamed**; attention is harder to measure than lines of code and easier to fake (presence ≠ judgment).

### ⚠ Evidentiary posture (decides the whole shape)

- The claim is **structural (direction), not magnitude.** We do **not** claim to have measured the leverage multiplier.
- **Own-repo data is NOT the focus** (author's call, 2026-07-27: sample too small). The 33% CHANGELOG figure is demoted from "anchor" to — at most — a single qualitative aside, explicitly flagged as an anecdote, not evidence. It may be cut entirely. **Do not build a section on it, do not present it as a statistic.**
- Teeth come from **external, larger-sample literature** (Cluster 4) used carefully, plus the honest, citable fact that the **orchestration regime is unmeasured by anyone** (Cluster 5).

---

## Cluster 1 — Attention as the scarce factor (Simon) ✅ VERIFIED

- **Herbert A. Simon,** "Designing Organizations for an Information-Rich World," in Martin Greenberger (ed.), *Computers, Communications, and the Public Interest*, Johns Hopkins Press, **1971**, pp. 37–72.
- **Verbatim quote:** "…a wealth of information creates a poverty of attention and a need to allocate that attention efficiently among the overabundance of information sources that might consume it." (≈ pp. 40–41)
- **Access:** CMU Simon Collection https://digitalcollections.library.cmu.edu/node/65762 · full-text scan https://www.veryinteractive.net/pdfs/simon_designing-organizations-for-an-information-rich-world.pdf
- **Key finding:** Attention — not information — is the genuinely scarce resource in an information-abundant world; its allocation is the central design problem.
- **⚠ Usage rule:** This is a **conceptual/rhetorical** claim, not data — present it as the framing lens, do not dress it as measurement. **Page number is ambiguous in the wild** (records cite pp. 37–52 and 37–72; internal image-only scan not OCR-verifiable). Cite only the page you can physically confirm from the copy used; do not assert an unseen page number.

---

## Cluster 2 — Factor-shares / task-based complementarity ✅ VERIFIED

**The strongest analog — Autor.** David H. Autor, "Why Are There Still So Many Jobs? The History and Future of Workplace Automation," *Journal of Economic Perspectives*, 29(3): 3–30, **2015**. DOI https://doi.org/10.1257/jep.29.3.3
- **Key finding:** Automating some tasks *raises the marginal value of the complementary tasks humans still do* (the "O-ring"/never-quite-right complementarity). This is the tightest economics analog to our thesis: machines substituting for routine work increase the value of remaining non-routine judgment.
- **⚠ Usage rule:** Framed around *jobs and wages*, predates LLMs, argues **direction not magnitude**. Borrow the complementarity mechanism by analogy; say so.

**The formal factor-shares result — Acemoglu & Restrepo.**
- (A) "The Race between Man and Machine…," *American Economic Review*, 108(6): 1488–1542, **2018**. DOI https://doi.org/10.1257/aer.20160696 — automation raises productivity but mechanically shifts the *labor share* via displacement; new tasks (reinstatement) push it back; the balance decides who captures the gains.
- (B) "Automation and New Tasks…," *Journal of Economic Perspectives*, 33(2): 3–30, **2019**. DOI https://doi.org/10.1257/jep.33.2.3 — accessible survey of the same task-content framework.
- **⚠ Usage rule:** These are about *labor vs. capital*, not "attention" as a factor. We borrow the **mechanism** (rent shifts to the scarce complementary factor) **by analogy** — name the borrow explicitly; the papers do not claim attention is that factor. Cite (A) for the formal result, (B) for exposition.

---

## Cluster 3 — Baumol's cost disease (the vivid analogy) ✅ VERIFIED, handle with care

- **William J. Baumol,** "Macroeconomics of Unbalanced Growth: The Anatomy of Urban Crisis," *American Economic Review*, 57(3): 415–426, **1967**. JSTOR https://www.jstor.org/stable/1812111 · open scan http://piketty.pse.ens.fr/files/Baumol1967.pdf
- (Origin book: Baumol & Bowen, *Performing Arts: The Economic Dilemma*, Twentieth Century Fund, 1966 — cite for the empirical origin only.)
- **Key finding:** When one sector's productivity soars and another's ("stagnant") cannot be sped up, the stagnant activity captures a **rising share of total cost/value** despite unchanged productivity.
- **⚠ Usage rule — LANDMINE:** rising cost *share* ≠ rising real *return*. Invoke the **share-capture mechanism** only ("attention is the un-sped-up factor whose share of value rises"); do **not** claim Baumol proved attention becomes more productive. A careful reader punches through any overreach here.

---

## Cluster 4 — Individual-uplift studies (the "wrong regime" evidence) ✅ VERIFIED

All four are the **single-developer-plus-assistant** paradigm; headline effects span **~0.8×–1.6×**, not orders of magnitude. This is the cluster that lets us argue: whatever the sign, the existing evidence is about the *wrong regime* for a "dramatic leverage" claim.

| Study | Figure | What it really measures | Caveat |
|---|---|---|---|
| **Peng et al. 2023**, GitHub Copilot RCT, arXiv [2302.06590](https://arxiv.org/abs/2302.06590) | **+55.8% faster** (≈1.56×) | Time to implement one toy **HTTP server in JS** | **Vendor-authored** (MS/GitHub); artificial greenfield task; single-dev regime |
| **Cui et al. 2025**, *Mgmt. Science*, [DOI](https://doi.org/10.1287/mnsc.2025.00535) · [PDF](https://economics.mit.edu/sites/default/files/inline-files/draft_copilot_experiments.pdf) | **+26.08% tasks** (SE ≈10.3%) | Task/PR throughput, 3 RCTs, **4,867 devs** | **Vendor-adjacent** (MS authors/deployments); noisy (~2.5 SE); throughput proxy |
| **Dell'Acqua et al. 2023**, BCG "Jagged Frontier," HBS WP 24-013, [SSRN](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4573321) | **+12.2% tasks, ~25% faster, ~40% quality** *within* frontier; **−19 pts** *outside* it | Consulting tasks, not code | **Working paper**; BCG-affiliated subjects; quality gain not transportable to software |
| **METR 2025**, arXiv [2507.09089](https://arxiv.org/abs/2507.09089) · [blog](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) | **−19% (slower)**, yet devs *believed* +20% | Expert devs on **their own mature repos**, 246 tasks | **Small n=16**; hardest case for AI; early-2025 tooling; authors [revising design](https://metr.org/blog/2026-02-24-uplift-update/) 2026-02 |

- **⚠ Usage rule:** **Never stack these into one "AI makes people X% more productive" sentence** — 55.8% (time on toy task), 26% (task count), 40% (rated consulting quality), −19% (time on expert real work) are different outcomes on different populations. Report Peng and Cui as **industry-interested**. The two *load-bearing* takeaways: (1) even the rosy numbers are single-assistant, ~1.5× — the wrong regime; (2) **BCG jagged-frontier + METR perception-gap** both say the human's *judgment about where AI is competent* is what protects the outcome → direct support for "judgment/attention rises in value," and feeds the "presence ≠ judgment" gaming point.

---

## Cluster 5 — The orchestration multiplier is UNMEASURED ✅ (confirmed gap)

- **Finding, stated affirmatively:** there is **no peer-reviewed empirical study measuring the productivity multiplier when one human orchestrates many AI agents.** The published literature stops at the single-assistant boundary.
- Adjacent-but-not-equivalent (do not present as the multiplier):
  - Autonomous SWE-agent solve-rate benchmarks — SWE-bench, Jimenez et al., ICLR 2024, arXiv [2310.06770](https://arxiv.org/abs/2310.06770). Measures unattended agent solve-rate, **no human-in-the-loop ratio.**
  - Position/framing paper — "Orchestrating Human-AI Teams: The Manager Agent…," ACM DAI 2025, https://dl.acm.org/doi/10.1145/3772429.3772439. Framing, not measurement.
  - Single-author case preprints (anecdotal, not RCTs), e.g. arXiv 2605.18461.
- **⚠ Usage rule:** This gap is **part of the argument, not a weakness.** Honest framing: *"The orchestration regime is precisely the one for which no rigorous productivity measurement yet exists; the empirical literature stops at the single-assistant boundary."* This is what forces a structural (not magnitude) claim and is why the piece does not lean on our own small-sample numbers. **Track B (devlog steering-ledger) is where the direct multiplier would eventually come from — mention as future work, not as data we have.**

---

## Cluster 6 — Measurement-gaming (attention will be gamed) ✅ VERIFIED

- **Goodhart 1975** — Charles A. E. Goodhart, "Problems of Monetary Management: The U.K. Experience," *Papers in Monetary Economics* Vol. I, Reserve Bank of Australia, 1975 (reprinted Macmillan, 1984). Original: *"Any observed statistical regularity will tend to collapse once pressure is placed upon it for control purposes."*
- **Campbell 1979** — Donald T. Campbell, "Assessing the Impact of Planned Social Change," *Evaluation and Program Planning*, 2(1): 67–90, 1979. DOI https://doi.org/10.1016/0149-7189(79)90048-X — *"The more any quantitative social indicator is used for social decision-making, the more subject it will be to corruption pressures…"*
- **Strathern 1997** — Marilyn Strathern, "'Improving ratings': audit in the British University system," *European Review*, 5(3): 305–321, 1997. Open scan https://gwern.net/doc/statistics/decision/1997-strathern.pdf — *"When a measure becomes a target, it ceases to be a good measure."*
- **⚠ Usage rule — CREDIBILITY TRAP:** the pithy "when a measure becomes a target…" is **Strathern (1997), NOT Goodhart.** Attribute correctly — in an essay about measurement integrity, this is itself a credibility signal. Use Campbell for the "social indicator → corruption" mapping to attention metrics; use it for §2.4 risk 2 (在场 ≠ 在判断).

---

## Internal link (single callback — independent framing)

- Prior piece: **《为什么 AI Agent 团队也逃不过"人多了反而慢"？》** (`/blog/multi-agent-teams-and-the-measurable-coordination-tax`, 2026-07-13). It is the **only** place on the site USL / σ / κ appears — readers were taught it once. Invoke **once** as an already-built tool ("我上一篇搭过一个可测的框架…"), link, and move on. **No retrospective opening**, no "我2021/2022写过三篇" arc (that device was used two weeks ago — §6 ban).
- Interface, not contradiction: the prior piece ended on "压 κ 是下个时代的稀缺技能" and linked `/blog/architect-essential-skills`. This piece supplies the *why* (leverage/factor-shares) and the *how* (shrink the denominator) — same line, pointed forward.

---

## Visual content plan (figures are a default deliverable, 3–6)

1. **Numerator vs denominator** — leverage = output / attention; AI collapses the numerator's price, value moves to the denominator. (concept diagram)
2. **The ceiling** — output ≤ 1/σ: raising output-per-attention lifts the curve but the serial-attention ceiling stays; shrinking the denominator moves the ceiling, piling on the numerator doesn't. (curve, echoes prior piece's shape deliberately)
3. **Wrong-regime map** — the four Cluster-4 studies plotted on a single-assistant axis (~0.8–1.6×), with the orchestration regime as an explicitly empty/unmeasured region. (bounded-knowledge figure)
4. **Symmetric leverage** — the same multiple amplifies a good and a bad decision. (small diagram)

Bilingual variants, 860px canvas, semantic palette; HTML sources in `figures/`, render to `static/img/blog/cheap-code-scarce-attention/`. (Interactive widget optional; figures are the default.)

---

## Source URL master list

1. Simon 1971 — https://www.veryinteractive.net/pdfs/simon_designing-organizations-for-an-information-rich-world.pdf · prov. https://digitalcollections.library.cmu.edu/node/65762
2. Autor 2015, JEP — https://doi.org/10.1257/jep.29.3.3
3. Acemoglu & Restrepo 2018, AER — https://doi.org/10.1257/aer.20160696
4. Acemoglu & Restrepo 2019, JEP — https://doi.org/10.1257/jep.33.2.3
5. Baumol 1967, AER — https://www.jstor.org/stable/1812111 · scan http://piketty.pse.ens.fr/files/Baumol1967.pdf
6. Peng et al. 2023, Copilot RCT — https://arxiv.org/abs/2302.06590
7. Cui et al. 2025, Mgmt Sci — https://doi.org/10.1287/mnsc.2025.00535 · PDF https://economics.mit.edu/sites/default/files/inline-files/draft_copilot_experiments.pdf
8. Dell'Acqua et al. 2023, BCG jagged frontier — https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4573321
9. METR 2025 — https://arxiv.org/abs/2507.09089 · blog https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/ · update https://metr.org/blog/2026-02-24-uplift-update/
10. SWE-bench, Jimenez et al. 2024 — https://arxiv.org/abs/2310.06770
11. Campbell 1979 — https://doi.org/10.1016/0149-7189(79)90048-X
12. Strathern 1997 — https://gwern.net/doc/statistics/decision/1997-strathern.pdf
13. Prior piece (internal) — /blog/multi-agent-teams-and-the-measurable-coordination-tax

---

## Discarded / do-not-use

- **Own-repo statistics as evidence** (33% CHANGELOG, d≈0, 1.4–2.4× collision ratios, squash split, c≈0.55, exponent correction a=2+b+e) — author's call 2026-07-27: sample too small; **not the focus.** 33% permitted only as a one-line flagged anecdote, or cut. No section, no statistical framing.
- **Stacking Cluster-4 magnitudes** into one productivity number — different outcomes/populations; forbidden.
- **"When a measure becomes a target" attributed to Goodhart** — it's Strathern 1997.
- **He et al. MSR 2026 causal chain** (from the handoff) — original authors say it doesn't close; only cite with explicit caveat, and it isn't needed here.
- **Vendor self-reported catch/productivity rates** — non-comparable; do not cite.
- Any orchestration "multiplier" number — none exists; presenting one would be fabrication.

---

## Research Status
- [x] Primary sources gathered & verified (6 clusters)
- [x] Evidentiary posture fixed (structural, own-data demoted)
- [x] Wrong-regime + unmeasured-gap argument sourced
- [x] Citation traps flagged (Simon page, Baumol share≠return, Strathern≠Goodhart, no stacking)
- [x] Internal single-callback framing set (independent)
- [x] Visual opportunities identified
- [ ] Ready for outline (Stage 2 gate: outline + hook sample + title → author approval)
