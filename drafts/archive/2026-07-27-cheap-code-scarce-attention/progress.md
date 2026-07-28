# Progress Tracking — Cheap Code, Scarce Attention

## Project Overview
- **Article**: 便宜的是代码，贵的是注意力 (Cheap Code, Scarce Attention)
- **Slug**: 2026-07-27-cheap-code-scarce-attention
- **Start Date**: 2026-07-27
- **Current Status**: Writing (Stage 3)
- **Primary locale**: **Chinese** — sections are written into the ZH MDX first; EN is restated in Stage 4.
- **Authoritative draft file**: `i18n/zh/docusaurus-plugin-content-blog/2026-07-27-cheap-code-scarce-attention.mdx`
- **Framing**: independent claim, single callback to the coordination-tax piece.

## Phase Status

### ✅ Phase 1: Research & Planning
- [x] Research sources gathered (6 verified clusters — see research.md)
- [x] Outline created and approved (Stage-2 gate)
- [x] Hook drafted, plain-language-revised, and approved
- [x] Title approved: 便宜的是代码，贵的是注意力
- **Notes**: Structural (factor-shares) thesis; own-repo data demoted (not the focus); orchestration multiplier openly treated as unmeasured.

### ✅ Phase 2: Content Writing (ZH-primary) — FULL DRAFT DONE
- [x] Introduction (hook + roadmap)
- [x] Section 1 — 便宜的是代码：价值搬了家 (factor-shares mechanism)
- [x] Section 2 — 杠杆有多大：一个诚实的空白 (wrong-regime evidence + unmeasured gap)
- [x] Section 3 — 天花板：注意力是串行的 (σ face + shrink-the-denominator core)
- [x] Section 4 — 代价：杠杆对称，指标会被做假 (symmetry + gaming)
- [x] Conclusion — 把注意力花在刀刃上
- **Status**: complete ZH draft written per author request ("整篇写完我再看"). `pnpm run build` PASSES (EN+ZH); zh-bold validation PASS. Added `economics` tag to both tags.yml. **Awaiting author's full-draft review.**

### ⏳ Phase 3: Review & Finalization
- [ ] Figures (4 planned) generated to `static/img/blog/cheap-code-scarce-attention/`
- [ ] EN restate from finalized ZH (形不同而意同)
- [ ] `pnpm run build` + `pnpm run validate:zh-bold-source`
- [ ] Remove `unlisted: true` from both locales at publish

## Detailed Section Progress

### Introduction — ✅ Complete
- **Word count**: ~330 (target 300–500)
- **File**: ZH MDX (authoritative)
- **Quality check**: ✅ zh-bold PASS; jargon-free (租值/要素份额 kept out of the hook)
- **Notes**: kicker "在场，从来不等于在判断。" split onto its own line (stronger + avoids bold cross-match).

### Sections 1–4 & Conclusion — Not started
- See outline.md for per-section focus, beats, visual, and term discipline.

## Work Session Log
- **2026-07-27**: Scaffolded workspace; wrote research.md (6 clusters) + outline.md (Intro+4+Concl) with full ZH hook.
- **2026-07-27**: Addressed Copilot review (tags, ZH-primary workflow comments); fixed scaffold SOP so future articles don't inherit EN-first defaults.
- **2026-07-27**: Plain-languaged the hook per author feedback; author approved outline + hook + title.
- **2026-07-27**: Wrote the Introduction into the ZH MDX; zh-bold validation passes.

## Next Steps (Priority Order)
1. **Section 1** — 价值搬了家: Simon → Autor → Acemoglu-Restrepo (by analogy) → Baumol (share-capture only). Introduce 要素份额 once, glossed. Direction not magnitude. + numerator/denominator figure.
2. **Section 2** — the honest blank: Cluster-4 studies (never stacked) → wrong regime → orchestration multiplier unmeasured.
3. Continue section-by-section; then figures, EN restate, validation.

## Handoff Instructions (for next agent/session)
- **Status**: Stage 3 writing, ZH-primary; Introduction done and validated.
- **Immediate task**: write Section 1 into the ZH MDX after author signs off on the intro.
- **Guardrails**: chat-driven, one section per interaction (AGENTS.md); no product as solution; citation traps in research.md (Strathern≠Goodhart, Baumol share≠return, no stacking, Simon page); own 33% at most a flagged one-liner.
- **Files**: `research.md`, `outline.md`, this file; draft in the ZH MDX.

---
**Last Update**: 2026-07-27 by Claude (Stage 3, Introduction complete)
