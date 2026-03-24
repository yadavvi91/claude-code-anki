import { modules } from '../../data/cardSets'
import MCQCard from '../../components/MCQCard'
import Reveal from '../../components/Reveal'
import LessonNav from '../../components/LessonNav'
import NavSidebar from '../../components/NavSidebar'
import ConceptDisplay from '../../components/ConceptDisplay'
import CodeBlock from '../../components/CodeBlock'
import ComparisonTable from '../../components/ComparisonTable'
import TipCallout from '../../components/TipCallout'
import { T } from '../../theme'

const base = '/claude-code-anki/images/'
const mod = modules[5]
const lesson = mod.lessons[1]
const sets = lesson.cardSets
const C = T.setColor
const palette = [C[1], C[2], C[3], C[4], C[5], C[6]]
let ci = 0; function nc() { return palette[ci++ % 6] }
const allCards = sets.flatMap(s => s.cards)
const colors = allCards.map(() => nc())
const s1 = sets[0].cards
const s2 = sets[1].cards
const s3 = sets[2].cards
const s4 = sets[3].cards

const NAV_SECTIONS = [
  { id: 'set1', label: 'Custom Instructions' },
  { id: 'set2', label: 'Custom Agents' },
  { id: 'set3', label: 'Skills & Prompts' },
  { id: 'set4', label: 'MCP Servers' },
  { id: 'summary', label: 'Summary', divider: true },
]

