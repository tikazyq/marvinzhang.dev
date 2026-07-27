# Outline — 便宜的是代码，贵的是注意力 (Cheap Code, Scarce Attention)

## Article Metadata
- **ZH title (primary)**: 便宜的是代码，贵的是注意力
- **EN title (restate)**: Cheap Code, Scarce Attention
- **Slug**: `cheap-code-scarce-attention`
- **Date**: 2026-07-27
- **Primary locale**: Chinese (draft ZH natively, restate EN)
- **Target length**: ~3,000–3,600 (词/characters)
- **Sections**: Intro + 4 main + Conclusion
- **Difficulty**: intermediate (general engineering/tech reader; no prerequisite reading)

## Content Strategy
- **Hook**: the felt reality (a sentence to an agent = a day's work) → the economic turn (cheap input → rent moves) → thesis + both honesty faces.
- **Unique angle**: treat "human attention is more valuable" as a **factor-shares** problem (direction forced by economics), and be openly honest that the *magnitude* — the orchestration leverage multiplier — is unmeasured by anyone.
- **Reader journey**: feel it → why (economics) → how big (honestly: unknown, wrong-regime evidence) → the catch (serial ceiling) → the cost (symmetric + gamed) → what to do (spend attention on what moves the ceiling).
- **Independent framing**: stands alone; **one** callback to the coordination-tax piece as an already-built tool. No retrospective opening.
- **Voice red line**: not a recruiting ad. Every upside claim carries its cost in the same breath.

---

## Introduction (~350–450)
- **Hook** (drafted in full below — this is part of the Stage-2 gate).
- **Thesis stated plainly**: 便宜的是代码，贵的是注意力 — because leverage on a unit of attention rose.
- **Two faces pre-loaded**: leverage is symmetric; a measured scarce factor gets gamed.
- **Roadmap** (implicit, one line): why → how big → the ceiling → the cost.

### HOOK (full draft — approve/adjust before Stage 3)

> 过去写一个功能要一整天。现在，一句话丢给 agent，几分钟就有了。
>
> 这件事的第一层意思大家都感受到了：产出变便宜了。但它还有第二层，容易被兴奋盖过去——当你过去要花钱买的东西突然几乎免费，那笔钱不会凭空消失，它只是搬了个家，搬到还稀缺的那个要素头上。
>
> 代码不再稀缺。那还有什么稀缺？是你决定做什么、在哪儿喊停、看见那个别人没看见的问题——是你的注意力。
>
> 这不是"人更重要了"这类安慰话，而是一道要素份额（factor share）的题：当一种投入的产率暴涨、变得又便宜又充裕，剩下那个稀缺的、互补的要素就会把租值吸走。AI 批发掉的是单位产出；价值搬到了它的上游——注意力。
>
> 所以这篇的主张很短：**便宜的是代码，贵的是注意力。** 但我想把话说全。注意力更值钱，是因为它的**杠杆**变大了；而杠杆是双刃的——它按同一个倍数放大你对的判断和你错的判断。更麻烦的是，一旦"注意力"成了那个要被考核的稀缺资源，它立刻会被做假：**在场，从来不等于在判断。**

---

## Section 1 — 便宜的是代码：租值搬了家 (~700–850)
- **Focus**: the factor-shares mechanism — why cheap+abundant input pushes rent to the scarce complementary factor. Direction, not magnitude.
- **Beats**:
  - Simon 1971: information abundance → attention scarcity (framing lens, flagged as conceptual not data).
  - Autor 2015: automating routine tasks **raises the marginal value of the complementary judgment tasks that remain** (tightest analog).
  - Acemoglu–Restrepo 2018/2019: the formal factor-shares mechanism, **borrowed by analogy** (they're labor-vs-capital, not attention — say so).
  - Baumol 1967 cost disease: the un-sped-up factor captures a rising share — **invoke share-capture only; rising share ≠ rising real return** (state the limit inline).
- **Visual**: numerator/denominator diagram — AI collapses the price of per-unit output; value moves to the denominator (attention).
- **Takeaway**: the *direction* is forced by economics, no multiplier required.
- **Transition**: direction settled — so how big is the leverage?

## Section 2 — 杠杆有多大：一个诚实的空白 (~700–850)
- **Focus**: define leverage = 产出 / 注意力; then show honestly that the number is not known.
- **Beats**:
  - The individual-uplift tour, carefully: Copilot RCT +55.8% (toy task, vendor), field experiment +26% tasks (noisy, vendor-adjacent), BCG +40% quality (not code), METR **−19% slower yet felt +20% faster**. **Never stacked** — different outcomes/populations.
  - The pivot: all of these are **single human + one assistant** — the wrong regime. The claim is about **one human orchestrating many agents**.
  - The honest blank: **no peer-reviewed study measures the orchestration multiplier.** The literature stops at the single-assistant boundary. This is *part of the argument*: direction is forced, magnitude is open.
  - One-line, clearly-flagged own anecdote allowed here at most (33% CHANGELOG) — or cut. Not a statistic.
- **Visual**: wrong-regime map — the four studies on a single-assistant axis (~0.8–1.6×); orchestration region drawn as explicitly empty.
- **Takeaway**: we can say *which way*, not *how much* — and honesty about that is the point.
- **Transition**: even granting big leverage, there's a catch that makes attention not just valuable but *binding*.

## Section 3 — 天花板：注意力是串行的 (~650–800)
- **Focus**: the σ face — attention is a scarce serial resource; "more valuable" means "the new bottleneck."
- **Beats**:
  - Leverage raises output-per-unit-attention but does **not** remove the ceiling: output ≤ 1/(attention each unit demands).
  - **Single callback** to the coordination-tax piece here: "上一篇我搭过一个可测的框架" (USL/σ) — link, one sentence, move on. No re-derivation.
  - The operational core (the executable idea): **raise leverage by shrinking the denominator — reduce what must pass through a human — not by making the human handle more.** Piling on the numerator hits the ceiling; shrinking the denominator moves it.
- **Visual**: ceiling curve — lifting output-per-attention raises the curve; only shrinking the denominator moves the ceiling.
- **Takeaway**: the scarce factor is also the binding one; design around the denominator.
- **Transition**: shrinking what passes through you sounds like pure win — it isn't.

## Section 4 — 代价：杠杆对称，指标会被做假 (~650–800)
- **Focus**: the two honesty obligations — symmetry, and gaming.
- **Beats**:
  - **Symmetric leverage**: the multiple that amplifies a good decision amplifies a wrong one equally. A single human convention can align a whole system — or misalign it just as widely. (33% as one-line illustration of *reach*, if used at all.)
  - **Gaming**: once attention is the measured scarce factor, the metric corrupts — Campbell 1979 (social indicators → corruption), and the aphorism **correctly attributed to Strathern 1997, not Goodhart**. Attention is harder to measure than LOC and easier to fake: **在场 ≠ 在判断**. METR's perception gap (felt faster while slower) shows people misjudge even their *own* attention's productivity.
- **Visual**: symmetric-leverage diagram (same multiple, both directions).
- **Takeaway**: high leverage raises the stakes on judgment and on honest measurement — not a victory lap.
- **Transition**: so what does a person actually do with this.

## Conclusion — 把注意力花在刀刃上 (~300–380)
- **Synthesis**: cheap code, scarce attention; the era's skill is *allocating* a scarce serial resource — deciding what must pass through you, and ruthlessly shrinking the rest.
- **Direction vs magnitude, one more time**: we know the way the value moved; the multiplier still needs measuring — a thing to build (Track B), lightly, no product pitch.
- **Close**: leverage rewards judgment and punishes it by the same factor — which is exactly why attention, not output, is now the thing worth spending well.
- **🚫 No product as solution** (esp. nothing pointing at Duhem).

---

## Visual Content Plan
1. Numerator/denominator (S1) · 2. Wrong-regime map (S2) · 3. Ceiling curve (S3) · 4. Symmetric leverage (S4). Bilingual, 860px, semantic palette; sources in `figures/`, render to `static/img/blog/cheap-code-scarce-attention/`.

## Notation discipline
- Introduce any symbol once with a plain-language alias ("杠杆 = 产出/注意力"); keep alias+symbol riding together; bare symbols only in formulas. USL/σ appears once, aliased, via the callback.

## Review Criteria
- [ ] Every upside carries its cost in the same breath (no recruiting-ad tone)
- [ ] Magnitude never overclaimed; orchestration gap stated as argument
- [ ] Cluster-4 numbers never stacked; vendor/working-paper status noted
- [ ] Strathern≠Goodhart; Baumol share≠return; Simon page not overstated
- [ ] Single callback only; independent, no retrospective opening
- [ ] Own 33% is at most a flagged one-liner, never a statistic
- [ ] No product as the resolution

## Outline Status
- [x] Structure finalized (Intro + 4 + Conclusion)
- [x] Hook drafted in full (Chinese, native voice)
- [ ] **AWAITING AUTHOR APPROVAL of outline + hook + title (Stage-2 gate) before any section writing**
