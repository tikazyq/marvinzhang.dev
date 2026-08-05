# Figure standard (work in progress — not yet live)

Status as of 2026-08-05: `base.css` and `proto-figure-1.zh.html` exist and the
approach is verified at both delivery widths, but **nothing here is wired into
the site yet**. The 60 committed figures still use the old per-file styles.

## The problem, measured

A figure PNG carries no width constraint, so `max-width: 100%` makes it fill the
article column. Measured against the built site:

| viewport | article column | figure displayed |
| --- | --- | --- |
| 1440 | 738px | 738px |
| 1280 | 633px | 633px |
| 1024 | 565px | 565px |
| 390  | 358px | **358px** |

One raster image was being asked to serve a **2.06x width range**. Text sized to
read on a phone looks oversized on desktop; text sized for desktop renders at
~5px on a phone. Every one of the 60 figures in this repo sat at the bad end:
smallest font **4.5–5.7px effective** at 390px, median 5.2px.

That is not a font-size bug in any one figure. It is what happens when nobody
designs against the width the reader actually gets.

## The fix, in two halves

Both halves are required. Either one alone makes things worse.

**1. Cap the display width.** Not yet applied — this is the pending step:

```css
/* append to src/css/custom.css */
.markdown img[src*="/figure-"] {
  max-width: 480px;
  display: block;
  margin-inline: auto;
}
```

Scoped to `/figure-` so photographic illustrations still span the column. All 60
figure PNGs follow that naming, so the selector is exact.

> **Do not land this rule before the figures are converted.** Capping an old
> 860px figure at 480px shrinks its already-tiny text further. The rule and the
> converted figures have to ship in the same change.

**2. Write sizes in effective px.** `base.css` does the arithmetic:

```css
--cw: 480px;   /* canvas width == the display cap */
--ref: 360;    /* worst-case delivery: a 390px phone gives a 358px column */
--s: calc(var(--cw) / var(--ref) / 1px);
--t-body: calc(13px * var(--s));   /* 13px on the reader's phone, always */
```

Never write a raw px font size in a figure. Change `--cw` and everything stays
legible; only the layout budget changes.

Type scale, in **effective px on a 360px-wide reading column**. The floor is 12:

| token | effective px | used for |
| --- | --- | --- |
| `--t-h1` | 17 | figure headline |
| `--t-lead` | 14 | the one line per cell that carries it |
| `--t-body` | 13 | sentences |
| `--t-subtitle`, `--t-label` | 13 | subtitle, column/row headers |
| `--t-mono`, `--t-tag` | 12 | eyebrow, examples, footer, pills |

The scale is deliberately flat. A figure sits inside body copy and should not
out-shout it: at the 480px cap the headline lands at ~23px against 18px body
text, and on a phone the figure's body text matches the article's.

## What this costs, and what it buys

With cap 480 the range collapses to 1.33x and both ends read correctly.

| | old | new |
| --- | --- | --- |
| desktop displayed | 738 x 856 | 480 x 720 |
| desktop area | 100% | **55%** |
| mobile area | 100% | 129% |
| smallest text on a phone | 5.2px | 13px |

The figure gets taller in aspect (1:1.16 → 1:1.50) but **smaller on desktop**,
because it is narrower. On a phone it costs 29% more vertical space, which
vertical scrolling makes cheap; horizontal overflow is what actually hurts, and
this removes it.

## Layout rules that follow from the narrow canvas

Measured on the prototype before trimming: header + takeaway + footer + arrow
came to 448px of 1055px — the chrome outweighed the diagram (336px). So:

- **Cells carry a label and an example, never a paragraph.** The argument lives
  in the article. A figure that restates it just makes itself unreadable.
- **The takeaway is one line**, not a paragraph. It is the figure's thesis for a
  reader who is skimming images, not a summary of the section.
- **No left gutter for row labels** — at this width it costs ~20% of the canvas.
  Row labels ride on a rule above each row.
- Two columns is the maximum. Anything with sentences stacks.

## Remaining work

1. Convert the 8 figures of `2026-08-10-stop-babysitting-your-agent` (4 zh + 4 en).
2. Land the `custom.css` cap in the same change.
3. Add `scripts/validate-figure-legibility.js`: parse each figure's computed
   sizes, compute effective px at the reference width, fail below 12px. Without
   it this regresses the next time someone writes a raw `font-size: 11px`.
4. Record the standard in the `formatting` skill.
5. Decide separately about the 52 figures in already-published articles.
