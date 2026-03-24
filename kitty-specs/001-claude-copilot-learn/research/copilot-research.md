# GitHub Copilot Research Notes

## Concept Mapping: Copilot ↔ Claude Code

| Copilot Concept | File/Setting | Claude Code Equivalent |
|----------------|-------------|----------------------|
| Agent Mode | Chat view dropdown | Default behavior (always agentic) |
| Edit Mode | Chat view dropdown | Narrow prompting / specific file instructions |
| Ask Mode | Chat view dropdown | Just asking questions in conversation |
| Custom Instructions | `.github/copilot-instructions.md` | `CLAUDE.md` at repo root |
| Path-specific instructions | `.github/instructions/*.instructions.md` | `.claude/rules/*.md` with `paths` |
| User-level instructions | VS Code profile | `~/.claude/CLAUDE.md` |
| Custom Agents | `.github/agents/*.agent.md` | `.claude/agents/*.md` (subagents) |
| Agent Skills | `.github/skills/*/SKILL.md` | `.claude/skills/*/SKILL.md` |
| Prompt Files | `.github/prompts/*.prompt.md` | `.claude/commands/*.md` |
| MCP Servers | `.vscode/mcp.json` | `.claude/mcp.json` |
| Hooks | `.github/hooks/hooks.json` | `settings.json` hooks (PreToolUse/PostToolUse) |
| Background Agent | Copilot CLI session | Running Claude Code in tmux/background |
| Cloud Agent | GitHub Actions coding agent | No direct equivalent |
| Sub-Agents | `#runSubAgent` / automatic | Agent tool / Task tool |
| Next Edit Suggestions | NES setting | No equivalent |
| `/delegate` | Hand off to cloud agent | No equivalent |
| Permission levels | Default/Bypass/Autopilot | Allow/Deny per tool category |

## Key Directory Structure (Copilot)
```
my-repo/
├── .github/
│   ├── copilot-instructions.md          # Always-on instructions
│   ├── instructions/*.instructions.md   # Path-specific instructions
│   ├── prompts/*.prompt.md              # Reusable prompt files
│   ├── agents/*.agent.md               # Custom agent profiles
│   ├── skills/*/SKILL.md               # Agent skills
│   ├── hooks/hooks.json                 # Event-driven hooks
│   └── workflows/copilot-setup-steps.yml # Cloud agent environment
├── .vscode/mcp.json                     # MCP server configuration
├── AGENTS.md                            # Alternative instructions
└── CLAUDE.md                            # Claude-compatible instructions
```

## Three Modes: Agent vs Edit vs Ask

### Agent Mode
- Autonomous multi-step coding
- Plans, edits files, runs commands, iterates on errors
- Permission levels: Default / Bypass / Autopilot
- Context: workspace structure + tool descriptions + machine context

### Edit Mode
- User-directed file editing
- You choose which files, see diffs before applying
- No terminal execution, no autonomous iteration
- Best for surgical, focused improvements

### Ask Mode
- Read-only Q&A, no code changes
- Library usage, algorithms, syntax questions
- No project commitment required

## Four Agent Types
1. **Local Agent** — runs in VS Code process, interactive
2. **Background (CLI)** — runs outside VS Code, survives close, worktree isolation
3. **Cloud (Coding Agent)** — GitHub Actions runner, creates draft PRs, fully autonomous
4. **Sub-Agent** — isolated subtask within parent, returns summary only

## VS Code 1.112+ Features
- Integrated browser debugging (`editor-browser` debug type)
- Copilot CLI permissions (Autopilot level)
- MCP server sandboxing (`sandboxEnabled: true`)
- Agent image support (vision)
- Monorepo customizations (`chat.useCustomizationsInParentRepositories`)
- `/troubleshoot` command
- Max 128 tools per chat request

## Copilot Hooks (6 Events)
| Event | When | Can Block? |
|-------|------|-----------|
| `sessionStart` | Session begins | No |
| `sessionEnd` | Session ends | No |
| `userPromptSubmitted` | After user input | No |
| `preToolUse` | Before tool invocation | Yes |
| `postToolUse` | After tool completes | No |
| `errorOccurred` | On error | No |

Config: `.github/hooks/hooks.json`
