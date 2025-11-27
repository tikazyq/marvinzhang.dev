# Quality Standards

Universal quality gates for all articles on marvinzhang.dev.

## Core Principles

1. **Clarity over cleverness** — If readers must work hard to understand, you haven't worked hard enough at writing
2. **Precision over vagueness** — Use specific numbers, names, and timeframes
3. **Visual over verbal** — Diagrams and tables communicate faster than prose
4. **Practical over theoretical** — Connect concepts to real-world applications

## Content Quality Gates

### All Articles Must Have

- [ ] Clear main point in first paragraph
- [ ] Each paragraph focuses on one idea
- [ ] Technical terms defined at first use
- [ ] No sentence requires re-reading to understand
- [ ] Appropriate word count for section type
- [ ] Smooth transitions between sections

### Technical Content Requirements

- [ ] Accurate technical information (verified against official docs)
- [ ] Specific versions and timeframes mentioned
- [ ] Primary sources linked for claims
- [ ] Limitations and trade-offs acknowledged
- [ ] Real-world applicability demonstrated

### Visual Content Requirements

- [ ] Mermaid diagrams for processes/architectures
- [ ] Tables for comparisons (no prose lists)
- [ ] Code blocks limited to ≤10 lines
- [ ] All diagrams theme-aware (explicit colors)

## Writing Quality Checklist

### Clarity
- [ ] Active voice dominates (80%+)
- [ ] Strong verbs carry meaning
- [ ] No unnecessary jargon
- [ ] Complex ideas broken into digestible pieces

### Precision
- [ ] Specific numbers where possible ("40% faster" not "significantly faster")
- [ ] Named technologies and versions
- [ ] Time-stamped claims (dates, versions)
- [ ] Weasel words eliminated ("very", "quite", "rather")

### Engagement
- [ ] Compelling hook in introduction
- [ ] Varied sentence rhythm
- [ ] Reader addressed directly ("you" not "one")
- [ ] Rhetorical questions used appropriately

## Pre-Publish Checklist

### Technical Validation
- [ ] All code examples tested/verified
- [ ] External links verified working
- [ ] Version numbers current
- [ ] No outdated information

### Formatting Validation
- [ ] Frontmatter complete and correct
- [ ] `{/* truncate */}` marker after intro
- [ ] All Mermaid diagrams render correctly
- [ ] Chinese bold formatting validated (`pnpm run validate:zh-bold-source`)

### Bilingual Validation
- [ ] Both EN and ZH versions exist
- [ ] Slugs match exactly
- [ ] Frontmatter aligned (tags, date)
- [ ] Core concepts consistent across languages
- [ ] Chinese version reads naturally (not literal translation)

## Style-Specific Gates

### Analytical Articles
- [ ] Minimum 5 authoritative sources
- [ ] Data-driven arguments
- [ ] Multiple perspectives considered
- [ ] Clear unique angle identified

### Tutorial Articles
- [ ] Steps are testable/reproducible
- [ ] Prerequisites clearly stated
- [ ] Common errors addressed
- [ ] Working end result demonstrated

### Experiential Articles
- [ ] Specific stories, not vague generalities
- [ ] Lessons clearly articulated
- [ ] Honest about failures/mistakes
- [ ] Actionable takeaways

### Announcement Articles
- [ ] Key features highlighted
- [ ] Clear call-to-action
- [ ] Links to resources (docs, demo, repo)
- [ ] Concise and scannable

## Marvin's Voice Guidelines

### Tone
- Professional yet accessible
- Authoritative but humble
- Conversational, not academic
- Encouraging continuous learning

### Signature Patterns
- Concrete metaphors for complex concepts
- Connection to reader's likely experiences
- Historical context and industry trends
- Growth mindset emphasis

### Avoid
- Condescension toward beginners
- Hype or marketing language
- Unnecessary complexity
- Unsubstantiated claims

## Quality Scoring (Self-Assessment)

Rate each dimension 1-10 before publishing:

| Dimension | Score | Notes |
|-----------|-------|-------|
| Clarity | /10 | |
| Technical Accuracy | /10 | |
| Practical Value | /10 | |
| Engagement | /10 | |
| Visual Quality | /10 | |
| **Overall** | /10 | |

**Minimum threshold**: Overall ≥7, no dimension below 5
