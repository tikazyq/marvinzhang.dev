# Research: T3 Code — The VS Code of the AI Agent Era?

## Article Information
- **Topic**: Whether T3 Code can become for agents what VS Code became for editors; thesis = conditional yes, condition = extension ecosystem
- **Target Audience**: intermediate/advanced developers already using coding agents
- **Language**: Both (ZH primary)
- **Started**: 2026-11-17
- **Evidence base**: author's daily use (parallel agents, cross-model dispatch, cross-machine handoff, in-app preview) + public sources below

## Primary Sources

- **T3 Code repo / README** — https://github.com/pingdotgg/t3code, site https://t3.codes/
  - MIT, free, by Ping Labs (Theo Browne, Julius Marminge). "Control plane for coding agents"; no own model, drives Claude Code, Codex, Cursor, OpenCode, Grok Build, Antigravity, etc. BYO subscriptions.

- **Flavio Copes, "A deep dive into T3 Code"** — https://flaviocopes.com/t3-code/ (accessed 2026-11-17)
  - Architecture: local server owns projects/threads/credentials/Git/terminals; web, desktop (Electron), iOS/Android clients only render state over one WebSocket (Effect RPC). Event-sourced SQLite state. Per-provider adapters translate native events into a shared model; ACP Registry agents can be added.
  - Adoption: 20k+ GitHub stars on 2026-08-27; 114 contributors in 0.0.34; 0.1.0 on 2026-10-15; latest stable 0.1.9 on 2026-11-11.
  - Remote: LAN, Tailscale, T3 Connect (3 machines/account), SSH; headless `npx t3@latest serve` / `pair`.
  - Extensibility today: `t3.json` (scripts, workspace mode, preview URLs, JSON schema), worktree setup scripts; skills come from the agent ecosystem, not T3.
  - Limits: early beta; full access default; provider switch mid-thread is lossy; adapters lag native features; not multi-user enterprise; no local models.

- **Discussion #6837 (ex-issue #5020): Pi-style extension API** — https://github.com/pingdotgg/t3code/discussions/6837
  - Opened 2026-07-30. Server lifecycle hooks (observe-only) + declarative client contributions (settings, command palette, status badges, one panel). Explicitly excludes marketplaces and arbitrary React bundles in v1.
  - Status: open, ~18 👍, **no maintainer reply**; community member (Oct 5): "No maintainer has agreed to the direction yet." ~18 community PRs for a local plugin system unmerged.

- **Issue #6419: Local app integration SDK and custom project surfaces MVP** — https://github.com/pingdotgg/t3code/issues/6419
  - 2026-08-13 RFC: `@t3tools/sdk` typed client over existing HTTP/WS; "Add plugin" = URL rendered as panel with scoped short-lived tokens; optional MCP URL so agents call plugin tools.
  - 2026-08-15 locked and converted to Discussion #6977; no substantive maintainer reply. Related: #377 (server SDK), #1582 (extension system), #3993 (closed plugin PR), #6158.

- **Community workarounds**
  - maddada/t3code-extensions — https://github.com/maddada/t3code-extensions : small web apps in the preview panel via project config.
  - Gist, declarative client plugins (styles/settings) — https://gist.github.com/abhaymettu/5e9df0174e968035dac33d8c78bcc992
  - Forks lose signed auto-updates.

## Supporting sources
- dev.to overview — https://dev.to/arshtechpro/t3-code-a-free-open-source-control-panel-for-claude-code-codex-and-other-coding-agents-1p10
- Better Stack guide — https://betterstack.com/community/guides/ai/t3-code/

## Key findings for the argument
1. T3 Code already copies VS Code's *first* half: free, open, neutral across "languages" (here: agents), with an adapter layer playing LSP's role (ACP is the nearest open protocol).
2. It lacks VS Code's *second* half: a public extension API + marketplace. Demand is visible (multiple RFCs, PR stacks, workarounds); maintainers have not committed.
3. Interesting nuance from author's own sessions: T3 already exposes app capabilities *to agents* as MCP tools (preview, threads, PR watch, delegation). Extensibility may arrive agent-first rather than human-plugin-first — a possible twist for the conclusion. (Needs author confirmation before use.)

## Visual ideas
- Table: VS Code's winning factors (free/open, LSP, marketplace, Remote) vs T3 Code status today.
- Mermaid: architecture — one local server, many clients, many agent adapters.

## Horizontal comparison (added 2026-11-17 at author's request)

