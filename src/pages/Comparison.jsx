import { useState } from 'react'
import Reveal from '../components/Reveal'
import LessonNav from '../components/LessonNav'
import NavSidebar from '../components/NavSidebar'
import ComparisonTable from '../components/ComparisonTable'
import CodeBlock from '../components/CodeBlock'
import TipCallout from '../components/TipCallout'
import MCQCard from '../components/MCQCard'
import { T } from '../theme'

const NAV_SECTIONS = [
  { id: 'directory', label: 'Directory Structure' },
  { id: 'instructions', label: 'Instructions' },
  { id: 'agents', label: 'Agents & Skills' },
  { id: 'commands', label: 'Commands & Prompts' },
  { id: 'hooks', label: 'Hooks' },
  { id: 'mcp', label: 'MCP Servers' },
  { id: 'modes', label: 'Modes & Workflow' },
  { id: 'quiz', label: 'Quiz', divider: true },
]

// Inline cards for this page (not in cardSets.js since this is a reference page)
const cards = [
  {
    id: 'cmp-q1',
    question: 'Where do project-level custom instructions live in Claude Code vs GitHub Copilot?',
    codeBlock: null,
    options: [
      { label: '`CLAUDE.md` (root) vs `.github/copilot-instructions.md`', correct: true, feedback: 'Correct. Both are markdown files at predictable locations. CLAUDE.md is at repo root; Copilot\'s is inside .github/.' },
      { label: 'Both use `CLAUDE.md`', correct: false, feedback: 'Copilot can read CLAUDE.md (via a setting), but its native file is `.github/copilot-instructions.md`.' },
      { label: 'Both use `.github/copilot-instructions.md`', correct: false, feedback: 'Claude Code uses `CLAUDE.md` at the repo root, not the .github/ directory.' },
      { label: '`settings.json` in both tools', correct: false, feedback: 'Neither tool uses settings.json for project instructions. Both use markdown files.' },
    ]
  },
  {
    id: 'cmp-q2',
    question: 'You have a Claude Code skill at `.claude/skills/pr-review/SKILL.md`. Where would the equivalent live in GitHub Copilot?',
    codeBlock: null,
    options: [
      { label: '`.github/skills/pr-review/SKILL.md`', correct: true, feedback: 'Correct. Same SKILL.md format, same directory structure — just under `.github/` instead of `.claude/`.' },
      { label: '`.github/agents/pr-review.agent.md`', correct: false, feedback: 'Agent files (`.agent.md`) define custom agent profiles, not skills. Skills use `SKILL.md` in a named directory.' },
      { label: '`.vscode/skills/pr-review.md`', correct: false, feedback: 'Skills don\'t go in `.vscode/`. They go in `.github/skills/` for Copilot.' },
      { label: '`.github/prompts/pr-review.prompt.md`', correct: false, feedback: 'Prompt files are user-invoked templates, not on-demand skills. Different concept.' },
    ]
  },
  {
    id: 'cmp-q3',
    question: 'In Claude Code, you type `# Always use TypeScript strict mode` to add a memory. What\'s the Copilot equivalent?',
    codeBlock: null,
    options: [
      { label: 'There is no equivalent — you must manually edit `.github/copilot-instructions.md`', correct: true, feedback: 'Correct. Copilot has no `#` memory command. You add instructions by directly editing the instructions file.' },
      { label: 'Type `# Always use TypeScript strict mode` — same command', correct: false, feedback: 'The `#` memory command is Claude Code specific. Copilot doesn\'t have this feature.' },
      { label: 'Use `/memory` in Copilot chat', correct: false, feedback: 'There is no `/memory` command in Copilot.' },
      { label: 'Add it to VS Code settings.json', correct: false, feedback: 'Settings-based instructions were deprecated in VS Code 1.102+. Use `.github/copilot-instructions.md` instead.' },
    ]
  },
  {
    id: 'cmp-q4',
    question: 'Claude Code has PreToolUse/PostToolUse hooks in `settings.json`. Where are Copilot hooks configured?',
    codeBlock: null,
    options: [
      { label: '`.github/hooks/hooks.json` with events like `preToolUse`, `postToolUse`, `sessionStart`', correct: true, feedback: 'Correct. Copilot hooks live in `.github/hooks/hooks.json` and support 6 event types including preToolUse and postToolUse.' },
      { label: '`.vscode/hooks.json`', correct: false, feedback: 'Copilot hooks don\'t go in .vscode/. They go in `.github/hooks/hooks.json`.' },
      { label: 'Same place — `settings.json`', correct: false, feedback: 'Claude Code uses settings.json for hooks. Copilot has its own `.github/hooks/hooks.json` format.' },
      { label: 'Copilot doesn\'t support hooks', correct: false, feedback: 'Copilot does support hooks — with 6 event types in `.github/hooks/hooks.json`.' },
    ]
  },
  {
    id: 'cmp-q5',
    question: 'You have `.claude/commands/review.md` as a custom slash command. What\'s the Copilot equivalent?',
    codeBlock: null,
    options: [
      { label: '`.github/prompts/review.prompt.md` — a reusable prompt file', correct: true, feedback: 'Correct. Copilot prompt files serve the same purpose as Claude Code custom commands. Both are markdown, both become slash commands.' },
      { label: '`.github/commands/review.md`', correct: false, feedback: 'Copilot doesn\'t have a commands/ directory. It uses `.github/prompts/*.prompt.md` for reusable prompts.' },
      { label: '`.github/agents/review.agent.md`', correct: false, feedback: 'Agent files define custom agent profiles with specific tools/models. Prompt files are the equivalent of custom commands.' },
      { label: '`.vscode/commands/review.md`', correct: false, feedback: 'Custom commands don\'t go in .vscode/. Copilot uses `.github/prompts/` for this purpose.' },
    ]
  },
  {
    id: 'cmp-q6',
    question: 'Where do MCP servers get configured in Claude Code vs GitHub Copilot?',
    codeBlock: null,
    options: [
      { label: '`.claude/mcp.json` vs `.vscode/mcp.json`', correct: true, feedback: 'Correct. Same JSON format, different directories. Both support stdio, http, and sse transport types.' },
      { label: 'Both use `.vscode/mcp.json`', correct: false, feedback: 'Claude Code uses `.claude/mcp.json`, not `.vscode/mcp.json`.' },
      { label: '`CLAUDE.md` vs `.github/copilot-instructions.md`', correct: false, feedback: 'Those are instruction files, not MCP configuration files.' },
      { label: 'MCP is only supported in Claude Code', correct: false, feedback: 'Both tools support MCP servers. Copilot added MCP support and even has a server gallery in VS Code.' },
    ]
  },
  {
    id: 'cmp-q7',
    question: 'Claude Code is always in "agent mode." How does Copilot differ?',
    codeBlock: null,
    options: [
      { label: 'Copilot has 3 modes: Agent (autonomous), Edit (user-directed file changes), Ask (read-only Q&A)', correct: true, feedback: 'Correct. Copilot separates these into explicit modes. Claude Code handles all three through natural conversation — you just ask differently.' },
      { label: 'Copilot is also always in agent mode', correct: false, feedback: 'Copilot explicitly separates Agent, Edit, and Ask modes with different capabilities in each.' },
      { label: 'Copilot only has Ask mode', correct: false, feedback: 'Copilot has all three: Agent, Edit, and Ask modes.' },
      { label: 'Claude Code has separate modes too, they\'re just hidden', correct: false, feedback: 'Claude Code genuinely operates as one unified agent. It doesn\'t switch modes internally.' },
    ]
  },
  {
    id: 'cmp-q8',
    question: 'Claude Code subagents are defined in `.claude/agents/*.md`. What\'s the Copilot equivalent?',
    codeBlock: null,
    options: [
      { label: '`.github/agents/*.agent.md` — custom agent profiles with YAML frontmatter', correct: true, feedback: 'Correct. Both use markdown files with YAML frontmatter defining name, description, tools, and model. Copilot uses `.agent.md` extension.' },
      { label: '`.github/skills/*.md`', correct: false, feedback: 'Skills add knowledge/instructions, not isolated execution contexts. Custom agents are the equivalent of subagents.' },
      { label: 'Copilot doesn\'t support custom agents', correct: false, feedback: 'Copilot supports custom agents via `.github/agents/*.agent.md` files.' },
      { label: '`.vscode/agents/*.json`', correct: false, feedback: 'Copilot agents are markdown files in `.github/agents/`, not JSON in `.vscode/`.' },
    ]
  },
  {
    id: 'cmp-q9',
    question: 'You\'re switching from Claude Code to Copilot. Which file moves are needed?',
    codeBlock: null,
    options: [
      { label: '`CLAUDE.md` → `.github/copilot-instructions.md`, `.claude/skills/` → `.github/skills/`, `.claude/mcp.json` → `.vscode/mcp.json`', correct: true, feedback: 'Correct. Instructions, skills, and MCP config all need to move to their Copilot equivalents. Skills use the same SKILL.md format.' },
      { label: 'Just rename CLAUDE.md to AGENTS.md', correct: false, feedback: 'AGENTS.md works as an alternative, but skills and MCP config also need to move to their Copilot locations.' },
      { label: 'No changes needed — Copilot reads Claude Code files natively', correct: false, feedback: 'Copilot can be configured to read CLAUDE.md (via a setting), but skills, commands, and MCP config need to be in Copilot locations.' },
      { label: 'Delete everything and start fresh', correct: false, feedback: 'You can migrate most config. Skills use the same SKILL.md format. Instructions just need to move directories.' },
    ]
  },
  {
    id: 'cmp-q10',
    question: 'Copilot has `/delegate` to hand off work to a cloud agent. What\'s the Claude Code equivalent?',
    codeBlock: null,
    options: [
      { label: 'No direct equivalent — Claude Code runs locally only', correct: true, feedback: 'Correct. Claude Code doesn\'t have cloud/remote agent execution. The closest is running Claude Code in a CI pipeline via the SDK, but there\'s no `/delegate` command.' },
      { label: '`/background` command', correct: false, feedback: 'Claude Code doesn\'t have a `/background` command for cloud delegation.' },
      { label: 'The Agent tool with `run_in_background: true`', correct: false, feedback: 'That runs a subagent locally in the background, not on cloud infrastructure. It doesn\'t create PRs or run on GitHub Actions.' },
      { label: '`/cloud` command', correct: false, feedback: 'There is no `/cloud` command in Claude Code.' },
    ]
  },
]

