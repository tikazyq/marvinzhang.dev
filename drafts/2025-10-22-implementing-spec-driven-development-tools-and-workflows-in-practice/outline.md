# Article Outline: Implementing Spec-Driven Development: Tools and Workflows in Practice

## Article Metadata
- **Title**: Implementing Spec-Driven Development: Tools and Workflows in Practice
- **Slug**: implementing-spec-driven-development-tools-and-workflows-in-practice
- **Target Length**: ~3500 words (Introduction: 400, Main sections: 3×800, Conclusion: 300)
- **Language**: English/Chinese (Bilingual)
- **Tags**: software-engineering, methodology, ai, development-workflow, spec-driven-development, tools
- **Estimated Sections**: 5 (Intro + 3 main + Conclusion)
- **Difficulty Level**: Intermediate
- **Created**: 2025-10-22
- **Last Updated**: 2025-10-22

## Content Strategy
- **Hook Strategy**: Contrast between "vibe coding" chaos and structured SDD workflow - open with developer pain point of context loss across AI interactions
- **Unique Angle**: Practical tool comparison and implementation guide (complements existing theory article)
- **Reader Journey**: Understanding SDD tools → GitHub Spec Kit setup → Kiro overview → Choosing the right tool
- **Practical Value**: Concrete steps to implement SDD in their projects, tool selection framework
- **Visual-First Approach**: 3 Mermaid diagrams show workflows, 3 tables compare features/agents/commands
- **Core Concepts Strategy**: Bold "executable specifications" and "constitution-first development" at first mention, use callout boxes for tool distinctions

## Article Structure

### Introduction (300-500 words, target: 400)
- **Hook**: "After spending three hours explaining your project architecture to an AI assistant for the fifth time this week, you realize there must be a better way." - developer frustration with context loss
- **Industry Context**: 2025 marks shift from ad-hoc AI prompting to structured workflows. GitHub releases Spec Kit, Amazon launches Kiro - industry consensus forming around SDD patterns
- **Personal Connection**: "If you've read about Spec-Driven Development and wondered how to actually implement it in your projects, this guide is for you."
- **Value Proposition**: "You'll learn how to set up SDD workflows using real tools, compare GitHub Spec Kit's toolkit approach vs Kiro's integrated IDE, and choose the right approach for your team."
- **Roadmap**: "We'll explore the SDD tool ecosystem, walk through GitHub Spec Kit implementation, examine Kiro's IDE-native approach, and provide a decision framework for choosing between tools."
- **Tone Setting**: Practical, hands-on, honest about trade-offs

:::info Related Reading
For theoretical foundations and SDD methodology details, see [Spec-Driven Development: A Systematic Approach to Complex Features](/blog/spec-driven-development).
:::

{/* truncate */}

### Main Content Sections

#### Section 1: The SDD Tool Landscape (600-1000 words, target: 800)
- **Focus**: Understanding the SDD tool ecosystem and what tools actually do
- **Learning Objective**: Reader understands the two main tool categories (toolkit vs IDE) and their fundamental differences
- **Subsections**:
  - **What SDD Tools Actually Do** - Transform natural language specs into executable implementation plans
  - **Two Approaches: Toolkit vs IDE** - External CLI tools (Spec Kit) vs integrated environments (Kiro)
  - **The Common Workflow Pattern** - Constitution → Specify → Plan → Tasks → Implement phases
- **Visual Elements**: 
  - **Mermaid Diagram 1**: Side-by-side workflow comparison (Spec Kit vs Kiro)
  - **Table 1**: Tool comparison matrix (features, requirements, ideal use cases)
- **Core Concepts to Highlight**:
  - ** "Executable specifications" ** - Not documentation, but implementation blueprints
  - ** "Constitution-first development" ** - Project principles before code
