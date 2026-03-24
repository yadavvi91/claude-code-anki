---
work_package_id: "WP17"
subtasks:
  - "T059"
  - "T060"
  - "T061"
title: "L11 Effective Subagent Design"
phase: "Phase 4 - Skills & Agents"
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

# Work Package Prompt: WP17 – L11 Effective Subagent Design

## Objectives & Success Criteria
- Produce ~20 MCQ Anki cards covering structured output, obstacle reporting, tool limits, and when to use vs avoid subagents
- Each card tests one concept with four answer choices and a concise explanation
- Cards are exported as a JSON array ready for the SRS review system

## Subtasks & Detailed Guidance

### Subtask T059 – Draft cards on structured output from subagents
- Cover how to instruct subagents to return structured results (JSON, specific formats)
- Include cards on parsing subagent output, handling partial results, and validating returned data
- At least 7 cards

### Subtask T060 – Draft cards on obstacle reporting and tool limits
- Cover how subagents should report when they hit obstacles rather than silently failing
- Include cards on configuring tool access limits for subagents, the principle of minimal authority, and preventing runaway subagent behavior
- At least 7 cards

### Subtask T061 – Draft cards on when to use vs avoid subagents
- Cover the decision framework: task complexity, context isolation needs, parallelism opportunities
- Include cards on anti-patterns (over-delegation, unnecessary subagent nesting) and the overhead trade-offs of spawning subagents
- At least 6 cards

## Activity Log
- 2026-03-24T03:30:00Z – system – lane=planned – Prompt created
- 2026-03-24T01:51:51Z – unknown – lane=done – L11 in commit 86de433
