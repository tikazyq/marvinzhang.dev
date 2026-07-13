# Progress — Multi-Agent Teams and the Measurable Coordination Tax

## Overview
- **Article:** The Same Curve: What the Mythical Man-Month Predicted About AI Agents
- **Slug:** `multi-agent-teams-and-the-measurable-coordination-tax`
- **Date:** 2026-07-13
- **Status:** ✅ Draft complete (EN + ZH + interactive component), build-verified. `unlisted: true` — ready for author review.
- **Full four-phase run:** Research → Outline → Writing → Refine (no phase skipped).

## Phase status

### ✅ Phase 0 — Scaffold
- Repo conventions checked: bilingual Docusaurus 3.8.1; EN authoritative, ZH mirror; frontmatter (`slug/title/authors/tags/date/unlisted`); interactive widgets follow the `export const`/component pattern seen in `2026-03-23-agent-landscape.mdx`; no math plugin (KaTeX absent) → formula rendered as a code block, not LaTeX.
- Workspace scaffolded via `scripts/drafts/scaffold.js`.

### ✅ Phase 1 — Research (independent verification)
- Every prompt "lead" was treated as unverified. 4 parallel research passes hit primary sources (arXiv, OpenReview, official blogs). Full record + URLs in `research.md`.
- **Verified & used:** Google/MIT scaling law (2512.08296), MAST (2503.13657), Silo-Bench/RCC (2603.01045), AgentTaxo (OpenReview 0iLbiYYIpC, qualitative only), PSMAS (2604.17400, real 27.3% figure — ultimately not cited), LatentMAS (2511.20639), Gunther USL (2007), Brooks MMM (1975), Cognition + Anthropic single-vs-multi.
- **Key corrections caught:** the 17.2×/4.4× error-amplification figures belong to the Google paper, NOT MAST (lead misattributed them); Brooks path growth is quadratic, not exponential.
- Author's illustrative USL numbers re-derived and confirmed exact (see `research.md`).

### ✅ Phase 2 — Outline
- `outline.md`: double hook → widget → USL (single appearance) → Body One (agent pathology) → Body Two (measurability, centre of gravity) → close. Management content kept to hook/analogy, ≤ ¼.

### ✅ Phase 3 — Writing
- EN: `blog/2026-07-13-...mdx` (~3,500 words). Interactive `<ScaleCurveWidget />` right after the hook.
- Component: `src/components/ScaleCurveWidget.tsx` + `.module.css` — zero-dep hand-drawn SVG, `lang` prop (EN/ZH), imported in both locales (no inline duplication). Modes human/agent, slider N 2–24, ideal λN dashed line, gold N* marker (computed live), 3 readouts. Theme-aware via CSS vars + `[data-theme='dark']`.
- ZH: `i18n/zh/.../2026-07-13-...mdx` — author's plain voice (no 文艺腔, no calques per zh-voice red lines); kitchen metaphor (author-requested) kept.

### ✅ Phase 4 — Refine
- Fact re-check: every number in EN traces to a `research.md` source entry; no discarded leads present.
- `pnpm run validate:zh-bold-source` → PASS (auto-fix + manual de-bolding of over-dense hook line).
- Build: `pnpm build` (both locales) → see final verification.
- Light/dark rendering: SVG + UI driven by theme CSS variables (`[data-theme='dark']` overrides), no hardcoded single-theme colors.

## Discarded leads (and why)
| Lead | Reason dropped |
|------|----------------|
| `gao2025singleagent` | Fabricated citation key — no such paper. Thesis kept via Cognition "Don't Build Multi-Agents" + Anthropic counterpoint. |
| 17×/4.4× as MAST findings | Misattribution — belong to Kim et al. (Google/MIT, 2512.08296). Kept, re-attributed correctly. |
| "72% / 86% / 53% token duplication" | Galileo-blog mislabel of AgentTaxo; the 72% is a verification-phase token share (one MetaGPT run), 86%/53% unconfirmed against primary. Only AgentTaxo's qualitative point ("cost hides in verification/redundant context") kept. |
| "1.5×–7× necessary tokens" | Appears only in the Galileo blog; no primary source. Dropped. |
| "5-agent code review: 42k–71k tokens/call, 29–38% redundant" | Found in no primary; the cited arXiv 2604.17400 actually reports a 27.3% reduction. Numbers dropped. |
| "E1/E2/E3/E4 evaluation framework" (arXiv 2605.02801) | That ID is an unrelated RL paper; the E1–E4 taxonomy is unfindable. Dropped entirely. |
| Path growth = "exponential" | Brooks's n(n−1)/2 is quadratic. Article says quadratic. |

## Deliverables
- `blog/2026-07-13-multi-agent-teams-and-the-measurable-coordination-tax.mdx` (EN)
- `i18n/zh/docusaurus-plugin-content-blog/2026-07-13-...mdx` (ZH)
- `src/components/ScaleCurveWidget.tsx` + `.module.css`
- `drafts/2026-07-13-.../{research,outline,progress}.md`

## Open items for author
- Titles: EN/ZH primaries chosen; alts in `research.md`. No time anchor, no hype.
- `unlisted: true` retained — remove to publish.
- Optional `/labs` standalone deploy of the interactive widget + a soft footer pointer (per author note) — not built; flag if wanted.
- Consider adding `multi-agent` / `scalability` to `blog/tags.yml` if you want them as tags (currently using existing tags to avoid inline-tag warnings).
