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
