import Reveal from '../../components/Reveal'
import LessonNav from '../../components/LessonNav'
import NavSidebar from '../../components/NavSidebar'
import { T } from '../../theme'

const NAV_SECTIONS = [
  { id: 'five-mechanisms', label: 'Five Mechanisms' },
  { id: 'context-window', label: 'Context Window' },
  { id: 'fresh-perspective', label: 'Fresh Perspective' },
  { id: 'anti-patterns', label: 'Anti-Patterns' },
  { id: 'what-remains', label: 'What Remains' },
]

export default function Interlude03() {
  return (
    <div style={styles.page}>
      <NavSidebar sections={NAV_SECTIONS} />
      <LessonNav moduleTitle="Interlude" moduleColor="#14b8a6" prevLink="/subagents/design" prevLabel="L11: Design" nextLink="/copilot/core-modes" nextLabel="L12: Copilot" />
      <main style={styles.main}>
        <Reveal><div style={styles.label}>Interlude 3</div><h1 style={styles.h1}>Agents & Skills Reflections</h1></Reveal>

        <Reveal><p style={styles.prose}>You've now covered both sides of Claude Code's extensibility story: Skills add knowledge on demand, and Subagents provide isolated execution contexts. Together with CLAUDE.md, hooks, and MCP servers, you have a complete toolkit for customizing how Claude works. Let's reflect on the key insights.</p></Reveal>

        <Reveal id="five-mechanisms"><h2 style={styles.h2}>The Five Extension Mechanisms</h2></Reveal>
        <Reveal><p style={styles.prose}>Claude Code now has five distinct ways to extend its behavior, each controlled by a different trigger: CLAUDE.md loads <em>always</em>. Skills load when <em>matched</em>. Hooks fire on <em>events</em>. Subagents activate on <em>delegation</em>. MCP servers provide <em>external tools</em>. A well-configured project typically uses several together.</p></Reveal>
        <Reveal><p style={styles.prose}>The mental model: CLAUDE.md is your constitution (always applies). Skills are your specialists (called when needed). Hooks are your guards (intercept actions). Subagents are your delegates (work independently). MCP servers are your bridges (connect to the outside world).</p></Reveal>

        <Reveal id="context-window"><h2 style={styles.h2}>Context Window as the Central Constraint</h2></Reveal>
        <Reveal><p style={styles.prose}>Every design decision in this ecosystem traces back to one constraint: the context window is finite. Skills use semantic matching so only relevant knowledge loads. Subagents spin up separate contexts so exploratory work doesn't clutter the main thread. Progressive disclosure keeps SKILL.md small and loads references on demand.</p></Reveal>
        <Reveal><p style={styles.prose}>This is why the "tell Claude to <em>run</em> scripts, not <em>read</em> them" advice matters — running puts only the output in context, reading puts the entire source code. Every token saved is a token available for actual work.</p></Reveal>

        <Reveal id="fresh-perspective"><h2 style={styles.h2}>The Fresh Perspective Principle</h2></Reveal>
        <Reveal><p style={styles.prose}>One of the most surprising findings from the subagents module: Claude reviews its own code poorly. When the main thread builds a feature and then reviews it, it has trouble seeing problems — it was involved in creating the code. A reviewer subagent sees changes in a separate context with zero creation history, producing genuinely critical feedback.</p></Reveal>
        <Reveal><p style={styles.prose}>This generalizes beyond code review. Any time you need an unbiased assessment, a fresh context helps. The subagent has no sunk cost, no attachment to prior decisions, no context about why shortcuts were taken. It just sees what's there.</p></Reveal>

        <Reveal id="anti-patterns"><h2 style={styles.h2}>Anti-Patterns Worth Remembering</h2></Reveal>
        <Reveal><p style={styles.prose}><strong>"Expert" subagents</strong> that claim domain expertise add nothing — Claude already has that knowledge. <strong>Sequential pipelines</strong> lose information at each handoff. <strong>Test runner subagents</strong> hide the output you need most. The common thread: subagents work when you want isolation and a summary, not when you need the full picture.</p></Reveal>
        <Reveal><p style={styles.prose}>Similarly, skills that don't trigger are almost always a description problem, not a code problem. The fix is always the same: make the description match how you actually phrase requests.</p></Reveal>

        <Reveal id="what-remains"><h2 style={styles.h2}>What Remains</h2></Reveal>
        <Reveal><p style={styles.prose}>Module 6 (GitHub Copilot) is still in development. When complete, it will cover Copilot's modes (Agent, Edit, Ask), inline features, custom instructions, and how Claude Code integrates with VS Code. The patterns you've learned — context management, tool selection, extension mechanisms — apply directly.</p></Reveal>

        <Reveal><div style={styles.nav}><a href="/claude-code-anki/" style={styles.nextBtn}>← Back to Home</a></div></Reveal>
      </main>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: T.color.bg },
  main: { maxWidth: '720px', margin: '0 auto', padding: '2rem 1.5rem 6rem' },
  label: { fontFamily: T.font.label, fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.color.ink4, marginBottom: '0.75rem' },
  h1: { fontFamily: T.font.heading, fontSize: '2.4rem', fontWeight: 700, color: T.color.ink, lineHeight: 1.15, marginBottom: '2rem' },
  h2: { fontFamily: T.font.heading, fontSize: '1.4rem', fontWeight: 600, color: T.color.ink2, lineHeight: 1.3, marginBottom: '1rem', marginTop: '2rem' },
  prose: { fontFamily: T.font.prose, fontSize: '1.05rem', lineHeight: 1.85, color: T.color.ink3, marginBottom: '1.4rem', maxWidth: '65ch' },
  code: { fontFamily: T.font.code, fontSize: '0.85em', background: 'rgba(99,102,241,0.08)', padding: '0.15em 0.4em', borderRadius: '3px', color: T.color.accent },
  nav: { textAlign: 'center', marginTop: '3rem' },
  nextBtn: { display: 'inline-block', padding: '0.85rem 2.5rem', border: `1px solid ${T.color.accent}`, borderRadius: '4px', fontFamily: T.font.label, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', color: T.color.accent },
}
