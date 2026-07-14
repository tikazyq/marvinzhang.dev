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


---

## 重写记录（2026-07-13，作者反馈后）

作者退回第一版，诊断：①引子不对味（假想团队开场，无人无事无日期）②翻译腔（英文先写中文翻译；"病历本"等英式隐喻踩文艺腔红线）③配比失衡（管理/职业发展被压成引子，正文成 agent 文献综述）④缺图 ⑤根因：动笔前未与作者对齐。

对齐结论（AskUserQuestion + 追加反馈）：
- 开场：站内考古（三篇旧文）+ 泛化亲身经历（不特写具体场景）
- 配比：三线均衡（人类组织 1/3 + agent 1/3 + 职业发展 1/3）
- 初稿语言：中文先写，英文重述
- 节奏：大纲对齐后一次成稿
- 标题：弃《同一条曲线：……复刻人类组织的老病》（翻译腔），改《为什么 AI Agent 团队也逃不过人月神话？》
- 补五张图，风格对齐 stack-selection（860px 画布、语义色板、双语）

产出：
- ZH 重写完成（权威版）、EN 重述完成
- figures/gen_figures.py + render.mjs → 10 张 PNG 至 static/img/blog/{slug}/
- validate:zh-bold-source 通过；构建验证见提交记录

待办（作者提出，本次不做）：更新写作流程 skill——把"动笔前对齐、中文先写、图为默认交付物"编进 blog-analytical / chat-driven 等 skill。

## 追加修订（2026-07-14，作者反馈第三轮）

- σ/κ 段落瘦身，数字移入新图 figure-5-sigma-kappa（双面板、同纵轴、N* 对比）；能力迁移图顺延为 figure-6。
- 职业发展一节从"读法"改写为"操作手册"：三类从业者（一线工程师 / 团队与架构管理 / 企业与组织管理）各给出可直接上手的做法——拆任务自查（写操作单线）、3–4 默认上限、先协议后并行、中心化验证关口、按"改动互不相扰"划团队边界、激励向"让别人更快"倾斜、季度性压 κ 结构投资、对人防古德哈特（agent 仪表盘不搬到人身上）。
- 架构师旧文引用保留在管理段。中英同步。

## 追加修订（2026-07-14，作者反馈第四轮：面向普通读者去希腊字母化）

- 正文中 λ/σ/κ 一律改为大白话别名（单兵产能/排队成本/对齐成本）；符号只保留在公式、定义、参数元组，以及两处"别名（符号）"括注提醒。定义列表后新增一句阅读契约："下文基本用大白话称呼它们"。
- 图 1/2/5/6 内文案同步加别名（图 5 标题改为"排队成本能买，对齐成本只能设计"；图 6 标题改为"上个时代提高单兵产能，这个时代压低对齐成本"）。
- 顺手修复：上一轮遗留的"对组织……"重复句（中英）、EN 句首小写、图 5 页脚希腊字母被 CSS 大写化的问题。
