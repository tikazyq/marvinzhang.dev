---
applyTo: '**/*.md*'
---

# Blog Writing Guidelines (Section-by-Section)

**CRITICAL**: Always write article content in manageable sections to avoid response limits. Write directly to `blog/YYYY-MM-DD-slug.mdx` with `unlisted: true`, completing one section at a time and clearly indicating section boundaries within the article. Translate in `i18n/en/.../YYYY-MM-DD-slug.mdx`.

**DATE REQUIREMENT**: Always determine the **current date programmatically** for new blog posts by running a terminal command (e.g., `date +%Y-%m-%d`). Do NOT rely on training data memory or assume dates. Use the actual system date for accuracy.

### Section Planning Guidelines
- **Introduction**: 300-500 words (hook + context + roadmap)
- **Main Sections**: 600-1000 words each (2-3 subsections maximum)
- **Conclusion**: 250-400 words (summary + future + takeaways)

## Content Structure & Organization

### Introduction Section Pattern
- **Compelling hook**: Start with thought-provoking quotes, statistics, or rhetorical questions
- **Industry context**: Place topic within broader tech/industry landscape ("Modern frontend development...")
- **Personal angle**: Connect to reader's likely experiences ("If you're a developer...")
- **Clear roadmap**: Preview what reader will learn/gain ("This article will detail...")

### Main Content Section Organization
- **One major concept per section**: Focus deeply rather than covering multiple topics
- **Progressive disclosure**: Build from basic concepts to advanced applications within each section
- **Conceptual examples**: Explain through diagrams, analogies, and real-world scenarios
- **Visual breaks**: Use subheadings (H3), lists, diagrams, and tables to break up text
- **Section transitions**: End with bridge to next section ("Next, we'll explore...")

### Conclusion Section Structure
- **Key recap**: Summarize main points covered ("In summary...")
- **Future outlook**: Connect current topic to industry trends
- **Actionable takeaways**: Give readers clear next steps
- **Learning mindset**: Emphasize continuous growth ("As a software engineer, continuous learning is essential")

## Tone & Voice (Per Section)

### Professional Yet Accessible
- **Authoritative but humble**: Share expertise without being condescending
- **Conversational**: Use "you" and rhetorical questions to engage readers
- **Section-appropriate energy**: Vary intensity based on content complexity

### Language Patterns
- **Section connectors**: "Therefore", "However", "Moreover", "Actually", "Next"
- **Metaphors**: Use concrete analogies (building construction for software architecture)
- **Emphasis markers**: "crucial", "core concept", "key point"
- **Reader engagement**: "You might wonder", "You'll likely find", "For developers like you"

### Localization Guidelines

#### Core Philosophy: 形不同而意同 (Same Meaning, Different Form)
Chinese translations must prioritize natural idiomatic expression over literal word-for-word translation. The goal is to convey the same technical concepts and insights while adapting the form, structure, and rhetoric to feel native to Chinese readers.

#### Natural Chinese Writing Principles
- **Avoid literal translations**: Transform English sentence structures into natural Chinese patterns, even if it means reorganizing ideas
- **Use Chinese rhetoric**: Leverage Chinese literary devices, four-character idioms (成语), and culturally resonant expressions where appropriate
- **Adapt sentence length**: Chinese readers often prefer shorter, punchier sentences; break long English sentences into multiple shorter ones
- **Cultural localization**: Replace Western metaphors with Chinese equivalents or universally understood analogies
- **Reader connection**: Use "你" (you) naturally and pose rhetorical questions in ways that resonate with Chinese tech culture

#### Sentence Structure Adaptation Examples

**❌ Literal Translation (Too Stiff)**:
> "This article explores Rice's Theorem and its profound implications for software testing."
> 本文探讨莱斯定理及其对软件测试的深远影响。

**✅ Natural Chinese (Idiomatic)**:
> 莱斯定理如何影响软件测试？这正是本文要探讨的核心问题。
> (How does Rice's Theorem affect software testing? That's the core question this article explores.)

