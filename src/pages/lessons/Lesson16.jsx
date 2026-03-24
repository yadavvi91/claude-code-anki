import { modules } from '../../data/cardSets'
import MCQCard from '../../components/MCQCard'
import MCQSection from '../../components/MCQSection'
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
const lesson = mod.lessons[3]
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
  { id: 'set1', label: 'Invoking the Coding Agent' },
  { id: 'set2', label: 'Environment & Security' },
  { id: 'set3', label: 'Custom Agents & Workflow' },
  { id: 'set4', label: 'Agent Mode vs Coding Agent' },
  { id: 'summary', label: 'Summary', divider: true },
]

export default function Lesson16() {
  return (
    <div style={styles.page}><NavSidebar sections={NAV_SECTIONS} /><LessonNav moduleTitle="GitHub Copilot" moduleColor={mod.color} prevLink="/copilot/cloud-agents" prevLabel="L14: Advanced" nextLink="/" nextLabel="Home" />
      <main style={styles.main}>
        <Reveal><div style={styles.lessonLabel}>Lesson 16</div><h1 style={styles.h1}>The Coding Agent</h1>
          <p style={styles.subtitle}>Assign an issue to Copilot, get a pull request back — the fully autonomous cloud agent workflow</p></Reveal>
        <Reveal><ConceptDisplay concept="Issue Assignment · Draft PRs · Self-Review · Custom Agents · Agent Mode vs Cloud" description="The coding agent turns GitHub Issues into reviewed pull requests without anyone opening an editor." color={mod.color} /></Reveal>

        <Reveal id="set1"><div style={{ ...styles.setLabel, color: C[1] }}>Set 1 — Invoking the Coding Agent</div><h2 style={styles.h2}>From issue to pull request</h2></Reveal>
        <Reveal><p style={styles.prose}>The coding agent is Copilot's fully autonomous mode. You assign a GitHub Issue to Copilot — the same way you'd assign it to a colleague — and the agent takes over: it analyzes the issue, creates a branch, writes code, runs tests, and delivers a <strong>draft pull request</strong>. No editor needed.</p></Reveal>
        <Reveal><ComparisonTable headers={['Trigger Method', 'Where']} rows={[
          ['Assign issue to Copilot', 'github.com, GitHub Mobile, GitHub CLI'],
          ['Ask from Copilot Chat', 'VS Code, JetBrains'],
          ['Delegate from CLI', 'GitHub Copilot CLI'],
        ]} /></Reveal>
        <Reveal><p style={styles.prose}>The workflow is transparent from the start. The agent immediately creates a <strong>draft PR with an empty initial commit</strong> to establish the workspace branch. As it works, it pushes additional commits with real code changes. You can watch progress in real-time through <strong>session logs</strong> attached to the PR.</p></Reveal>
        <Reveal><p style={styles.prose}>A <strong>model picker</strong> lets you choose which LLM powers the agent — options include Claude Opus 4.5, GPT-4o, GPT-5.1-Codex-Max, and Gemini 2.0 Flash. Set it to <strong>Auto</strong> and Copilot selects the best model based on the task.</p></Reveal>
        <Reveal><TipCallout variant="tip">Write clear, well-structured issues. The coding agent reads the title, body, labels, and any linked issues to understand context. The better the issue, the better the PR.</TipCallout></Reveal>

          <MCQSection color={colors[0]} count={s1.length}>
            {s1.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[i]} /></Reveal>)}
          </MCQSection>

        <div style={styles.divider}>· · ·</div>

        <Reveal id="set2"><div style={{ ...styles.setLabel, color: C[2] }}>Set 2 — Environment & Security</div><h2 style={styles.h2}>Secure, customizable compute</h2></Reveal>
        <Reveal><p style={styles.prose}>The coding agent runs on <strong>GitHub Actions infrastructure</strong> — the same system that processes over 40 million CI/CD jobs daily. You configure the environment with <code style={styles.code}>copilot-setup-steps.yml</code>, a GitHub Actions workflow that installs runtimes, starts services, and prepares dependencies before the agent begins coding.</p></Reveal>
        <Reveal><CodeBlock title="copilot-setup-steps.yml" code={`name: "Copilot Setup Steps"
on: workflow_dispatch

jobs:
  setup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - name: Start services
        run: docker compose up -d postgres redis`} /></Reveal>
        <Reveal><p style={styles.prose}>Security is built in, not bolted on. Before finishing a PR, the coding agent automatically runs a <strong>triple security check</strong>:</p></Reveal>
        <Reveal><ComparisonTable headers={['Check', 'What It Catches']} rows={[
          ['CodeQL scanning', 'Code vulnerabilities (SQL injection, XSS, etc.)'],
          ['Secret scanning', 'Accidentally committed API keys and tokens'],
          ['Dependency checks', 'Known vulnerabilities in new packages (GitHub Advisory DB)'],
        ]} /></Reveal>
        <Reveal><p style={styles.prose}><strong>Self-review</strong> is the key innovation: when any security check finds a problem, the agent doesn't just flag it — it <strong>attempts to fix the issue itself</strong>, then documents what it found and how it resolved it in the PR summary. No GitHub Advanced Security license required — these checks are included with Copilot.</p></Reveal>
        <Reveal><TipCallout variant="tip">Organization owners and enterprise admins control coding agent availability through policy settings. You can enable or disable it per repo, set trust levels, and configure governance controls.</TipCallout></Reveal>

          <MCQSection color={colors[s1.length]} count={s2.length}>
            {s2.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + i]} /></Reveal>)}
          </MCQSection>

        <div style={styles.divider}>· · ·</div>

        <Reveal id="set3"><div style={{ ...styles.setLabel, color: C[3] }}>Set 3 — Custom Agents & Workflow</div><h2 style={styles.h2}>Specialized agents for your team</h2></Reveal>
        <Reveal><p style={styles.prose}><strong>Custom agents</strong> let you define specialized behaviors — a security reviewer, a performance optimizer, a documentation writer. Each agent gets its own system prompt, tool access, and MCP server connections.</p></Reveal>
        <Reveal><CodeBlock title=".github/agents/perf-optimizer.agent.md" code={`---
name: perf-optimizer
description: Optimizes performance by benchmarking
  before and after changes.
tools:
  - read
  - edit
  - execute
  - search
---

You are a performance optimization agent.
For every change:
1. Run benchmarks on the current code
2. Make the optimization
3. Run benchmarks again
4. Only open a PR if performance improved
5. Include before/after metrics in the PR body`} /></Reveal>
        <Reveal><p style={styles.prose}>Agent profiles are <strong>markdown files with YAML frontmatter</strong> in <code style={styles.code}>.github/agents/</code>. The frontmatter defines the agent's name, tools, and MCP servers. The markdown body is the system prompt. Use <code style={styles.code}>tools: ["*"]</code> for full access or list specific tools for restricted agents.</p></Reveal>
        <Reveal><p style={styles.prose}>For organization-wide agents, place files in the <code style={styles.code}>agents</code> folder of the org's <code style={styles.code}>.github</code> or <code style={styles.code}>.github-private</code> repository. These apply across all repos in the org — define once, use everywhere.</p></Reveal>
        <Reveal><ComparisonTable headers={['Scope', 'Location']} rows={[
          ['Single repo', '.github/agents/*.agent.md'],
          ['Organization-wide', '{org}/.github/agents/ or {org}/.github-private/agents/'],
          ['Cross-tool instructions', 'AGENTS.md or CLAUDE.md in repo root'],
        ]} /></Reveal>
        <Reveal><p style={styles.prose}>The coding agent also reads <code style={styles.code}>AGENTS.md</code> — a tool-agnostic convention for agent instructions. Since Copilot reads both <code style={styles.code}>AGENTS.md</code> and <code style={styles.code}>CLAUDE.md</code>, teams using multiple AI tools can share instructions without duplication.</p></Reveal>
        <Reveal><TipCallout variant="tip">Custom agents work across Copilot coding agent on github.com, the Copilot CLI, and (coming soon) VS Code. Define them once and they follow you across interfaces.</TipCallout></Reveal>

          <MCQSection color={colors[s1.length + s2.length]} count={s3.length}>
            {s3.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + s2.length + i]} /></Reveal>)}
          </MCQSection>

        <div style={styles.divider}>· · ·</div>

        <Reveal id="set4"><div style={{ ...styles.setLabel, color: C[4] }}>Set 4 — Agent Mode vs Coding Agent</div><h2 style={styles.h2}>The agent spectrum</h2></Reveal>
        <Reveal><p style={styles.prose}>Copilot offers three distinct agent types, each designed for a different workflow. Understanding when to use which is the key skill.</p></Reveal>
        <Reveal><p style={styles.prose}><strong>Agent Mode</strong> (in VS Code, JetBrains, etc.) is synchronous and local. You chat with it, it reads your files, edits code, runs terminal commands — and you guide it in real-time. It inherits your full local environment automatically: your Node version, running databases, environment variables, everything. Think of it as <strong>pair programming with an AI</strong>.</p></Reveal>
        <Reveal><p style={styles.prose}><strong>Background agents</strong> are the middle ground. They run locally on your machine but in a <strong>separate git worktree</strong>, working independently on their own branch. You keep coding in your workspace while the background agent refactors a module or writes migration scripts in parallel. Local environment, no conflicts.</p></Reveal>
        <Reveal><p style={styles.prose}><strong>The cloud coding agent</strong> is fully autonomous and remote. It runs on GitHub Actions infrastructure, needs explicit environment setup via <code style={styles.code}>copilot-setup-steps.yml</code>, and delivers a draft PR when done. No developer needs to open an editor — assign an issue and walk away.</p></Reveal>
        <Reveal><ComparisonTable headers={['', 'Agent Mode', 'Background Agent', 'Cloud Coding Agent']} rows={[
          ['Where it runs', 'Your IDE (local)', 'Your machine (worktree)', 'GitHub Actions (remote)'],
          ['Interaction', 'Synchronous — you guide it', 'Asynchronous — works independently', 'Asynchronous — fully autonomous'],
          ['Environment', 'Inherits local setup', 'Inherits local setup', 'Needs copilot-setup-steps.yml'],
          ['Trigger', 'Chat in editor', 'Chat / delegate', 'Assign issue or chat'],
          ['Delivers', 'Edits in your workspace', 'Branch in worktree', 'Draft pull request'],
          ['Best for', 'Interactive debugging, exploration', 'Parallel local tasks', 'Well-defined issues, no editor needed'],
        ]} /></Reveal>
        <Reveal><TipCallout variant="tip">Use Agent Mode when you need to iterate and explore. Use background agents when you want parallel local work. Use the cloud coding agent for well-defined tasks that don't need your machine or your attention.</TipCallout></Reveal>

          <MCQSection color={colors[s1.length + s2.length + s3.length]} count={s4.length}>
            {s4.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + s2.length + s3.length + i]} /></Reveal>)}
          </MCQSection>

        <div style={styles.divider}>· · ·</div>
        <Reveal id="summary"><div style={styles.endSection}><div style={styles.endLabel}>End of Lesson 16</div>
          <p style={styles.endProse}>You now understand how to invoke the coding agent (issue assignment, VS Code chat, CLI), how it delivers work (draft PRs with session logs), its security model (CodeQL, secret scanning, dependency checks, self-review), how to create custom agents for specialized workflows, and the spectrum from interactive Agent Mode to autonomous cloud coding agent. This completes Module 6: GitHub Copilot.</p>
          <a href="/claude-code-anki/" style={styles.nextBtn}>← Back to Home</a></div></Reveal>
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
