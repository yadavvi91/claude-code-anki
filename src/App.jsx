import Hero from './components/Hero'
import { ProblemSection, InsightSection } from './components/IntroSections'
import MethodBand from './components/MethodBand'
import BeginDivider from './components/BeginDivider'
import NavSidebar from './components/NavSidebar'
import ModuleOverview from './components/ModuleOverview'
import { T } from './theme'

export default function App() {
  return (
    <div style={styles.page}>
      <NavSidebar />

      <div id="hero"><Hero /></div>
      <div id="problem"><ProblemSection /></div>
      <div id="insight"><InsightSection /></div>
      <div id="method"><MethodBand /></div>

      <BeginDivider
        lessonNumber=""
        title="Start Learning"
        subtitle="Choose a module to begin"
        concepts={['Claude Code', 'MCP', 'Agent Skills', 'Subagents', 'GitHub Copilot']}
      />

      <section id="modules">
        <ModuleOverview />
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
}
