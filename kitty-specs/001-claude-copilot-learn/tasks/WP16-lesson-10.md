---
work_package_id: "WP16"
subtasks:
  - "T056"
  - "T057"
  - "T058"
title: "L10 Subagent Mechanics"
phase: "Phase 4 - Skills & Agents"
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

# Work Package Prompt: WP16 – L10 Subagent Mechanics

## Objectives & Success Criteria
- Produce ~20 MCQ Anki cards covering separate context windows, input/output flow, /agents command, and creating custom subagents
- Each card tests one concept with four answer choices and a concise explanation
- Cards are exported as a JSON array ready for the SRS review system

## Subtasks & Detailed Guidance

### Subtask T056 – Draft cards on subagent context isolation
- Cover how each subagent runs in its own context window, separate from the parent conversation
- Include cards on what information flows into a subagent (the prompt) and what flows back (the result), and why isolation matters for reliability
- At least 7 cards

### Subtask T057 – Draft cards on the /agents command and built-in subagents
- Cover the /agents slash command for listing available subagents, the built-in subagent types
- Include cards on how Claude Code decides when to spawn a subagent vs handle a task inline
- At least 6 cards

### Subtask T058 – Draft cards on creating custom subagents
- Cover defining custom subagents in .claude/agents/, the agent YAML/MD format, and configuring tool access
- Include cards on setting system prompts for subagents, restricting tool sets, and naming conventions
- At least 7 cards

## Activity Log
- 2026-03-24T03:30:00Z – system – lane=planned – Prompt created
