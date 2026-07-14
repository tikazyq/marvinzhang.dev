---
name: quality
description: Quality validation standards and checklists for marvinzhang.dev blog articles. Covers content quality gates, technical precision rules, visual content requirements, pre-publish checklists, build/validation commands, and quality scoring. Load this skill for quality audits, pre-publish validation, or CI checks.
metadata:
  author: marvinzhang
  version: "2.0"
  tier: foundation
  platform: "Docusaurus 3.8.1"
  package-manager: "pnpm"
---

# Quality Standards

Validation gates and checklists for marvinzhang.dev articles.

## Content Quality Gates

### All Articles Must Have
- [ ] Clear main point in first paragraph
- [ ] Each paragraph focuses on one idea
- [ ] Technical terms defined at first use
- [ ] Appropriate word count for section type
- [ ] Smooth transitions between sections

### Technical Precision
- Specific numbers: "3x faster" not "significantly faster"
- Named technologies: "React 18" not "modern framework"
- Time-stamped claims: "As of 2026" or "In Python 3.12"
- Inline links: To official docs at first mention
- Source everything: Link to primary sources for claims

### Visual Content
- [ ] Mermaid diagrams for processes/architectures
- [ ] Tables for comparisons (no prose lists)
- [ ] Code blocks ≤10 lines
- [ ] All diagrams theme-aware (explicit colors)

## Verification Discipline

Hard rules, each learned from a real incident (2026-07):

1. **The exit code is the only pass signal.** A generated page or artifact
   existing on disk does NOT mean the build passed — Docusaurus emits pages
   before some failures, and a stale `build/` from a previous run looks
   identical to a fresh one. Capture and check `$?` (or `echo "exit: $?"`)
   on every `pnpm build`; never infer success from `ls`.
2. **Re-verify after every edit, not just the big ones.** A one-line
   frontmatter change broke a production deploy after all "significant"
   changes had been verified. If a file changed since the last green build,
   the last green build proves nothing.
3. **YAML frontmatter quoting:** inside a double-quoted `title:`, inner
   quotation marks MUST be CJK curly quotes（""）— an ASCII `"` terminates
   the YAML string early and fails the build (locally *and* on Vercel).
   Sanity check: the title line contains exactly two ASCII double quotes.
4. **Push only what a full local build has verified.** CI is the backstop,
   not the first tester; a red Vercel deploy on a published article is a
   user-visible outage of the preview link.

## Validation Commands

```bash
# Build verification (must succeed before committing)
pnpm run build

# Development preview
pnpm dev

# Chinese formatting validation
pnpm run validate:zh-bold-source
pnpm run validate:zh-bold-source:fix

# Export for distribution
pnpm wechat <slug> --zh -o    # WeChat
pnpm medium <slug> --en -o    # Medium
```

## Pre-Publish Checklist

- [ ] Build succeeds without errors
- [ ] Both EN and ZH files have matching slug and metadata
- [ ] Visual element (diagram/table) in each main section
- [ ] All claims sourced with inline links
- [ ] Chinese bold formatting validated
- [ ] No broken internal or external links
- [ ] Core concepts highlighted with callouts
- [ ] Code blocks ≤10 lines (unless exceptional)

## Quality Scoring (Self-Assessment)

Rate each dimension 1-10 before publishing:

| Dimension          | Score | Notes |
| ------------------ | ----- | ----- |
| Clarity            | /10   |       |
| Technical Accuracy | /10   |       |
| Practical Value    | /10   |       |
| Engagement         | /10   |       |
| Visual Quality     | /10   |       |
| **Overall**        | /10   |       |

**Minimum threshold**: Overall ≥7, no dimension below 5.

## References

- [references/quality-standards.md](references/quality-standards.md) — Full validation checklist with style-specific gates
