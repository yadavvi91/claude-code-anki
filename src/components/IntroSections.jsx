import Reveal from './Reveal'
import { T } from '../theme'

const prose  = { fontFamily: T.font.prose, fontSize: '1.05rem', lineHeight: 1.85, color: T.color.ink3, marginBottom: '1.2rem', maxWidth: '65ch' }
const label  = { fontFamily: T.font.label, fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: T.color.accent, marginBottom: '1rem' }
const h2     = { fontFamily: T.font.heading, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 600, color: T.color.ink2, lineHeight: 1.25, marginBottom: '1.5rem' }
const section = { padding: '3rem 2rem', maxWidth: '900px', margin: '0 auto' }
const pullQuote = {
  padding: '2rem 2.5rem', borderLeft: `4px solid ${T.color.accent}`,
  margin: '2.5rem 0', background: T.color.bg2, borderRadius: '0 8px 8px 0',
}
const pullQuoteText = { fontFamily: T.font.prose, fontSize: '1.15rem', fontStyle: 'italic', color: T.color.ink2, lineHeight: 1.7, margin: 0 }

// ─── THE PROBLEM ───
export function ProblemSection() {
  return (
    <div style={{ background: T.color.bg }}>
      <div style={section}>
        <Reveal><div style={label}>The Problem</div></Reveal>
        <Reveal><h2 style={h2}>AI tools are powerful.<br />But overwhelming to learn.</h2></Reveal>

        <Reveal><p style={prose}>
          Claude Code has 7+ tools, planning modes, hooks, custom commands, MCP servers,
          and subagents. GitHub Copilot adds agent mode, edit mode, ask mode, background
          agents, and custom instructions. Each tool has specific strengths and gotchas.
        </p></Reveal>

        <Reveal><p style={prose}>
          You took the courses. You understood them in the moment. But a week later,
          the details blur — which tool for which task? What goes in CLAUDE.md vs
          SKILL.md? When to use a subagent vs a direct tool call?
        </p></Reveal>

        <Reveal>
          <div style={pullQuote}>
            <p style={pullQuoteText}>
              Knowledge without retention is just entertainment.
              Spaced repetition turns understanding into permanent skill.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  )
}

// ─── THE INSIGHT ───
const stats = [
  { value: '5', label: 'Courses', desc: 'Anthropic SkillJar courses distilled into cards' },
  { value: '6', label: 'Modules', desc: 'Claude Code, MCP, MCP Advanced, Skills, Subagents, Copilot' },
  { value: '14', label: 'Lessons', desc: 'Each a Quantum Country-style essay with embedded cards' },
  { value: '280+', label: 'Cards', desc: 'MCQ cards with detailed feedback, tracked by SM-2 SRS' },
]

export function InsightSection() {
  return (
    <div style={{ background: T.color.bg }}>
      <div style={{ ...section, paddingTop: 0 }}>
        <Reveal><div style={label}>The Insight</div></Reveal>
        <Reveal><h2 style={h2}>Read. Practice. Review. Remember.</h2></Reveal>

        <Reveal><p style={prose}>
          This platform combines long-form prose (so you understand <em>why</em>) with
          multiple-choice cards (so you <em>prove</em> you understand) and SM-2 spaced
          repetition (so you <em>remember</em>). The same approach that powers Quantum
          Country and Anki — applied to AI development tools.
        </p></Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', margin: '2.5rem 0' }}>
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div style={statCard}>
                <div style={{ fontFamily: T.font.heading, fontSize: '2rem', fontWeight: 700, color: T.color.accent, lineHeight: 1, marginBottom: '0.35rem' }}>{s.value}</div>
                <div style={{ fontFamily: T.font.label, fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.color.ink2, marginBottom: '0.3rem' }}>{s.label}</div>
                <div style={{ fontFamily: T.font.prose, fontSize: '0.82rem', color: T.color.ink4, lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}

const statCard = {
  padding: '1.25rem',
  background: T.color.bg2,
  border: `1px solid ${T.color.border}`,
  borderTop: `3px solid ${T.color.accent}`,
  borderRadius: '0 0 8px 8px',
}
