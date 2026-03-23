---
work_package_id: "WP22"
subtasks:
  - "T072"
  - "T073"
  - "T074"
title: "Review system & polish"
phase: "Phase 6 - Integration & Deploy"
lane: "planned"
assignee: ""
agent: ""
shell_pid: ""
review_status: ""
reviewed_by: ""
history:
  - timestamp: "2026-03-24T03:30:00Z"
    lane: "planned"
    agent: "system"
    shell_pid: ""
    action: "Prompt generated"
---

# Work Package Prompt: WP22 – Review system & polish

## Objectives & Success Criteria
- Build the Review.jsx page and ReviewDeck.jsx component for the spaced-repetition review interface
- Wire up ModuleOverview progress bars to reflect actual card completion data
- Remove all legacy Sanskrit content files that are no longer part of the curriculum

## Subtasks & Detailed Guidance

### Subtask T072 – Create Review.jsx page and ReviewDeck.jsx component
- Build a Review.jsx route that loads due cards from the SRS scheduler and presents them one at a time
- Build ReviewDeck.jsx to render a single MCQ card with four choices, reveal the answer on click, and collect the self-rating (Again / Hard / Good / Easy)
- Ensure the rating feeds back into the SRS algorithm to update interval and next-review date
- Style consistently with the existing app theme

### Subtask T073 – Wire up ModuleOverview progress bars
- Connect the ModuleOverview component's progress bars to real card-completion data from the SRS store
- Show percentage of cards seen, percentage mastered (interval > 21 days), and cards due today
- Ensure progress updates reactively as reviews are completed

### Subtask T074 – Delete legacy Sanskrit files
- Identify and remove all Sanskrit-related card data, components, and route references
- Update any imports or route definitions that referenced the removed files
- Verify the app builds cleanly after deletion

## Activity Log
- 2026-03-24T03:30:00Z – system – lane=planned – Prompt created
