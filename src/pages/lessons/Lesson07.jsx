import { modules } from '../../data/cardSets'
import MCQCard from '../../components/MCQCard'
import Reveal from '../../components/Reveal'
import LessonNav from '../../components/LessonNav'
import NavSidebar from '../../components/NavSidebar'
import ConceptDisplay from '../../components/ConceptDisplay'
import CodeBlock from '../../components/CodeBlock'
import ComparisonTable from '../../components/ComparisonTable'
import TipCallout from '../../components/TipCallout'
import { T } from '../../theme'

const base = '/claude-code-anki/images/'
const mod = modules[2] // MCP Advanced
const lesson = mod.lessons[1] // Transports & Production
const sets = lesson.cardSets
const C = T.setColor

const palette = [C[1], C[2], C[3], C[4], C[5], C[6]]
let ci = 0
function nc() { return palette[ci++ % 6] }
const allCards = sets.flatMap(s => s.cards)
const colors = allCards.map(() => nc())

const s1 = sets[0].cards // JSON & STDIO
const s2 = sets[1].cards // StreamableHTTP

const NAV_SECTIONS = [
  { id: 'set1', label: 'JSON & STDIO' },
  { id: 'set2', label: 'StreamableHTTP' },
  { id: 'summary', label: 'Summary', divider: true },
]

