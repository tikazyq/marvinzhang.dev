# GitHub Copilot Agent Playbook

## Mission Snapshot
**Core concept: This repository hosts a Docusaurus 3.8.1 bilingual blog that must always use the `pnpm` workflow.**
- Root path serves blog content only; no docs section is present.
- English posts live in `blog/`; Chinese counterparts mirror them in `i18n/zh/docusaurus-plugin-content-blog/` with identical slugs and dates.
- Follow `.github/copilot-instructions.md` for project-wide conventions and reference `.github/instructions/writing-guidelines.instructions.md` for Markdown authoring specifics.

## Operational Directives
**Core concept: Agents need to respect the repository etiquette before touching files.**
- Always manage work through the todo list tool (one item in progress at a time, complete ASAP).
- Prefer the `apply_patch` editing flow; fall back to other edit tools only if necessary.
- When adding blog content, write directly in the final MDX location with `draft: true` until publication.
- Summaries or explanations should stay skimmable, friendly, and free of filler phrases.

:::note Workflow Essentials
- Never use `npm` or `yarn`; stick to `pnpm` for installs, scripts, and scaffolds.
- Keep instructions concise when reporting results; share deltas rather than repeating entire plans.
:::

## Content Authoring Standards
**Core concept: Blog posts follow a four-stage, section-by-section writing process that balances depth with readability.**
- Use the scaffold script (`node scripts/drafts/scaffold.js "title" "YYYY-MM-DD"`) to create `drafts/YYYY-MM-DD-slug/` with `research.md`, `outline.md`, and `progress.md` helpers.
- Structure each article with the prescribed section lengths (Intro 300–500 words, Main sections 600–1000 words, Conclusion 250–400 words).
- Highlight each section's main idea in bold at first mention, add short takeaways, and prefer diagrams/tables over long code blocks (≤10 lines when unavoidable).
- **Mermaid diagrams**: Style all nodes with explicit colors (`fill,stroke,color`) for light/dark theme compatibility.
- **MDX syntax**: Use JSX-style comments `{/* comment */}` not HTML comments `<!-- comment -->`. Add `{/* truncate */}` after the introduction to control blog list previews.
- Introduce links on first reference only, aiming for official sources and meaningful anchor text.

### 4-Stage Workflow Quick Reference
- **Stage 1 – Research**: Validate topic viability, gather authoritative sources, and complete `research.md` with insights that prove the angle is worth pursuing.
- **Stage 2 – Outline**: Translate findings into a detailed structure inside `outline.md`, setting word targets, section goals, and planned visuals.
- **Stage 3 – Writing**: Draft each section directly in `blog/…` and `i18n/zh/…` with `draft: true`, keeping to section word counts and surfacing core concepts early.
- **Stage 4 – Refine**: Perform holistic review, tighten narrative flow, validate technical accuracy, and ensure bilingual parity before flipping `draft: false`.

> For the stage-by-stage checklist, quality gates, and handoff protocol, follow `.github/prompts/write.prompt.md`.

## Localization & Draft Workflow
**Core concept: Maintain synchronized bilingual content and move drafts through the archive flow when publishing.**
- Every English post must have a matching Chinese translation with the same slug and metadata.
- Draft Markdown lives in the final location (`blog/...` and `i18n/zh/...`) with `draft: true` until release; flip to `false` and move the scaffold folder to `drafts/archive/` at publication.
- Keep frontmatter aligned (title, tags, date, authors) and ensure translations reflect updates made to the English version.
- **Chinese articles must include English term annotations**: Add capitalized English translations in parentheses at first mention of technical terms (e.g., `可计算性理论（Computability Theory）`, `大型语言模型（Large Language Model，LLM）`), and use Chinese punctuation throughout (，、：instead of , ・ :).

| Step | English Path | Chinese Path |
| --- | --- | --- |
| Drafting | `blog/YYYY-MM-DD-slug.mdx` | `i18n/zh/docusaurus-plugin-content-blog/YYYY-MM-DD-slug.mdx` |
| Research assets | `drafts/YYYY-MM-DD-slug/` | Shared resources |
| Post-publication archive | `drafts/archive/YYYY-MM-DD-slug/` | Shared resources |

## Quality Gates & Verification
**Core concept: Validate meaningful changes locally and document the outcomes succinctly.**
- Run quick checks that match the scope of your edits; prioritize `pnpm run build` for production confidence and `pnpm dev` for smoke tests when relevant.
- Report PASS/FAIL status for build, lint, and tests; include failure summaries plus remediation steps or follow-ups.
- Note any assumptions or unresolved issues explicitly so maintainers can follow up effortlessly.
