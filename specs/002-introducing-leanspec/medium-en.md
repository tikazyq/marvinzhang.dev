# Introducing LeanSpec: A Lightweight SDD Framework Built from First Principles

Tags: #open-source #sdd #spec-driven-development #ai #development-workflow

---

Earlier this year, I was amazed by agentic AI coding with Claude Sonnet 3.7. The term "vibe coding" hadn't been coined yet, but that's exactly what I was doing—letting AI generate code while I steered the conversation. It felt magical. Until it didn't.

After a few weeks, I noticed patterns: code redundancy creeping in, intentions drifting from my original vision, and increasing rework as the AI forgot context between sessions. The honeymoon was over. I needed structure, but not the heavyweight processes that would kill the speed I'd gained.

That search led me through several existing tools—Kiro, Spec Kit, OpenSpec—and eventually to building [LeanSpec](https://github.com/codervisor/lean-spec), a lightweight Spec-Driven Development framework that hits v0.2.7 today with 10 releases in under three weeks. This post shares why I built it, what makes it different, and how you can try it yourself.

## The Problem: Vibe Coding's Hidden Costs

**📝 The Vibe Coding Trap**

> AI coding assistants are incredibly productive—until they're not. Without structured context, AI generates plausible but inconsistent code, leading to technical debt that compounds session after session.

If you've used AI coding tools extensively, you've likely encountered these patterns:

| Symptom | Root Cause | Impact |
|---------|-----------|--------|
| **Code redundancy** | AI doesn't remember previous implementations | Duplicate logic scattered across files |
| **Intention drift** | Context lost between sessions | Features that don't quite match your vision |
| **Increased rework** | No persistent source of truth | Circular conversations explaining the same thing |
| **Inconsistent architecture** | No structural guidance | Components that don't fit together cleanly |

The industry's answer has been **Spec-Driven Development (SDD)**—writing specifications before code to give AI (and humans) persistent context. But when I explored the existing tools, I found a gap.

**ℹ️ Related Reading**

> New to SDD? Start with my foundational article [Spec-Driven Development: A Systematic Approach to Complex Features](https://marvinzhang.dev/blog/spec-driven-development) for methodology basics, or dive into the [2025 SDD Tools Landscape](https://marvinzhang.dev/blog/sdd-tools-practices) for a comprehensive comparison of industrial tools. Want to try the methodology without installing anything? The [Practice SDD Without the Toolkit](https://www.lean-spec.dev/docs/tutorials/sdd-without-toolkit) tutorial has you covered.

## Why I Built LeanSpec

My journey through the SDD landscape revealed three categories of tools, each with trade-offs that didn't fit my needs:

**Vendor lock-in**: Kiro (Amazon's SDD IDE) offers tight integration but requires abandoning my existing workflow. I like my tools—switching IDEs wasn't an option.

**Cognitive overhead**: Spec Kit provides comprehensive structure, but its elaborate format creates significant cognitive load. Even with AI-assisted writing, parsing and maintaining those specs demands mental bandwidth that feels excessive for solo and small-team work.

**Missing project management**: OpenSpec came closest to my ideal—lightweight and flexible—but lacked the project management capabilities I needed to track dozens of specs across multiple projects.

I wanted something different: **a methodology, not just a tool**. Something like Agile—a set of principles anyone can adopt, with lightweight tooling that gets out of the way.

So I built LeanSpec. And then I used LeanSpec to build LeanSpec.

## First Principles: The Foundation

LeanSpec isn't just tooling—it's built on five first principles that guide every design decision:

![](https://marvinzhang.dev/img/blog/2025-11-27-introducing-leanspec/medium/diagram-en-1.png)

**Context Economy**: Specs must fit in working memory—both human and AI. Target under 300 lines. If you can't read it in 10 minutes, it's too long.

**Signal-to-Noise Maximization**: Every line must inform decisions. No boilerplate, no filler, no ceremony for ceremony's sake.

**Intent Over Implementation**: Capture *why*, not just *how*. Implementation details change; intentions persist.

**Bridge the Gap**: Specs serve both humans and AI. If either can't understand it, the spec has failed.

**Progressive Disclosure**: Start simple, add structure only when pain is felt. No upfront complexity.

These principles aren't just documentation—LeanSpec's `validate` command enforces them automatically.

## Key Features

### Web UI for Visual Management

The feature I'm most excited about: `lean-spec ui` launches a full web interface for managing your specs visually.

```bash
# Launch the web UI
npx lean-spec ui
```

The UI provides Kanban-style board views, spec detail pages with Mermaid diagram rendering, and dependency visualization—all without leaving your browser. Perfect for planning sessions or reviewing project status.

![LeanSpec Kanban Board View](https://raw.githubusercontent.com/codervisor/lean-spec-docs/main/static/img/ui/ui-board-view.png)

![LeanSpec Spec Detail View](https://raw.githubusercontent.com/codervisor/lean-spec-docs/main/static/img/ui/ui-spec-detail.png)

### First Principles Validation

LeanSpec doesn't just store specs—it validates them against first principles:

```bash
# Check your specs against first principles
lean-spec validate

# Output:
# specs/045-user-auth/README.md
#   ⚠️  warning  Spec exceeds 300 lines (342)  context-economy
#   ⚠️  warning  Missing overview section      structure
# 
# ✖ 2 warnings in 1 spec
```

This keeps specs lean and meaningful, preventing the specification bloat that plagues heavyweight SDD tools.

### Smart Search & Project Management

Finding relevant specs shouldn't require remembering exact names:

```bash
# Semantic search across all specs
lean-spec search "authentication flow"

# Advanced queries
lean-spec search "status:in-progress tag:api"
lean-spec search "created:>2025-11-01"
```

The Kanban board gives you instant project visibility:

```bash
lean-spec board

# 📋 LeanSpec Board
# ─────────────────────────────────────
# 📅 Planned (12)     🚧 In Progress (3)     ✅ Complete (47)
# ─────────────────────────────────────
```

### MCP Server for AI Integration

LeanSpec includes an MCP (Model Context Protocol) server, enabling AI assistants to directly interact with your specs:

```json
{
  "mcpServers": {
    "leanspec": {
      "command": "npx",
      "args": ["@leanspec/mcp"]
    }
  }
}
```

Works with Claude Code, Cursor, GitHub Copilot, and other MCP-compatible tools. AI agents can search specs, read context, and update status—all programmatically.

### Example Projects for Quick Start

New to SDD? Start with a working example:

```bash
# Scaffold a complete tutorial project
npx lean-spec init --example dark-theme
```

Three examples available: `dark-theme`, `dashboard-widgets`, and `api-refactor`—each demonstrating different SDD patterns.

## The Journey: Building LeanSpec with LeanSpec

The most meta aspect of this project: after the initial release, **LeanSpec has been developed entirely using LeanSpec**.

| Milestone | Date | Notes |
|-----------|------|-------|
| First line of code | Oct 23, 2025 | Started with basic spec CRUD |
| v0.1.0 (First release) | Nov 2, 2025 | 10 days from scratch to release |
| v0.2.0 (Production-ready) | Nov 10, 2025 | First principles validation, comprehensive CLI |
| v0.2.7 (Current) | Nov 26, 2025 | 10 releases in 24 days |

Over 120 specs have been created within LeanSpec itself—covering features, architecture decisions, reflections, and even marketing strategy. The feedback loop is tight: identify friction → write spec → implement → validate with real use.

I've also applied LeanSpec to other projects:
- [Crawlab](https://github.com/crawlab-team/crawlab) (12k+ stars) — web crawler management platform
- This blog (marvinzhang.dev)
- Upcoming projects under the [codervisor](https://github.com/codervisor) org

The pattern holds across all of them: specs provide context that survives between sessions, AI stays aligned with my intentions, and I spend less time re-explaining.

## What Makes LeanSpec Different

If you've read my [SDD Tools analysis](https://marvinzhang.dev/blog/sdd-tools-practices), you know I evaluated six major tools in this space. Here's where LeanSpec fits:

| Aspect | Heavyweight Tools | LeanSpec |
|--------|------------------|----------|
| **Learning curve** | Days to weeks | Minutes |
| **Spec overhead** | Extensive upfront work | Write as you go |
| **Token cost** | Often >2,000 per spec | &lt;300 lines target |
| **Flexibility** | Rigid structure | Adapt to your workflow |
| **Vendor lock-in** | Often required | Works anywhere |
| **Philosophy** | Tool-first | Methodology-first |

LeanSpec is "lean" in multiple senses:
- **Methodology**: Like Agile, it's principles you can adopt regardless of tooling
- **Cognitive load**: Low overhead, quick to learn
- **Token economy**: Specs stay small, fitting in AI context windows
- **Flexibility**: Adapt to your workflow, not the other way around

## Getting Started

Try LeanSpec in under 5 minutes:

```bash
# Install globally
npm install -g lean-spec

# Initialize in your project
lean-spec init

# Create your first spec
lean-spec create user-authentication

# Launch the web UI
lean-spec ui
```

Or try an example project:

```bash
npx lean-spec init --example dark-theme
```

**Already using Spec Kit or OpenSpec?** Check out the [migration guide](https://www.lean-spec.dev/docs/guide/migration)—the transition is straightforward.

## What's Next

LeanSpec is actively evolving. Current development focuses on:
- VS Code extension for inline spec management ([Spec 17](https://web.lean-spec.dev/specs/17))
- AI chatbot UI for interactive spec assistance ([Spec 94](https://web.lean-spec.dev/specs/94))
- Comprehensive internationalization support ([Spec 91](https://web.lean-spec.dev/specs/91))
- GitHub multi-project ingration ([Spec 98](https://web.lean-spec.dev/specs/98))

I built LeanSpec to solve my own problems—code quality degradation from vibe coding, context loss between AI sessions, the cognitive overhead of heavyweight SDD tools. If you face similar challenges, I hope it helps you too.

---

**Links:**
- 📦 [GitHub](https://github.com/codervisor/lean-spec)
- 📚 [Documentation](https://www.lean-spec.dev/)
- 📊 [npm package](https://www.npmjs.com/package/lean-spec)

Questions, feedback, or feature requests? Open an issue or start a [discussion](https://github.com/codervisor/lean-spec/discussions). I read everything.

---

*📝 Originally published on my personal blog [marvinzhang.dev](https://marvinzhang.dev/blog/introducing-leanspec)*

*🔗 Original article: https://marvinzhang.dev/blog/introducing-leanspec*