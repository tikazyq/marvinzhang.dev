---
name: research-technical
description: Deep technical research skill for marvinzhang.dev. Systematically gathers evidence from official docs, GitHub repos, API references, design patterns, and benchmarks. Produces structured research notes with source inventory. Use standalone for technology evaluation or as part of the analytical article workflow.
metadata:
  author: marvinzhang
  version: "1.0"
  tier: research
---

# Technical Research

Systematic deep-dive research into technologies, tools, and technical concepts.

## When to Use

- Understanding a technology deeply before writing about it
- Gathering evidence for technical claims
- Evaluating tools, frameworks, or approaches
- Building a source inventory for an analytical article
- Standalone technology evaluation (no article required)

## Research Process

### 1. Define Scope (Before researching)

Clarify what you're investigating:
- **Core question**: What specific technical question are you answering?
- **Depth level**: Survey (broad), Analysis (medium), Deep-dive (narrow)
- **Audience assumptions**: What does the reader already know?

### 2. Source Gathering

Prioritize sources in this order:

| Priority | Source Type | Examples |
| -------- | ---------- | -------- |
| 1 | Official documentation | API refs, language specs, RFCs |
| 2 | Source code | GitHub repos, reference implementations |
| 3 | Benchmarks & measurements | Performance tests, profiling data |
| 4 | Design documents | Architecture decision records, proposals |
| 5 | Expert analysis | Conference talks, peer-reviewed papers |
| 6 | Community experience | Case studies, post-mortems, blog posts |

**Minimum**: 5 authoritative sources for any research output.

### 3. Evidence Collection

For each source, document:
- **URL/Reference**: Permanent link
- **Key finding**: 1-2 sentence summary
- **Data points**: Specific numbers, benchmarks, version info
- **Relevance**: How it supports or challenges your thesis
- **Freshness**: Date of information

### 4. Synthesis

Organize findings into:
- **Core findings**: What the evidence clearly shows
- **Tensions**: Where sources disagree or data is ambiguous
- **Gaps**: What couldn't be verified or needs more investigation
- **Practical implications**: What this means for practitioners

## Deliverables

Produce a structured research document:

```markdown
# Research: [Topic]

## Core Question
[What you investigated]

## Key Findings
1. [Finding with evidence]
2. [Finding with evidence]
3. [Finding with evidence]

## Source Inventory
| # | Source | Type | Key Data | Date |
|---|--------|------|----------|------|
| 1 | [URL]  | Docs | [data]   | 2026 |

## Open Questions
- [What remains unclear]

## Practical Implications
- [What practitioners should know]
```

## Two rules learned from author review (2026-08)

### 1. Check the model generation before citing an AI-capability result

A study that measured GPT-4 is measuring a system three years old. Whatever
direction the finding points, the reader is entitled to ask "does that still
hold?" — so **before citing any claim about what models can or can't do, search
for a newer measurement of the same thing.**

What to do with what you find:

- **Newer evidence agrees** → cite the newer one, keep the old as supporting.
- **Newer evidence disagrees** → say so plainly and lead with the newer result.
  A reversal is more interesting than the original claim.
- **No newer measurement exists** → keep the old one and **date it in the text**
  ("2024 年那批模型上测的"), so the reader can discount it themselves.

Worked example: the babysitting article first rested on Tyen et al. (ACL 2024,
best model GPT-4 at 52.87 mistake-finding accuracy). The author pushed back that
old models distort the picture. Searching turned up *The Self-Verification Cliff*
(ICML 2026) on GPT-5.4-mini and Gemini-3.5-flash — and it found the
generation-versus-self-selection gap **widens with capability rather than
closing**. The hypothesis that newer models would have fixed it was wrong, but
checking still replaced a stale citation with a current and stronger one.

### 2. Don't burden the reader with publication status

Whether something is a preprint, a workshop paper, or a journal article is a
**research-side** concern: it belongs in `research.md`, where it calibrates how
much weight to put on a source. It does not belong in the article. Lines like
"那还是个预印本，我只借它的立场" and "论文还没经过同行评议" tell the reader
nothing they can use — what matters is the claim and whether it holds.

Still required in the text: the **substantive** limits — sample size, domain,
what was actually measured, and any place the authors themselves read their
result differently than you do. Those change how far a claim carries. Venue
doesn't.

## Quality Gates

- [ ] Minimum 5 authoritative sources cited
- [ ] All numerical claims have verifiable sources
- [ ] Methodology described for any measurements
- [ ] Sources dated (no undated claims)
- [ ] Conflicting evidence acknowledged
- [ ] Practical implications stated
