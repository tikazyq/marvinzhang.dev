# Experiential Writing Style

Personal insights, lessons learned, and reflective pieces that share real experiences.

## When to Use

- Lessons learned from projects/failures
- Career reflections and insights
- Personal opinions on industry trends
- Project retrospectives
- "What I wish I knew" pieces

**Example topics**: "5 Years of Open Source: What I Learned", "The Rewrite That Almost Killed Us", "Why I Stopped Chasing Framework Trends"

## Workflow: 3-Stage Process

```
Outline → Writing → Refine
```

1. **Outline** (1 session): Story arc, key lessons, emotional beats
2. **Writing** (2-3 sessions): Narrative flow with specific examples
3. **Refine** (1 session): Voice consistency, impact optimization

*No deep research—your experience is the source material.*

## Core Characteristics

### Specific Stories, Not Generalities
Ground lessons in concrete experiences:

```markdown
❌ Generic: "Communication is important for remote teams."

✅ Specific: "At 3 AM on a Tuesday, I pushed a fix that broke production in three 
regions. My teammate in Berlin saw the alerts but assumed I was handling it. I 
assumed he'd caught it. Neither of us reached out. That silent three hours cost 
us $40,000 in SLA penalties and taught me that remote work requires deliberate 
over-communication."
```

### Honest About Failures
Credibility comes from vulnerability:

```markdown
"I was convinced microservices would solve our scaling problems. I championed 
the migration for months. I was wrong. Here's what actually happened, and what 
I'd do differently today."
```

### Lessons Clearly Articulated
Don't leave readers guessing the takeaway:

```markdown
"The lesson wasn't about Kubernetes or deployment strategies. It was simpler: 
**the best architecture is the one your team can actually operate**. We had 
built a system none of us could debug at 2 AM."
```

### Personal Voice
More "I" and "we" than analytical pieces:

```markdown
"I've deployed to production over 3,000 times. Some of those were beautiful. 
Most were routine. A handful were disasters. The disasters taught me everything 
worth knowing."
```

## Structure Template

### Introduction (300-400 words)
- **Hook**: Vivid scene or surprising statement
- **Context**: Brief background
- **Promise**: What readers will gain from your experience
- **Tone setting**: Establish the reflective voice

```markdown
The Slack notification came at 2:47 AM: "Production is down. All regions."

I'd been an engineer for eight years. I'd seen outages before. But this one was 
different—I'd caused it. And in the frantic hours that followed, I learned more 
about incident response than in my entire career combined.

This is what those hours taught me, and why I now approach on-call differently.
```

### Story Sections (500-800 words each)
Each section:
- Specific story or example
- What happened (narrative)
- What I thought then vs. now
- The lesson extracted
- How it changed my behavior

### Conclusion (250-350 words)
- Synthesis of lessons
- How this shapes your current practice
- Invitation for readers to reflect on their experiences

## Narrative Techniques

### Scene Setting
Put readers in the moment:

```markdown
"The meeting room was silent. Six engineers, two product managers, and our VP 
of Engineering stared at the whiteboard. We'd spent four months on this feature. 
It was supposed to ship last week. Now we were debating whether to scrap it entirely."
```

### Dialogue (When Memorable)
Use sparingly for impact:

```markdown
My tech lead pulled me aside after the sprint review.

"That feature you built," she said. "It's good. But it solves a problem nobody 
actually has."

I started to defend it, then stopped. She was right.
```

### Emotional Honesty
Name what you felt:

```markdown
"I was embarrassed. Not because the code was bad—it wasn't. But because I'd 
spent three weeks on something that didn't matter. Pride had kept me from asking 
earlier whether this was even worth building."
```

### Time Jumps
Show evolution over time:

```markdown
**2019**: I believed clean code was the ultimate goal.  
**2021**: I learned that shipped code beats perfect code.  
**2024**: I now believe the goal is code that's easy to delete.
```

## Visual Strategy

### Minimal Diagrams
- Use only when illustrating a specific technical point from the story
- Timeline diagrams for career/project evolution
- Before/after comparisons

### Pull Quotes for Key Lessons
Highlight the takeaways:

```markdown
> **The biggest lie in software: "We'll refactor it later."** After five years, 
> I've learned that later never comes unless you schedule it now.
```

### Lists for Distilled Lessons
When you have multiple takeaways:

```markdown
## What I'd Tell My Past Self

1. **Ask "why" one more time.** Most wasted effort comes from solving the wrong problem.
2. **Write the doc before the code.** If you can't explain it simply, you don't understand it yet.
3. **Ship something small first.** Your assumptions are probably wrong. Find out early.
```

## Tone Guidelines

### Reflective, Not Preachy
Share your journey, don't lecture:

```markdown
❌ Preachy: "You should always write tests first. TDD is the only professional approach."

✅ Reflective: "I resisted TDD for years. Then I joined a team that practiced it 
religiously. Here's what changed my mind—and where I still think it's overkill."
```

### Confident Uncertainty
Own your opinions while acknowledging limits:

```markdown
"This worked for me. It might not work for you. But after fifteen rewrites, I'm 
pretty confident about this one thing: complexity isn't free, and we vastly 
underestimate its cost."
```

### Conversational Warmth
Write like you're talking to a colleague:

```markdown
"Look, I get it. You're under pressure. The deadline is real. Cutting corners 
feels like the only option. I've been there—more times than I'd like to admit. 
But here's what I've learned about technical debt..."
```

## Quality Gates (Experiential-Specific)

- [ ] Specific stories, not vague generalizations
- [ ] Honest about failures and mistakes
- [ ] Lessons clearly articulated
- [ ] Personal voice consistent throughout
- [ ] Not preachy or lecturing
- [ ] Actionable takeaways for readers
- [ ] Emotional beats feel authentic

## Example Opening

### Before (Generic)
> "In this post, I'll share some lessons I've learned about software development 
> over my career. These lessons have helped me become a better engineer."

### After (Experiential)
> "I deleted 50,000 lines of code last month. Code I'd written over two years. 
> Code I was proud of. Code that solved problems nobody actually had.
>
> It felt like failure. It was, in a way. But standing in the wreckage of my 
> over-engineered system, I finally understood something about software that 
> no book had taught me: the best code is often no code at all.
>
> Here's how I got here, and why I'm a better engineer for it."