const palette = [T.setColor[1], T.setColor[2], T.setColor[3], T.setColor[4], T.setColor[5], T.setColor[6]]
const cardColors = cards.map((_, i) => palette[i % 6])

export default function Comparison() {
  return (
    <div style={s.page}>
      <NavSidebar sections={NAV_SECTIONS} />
      <LessonNav moduleTitle="Reference" moduleColor="#6b7280" prevLink="/" prevLabel="Home" nextLink="/review" nextLabel="Review" />
      <main style={s.main}>
        <Reveal>
          <div style={s.label}>Reference Guide</div>
          <h1 style={s.h1}>Claude Code vs GitHub Copilot</h1>
          <p style={s.subtitle}>A migration guide for switching between the two AI coding assistants</p>
        </Reveal>

        <Reveal><p style={s.prose}>Both Claude Code and GitHub Copilot are powerful AI coding tools, but they organize their customization files differently. If you're coming from one and starting with the other, this guide shows you exactly what maps where.</p></Reveal>

        {/* ── DIRECTORY STRUCTURE ── */}
        <Reveal id="directory"><h2 style={s.h2}>Directory Structure at a Glance</h2></Reveal>

        <Reveal>
          <CodeBlock title="Claude Code project structure" language="bash" code={`.
├── CLAUDE.md                          # Project instructions (always loaded)
├── CLAUDE.local.md                    # Personal instructions (not committed)
├── .claude/
│   ├── settings.json                  # Permissions + hooks
│   ├── settings.local.json            # Personal settings
│   ├── commands/                      # Custom slash commands
│   │   └── review.md                  #   → becomes /review
│   ├── agents/                        # Custom subagents
│   │   └── code-reviewer.md           #   → @agent code-reviewer
│   ├── skills/                        # On-demand expertise
│   │   └── pr-review/SKILL.md         #   → matched by description
│   └── mcp.json                       # MCP server config
└── ~/.claude/
    ├── CLAUDE.md                      # Global instructions (all projects)
    └── skills/                        # Personal skills`} />
        </Reveal>

        <Reveal>
          <CodeBlock title="GitHub Copilot project structure" language="bash" code={`.
├── AGENTS.md                          # Alternative instructions file
├── .github/
│   ├── copilot-instructions.md        # Project instructions (always loaded)
│   ├── instructions/                  # Path-specific instructions
│   │   └── style.instructions.md      #   → applyTo: "**/*.css"
│   ├── prompts/                       # Reusable prompt files
│   │   └── review.prompt.md           #   → becomes /review
│   ├── agents/                        # Custom agent profiles
│   │   └── code-reviewer.agent.md     #   → @code-reviewer
│   ├── skills/                        # Agent skills
│   │   └── pr-review/SKILL.md         #   → matched by description
│   ├── hooks/
│   │   └── hooks.json                 # Event-driven hooks
│   └── workflows/
│       └── copilot-setup-steps.yml    # Cloud agent environment
├── .vscode/
│   └── mcp.json                       # MCP server config
└── ~/.copilot/
    ├── instructions/                  # User-level instructions
    └── skills/                        # Personal skills`} />
        </Reveal>

        {/* ── INSTRUCTIONS ── */}
        <Reveal id="instructions"><h2 style={s.h2}>Instructions & Context</h2></Reveal>

        <Reveal>
          <ComparisonTable
            headers={['Concept', 'Claude Code', 'GitHub Copilot']}
            rows={[
              ['Project instructions', 'CLAUDE.md (repo root)', '.github/copilot-instructions.md'],
              ['Personal instructions', 'CLAUDE.local.md', 'VS Code profile settings'],
              ['Global (all projects)', '~/.claude/CLAUDE.md', '~/.copilot/instructions/'],
              ['Path-specific rules', '.claude/rules/*.md (with paths)', '.github/instructions/*.instructions.md (with applyTo)'],
              ['Add memory via chat', '# command (merges into CLAUDE.md)', 'No equivalent (edit file manually)'],
              ['Include file in context', '@filename', '@filename (same!)'],
              ['Generate initial config', '/init', '/init (same!)'],
              ['Compatibility', 'Reads CLAUDE.md only', 'Can read CLAUDE.md + AGENTS.md via settings'],
            ]}
          />
        </Reveal>

        <Reveal>
          <TipCallout variant="tip" title="Quick Migration">
            Copy your CLAUDE.md content to <code style={s.code}>.github/copilot-instructions.md</code>. Copilot can also be configured to read CLAUDE.md directly via the <code style={s.code}>chat.useClaudeMdFile</code> setting.
          </TipCallout>
        </Reveal>

        {/* ── AGENTS & SKILLS ── */}
        <Reveal id="agents"><h2 style={s.h2}>Agents & Skills</h2></Reveal>

        <Reveal>
          <ComparisonTable
            headers={['Concept', 'Claude Code', 'GitHub Copilot']}
            rows={[
              ['Custom agents', '.claude/agents/*.md', '.github/agents/*.agent.md'],
              ['Agent frontmatter', 'name, description, tools, model, color', 'name, description, tools, model, target, mcp-servers'],
              ['Invoke agent', '@agent name or automatic', '@name or automatic'],
              ['Agent skills', '.claude/skills/*/SKILL.md', '.github/skills/*/SKILL.md (same format!)'],
              ['Skill matching', 'Semantic match on description', 'Semantic match on description (same!)'],
              ['Create with AI', 'No equivalent', '/create-skill, /create-prompt'],
              ['Built-in agents', 'Explore, Plan, General', 'Local, Background, Cloud, Sub-Agent'],
              ['Agent isolation', 'Separate context window', 'Sub-agents get separate context'],
            ]}
          />
        </Reveal>

        <Reveal><p style={s.prose}>The biggest difference: Copilot's custom agent files use <code style={s.code}>.agent.md</code> extension and support additional fields like <code style={s.code}>target</code> (vscode vs github-copilot), <code style={s.code}>mcp-servers</code> (inline MCP config), and <code style={s.code}>metadata</code>. Claude Code agent files are plain <code style={s.code}>.md</code>.</p></Reveal>

        {/* ── COMMANDS & PROMPTS ── */}
        <Reveal id="commands"><h2 style={s.h2}>Commands & Prompts</h2></Reveal>

        <Reveal>
          <ComparisonTable
            headers={['Concept', 'Claude Code', 'GitHub Copilot']}
            rows={[
              ['Custom commands', '.claude/commands/*.md', '.github/prompts/*.prompt.md'],
              ['File → command name', 'review.md → /review', 'review.prompt.md → /review'],
              ['Arguments', '$ARGUMENTS placeholder', '${input:name} and ${selection}'],
              ['Specify model', 'Not in command file', 'model: field in frontmatter'],
              ['Specify mode', 'Not applicable', 'agent: ask|agent|plan|custom-name'],
              ['Reference tools', 'Not in command file', '#tool:toolName in body'],
            ]}
          />
        </Reveal>

        <Reveal>
          <CodeBlock title="Claude Code: .claude/commands/review.md" code={`Review the code in $ARGUMENTS for:
- Security vulnerabilities
- Performance issues
- Code style violations`} />
        </Reveal>

        <Reveal>
          <CodeBlock title="Copilot: .github/prompts/review.prompt.md" language="yaml" code={`---
description: Review code for quality issues
agent: agent
tools: ["read", "search"]
---
Review the code in \${input:target} for:
- Security vulnerabilities
- Performance issues
- Code style violations`} />
        </Reveal>

        {/* ── HOOKS ── */}
        <Reveal id="hooks"><h2 style={s.h2}>Hooks & Automation</h2></Reveal>

        <Reveal>
          <ComparisonTable
            headers={['Concept', 'Claude Code', 'GitHub Copilot']}
            rows={[
              ['Config location', 'settings.json (PreToolUse/PostToolUse)', '.github/hooks/hooks.json'],
              ['Pre-tool hook', 'PreToolUse (exit 0=allow, 2=block)', 'preToolUse (permissionDecision in JSON)'],
              ['Post-tool hook', 'PostToolUse', 'postToolUse'],
              ['Session events', 'No equivalent', 'sessionStart, sessionEnd'],
              ['User input hook', 'No equivalent', 'userPromptSubmitted'],
              ['Error hook', 'No equivalent', 'errorOccurred'],
              ['Input format', 'JSON via stdin', 'JSON via stdin (same!)'],
              ['Blocking', 'Exit code 2', 'permissionDecision in JSON output'],
            ]}
          />
        </Reveal>

        <Reveal>
          <TipCallout variant="insight">
            Copilot hooks have <strong>6 event types</strong> vs Claude Code's 2 (PreToolUse/PostToolUse). Copilot adds session lifecycle events and error handling that Claude Code doesn't have.
          </TipCallout>
        </Reveal>

        {/* ── MCP ── */}
        <Reveal id="mcp"><h2 style={s.h2}>MCP Servers</h2></Reveal>

        <Reveal>
          <ComparisonTable
            headers={['Concept', 'Claude Code', 'GitHub Copilot']}
            rows={[
              ['Config file', '.claude/mcp.json', '.vscode/mcp.json'],
              ['Transport types', 'stdio, http, sse', 'stdio, http, sse (same!)'],
              ['Sandboxing', 'Permission-based', 'Process sandbox (macOS/Linux, v1.112+)'],
              ['Server gallery', 'No (manual config)', 'Yes (@mcp in Extensions view)'],
              ['Max tools per request', 'No explicit limit', '128 tools'],
              ['Per-agent MCP config', 'No', 'Yes (mcp-servers in .agent.md frontmatter)'],
              ['User-level config', '~/.claude/mcp.json', 'MCP: Open User Configuration command'],
            ]}
          />
        </Reveal>

        {/* ── MODES ── */}
        <Reveal id="modes"><h2 style={s.h2}>Modes & Workflow</h2></Reveal>

        <Reveal>
          <ComparisonTable
            headers={['Concept', 'Claude Code', 'GitHub Copilot']}
            rows={[
              ['Agent mode', 'Always on (default)', 'Explicit selection (Agent dropdown)'],
              ['Read-only Q&A', 'Just ask (no mode switch)', 'Ask mode (separate)'],
              ['Controlled edits', 'Narrow prompting', 'Edit mode (separate)'],
              ['Thinking depth', 'Think → Ultrathink (5 levels)', 'No equivalent'],
              ['Planning mode', 'Shift+Tab twice', 'No separate mode (agent plans automatically)'],
              ['Background execution', 'tmux/screen (manual)', 'Copilot CLI (built-in, survives VS Code close)'],
              ['Cloud execution', 'No equivalent', 'Cloud Agent (GitHub Actions runner, creates PRs)'],
              ['Context compaction', '/compact', '/compact (same!)'],
              ['Permission levels', 'Allow/Deny per tool', 'Default / Bypass / Autopilot'],
            ]}
          />
        </Reveal>

        <Reveal><p style={s.prose}><strong>The fundamental difference:</strong> Claude Code is a terminal-first tool that's always agentic. Copilot is IDE-embedded with explicit mode separation. Claude Code gives you a 1M token context window and thinking modes for depth. Copilot gives you cloud agents, a server gallery, and tighter VS Code integration.</p></Reveal>

        {/* ── QUIZ ── */}
        <Reveal id="quiz"><h2 style={s.h2}>Test Your Knowledge</h2></Reveal>
        <Reveal><p style={s.prose}>Can you map between the two tools? Try these 10 cards:</p></Reveal>

        {cards.map((card, i) => (
          <Reveal key={card.id}><MCQCard card={card} color={cardColors[i]} /></Reveal>
        ))}

        {/* ── END ── */}
        <Reveal>
          <div style={s.divider}>◆</div>
        </Reveal>
        <Reveal>
          <div style={s.endSection}>
            <div style={s.endLabel}>End of Comparison Guide</div>
            <p style={s.endProse}>You now know how every major Claude Code concept maps to its Copilot equivalent. Whether you're switching tools or using both, the patterns transfer.</p>
          </div>
        </Reveal>
      </main>
    </div>
  )
}

