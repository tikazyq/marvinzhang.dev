---
applyTo: '**/*.md*'
---

# Blog Writing Guidelines (Section-by-Section)

**CRITICAL**: Always write article content in manageable sections to avoid response limits. Write directly to `blog/YYYY-MM-DD-slug.mdx` with `draft: true`, completing one section at a time and clearly indicating section boundaries within the article. Translate in `i18n/en/.../YYYY-MM-DD-slug.mdx`.

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
- **Native Chinese version**: When translating to Chinese (zh), ensure the content reads naturally and idiomatically - avoid literal translations that sound awkward
- **Cultural adaptation**: Adapt examples, metaphors, and references to be culturally relevant for Chinese readers
- **Natural flow**: Chinese version should feel like it was originally written in Chinese, not translated
- **English term annotations**: In Chinese (zh) articles, always include English translations for technical terms in parentheses at first mention:
  - Use capitalized English terms (e.g., "Undecidable" not "undecidable")
  - Include abbreviations where applicable (e.g., "大型语言模型（Large Language Model，LLM）")
  - Format: `中文术语（English Term）` or `中文术语（English Term，ABBR）`
  - Apply to: core concepts, technical terminology, methodologies, and industry-standard terms
  - Use Chinese punctuation (，、：) throughout Chinese articles

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