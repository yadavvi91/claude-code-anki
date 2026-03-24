---
work_package_id: "WP11"
subtasks:
  - "T043"
  - "T044"
  - "T045"
title: "L6 Sampling, Progress & Security"
phase: "Phase 3 - MCP Protocol"
lane: "done"
assignee: ""
agent: ""
shell_pid: ""
review_status: "approved"
reviewed_by: "Vishal Yadav"
history:
  - timestamp: "2026-03-24T03:30:00Z"
    lane: "planned"
    agent: "system"
    shell_pid: ""
    action: "Prompt generated"
---

# Work Package Prompt: WP11 – L6 Sampling, Progress & Security

## Objectives & Success Criteria
- Produce ~20 MCQ Anki cards covering sampling (servers requesting LLM calls), progress/logging notifications, and roots-based file access
- Each card tests one concept with four answer choices and a concise explanation
- Cards are exported as a JSON array ready for the SRS review system

## Subtasks & Detailed Guidance

### Subtask T043 – Draft cards on MCP sampling
- Cover the sampling capability: how servers can request the host to perform LLM completions
- Include cards on the sampling/createMessage flow, human-in-the-loop approval, and use cases (agentic loops, data enrichment)
- At least 7 cards

### Subtask T044 – Draft cards on progress and logging notifications
- Cover progress tokens, notifications/progress messages, and how clients render progress bars
- Include cards on the logging levels, notifications/log messages, and structured server diagnostics
- At least 6 cards

### Subtask T045 – Draft cards on roots-based file access and security
- Cover the roots capability: how clients inform servers about accessible file-system roots
- Include cards on the security model (principle of least privilege), user consent, and how roots constrain server behavior
- At least 7 cards

## Activity Log
- 2026-03-24T03:30:00Z – system – lane=planned – Prompt created
- 2026-03-24T01:27:11Z – unknown – lane=done – L6 completed in commit 5e445c6
