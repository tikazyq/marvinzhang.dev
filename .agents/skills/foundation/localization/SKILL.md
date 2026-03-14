---
name: localization
description: EN/ZH bilingual translation guidelines for marvinzhang.dev. Implements the 形不同而意同 (Same Meaning, Different Form) principle for natural Chinese expression. Covers technical term annotations, Chinese punctuation, expression pattern adaptation, and tone guidelines. Load this skill for translation or bilingual content work.
metadata:
  author: marvinzhang
  version: "2.0"
  tier: foundation
  platform: "Docusaurus 3.8.1"
  languages: "en,zh"
---

# Localization Standards (EN ↔ ZH)

Bilingual translation guidelines for marvinzhang.dev.

## Core Principle: 形不同而意同

**Same Meaning, Different Form** — Chinese translations must read naturally for native speakers, not word-for-word translations. Adapt sentence structures, expressions, and rhetoric to feel native while preserving technical accuracy.

## Required Annotations (Chinese only)

**Technical terms** — Add English at first mention:
```markdown
可计算性理论（Computability Theory）
大型语言模型（Large Language Model，LLM）
```

**Notable people** — Include English names:
```markdown
艾兹格·迪杰斯特拉（Edsger Dijkstra）
艾伦·图灵（Alan Turing）
```

**Chinese punctuation** — Use ，：。consistently (not , : .)

## Translation Patterns

Adapt expressions naturally:

| English | Literal (❌) | Natural (✅) |
|---------|-------------|--------------|
| "You might wonder..." | 你可能会想... | 也许你会好奇... |
| "Let's unpack this..." | 让我们解开... | 咱们来仔细看看... |
| "Here's the key insight..." | 这是关键洞察... | 关键在于... |
| "The bottom line is..." | 底线是... | 说到底... |

Break long sentences into shorter, punchier ones for Chinese. Transform rhetorical questions to Chinese patterns.

## Sentence Structure

Chinese prefers shorter, punchier sentences:

```markdown
❌ Literal:
"This article explores Rice's Theorem and its profound implications for software testing."
→ 本文探讨莱斯定理及其对软件测试的深远影响。

✅ Natural:
→ 莱斯定理如何影响软件测试？这正是本文要探讨的核心问题。
```

## Tone Guidelines

- Use 你 (informal) instead of 您 (formal)
- Use 咱们 (we, inclusive) to build community feel
- Signature transitions: 因此, 而, 不过, 其实, 接下来
- Chinese connectors: 不过 / 然而 / 因此 / 换句话说 / 实际上

## File Structure

Every article needs two files with matching slugs:
```
blog/YYYY-MM-DD-slug.mdx                                    # English
i18n/zh/docusaurus-plugin-content-blog/YYYY-MM-DD-slug.mdx  # Chinese
```

Keep frontmatter aligned (title, tags, date, authors).

## References

- [references/localization.md](references/localization.md) — Complete translation patterns, common mistakes, technical explanation patterns
