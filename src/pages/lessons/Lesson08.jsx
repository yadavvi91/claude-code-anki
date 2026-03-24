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
const mod = modules[3]
const lesson = mod.lessons[0]
const sets = lesson.cardSets
const C = T.setColor
const palette = [C[1], C[2], C[3], C[4], C[5], C[6]]
let ci = 0; function nc() { return palette[ci++ % 6] }
const allCards = sets.flatMap(s => s.cards)
const colors = allCards.map(() => nc())
const s1 = sets[0].cards
const s2 = sets[1].cards

const NAV_SECTIONS = [
  { id: 'set1', label: 'What Are Skills?' },
  { id: 'set2', label: 'Creating & Configuring' },
  { id: 'summary', label: 'Summary', divider: true },
]

export default function Lesson08() {
  return (
    <div style={styles.page}><NavSidebar sections={NAV_SECTIONS} /><LessonNav moduleTitle="Agent Skills" moduleColor={mod.color} prevLink="/interlude/2" prevLabel="Interlude 2" nextLink="/skills/distribution" nextLabel="L9: Distribution" />
      <main style={styles.main}>
        <Reveal><div style={styles.lessonLabel}>Lesson 8</div><h1 style={styles.h1}>Skill Anatomy</h1>
          <p style={styles.subtitle}>What skills are, how to create them, and how to configure multi-file skills with progressive disclosure</p></Reveal>
        <Reveal><ConceptDisplay concept="SKILL.md · Frontmatter · Semantic Matching · Progressive Disclosure" description="Skills add task-specific expertise that loads on demand, keeping the context window clean." color={mod.color} /></Reveal>

        <Reveal id="set1"><div style={{ ...styles.setLabel, color: C[1] }}>Set 1 — What Are Skills?</div><h2 style={styles.h2}>On-demand expertise</h2></Reveal>
        <Reveal>
          <img src={`${base}skills-002.jpg`} alt="Agent skills providing on-demand expertise" style={styles.img} />
        </Reveal>
        <Reveal><p style={styles.prose}>Imagine you find yourself explaining the same thing to Claude over and over — how your team writes PR descriptions, your code review standards, your commit message format. That repeated explanation is a skill waiting to be written.</p></Reveal>
        <Reveal><p style={styles.prose}>A <strong>skill</strong> is a folder containing a <code style={styles.code}>SKILL.md</code> file with YAML frontmatter (<code style={styles.code}>name</code> and <code style={styles.code}>description</code>) and markdown instructions. Unlike CLAUDE.md which loads into <em>every</em> conversation, skills load <strong>on demand</strong> — only when Claude's semantic matching determines the skill is relevant to your request.</p></Reveal>
        <Reveal><p style={styles.prose}>This is the crucial difference: CLAUDE.md says "always do this." A skill says "know this when it's relevant." Only the name and description consume context initially. The full skill content loads only when activated.</p></Reveal>
        <Reveal><ComparisonTable headers={['Feature', 'Loads', 'Triggered By', 'Best For']} rows={[
          ['CLAUDE.md', 'Every conversation', 'Always', 'Project-wide standards'],
          ['Skills', 'On demand', 'Semantic matching', 'Task-specific expertise'],
          ['Slash commands', 'On invocation', 'User types /command', 'Explicit workflows'],
        ]} /></Reveal>
        <Reveal><p style={styles.prose}>Skills live in two places: <code style={styles.code}>~/.claude/skills</code> for personal skills that follow you across all projects, and <code style={styles.code}>.claude/skills</code> inside a repo for project skills shared with anyone who clones it.</p></Reveal>

          <MCQSection color={colors[0]} count={s1.length}>


            {s1.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[i]} /></Reveal>)}


          </MCQSection>

        <div style={styles.divider}>· · ·</div>

        <Reveal id="set2"><div style={{ ...styles.setLabel, color: C[2] }}>Set 2 — Creating & Configuring Skills</div><h2 style={styles.h2}>From SKILL.md to multi-file skills</h2></Reveal>
        <Reveal>
          <img src={`${base}skills-005.jpg`} alt="SKILL.md file structure with YAML frontmatter" style={styles.img} />
        </Reveal>
        <Reveal><p style={styles.prose}>Creating a skill starts with a directory and a <code style={styles.code}>SKILL.md</code> file inside it. The frontmatter has two required fields: <code style={styles.code}>name</code> (lowercase, hyphens, max 64 chars) and <code style={styles.code}>description</code> (max 1024 chars). The description is the most important field — it's what Claude uses for semantic matching.</p></Reveal>
        <Reveal><CodeBlock title="~/.claude/skills/pr-description/SKILL.md" code={`---
name: pr-description
description: Writes pull request descriptions. Use when
  creating a PR, writing a PR, or when the user asks to
  summarize changes for a pull request.
---

When writing a PR description:
1. Start with a one-line summary
2. List key changes as bullet points
3. Note any breaking changes
4. Include testing instructions`} /></Reveal>
        <Reveal><p style={styles.prose}>When skills have the same name, a priority hierarchy determines which wins: <strong>Enterprise {'>'} Personal {'>'} Project {'>'} Plugins</strong>. Use descriptive names like <code style={styles.code}>frontend-review</code> instead of just <code style={styles.code}>review</code> to avoid conflicts.</p></Reveal>
        <Reveal>
          <img src={`${base}skills-007.jpg`} alt="Progressive disclosure with multi-file skill structure" style={styles.img} />
        </Reveal>
        <Reveal><p style={styles.prose}>For complex skills, use <strong>progressive disclosure</strong>: keep <code style={styles.code}>SKILL.md</code> under 500 lines with essentials, and put detailed references in separate files (<code style={styles.code}>scripts/</code>, <code style={styles.code}>references/</code>, <code style={styles.code}>assets/</code>). Claude reads them only when the specific topic comes up.</p></Reveal>
        <Reveal><TipCallout variant="tip">Tell Claude to <strong>run</strong> scripts, not <strong>read</strong> them. Running only puts the output into context (small). Reading puts the entire source code (large, wasteful).</TipCallout></Reveal>
        <Reveal><p style={styles.prose}>Optional frontmatter: <code style={styles.code}>allowed-tools</code> restricts which tools Claude can use (e.g., read-only for security-sensitive workflows), and <code style={styles.code}>model</code> specifies which Claude model to use.</p></Reveal>

          <MCQSection color={colors[s1.length]} count={s2.length}>


            {s2.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + i]} /></Reveal>)}


          </MCQSection>

        <div style={styles.divider}>· · ·</div>
        <Reveal id="summary"><div style={styles.endSection}><div style={styles.endLabel}>End of Lesson 8</div>
          <p style={styles.endProse}>You now understand what skills are, how to create them with SKILL.md, how semantic matching activates them on demand, how to use multi-file progressive disclosure, and how the priority hierarchy works.</p>
          <a href="/claude-code-anki/skills/distribution" style={styles.nextBtn}>Next → Lesson 9: Distribution & Troubleshooting</a></div></Reveal>
      </main>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: T.color.bg },
  main: { maxWidth: '720px', margin: '0 auto', padding: '2rem 1.5rem 6rem' },
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
