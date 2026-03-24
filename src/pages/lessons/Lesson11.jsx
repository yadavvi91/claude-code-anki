import { modules } from '../../data/cardSets'
import MCQCard from '../../components/MCQCard'
import Reveal from '../../components/Reveal'
import LessonNav from '../../components/LessonNav'
import ConceptDisplay from '../../components/ConceptDisplay'
import ComparisonTable from '../../components/ComparisonTable'
import TipCallout from '../../components/TipCallout'
import { T } from '../../theme'

const mod = modules[4]
const lesson = mod.lessons[1]
const sets = lesson.cardSets
const C = T.setColor
const palette = [C[1], C[2], C[3], C[4], C[5], C[6]]
let ci = 0; function nc() { return palette[ci++ % 6] }
const allCards = sets.flatMap(s => s.cards)
const colors = allCards.map(() => nc())
const s1 = sets[0].cards
const s2 = sets[1].cards

export default function Lesson11() {
  return (
    <div style={styles.page}><LessonNav moduleTitle="Subagents" moduleColor={mod.color} prevLink="/subagents/mechanics" prevLabel="L10: Mechanics" nextLink="/interlude/3" nextLabel="Interlude 3" />
      <main style={styles.main}>
        <Reveal><div style={styles.lessonLabel}>Lesson 11</div><h1 style={styles.h1}>Effective Subagent Design</h1>
          <p style={styles.subtitle}>Four design patterns, when subagents shine, and three anti-patterns to avoid</p></Reveal>
        <Reveal><ConceptDisplay concept="Structured Output · Obstacle Reporting · Tool Limits · Fresh Perspective" description="Good subagents have clear stopping criteria, surface workarounds, and limit their own tools." color={mod.color} /></Reveal>

        <Reveal><div style={{ ...styles.setLabel, color: C[1] }}>Set 1 — Design Patterns</div><h2 style={styles.h2}>Four characteristics of effective subagents</h2></Reveal>
        <Reveal><p style={styles.prose}>The <strong>description field serves a dual role</strong>: it controls when a subagent triggers AND shapes the input prompt the main agent writes when launching it. A generic description produces vague task prompts. A specific description like "tell the agent precisely which files to review" makes the main agent write much better instructions.</p></Reveal>
        <Reveal><p style={styles.prose}>Defining a <strong>structured output format</strong> is called "the single most important improvement." Without it, subagents struggle to decide when enough research is done. A template (Summary → Critical Issues → Major Issues → Recommendations → Obstacles) creates natural stopping points.</p></Reveal>
        <Reveal><p style={styles.prose}>Always include an <strong>"Obstacles Encountered"</strong> section. When a subagent discovers workarounds, the main thread needs to know — otherwise it wastes time and tokens rediscovering the same solutions. Surface: setup issues, workarounds, commands needing special flags, dependency problems.</p></Reveal>
        <Reveal><p style={styles.prose}>Finally, <strong>limit tool access</strong> to only what the subagent needs. A research agent: Glob, Grep, Read only. A code reviewer: add Bash for git diff, but NOT Edit/Write. A styling agent: Edit and Write because its job is to change code.</p></Reveal>
        {s1.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[i]} /></Reveal>)}

        <div style={styles.divider}>· · ·</div>

        <Reveal><div style={{ ...styles.setLabel, color: C[2] }}>Set 2 — When to Use (and Avoid) Subagents</div><h2 style={styles.h2}>The decision framework</h2></Reveal>
        <Reveal><p style={styles.prose}>The core question: <strong>"Does the intermediate work matter?"</strong> If you just need the result (research findings, review feedback), delegate to a subagent. If you need to see and react to intermediate steps, keep it in the main thread.</p></Reveal>
        <Reveal><ComparisonTable headers={['Use Subagents For', 'Avoid Subagents For']} rows={[
          ['Research & exploration (classic use case)', '"Expert" personas — Claude already has the knowledge'],
          ['Code reviews (fresh perspective, no creation bias)', 'Sequential pipelines — info gets lost in handoffs'],
          ['Tasks needing custom system prompts (copywriting, styling)', 'Test runners — hide output you need for debugging'],
        ]} /></Reveal>
        <Reveal><p style={styles.prose}>Code reviews deserve special mention: Claude reviews more effectively when code is presented as written by <em>someone else</em>. If the main thread built the feature, asking it to review produces weak feedback — it has trouble seeing its own work critically. A reviewer subagent has fresh eyes.</p></Reveal>
        <Reveal><TipCallout variant="warning"><strong>Test runner subagents performed worst</strong> among all configurations in testing. When tests fail, you need the full output. A subagent returning "tests failed" forces creating debug scripts for details that were visible in direct output.</TipCallout></Reveal>
        {s2.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + i]} /></Reveal>)}

        <div style={styles.divider}>· · ·</div>
        <Reveal><div style={styles.endSection}><div style={styles.endLabel}>End of Lesson 11</div>
          <p style={styles.endProse}>You now know the four design patterns for effective subagents, when to use them (research, reviews, custom prompts), and the three anti-patterns to avoid (expert claims, pipelines, test runners). This completes Module 5: Subagents.</p>
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
  divider: { textAlign: 'center', color: T.color.bg3, fontSize: '1rem', margin: '3rem 0', letterSpacing: '0.5em' },
  endSection: { textAlign: 'center', padding: '2rem 0' },
  endLabel: { fontFamily: T.font.label, fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.color.ink4, marginBottom: '1.5rem' },
  endProse: { fontFamily: T.font.prose, fontSize: '1rem', lineHeight: 1.8, color: T.color.ink3, marginBottom: '1rem', maxWidth: '55ch', marginLeft: 'auto', marginRight: 'auto', textAlign: 'left' },
  nextBtn: { display: 'inline-block', marginTop: '1.5rem', padding: '0.85rem 2.5rem', border: `1px solid ${T.color.accent}`, borderRadius: '4px', fontFamily: T.font.label, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', color: T.color.accent, transition: 'background 0.25s, color 0.25s' },
}
