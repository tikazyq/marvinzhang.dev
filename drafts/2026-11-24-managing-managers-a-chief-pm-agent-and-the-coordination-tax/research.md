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

## Human span of control: is it 7–12? (checked 2026-11-24)
Verdict: no single consensus number. Classic theory says 5–6 for managers of interlocking work; observed median is 5–6; observed average ~12; consultancies give a range by role.
- Graicunas (1933), "Relationship in Organization": relationships = n(2^(n−1) + n − 1); 5 reports → 100, 6 → 222. Grows exponentially (unlike Brooks's quadratic). https://en.wikipedia.org/wiki/Span_of_control , https://www.nickols.us/graicunas.htm
- Urwick: no superior should directly supervise more than 5, at most 6, subordinates whose work interlocks (restated HBR 1956). Applies most to managing managers, i.e. the CPM case.
- Gallup, Jim Harter, 2026-01-13: average direct reports 10.9 (2024) → 12.1 (2025), ~+50% since 2013; median 5–6; 37% of managers <5 reports, 13% ≥25. "Manager talent trumps span of control." Remote/hybrid managers lose engagement as span grows; on-site barely. https://www.gallup.com/workplace/700718/span-control-optimal-team-size-managers.aspx
- McKinsey, "How to identify the right spans of control": archetypes player/coach 3–5, coach 6–7, supervisor 8–10, facilitator 11–15, coordinator 15+. Right span depends on the work. (Ranges from search summary; page fetch timed out. Re-verify before citing.) https://www.mckinsey.com/capabilities/people-and-organization/our-insights/how-to-identify-the-right-spans-of-control-for-your-organization
- Gallup healthcare: engagement drops steadily past ~15 reports. https://www.gallup.com/workplace/236024/reduce-spans-control-nursing.aspx
Implication for post: CPM with 9 peer managers is already above Urwick's 5–6 for interlocking work and in McKinsey's "supervisor" band. It works because the projects barely interlock (low κ), which is exactly Urwick's qualifier.
