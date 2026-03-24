import Reveal from './Reveal'
import { T } from '../theme'

const prose  = { fontFamily: T.font.prose, fontSize: '1.05rem', lineHeight: 1.85, color: T.color.ink3, marginBottom: '1.2rem', maxWidth: '65ch' }
const label  = { fontFamily: T.font.label, fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: T.color.accent, marginBottom: '1rem' }
const h2     = { fontFamily: T.font.heading, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 600, color: T.color.ink2, lineHeight: 1.25, marginBottom: '1.5rem' }
const section = { padding: '2rem 2rem 1.5rem', maxWidth: '900px', margin: '0 auto' }

// ─── THE PROBLEM ───
export function ProblemSection() {
  return (
    <div style={{ background: T.color.bg }}>
      <div style={section}>
        <Reveal><div style={label}>The Problem</div></Reveal>
        <Reveal><h2 style={h2}>AI tools are powerful. But hard to remember.</h2></Reveal>

        <Reveal><p style={prose}>
          Claude Code, MCP, Agent Skills, Subagents, GitHub Copilot — you took the courses,
          understood them in the moment, but a week later the details blur. Spaced repetition fixes that.
        </p></Reveal>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', margin: '0.5rem 0 1.5rem' }}>
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 60}>
              <div style={statCard}>
                <div style={{ fontFamily: T.font.heading, fontSize: '1.8rem', fontWeight: 700, color: T.color.accent, lineHeight: 1, marginBottom: '0.3rem' }}>{s.value}</div>
                <div style={{ fontFamily: T.font.label, fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.color.ink2, marginBottom: '0.25rem' }}>{s.label}</div>
                <div style={{ fontFamily: T.font.prose, fontSize: '0.78rem', color: T.color.ink4, lineHeight: 1.4 }}>{s.desc}</div>
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