- **Zenn, 53able, "公式アプリが毎週進化しても、T3 Codeを使う理由は残るか"** (2026-11-08) — https://zenn.dev/53able/articles/57952c1982de3d
  - 2026-08-08 to 11-08: Claude Code 81 stable releases, Codex CLI 35, T3 Code 20.
  - Official apps now have parallel worktrees, remote control, mobile, cloud sessions.
  - **Neither official changelog has a feature to run the other vendor's agent.** Codex can import Claude Code settings but not run Claude agents.
  - T3 keeps: Claude+Codex in one UI; `delegate_task` (v0.1.0) hands subtasks to another provider's child agent; auto-resume after usage limit reset, avoid out-of-quota providers; diff/commit/PR/PR-watch in one place; open source.
  - Official-only features: Codex computer use, Appshots, browser extension. Agent SDK drains Claude 5-hour limit faster (per T3 FAQ).
  - Conclusion: worth it if you mix Claude and Codex; single-vendor users are fine with official apps.
- **Cursor 3 "Glass"** (2026-04-02): Agents Window, parallel agents in worktrees, local/cloud/SSH/Docker; ships own model (Composer 2). Sources: https://www.digitalapplied.com/blog/cursor-3-agents-window-complete-guide , https://dev.to/gabrielanhaia/cursor-3-glass-replaced-composer-with-an-agents-window-1pcg
- **Antigravity 2.0 Agent Manager**: standalone orchestration app next to the IDE (Google). Details thin.
- **Conductor**: parallel Claude Code/Codex on Mac, plus Conductor Cloud. https://www.morphllm.com/parallel-coding-agents , https://rywalker.com/research/mac-coding-agent-apps
- Roundups: https://nimbalyst.com/blog/best-multi-agent-coding-tools-2026/ (tools look alike, differ in orchestration), https://openalternative.co/blog/best-ai-coding-agent-orchestrators

### Argument seed
Model vendors' apps have a structural conflict of interest: they will not make a rival's model a first-class citizen. Historical rhyme: Visual Studio, Xcode, Eclipse/JetBrains each tied to a platform or sold per language; VS Code won partly by being neutral. Cursor bundles its own model; Codex/Claude apps are single-vendor. T3's neutrality is the moat vendors cannot copy without hurting themselves. Counter: vendors ship ~4x faster and own exclusive features; T3 depends on their harnesses and their goodwill (SDK rate limits, removed endpoints).

## Cross-harness / cross-machine peers (added 2026-11-17 at author's request; GitHub pages fetched 2026-11-17)

| | Paseo | Happy | HAPI |
|---|---|---|---|
| Repo | https://github.com/getpaseo/paseo (site https://paseo.sh/) | https://github.com/slopus/happy (site https://happy.engineering/) | https://github.com/tiann/hapi |
| License / stars | Apache-2.0 / 24.2k | MIT / 24.7k | AGPL-3.0 / 5.4k |
| Agents | Claude Code, Codex, Copilot, OpenCode, Pi, Antigravity, Muse Code | Claude Code, Codex, Grok, Gemini (via Antigravity), OpenCode, any ACP agent | Claude Code, Codex, Cursor Agent, OpenCode, Pi, Kimi Code, Grok Build |
| Architecture | local daemon; desktop/mobile/web/CLI over WS; optional E2E relay | client for agents on own hardware; E2E-encrypted sync | local hub; web/PWA, iOS/Android, Telegram Mini App; optional WireGuard+TLS relay |
| Agent-to-agent | **Yes**: "Agents in Paseo can create worktrees, launch other agents, and talk to them, across providers"; MCP server, CLI `paseo run/send/ls`, TS SDK, `/paseo-handoff` `/paseo-advisor` skills | Partial: "delegate to subagents on any of them"; no documented messaging/management | Not documented; single-user remote control |
| Multi-machine | Yes, "on one machine or several", remote daemons | Not stated (multi-person session sharing instead) | Not clearly; one working machine |
| Desktop IDE pieces | agents, editor, terminals, diffs, PRs, browser | voice coding, push, mobile-first | mobile-first, terminal/phone handoff |

Also: Show HN Paseo https://news.ycombinator.com/item?id=47529963 ; Happy's own comparison page https://happy.engineering/docs/comparisons/alternatives/

### ⚠ Implication for thesis
Paseo already claims cross-provider, cross-machine agent-to-agent orchestration with more GitHub stars than T3 Code had in Aug. "Others can't do this" is false for Paseo. The real question for section 4 becomes: in a field of near-identical claims, what does T3 do better in practice? Needs author's first-hand comparison. HAPI and Happy are closer to "remote control" than "orchestration".

