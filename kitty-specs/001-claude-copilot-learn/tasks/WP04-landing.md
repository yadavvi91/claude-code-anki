---
work_package_id: "WP04"
subtasks:
  - "T018"
  - "T019"
  - "T020"
  - "T021"
  - "T022"
  - "T023"
  - "T024"
  - "T025"
title: "Landing page & navigation"
phase: "Phase 4 - Landing Page & Navigation"
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
  - timestamp: "2026-03-24T04:30:00Z"
    lane: "done"
    agent: "claude-opus-4-6"
    shell_pid: ""
    action: "Completed in commit 463af08 (tag: phase-4)"
---

# Work Package Prompt: WP04 – Landing page & navigation

## Objectives & Success Criteria
- Rewrite Hero, IntroSections, MethodBand, BeginDivider
- Modify NavSidebar (props-based sections)
- Create ModuleOverview
- Rewrite App.jsx as home page, main.jsx with full routing
- Home page renders all sections, module grid links to lesson routes

## Subtasks & Detailed Guidance

### Subtask T018 – Rewrite Hero.jsx
- Terminal typing animation, dark gradient background

### Subtask T019 – Rewrite IntroSections.jsx
- Problem statement + stats grid (5 courses, 6 modules, 14 lessons, 280+ cards)

### Subtask T020 – Rewrite MethodBand.jsx
- 4-step learning flow: Concept → Example → Practice → SRS Review

### Subtask T021 – Rewrite BeginDivider.jsx
- Props-based: lessonNumber, title, subtitle, concepts

### Subtask T022 – Modify NavSidebar.jsx
- Configurable sections via props

### Subtask T023 – Create ModuleOverview.jsx
- Grid of 6 module cards with SRS progress bars

### Subtask T024 – Rewrite App.jsx
- Home page layout: Hero → sections → ModuleOverview → Footer

### Subtask T025 – Rewrite main.jsx
- Full routing: 14 lessons + 3 interludes + home + review + catch-all

## Activity Log
- 2026-03-24T03:30:00Z – system – lane=planned – Prompt created
- 2026-03-24T04:30:00Z – claude-opus-4-6 – lane=done – Completed in commit 463af08 (tag: phase-4)
