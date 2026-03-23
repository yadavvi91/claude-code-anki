---
work_package_id: "WP02"
subtasks:
  - "T006"
  - "T007"
  - "T008"
title: "Theme & core infrastructure"
phase: "Phase 2 - Theme & Core Infrastructure"
lane: "done"
assignee: "claude-opus-4-6"
agent: "claude"
shell_pid: ""
review_status: ""
reviewed_by: ""
history:
  - timestamp: "2026-03-24T03:30:00Z"
    lane: "planned"
    agent: "system"
    shell_pid: ""
    action: "Prompt generated"
  - timestamp: "2026-03-24T04:10:00Z"
    lane: "done"
    agent: "claude-opus-4-6"
    shell_pid: ""
    action: "Completed in commit 2b017f7 (tag: phase-2)"
---

# Work Package Prompt: WP02 – Theme & core infrastructure

## Objectives & Success Criteria
- Rewrite src/theme.js with new design tokens
- Modify MCQCard.jsx (new SRS key, code support, new theme)
- Create unified src/data/cardSets.js with module schema + L1 cards (~20)
- MCQCard renders with new theme, SRS persists to claude-copilot-srs key

## Subtasks & Detailed Guidance

### Subtask T006 – Rewrite theme.js
- New color palette, fonts, set colors for 6 modules

### Subtask T007 – Update MCQCard.jsx
- New localStorage key, code block rendering, remove Devanagari detection

### Subtask T008 – Create unified cardSets.js
- Module > lesson > cardSet > card schema, 19 L1 cards, computed exports

## Activity Log
- 2026-03-24T03:30:00Z – system – lane=planned – Prompt created
- 2026-03-24T04:10:00Z – claude-opus-4-6 – lane=done – Completed in commit 2b017f7 (tag: phase-2)
