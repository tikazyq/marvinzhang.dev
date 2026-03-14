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

## Quality Gates

- [ ] Minimum 5 authoritative sources cited
- [ ] All numerical claims have verifiable sources
- [ ] Methodology described for any measurements
- [ ] Sources dated (no undated claims)
- [ ] Conflicting evidence acknowledged
- [ ] Practical implications stated
