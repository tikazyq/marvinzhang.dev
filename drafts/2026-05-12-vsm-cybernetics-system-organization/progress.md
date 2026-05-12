# Progress — VSM × Cybernetics: How Systems Stay Viable

## Project Overview

- **Article**: How Systems Stay Viable (《系统存续之道》)
- **Slug**: `vsm-cybernetics-system-organization`
- **Filename date**: 2026-05-12
- **Languages**: English + Chinese (bilingual, written EN-then-ZH per section)
- **Style**: Analytical (Economist register)
- **Workspace**: `drafts/2026-05-12-vsm-cybernetics-system-organization/`
- **Branch**: `claude/vsm-cybernetics-article-ZyVLi`
- **Current Status**: Outline complete — awaiting author confirmation before Stage 3 writing

## Workflow

Author-supplied prompt pre-settles thesis, outline, and citation targets, so the Stage 1 questionnaire is **skipped**. Effective stages:

1. ~~Research questionnaire~~ — skipped per author instruction
2. **Seed** `research.md` + `outline.md` from the prompt — done
3. **Outline confirmation** — *in progress*
4. **Writing** — per-section EN draft → author confirmation → immediate ZH counterpart → next section
5. **Validation** — `pnpm run validate:zh-bold-source:fix` + `pnpm run build`; leave `unlisted: true` for manual publish

## Phase status

### Phase 1 — Research & planning
- [x] Thesis pinned (see `research.md`)
- [x] Citation set pinned (Wiener 1948, Ashby 1956, Conant & Ashby 1970, Beer 1972, Beer 1985, Goodhart 1975 / Strathern 1997)
- [x] Outline written (see `outline.md`)
- [x] Figure placeholder format defined
- [x] Outline confirmed by author (restructured to 6 sections for accessibility)

### Phase 2 — Content writing (target: 3,700–4,100 EN words, 3,000–3,400 ZH characters)

Outline restructured for accessibility: 7 sections → 6, with the old §3 (architecture-language survey) folded into §1, and a sustained concrete scenario (an engineering team whose agent pipeline missed a competitor's feature) carrying every abstract term in §3.

| § | Section | EN draft | ZH draft |
|---|---------|----------|----------|
| 1 | Hook — scenario + the question no architecture language answers | ✅ | ✅ |
| 2 | A brief history of cybernetics | ✅ | ✅ |
| 3 | The five VSM levels + algedonic channel (each level revisits the scenario) | ✅ | ✅ |
| 4 | Three counterintuitive points | ✅ | ✅ |
| 5 | Why a projection isn't a model — Conant-Ashby and Goodhart | ✅ | ✅ |
| 6 | A work in progress (footnote) | ✅ | ✅ |
| — | Closing line | ✅ | ✅ |

### Phase 3 — Validation & finalisation
- [x] `pnpm run validate:zh-bold-source` clean (53/53 files pass, 0 issues)
- [x] `pnpm run build` clean for EN and ZH (no warnings on this article after tags.yml updates)
- [x] All figure placeholders in correct format (Figure 1 in §3)
- [x] All six core citations linked (Wikipedia anchors + bibliographic data inline)
- [x] Onsager mentioned exactly once, in §6, with no subsystem names
- [x] Three counterintuitive points are quotable
- [x] ZH reads native (形不同而意同), not literal
- [ ] `unlisted: true` preserved on both EN and ZH — author flips manually at publish

## Notes

- `unlisted: true` stays in both EN and ZH frontmatter through final validation; author flips it manually at publish time.
- Mermaid is not a clean fit for the VSM diagram (S3\* side channel + algedonic bypass). All figures are visible placeholder blocks per the format in `research.md`.
- The article will end with a 100–200-word footnote naming Onsager as the in-progress project, with no implementation detail.
