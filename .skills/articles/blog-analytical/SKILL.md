---
name: blog-analytical
description: Write deep-dive analytical technical articles for marvinzhang.dev following 4-stage workflow (Research → Outline → Writing → Refine). Use for technical deep-dives, technology comparisons, industry analysis, and theoretical concepts with practical implications. Produces data-driven, Economist-inspired bilingual content. Requires blog-common skill.
metadata:
  author: marvinzhang
  version: "1.0"
  workflow: "4-stage"
  style: "analytical"
---

# Blog Writing: Analytical Style

Write comprehensive technical analysis articles with data-driven argumentation and Economist-inspired clarity.

## Prerequisites

**Load blog-common skill** for formatting, localization, quality standards, and writing principles.

## When to Use

- Technical deep-dives and comprehensive analysis
- Industry landscape overviews and trends
- Comparative evaluations (tools, frameworks, approaches)
- Theoretical concepts with practical implications
- Research-backed technical arguments

**Example topics**: "Understanding Rice's Theorem", "SDD Ecosystem in 2026", "LLM Architecture Evolution"

## Questionnaire-First Workflow

**Start every analytical article with the questionnaire** to gather structured input:

```bash
lean-spec create "article-slug" --template=analytical
```

This creates a spec with embedded questionnaire covering:
- Core thesis and unique perspective
- Evidence and research sources
- Counterarguments to address
- Practical implications
- Article scope

**Fill out the questionnaire**, then tell AI "questionnaire complete". This eliminates back-and-forth and ensures all necessary context is captured upfront.

[See questionnaire guide in references/questionnaire.md]

## Workflow: 4-Stage Process

### Stage 1: Research (1-2 interactions)

**Objective**: Gather comprehensive information and validate topic viability

**Activities**:
1. **Technical deep dive**: Official docs, GitHub repos, API references, design patterns
2. **Industry context**: Current trends, market adoption, expert opinions, case studies
3. **Audience research**: Common pain points, knowledge gaps, practical scenarios
4. **Content gap analysis**: Review existing content, identify unique angle

**Deliverables**: 
- Create `specs/{spec-number}-{slug}/research.md`
- Document 5+ authoritative sources
- Identify unique value proposition
- Define target complexity level

**Quality Gates**:
- [ ] Minimum 5 authoritative technical sources
- [ ] Clear unique value proposition identified
- [ ] Target audience needs validated
- [ ] Content scope and complexity defined
- [ ] Practical applications documented

### Stage 2: Outline (1 interaction)

**Objective**: Create detailed structural blueprint for the article

**Activities**:
1. **Article architecture**: Introduction hook, main section topics, conclusion synthesis
2. **Content planning**: Learning objectives, key concepts, visual aids (Mermaid/tables)
3. **Audience journey**: Progressive complexity, engagement strategies, actionable takeaways

**Structure Template**:
```markdown
## Introduction (300-500 words)
- Hook: Compelling statistic or provocative question
- Context: Industry relevance and timing
- Value proposition: What readers will gain
- Roadmap: Preview of structure

## Section 1: [Concept Name] (600-1000 words)
- Focus: Primary concept
- Learning objective: What readers will understand
- Key points: 2-3 main concepts
- Visual element: Mermaid diagram or table
- Transition: Bridge to next section

[Repeat for 2-4 main sections]

## Conclusion (250-400 words)
- Synthesis: How concepts connect
- Key takeaways: 3-5 main points
- Future implications: Trends and evolution
- Next steps: Actionable guidance
```

**Deliverables**:
- Complete `specs/{spec-number}-{slug}/outline.md`
- Section-level objectives defined
- Visual elements planned
- Word count targets set

**Quality Gates**:
- [ ] Clear article structure with logical flow
- [ ] Appropriate section scope and word targets
- [ ] Unified narrative with smooth transitions
- [ ] Balanced technical depth and accessibility
- [ ] Actionable learning objectives defined

### Stage 3: Writing (3-6 interactions)

**Objective**: Create high-quality content section-by-section

**Approach**: **Write ONE section per interaction** directly to final files:
- English: `blog/YYYY-MM-DD-slug.mdx` (with `unlisted: true`)
- Track progress in spec folder

**Section Standards**:
- **Data-driven**: Back all claims with evidence, measurements, sources
- **Visual-first**: Mermaid diagrams for flows/architectures, tables for comparisons
- **Minimal code**: ≤10 lines only when syntax is the learning point
- **Precision**: Specific numbers, named technologies, time-stamped claims
- **Active voice**: Subject-verb-object structure dominates

**Section Completion Checklist**:
- [ ] Appropriate word count (600-1000 for main sections)
- [ ] Single clear focus maintained
- [ ] Visual element included (diagram or table)
- [ ] All claims sourced with inline links
- [ ] Core concepts bolded at first mention
- [ ] Smooth transition to next section

[See complete writing guidelines in blog-common/SKILL.md]

### Stage 4: Refine (1-2 interactions)

**Objective**: Review, improve, and finalize to publication quality

**Activities**:
1. **Content review**: Narrative flow, technical accuracy, style consistency
2. **Optimization**: Clarity enhancement, engagement improvement, accessibility
3. **Chinese translation**: Apply 形不同而意同 principle for natural idiomatic expression
4. **Final validation**: Formatting, links, builds, bilingual consistency

**Quality Assessment**:
- [ ] All sections meet quality standards
- [ ] Technical content verified against official sources
- [ ] Style consistency maintained (Economist principles)
- [ ] Chinese reads naturally (not literal translation)
- [ ] Metadata and tags optimized
- [ ] Build succeeds: `pnpm run build`
- [ ] Chinese formatting validated: `pnpm run validate:zh-bold-source`

**Publication Files**:
- English: `blog/YYYY-MM-DD-slug.mdx` (remove `unlisted: true`)
- Chinese: `i18n/zh/docusaurus-plugin-content-blog/YYYY-MM-DD-slug.mdx`

## Analytical-Specific Principles

### Data-Driven Argumentation
Every claim must be backed by evidence:
- Benchmark results with methodology
- Industry statistics with sources
- Code profiling and measurements
- Research citations

```markdown
❌ "This approach is much faster"
✅ "Vite builds our app in 12s vs Webpack's 47s—a 4x speedup measured across 50 CI runs"
```

### Precision Over Vagueness
- Specific numbers: "40% faster" not "significantly faster"
- Named technologies: "React 18.2" not "modern framework"
- Time-stamped claims: "As of December 2025"
- Primary source links at first mention

### Multiple Perspectives
- Acknowledge different viewpoints
- Discuss trade-offs explicitly
- Present balanced analysis
- Avoid oversimplification

### Concrete Metaphors
Ground abstract concepts in familiar experiences:

```markdown
"Think of caching as a librarian who keeps popular books on their desk instead 
of shelving them. When readers ask for The Great Gatsby for the tenth time, 
the librarian hands it over in seconds rather than walking to the stacks."
```

## Quality Gates (Analytical-Specific)

Beyond blog-common standards:

- [ ] Minimum 5 authoritative sources cited and linked
- [ ] All numerical claims have verifiable sources
- [ ] Multiple perspectives represented fairly
- [ ] Trade-offs explicitly discussed
- [ ] Unique angle clearly articulated
- [ ] Data visualizations (diagrams/tables) in each main section
- [ ] Methodology described for any measurements

## References

- [blog-common/SKILL.md](../../blog-common/SKILL.md) - Formatting, localization, quality, style
- [references/questionnaire.md](references/questionnaire.md) - Questionnaire guide
- [LeanSpec template](../../../.lean-spec/templates/articles/analytical.md) - Full spec template with questionnaire
