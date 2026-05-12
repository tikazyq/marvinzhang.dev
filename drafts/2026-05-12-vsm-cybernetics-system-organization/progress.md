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
- [ ] Outline confirmed by author

### Phase 2 — Content writing (target: 3,400–3,800 EN words, 3,000–3,400 ZH characters)

| § | Section | EN draft | ZH draft |
|---|---------|----------|----------|
| 1 | Hook — the question no architecture language answers | ⬜ | ⬜ |
| 2 | A brief history of cybernetics | ⬜ | ⬜ |
| 3 | Why mainstream architecture languages fail for agent systems | ⬜ | ⬜ |
| 4 | The five VSM levels + algedonic channel | ⬜ | ⬜ |
| 5 | Three counterintuitive points | ⬜ | ⬜ |
| 6 | Conant-Ashby and Goodhart — why hard rules fail | ⬜ | ⬜ |
| 7 | A work in progress (footnote) | ⬜ | ⬜ |
| — | Closing line | ⬜ | ⬜ |

### Phase 3 — Validation & finalisation
- [ ] `pnpm run validate:zh-bold-source` clean
- [ ] `pnpm run build` clean
- [ ] All figure placeholders in correct format
- [ ] All six core citations linked
- [ ] Onsager mentioned exactly once, in §7, with no subsystem names
- [ ] Three counterintuitive points are quotable
- [ ] ZH reads native (形不同而意同), not literal

## Notes

- `unlisted: true` stays in both EN and ZH frontmatter through final validation; author flips it manually at publish time.
- Mermaid is not a clean fit for the VSM diagram (S3\* side channel + algedonic bypass). All figures are visible placeholder blocks per the format in `research.md`.
- The article will end with a 100–200-word footnote naming Onsager as the in-progress project, with no implementation detail.
