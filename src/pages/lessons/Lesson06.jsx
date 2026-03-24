import { modules } from '../../data/cardSets'
import MCQCard from '../../components/MCQCard'
import Reveal from '../../components/Reveal'
import LessonNav from '../../components/LessonNav'
import ConceptDisplay from '../../components/ConceptDisplay'
import CodeBlock from '../../components/CodeBlock'
import ComparisonTable from '../../components/ComparisonTable'
import TipCallout from '../../components/TipCallout'
import { T } from '../../theme'

const mod = modules[2] // MCP Advanced
const lesson = mod.lessons[0] // Sampling, Progress & Security
const sets = lesson.cardSets
const C = T.setColor

const palette = [C[1], C[2], C[3], C[4], C[5], C[6]]
let ci = 0
function nc() { return palette[ci++ % 6] }
const allCards = sets.flatMap(s => s.cards)
const colors = allCards.map(() => nc())

const s1 = sets[0].cards // Sampling
const s2 = sets[1].cards // Notifications
const s3 = sets[2].cards // Roots

export default function Lesson06() {
  return (
    <div style={styles.page}>
      <LessonNav
        moduleTitle="MCP Advanced"
        moduleColor={mod.color}
        prevLink="/interlude/2"
        prevLabel="Interlude 2"
        nextLink="/mcp-advanced/transports"
        nextLabel="L7: Transports"
      />

      <main style={styles.main}>
        <Reveal>
          <div style={styles.lessonLabel}>Lesson 6</div>
          <h1 style={styles.h1}>Sampling, Progress & Security</h1>
          <p style={styles.subtitle}>
            Advanced MCP features: letting servers use LLMs, real-time notifications, and filesystem access control
          </p>
        </Reveal>

        <Reveal>
          <ConceptDisplay
            concept="Sampling · Notifications · Roots"
            description="Three features that make MCP servers production-ready."
            color={mod.color}
          />
        </Reveal>

        {/* ══════════════ SET 1 — SAMPLING ══════════════ */}
        <Reveal>
          <div style={{ ...styles.setLabel, color: C[1] }}>Set 1 — Sampling</div>
          <h2 style={styles.h2}>Letting servers use Claude</h2>
        </Reveal>

        <Reveal><p style={styles.prose}>
          <strong>Sampling</strong> allows an MCP server to access a language model through the connected
          client, rather than calling the LLM directly. The server creates a prompt and says
          "Could you call Claude for me?" — the client, which already has a connection to Claude,
          makes the call and returns the result.
        </p></Reveal>

        <Reveal><p style={styles.prose}>
          Why? Because it <strong>shifts token costs to the client</strong>. The server needs no
          API keys, no LLM integration, and no token budget. This is ideal for public MCP servers
          — you don't want a public server racking up AI costs for every user.
        </p></Reveal>

        <Reveal>
          <CodeBlock
            title="Server-side: requesting LLM access"
            code={`# Inside a tool function
result = await ctx.session.create_message(
  messages=[SamplingMessage(
    role="user",
    content=TextContent(type="text", text="Summarize this...")
  )],
  max_tokens=500,
  system_prompt="You are a helpful assistant"
)`}
          />
        </Reveal>

        {s1.map((card, i) => (
          <Reveal key={card.id}><MCQCard card={card} color={colors[i]} /></Reveal>
        ))}

        <div style={styles.divider}>· · ·</div>

        {/* ══════════════ SET 2 — NOTIFICATIONS ══════════════ */}
        <Reveal>
          <div style={{ ...styles.setLabel, color: C[2] }}>Set 2 — Notifications & Progress</div>
          <h2 style={styles.h2}>Real-time feedback</h2>
        </Reveal>

        <Reveal><p style={styles.prose}>
          Long-running operations need feedback. MCP provides <strong>logging</strong> and
          <strong> progress notifications</strong> through the Context argument automatically
          provided to tool functions.
        </p></Reveal>

        <Reveal>
          <CodeBlock
            title="Sending notifications from a tool"
            code={`async def process_files(ctx, ...):
  await ctx.info("Starting processing...")
  for i, file in enumerate(files):
    await ctx.report_progress(current=i, total=len(files))
    # ... process file
  await ctx.info("Processing complete!")`}
          />
        </Reveal>

        <Reveal>
          <TipCallout variant="insight">
            Notifications are entirely <strong>optional</strong>. Clients can ignore them, show
            only certain types, or present them however they like — terminal output, progress
            bars, WebSocket pushes, etc.
          </TipCallout>
        </Reveal>

        {s2.map((card, i) => (
          <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + i]} /></Reveal>
        ))}

        <div style={styles.divider}>· · ·</div>

        {/* ══════════════ SET 3 — ROOTS ══════════════ */}
        <Reveal>
          <div style={{ ...styles.setLabel, color: C[3] }}>Set 3 — Roots & Security</div>
          <h2 style={styles.h2}>Controlling filesystem access</h2>
        </Reveal>

        <Reveal><p style={styles.prose}>
          <strong>Roots</strong> are a permission system that tells MCP servers which files and
          folders on your machine they can access. When a user says "convert biking.mp4," roots
          give Claude the context to find the file without requiring the full path.
        </p></Reveal>

        <Reveal><p style={styles.prose}>
          The workflow: user asks to convert a file → Claude calls <code style={styles.code}>list_roots</code> →
          Claude calls <code style={styles.code}>read_dir</code> on accessible directories → finds
          the file → calls the tool with the full path.
        </p></Reveal>

        <Reveal>
          <TipCallout variant="warning">
            The MCP SDK does <strong>NOT</strong> automatically enforce root restrictions. You must
            implement path checking yourself — e.g., an <code style={styles.code}>is_path_allowed()</code> helper
            that verifies requested paths fall within approved roots.
          </TipCallout>
        </Reveal>

        {s3.map((card, i) => (
          <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + s2.length + i]} /></Reveal>
        ))}

        {/* ── END ── */}
        <div style={styles.divider}>· · ·</div>

        <Reveal>
          <div style={styles.endSection}>
            <div style={styles.endLabel}>End of Lesson 6</div>
            <p style={styles.endProse}>
              You now understand sampling (servers using LLMs through clients), notifications
              (real-time progress and logging), and roots (filesystem access control).
            </p>
            <a href="/claude-code-anki/mcp-advanced/transports" style={styles.nextBtn}>
              Next → Lesson 7: Transports & Production
            </a>
          </div>
        </Reveal>
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
  divider: { textAlign: 'center', color: T.color.bg3, fontSize: '1rem', margin: '3rem 0', letterSpacing: '0.5em' },
  endSection: { textAlign: 'center', padding: '2rem 0' },
  endLabel: { fontFamily: T.font.label, fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.color.ink4, marginBottom: '1.5rem' },
  endProse: { fontFamily: T.font.prose, fontSize: '1rem', lineHeight: 1.8, color: T.color.ink3, marginBottom: '1rem', maxWidth: '55ch', marginLeft: 'auto', marginRight: 'auto', textAlign: 'left' },
  nextBtn: { display: 'inline-block', marginTop: '1.5rem', padding: '0.85rem 2.5rem', border: `1px solid ${T.color.accent}`, borderRadius: '4px', fontFamily: T.font.label, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', color: T.color.accent, transition: 'background 0.25s, color 0.25s' },
}
