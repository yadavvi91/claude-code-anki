---
work_package_id: "WP12"
subtasks:
  - "T046"
  - "T047"
  - "T048"
title: "L7 Transports & Production"
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

# Work Package Prompt: WP12 – L7 Transports & Production

## Objectives & Success Criteria
- Produce ~20 MCQ Anki cards covering stdio vs HTTP vs SSE transports, JSON message architecture, scaling, and transport selection
- Each card tests one concept with four answer choices and a concise explanation
- Cards are exported as a JSON array ready for the SRS review system

## Subtasks & Detailed Guidance

### Subtask T046 – Draft cards on MCP transport types
- Cover stdio transport (local subprocess communication), HTTP+SSE transport (remote servers), and the newer streamable HTTP transport
- Include cards on when to use each transport type, latency and security trade-offs
- At least 7 cards

### Subtask T047 – Draft cards on JSON-RPC message architecture
- Cover the JSON-RPC 2.0 message format used by MCP: requests, responses, and notifications
- Include cards on message IDs, error codes, and the distinction between requests (expect response) and notifications (fire-and-forget)
- At least 7 cards

### Subtask T048 – Draft cards on scaling and production deployment
- Cover deploying MCP servers in production: containerization, authentication, rate limiting
- Include cards on choosing transports for team vs enterprise scenarios, monitoring, and connection lifecycle management
- At least 6 cards

## Activity Log
- 2026-03-24T03:30:00Z – system – lane=planned – Prompt created
