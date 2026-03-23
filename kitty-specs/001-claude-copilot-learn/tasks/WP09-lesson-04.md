---
work_package_id: "WP09"
subtasks:
  - "T037"
  - "T038"
  - "T039"
title: "L4 MCP Architecture & Building Servers"
phase: "Phase 3 - MCP Protocol"
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

# Work Package Prompt: WP09 – L4 MCP Architecture & Building Servers

## Objectives & Success Criteria
- Produce ~20 MCQ Anki cards covering the MCP client-server model, transport-agnostic design, Python SDK with decorators, and MCP Inspector
- Each card tests one concept with four answer choices and a concise explanation
- Cards are exported as a JSON array ready for the SRS review system

## Subtasks & Detailed Guidance

### Subtask T037 – Draft cards on MCP client-server architecture
- Cover the host/client/server triad, how hosts (like Claude Code) spawn and manage MCP servers
- Include cards on the capability negotiation handshake, protocol versioning
- At least 7 cards

### Subtask T038 – Draft cards on transport-agnostic design and Python SDK
- Cover how MCP separates protocol logic from transport, the @mcp.tool() decorator pattern
- Include cards on building a minimal MCP server in Python, registering tools, resources, and prompts
- At least 7 cards

### Subtask T039 – Draft cards on MCP Inspector and debugging
- Cover launching MCP Inspector, inspecting tool calls, viewing request/response pairs
- Include cards on common debugging scenarios and how Inspector helps diagnose issues
- At least 6 cards

## Activity Log
- 2026-03-24T03:30:00Z – system – lane=planned – Prompt created
