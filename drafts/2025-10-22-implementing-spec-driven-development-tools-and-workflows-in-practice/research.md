# Research: Implementing Spec-Driven Development: Tools and Workflows in Practice

## Article Information
- **Topic**: Practical implementation guide for SDD using GitHub Spec Kit and Kiro
- **Target Audience**: Intermediate developers familiar with basic development workflows
- **Language**: English/Chinese (Bilingual)
- **Started**: 2025-10-22
- **Agent**: GitHub Copilot Agent

## Research Sources

### Primary Sources
- **GitHub Spec Kit Repository**: https://github.com/github/spec-kit
  - Key findings: 
    - Open source CLI toolkit for SDD implementation
    - Supports 13+ AI agents (Claude, Gemini, Copilot, Cursor, etc.)
    - Standardized `/speckit.*` command pattern
    - 6-phase workflow: Constitution → Specify → Clarify → Plan → Tasks → Implement
  - Relevance: Primary tool for demonstrating practical SDD implementation
  - Quotes/Data: "Spec-Driven Development flips the script on traditional software development. For decades, code has been king — specifications were just scaffolding we built and discarded once the 'real work' of coding began."
  - Date accessed: 2025-10-22

- **Kiro Official Website**: https://kiro.dev
  - Key findings:
    - Amazon's SDD-native AI IDE
    - Integrated workflow within IDE environment
    - Natural language spec creation
    - Automated design and planning phases
  - Relevance: Commercial IDE alternative to Spec Kit
  - Quotes/Data: "Kiro by Amazon is an AI-powered Integrated Development Environment (IDE) designed to enhance software development through Spec-Driven Development"
  - Date accessed: 2025-10-22

- **GitHub Blog - Spec-driven development with AI**: https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/
  - Key findings:
    - GitHub's official announcement and methodology explanation
    - Industry backing for SDD approach
    - Focus on production-ready code generation
  - Relevance: Official positioning and use cases
  - Date accessed: 2025-10-22

- **Microsoft Developer Blog**: https://developer.microsoft.com/blog/spec-driven-development-spec-kit
  - Key findings:
    - Practical walkthrough of Spec Kit usage
    - Real examples (notification system, task management)
    - Integration with existing development workflows
  - Relevance: Step-by-step implementation guide
  - Date accessed: 2025-10-22

- **Tutorials Dojo - Amazon Kiro**: https://tutorialsdojo.com/amazon-kiro-ai-ide-spec-driven-development/
  - Key findings:
    - Kiro workflow details
    - Requirements clarification process
    - Technical design automation
  - Relevance: Kiro-specific implementation details
  - Date accessed: 2025-10-22

### Supporting Sources
- InfoQ: "Beyond Vibe Coding: Amazon Introduces Kiro" - https://www.infoq.com/news/2025/08/aws-kiro-spec-driven-agent/
- Spec Kit Official Docs: https://speckit.org/
- GitHub Spec Kit AGENTS.md (internal documentation for multi-agent support)
- Cline SDD workflow: https://github.com/eliasfloreteng/cline-spec-driven-development

### Visual Content Research
- **Mermaid Diagram 1**: Tool Comparison Workflow
  - Type: Parallel flowchart
  - Purpose: Side-by-side comparison of GitHub Spec Kit vs Kiro workflow
  - Complexity: ~12-15 nodes showing phases and outputs

- **Mermaid Diagram 2**: GitHub Spec Kit Architecture
  - Type: System architecture diagram
  - Purpose: Show CLI → AI Agent → Project Structure relationships
  - Complexity: ~8-10 nodes

- **Mermaid Diagram 3**: Multi-Agent Support Pattern
  - Type: Flowchart
  - Purpose: Demonstrate how one specification works with multiple AI assistants
  - Complexity: ~10 nodes
  
- **Comparison Table 1**: Tool Feature Matrix
  - Purpose: Compare GitHub Spec Kit vs Kiro features, requirements, use cases
  - Rows/columns: ~6 rows (features) × 3 columns (Spec Kit, Kiro, Notes)

- **Comparison Table 2**: Supported AI Agents
  - Purpose: Show which AI agents work with which tools
  - Rows/columns: ~13 agents × 3 columns (Agent name, Spec Kit support, Notes)

- **Comparison Table 3**: SDD Command Reference
  - Purpose: Quick reference for key /speckit.* commands
  - Rows/columns: ~6 commands × 3 columns (Command, Purpose, Output)
  
### Code Examples Research (Minimal - Only When Essential)
- **Micro-snippet 1**: Specify CLI initialization commands (3 lines)
  - Source: GitHub Spec Kit README
  - Purpose: Show basic setup syntax
  - Justification: Installation commands require exact syntax, cannot be diagrammed

