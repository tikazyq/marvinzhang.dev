# Outline — VSM × Cybernetics: How Systems Stay Viable

> Aligned with the author; do not re-derive. Per-section word counts below are EN-only. Overall ZH length target (3,000–3,400 characters) and EN length target (3,700–4,100 words) are pinned in `research.md`.

---

## Section map (at a glance)

| § | Title (working) | EN words | Visual | Core load |
| - | --------------- | -------- | ------ | --------- |
| 1 | Hook — the scenario + the question no architecture language answers | 500–700 | — | Frame the missing question; seed the through-line |
| 2 | A brief history of cybernetics | 600–800 | Table (Wiener → Ashby → Conant-Ashby → Beer) | Theoretical lineage |
| 3 | The five VSM levels + algedonic channel | 1100–1300 | **Figure 1 placeholder** (VSM diagram) | Core mechanism — every level revisits the scenario |
| 4 | Three counterintuitive points | 600–800 | — (numbered list + prose) | Diagnostic heuristics |
| 5 | Why a projection isn't a model — Conant-Ashby and Goodhart | 800–1000 | Table (structural vs projective) | Theoretical climax |
| 6 | A work in progress (footnote) | 100–200 | — | Soft handoff |
| — | Closing line | 1 sentence | — | Pick one of four at writing time |

**Total EN target**: ~3,700–4,100 words.

**Accessibility principle**: one sustained concrete scenario — an agent factory that hits every metric but misses a competitor's feature six months running, and no one on the team can name which part of the system was supposed to catch it — carries the article. Every abstract term in §3 returns to this scenario for grounding. Recognisable to (a) working engineers without cybernetics background and (b) general technical readers (PMs, tech leads).

---

## § 1. Hook — the scenario + the unanswered question (500–700 words)

**Beats**

- **Open with the scenario.** A team runs an agent factory. PRs ship faster than humans can review. Test coverage, p99 latency, merge rate — all green. Throughput is up 3×. Then a competitor ships a feature their users had been asking for. The team realises no one in their pipeline was looking outside it.
- **Pose the question.** Which mainstream architecture language names the part of the system that was supposed to catch this? Layered architecture talks about call directions. Microservices talks about coupling. Hexagonal and DDD talk about the inside vs the outside of a domain. None of them has a word for *the part that watches the world for things the team has not yet noticed.*
- **Name the blind spot.** Every dominant architecture vocabulary answers *how is the code partitioned?* None answers *how does the system, as an organisation, stay alive?*
- **Cybernetics answered that question fifty years ago, and the answer was forgotten.** A short, restrained line — no nostalgia.
- **Why now.** AI agent systems make the question literally real for the first time. Components themselves carry purpose; the system has interior states that resemble *intent* rather than just *execution*. The old architecture languages, designed for systems made of dumb parts, run out of vocabulary at exactly this point.
- **Roadmap.** Cybernetics → VSM's five levels (and the audit channel and the alarm path) → three counterintuitive diagnostics → what Ashby's law and Conant-Ashby together imply for AI governance.

**Tone**: dry, direct, no hype words. The scenario opens cold — no "imagine you are…" — just the situation, then the question.

**Truncate marker** goes at the end of this section.

---

## § 2. A brief history of cybernetics (600–800 words)

**Beats**

- **Wiener 1948** (*Cybernetics*) — lifts feedback from engineering into a cross-disciplinary paradigm: animal, machine, society are isomorphic under control-and-communication theory.
- **Ashby 1956** (*An Introduction to Cybernetics*) — the **Law of Requisite Variety**: a controller's variety must be ≥ the variety of what it controls. *Only variety can destroy variety.* The hard constraint behind everything that follows.
- **Conant & Ashby 1970** — *Every Good Regulator of a System Must Be a Model of That System.* The structural companion to Requisite Variety. Ashby answers *how big*; Conant-Ashby answers *what shape*. Together they form a complete constraint on any controller.
- **Beer 1959–1985** — brings cybernetics from theory into organisations. Management cybernetics culminates in VSM (*Brain of the Firm* 1972, *Diagnosing the System for Organizations* 1985). VSM is what Conant-Ashby looks like at organisational scale.

**Closing line for the section**
> Cybernetics does not ask *what is the system made of*. It asks *how does the system preserve its identity under disturbance*.

**Visual**: small table mapping year → author → contribution → one-line significance.

---

## § 3. The five VSM levels + algedonic channel (1100–1300 words — core section)

