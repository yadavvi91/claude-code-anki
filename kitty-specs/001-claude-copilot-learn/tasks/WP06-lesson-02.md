---
work_package_id: "WP06"
subtasks:
  - "T030"
  - "T031"
  - "T032"
title: "L2 Context, Planning & Commands"
phase: "Phase 2 - Claude Code Deep Dive"
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

# Work Package Prompt: WP06 – L2 Context, Planning & Commands

## Objectives & Success Criteria
- Produce ~20 MCQ Anki cards covering context management, thinking/planning modes, custom slash commands, and CLAUDE.md
- Each card tests one concept with four answer choices and a concise explanation
- Cards are exported as a JSON array ready for the SRS review system

## Subtasks & Detailed Guidance

### Subtask T030 – Draft cards on context management
- Cover the context window lifecycle: how Claude Code tracks conversation context, /clear, /compact, and context budget strategies
- Include cards on how large codebases are navigated without exceeding token limits
- At least 6 cards

### Subtask T031 – Draft cards on thinking and planning modes
- Cover extended thinking, plan mode vs act mode, and how to request a plan before execution
- Include cards on when planning mode is most beneficial (large refactors, multi-file changes)
- At least 7 cards

### Subtask T032 – Draft cards on custom slash commands and CLAUDE.md
- Cover creating custom slash commands in .claude/commands/, parameterized commands with $ARGUMENTS
- Cover CLAUDE.md purpose, placement (project root vs ~/.claude/CLAUDE.md), and how Claude Code reads it
- At least 7 cards

## Activity Log
- 2026-03-24T03:30:00Z – system – lane=planned – Prompt created
