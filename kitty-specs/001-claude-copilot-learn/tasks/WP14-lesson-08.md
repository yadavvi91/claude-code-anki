---
work_package_id: "WP14"
subtasks:
  - "T050"
  - "T051"
  - "T052"
title: "L8 Skill Anatomy"
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

# Work Package Prompt: WP14 – L8 Skill Anatomy

## Objectives & Success Criteria
- Produce ~20 MCQ Anki cards covering skills vs CLAUDE.md vs hooks vs subagents, SKILL.md frontmatter, description writing, and directory organization
- Each card tests one concept with four answer choices and a concise explanation
- Cards are exported as a JSON array ready for the SRS review system

## Subtasks & Detailed Guidance

### Subtask T050 – Draft cards on skills vs other extension mechanisms
- Cover the distinctions between skills, CLAUDE.md instructions, hooks, and subagents
- Include cards on when to use each mechanism, their scope (project vs global), and how they compose
- At least 7 cards

### Subtask T051 – Draft cards on SKILL.md frontmatter and description writing
- Cover the SKILL.md file format, required frontmatter fields, and how the skill description influences tool selection
- Include cards on writing effective skill descriptions that help Claude Code match user intent to the right skill
- At least 7 cards

### Subtask T052 – Draft cards on skill directory organization
- Cover the .claude/skills/ directory structure, naming conventions, and multi-file skill packages
- Include cards on skill discovery, how Claude Code indexes skills, and best practices for organizing a skill library
- At least 6 cards

## Activity Log
- 2026-03-24T03:30:00Z – system – lane=planned – Prompt created
- 2026-03-24T01:51:47Z – unknown – lane=done – L8 in commit 86de433