const s = {
  page: { minHeight: '100vh', background: T.color.bg },
  main: { maxWidth: '720px', margin: '0 auto', padding: '2rem 1.5rem 6rem' },
  label: { fontFamily: T.font.label, fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.color.ink4, marginBottom: '0.75rem' },
  h1: { fontFamily: T.font.heading, fontSize: '2.4rem', fontWeight: 700, color: T.color.ink, lineHeight: 1.15, marginBottom: '0.75rem' },
  subtitle: { fontFamily: T.font.prose, fontSize: '1.1rem', color: T.color.ink3, lineHeight: 1.6, marginBottom: '2rem' },
  h2: { fontFamily: T.font.heading, fontSize: '1.4rem', fontWeight: 600, color: T.color.ink2, lineHeight: 1.3, marginBottom: '1rem', marginTop: '2.5rem' },
  prose: { fontFamily: T.font.prose, fontSize: '1.05rem', lineHeight: 1.85, color: T.color.ink3, marginBottom: '1.4rem', maxWidth: '65ch' },
  code: { fontFamily: T.font.code, fontSize: '0.85em', background: 'rgba(99,102,241,0.08)', padding: '0.15em 0.4em', borderRadius: '3px', color: T.color.accent },
  divider: { textAlign: 'center', padding: '2rem 0', color: T.color.ink4, fontSize: '0.8rem', letterSpacing: '0.5em' },
  endSection: { textAlign: 'center', padding: '2rem 0' },
  endLabel: { fontFamily: T.font.label, fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.color.ink4, marginBottom: '1rem' },
  endProse: { fontFamily: T.font.prose, fontSize: '1rem', color: T.color.ink3, lineHeight: 1.7, maxWidth: '50ch', margin: '0 auto' },
}
