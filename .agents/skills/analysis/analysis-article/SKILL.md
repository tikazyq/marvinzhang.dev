---
name: analysis-article
description: Article review and improvement skill for marvinzhang.dev. Audits drafts or published articles against quality standards, writing style principles, and structural best practices. Produces actionable improvement reports. Use for draft reviews, post-publication audits, or style consistency checks.
metadata:
  author: marvinzhang
  version: "1.0"
  tier: analysis
  composes: "foundation/writing-style, foundation/quality"
---

# Article Analysis

Review and improve drafts or published articles.

## When to Use

- Reviewing a draft before publication
- Auditing a published article for improvement
- Checking style consistency across articles
- Identifying structural or quality issues
- Post-translation review of Chinese versions

## Analysis Dimensions

### 1. Structure Review

| Check | What to Evaluate |
| ----- | ---------------- |
| Hook | Does the introduction grab attention in the first sentence? |
| Flow | Do sections build logically on each other? |
| Transitions | Are connections between sections smooth? |
| Balance | Are sections proportionate (no 200-word section next to 1500-word section)? |
| Conclusion | Does it synthesize (not just summarize)? |

### 2. Style Consistency

Evaluate against the Economist-inspired principles (load `foundation/writing-style` for full criteria):

- **Clarity**: Can each sentence be understood on first reading?
- **Precision**: Are claims specific and verifiable?
- **Active voice**: Is 80%+ in active voice?
- **Concrete examples**: Are abstract concepts grounded?
- **Data-driven**: Are claims backed with evidence?

### 3. Technical Accuracy

- [ ] All technical claims verifiable against official sources
- [ ] Version numbers current and specific
- [ ] Code examples correct (if any)
- [ ] Links working and pointing to authoritative sources
- [ ] Trade-offs and limitations acknowledged

### 4. Visual Assessment

- [ ] Visual element in each main section
- [ ] Diagrams are clear and theme-aware
- [ ] Tables used for comparisons (not prose lists)
- [ ] Code blocks ≤10 lines

### 5. Bilingual Consistency (if both versions exist)

- [ ] Core concepts match across languages
- [ ] Metadata aligned (tags, date, slug)
- [ ] Chinese reads naturally (not literal translation)
- [ ] Technical terms annotated in Chinese version
- [ ] Chinese formatting validated

## Audit Process

1. **Read the full article** without taking notes (reader perspective)
2. **Re-read with checklist** evaluating each dimension
3. **Score each dimension** 1-10
4. **Identify top 3 improvements** with highest impact
5. **Write specific suggestions** (not just "improve clarity" — show how)

## Deliverables

```markdown
# Article Audit: [Title]

## Overall Score: [X/10]

## Dimension Scores
| Dimension | Score | Notes |
|-----------|-------|-------|
| Structure | /10 | |
| Style | /10 | |
| Technical Accuracy | /10 | |
| Visual Quality | /10 | |
| Bilingual Quality | /10 | |

## Top 3 Improvements
1. **[Issue]**: [Specific suggestion with example]
2. **[Issue]**: [Specific suggestion with example]
3. **[Issue]**: [Specific suggestion with example]

## Detailed Findings
### Strengths
- [What works well]

### Issues
- [Specific issue + suggested fix]
```

## Quality Gates

- [ ] All five dimensions evaluated
- [ ] Suggestions are specific and actionable (not vague)
- [ ] At least one positive finding noted (balanced review)
- [ ] Examples provided for each improvement suggestion
- [ ] Overall score justified
