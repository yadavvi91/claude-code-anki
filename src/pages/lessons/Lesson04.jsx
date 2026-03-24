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
const mod = modules[1] // MCP Fundamentals
const lesson = mod.lessons[0] // MCP Architecture & Building Servers
const sets = lesson.cardSets
const C = T.setColor

const palette = [C[1], C[2], C[3], C[4], C[5], C[6]]
let ci = 0
function nc() { return palette[ci++ % 6] }
const allCards = sets.flatMap(s => s.cards)
const colors = allCards.map(() => nc())

const s1 = sets[0].cards // MCP Fundamentals
const s2 = sets[1].cards // Client-Server Communication
const s3 = sets[2].cards // Building Servers
const s4 = sets[3].cards // Testing & Inspector

const NAV_SECTIONS = [
  { id: 'set1', label: 'MCP Fundamentals' },
  { id: 'set2', label: 'Client-Server' },
  { id: 'set3', label: 'Building Servers' },
  { id: 'set4', label: 'Testing & Inspector' },
  { id: 'summary', label: 'Summary', divider: true },
]

export default function Lesson04() {
  return (
    <div style={styles.page}>
      <NavSidebar sections={NAV_SECTIONS} />
      <LessonNav
        moduleTitle="MCP Fundamentals"
        moduleColor={mod.color}
        prevLink="/interlude/1"
        prevLabel="Interlude 1"
        nextLink="/mcp/resources-prompts"
        nextLabel="L5: Resources"
      />

      <main style={styles.main}>
        <Reveal>
          <div style={styles.lessonLabel}>Lesson 4</div>
          <h1 style={styles.h1}>MCP Architecture & Building Servers</h1>
          <p style={styles.subtitle}>
            What MCP is, how clients and servers communicate, and building your first server with the Python SDK
          </p>
        </Reveal>

        <Reveal>
          <ConceptDisplay
            concept="Client · Server · Tools · FastMCP · Inspector"
            description="MCP shifts the burden of tool implementation from you to dedicated servers."
            color={mod.color}
          />
        </Reveal>

        <Reveal>
          <img src={`${base}296689_000014s.jpg`} alt="MCP architecture overview — clients, servers, and protocols" style={styles.img} />
        </Reveal>

        {/* ══════════════ SET 1 — MCP FUNDAMENTALS ══════════════ */}
        <Reveal id="set1">
          <div style={{ ...styles.setLabel, color: C[1] }}>Set 1 — MCP Fundamentals</div>
          <h2 style={styles.h2}>Why MCP exists</h2>
        </Reveal>

        <Reveal>
          <img src={`${base}296689_000052s.jpg`} alt="MCP client-server architecture diagram" style={styles.img} />
        </Reveal>

        <Reveal><p style={styles.prose}>
          Imagine building a chat interface where users ask Claude about their GitHub data. GitHub
          has <em>massive</em> functionality — repositories, pull requests, issues, projects. Without
          MCP, you'd write, test, and maintain all those tool schemas and functions yourself.
        </p></Reveal>

        <Reveal><p style={styles.prose}>
          <strong>MCP shifts this burden</strong> by moving tool definitions and execution from your
          server to dedicated <strong>MCP servers</strong>. An MCP server wraps up functionality
          around a service (GitHub, AWS, databases) and exposes it as a standardized set of tools.
        </p></Reveal>

        <Reveal>
          <img src={`${base}296689_000108s.jpg`} alt="MCP server wrapping external services like GitHub and databases" style={styles.img} />
        </Reveal>

        <Reveal>
          <TipCallout variant="insight">
            MCP and tool use are <strong>complementary, not the same thing</strong>. Tool use is
            HOW Claude calls functions. MCP is about WHO implements them — someone else has already
            done the work for you.
          </TipCallout>
        </Reveal>

        <Reveal><p style={styles.prose}>
          MCP is <strong>transport agnostic</strong> — client and server can communicate via
          stdin/stdout (most common for local), HTTP, WebSockets, or other protocols. Anyone can
          author MCP servers, though service providers often release official ones.
        </p></Reveal>

        <Reveal>
          <img src={`${base}296689_000168s.jpg`} alt="Transport agnostic design — STDIO, HTTP, WebSockets" style={styles.img} />
        </Reveal>

        {s1.map((card, i) => (
          <Reveal key={card.id}><MCQCard card={card} color={colors[i]} /></Reveal>
        ))}

        <div style={styles.divider}>· · ·</div>

        {/* ══════════════ SET 2 — CLIENT-SERVER COMMUNICATION ══════════════ */}
        <Reveal id="set2">
          <div style={{ ...styles.setLabel, color: C[2] }}>Set 2 — Client-Server Communication</div>
          <h2 style={styles.h2}>The complete message flow</h2>
        </Reveal>

        <Reveal>
          <img src={`${base}296696_000128s.jpg`} alt="Full MCP communication flow — client to server message exchange" style={styles.img} />
        </Reveal>

        <Reveal><p style={styles.prose}>
          The MCP client is your access point to all tools an MCP server provides. Once connected,
          they exchange specific message types defined in the MCP spec:
        </p></Reveal>

        <Reveal>
          <ComparisonTable
            headers={['Message', 'Direction', 'Purpose']}
            rows={[
              ['ListToolsRequest', 'Client → Server', 'What tools do you provide?'],
              ['ListToolsResult', 'Server → Client', 'Here are my available tools'],
              ['CallToolRequest', 'Client → Server', 'Run this tool with these arguments'],
              ['CallToolResult', 'Server → Client', 'Here are the results'],
            ]}
          />
        </Reveal>

        <Reveal><p style={styles.prose}>
          The full flow: user submits query → your server asks MCP client for tools → client gets
          list from MCP server → your server sends query + tools to Claude → Claude decides to call
          a tool → your server asks MCP client to execute it → MCP server makes the actual API
          call → result flows back through the chain to Claude → Claude formulates the final answer.
        </p></Reveal>

        <Reveal>
          <img src={`${base}296696_000345s.jpg`} alt="Annotated MCP flow diagram showing complete request-response cycle" style={styles.img} />
        </Reveal>

        <Reveal>
          <TipCallout variant="tip">
            In a typical project, you implement either a client OR a server — not both. Build a
            server to expose your service. Build a client to consume tools from others.
          </TipCallout>
        </Reveal>

        {s2.map((card, i) => (
          <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + i]} /></Reveal>
        ))}

        <Reveal>
          <img src={`${base}296690_000111s.jpg`} alt="MCP client-server communication summary" style={styles.img} />
        </Reveal>

        <div style={styles.divider}>· · ·</div>

        {/* ══════════════ SET 3 — BUILDING SERVERS ══════════════ */}
        <Reveal id="set3">
          <div style={{ ...styles.setLabel, color: C[3] }}>Set 3 — Building Servers with Python SDK</div>
          <h2 style={styles.h2}>From decorators to tools</h2>
        </Reveal>

        <Reveal>
          <img src={`${base}296690_000051s.jpg`} alt="Building MCP servers with the Python SDK" style={styles.img} />
        </Reveal>

        <Reveal><p style={styles.prose}>
          The Python MCP SDK makes server creation straightforward. Initialize with one line,
          then define tools using decorators — no manual JSON schemas needed.
        </p></Reveal>

        <Reveal>
          <CodeBlock
            title="MCP Server initialization"
            code={`from mcp.server.fastmcp import FastMCP
from pydantic import Field

mcp = FastMCP("DocumentMCP", log_level="ERROR")

docs = {
  "report.pdf": "The report details a 20m condenser tower.",
  "plan.md": "Steps for project implementation.",
}`}
          />
        </Reveal>

        <Reveal>
          <CodeBlock
            title="Defining a tool with @mcp.tool"
            code={`@mcp.tool(
  name="read_doc_contents",
  description="Read a document and return it as a string."
)
def read_document(
  doc_id: str = Field(description="Id of the document to read")
):
  if doc_id not in docs:
    raise ValueError(f"Doc with id {doc_id} not found")
  return docs[doc_id]`}
          />
        </Reveal>

        <Reveal><p style={styles.prose}>
          The <code style={styles.code}>@mcp.tool</code> decorator specifies name and description.
          Python type hints provide types. <code style={styles.code}>Field</code> from Pydantic adds
          parameter descriptions. The SDK auto-generates the JSON schema Claude needs.
        </p></Reveal>

        <Reveal>
          <img src={`${base}296694_000063s.jpg`} alt="Python SDK project setup with FastMCP and Pydantic" style={styles.img} />
        </Reveal>

        <Reveal>
          <img src={`${base}296697_000079s.jpg`} alt="Tool decorator generating JSON schema from Python type hints" style={styles.img} />
        </Reveal>

        {s3.map((card, i) => (
          <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + s2.length + i]} /></Reveal>
        ))}

        <div style={styles.divider}>· · ·</div>

        {/* ══════════════ SET 4 — TESTING ══════════════ */}
        <Reveal id="set4">
          <div style={{ ...styles.setLabel, color: C[4] }}>Set 4 — Testing & Inspector</div>
          <h2 style={styles.h2}>Debugging before deployment</h2>
        </Reveal>

        <Reveal>
          <img src={`${base}296697_000052s.jpg`} alt="MCP Inspector browser tool for testing servers" style={styles.img} />
        </Reveal>

        <Reveal><p style={styles.prose}>
          The Python SDK includes a browser-based <strong>MCP Inspector</strong> for testing your
          server without connecting to a real application. Launch it with:
        </p></Reveal>

        <Reveal>
          <CodeBlock title="Terminal" code="mcp dev mcp_server.py" />
        </Reveal>

        <Reveal><p style={styles.prose}>
          Open the local URL in your browser. Click <strong>Connect</strong>, then navigate to
          <strong> Tools</strong> to list, select, and test tools with custom inputs. State persists
          between calls — you can edit a document then read it to verify the change.
        </p></Reveal>

        <Reveal>
          <img src={`${base}296693_000133s.jpg`} alt="MCP Inspector browser UI — connecting and listing tools" style={styles.img} />
        </Reveal>

        <Reveal>
          <img src={`${base}296693_000163s.jpg`} alt="Testing tools in the MCP Inspector with custom inputs" style={styles.img} />
        </Reveal>

        <Reveal><p style={styles.prose}>
          On the client side, implement two core functions: <code style={styles.code}>list_tools()</code> to
          discover available tools, and <code style={styles.code}>call_tool()</code> to execute a tool
          Claude requests.
        </p></Reveal>

        {s4.map((card, i) => (
          <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + s2.length + s3.length + i]} /></Reveal>
        ))}

        {/* ── END ── */}
        <div style={styles.divider}>· · ·</div>

        <Reveal id="summary">
          <div style={styles.endSection}>
            <div style={styles.endLabel}>End of Lesson 4</div>
            <p style={styles.endProse}>
              You now understand MCP's architecture, how clients and servers communicate, how to
              build tools with the Python SDK, and how to test with the Inspector.
            </p>
            <p style={styles.endProse}>
              Next, we explore the other two MCP primitives — resources and prompts — and learn
              when to use each one.
            </p>
            <a href="/claude-code-anki/mcp/resources-prompts" style={styles.nextBtn}>
              Next → Lesson 5: Resources, Prompts & Patterns
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
  diagram: { width: '100%', maxWidth: '800px', borderRadius: '8px', margin: '1.5rem auto', display: 'block' },
  divider: { textAlign: 'center', color: T.color.bg3, fontSize: '1rem', margin: '3rem 0', letterSpacing: '0.5em' },
  endSection: { textAlign: 'center', padding: '2rem 0' },
  endLabel: { fontFamily: T.font.label, fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.color.ink4, marginBottom: '1.5rem' },
  endProse: { fontFamily: T.font.prose, fontSize: '1rem', lineHeight: 1.8, color: T.color.ink3, marginBottom: '1rem', maxWidth: '55ch', marginLeft: 'auto', marginRight: 'auto', textAlign: 'left' },
  nextBtn: { display: 'inline-block', marginTop: '1.5rem', padding: '0.85rem 2.5rem', border: `1px solid ${T.color.accent}`, borderRadius: '4px', fontFamily: T.font.label, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', color: T.color.accent, transition: 'background 0.25s, color 0.25s' },
}