## Openness and community signals (fetched 2026-11-17)
- t3.codes: "The open-source control plane for coding agents"; "If you don't like something, fork it." / "Ship your own build." / "Self-host it or distribute it as your own." / button "Steal our code (legally)"; footer "MIT licensed · 63k+ stars". Mobile app license and T3 Connect openness not stated on the page.
- License comparison: T3 Code MIT; Happy MIT; Paseo Apache-2.0 (permissive, patent grant); HAPI AGPL-3.0 (copyleft, network use triggers source sharing).
- Paseo user reviews (HN thread https://news.ycombinator.com/item?id=49234056): azuanrb prefers Paseo for "specific preferences for different harness + model combinations"; robertn702 moved Conductor → superset.sh → Paseo because mobile matches desktop; haint_ says its session sync beats Claude Code's mobile app; jonotime calls it the most complete for Claude + OpenCode. No head-to-head vs T3 found.
- Paseo Show HN (https://news.ycombinator.com/item?id=47575827): author frames competitors as first-party apps "mixed quality" and tied to own models; Tauri → Electron migration.
- T3 issue #14871 (Orchestrator V1 → V2): long threads only carry over what fits the context budget. https://github.com/pingdotgg/t3code/issues/14871

## Author's own T3 workspace (read via T3 MCP, 2026-11-17; first 60 threads)
- Top-level PM threads: Semon PM (11-14, 2147 items, 29 PRs), Duhem PM (11-15, 2077 items, 36 PRs), Ostrom PM (11-16, 1886 items, 23 PRs), Tolmap PM (11-15, 1329 items, 21 PRs, still running), Infra Manager (11-14, 1003 items, 6 PRs). Most PMs were created by an agent via MCP (createdBy=agent), i.e. launched by another thread, not the author.
- Sub-agents in sample: 53 child threads. Models: Codex gpt-6.1-sol 32, gpt-6-luna 12, Claude Sonnet 5.5 7, Opus 5.5 2+. Pattern: Claude Opus PMs dispatch mostly Codex workers → cross-model in daily practice. Titles carry the tier ("· sol", "· luna"), and include implement / spike / review / design-doc roles (e.g. "Review PR 723" by luna under Ostrom PM).
- **Cross-PM collaboration example (Infra Manager, 2026-11-14)**: user asked (in another thread) to "switch back to gh native for ci of both repos including semon hub and tolmap hub". A thread launched Infra Manager with a brief (cost audit context: Fly runners destroyed, jobs queue forever). Infra Manager: "Now checking tolmap-hub's Fly contract test and contacting the Tolmap PM." → "Tolmap PM asked where to base its PR." Infra Manager opened semon-hub #386 and tolmap-hub #26, found CI workflows disabled during the cost audit, re-enabled them, flagged a corrupt local clone and four old conflicting PRs instead of touching them. Brief explicitly said "Do NOT destroy the Fly CI apps yourself … ask the user before removing deploy workflows wholesale" → bounded authority.

## Codex lineage (author's first impression 2026-11-17: "T3 Code's style looks a lot like Codex, probably borrowed")
- HN launch submission by theobr: "T3 Code – a new OSS agentic coding app that wraps Codex" https://news.ycombinator.com/item?id=47283655 (~8 months before 2026-11, i.e. ~March 2026). Issue #386 references v0.0.4 on 2026-03-07: https://github.com/pingdotgg/t3code/issues/386
- Codex support runs via the Codex App Server, which OpenAI built to power rich clients like its VS Code extension: https://openai.com/index/unlocking-the-codex-harness/
- Several write-ups frame T3 as a free alternative to the official Codex app (e.g. Medium "T3 Code vs Codex: Is the Free GUI Actually Better?", 403 on fetch, not read).
- **No source found confirming the UI was copied from the Codex app.** Article can state the verifiable lineage (started as a Codex wrapper, built on Codex App Server) and present visual resemblance as the author's own impression.
- Angle: fits the "features aren't a moat" thesis. Even the look is borrowable; T3 itself borrowed, and invites others to borrow back ("Steal our code").

## Semon stats, hp-code-2 (2026-11-17; NOT for the article, author's request)
- 1000 of 1158 sessions in 30d window (10-22 → 11-17). 694 sessions, 249 subagents, 57 codex-runs. Opus 518, Sonnet 160, GPT ~220, Haiku 28.
- 165 subagents = GPT models inside Claude Code harness. **Author (2026-11-17): these are converted via Magpie** (author's gateway; T3 lists "Remote magpie" / "Onsager Magpie" model groups routing Codex, Kiro, Copilot, OpenRouter models). So hook wording: "子 agent 大多用 OpenAI 的 GPT 模型"; section 2 can mention a gateway lets one harness drive many vendors' models.
- hp-code-1 stats: delegated via T3 to a Haiku child on hp-code-1 (pending).

## HAPI correction (2026-11-17, author)
- Author: HAPI supports cross-harness / cross-machine / cross-session communication. Confirmed in docs/guide/how-it-works.md: MCP peer tools `list_peers`, `inspect_peer`, `ping_peer` (message, optional waitForReply), `spawn_peer`; work from runner sessions even when the hub is on another host; "Remote Spawn - Start new sessions on any connected machine". Table updated to ✅ for 跨机器 and agent 之间通信.
