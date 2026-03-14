---
name: chat-driven
description: Chat-first interaction mode for marvinzhang.dev workflows. Replaces file-editing with conversational input — AI asks questions in chat, captures answers, writes all files on behalf of the author. Designed for mobile/voice dictation where editing files is impractical. Load this skill to make any workflow fully chat-driven.
metadata:
  author: marvinzhang
  version: "1.0"
  tier: foundation
---

# Chat-Driven Interaction Mode

All input happens in the chat. AI writes all files. Author never needs to open an editor.

## When to Use

- Working from mobile (voice dictation)
- Any context where file editing is impractical
- When author prefers conversational flow over file-based workflows

## Core Principle

**The chat box is the only input surface.** The AI must:
1. Ask questions in the chat — never say "fill out this file"
2. Capture answers from conversation — never expect the author to edit files
3. Write everything to files on behalf of the author
4. Present content inline in chat for review — never say "check the file"

## Interaction Patterns

### Gathering Information (Replaces Questionnaire)

Instead of creating a questionnaire file and asking the author to fill it out:

**Don't**:
```
I've created the questionnaire in specs/005-topic/README.md.
Please fill out the questionnaire section, then say "questionnaire complete".
```

**Do**:
```
Let's figure out the article together. I'll ask a few questions.

First: What's the core idea you want to communicate?
```

**Rules**:
- Ask 1-2 questions at a time (not a wall of 10 questions)
- Adapt question depth to the answer — short answer → follow up; detailed answer → move on
- After gathering enough context, write the spec file yourself
- Confirm with a brief summary: "Here's what I captured — anything to adjust?"

### Reviewing Content (Replaces "Check the File")

When presenting outlines, drafts, or plans for review:

**Don't**:
```
I've written the outline to specs/005-topic/outline.md.
Please review and let me know your thoughts.
```

**Do**:
```
Here's the proposed outline:

## 1. Introduction — Why X matters now
## 2. The Problem — What's broken about Y
## 3. The Approach — How Z solves it
## 4. Results — What we measured
## 5. Lessons — What surprised us

Does this flow work? Any sections to add, remove, or reorder?
```

**Rules**:
- Show content inline in chat (summarized if long)
- Ask specific questions: "Does this flow work?" not "Any thoughts?"
- Offer concrete options when possible: "Should section 3 come before or after section 2?"
- For long content (full sections), show a brief summary + key points, offer to show full text

### Giving Feedback (Replaces File Edits)

Make it easy for the author to give direction without precision editing:

**Accept these kinds of feedback**:
- "Make section 2 shorter"
- "The tone is too formal here"
- "Add something about performance benchmarks"
- "Swap sections 3 and 4"
- "This is good, move on"
- "I don't like the opening, try something more provocative"

**AI should**:
- Interpret intent, not require exact wording
- Apply changes and show the result
- Ask "Better?" or "Anything else to adjust?" before moving on

### Approvals (Replaces Status Updates)

**Don't**: Ask the author to update spec status or check boxes in files.

**Do**: Handle all status tracking internally.

```
✓ Outline approved. Moving to writing.
I'll start with Section 1: Introduction. Ready?
```

## Adaptive Question Depth

Match the question style to the answer style:

| Author gives... | AI should... |
| --------------- | ------------ |
| 1-2 word answer | Ask a focused follow-up to get more detail |
| 1-2 sentence answer | Acknowledge and move to next question |
| Paragraph answer | Extract key points, confirm understanding, skip related questions |
| Rambling/stream-of-consciousness | Synthesize into structured points, confirm |

## Session Continuity

On mobile, sessions may be interrupted. The AI should:
- Save progress to spec files after each meaningful exchange
- Start new sessions with a brief status recap: "Last time we finished the outline. Ready to write Section 1?"
- Never require the author to re-state information already captured

## File Writing Protocol

When the AI writes files on behalf of the author:
1. Write content directly to the correct file path
2. Briefly confirm what was written: "Saved the research notes to `specs/005-topic/research.md`"
3. Don't show full file contents unless asked — just confirm + summarize
4. For article sections, show the section in chat first, get approval, then write to MDX

## Compatibility

This skill modifies how other skills interact. When loaded:
- **Questionnaire workflows** → become conversational Q&A
- **Outline reviews** → become inline chat reviews
- **Section writing** → AI shows section in chat, gets feedback, writes to file
- **Refinement** → AI presents changes inline for approval
- **Status tracking** → AI manages spec updates silently