- **Inline References**:
  - [GitHub Spec Kit](https://github.com/github/spec-kit) at first mention
  - [Kiro](https://kiro.dev) at first mention
- **Key Takeaway**: SDD tools aren't monolithic - choose between external toolkit (flexibility) or integrated IDE (convenience)
- **Transition to Next**: "Let's start with GitHub Spec Kit, the open source toolkit approach that works with your existing development environment."

#### Section 2: GitHub Spec Kit: The Toolkit Approach (600-1000 words, target: 850)
- **Focus**: Practical implementation of GitHub Spec Kit from installation to first specification
- **Learning Objective**: Reader can install Spec Kit, understand its architecture, and create their first spec
- **Builds On**: Applies tool landscape concepts to concrete implementation
- **Subsections**:
  - **Installation and Setup** - uv installation, project initialization, AI agent selection
  - **Multi-Agent Architecture** - How Spec Kit works with 13+ AI assistants
  - **The Command Set** - `/speckit.*` commands and their purposes
  - **A Simple Walkthrough** - Constitution → Specify → Plan flow with example
- **Code Examples**: 
  - Installation commands (3 lines): `uv tool install`, `specify init`, `specify check`
  - Example `/speckit.constitution` prompt (4 lines) showing natural language interaction
- **Visual Elements**:
  - **Table 2**: Supported AI Agents matrix (13 agents, support status, notes)
  - **Table 3**: Command reference (`/speckit.constitution`, `/speckit.specify`, etc. with purposes)
  - **Mermaid Diagram 2**: Spec Kit architecture (CLI → AI Agent → Project Structure → Artifacts)
- **Core Concepts to Highlight**:
  - ** "Multi-agent compatibility" ** - One spec, many AI assistants
  - ** "Phase separation" ** - Clear boundaries between What, How, Execute
- **Inline References**:
  - [uv package manager](https://docs.astral.sh/uv/) at installation mention
  - [Claude Code](https://www.anthropic.com/claude-code) as AI agent example
  - [GitHub Copilot](https://code.visualstudio.com/) as AI agent example
- **Key Takeaway**: Spec Kit is a CLI that orchestrates your chosen AI assistant, generating structured artifacts that guide implementation
- **Transition to Next**: "While Spec Kit brings SDD to existing tools, Kiro takes a different approach by integrating SDD directly into the IDE."

#### Section 3: Kiro: The Integrated IDE Approach (600-1000 words, target: 750)
- **Focus**: Understanding Kiro's IDE-native SDD implementation and key differences from Spec Kit
- **Learning Objective**: Reader understands Kiro's integrated workflow and can evaluate IDE vs toolkit trade-offs
- **Advanced Application**: Compare and contrast with Spec Kit to understand when each excels
- **Subsections**:
  - **Kiro's Integrated Workflow** - SDD built into IDE, no external CLI needed
  - **Natural Language Specifications** - IDE-native spec creation and refinement
  - **Automated Design Generation** - How Kiro transforms specs into technical designs
  - **When to Choose Kiro** - Scenarios where integrated approach wins
- **Visual Elements**:
  - **Mermaid Diagram 3**: Kiro's integrated workflow (Prompt → IDE Analysis → Spec → Design → Tasks → Implementation)
  - **Callout Box**: Key differences between Spec Kit and Kiro (bullet points)
- **Core Concepts to Highlight**:
  - ** "IDE-native SDD" ** - Workflow embedded in development environment
  - ** "Single-vendor vs multi-agent" ** - Trade-off between integration and flexibility
- **Inline References**:
  - [Kiro official site](https://kiro.dev) for detailed documentation
  - Reference back to Spec Kit section for comparison
- **Key Takeaway**: Kiro offers streamlined experience for teams comfortable with integrated tooling, while Spec Kit provides flexibility for multi-tool workflows
- **Transition to Conclusion**: "Now that we've explored both approaches, let's consider how to choose the right tool for your specific context."

### Conclusion (250-400 words, target: 300)
- **Summary Strategy**: Framework for choosing tools rather than repeating technical details
- **Key Points Recap**:
  1. **SDD tools make specifications executable** - Not just documentation
  2. **Two valid approaches exist** - Toolkit (Spec Kit) vs IDE (Kiro)
  3. **Multi-agent support matters** - Spec Kit's vendor neutrality vs Kiro's integration
  4. **Start small, scale up** - Begin with one project, expand as benefits become clear
- **Future Outlook**: `/speckit.*` commands becoming industry standard, more IDEs likely to adopt native SDD support, enterprise adoption driving maturity
- **Actionable Next Steps**:
  1. Read existing SDD theory article if unfamiliar with methodology
  2. Choose tool based on team context (multi-tool → Spec Kit, integrated → Kiro)
  3. Start with simple project to learn workflow
  4. Expand to complex features as confidence grows
- **Learning Encouragement**: "Like any methodology, SDD's value compounds over time. The upfront investment in structured specifications pays dividends across a project's lifecycle."
- **Community Connection**: Point to GitHub Spec Kit repository for community support and ongoing development

## Writing Strategy Notes
- **Complexity Progression**: Tool concepts → Practical setup → Comparative analysis
- **Conceptual Strategy**: 
  - Use workflows (Mermaid diagrams) instead of code for SDD phases
  - Tables for feature/agent comparisons rather than prose lists
  - Only show installation commands and example prompts (minimal code)
- **Reader Engagement Plan**: 
  - Rhetorical questions about tool choice decisions
  - "你可能会好奇..." (You might wonder...) for Chinese version
  - Compare to familiar patterns (like CI/CD tool choices)
- **Marvin's Voice Elements**:
  - Professional but accessible tone
  - Honest about trade-offs (not marketing pitch)
  - Practical emphasis over theoretical purity
  - Industry context grounding
- **Visual Content Plan**:
  - **3 Mermaid Diagrams**: All use consistent color scheme (blue for tools, purple for processes, green for outputs)
  - **3 Tables**: Clean formatting, concise cells, avoid clutter

## Technical Implementation Notes
- **Code Testing Requirements**: 
  - Verify Spec Kit installation commands are current
  - Check all tool URLs are functional
  - Ensure AI agent names are accurate
- **External References**: 
  - GitHub Spec Kit repo and docs
  - Kiro official site
  - uv package manager docs
  - Existing SDD theory article (internal)
- **Image/Diagram Needs**: 
  - All Mermaid diagrams will be styled for light/dark theme compatibility
  - No screenshots needed (conceptual article)
- **Cross-Platform Considerations**: 
  - Spec Kit supports Windows (PowerShell), macOS/Linux (Bash)
  - Kiro availability TBD from official docs

## Potential Challenges
- **Complex Concepts**: 
  - "Executable specifications" may confuse - use concrete workflow example
  - Multi-agent architecture needs clear diagram
- **Scope Management**: 
  - Don't dive deep into AI agent specifics (that's separate topic)
  - Focus on SDD implementation, not general AI coding assistant usage
- **Balance Issues**: 
  - Avoid seeming like Spec Kit vs Kiro competition - both valid
  - Present pros/cons honestly without bias

## Review Criteria
- [x] Each section has clear, single focus (✓ Tool landscape, Spec Kit, Kiro)
- [x] Progressive complexity maintained (✓ Concepts → Setup → Comparison)
- [x] Visual-first approach (✓ 3 Mermaid diagrams, 3 tables planned)
- [x] Core concepts highlighted with callouts (✓ 5 key concepts identified)
- [x] Inline references to official docs at first mention (✓ 6 URLs planned)
- [x] Smooth transitions between sections (✓ Transitions defined)
- [x] Appropriate length for each section (✓ Targets: 400/800/850/750/300)
- [x] Marvin's voice and style considerations (✓ Professional, practical, honest)
- [x] Technical accuracy checkpoints identified (✓ Commands, URLs, names)
- [x] Minimal code usage (✓ Only 7 lines total: 3 install + 4 example prompt)

## Outline Status
- [x] Structure finalized (5 sections total)
- [x] Section focuses defined (each has single clear focus)
- [x] Visual elements planned (3 diagrams, 3 tables, 2 code snippets)
- [x] Ready for section-by-section writing

## Next Phase: Writing
**Order**: Introduction → Section 1 → Section 2 → Section 3 → Conclusion
**Approach**: Write directly to `blog/2025-10-22-implementing-spec-driven-development-tools-and-workflows-in-practice.mdx` with `unlisted: true`
**Quality Check**: Review each section against writing guidelines before proceeding to next
