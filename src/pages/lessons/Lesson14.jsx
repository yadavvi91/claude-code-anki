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
const lesson = mod.lessons[2]
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
  { id: 'set1', label: 'Background & Cloud Agents' },
  { id: 'set2', label: 'Hooks' },
  { id: 'set3', label: 'Copilot vs Claude Code' },
  { id: 'set4', label: 'NES & Latest Features' },
  { id: 'summary', label: 'Summary', divider: true },
]

export default function Lesson14() {
  return (
    <div style={styles.page}><NavSidebar sections={NAV_SECTIONS} /><LessonNav moduleTitle="GitHub Copilot" moduleColor={mod.color} prevLink="/copilot/customization" prevLabel="L13: Customization" nextLink="/" nextLabel="Home" />
      <main style={styles.main}>
        <Reveal><div style={styles.lessonLabel}>Lesson 14</div><h1 style={styles.h1}>Advanced Features</h1>
          <p style={styles.subtitle}>Cloud agents, hooks, cross-tool comparison, and the latest Copilot capabilities</p></Reveal>
        <Reveal><ConceptDisplay concept="Cloud Agents · Hooks · NES · Cross-Tool Mapping" description="Beyond local editing: agents that create PRs, hooks that enforce policy, and features that predict your next edit." color={mod.color} /></Reveal>

        <Reveal id="set1"><div style={{ ...styles.setLabel, color: C[1] }}>Set 1 — Background & Cloud Agents</div><h2 style={styles.h2}>Agents beyond your local editor</h2></Reveal>
        <Reveal><p style={styles.prose}>Copilot has <strong>four agent types</strong>. The <strong>local agent</strong> runs in your VS Code (what you've used so far). The <strong>background agent</strong> runs in a separate git worktree so you can keep working. The <strong>cloud agent</strong> runs on GitHub's infrastructure and creates PRs. <strong>Sub-agents</strong> are spawned by other agents to handle subtasks.</p></Reveal>
        <Reveal><ComparisonTable headers={['Agent Type', 'Where It Runs', 'Output']} rows={[
          ['Local', 'Your VS Code', 'Direct workspace changes'],
          ['Background', 'Local git worktree', 'Changes on a separate branch'],
          ['Cloud', 'GitHub servers', 'Pull request'],
          ['Sub-agent', 'Spawned by parent', 'Results returned to parent'],
        ]} /></Reveal>
        <Reveal><p style={styles.prose}>Background agents use <strong>git worktrees</strong> — lightweight separate working directories on different branches that share the same repo. You keep editing on your branch while the background agent works independently on its own.</p></Reveal>
        <Reveal><p style={styles.prose}>Cloud agents need a <strong><code style={styles.code}>copilot-setup-steps.yml</code></strong> file — a GitHub Actions workflow that tells the cloud environment how to set up dependencies, build the project, and prepare for the agent's work.</p></Reveal>
        <Reveal><TipCallout variant="tip">Use <code style={styles.code}>/delegate</code> to spawn a sub-agent for a subtask while the main agent continues working. This is Copilot's equivalent of Claude Code's subagent system.</TipCallout></Reveal>

          <MCQSection color={colors[0]} count={s1.length}>


            {s1.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[i]} /></Reveal>)}


          </MCQSection>

        <div style={styles.divider}>· · ·</div>

        <Reveal id="set2"><div style={{ ...styles.setLabel, color: C[2] }}>Set 2 — Hooks</div><h2 style={styles.h2}>Intercepting agent actions</h2></Reveal>
        <Reveal><p style={styles.prose}>Copilot hooks are defined in <strong><code style={styles.code}>.github/hooks/hooks.json</code></strong>. They let you run shell commands at specific points in the agent's workflow — <strong>6 event types</strong> covering before and after tool execution, among other lifecycle points.</p></Reveal>
        <Reveal><CodeBlock title=".github/hooks/hooks.json" code={`{
  "hooks": [
    {
      "event": "preToolUse",
      "tool": "execute",
      "command": "node .github/hooks/validate-command.js",
      "timeout": 5000
    },
    {
      "event": "postToolUse",
      "tool": "edit",
      "command": "node .github/hooks/lint-check.js"
    }
  ]
}`} /></Reveal>
        <Reveal><p style={styles.prose}>The <strong><code style={styles.code}>preToolUse</code></strong> hook is uniquely powerful: it can <strong>block a tool from executing</strong>. Use this to enforce policies — prevent writes to protected directories, block dangerous commands, or require approval for certain operations.</p></Reveal>
        <Reveal><p style={styles.prose}>Hooks communicate via <strong>JSON on stdin/stdout</strong>. They receive event context as a JSON payload on stdin and return a JSON response on stdout. A timeout config prevents hung hooks from blocking the agent indefinitely.</p></Reveal>

          <MCQSection color={colors[s1.length]} count={s2.length}>


            {s2.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + i]} /></Reveal>)}


          </MCQSection>

        <div style={styles.divider}>· · ·</div>

        <Reveal id="set3"><div style={{ ...styles.setLabel, color: C[3] }}>Set 3 — Copilot vs Claude Code</div><h2 style={styles.h2}>Mapping concepts across tools</h2></Reveal>
        <Reveal><p style={styles.prose}>Copilot and Claude Code solve the same problems with remarkably similar designs — just in different directories with different naming conventions. Understanding the mapping makes you effective in both tools.</p></Reveal>
        <Reveal><ComparisonTable headers={['Concept', 'GitHub Copilot', 'Claude Code']} rows={[
          ['Instructions', '.github/copilot-instructions.md', 'CLAUDE.md'],
          ['Custom Agents', '.github/agents/*.agent.md', '.claude/agents/*.md'],
          ['Hooks Config', '.github/hooks/hooks.json', '.claude/settings.json'],
          ['MCP Config', '.vscode/mcp.json', '.claude/settings.json or ~/.claude.json'],
          ['Tool Aliases', 'execute, read, edit, search', 'Bash, Read, Edit, Grep'],
        ]} /></Reveal>
        <Reveal><p style={styles.prose}>The key philosophical difference: Copilot centralizes configuration in <strong><code style={styles.code}>.github/</code></strong> (leveraging the existing GitHub ecosystem), while Claude Code uses <strong><code style={styles.code}>.claude/</code></strong> and <strong><code style={styles.code}>CLAUDE.md</code></strong> (self-contained, tool-specific).</p></Reveal>
        <Reveal><TipCallout variant="tip">If your team uses both tools, put shared coding standards in <strong>CLAUDE.md</strong> (both tools read it) and tool-specific config in their respective directories.</TipCallout></Reveal>

          <MCQSection color={colors[s1.length + s2.length]} count={s3.length}>


            {s3.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + s2.length + i]} /></Reveal>)}


          </MCQSection>

        <div style={styles.divider}>· · ·</div>

        <Reveal id="set4"><div style={{ ...styles.setLabel, color: C[4] }}>Set 4 — Next Edit Suggestions & Latest Features</div><h2 style={styles.h2}>The cutting edge</h2></Reveal>
        <Reveal><p style={styles.prose}><strong>Next Edit Suggestions (NES)</strong> goes beyond autocomplete: it predicts not just <em>what</em> code to write, but <em>where</em> you'll want to edit next. It jumps you to the predicted location and shows a suggested change. Press <strong>Tab</strong> to accept — the same interaction as inline completions.</p></Reveal>
        <Reveal><p style={styles.prose}>VS Code 1.112+ brought several major improvements:</p></Reveal>
        <Reveal><ComparisonTable headers={['Feature', 'What It Does']} rows={[
          ['Browser debugging', 'Agent mode reads console logs and runtime errors from the browser'],
          ['MCP sandboxing', 'MCP servers run in isolated processes for security'],
          ['Monorepo support', 'Understands package boundaries and cross-package relationships'],
          ['/troubleshoot', 'Diagnoses Copilot configuration and setup issues'],
        ]} /></Reveal>
        <Reveal><p style={styles.prose}>Browser debugging is particularly impactful: Agent mode can now observe runtime errors from your web app and self-correct — closing the loop between "the code looks right" and "the code actually works in the browser."</p></Reveal>

          <MCQSection color={colors[s1.length + s2.length + s3.length]} count={s4.length}>


            {s4.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + s2.length + s3.length + i]} /></Reveal>)}


          </MCQSection>

        <div style={styles.divider}>· · ·</div>
        <Reveal id="summary"><div style={styles.endSection}><div style={styles.endLabel}>End of Lesson 14</div>
          <p style={styles.endProse}>You now understand the four agent types (local, background, cloud, sub-agent), how hooks enforce policy, the concept mapping between Copilot and Claude Code, and the latest features like NES and browser debugging. This completes Module 6: GitHub Copilot.</p>
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
