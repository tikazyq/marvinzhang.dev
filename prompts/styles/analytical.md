# Analytical Writing Style

Deep-dive technical analysis with data-driven argumentation. Inspired by The Economist's approach: clarity, precision, and wit.

## When to Use

- Technical deep-dives and comprehensive analysis
- Industry landscape overviews
- Comparative evaluations (tools, frameworks, approaches)
- Theoretical concepts with practical implications
- Research-backed technical arguments

**Example topics**: "Rice's Theorem and Software Testing", "SDD Ecosystem in 2025", "LLM Architecture Evolution"

## Workflow: Full 4-Stage Process

```
Research → Outline → Writing → Refine
```

1. **Research** (1-2 sessions): Gather 5+ authoritative sources, validate topic, identify unique angle
2. **Outline** (1 session): Detailed structure with visual planning, section targets
3. **Writing** (3-6 sessions): Section-by-section with data validation
4. **Refine** (1-2 sessions): Fact-checking, flow optimization, bilingual polish

## Core Characteristics

### Data-Driven Argumentation
Every claim backed by evidence:
- Benchmark results with methodology
- Industry statistics with sources
- Code profiling and measurements
- Research citations

```markdown
❌ "This approach is much faster"
✅ "Vite builds our app in 12 seconds vs Webpack's 47—a 4x speedup measured across 50 CI runs"
```

### Precision in Language
- Specific numbers over vague qualifiers
- Named technologies with versions
- Time-stamped claims
- Primary source links

```markdown
❌ "Modern bundlers are significantly faster"
✅ "As of Vite 5.0 (December 2023), cold starts average 300ms compared to Webpack 5's 1.2s"
```

### Active Voice Dominance
Subject-verb-object structure drives clarity:

```markdown
❌ "The database query is executed by the ORM, and results are transformed..."
✅ "The ORM executes the query, transforms results into objects, and returns them..."
```

### Concrete Metaphors
Ground abstract concepts in familiar experiences:

```markdown
"Think of caching as a librarian who keeps popular books on their desk instead of 
shelving them. When readers ask for *The Great Gatsby* for the tenth time today, 
the librarian hands it over in seconds rather than walking to the stacks."
```

## Structure Template

### Introduction (300-500 words)
- **Hook**: Statistics, provocative question, or industry observation
- **Context**: Why this matters now, industry backdrop
- **Value proposition**: What readers gain
- **Roadmap**: Preview of sections

```markdown
Your app feels sluggish. Database queries take 200ms each. Five queries per 
page load means users wait a full second just for data. This is the caching 
problem, and it's costing you users.

This article unpacks [topic] through [approach]. You'll learn [outcome 1], 
understand [outcome 2], and gain [outcome 3].
```

### Main Sections (600-1000 words each)
Each section:
- Single concept focus
- Progressive complexity (basic → advanced)
- Visual element (diagram or table)
- Data/evidence for claims
- Transition to next section

### Conclusion (250-400 words)
- Key points synthesis (not repetition)
- Future implications and trends
- Actionable next steps
- Encourage continued exploration

## Visual Strategy

### Diagrams for Architecture/Flow
Use Mermaid for:
- System architectures
- Process flows
- State machines
- Comparison landscapes

### Tables for Comparisons
Use tables for:
- Feature matrices
- Pros/cons analysis
- Tool comparisons
- Decision frameworks

### Minimal Code
- Only when syntax itself is the lesson
- ≤10 lines per block
- Configuration snippets preferred over implementation

## Tone Guidelines

### The Economist Standard
- **Authoritative but humble**: Share expertise without condescension
- **Witty but not forced**: One good insight beats three mediocre jokes
- **Skeptical but fair**: Question claims, acknowledge trade-offs
- **Dense but clear**: Pack meaning into every sentence

### Signature Phrases
- "The data tells a different story..."
- "Three factors drive this behavior..."
- "The trade-off worth noting..."
- "What the benchmarks don't show..."

### Avoid
- Hype language ("revolutionary", "game-changing")
- Unsubstantiated superlatives
- Marketing-speak
- Oversimplification of complex topics

## Quality Gates (Analytical-Specific)

- [ ] Minimum 5 authoritative sources cited
- [ ] All numerical claims have sources
- [ ] Multiple perspectives represented
- [ ] Trade-offs explicitly discussed
- [ ] Unique angle clearly articulated
- [ ] Data visualizations where helpful
- [ ] Methodology described for measurements

## Example Opening

### Before (Generic)
> "Caching is an important technique in modern web development. In this article, 
> we'll explore different caching strategies and their benefits."

### After (Analytical)
> "Your API responds in 847ms. Users leave after 3 seconds. You need caching—but 
> Redis, Memcached, and in-memory stores each optimize for different trade-offs. 
> We benchmarked all three against 100,000 production requests. Here's what we found."
