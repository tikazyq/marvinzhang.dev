# Research: Managing Managers (Chief PM agent + USL)

Sequel to `blog/2026-07-13-multi-agent-teams-and-the-measurable-coordination-tax.mdx` (USL, λ/σ/κ, N* = √((1−σ)/κ), star topology trades κ for σ, "pressing κ down is the scarce skill").

## Author's thesis (from chat, 2026-11-24)
- Case study is the author's own setup: Manager sessions per project, plus a new director-level "Chief PM" (CPM) that manages the peer managers.
- Claim: frontier models (Opus 5.5) are smart enough to manage several direct reports, including managers.
- Open question: where is the span-of-control limit against κ (alignment cost)? No limit observed yet → frame as open question + a way to measure it.
- Claim: tooling is what lets a manager agent get better at managing.

## Facts from the setup (snapshot 2026-11-24 ~03:10 UTC)
- 9 top-level manager sessions on the main box: Blog PM, AWB PM, Semon PM, Ostrom PM, Tolmap PM, Eval PM, Infra Manager, Duhem PM, Kirzner PM. All claude-opus-5-5.
- Chief PM runs on a separate machine (t3-sg), created 2026-11-23 09:20 UTC, ~716 items so far.
- Managers delegate to Workers (Codex tiers: luna = fast, sol = standard; Claude backups). ~300 unsettled threads total incl. subagents.
- Thread sizes: Semon PM ~4,956 items, Ostrom ~4,067, AWB ~3,629, Tolmap ~3,472, Duhem ~3,307.
- 2026-11-23: owner asked to stop being blocked on routine decisions; routing rule written: routine decisions (site changes, merges after preview passes, tech choices) go to CPM; publishing, spend, creds, irreversible deletes still go to owner. Same day a PR merged before preview finished → "wait for preview" rule added.

## Tooling the author credits
1. T3 cross-session tools (thread list/read/send, environment links): managers see and message peers without the owner relaying.
2. Routing rules + memory: written decision rights; cut escalations to owner.
3. Worker tier ladder (AWB): standard tiers + briefs make delegation cheap and predictable.

## USL mapping (to develop)
- Before CPM: owner = hub of a star with 9 spokes → owner is the σ (queue). Every routine decision waits on one human.
- CPM: inserts a layer. Moves the queue from owner to an agent that is always on. κ between peers stays low because managers mostly don't talk to each other (independent projects = good decomposition).
- Tooling maps: thread tools lower κ (shared state, read instead of ask); routing rules lower σ on owner (fewer items reach the queue); tier ladder lowers per-delegation κ (standard brief/contract).
- Limit question: a manager agent's span is bounded by its context window and attention per report, i.e. the CPM's own σ. Measurable signals: decision latency at CPM, escalations reaching owner, rework from wrong routing, CPM context compactions.

## To verify / gather
- [ ] Count of decisions CPM handled since 2026-11-23 (read CPM thread).
- [ ] Any example of a peer-to-peer message between managers.
- [ ] Classical span-of-control numbers (Graicunas 1933 relationships formula; typical 5–8 direct reports) — cite.

## Internal link candidates (hook requires ≥3)
- /blog/multi-agent-teams-and-the-measurable-coordination-tax (USL, the prequel)
- /blog/stop-babysitting-your-agent (2026-08-10)
- /blog/project-management (2021; PM collapses n² channels to n)
- VSM cybernetics post (2026-05-12; System 3/5 = management layers)