> Every level returns to the §1 scenario. Do **not** name Onsager.

**Figure 1 placeholder** sits at the top of this section, before the prose walk-through.

```mdx
{/* TODO: figure — see description below */}
:::note Figure 1: The Viable System Model with algedonic channel
**[Diagram placeholder]**

Will show: five vertically stacked levels (S1 Operations at bottom, S5 Policy at top), with S3* Audit drawn as a side channel parallel to S3 Control (not subordinate to it), and the algedonic channel drawn as a direct arrow from S1 to S5 bypassing S2, S3 and S4. Edge labels indicate the kind of signal each level exchanges with its neighbours.
:::
```

**Beats** — one paragraph per level (~160–200 words each); each level revisits the §1 scenario.

- **S1 Operations** — the executing unit that actually does work. *Scenario callback: a single agent session producing a PR.* Generic anchor: a single agent session.
- **S2 Coordination** — isolation primitives that keep S1 units from clobbering each other. *Scenario callback: worktrees and sandboxes that stop two agent sessions from corrupting each other's state.* Generic anchor: worktrees, isolated runtimes, PRs.
- **S3 Control** — here-and-now scheduling and supervision. *Scenario callback: the DAG planner and triage that decided which session worked on which ticket.* Generic anchor: DAG planner, executor, PR/session triage.
- **S3\* Audit** — a bypass channel that watches S3 without going through it. *Scenario callback: nominally exists, but every audit signal routes back through the same triage layer it's supposed to audit — so it isn't really audit.* Generic anchor: process compliance and appropriateness audit, deployed independently of the business path.
- **S4 Intelligence** — looking outward and forward. *Scenario callback: the part that doesn't exist. The team had no organ for noticing what should enter the backlog from outside.* Generic anchor: the system that ingests external requirements, user feedback, competitive signal — whatever translates the world outside the factory into work inside it.
- **S5 Policy** — identity and purpose. *Scenario callback: never explicitly stated, so metrics filled the vacuum. "We ship fast" became the de facto identity because that was the only thing the dashboards could measure.* Generic anchor: agent-policy files such as AGENTS.md / CLAUDE.md, principles documents, ADRs — unfalsifiable commitments scattered across the codebase. (Illustrative artefact *types*, not files that must exist in this repo.)
- **Algedonic channel** — a direct line from S1 to S5 bypassing S2/S3/S4. The fire alarm — it does not follow procedure. *Scenario callback: should have fired when the gap between "what we ship" and "what users actually need" first opened. It didn't, because there was no S5 for it to reach.*

**Cite**: Beer 1972 for the five-level model; Beer 1985 for the diagnostic stance and the algedonic channel as a structural element.

---

## § 4. Three counterintuitive points (600–800 words)

> This is where the article earns its keep. Each point is phrased crisply enough to be quotable.

1. **The absence of S4 is the default, not the anomaly.** Most software systems lack a complete S3, let alone S4. *The system has no awareness of its environment* is the norm, not a defect. Most agent factories can only digest what already sits in the backlog — they have no organ for noticing what should enter the backlog in the first place. (Tie back to §1: this is exactly what bit the team in the scenario.)

2. **S3\* cannot be absorbed by S3.** The moment audit runs through the business path, it loses its standing as audit. This is Beer's insight, and it's why SRE, observability and security review have to deploy independently — not as a matter of taste but as a structural requirement.

