# Article Questionnaire: Introducing LeanSpec

> **Instructions**: Fill out the sections below. Be as brief or detailed as you like.
> When done, tell the AI "questionnaire complete" to continue writing.
> 
> **Spec**: 002-leanspec-announcement
> **Style**: Announcement
> **Target**: Bilingual (EN + ZH)
> **Location**: `specs/002-leanspec-announcement/` (all writing artifacts in spec folder)

---

## The News

**What are you announcing?**
<!-- One sentence: what exists now that didn't before -->
(SDD) Spec-Driven Development Framework: [LeanSpec](https://github.com/codervisor/lean-spec)


**Version/release info?**
<!-- e.g., "v0.2.7, 10 releases since Nov 2" or "production-ready as of Nov 10" -->
v0.2.7


---

## Why It Matters

**What problem does this solve?**
<!-- The pain point this addresses. Examples:
- "Existing SDD tools are too heavyweight for solo devs"
- "Vibe coding leads to context loss and technical debt"
- "AI assistants need structured context to perform well" -->


**Who is the target audience?**
<!-- Be specific. Examples:
- "Solo developers using AI coding assistants (Copilot, Cursor, Claude)"
- "Small teams adopting SDD for the first time"
- "Developers who want AI productivity without vibe coding chaos" -->


**What's the unique angle vs. alternatives?**
<!-- Why LeanSpec over Spec Kit, Kiro, OpenSpec, etc.? Examples:
- "Lightweight: <2,000 tokens per spec vs enterprise bloat"
- "AI-native: MCP server works with any AI tool"
- "First-principles: built on unchangeable constraints (physics, biology, economics)" -->
"Lean" is the most important keyword:
- Not just a rigid tool, but a practical methodology like agile, anyone can easily learn and adopt
- LeanSpec toolkit is lightweight but powerful and comprehensive, get started very quick
- Cost reduction, much less cognitive load compared with Spec Kit, etc.
- Very flexible


---

## Key Features (pick 3-5 to highlight)

<!-- Rate importance 1-5, I'll focus on the highest-rated ones -->

| Feature | Importance | One-line benefit |
|---------|------------|------------------|
| Kanban board (`lean-spec board`) | 4 | |
| Smart search (`lean-spec search`) | 4 | |
| Web UI (`lean-spec ui`) | 5 | |
| MCP server integration | 4 | |
| First principles validation | 5 | |
| Dependency tracking | 3 | |
| Example projects (`--example`) | 3 | |
| Token counting (`lean-spec tokens`) | 3 | |
| Other: _______________ | | |

---

## Personal Story

**Origin: Why did you build this?**
<!-- What was the trigger? A specific pain point? Frustration with existing tools? -->
Early this year (2025), I was amazed by the agentic AI coding (which became a popular term "Vibe Coding" later on) with Claude Sonnet 3.7. But later I encountered code quality issues with vibe coding, including code redundancy, intention drift, increased rework. So I discovered a term then called "Document-Base Development", which is actually "Spec-Driven Development", or SDD, as a more popular term in AI coding. I practiced hand-crafted SDD using a very basic `spec.js` developed by AI, and applied an SOP to manage specs in my real projects, and it worked quite well!

Later, in recent a couple of months, I explored a couple of well-known SDD projects including Kiro by Amazon, Spec Kit by GitHub, OpenSpec. I found none of them are suitable for me. Kiro is vendor locked-in; Spec Kit is heavy which creates a large amount of cognitive burdurn and takes a long time to complete a coding task; OpenSpec is closest to my ideal tool but it lacks the ability to do proper project management. So I leveraged the power of AI tools with VS Code GitHub Copilot to create LeanSpec from scratch. Since then, after the first release with fundamental features (create/update/manage specs), LeanSpec has been under iteration using LeanSpec itself with a very high development speed! It took 10 days for the first release from the first line of code. The recent development went quite well as well and the First Principles discovered optimized LeanSpec with extreme agility and simplicity, but with high dev velocity. There are quite a lot of features delivered since then.

**Journey: Timeline and milestones**
<!-- e.g., "Started Oct 15, first release Nov 2, 10 releases in 3 weeks, 130+ specs written" -->
Please check GitHub release history (https://github.com/codervisor/lean-spec)


**Dogfooding: Are you using it yourself?**
<!-- Using LeanSpec to build LeanSpec? Stats, learnings, meta-observations? -->
Yes, I used it even in my other projects, including [Crawlab](https://github.com/crawlab-team/crawlab) (12k+ stars), [marvinzhang.dev](https://github.com/tikazyq/marvinzhang.dev) (my own tech blog site), upcoming projects agent-relay and devlog under codervisor org. I find it very suitable to my own projects.

In LeanSpec, over 120 specs created with feature implementation, architecture design, reflection, marketing strategy, etc. All went very well.

**Community: Any early adopters or feedback?**
<!-- GitHub stars, discussions, issues, contributions? -->
Right now fewer than 100 github stars but mostly because of no heavy promotion to general audience. Marketing channels are mainly from my existing WeChat community and my friends. Early adopters provided a lot of feedback, which were fed into LeanSpec for itself to evolve into better optimized product. Some of the requirements were completed even in a couple of hours with LeanSpec.


---

## Technical Highlights (optional)

**Architecture decisions worth mentioning?**
<!-- e.g., "TypeScript monorepo with turborepo", "MCP protocol for AI integration" -->


**First principles you want to explain?**
<!-- Context Economy, Signal-to-Noise, Intent Over Implementation, Bridge the Gap, Progressive Disclosure -->


---

## Call to Action

**Primary CTA: What should readers do first?**
<!-- e.g., "Try the tutorial: `npx lean-spec init --example dark-theme`" -->
Get started with tutorials or try it out with your own existing projects. If you're now using Spec Kit or OpenSpec, you can migrate very easily with our [migration guide](https://www.lean-spec.dev/docs/guide/migration).


**Links to include:**
- GitHub: https://github.com/codervisor/lean-spec
- Docs: https://www.lean-spec.dev/
- npm: https://www.npmjs.com/package/lean-spec
- Other: 


---

## Tone & Positioning

**Check one primary tone:**
- [x] **Humble/practical**: "I built this to solve my own problem, maybe it helps you too"
- [ ] **Industry positioning**: "Here's what's missing in the SDD landscape"
- [ ] **Technical deep-dive**: Focus on first principles and architecture
- [ ] **Other**: _______________

**Relationship to your SDD Tools article?**
<!-- Your existing article covers 6 SDD tools. How does LeanSpec fit in?
- "LeanSpec is my answer to the lightweight gap I identified"
- "Complement to the landscape overview"
- "Don't mention the other article" -->
LeanSpec is my answer to the lightweight gap I identified


---

## Anything else?

<!-- Other points, quotes, anecdotes, or specific things you want included -->


---

> **When you're done**: Save this file and tell the AI "questionnaire complete" or "let's continue".