export default function Lesson13() {
  return (
    <div style={styles.page}><NavSidebar sections={NAV_SECTIONS} /><LessonNav moduleTitle="GitHub Copilot" moduleColor={mod.color} prevLink="/copilot/core-modes" prevLabel="L12: Core Modes" nextLink="/copilot/cloud-agents" nextLabel="L14: Advanced" />
      <main style={styles.main}>
        <Reveal><div style={styles.lessonLabel}>Lesson 13</div><h1 style={styles.h1}>Customization</h1>
          <p style={styles.subtitle}>Instructions, custom agents, skills, prompt files, and MCP server configuration</p></Reveal>
        <Reveal><ConceptDisplay concept="Instructions · Custom Agents · Skills · Prompts · MCP" description="Copilot becomes far more useful when you teach it your project's conventions, create reusable agents, and connect external tools." color={mod.color} /></Reveal>

        <Reveal id="set1"><div style={{ ...styles.setLabel, color: C[1] }}>Set 1 — Custom Instructions</div><h2 style={styles.h2}>Teaching Copilot your project's rules</h2></Reveal>
        <Reveal><p style={styles.prose}>The <strong><code style={styles.code}>.github/copilot-instructions.md</code></strong> file is your repo-wide instruction set. Everything in it applies to every Copilot interaction — coding standards, preferred patterns, architectural decisions, naming conventions.</p></Reveal>
        <Reveal><CodeBlock title=".github/copilot-instructions.md" code={`# Project Instructions

- Use TypeScript strict mode for all new files
- Prefer functional components with hooks over class components
- All API calls go through the \`src/api/\` layer
- Error messages must be user-friendly, not technical
- Write tests for every new function`} /></Reveal>
        <Reveal><p style={styles.prose}>For path-specific rules, create <strong><code style={styles.code}>.instructions.md</code></strong> files with an <code style={styles.code}>applyTo</code> glob in the YAML frontmatter. These instructions only activate when Copilot works on matching files — keeping the context clean.</p></Reveal>
        <Reveal><CodeBlock title=".github/instructions/api-routes.instructions.md" code={`---
applyTo: "src/api/**/*.ts"
---
All API routes must:
- Validate input with zod schemas
- Return consistent error shapes { error: string, code: number }
- Log requests with the structured logger`} /></Reveal>
        <Reveal><p style={styles.prose}>Copilot also reads <strong>AGENTS.md</strong> and <strong>CLAUDE.md</strong> for cross-tool compatibility. Priority order: path-specific instructions (highest) → <code style={styles.code}>.github/copilot-instructions.md</code> → AGENTS.md/CLAUDE.md (lowest).</p></Reveal>
        <Reveal><TipCallout variant="tip">If your team uses both Copilot and Claude Code, put shared rules in <strong>CLAUDE.md</strong> (both tools read it) and Copilot-specific rules in <strong>.github/copilot-instructions.md</strong>.</TipCallout></Reveal>
        {s1.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[i]} /></Reveal>)}

        <div style={styles.divider}>· · ·</div>

        <Reveal id="set2"><div style={{ ...styles.setLabel, color: C[2] }}>Set 2 — Custom Agents</div><h2 style={styles.h2}>Reusable agent personas</h2></Reveal>
        <Reveal><p style={styles.prose}>Custom agents live in <strong><code style={styles.code}>.github/agents/*.agent.md</code></strong>. Each file defines a reusable agent with YAML frontmatter (name, description, tools, model) and a system prompt body.</p></Reveal>
        <Reveal><CodeBlock title=".github/agents/code-reviewer.agent.md" code={`---
name: code-reviewer
description: Reviews code changes for quality, security, and style
tools:
  - execute
  - read
  - search
model: gpt-4o
---

You are a code reviewer. For each change:
1. Summary: Brief overview and overall assessment
2. Critical Issues: Security, data integrity, logic errors
3. Major Issues: Architecture, performance concerns
4. Minor Issues: Style, documentation gaps
5. Approval Status: Ready to merge or needs changes`} /></Reveal>
        <Reveal><p style={styles.prose}>The four tool aliases are: <strong>execute</strong> (terminal commands), <strong>read</strong> (file reading), <strong>edit</strong> (file modification), and <strong>search</strong> (codebase search). Only listed tools are available to the agent.</p></Reveal>
        <Reveal><p style={styles.prose}>Invoke a custom agent by typing <code style={styles.code}>@agent-name</code> in the chat panel. The format is nearly identical to Claude Code's <code style={styles.code}>.claude/agents/*.md</code> — same concept, different directory.</p></Reveal>
        {s2.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + i]} /></Reveal>)}

        <div style={styles.divider}>· · ·</div>

        <Reveal id="set3"><div style={{ ...styles.setLabel, color: C[3] }}>Set 3 — Skills & Prompts</div><h2 style={styles.h2}>Reusable capabilities and templates</h2></Reveal>
        <Reveal><p style={styles.prose}><strong>Skills</strong> are structured capabilities defined in <code style={styles.code}>.github/skills/*/SKILL.md</code>. Each skill has its own directory and can include supporting files. They represent complex, reusable workflows.</p></Reveal>
        <Reveal><p style={styles.prose}><strong>Prompt files</strong> (<code style={styles.code}>.github/prompts/*.prompt.md</code>) are lighter-weight templates. They support variables like <code style={styles.code}>{'${selection}'}</code> (current editor selection) and <code style={styles.code}>{'${input:name}'}</code> (user-provided values at runtime).</p></Reveal>
        <Reveal><CodeBlock title=".github/prompts/add-component.prompt.md" code={`---
name: add-component
description: Scaffolds a new React component with tests
---
Create a React component called \${input:componentName} that:
- Uses TypeScript with proper interfaces
- Follows our naming conventions
- Includes a unit test file
- Uses the current selection as reference: \${selection}`} /></Reveal>
        <Reveal><p style={styles.prose}>Create them interactively with <code style={styles.code}>/create-skill</code> and <code style={styles.code}>/create-prompt</code> in Copilot chat, or write the markdown files directly.</p></Reveal>
        {s3.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + s2.length + i]} /></Reveal>)}

        <div style={styles.divider}>· · ·</div>

        <Reveal id="set4"><div style={{ ...styles.setLabel, color: C[4] }}>Set 4 — MCP Servers</div><h2 style={styles.h2}>Connecting external tools</h2></Reveal>
        <Reveal><p style={styles.prose}>MCP server configuration lives in <strong><code style={styles.code}>.vscode/mcp.json</code></strong>. Copilot supports three transport types: <strong>stdio</strong> (local process), <strong>HTTP</strong> (streamable remote), and <strong>SSE</strong> (server-sent events).</p></Reveal>
        <Reveal><CodeBlock title=".vscode/mcp.json" code={`{
  "servers": {
    "my-database": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@my-org/db-mcp-server"],
      "env": { "DB_URL": "\${env:DATABASE_URL}" }
    },
    "remote-api": {
      "type": "http",
      "url": "https://api.example.com/mcp"
    }
  }
}`} /></Reveal>
        <Reveal><p style={styles.prose}>VS Code 1.112+ added <strong>sandboxing</strong> for MCP servers — processes run in isolated environments to limit system access. Each server is limited to a maximum of <strong>128 tools</strong> to prevent context window bloat.</p></Reveal>
        <Reveal><TipCallout variant="warning">Keep MCP servers focused. The 128-tool limit exists because every tool definition consumes context window tokens. A server with 100+ tools will leave less room for your actual conversation.</TipCallout></Reveal>
        {s4.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + s2.length + s3.length + i]} /></Reveal>)}

        <div style={styles.divider}>· · ·</div>
        <Reveal id="summary"><div style={styles.endSection}><div style={styles.endLabel}>End of Lesson 13</div>
          <p style={styles.endProse}>You now know how to customize Copilot with repo-wide and path-specific instructions, create reusable custom agents, build skills and prompt templates with variables, and configure MCP servers for external tool access.</p>
          <a href="/claude-code-anki/copilot/cloud-agents" style={styles.nextBtn}>Next → Lesson 14: Advanced Features</a></div></Reveal>
      </main>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: T.color.bg }, main: { maxWidth: '720px', margin: '0 auto', padding: '2rem 1.5rem 6rem' },
  lessonLabel: { fontFamily: T.font.label, fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.color.ink4, marginBottom: '0.75rem' },
  h1: { fontFamily: T.font.heading, fontSize: '2.4rem', fontWeight: 700, color: T.color.ink, lineHeight: 1.15, marginBottom: '0.75rem' },
  subtitle: { fontFamily: T.font.prose, fontSize: '1.1rem', color: T.color.ink3, lineHeight: 1.6, marginBottom: '2.5rem' },
  setLabel: { fontFamily: T.font.label, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '0.35rem' },
  h2: { fontFamily: T.font.heading, fontSize: '1.55rem', fontWeight: 600, color: T.color.ink2, lineHeight: 1.3, marginBottom: '1.4rem' },
  prose: { fontFamily: T.font.prose, fontSize: '1.05rem', lineHeight: 1.85, color: T.color.ink3, marginBottom: '1.4rem', maxWidth: '65ch' },
  code: { fontFamily: T.font.code, fontSize: '0.85em', background: 'rgba(99,102,241,0.08)', padding: '0.15em 0.4em', borderRadius: '3px', color: T.color.accent },
  img: { width: '100%', maxWidth: '640px', borderRadius: '8px', margin: '1rem auto', display: 'block' },
  divider: { textAlign: 'center', color: T.color.bg3, fontSize: '1rem', margin: '3rem 0', letterSpacing: '0.5em' },
  endSection: { textAlign: 'center', padding: '2rem 0' },
  endLabel: { fontFamily: T.font.label, fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.color.ink4, marginBottom: '1.5rem' },
  endProse: { fontFamily: T.font.prose, fontSize: '1rem', lineHeight: 1.8, color: T.color.ink3, marginBottom: '1rem', maxWidth: '55ch', marginLeft: 'auto', marginRight: 'auto', textAlign: 'left' },
  nextBtn: { display: 'inline-block', marginTop: '1.5rem', padding: '0.85rem 2.5rem', border: `1px solid ${T.color.accent}`, borderRadius: '4px', fontFamily: T.font.label, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', color: T.color.accent, transition: 'background 0.25s, color 0.25s' },
}
