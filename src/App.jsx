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

      <section id="resources" style={styles.resourcesSection}>
        <Reveal>
          <div style={styles.resourcesInner}>
            <span style={styles.compareLabel}>Online Resources</span>
            <p style={styles.resourcesProse}>
              Keep a cheat sheet handy while you work. The <a href="https://cc.storyfox.cz/" target="_blank" rel="noopener noreferrer" style={styles.resourceLink}>Claude Code Cheat Sheet</a> covers keyboard shortcuts, MCP servers, slash commands, skills & agents, CLI flags, and more — updated to v2.1.
            </p>
          </div>
        </Reveal>
      </section>

      <section id="sitemap" style={styles.sitemapSection}>
        <Reveal>
          <div style={styles.sitemapInner}>
            <span style={styles.compareLabel}>Site Map</span>
            <div style={styles.sitemapGrid}>
              <div style={styles.sitemapCol}>
                <div style={{ ...styles.sitemapModTitle, color: '#6366f1' }}>Module 1 — Claude Code Fundamentals</div>
                <Link to="/claude-code/architecture" style={styles.sitemapLink}>L1: Architecture & Tools</Link>
                <Link to="/claude-code/planning" style={styles.sitemapLink}>L2: Context, Planning & Commands</Link>
                <Link to="/claude-code/mcp-github" style={styles.sitemapLink}>L3: MCP Integration & GitHub</Link>
                <Link to="/claude-code/agent-loop" style={styles.sitemapLink}>L15: The Agent Loop</Link>
                <Link to="/interlude/1" style={styles.sitemapInterlude}>Interlude 1</Link>
              </div>
              <div style={styles.sitemapCol}>
                <div style={{ ...styles.sitemapModTitle, color: '#8b5cf6' }}>Module 2 — MCP Fundamentals</div>
                <Link to="/mcp/architecture" style={styles.sitemapLink}>L4: MCP Architecture & Servers</Link>
                <Link to="/mcp/resources-prompts" style={styles.sitemapLink}>L5: Resources, Prompts & Patterns</Link>
              </div>
              <div style={styles.sitemapCol}>
                <div style={{ ...styles.sitemapModTitle, color: '#ec4899' }}>Module 3 — MCP Advanced</div>
                <Link to="/mcp-advanced/sampling" style={styles.sitemapLink}>L6: Sampling, Progress & Security</Link>
                <Link to="/mcp-advanced/transports" style={styles.sitemapLink}>L7: Transports & Production</Link>
                <Link to="/interlude/2" style={styles.sitemapInterlude}>Interlude 2</Link>
              </div>
              <div style={styles.sitemapCol}>
                <div style={{ ...styles.sitemapModTitle, color: '#f59e0b' }}>Module 4 — Agent Skills</div>
                <Link to="/skills/anatomy" style={styles.sitemapLink}>L8: Skill Anatomy</Link>
                <Link to="/skills/distribution" style={styles.sitemapLink}>L9: Distribution & Troubleshooting</Link>
              </div>
              <div style={styles.sitemapCol}>
                <div style={{ ...styles.sitemapModTitle, color: '#14b8a6' }}>Module 5 — Subagents</div>
                <Link to="/subagents/mechanics" style={styles.sitemapLink}>L10: Subagent Mechanics</Link>
                <Link to="/subagents/design" style={styles.sitemapLink}>L11: Effective Design</Link>
                <Link to="/interlude/3" style={styles.sitemapInterlude}>Interlude 3</Link>
              </div>
              <div style={styles.sitemapCol}>
                <div style={{ ...styles.sitemapModTitle, color: '#3b82f6' }}>Module 6 — GitHub Copilot</div>
                <Link to="/copilot/core-modes" style={styles.sitemapLink}>L12: Core Modes</Link>
                <Link to="/copilot/customization" style={styles.sitemapLink}>L13: Customization</Link>
                <Link to="/copilot/cloud-agents" style={styles.sitemapLink}>L14: Advanced Features</Link>
                <Link to="/copilot/coding-agent" style={styles.sitemapLink}>L16: The Coding Agent</Link>
              </div>
              <div style={styles.sitemapCol}>
                <div style={{ ...styles.sitemapModTitle, color: T.color.ink3 }}>Reference</div>
                <Link to="/comparison" style={styles.sitemapLink}>Claude Code vs GitHub Copilot</Link>
                <Link to="/review" style={styles.sitemapLink}>Review & Practice</Link>
                <a href="https://cc.storyfox.cz/" target="_blank" rel="noopener noreferrer" style={styles.sitemapLink}>Claude Code Cheat Sheet ↗</a>
              </div>
            </div>
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
  resourcesSection: {
    padding: '2rem 2rem 1.5rem',
    borderTop: `1px solid ${T.color.border}`,
  },
  resourcesInner: {
    maxWidth: '640px',
    margin: '0 auto',
    textAlign: 'center',
  },
  resourcesProse: {
    fontFamily: T.font.prose,
    fontSize: '0.9rem',
    color: T.color.ink3,
    lineHeight: 1.6,
    marginTop: '0.5rem',
  },
  resourceLink: {
    color: T.color.accent,
    textDecoration: 'none',
    fontWeight: 500,
  },
  sitemapSection: {
    padding: '2.5rem 2rem 2rem',
    borderTop: `1px solid ${T.color.border}`,
    background: T.color.bg2,
  },
  sitemapInner: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  sitemapGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '1.5rem 2rem',
    marginTop: '1.25rem',
  },
  sitemapCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
  },
  sitemapModTitle: {
    fontFamily: T.font.label,
    fontSize: '0.55rem',
    fontWeight: 700,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    marginBottom: '0.25rem',
  },
  sitemapLink: {
    fontFamily: T.font.prose,
    fontSize: '0.85rem',
    color: T.color.ink3,
    textDecoration: 'none',
    lineHeight: 1.5,
  },
  sitemapInterlude: {
    fontFamily: T.font.prose,
    fontSize: '0.8rem',
    color: T.color.ink4,
    textDecoration: 'none',
    fontStyle: 'italic',
    lineHeight: 1.5,
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
