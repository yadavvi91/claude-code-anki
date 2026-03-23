---
work_package_id: "WP01"
subtasks:
  - "T001"
  - "T002"
  - "T003"
  - "T004"
  - "T005"
title: "Project config & rename"
phase: "Phase 1 - Project Config"
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
  - timestamp: "2026-03-24T04:00:00Z"
    lane: "done"
    agent: "claude-opus-4-6"
    shell_pid: ""
    action: "Completed in commit 9962b78 (tag: phase-1)"
---

# Work Package Prompt: WP01 – Project config & rename

## Objectives & Success Criteria
- Rename project in package.json → claude-copilot-learn
- Update vite.config.js base path to /claude-code-anki/
- Update index.html (title, meta, fonts, background)
- Update public/404.html base path
- Rewrite CLAUDE.md for new domain
- `npm run dev` starts, page loads with new title

## Subtasks & Detailed Guidance

### Subtask T001 – Rename package.json
- Rename from gita-sanskrit-teacher to claude-copilot-learn

### Subtask T002 – Update vite.config.js
- Change base path from /sanskrit-gita-learn/ to /claude-code-anki/

### Subtask T003 – Rewrite index.html
- New title, swap fonts (Inter, Space Grotesk, JetBrains Mono), update background

### Subtask T004 – Update 404.html
- Fix SPA redirect base path

### Subtask T005 – Rewrite CLAUDE.md
- New project context, design tokens, architecture, rules

## Activity Log
- 2026-03-24T03:30:00Z – system – lane=planned – Prompt created
- 2026-03-24T04:00:00Z – claude-opus-4-6 – lane=done – Completed in commit 9962b78 (tag: phase-1)