**❌ Literal Translation**:
> "The journey ahead takes us from theoretical computer science to everyday development practices."
> 前方的旅程将我们从理论计算机科学带到日常开发实践。

**✅ Natural Chinese**:
> 让我们从理论出发，一步步走向实际开发中的应用。
> (Let's start from theory and step by step move toward practical development applications.)

#### Expression Pattern Transformations

| English Pattern | Literal Chinese (❌) | Natural Chinese (✅) |
|----------------|-------------------|-------------------|
| "You might wonder..." | 你可能会想... | 也许你会好奇... / 你是否想过... |
| "Let's unpack this..." | 让我们解开这个... | 咱们来仔细看看... / 深入分析一下... |
| "Here's the key insight..." | 这是关键洞察... | 关键在于... / 核心要点是... |
| "This isn't just about..." | 这不仅仅是关于... | 这不只是...的问题 / 问题的本质是... |
| "The bottom line is..." | 底线是... | 说到底... / 归根结底... |

#### Rhetorical Device Adaptation
- **Questions**: Transform English rhetorical questions into Chinese patterns
  - EN: "Why should I care about abstract mathematical theorems?"
  - ZH (literal): 我为什么应该关心抽象数学定理？ ❌
  - ZH (natural): 抽象的数学定理和我有什么关系？ ✅
  
- **Transitions**: Use Chinese-specific connectors
  - Instead of direct translations, use: 不过 / 然而 / 因此 / 换句话说 / 实际上 / 更进一步说
  
- **Emphasis**: Adapt emphasis patterns
  - EN: "This is fundamentally important..."
  - ZH (literal): 这是根本重要的... ❌
  - ZH (natural): 这一点至关重要... / 这是问题的根本所在... ✅

#### Technical Content Localization
- **Maintain precision**: Technical accuracy is non-negotiable; adapt presentation, not meaning
- **Localize examples**: Where possible, use Chinese tech companies, tools, or scenarios familiar to Chinese developers
- **Balance accessibility**: Chinese technical writing often assumes slightly higher baseline knowledge; adjust explanation depth accordingly

#### Tone and Voice in Chinese
- **Professional yet warm**: Use 你 (informal you) instead of 您 (formal you) to maintain conversational tone
- **Collective reference**: When appropriate, use "咱们" (we, inclusive) to build community feel
- **Humble expertise**: Chinese readers appreciate confident knowledge sharing without arrogance; use phrases like "我们不妨" (we might as well), "不妨思考" (worth considering)

#### Must-Preserve Elements (Technical Requirements)
- **English term annotations**: In Chinese (zh) articles, always include English translations for technical terms in parentheses at first mention:
  - Use capitalized English terms (e.g., "Undecidable" not "undecidable")
  - Include abbreviations where applicable (e.g., "大型语言模型（Large Language Model，LLM）")
  - Format: `中文术语（English Term）` or `中文术语（English Term，ABBR）`
  - Apply to: core concepts, technical terminology, methodologies, and industry-standard terms
  - Use Chinese punctuation (，、：) throughout Chinese articles

- **English names for famous people**: In Chinese (zh) articles, always include English names in parentheses at first mention of notable individuals:
  - Format: `中文姓名（English Name）` (e.g., "艾兹格·迪杰斯特拉（Edsger Dijkstra）")
  - Apply to: computer scientists, mathematicians, researchers, industry leaders, and other notable figures
  - Helps readers identify individuals in international context and facilitates further research

- **Chinese punctuation consistency**: In Chinese (zh) articles, always use Chinese punctuation marks throughout:
  - Use Chinese comma (，) instead of English comma (,)
  - Use Chinese period (。) instead of English period (.)
  - Use Chinese colon (：) instead of English colon (:)
  - Apply consistently in all text, including technical explanations, lists, and sentence structures
  - Exception: Keep English punctuation inside code blocks and when quoting English terms

#### Quality Check for Chinese Articles
Before finalizing a Chinese translation, verify:
- ✅ Does it read naturally when spoken aloud in Chinese?
- ✅ Would a native Chinese speaker write it this way?
- ✅ Are sentence structures adapted, not just word-swapped?
- ✅ Do metaphors and examples resonate with Chinese tech culture?
- ✅ Is the tone appropriately conversational yet professional?
- ✅ Are all English terms and names properly annotated?
- ✅ Is Chinese punctuation used consistently?

#### Common Pitfalls to Avoid in Chinese Translation

**Pitfall 1: Direct Word-by-Word Translation**
- ❌ Problem: Maintains English grammar and word order in Chinese
- ✅ Solution: Restructure sentences following Chinese syntax patterns

**Pitfall 2: Awkward Passive Voice**
- ❌ Problem: "这个问题被解决了" (direct passive from "the problem was solved")
- ✅ Solution: Use active voice or topic-comment structure: "我们解决了这个问题" or "这个问题，已经解决"

**Pitfall 3: Overly Long Sentences**
- ❌ Problem: Translating complex English sentences as single Chinese sentences
- ✅ Solution: Break into 2-3 shorter sentences with clear logical flow

**Pitfall 4: Missing Cultural Context**
- ❌ Problem: Using Western examples that don't resonate (e.g., Thanksgiving, baseball metaphors)
- ✅ Solution: Replace with universal or Chinese-specific examples

**Pitfall 5: Unnatural Conjunctions**
- ❌ Problem: Overusing "并且"、"但是"、"因为" in every sentence
- ✅ Solution: Use implicit connections, parallel structures, or varied connectors

#### Advanced Techniques for Natural Chinese Writing

1. **Use Topic-Comment Structure**: Chinese naturally emphasizes topic-comment patterns
   - EN: "Testing shows bugs exist, not that they don't."
   - ZH (literal): 测试显示bug存在，而不是它们不存在。❌
   - ZH (natural): 测试能证明bug的存在，却无法证明不存在。✅

2. **Leverage Four-Character Idioms**: When appropriate, use 成语 for conciseness
   - "fundamentally impossible" → 根本不可能 or 无从谈起
   - "tremendous improvement" → 巨大飞跃 or 质的飞跃
   - "critical turning point" → 关键节点 or 转折点

3. **Adapt Question Patterns**: Chinese rhetorical questions have distinct structures
   - EN: "Why does this matter?"
   - ZH (literal): 这为什么重要？❌
   - ZH (natural): 这有什么意义呢？/ 重要性何在？✅

4. **Use Balanced Parallel Structures**: Chinese appreciates symmetry
   - "from theory to practice" → 从理论到实践 (good)
   - "understanding limits and maximizing effectiveness" → 认清边界，提升实效 (balanced rhythm)

5. **Apply Appropriate Modality**: Chinese uses different modal expressions
   - EN: "You should consider..."
   - ZH (literal): 你应该考虑... ❌
   - ZH (natural): 不妨考虑... / 值得注意的是... ✅

#### Technical Explanation Patterns in Chinese

When explaining complex technical concepts, adapt these patterns:

**Pattern 1: Defining Terms**
- EN: "X is defined as Y"
- ZH (literal): X被定义为Y ❌
- ZH (natural): X是什么？简单来说，就是Y / X，即Y ✅

**Pattern 2: Cause and Effect**
- EN: "Because of X, Y happens"
- ZH (literal): 因为X，Y发生了 ❌
- ZH (natural): X导致了Y / 正是因为X，我们才看到Y ✅

**Pattern 3: Contrast and Comparison**
- EN: "Unlike X, Y does Z"
- ZH (literal): 不像X，Y做Z ❌
- ZH (natural): X和Y不同，Y能够Z / Y与X相比，具有Z的特点 ✅

**Pattern 4: Sequential Steps**
- EN: "First...then...finally..."
- ZH (literal): 首先...然后...最后... (acceptable but can be improved)
- ZH (natural): 第一步...接下来...最终... / 先...再...最后... ✅

**Pattern 5: Emphasis and Highlighting**
- EN: "The key point is..."
- ZH (literal): 关键点是... ❌
- ZH (natural): 关键在于... / 核心要点是... / 最重要的是... ✅

## Section-Specific Guidelines

### Introduction Section
- **Hook examples**: Industry statistics, provocative questions, relevant quotes
- **Context setting**: Historical background, current state, why topic matters now
- **Value proposition**: What specific benefits reader will gain
- **Structure preview**: Clear outline of what's coming

### Main Content Sections
- **Single focus**: One major concept or technology per section
- **Layered depth**: Basic concept → practical understanding → advanced considerations
- **Minimal code**: Use code sparingly; prefer diagrams and conceptual explanations
- **Real-world grounding**: Connect theory to actual development challenges through scenarios and case studies

### Conclusion Section
- **Synthesis**: How individual sections connect to bigger picture
- **Trend analysis**: Where technology/industry is heading
- **Next steps**: Specific actions readers can take
- **Community building**: Encourage continued exploration and discussion

## Technical Content Standards (Per Section)

### Code Examples (Minimal Use)
- **Sparingly applied**: Use only when absolutely necessary to illustrate a concept
- **Micro-snippets preferred**: Show key syntax or patterns in 5-10 lines maximum
- **Conceptual focus**: Emphasize the idea behind the code, not implementation details
- **Clear commenting**: Explain the core concept, not line-by-line logic
- **Alternatives first**: Always consider if a diagram, table, or analogy would be clearer

### Explanations
- **Section coherence**: Keep explanations focused on section's main theme
- **Visual aids**: Include tables, lists, diagrams when they enhance understanding
- **Cross-references**: Link to related concepts but don't lose section focus
- **Multiple perspectives**: Address different experience levels within section scope

### Core Concept Highlights
- **First-mention emphasis**: Bold the key sentence that defines the section’s  core concepts at its first mention.
- **Callouts for essentials**: Use MDX admonitions to surface must-remember ideas (e.g., note/tip/warning) with a short, skimmable summary line.
- **One-liner takeaway**: Each main section should include a condensed takeaway line starting with core concepts.

### Inline References & Citations
 - **Inline links at first mention**: Add a direct link the first time you reference a library/standard/tool (official docs preferred). Use inline `text` with a URL, not footnotes.
- **Source transparency**: When citing metrics/claims, link to the primary source (docs, RFCs, GitHub releases, reputable blogs) and include the year if relevant.
- **Internal linking**: When concepts overlap with previous posts on this site, link to the earlier article using its slug format `/blog/slug-name`.
- **Previous article references**: Leverage existing articles in the repository as authoritative internal references when relevant - treat them as primary sources for concepts already covered.
- **Link hygiene**: Keep link text descriptive (avoid "here"), and avoid overlinking (generally 1–2 links per paragraph max).

### Previous Article Reference Patterns
- **MDX admonishments for deep dives**: Use `:::info Related Reading` blocks with descriptive text and internal links for comprehensive background material:
  ```markdown
  :::info Related Reading
  For a deeper exploration of how complexity emerges and accumulates in software projects, see my previous analysis: [Why Do We Need to Consider Complexity in Software Projects?](/blog/software-project-complexity)
  :::
  ```
- **Inline contextual references**: Naturally weave references into text flow when supporting current points:
  ```markdown
  As I explored in [my analysis of agile practices](/blog/agile-team-practices), many teams adopt agile frameworks expecting immediate speed improvements...
  ```
- **Supporting evidence links**: Reference previous articles as authoritative sources when making claims or providing additional context:
  ```markdown
  Recent research shows that [AI's productivity benefits are highly contextual](/blog/ai-productivity), with structured approaches significantly outperforming ad-hoc usage.
  ```
- **Conceptual deep dives**: When introducing related but complex topics, point to dedicated articles for comprehensive coverage:
  ```markdown
  For a comprehensive exploration of how information architecture affects AI system performance, see [Context Engineering: The Art of Information Selection in AI Systems](/blog/context-engineering).
  ```

### Diagrams (Mermaid) & Tables (Primary Method)
- **Visual-first approach**: Default to Mermaid diagrams or tables for explaining any process, comparison, or structure
- **Mermaid usage**: Use sequence/flowchart/state diagrams to show behavior, architecture, and workflows. Keep diagrams focused (≤ 12 nodes) and label edges clearly.
- **Mermaid theme-aware styling**: Always style nodes with explicit `fill,stroke,color` properties (e.g., `style NodeId fill:#color,stroke:#border,color:#text`) to ensure readability in both light and dark modes. Use semantic colors (red for error/negative, green for success/positive, yellow for warning, blue for info).
- **Tables for all comparisons**: Use tables for pros/cons, feature comparisons, configuration options, and parameter explanations
- **Minimal code budget**: Aim for 0-1 micro-snippet (≤ 10 lines) per main section; use only when the syntax itself is the learning point

## Section Completion Standards

### Each Section Must Include:
- **Clear section boundary**: Obvious start and end points
- **Self-contained value**: Reader gains something useful from this section alone
- **Smooth transitions**: Natural flow to next section
- **Appropriate length**: Within target word count for section type
- **Core concept surfaced**: Clear highlight/callout of the section's core concepts
- **Inline references**: Key terms link to official or canonical sources at first mention
- **Visual where suitable**: Mermaid diagram or table used when it improves clarity

### MDX Syntax Requirements:
- **Comments**: Use JSX-style comments `{/* comment */}` instead of HTML comments `<!-- comment -->`
- **Truncate marker**: Add `{/* truncate */}` after the introduction section to control blog list previews
- **Frontmatter**: YAML format at the top with `---` delimiters
- **Admonitions**: Use `:::type` syntax (e.g., `:::note`, `:::tip`, `:::warning`)
- **Bold formatting in Chinese**: When using multiple bold sections on the same line in Chinese text, add a space before the second `**` marker to ensure proper MDX rendering. Without the space, the second bold section may fail to render and appear as literal `**text**` instead of bold text.
  ```markdown
  ✅ Correct: 这与 **语法属性（Syntactic Properties）** 形成对比
  ❌ Incorrect: 这与**语法属性（Syntactic Properties）**形成对比
  ```
- **Bold formatting with quotes**: When bolding text that contains double quotes, add spaces inside the bold markers to prevent parsing issues. The quotes can interfere with MDX's bold syntax parsing.
  ```markdown
  ✅ Correct: ** "所有程序行为" ** 是一个语义属性
  ❌ Incorrect: **"所有程序行为"** 是一个语义属性
  ```

### Section Quality Checklist:
- ✅ Single, clear focus maintained throughout
- ✅ Appropriate depth for section type and target audience
- ✅ Engaging narrative flow with Marvin's voice
- ✅ Technical accuracy and practical applicability
- ✅ Proper MDX formatting with visual emphasis (diagrams/tables over code)
- ✅ Natural transition setup for next section

## Writing Flow Management

### Section Start
- **Clear heading**: Descriptive H2 that indicates section focus
- **Opening hook**: Engage reader with section-specific context
- **Preview**: Brief outline of what this section covers

### Section Development
- **Consistent voice**: Maintain Marvin's tone throughout
- **Balanced pacing**: Mix explanation, examples, and reader engagement
- **Visual variety**: Use formatting to create readable flow

### Section End
- **Key points summary**: Reinforce main takeaways from this section
- **Transition bridge**: Connect to next section's topic
- **Completion indicator**: Clear signal that section is complete

## Avoid in Each Section
- **Topic sprawl**: Trying to cover too many concepts in one section
- **Abrupt endings**: Sections that stop without proper conclusion
- **Overwhelming density**: Too much information without breaks
- **Code-heavy explanations**: Using code when diagrams, analogies, or tables would be clearer
- **Implementation details**: Focus on concepts and patterns, not specific syntax
- **Weak transitions**: Sections that don't flow naturally into the next
- **Wall-of-code**: Any code block longer than 10 lines without exceptional justification

## Section Handoff Format
```
## Section Complete: [Section Name]
**Focus**: [Main concept covered]
**Word Count**: ~XXX words
**Key Takeaway**: [Primary learning outcome]
**Next Section Preview**: [What comes next and why]
**Article Progress**: [Current completion status of full article]
```