# Localization Standards

Rules for bilingual (English + Chinese) content on marvinzhang.dev.

## Core Philosophy: 形不同而意同

**Same Meaning, Different Form** — Chinese articles must read naturally and idiomatically, not as literal translations. Adapt sentence structures, expressions, and rhetoric to feel native to Chinese readers while preserving core concepts and technical accuracy.

## File Structure

Every article needs two files with matching slugs:
```
blog/YYYY-MM-DD-slug.mdx                                    # English
i18n/zh/docusaurus-plugin-content-blog/YYYY-MM-DD-slug.mdx  # Chinese
```

## English to Chinese Adaptation

### Sentence Structure
Chinese prefers shorter, punchier sentences. Break long English sentences:

```markdown
❌ Literal (Too stiff):
"This article explores Rice's Theorem and its profound implications for software testing."
→ 本文探讨莱斯定理及其对软件测试的深远影响。

✅ Natural (Idiomatic):
→ 莱斯定理如何影响软件测试？这正是本文要探讨的核心问题。
```

### Expression Patterns

| English Pattern | Literal (❌) | Natural (✅) |
|----------------|--------------|--------------|
| "You might wonder..." | 你可能会想... | 也许你会好奇... |
| "Let's unpack this..." | 让我们解开这个... | 咱们来仔细看看... |
| "Here's the key insight..." | 这是关键洞察... | 关键在于... |
| "The bottom line is..." | 底线是... | 说到底... |
| "This isn't just about..." | 这不仅仅是关于... | 问题的本质是... |

### Rhetorical Questions
Transform to Chinese patterns:

```markdown
❌ EN: "Why should I care about abstract mathematical theorems?"
   ZH (literal): 我为什么应该关心抽象数学定理？

✅ ZH (natural): 抽象的数学定理和我有什么关系？
```

### Transitions
Use Chinese-specific connectors:
- Instead of direct translations, use: 不过 / 然而 / 因此 / 换句话说 / 实际上 / 更进一步说

## Must-Preserve Elements

### Technical Term Annotations
At first mention, include English in parentheses:

```markdown
✅ 可计算性理论（Computability Theory）
✅ 大型语言模型（Large Language Model，LLM）
✅ 语义属性（Semantic Property）
```

Rules:
- Use capitalized English terms
- Include abbreviations where applicable
- Format: `中文术语（English Term）` or `中文术语（English Term，ABBR）`

### Famous Person Names
Include English names at first mention:

```markdown
✅ 艾兹格·迪杰斯特拉（Edsger Dijkstra）
✅ 艾伦·图灵（Alan Turing）
✅ 亨利·戈登·莱斯（Henry Gordon Rice）
```

### Chinese Punctuation
Use Chinese punctuation throughout:

| Type | English | Chinese |
|------|---------|---------|
| Comma | , | ， |
| Period | . | 。 |
| Colon | : | ： |
| Semicolon | ; | ；|
| Quotation | "text" | "文本" or 「文本」|

**Exception**: Keep English punctuation inside code blocks.

## Common Translation Mistakes

### Avoid These Patterns

| Issue | ❌ Avoid | ✅ Use Instead |
|-------|---------|---------------|
| Verb-noun order | 协调多元能力 | 多元能力的协调 |
| Complex compounds | 跨越不同输入类型的综合练习 | 综合多种信息来源的过程 |
| Literary words | 担纲、诚然 | 主导、确实 |
| Wrong tense | 你的回应塑造了 | 你的回应将塑造 |
| Missing context | 动态的能力需求 | 对团队能力的动态需求 |
| Too strong | 否定 | 提出不同意见 |

### Passive Voice
Chinese prefers active voice or topic-comment structure:

```markdown
❌ 这个问题被解决了 (direct passive)
✅ 我们解决了这个问题 (active)
✅ 这个问题，已经解决 (topic-comment)
```

### Four-Character Idioms (成语)
Use when appropriate for conciseness:
- "fundamentally impossible" → 根本不可能 or 无从谈起
- "tremendous improvement" → 质的飞跃
- "critical turning point" → 关键节点

## Technical Explanation Patterns

### Defining Terms
```markdown
❌ EN: "X is defined as Y"
   ZH: X被定义为Y

✅ ZH: X是什么？简单来说，就是Y
✅ ZH: X，即Y
```

### Cause and Effect
```markdown
❌ EN: "Because of X, Y happens"
   ZH: 因为X，Y发生了

✅ ZH: X导致了Y
✅ ZH: 正是因为X，我们才看到Y
```

### Contrast
```markdown
❌ EN: "Unlike X, Y does Z"
   ZH: 不像X，Y做Z

✅ ZH: X和Y不同，Y能够Z
✅ ZH: Y与X相比，具有Z的特点
```

## Tone Guidelines

### Professional Yet Warm
- Use 你 (informal you) instead of 您 (formal you)
- Use 咱们 (we, inclusive) to build community feel
- Humble expertise: 我们不妨 (we might as well), 不妨思考 (worth considering)

### Reader Connection
- Use "你" naturally
- Pose rhetorical questions that resonate with Chinese tech culture
- Reference Chinese tech ecosystem when relevant (阿里、腾讯、字节跳动)

## Quality Checklist

Before finalizing Chinese translation:
- ✅ Does it read naturally when spoken aloud?
- ✅ Would a native Chinese speaker write it this way?
- ✅ Are sentence structures adapted, not word-swapped?
- ✅ Do metaphors resonate with Chinese tech culture?
- ✅ Is the tone appropriately conversational yet professional?
- ✅ Are all English terms and names properly annotated?
- ✅ Is Chinese punctuation used consistently?
- ✅ Run `pnpm run validate:zh-bold-source` for formatting check
