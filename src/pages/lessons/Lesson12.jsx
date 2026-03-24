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
const lesson = mod.lessons[0]
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
  { id: 'set1', label: 'Agent Mode' },
  { id: 'set2', label: 'Edit Mode' },
  { id: 'set3', label: 'Ask Mode' },
  { id: 'set4', label: 'Mode Selection' },
  { id: 'summary', label: 'Summary', divider: true },
]

export default function Lesson12() {
  return (
    <div style={styles.page}><NavSidebar sections={NAV_SECTIONS} /><LessonNav moduleTitle="GitHub Copilot" moduleColor={mod.color} prevLink="/interlude/3" prevLabel="Interlude 3" nextLink="/copilot/customization" nextLabel="L13: Customization" />
      <main style={styles.main}>
        <Reveal><div style={styles.lessonLabel}>Lesson 12</div><h1 style={styles.h1}>Core Modes</h1>
          <p style={styles.subtitle}>Agent, Edit, and Ask — three modes for three different kinds of work</p></Reveal>
        <Reveal><ConceptDisplay concept="Agent Mode · Edit Mode · Ask Mode · Agentic Loop" description="Copilot offers three chat modes with different autonomy levels: full autonomous, user-directed edits, and read-only Q&A." color={mod.color} /></Reveal>

        <Reveal id="set1"><div style={{ ...styles.setLabel, color: C[1] }}>Set 1 — Agent Mode</div><h2 style={styles.h2}>Autonomous, multi-step execution</h2></Reveal>
        <Reveal><p style={styles.prose}>Agent mode is GitHub Copilot's most powerful mode. You describe a task in natural language and the agent <strong>plans a solution, edits files, runs terminal commands, reads the output, and iterates</strong> until the task is complete — all without requiring your intervention at each step.</p></Reveal>
        <Reveal><p style={styles.prose}>The <strong>agentic loop</strong> is the same pattern you've seen in Claude Code: Plan → Act → Observe → Iterate. The agent calls tools (file reads, edits, terminal commands), checks results, and self-corrects when something fails. Open it with <code style={styles.code}>Ctrl+Alt+I</code> (or <code style={styles.code}>Cmd+Alt+I</code> on Mac).</p></Reveal>
        <Reveal><ComparisonTable headers={['Permission Level', 'Behavior']} rows={[
          ['Default', 'Asks for approval on every tool call'],
          ['Bypass', 'Pre-approves specific tools (e.g., file edits)'],
          ['Autopilot', 'All tool calls proceed without asking'],
        ]} /></Reveal>
        <Reveal><TipCallout variant="tip">Start with <strong>Default</strong> permissions to understand what the agent does, then move to Bypass or Autopilot once you trust the workflow.</TipCallout></Reveal>
        {s1.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[i]} /></Reveal>)}

        <div style={styles.divider}>· · ·</div>

        <Reveal id="set2"><div style={{ ...styles.setLabel, color: C[2] }}>Set 2 — Edit Mode</div><h2 style={styles.h2}>User-directed, targeted changes</h2></Reveal>
        <Reveal><p style={styles.prose}>Edit mode sits between Agent and Ask: it can <strong>modify files</strong> but <strong>cannot run terminal commands</strong>. You direct it — "rename this variable," "add error handling here," "extract this into a function" — and it shows inline diffs for you to accept or reject.</p></Reveal>
        <Reveal><p style={styles.prose}>This mode shines for <strong>surgical edits in brownfield codebases</strong> where you know exactly what needs to change and don't want an autonomous agent exploring on its own. You stay in control of each change.</p></Reveal>
        <Reveal><ComparisonTable headers={['Capability', 'Agent Mode', 'Edit Mode']} rows={[
          ['Edit files', 'Yes', 'Yes'],
          ['Run terminal commands', 'Yes', 'No'],
          ['Self-correct on errors', 'Yes', 'No'],
          ['User directs each change', 'Optional', 'Always'],
        ]} /></Reveal>
        {s2.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + i]} /></Reveal>)}

        <div style={styles.divider}>· · ·</div>

        <Reveal id="set3"><div style={{ ...styles.setLabel, color: C[3] }}>Set 3 — Ask Mode</div><h2 style={styles.h2}>Read-only comprehension</h2></Reveal>
        <Reveal><p style={styles.prose}>Ask mode is <strong>strictly read-only</strong>. It can explore your codebase, explain how things work, trace call chains, and answer questions — but it <em>never</em> modifies files or runs commands. Zero risk of accidental changes.</p></Reveal>
        <Reveal><p style={styles.prose}>Use it when you're onboarding onto a new codebase, trying to understand an unfamiliar module, or just need an explanation without any side effects. Think of it as having an expert code reader on demand.</p></Reveal>
        <Reveal><TipCallout variant="tip">Ask mode is especially useful when joining a new team. You can ask "How does the payment flow work?" and get an explanation synthesized from across the codebase — much faster than reading files one by one.</TipCallout></Reveal>
        {s3.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + s2.length + i]} /></Reveal>)}

        <div style={styles.divider}>· · ·</div>

        <Reveal id="set4"><div style={{ ...styles.setLabel, color: C[4] }}>Set 4 — Mode Selection</div><h2 style={styles.h2}>Choosing the right mode for the task</h2></Reveal>
        <Reveal><p style={styles.prose}>The general principle: <strong>use the least powerful mode that can accomplish the task</strong>. Ask mode for understanding, Edit mode for precise changes, Agent mode for complex multi-step work. This minimizes risk and maximizes your control.</p></Reveal>
        <Reveal><ComparisonTable headers={['Task', 'Recommended Mode', 'Why']} rows={[
          ['Understand auth flow', 'Ask', 'Pure comprehension, no changes needed'],
          ['Rename variable in 3 files', 'Edit', 'Targeted, user-directed change'],
          ['Add endpoint + tests', 'Agent', 'Multi-step: create, code, run, iterate'],
          ['Scaffold new project', 'Agent', 'Needs file creation + terminal commands'],
        ]} /></Reveal>
        <Reveal><p style={styles.prose}>Copilot's Agent mode and Claude Code's agentic mode share the same fundamental architecture — an LLM-driven loop with tool calls. The difference is in the interface: Copilot runs inside VS Code with GUI diffs, while Claude Code runs in any terminal.</p></Reveal>
        {s4.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + s2.length + s3.length + i]} /></Reveal>)}

        <div style={styles.divider}>· · ·</div>
        <Reveal id="summary"><div style={styles.endSection}><div style={styles.endLabel}>End of Lesson 12</div>
          <p style={styles.endProse}>You now know the three core modes: Agent (autonomous multi-step), Edit (user-directed changes), and Ask (read-only Q&A). The key principle is to match the mode's power to the task's requirements.</p>
          <a href="/claude-code-anki/copilot/customization" style={styles.nextBtn}>Next → Lesson 13: Customization</a></div></Reveal>
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
