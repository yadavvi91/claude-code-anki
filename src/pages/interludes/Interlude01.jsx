import Reveal from '../../components/Reveal'
import LessonNav from '../../components/LessonNav'
import { T } from '../../theme'

export default function Interlude01() {
  return (
    <div style={styles.page}>
      <LessonNav moduleTitle="Interlude" moduleColor="#6366f1" prevLink="/claude-code/mcp-github" prevLabel="L3: MCP & GitHub" nextLink="/mcp/architecture" nextLabel="L4: MCP Architecture" />
      <main style={styles.main}>
        <Reveal><div style={styles.label}>Interlude 1</div><h1 style={styles.h1}>Claude Code Reflections</h1></Reveal>

        <Reveal><p style={styles.prose}>You've now covered the entire Claude Code fundamentals module — from the multi-tool architecture through context management, hooks, and the SDK. Before moving to MCP, let's step back and consider what ties it all together.</p></Reveal>

        <Reveal><h2 style={styles.h2}>The Tool Use Insight</h2></Reveal>
        <Reveal><p style={styles.prose}>The most fundamental idea in this module is deceptively simple: language models can only process text and return text. They can't actually read files or run commands. Everything Claude Code does — reading your codebase, editing files, running tests — happens through a tool use layer that translates Claude's text responses into real actions.</p></Reveal>
        <Reveal><p style={styles.prose}>This matters because it means Claude Code's power comes not from the model alone, but from the <em>quality of its tool integration</em>. The reason dedicated tools (Read, Grep, Glob) are preferred over Bash equivalents isn't about capability — it's about creating structured, reviewable actions that you can understand at a glance.</p></Reveal>

        <Reveal><h2 style={styles.h2}>Context as a Finite Resource</h2></Reveal>
        <Reveal><p style={styles.prose}>The second theme running through every lesson is that context is finite and precious. Too much irrelevant context <em>degrades</em> Claude's performance. This insight drives everything from CLAUDE.md (persistent but curated context) to <code style={styles.code}>/compact</code> (preserving knowledge while trimming noise) to the @ symbol (precise file inclusion).</p></Reveal>
        <Reveal><p style={styles.prose}>The thinking modes — Think, Think more, Ultrathink — and Planning Mode are both responses to the same challenge: sometimes you need Claude to invest more in understanding before acting. Planning Mode invests in breadth (reading more files). Thinking modes invest in depth (reasoning longer about a problem). Both consume more context, so the skill is knowing when the investment pays off.</p></Reveal>

        <Reveal><h2 style={styles.h2}>Extensibility as Architecture</h2></Reveal>
        <Reveal><p style={styles.prose}>Hooks, custom commands, and MCP servers all extend Claude Code — but in fundamentally different ways. Custom commands are prompts you invoke explicitly. Hooks are event-driven automation that intercepts tool calls. MCP servers add entirely new capabilities. The GitHub integration combines all of these into an automated team member.</p></Reveal>
        <Reveal><p style={styles.prose}>The SDK ties it together: anything you can do interactively, you can do programmatically. A hook can launch a second Claude instance to review the first one's work. A CI pipeline can run Claude as a code reviewer. The same tool use system that powers interactive sessions powers automated workflows.</p></Reveal>

        <Reveal><h2 style={styles.h2}>Looking Ahead</h2></Reveal>
        <Reveal><p style={styles.prose}>In the next module, we shift from using MCP servers inside Claude Code to <em>building</em> them. You'll see the other side of the tool use story: how to define tools, resources, and prompts that any MCP client can consume. The principles of clean tool design, clear parameter descriptions, and structured data that you've seen from the user's perspective will now be yours to implement.</p></Reveal>

        <Reveal><div style={styles.nav}><a href="/claude-code-anki/mcp/architecture" style={styles.nextBtn}>Continue → Module 2: MCP Fundamentals</a></div></Reveal>
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
