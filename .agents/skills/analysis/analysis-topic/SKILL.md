---
name: analysis-topic
description: Topic viability analysis skill for marvinzhang.dev. Evaluates whether a topic is worth writing about by assessing audience fit, depth potential, timing, angle options, and recommended article style. Use when deciding "Should I write about X?" before committing to an article.
metadata:
  author: marvinzhang
  version: "1.0"
  tier: analysis
---

# Topic Analysis

Evaluate whether a topic is worth writing about and how to approach it.

## When to Use

- "Should I write about X?" decisions
- Choosing between multiple potential topics
- Determining the right article style for a topic
- Assessing whether a topic has enough depth for a full article

## Analysis Framework

### 1. Audience Assessment

| Question | Answer |
| -------- | ------ |
| Who is the primary audience? | [Specific role/level] |
| What do they already know? | [Assumed knowledge] |
| What problem does this solve for them? | [Pain point] |
| Where would they encounter this topic? | [Context] |

### 2. Depth Analysis

Evaluate whether the topic has enough substance:

- **Surface level**: Can be covered in a tweet or short post → Skip or combine with related topics
- **Medium depth**: One core insight with supporting points → Good for announcement or experiential
- **Deep**: Multiple interconnected concepts → Good for analytical or tutorial
- **Expert**: Requires specialized knowledge to appreciate → Narrow audience, ensure value justifies effort

### 3. Timing Evaluation

- **Breaking**: New release, announcement, or event → Write quickly, announcement style
- **Trending**: Growing interest, active discussion → Write soon, analytical or tutorial
- **Evergreen**: Always relevant → Write thoughtfully, any style
- **Retrospective**: Looking back at experience → Write reflectively, experiential style

### 4. Angle Exploration

Generate 2-3 possible angles:

```markdown
Angle A: [Description] — Style: [analytical/tutorial/experiential/announcement]
Angle B: [Description] — Style: [...]
Angle C: [Description] — Style: [...]
```

Evaluate each on:
- Uniqueness (vs. existing content)
- Author expertise match
- Reader value
- Effort required

### 5. Style Recommendation

Based on the analysis, recommend:

| Factor | → Style |
| ------ | ------- |
| Data-heavy, multi-source analysis | analytical |
| "How to do X" with clear steps | tutorial |
| Personal story with lessons | experiential |
| New release or project update | announcement |

## Deliverables

```markdown
# Topic Analysis: [Topic]

## Viability Score: [1-10]

## Audience: [Who and why they care]
## Depth: [Surface / Medium / Deep / Expert]
## Timing: [Breaking / Trending / Evergreen / Retrospective]

## Recommended Angle
[Description of the best angle]

## Recommended Style: [analytical / tutorial / experiential / announcement]

## Required Research
- [ ] [What needs to be researched first]

## Decision: [Write / Skip / Defer / Combine with other topic]
```

## Quality Gates

- [ ] Audience clearly identified (not "developers" — be specific)
- [ ] Depth assessment honest (don't force a thin topic into a deep article)
- [ ] At least 2 angles considered before choosing
- [ ] Style recommendation justified
- [ ] Clear go/no-go decision with reasoning
