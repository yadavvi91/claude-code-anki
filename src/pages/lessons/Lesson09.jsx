import { modules } from '../../data/cardSets'
import MCQCard from '../../components/MCQCard'
import Reveal from '../../components/Reveal'
import LessonNav from '../../components/LessonNav'
import NavSidebar from '../../components/NavSidebar'
import ConceptDisplay from '../../components/ConceptDisplay'
import ComparisonTable from '../../components/ComparisonTable'
import TipCallout from '../../components/TipCallout'
import { T } from '../../theme'

const base = '/claude-code-anki/images/'
const mod = modules[3]
const lesson = mod.lessons[1]
const sets = lesson.cardSets
const C = T.setColor
const palette = [C[1], C[2], C[3], C[4], C[5], C[6]]
let ci = 0; function nc() { return palette[ci++ % 6] }
const allCards = sets.flatMap(s => s.cards)
const colors = allCards.map(() => nc())
const s1 = sets[0].cards
const s2 = sets[1].cards

const NAV_SECTIONS = [
  { id: 'set1', label: 'Skills vs Other Features' },
  { id: 'set2', label: 'Sharing & Troubleshooting' },
  { id: 'summary', label: 'Summary', divider: true },
]

export default function Lesson09() {
  return (
    <div style={styles.page}><NavSidebar sections={NAV_SECTIONS} /><LessonNav moduleTitle="Agent Skills" moduleColor={mod.color} prevLink="/skills/anatomy" prevLabel="L8: Anatomy" nextLink="/interlude/3" nextLabel="Interlude 3" />
      <main style={styles.main}>
        <Reveal><div style={styles.lessonLabel}>Lesson 9</div><h1 style={styles.h1}>Distribution & Troubleshooting</h1>
          <p style={styles.subtitle}>How skills compare to other Claude Code features, sharing skills, and fixing common problems</p></Reveal>
        <Reveal><ConceptDisplay concept="Skills vs CLAUDE.md · Skills vs Hooks · Skills vs Subagents · Distribution · Debugging" description="Know when to use which feature, how to share skills, and how to fix them when they break." color={mod.color} /></Reveal>

        <Reveal id="set1"><div style={{ ...styles.setLabel, color: C[1] }}>Set 1 — Skills vs Other Features</div><h2 style={styles.h2}>Choosing the right tool</h2></Reveal>
        <Reveal>
          <img src={`${base}skills-010.jpg`} alt="Comparing skills with other Claude Code extension mechanisms" style={styles.img} />
        </Reveal>
        <Reveal><p style={styles.prose}>Claude Code has five extension mechanisms. Each serves a different purpose, and a well-configured project typically uses several together. Understanding when to use which is critical.</p></Reveal>
        <Reveal><ComparisonTable headers={['Feature', 'Trigger', 'Purpose', 'Example']} rows={[
          ['CLAUDE.md', 'Always loaded', 'Project-wide standards', '"Never modify the DB schema"'],
          ['Skills', 'Request matching', 'Task-specific expertise', '"How to write PR descriptions"'],
          ['Hooks', 'Event-driven', 'Automated side effects', '"Lint on every file save"'],
          ['Subagents', 'Delegation', 'Isolated execution', '"Review this code in a fresh context"'],
          ['MCP Servers', 'Tool calls', 'External integrations', '"Query the database"'],
        ]} /></Reveal>
        <Reveal><p style={styles.prose}>The key distinction: skills add <strong>knowledge</strong> to the current context. Subagents run in a <strong>separate, isolated</strong> context. Hooks fire on <strong>events</strong>. CLAUDE.md is <strong>always on</strong>. MCP servers provide <strong>external tools</strong>.</p></Reveal>
        <Reveal><TipCallout variant="warning">Subagents do <strong>NOT</strong> automatically inherit skills. Built-in agents (Explorer, Plan, Verify) can't access skills at all. Custom agents need skills listed in their frontmatter: <code style={styles.code}>skills: accessibility-audit, performance-check</code></TipCallout></Reveal>
        {s1.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[i]} /></Reveal>)}

        <div style={styles.divider}>· · ·</div>

        <Reveal id="set2"><div style={{ ...styles.setLabel, color: C[2] }}>Set 2 — Sharing & Troubleshooting</div><h2 style={styles.h2}>Getting skills to others, fixing when they break</h2></Reveal>
        <Reveal>
          <img src={`${base}skills-013.jpg`} alt="Three methods for distributing skills to teams" style={styles.img} />
        </Reveal>
        <Reveal><p style={styles.prose}>There are three ways to distribute skills: <strong>repository commits</strong> (simplest — commit <code style={styles.code}>.claude/skills</code> and anyone who clones gets them), <strong>plugin marketplaces</strong> (for community sharing), and <strong>enterprise managed settings</strong> (admin-deployed, highest priority, org-wide enforcement).</p></Reveal>
        <Reveal>
          <img src={`${base}skills-016.jpg`} alt="Troubleshooting skills with debug mode and validators" style={styles.img} />
        </Reveal>
        <Reveal><p style={styles.prose}>When a skill doesn't trigger, the cause is almost always the description. Claude uses semantic matching, so the request must overlap with the description's meaning. Test with variations of how you actually phrase requests, and add failing keywords to the description.</p></Reveal>
        <Reveal><ComparisonTable headers={['Symptom', 'Fix']} rows={[
          ['Not triggering', 'Improve description, add trigger phrases matching actual phrasing'],
          ['Not loading', 'Check path, file must be SKILL.md (caps) in a named directory'],
          ['Wrong skill used', 'Make descriptions more distinct and specific'],
          ['Being shadowed', 'Check priority hierarchy (Enterprise>Personal>Project>Plugins)'],
          ['Runtime failure', 'Check dependencies, script permissions (chmod +x), forward slashes in paths'],
        ]} /></Reveal>
        <Reveal><TipCallout variant="tip">Run <code style={styles.code}>claude --debug</code> to see loading errors. Also use the skills validator tool to catch structural problems before debugging.</TipCallout></Reveal>
        {s2.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + i]} /></Reveal>)}

        <div style={styles.divider}>· · ·</div>
        <Reveal id="summary"><div style={styles.endSection}><div style={styles.endLabel}>End of Lesson 9</div>
          <p style={styles.endProse}>You now know how skills compare to CLAUDE.md, hooks, subagents, and MCP servers. You can distribute skills via repos, plugins, or enterprise settings, and troubleshoot common issues.</p>
          <a href="/claude-code-anki/interlude/3" style={styles.nextBtn}>Next → Interlude 3: Agents & Skills Reflections</a></div></Reveal>
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