- **Micro-snippet 2**: Example constitution prompt (4 lines)
  - Source: GitHub Spec Kit documentation
  - Purpose: Demonstrate slash command usage pattern
  - Justification: Shows natural language interaction style

## Key Concepts Identified
1. **Constitution-First Development** - Establishing project principles before coding; highlight with callout box showing example principles
2. **Executable Specifications** - Specs that directly generate implementations; bold at first mention with explanation
3. **Multi-Agent Compatibility** - One spec working with multiple AI tools; emphasize vendor neutrality
4. **Phase Separation** - Clear boundaries between What (Specify), How (Plan), and Execute (Implement); use visual diagram
5. **Tool vs IDE Distinction** - Spec Kit is CLI toolkit, Kiro is integrated IDE; clarify in comparison table

## Inline References to Plan
- **GitHub Spec Kit**: https://github.com/github/spec-kit (first mention in intro)
- **Kiro**: https://kiro.dev (first mention in intro)
- **Spec-Driven Development methodology**: /blog/spec-driven-development (reference existing article for theory)
- **uv package manager**: https://docs.astral.sh/uv/ (mentioned for Spec Kit installation)
- **Claude Code**: https://www.anthropic.com/claude-code (AI agent example)
- **GitHub Copilot**: https://code.visualstudio.com/ (AI agent example)

## Industry Context
- **Current trends**: 
  - Shift from "vibe coding" to structured AI-assisted development
  - Multiple AI coding assistants creating fragmented workflows
  - Enterprise demand for standardized, auditable development processes
  - Open source momentum behind SDD (GitHub) + commercial backing (Amazon)
  
- **Historical background**: 
  - Traditional specs were documentation artifacts, often outdated
  - AI coding assistants started with ad-hoc prompting
  - SDD emerges as structured approach to AI-native development
  - 2025 marked by tool consolidation around SDD patterns

- **Future outlook**: 
  - `/speckit.*` commands becoming de facto standard
  - More IDE vendors integrating SDD natively (following Kiro)
  - Enterprise adoption driving tooling maturity
  - Potential for SDD to become standard practice in AI era

- **Marvin's perspective**: 
  - Practical implementation matters more than theory
  - Tool selection depends on team context and existing workflows
  - Multiple tool options prevent vendor lock-in
  - SDD benefits compound over project lifecycle

## Technical Details
- **Technologies/frameworks**: 
  - GitHub Spec Kit: Python CLI (requires Python 3.11+, uv package manager)
  - Kiro: Standalone IDE (system requirements TBD from official docs)
  - AI Agents: Claude Code, GitHub Copilot, Cursor, Windsurf, Gemini CLI, etc.
  
- **Prerequisites**: 
  - Basic understanding of development workflows
  - Familiarity with AI coding assistants
  - Understanding of software specifications (recommended: read existing SDD article)
  - Git knowledge (for Spec Kit)

- **Complexity level**: Intermediate
  - Not beginner-friendly (assumes dev workflow knowledge)
  - Not advanced (no deep architectural patterns)
  - Focus on practical application

- **Practical applications**: 
  - Setting up SDD workflow for new projects
  - Migrating existing projects to SDD approach
  - Choosing between Spec Kit and Kiro
  - Integrating SDD with team processes

## Content Gaps & Questions
- **Question 1**: What are Kiro's specific system requirements and pricing model?
  - Resolution: Use available public information, note limitations
  
- **Question 2**: How do teams transition mid-project to SDD?
  - Resolution: Address brownfield adoption briefly in practical tips section

- **Gap 1**: Real-world failure cases or limitations
  - Resolution: Include honest assessment of when tools struggle (from research)

## Research Notes
- GitHub Spec Kit is more mature and documented than Kiro (which is newer)
- Spec Kit's multi-agent support is unique strength
- Kiro's IDE integration may offer smoother UX but less flexibility
- Both tools use similar phase structure, suggesting industry consensus on SDD workflow
- AGENTS.md from Spec Kit shows extensive consideration for different AI agent conventions
- Article should complement, not duplicate, existing SDD theory article
- Focus on "getting started" and "choosing the right tool" angles

## Research Status
- [x] Primary sources gathered (GitHub Spec Kit, Kiro, official blogs)
- [x] Visual content opportunities identified (3 Mermaid diagrams, 3 tables)
- [x] Core concepts defined for highlighting (5 key concepts)
- [x] Inline reference URLs collected (6 primary references)
- [x] Industry context researched (trends, history, outlook)
- [x] Technical details verified (from official docs)
- [x] Minimal code examples justified (2 micro-snippets, setup only)
- [x] Ready for outline creation

## Next Steps
- Create detailed outline in outline.md
- Define section structure and word targets
- Plan diagram specifics (node labels, colors for themes)
- Draft introduction section
