import { Link } from 'react-router-dom'
import Hero from './components/Hero'
import { ProblemSection, InsightSection } from './components/IntroSections'
import MethodBand from './components/MethodBand'
import NavSidebar from './components/NavSidebar'
import ModuleOverview from './components/ModuleOverview'
import Reveal from './components/Reveal'
import { T } from './theme'

export default function App() {
  return (
    <div style={styles.page}>
      <NavSidebar />

      <div id="hero"><Hero /></div>
      <div id="problem"><ProblemSection /></div>
      <div id="insight"><InsightSection /></div>
      <div id="method"><MethodBand /></div>

      <section id="modules">
        <ModuleOverview />
      </section>

      <section id="compare" style={styles.compareSection}>
        <Reveal>
          <div style={styles.compareInner}>
            <span style={styles.compareLabel}>Reference</span>
            <h2 style={styles.compareH2}>Claude Code vs GitHub Copilot</h2>
            <p style={styles.compareProse}>Side-by-side comparison of directory structures, instructions, agents, skills, hooks, MCP config, and workflow modes.</p>
            <Link to="/comparison" style={styles.compareBtn}>Open Comparison Guide →</Link>
          </div>
        </Reveal>
      </section>

      <footer style={styles.footer}>
        <p style={styles.footerText}>
          Built with spaced repetition &middot; Powered by SM-2 algorithm
        </p>
      </footer>
    </div>
  )
}

const styles = {
  page: {
    background: T.color.bg,
    minHeight: '100vh',
    color: T.color.ink,
  },

  footer: {
    textAlign: 'center',
    padding: '3rem 2rem',
    borderTop: `1px solid ${T.color.border}`,
  },

  footerText: {
    fontFamily: T.font.prose,
    fontSize: '0.85rem',
    color: T.color.ink4,
  },

  compareSection: {
    padding: '2.5rem 2rem',
    background: T.color.bg2,
    borderTop: `1px solid ${T.color.border}`,
  },
  compareInner: {
    maxWidth: '640px',
    margin: '0 auto',
    textAlign: 'center',
  },
  compareLabel: {
    fontFamily: T.font.label,
    fontSize: '0.6rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: T.color.ink4,
  },
  compareH2: {
    fontFamily: T.font.heading,
    fontSize: '1.4rem',
    fontWeight: 600,
    color: T.color.ink2,
    margin: '0.5rem 0',
  },
  compareProse: {
    fontFamily: T.font.prose,
    fontSize: '0.95rem',
    color: T.color.ink3,
    lineHeight: 1.6,
    marginBottom: '1.25rem',
  },
  compareBtn: {
    display: 'inline-block',
    padding: '0.7rem 2rem',
    border: `1px solid ${T.color.accent}`,
    borderRadius: '4px',
    fontFamily: T.font.label,
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: T.color.accent,
  },
}