export default function Lesson07() {
  return (
    <div style={styles.page}>
      <NavSidebar sections={NAV_SECTIONS} />
      <LessonNav
        moduleTitle="MCP Advanced"
        moduleColor={mod.color}
        prevLink="/mcp-advanced/sampling"
        prevLabel="L6: Sampling"
        nextLink="/interlude/2"
        nextLabel="Interlude 2"
      />

      <main style={styles.main}>
        <Reveal>
          <div style={styles.lessonLabel}>Lesson 7</div>
          <h1 style={styles.h1}>Transports & Production</h1>
          <p style={styles.subtitle}>
            How MCP messages travel: JSON message types, STDIO for local, StreamableHTTP for remote
          </p>
        </Reveal>

        <Reveal>
          <ConceptDisplay
            concept="JSON-RPC · STDIO · StreamableHTTP · SSE · Session ID"
            description="The transport layer determines what's possible between client and server."
            color={mod.color}
          />
        </Reveal>

        <Reveal>
          <img src={`${base}296290_000070s.jpg`} alt="Overview of MCP transport options — STDIO and StreamableHTTP" style={styles.img} />
        </Reveal>

        {/* ══════════════ SET 1 — JSON & STDIO ══════════════ */}
        <Reveal id="set1">
          <div style={{ ...styles.setLabel, color: C[1] }}>Set 1 — JSON Messages & STDIO</div>
          <h2 style={styles.h2}>The message layer</h2>
        </Reveal>

        <Reveal>
          <img src={`${base}296290_000035s.jpg`} alt="JSON message types in MCP communication" style={styles.img} />
        </Reveal>

        <Reveal><p style={styles.prose}>
          All MCP communication uses <strong>JSON messages</strong>. They fall into two categories:
          <strong> Request-Result</strong> messages (always in pairs) and <strong>Notification</strong> messages
          (one-way, no response expected).
        </p></Reveal>

        <Reveal>
          <ComparisonTable
            headers={['Category', 'Examples', 'Pattern']}
            rows={[
              ['Request-Result', 'CallTool, ListPrompts, ReadResource, Initialize', 'Bidirectional pair'],
              ['Notification', 'Progress, Logging, ToolListChanged, ResourceUpdated', 'One-way, fire-and-forget'],
            ]}
          />
        </Reveal>

        <Reveal><p style={styles.prose}>
          MCP is <strong>bidirectional</strong> — both clients and servers can initiate communication.
          Servers can send requests TO clients (like sampling). This is crucial for transport
          selection, as some transports limit which directions are supported.
        </p></Reveal>

        <Reveal>
          <img src={`${base}296290_000140s.jpg`} alt="Bidirectional communication — both client and server can initiate messages" style={styles.img} />
        </Reveal>

        <Reveal><p style={styles.prose}>
          The <strong>STDIO transport</strong> is the simplest: client launches the server as a
          subprocess and communicates via stdin/stdout. Either party can send at any time. It
          only works when both are on the <strong>same machine</strong>.
        </p></Reveal>

        <Reveal><p style={styles.prose}>
          Before any tool calls, a <strong>three-message handshake</strong> is required:
          (1) Initialize Request (client→server), (2) Initialize Result (server→client),
          (3) Initialized Notification (client→server, no response). Only then can operations begin.
        </p></Reveal>

        <Reveal>
          <img src={`${base}296291_000090s.jpg`} alt="STDIO transport — subprocess communication via stdin/stdout" style={styles.img} />
        </Reveal>

        <Reveal>
          <img src={`${base}296290_000210s.jpg`} alt="Three-message initialization handshake sequence" style={styles.img} />
        </Reveal>

        <Reveal>
          <img src={`${base}296291_000180s.jpg`} alt="STDIO transport implementation details" style={styles.img} />
        </Reveal>

        {s1.map((card, i) => (
          <Reveal key={card.id}><MCQCard card={card} color={colors[i]} /></Reveal>
        ))}

        <Reveal>
          <img src={`${base}296290_000315s.jpg`} alt="JSON message format summary — requests, results, and notifications" style={styles.img} />
        </Reveal>

        <div style={styles.divider}>· · ·</div>

        {/* ══════════════ SET 2 — STREAMABLE HTTP ══════════════ */}
        <Reveal id="set2">
          <div style={{ ...styles.setLabel, color: C[2] }}>Set 2 — StreamableHTTP Transport</div>
          <h2 style={styles.h2}>Going remote</h2>
        </Reveal>

        <Reveal>
          <img src={`${base}296291_000045s.jpg`} alt="StreamableHTTP transport for remote MCP servers" style={styles.img} />
        </Reveal>

        <Reveal><p style={styles.prose}>
          <strong>StreamableHTTP</strong> enables clients to connect to remotely hosted servers over HTTP.
          The core challenge: clients can call servers (known URL), but servers can't easily
          call clients back (no known URL).
        </p></Reveal>

        <Reveal><p style={styles.prose}>
          The solution is <strong>Server-Sent Events (SSE)</strong>. After initialization, the client
          opens a long-lived GET connection. The server uses this persistent channel to stream
          notifications, progress updates, and sampling requests at any time.
        </p></Reveal>

        <Reveal>
          <img src={`${base}296287_000105s.jpg`} alt="SSE connection — long-lived GET for server-to-client streaming" style={styles.img} />
        </Reveal>

        <Reveal><p style={styles.prose}>
          The server returns an <code style={styles.code}>mcp-session-id</code> header during
          initialization. This ID uniquely identifies the client and must be included in all
          future requests.
        </p></Reveal>

        <Reveal>
          <ComparisonTable
            headers={['Setting', 'What It Does', 'Trade-off']}
            rows={[
              ['stateless_http=True', 'No sessions, enables horizontal scaling', 'Loses sampling, progress, server→client messages'],
              ['json_response=True', 'Returns plain JSON instead of SSE stream', 'No streaming, no intermediate progress/logs'],
              ['Both false (default)', 'Full MCP functionality', 'Requires sticky sessions for scaling'],
            ]}
          />
        </Reveal>

        <Reveal>
          <img src={`${base}296287_000035s.jpg`} alt="SSE and session management for production MCP" style={styles.img} />
        </Reveal>

        <Reveal>
          <img src={`${base}296286_000150s.jpg`} alt="StreamableHTTP deep dive — stateless vs stateful configuration" style={styles.img} />
        </Reveal>

        <Reveal>
          <img src={`${base}296285_000105s.jpg`} alt="Session state management with mcp-session-id header" style={styles.img} />
        </Reveal>

        <Reveal>
          <TipCallout variant="warning">
            If your app works with STDIO locally but breaks with HTTP transport, the
            <code style={styles.code}>stateless_http</code>/<code style={styles.code}>json_response</code> settings
            are likely the culprit. Test with the same transport you'll use in production.
          </TipCallout>
        </Reveal>

        {s2.map((card, i) => (
          <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + i]} /></Reveal>
        ))}

        <Reveal>
          <img src={`${base}296286_000350s.jpg`} alt="StreamableHTTP production deployment patterns" style={styles.img} />
        </Reveal>

        <Reveal>
          <img src={`${base}296285_000280s.jpg`} alt="Scaling considerations — sticky sessions vs stateless mode" style={styles.img} />
        </Reveal>

        {/* ── END ── */}
        <div style={styles.divider}>· · ·</div>

        <Reveal id="summary">
          <div style={styles.endSection}>
            <div style={styles.endLabel}>End of Lesson 7</div>
            <p style={styles.endProse}>
              You now understand MCP's message types, the STDIO transport for local development,
              and StreamableHTTP for production remote servers — including SSE, session IDs, and
              the stateless/JSON trade-offs.
            </p>
            <p style={styles.endProse}>
              This completes Module 3: MCP Advanced. Next up is a reflective interlude
              before diving into Agent Skills.
            </p>
            <a href="/claude-code-anki/interlude/2" style={styles.nextBtn}>
              Next → Interlude 2: MCP Reflections
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
  img: { width: '100%', maxWidth: '720px', borderRadius: '8px', margin: '1rem auto', display: 'block' },
  divider: { textAlign: 'center', color: T.color.bg3, fontSize: '1rem', margin: '3rem 0', letterSpacing: '0.5em' },
  endSection: { textAlign: 'center', padding: '2rem 0' },
  endLabel: { fontFamily: T.font.label, fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.color.ink4, marginBottom: '1.5rem' },
  endProse: { fontFamily: T.font.prose, fontSize: '1rem', lineHeight: 1.8, color: T.color.ink3, marginBottom: '1rem', maxWidth: '55ch', marginLeft: 'auto', marginRight: 'auto', textAlign: 'left' },
  nextBtn: { display: 'inline-block', marginTop: '1.5rem', padding: '0.85rem 2.5rem', border: `1px solid ${T.color.accent}`, borderRadius: '4px', fontFamily: T.font.label, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', color: T.color.accent, transition: 'background 0.25s, color 0.25s' },
}
