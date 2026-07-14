---
name: writing-style
description: Economist-inspired writing principles for marvinzhang.dev. Covers the five pillars (clarity, precision, active voice, concrete examples, data-driven), tone and voice guidelines, sentence variety, word choice hierarchy, and structural excellence. Load this skill for writing, editing, or style review.
metadata:
  author: marvinzhang
  version: "2.0"
  tier: foundation
---

# Writing Style (Economist-Inspired)

Writing principles and voice guidelines for marvinzhang.dev.

## Five Core Principles

**1. Clarity**:
- Lead with core idea in first paragraph
- One idea per sentence
- Define technical terms at first use
- Break up text density with subheadings and lists

**2. Precision**:
- Use specific numbers and measurements
- Name technologies with versions
- Time-stamp all claims
- Cut weasel words ("very," "quite," "rather")

**3. Active Voice**:
- "React renders" not "Components are rendered"
- "The API returns JSON" not "JSON is returned"
- Aim for 80%+ active voice
- Passive acceptable when actor is unknown or irrelevant

**4. Concrete Examples**:
- Real-world scenarios over abstract theory
- Familiar analogies for complex concepts
- Actual measurements and benchmarks
- Visual aids (diagrams, tables, flowcharts)

**5. Data-Driven**:
- Back claims with evidence
- Include statistics and measurements
- Link to primary sources (official docs, research papers)
- Show trade-offs honestly

## Tone & Voice

- **Professional yet accessible**: Expert knowledge without condescension
- **Conversational**: Use "you" and rhetorical questions
- **Authoritative but humble**: Share expertise while encouraging learning
- **Encouraging**: Growth mindset emphasis

### Avoid
- Condescension toward beginners
- Hype or marketing language
- Unnecessary complexity
- Unsubstantiated claims

## Sentence Variety

Mix sentence lengths for rhythm:
- **Short**: Punch. Emphasis. Drama.
- **Medium**: Standard informational delivery.
- **Long**: When showing relationships between concepts.

## Word Choice

Prefer:
1. **Anglo-Saxon roots**: "use" not "utilize," "buy" not "purchase"
2. **Concrete nouns**: "developers" not "stakeholders"
3. **Strong verbs**: "decide" not "make a decision"
4. **Simple words**: "help" not "facilitate," "show" not "demonstrate"

## Cut Ruthlessly

When you think you're done, cut 10% more:
- ❌ Throat-clearing: "It should be noted that..."
- ❌ Redundancy: "Future plans," "past history"
- ❌ Qualifier bloat: "very," "really," "quite," "rather"
- ❌ Unnecessary phrases: "In order to" → "To"

## Chinese Voice (作者本人的声音)

The zh version is not a translation register — it must read like the author's
own hand-written articles (2021–2023). Two hard rules, both learned from
author rework rounds:

1. **No literary metaphors** (文艺腔): 器物、承重墙、加冕、量纲、口粮、
   投下阴影… Reuse the author's own metaphors instead (双刃剑、万能药).
2. **No English calques** (英语腔): "对论点做压力测试" (stress-test the
   argument), "候选论点" (candidate thesis), "有效率地不同意" (disagree
   efficiently)… Unpack nominalizations into plain verb phrases.

Test every sentence: would the author say this out loud to a colleague?
Figures embed prose too — when wording changes, check and re-render figures.

See [references/zh-voice.md](references/zh-voice.md) for the author's
vocabulary profile and a full ❌/✅ replacement table.

Two additional rules from the 2026-07 rework rounds:

3. **中文标题不预设读者知识**: a title must land for someone who has never
   heard of the referenced book/paper/theorem. 《为什么 AI Agent 团队也逃
   不过人月神话？》 gates on knowing《人月神话》; 《…"人多了反而慢"？》
   does not. The author's question-title tradition (「真的是万能药吗」
   「你的团队在正确实践敏捷吗」) is the pattern to reuse. The body may
   introduce the reference properly — the title may not depend on it.
4. **符号随行** (symbols ride along): for general-reader articles, Greek
   letters and math symbols never travel alone in prose. Define once with a
   plain-language alias, then pair at key mentions ("对齐成本 κ 降了，
   排队成本 σ 升了"); bare symbols only inside formulas and parameter
   lists. Neither extreme survives review: all-symbols loses general
   readers, all-aliases loses the professional register.

## References

- [references/economist-principles.md](references/economist-principles.md) — Detailed style guide with wit, structure, and craft guidelines
- [references/zh-voice.md](references/zh-voice.md) — 作者中文语感：惯用词汇、文艺腔与英语腔红线、替换对照表
