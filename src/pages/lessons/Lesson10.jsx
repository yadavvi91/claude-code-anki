import { modules } from '../../data/cardSets'
import MCQCard from '../../components/MCQCard'
import Reveal from '../../components/Reveal'
import LessonNav from '../../components/LessonNav'
import ConceptDisplay from '../../components/ConceptDisplay'
import CodeBlock from '../../components/CodeBlock'
import ComparisonTable from '../../components/ComparisonTable'
import TipCallout from '../../components/TipCallout'
import { T } from '../../theme'

const mod = modules[4]
const lesson = mod.lessons[0]
const sets = lesson.cardSets
const C = T.setColor
const palette = [C[1], C[2], C[3], C[4], C[5], C[6]]
let ci = 0; function nc() { return palette[ci++ % 6] }
const allCards = sets.flatMap(s => s.cards)
const colors = allCards.map(() => nc())
const s1 = sets[0].cards
const s2 = sets[1].cards

export default function Lesson10() {
  return (
    <div style={styles.page}><LessonNav moduleTitle="Subagents" moduleColor={mod.color} prevLink="/interlude/3" prevLabel="Interlude 3" nextLink="/subagents/design" nextLabel="L11: Design" />
      <main style={styles.main}>
        <Reveal><div style={styles.lessonLabel}>Lesson 10</div><h1 style={styles.h1}>Subagent Mechanics</h1>
          <p style={styles.subtitle}>What subagents are, why they exist, and how to create custom ones</p></Reveal>
        <Reveal><ConceptDisplay concept="Context Isolation · /agents · System Prompt · Proactive Delegation" description="Subagents keep your main context clean by doing exploratory work in isolated windows." color={mod.color} /></Reveal>

        <Reveal><div style={{ ...styles.setLabel, color: C[1] }}>Set 1 — What Are Subagents?</div><h2 style={styles.h2}>Isolated execution contexts</h2></Reveal>
        <Reveal><p style={styles.prose}>Every interaction with Claude Code — tool calls, file reads, search results — adds to the main context window, which is finite. Once it fills up, Claude starts losing track of earlier conversation. This is the fundamental problem subagents solve.</p></Reveal>
        <Reveal><p style={styles.prose}>A <strong>subagent</strong> spins up a separate context window, does its work independently (reads files, runs searches, edits code), and returns <em>only a summary</em> to the main thread. The intermediate steps stay isolated. The subagent context is then discarded.</p></Reveal>
        <Reveal><p style={styles.prose}>The tradeoff: your main context stays clean (you get the answer without the noise), but you lose visibility into how the subagent reached its conclusions.</p></Reveal>
        <Reveal><ComparisonTable headers={['Built-in Subagent', 'Purpose']} rows={[
          ['General purpose', 'Multi-step tasks requiring both exploration and action'],
          ['Explore', 'Fast searching and navigation of codebases'],
          ['Plan', 'Research and analysis before presenting a plan (plan mode)'],
        ]} /></Reveal>
        {s1.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[i]} /></Reveal>)}

        <div style={styles.divider}>· · ·</div>

        <Reveal><div style={{ ...styles.setLabel, color: C[2] }}>Set 2 — Creating Subagents</div><h2 style={styles.h2}>Custom agents for your workflow</h2></Reveal>
        <Reveal><p style={styles.prose}>Use the <code style={styles.code}>/agents</code> slash command to create agents interactively, or write a markdown file directly in <code style={styles.code}>.claude/agents/</code>. Agents can be project-level (current project only) or user-level (all projects).</p></Reveal>
        <Reveal><CodeBlock title=".claude/agents/code-reviewer.md" code={`---
name: code-reviewer
description: Reviews code changes for quality, security,
  and style. Proactively suggest running this agent
  after major code changes.
tools: Bash, Glob, Grep, Read
model: opus
color: blue
---

You are a code reviewer. For each change:
1. Summary: Brief overview and overall assessment
2. Critical Issues: Security, data integrity, logic errors
3. Major Issues: Architecture, performance concerns
4. Minor Issues: Style, documentation gaps
5. Approval Status: Ready to merge or needs changes
6. Obstacles Encountered: Any workarounds discovered`} /></Reveal>
        <Reveal><p style={styles.prose}>The YAML frontmatter defines the agent's identity: <code style={styles.code}>name</code> for identification, <code style={styles.code}>description</code> for triggering, <code style={styles.code}>tools</code> for access control, <code style={styles.code}>model</code> (haiku/sonnet/opus/inherit), and <code style={styles.code}>color</code> for UI identification. The markdown body below the frontmatter is the system prompt.</p></Reveal>
        <Reveal><TipCallout variant="tip">Include <strong>"proactively"</strong> in the description to make Claude suggest using the subagent automatically. Add example conversations for more specific triggering.</TipCallout></Reveal>
        {s2.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + i]} /></Reveal>)}

        <div style={styles.divider}>· · ·</div>
        <Reveal><div style={styles.endSection}><div style={styles.endLabel}>End of Lesson 10</div>
          <p style={styles.endProse}>You now understand what subagents are, why context isolation matters, the three built-in types, and how to create custom agents with frontmatter configuration.</p>
          <a href="/claude-code-anki/subagents/design" style={styles.nextBtn}>Next → Lesson 11: Effective Subagent Design</a></div></Reveal>
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
  divider: { textAlign: 'center', color: T.color.bg3, fontSize: '1rem', margin: '3rem 0', letterSpacing: '0.5em' },
  endSection: { textAlign: 'center', padding: '2rem 0' },
  endLabel: { fontFamily: T.font.label, fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.color.ink4, marginBottom: '1.5rem' },
  endProse: { fontFamily: T.font.prose, fontSize: '1rem', lineHeight: 1.8, color: T.color.ink3, marginBottom: '1rem', maxWidth: '55ch', marginLeft: 'auto', marginRight: 'auto', textAlign: 'left' },
  nextBtn: { display: 'inline-block', marginTop: '1.5rem', padding: '0.85rem 2.5rem', border: `1px solid ${T.color.accent}`, borderRadius: '4px', fontFamily: T.font.label, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', color: T.color.accent, transition: 'background 0.25s, color 0.25s' },
}
