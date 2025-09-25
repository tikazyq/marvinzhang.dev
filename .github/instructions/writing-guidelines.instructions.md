---
applyTo: '**/*.md*'
---

# Blog Writing Guidelines (Section-by-Section)

## Section-by-Section Writing Approach

**CRITICAL**: Always write article content in manageable sections to avoid response limits. Write directly to `blog/YYYY-MM-DD-slug.mdx` with `draft: true`, completing one section at a time and clearly indicating section boundaries within the article. Translate in `i18n/zh/.../YYYY-MM-DD-slug.mdx`.

### Section Planning Guidelines
- **Introduction**: 500-800 words (hook + context + roadmap)
- **Main Sections**: 600-1000 words each (2-3 subsections maximum)
- **Conclusion**: 400-600 words (summary + future + takeaways)

## Content Structure & Organization

### Introduction Section Pattern
- **Compelling hook**: Start with thought-provoking quotes, statistics, or rhetorical questions
- **Industry context**: Place topic within broader tech/industry landscape ("如今的前端开发...")
- **Personal angle**: Connect to reader's likely experiences ("如果你是一个...")
- **Clear roadmap**: Preview what reader will learn/gain ("本文将详细介绍...")

### Main Content Section Organization
- **One major concept per section**: Focus deeply rather than covering multiple topics
- **Progressive disclosure**: Build from basic concepts to advanced applications within each section
- **Practical examples**: Include concrete code samples and real-world scenarios
- **Visual breaks**: Use subheadings (H3), lists, and code blocks to break up text
- **Section transitions**: End with bridge to next section ("接下来，我们将探讨...")

### Conclusion Section Structure
- **Key recap**: Summarize main points covered ("总之...")
- **Future outlook**: Connect current topic to industry trends
- **Actionable takeaways**: Give readers clear next steps
- **Learning mindset**: Emphasize continuous growth ("作为一个软件工程师，你需要不断学习")

## Tone & Voice (Per Section)

### Professional Yet Accessible
- **Authoritative but humble**: Share expertise without being condescending
- **Conversational**: Use "你" and rhetorical questions to engage readers
- **Section-appropriate energy**: Vary intensity based on content complexity

### Language Patterns
- **Section connectors**: "因此", "而", "不过", "其实", "接下来"
- **Metaphors**: Use concrete analogies (building construction for software architecture)
- **Emphasis markers**: "非常重要", "核心概念", "关键点"
- **Reader engagement**: "你可能会问", "相信你不会", "对于...来说"

## Section-Specific Guidelines

### Introduction Section
- **Hook examples**: Industry statistics, provocative questions, relevant quotes
- **Context setting**: Historical background, current state, why topic matters now
- **Value proposition**: What specific benefits reader will gain
- **Structure preview**: Clear outline of what's coming

### Main Content Sections
- **Single focus**: One major concept or technology per section
- **Layered depth**: Basic concept → practical implementation → advanced considerations
- **Code integration**: 1-2 substantial code examples per section
- **Real-world grounding**: Connect theory to actual development challenges

### Conclusion Section
- **Synthesis**: How individual sections connect to bigger picture
- **Trend analysis**: Where technology/industry is heading
- **Next steps**: Specific actions readers can take
- **Community building**: Encourage continued exploration and discussion

## Technical Content Standards (Per Section)

### Code Examples
- **Section-appropriate complexity**: Match code complexity to section's focus
- **Real-world relevance**: Show practical, implementable examples
- **Progressive within section**: Start simple, build complexity within that section
- **Clear commenting**: Explain non-obvious logic in Chinese comments
- **Working examples**: Ensure code actually runs and demonstrates concept

### Explanations
- **Section coherence**: Keep explanations focused on section's main theme
- **Visual aids**: Include tables, lists, diagrams when they enhance understanding
- **Cross-references**: Link to related concepts but don't lose section focus
- **Multiple perspectives**: Address different experience levels within section scope

## Section Completion Standards

### Each Section Must Include:
- **Clear section boundary**: Obvious start and end points
- **Self-contained value**: Reader gains something useful from this section alone
- **Smooth transitions**: Natural flow to next section
- **Appropriate length**: Within target word count for section type

### Section Quality Checklist:
- ✅ Single, clear focus maintained throughout
- ✅ Appropriate depth for section type and target audience
- ✅ Engaging narrative flow with Marvin's voice
- ✅ Technical accuracy and practical applicability
- ✅ Proper MDX formatting and code highlighting
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
- **Disconnected examples**: Code or concepts that don't relate to section focus
- **Weak transitions**: Sections that don't flow naturally into the next

## Section Handoff Format
```
## Section Complete: [Section Name]
**Focus**: [Main concept covered]
**Word Count**: ~XXX words
**Key Takeaway**: [Primary learning outcome]
**Next Section Preview**: [What comes next and why]
**Article Progress**: [Current completion status of full article]
```