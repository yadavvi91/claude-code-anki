# Claude Copilot Learn

## Stack
React + Vite. No external UI libraries. All styles inline.

## Design
Background: #f8f9fc · Accent: #6366f1 (indigo) · Secondary: #8b5cf6 (violet)
Prose font: Inter · Heading font: Space Grotesk · Code font: JetBrains Mono
(Google Fonts)

## Architecture
- src/data/cardSets.js — all MCQ cards organized by module > lesson > cardSet > card, SRS seed state
- One MCQ component: left border = indigo → green (correct) / red (wrong)
- Wrong answers show specific corrective feedback
- SRS stored in localStorage key: "claude-copilot-srs"

## Rules
- Never use Tailwind, MUI, or any component library
- Every new component follows the same inline style pattern
- Code snippets use JetBrains Mono font
- Keep cardSets.js as the single source of truth for all card content
- Theme tokens live in src/theme.js — all components reference this

## UI Pattern — Quantum Country Style
- Prose and cards are interleaved — reading and drilling are one flow, not two modes
- Cards appear inline immediately after the concept they test
- Cards are not a separate "quiz section" — they live inside the essay
- After answering, feedback appears below the selected option (not in a modal or new page)
- Wrong answers show specific corrective explanation, not just "incorrect"
- A subtle visual marker (left border color change) signals right/wrong — no loud animations
- The reader always feels like they are reading an essay, not taking a test

## Workflow — Commits & Checkpoints
- ALWAYS commit after completing each phase or significant milestone
- Create git tags for major phase completions (e.g., `phase-1`, `phase-2`)
- Never accumulate multiple phases of work without committing
- Commit messages should be descriptive: what changed and why
- Stage specific files per commit — no blanket `git add .`
- Push to remote after each phase commit

## Modules
1. Claude Code Fundamentals (indigo #6366f1)
2. MCP Fundamentals (violet #8b5cf6)
3. MCP Advanced (pink #ec4899)
4. Agent Skills (amber #f59e0b)
5. Subagents (teal #14b8a6)
6. GitHub Copilot (blue #3b82f6)
