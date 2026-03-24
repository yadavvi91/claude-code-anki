import Reveal from '../../components/Reveal'
import LessonNav from '../../components/LessonNav'
import NavSidebar from '../../components/NavSidebar'
import { T } from '../../theme'

const NAV_SECTIONS = [
  { id: 'primitives', label: 'Three Primitives' },
  { id: 'burden-shift', label: 'Burden Shift' },
  { id: 'transport', label: 'Transport Matters' },
  { id: 'sampling', label: 'Sampling as Architecture' },
  { id: 'looking-ahead', label: 'Looking Ahead' },
]

export default function Interlude02() {
  return (
    <div style={styles.page}>
      <NavSidebar sections={NAV_SECTIONS} />
      <LessonNav moduleTitle="Interlude" moduleColor="#ec4899" prevLink="/mcp-advanced/transports" prevLabel="L7: Transports" nextLink="/skills/anatomy" nextLabel="L8: Skill Anatomy" />
      <main style={styles.main}>
        <Reveal><div style={styles.label}>Interlude 2</div><h1 style={styles.h1}>MCP Reflections</h1></Reveal>

        <Reveal><p style={styles.prose}>You've now built MCP servers from scratch, defined tools with decorators, created resources and prompts, and understood how messages travel over STDIO and StreamableHTTP. Let's synthesize what matters.</p></Reveal>

        <Reveal id="primitives"><h2 style={styles.h2}>The Three Primitives as a Design Language</h2></Reveal>
        <Reveal><p style={styles.prose}>Tools, resources, and prompts aren't just features — they're a design language for separating concerns. <strong>Tools serve the model</strong>: Claude decides when to use them. <strong>Resources serve your app</strong>: your code decides when to fetch data. <strong>Prompts serve the user</strong>: humans trigger predefined workflows.</p></Reveal>
        <Reveal><p style={styles.prose}>This separation means you can build an MCP server where the model acts autonomously (via tools), the application provides intelligent context (via resources), and users get expert-crafted workflows (via prompts) — all through a single, standardized protocol.</p></Reveal>

        <Reveal id="burden-shift"><h2 style={styles.h2}>The Burden Shift</h2></Reveal>
        <Reveal><p style={styles.prose}>MCP's core value proposition is shifting the burden of tool implementation. Without MCP, every application that wants GitHub integration writes its own tool schemas, its own API wrappers, its own error handling. With MCP, a single GitHub server handles all of that, and any client can connect.</p></Reveal>
        <Reveal><p style={styles.prose}>This isn't the same as calling APIs directly — that still puts the schema authoring burden on you. MCP servers come with tools <em>already defined</em>. The Python SDK makes it trivially easy: a decorator, some type hints, and a Pydantic Field description. The SDK generates the JSON schema Claude needs.</p></Reveal>

        <Reveal id="transport"><h2 style={styles.h2}>Transport Matters More Than You Think</h2></Reveal>
        <Reveal><p style={styles.prose}>STDIO is the ideal baseline — seamless bidirectional communication on the same machine. But production often means remote servers, which means StreamableHTTP, which means confronting a fundamental HTTP limitation: servers can't easily call clients back.</p></Reveal>
        <Reveal><p style={styles.prose}>The SSE workaround is elegant but fragile. Setting <code style={styles.code}>stateless_http=True</code> solves horizontal scaling but kills sampling, progress notifications, and server-initiated requests. This isn't a minor trade-off — it fundamentally changes what your MCP server can do. The lesson: test with the transport you'll deploy on, not just STDIO in development.</p></Reveal>

        <Reveal id="sampling"><h2 style={styles.h2}>Sampling as Architecture</h2></Reveal>
        <Reveal><p style={styles.prose}>Sampling deserves special attention because it inverts the usual flow. Instead of the client calling Claude and the server providing tools, the <em>server</em> asks the <em>client</em> to call Claude. This means public MCP servers can offer AI-powered functionality without holding API keys or paying token costs — each client brings their own Claude connection.</p></Reveal>

        <Reveal id="looking-ahead"><h2 style={styles.h2}>Looking Ahead</h2></Reveal>
        <Reveal><p style={styles.prose}>The next modules shift from protocols to practices. Agent Skills teach you to package expertise into reusable, discoverable units. Subagents teach you to delegate work to isolated contexts. Both build on the MCP foundation: skills use the same matching and loading patterns, and subagents can consume MCP tools just like the main thread.</p></Reveal>

        <Reveal><div style={styles.nav}><a href="/claude-code-anki/skills/anatomy" style={styles.nextBtn}>Continue → Module 4: Agent Skills</a></div></Reveal>
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