3. **S5 is unfalsifiable commitment, not if-then rules.** *"We are a low-latency system"* is S5. *"Alert if latency exceeds 100 ms"* is one instantiation of that commitment at S3. The two levels are not interchangeable — conflating them is a known, named failure mode with a long pedigree in economics and management. Section 5 spells out the mechanism (Conant-Ashby and Goodhart's Law) and shows why this is structural necessity, not stylistic preference.

**Transition out**: point #3 dangles a question — *why exactly is this a structural impossibility?* — that Section 5 picks up.

---

## § 5. Why a projection isn't a model — Conant-Ashby and Goodhart (800–1000 words, theoretical climax)

> Four moves, in order. The three life-grounded examples come **before** any technical vocabulary.

### Move 1 — Reintroduce Ashby and Conant-Ashby as a pair

- Restate Requisite Variety: controller variety ≥ controlled variety.
- Restate Conant-Ashby: every good regulator of a system must be a model of that system.
- Together: Ashby gives the quantitative floor; Conant-Ashby gives the structural form. Both necessary; either alone insufficient.

### Move 2 — Models versus measurements (structural vs projective compression)

Three life-grounded examples first. Same pattern: a useful number that is not the thing itself.

- **A scale reading is a projection of body composition.** The number drops; the silhouette in the mirror often doesn't.
- **A salary is a projection of financial freedom.** Two engineers earning the same number can have wildly different freedom (debt, cost of living, passive income, time autonomy).
- **Years of tenure is a projection of experience.** Fourteen years can mean fourteen years of growth or year one repeated fourteen times.

Then name the pattern, and only then introduce the technical terms:

> Structural compression preserves the shape of the system. Projective compression flattens it onto a single axis. Both are useful. The error is treating the projection as the thing.

**Visual** (small table): structural vs projective compression — preserves *shape*? preserves *relations*? safe as objective? safe as diagnostic?

### Move 3 — Goodhart's Law as the named failure mode

Brief origin paragraph (≤80 words): Goodhart 1975, monetary policy; popular phrasing is Strathern 1997 — *"When a measure becomes a target, it ceases to be a good measure."*

Then: the hard engineering rules everyone has lived with for decades are textbook Goodhart.

- **"Test coverage must exceed 80%"** → engineers write `assert(True)`; coverage rises, defects survive.
- **"p99 latency under 100 ms"** → slow requests get sampled out, dropped or rerouted; the dashboard goes green, users still wait.
- **"Two reviewers per PR"** → reviewers rubber-stamp each other; policy satisfied, code unread.

Do **not** moralise. These rules look reasonable. They fail not because they were designed badly but because they violate the layer they were deployed at: each is a projection (S3) trying to substitute for a commitment (S5). Once a projection becomes the target, Goodhart is automatic.

### Move 4 — The VSM payoff: S5 cannot be replaced by S3

Closes the loop with Section 4's third point. The reason S5 cannot collapse into S3 is now visible from two angles:

- **Conant-Ashby forbids it.** S5 is the model of what the organisation *is*. S3 is one projection of that model onto one axis. A projection is not a model. A controller that has only the projection has no model and therefore — by Conant-Ashby — cannot be a good regulator.
- **Goodhart punishes the attempt.** Even if an organisation tries to operate from projections alone, the act of targeting them destroys their information value. The harder you optimise for the proxy, the further the underlying property drifts.

**Implication for agent systems** (doubly sharp):
- LLMs as controllers have no internal model of the system they are deployed to control — a Conant-Ashby violation.
- Static rule sets bolted on top (content filters, output validators, behaviour policies) are projections being used as targets — a Goodhart vulnerability.
- Harness Engineering, when it works, builds models rather than walls: it constructs controllers whose internal structure mirrors the system being controlled, then uses metrics as diagnostic readouts rather than as objectives.

**Close on**: *"VSM is what Conant-Ashby looks like for organisations. Harness Engineering is what Conant-Ashby looks like for AI systems. Both are answers to a question the field has not yet learned to ask out loud."*

---

## § 6. A work in progress (footnote, 100–200 words)

> I am currently testing this mapping on an agent factory project of my own. The biggest lesson has not been confirmation of VSM's completeness — it has been how visible the model makes what's missing. Particularly S4 and the algedonic channel, the two levels most often dismissed as *not needed*. A separate post will cover the implementation.

Onsager **is** named, exactly once, in this footnote. What is suppressed is everything *below* the project name: no subsystem names, no tech stack, no implementation detail. Cap at 200 words.

---

## Closing line — pick one at writing time

1. *Cybernetics does not tell you how to write code; it tells you which layer of your system is running naked.*
2. *In an era where components themselves have purpose, what we need is not a new architectural pattern but a forgotten old language.*
3. *The question Beer asked in 1972 — what does it take for this organisation to stay alive — becomes literally true in software engineering for the first time with AI agent systems.*
4. *Every measurement you optimise is a projection. Every projection you target is a Goodhart waiting to happen. A system stays viable only when the model behind the projections is still being maintained.*

---

## Writing protocol reminder

- Write the **English** section first to `blog/2026-05-12-vsm-cybernetics-system-organization.mdx` (`unlisted: true`).
- Show in chat; wait for author confirmation.
- Once confirmed, **immediately** write the **Chinese** counterpart of the same section to `i18n/zh/docusaurus-plugin-content-blog/2026-05-12-vsm-cybernetics-system-organization.mdx`.
- Then move to the next section.
- After the full draft: run `pnpm run validate:zh-bold-source:fix` and `pnpm run build`. Leave `unlisted: true` — author publishes manually.
