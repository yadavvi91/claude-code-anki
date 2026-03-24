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
const lesson = mod.lessons[1] // Resources, Prompts & Patterns
const sets = lesson.cardSets
const C = T.setColor

const palette = [C[1], C[2], C[3], C[4], C[5], C[6]]
let ci = 0
function nc() { return palette[ci++ % 6] }
const allCards = sets.flatMap(s => s.cards)
const colors = allCards.map(() => nc())

const s1 = sets[0].cards // Resources Fundamentals
const s2 = sets[1].cards // Prompts
const s3 = sets[2].cards // Three Primitives

const NAV_SECTIONS = [
  { id: 'set1', label: 'Resources' },
  { id: 'set2', label: 'Prompts' },
  { id: 'set3', label: 'Choosing Primitives' },
  { id: 'summary', label: 'Summary', divider: true },
]

export default function Lesson05() {
  return (
    <div style={styles.page}>
      <NavSidebar sections={NAV_SECTIONS} />
      <LessonNav
        moduleTitle="MCP Fundamentals"
        moduleColor={mod.color}
        prevLink="/mcp/architecture"
        prevLabel="L4: Architecture"
        nextLink="/interlude/2"
        nextLabel="Interlude 2"
      />

      <main style={styles.main}>
        <Reveal>
          <div style={styles.lessonLabel}>Lesson 5</div>
          <h1 style={styles.h1}>Resources, Prompts & Patterns</h1>
          <p style={styles.subtitle}>
            MCP's three primitives — tools, resources, and prompts — and when to use each one
          </p>
        </Reveal>

        <Reveal>
          <ConceptDisplay
            concept="Tools → Model · Resources → App · Prompts → User"
            description="Each primitive serves a different part of your application stack."
            color={mod.color}
          />
        </Reveal>

        <Reveal>
          <img src={`${base}296696_000128s.jpg`} alt="Full MCP flow — tools, resources, and prompts working together" style={styles.img} />
        </Reveal>

        {/* ══════════════ SET 1 — RESOURCES ══════════════ */}
        <Reveal id="set1">
          <div style={{ ...styles.setLabel, color: C[1] }}>Set 1 — Resources Fundamentals</div>
          <h2 style={styles.h2}>Exposing data from your server</h2>
        </Reveal>

        <Reveal>
          <img src={`${base}296699_000102s.jpg`} alt="MCP resources exposing read-only data to clients" style={styles.img} />
        </Reveal>

        <Reveal><p style={styles.prose}>
          Resources expose <strong>read-only data</strong> to clients, similar to GET endpoints
          in an HTTP server. They're perfect for scenarios where you need to <em>fetch</em>
          information rather than <em>perform actions</em>.
        </p></Reveal>

        <Reveal><p style={styles.prose}>
          There are two types: <strong>direct resources</strong> with static URIs, and
          <strong> templated resources</strong> with parameters in their URIs.
        </p></Reveal>

        <Reveal>
          <img src={`${base}296699_000080s.jpg`} alt="Direct vs templated resources — static URIs and parameterized URIs" style={styles.img} />
        </Reveal>

        <Reveal>
          <CodeBlock
            title="Direct resource — returns list of all documents"
            code={`@mcp.resource(
  "docs://documents",
  mime_type="application/json"
)
def list_docs() -> list[str]:
  return list(docs.keys())`}
          />
        </Reveal>

        <Reveal>
          <CodeBlock
            title="Templated resource — returns one document by ID"
            code={`@mcp.resource(
  "docs://documents/{doc_id}",
  mime_type="text/plain"
)
def fetch_doc(doc_id: str) -> str:
  if doc_id not in docs:
    raise ValueError(f"Doc with id {doc_id} not found")
  return docs[doc_id]`}
          />
        </Reveal>

        <Reveal>
          <TipCallout variant="tip">
            The SDK auto-serializes your return values. Just return a Python object —
            no need to call <code style={styles.code}>json.dumps()</code> yourself.
          </TipCallout>
        </Reveal>

        <Reveal><p style={styles.prose}>
          Use <code style={styles.code}>mime_type</code> to hint how clients should parse the data:
          <code style={styles.code}>application/json</code> for structured data,
          <code style={styles.code}>text/plain</code> for raw text. The client checks this to decide
          whether to parse JSON or use the text as-is.
        </p></Reveal>

        <Reveal>
          <img src={`${base}296695_000107s.jpg`} alt="Accessing resources from the client side — list and read" style={styles.img} />
        </Reveal>

        <Reveal>
          <img src={`${base}296699_000175s.jpg`} alt="MIME type handling in MCP resources — JSON vs plain text" style={styles.img} />
        </Reveal>

        {s1.map((card, i) => (
          <Reveal key={card.id}><MCQCard card={card} color={colors[i]} /></Reveal>
        ))}

        <div style={styles.divider}>· · ·</div>

        {/* ══════════════ SET 2 — PROMPTS ══════════════ */}
        <Reveal id="set2">
          <div style={{ ...styles.setLabel, color: C[2] }}>Set 2 — Prompts</div>
          <h2 style={styles.h2}>Pre-built instructions for users</h2>
        </Reveal>

        <Reveal>
          <img src={`${base}296698_000185s.jpg`} alt="MCP prompts as pre-built instructions for users" style={styles.img} />
        </Reveal>

        <Reveal><p style={styles.prose}>
          Users can already ask Claude to do most tasks directly. But they'll get <strong>much
          better results</strong> from a thoroughly tested, specialized prompt crafted by the
          MCP server author — someone who deeply understands the domain.
        </p></Reveal>

        <Reveal><p style={styles.prose}>
          Prompts define pre-built instructions that clients expose as slash commands, buttons, or
          menu items. They return a list of <strong>messages</strong> (user and/or assistant) that
          get sent directly to Claude.
        </p></Reveal>

        <Reveal>
          <img src={`${base}296698_000063s.jpg`} alt="Prompts exposed as slash commands and buttons in the client UI" style={styles.img} />
        </Reveal>

        <Reveal>
          <CodeBlock
            title="Defining a prompt"
            code={`from mcp.server.fastmcp.prompts import base

@mcp.prompt(
  name="format",
  description="Rewrites document in Markdown."
)
def format_document(
  doc_id: str = Field(description="Document to format")
) -> list[base.Message]:
  prompt = f"""
  Reformat the document {doc_id} using Markdown.
  Add headers, bullet points, tables as needed.
  Use the 'edit_document' tool to save changes.
  """
  return [base.UserMessage(prompt)]`}
          />
        </Reveal>

        <Reveal>
          <ComparisonTable
            headers={['Client Function', 'Purpose']}
            rows={[
              ['list_prompts()', 'Get all available prompts from the server'],
              ['get_prompt(name, args)', 'Get a specific prompt with variables filled in'],
            ]}
          />
        </Reveal>

        <Reveal>
          <TipCallout variant="insight">
            Prompts work best when they're specialized for your server's domain. A document server
            might have format/summarize/analyze prompts. A data server might have report/visualize prompts.
          </TipCallout>
        </Reveal>

        {s2.map((card, i) => (
          <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + i]} /></Reveal>
        ))}

        <Reveal>
          <img src={`${base}296692_000134s.jpg`} alt="Prompts in the client — list_prompts and get_prompt calls" style={styles.img} />
        </Reveal>

        <div style={styles.divider}>· · ·</div>

        {/* ══════════════ SET 3 — THREE PRIMITIVES ══════════════ */}
        <Reveal id="set3">
          <div style={{ ...styles.setLabel, color: C[3] }}>Set 3 — Choosing the Right Primitive</div>
          <h2 style={styles.h2}>Tools, resources, or prompts?</h2>
        </Reveal>

        <Reveal>
          <img src={`${base}296691_000116s.jpg`} alt="Three MCP primitives: tools, resources, and prompts" style={styles.img} />
        </Reveal>

        <Reveal><p style={styles.prose}>
          Each MCP primitive is controlled by a different part of your application stack.
          Understanding who controls what is the key to choosing the right one.
        </p></Reveal>

        <Reveal>
          <img src={`${base}296696_000345s.jpg`} alt="Annotated MCP flow — tools, resources, and prompts in a complete system" style={styles.img} />
        </Reveal>

        <Reveal>
          <ComparisonTable
            headers={['Primitive', 'Controlled By', 'Use When']}
            rows={[
              ['Tools', 'Model (Claude)', 'Give Claude new capabilities it can use autonomously'],
              ['Resources', 'App (your code)', 'Fetch data for UI or to augment context'],
              ['Prompts', 'User (button/command)', 'Create predefined workflows users can trigger'],
            ]}
          />
        </Reveal>

        <Reveal><p style={styles.prose}>
          In Claude's official interface, you can see all three in action: <strong>workflow
          buttons</strong> below the chat input are prompts. The <strong>Google Drive
          integration</strong> uses resources. When Claude <strong>executes code</strong>, it's
          using tools.
        </p></Reveal>

        <Reveal>
          <img src={`${base}296691_000224s.jpg`} alt="All three primitives in Claude's interface — buttons, drive, code execution" style={styles.img} />
        </Reveal>

        <Reveal>
          <TipCallout variant="tip">
            Quick decision guide: Need to give Claude abilities? <strong>Tools</strong>.
            Need data for your app? <strong>Resources</strong>.
            Want predefined workflows? <strong>Prompts</strong>.
          </TipCallout>
        </Reveal>

        {s3.map((card, i) => (
          <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + s2.length + i]} /></Reveal>
        ))}

        <Reveal>
          <img src={`${base}296696_000167s.jpg`} alt="Implementing the MCP client — connecting tools, resources, and prompts" style={styles.img} />
        </Reveal>

        {/* ── END ── */}
        <div style={styles.divider}>· · ·</div>

        <Reveal id="summary">
          <div style={styles.endSection}>
            <div style={styles.endLabel}>End of Lesson 5</div>
            <p style={styles.endProse}>
              You now understand MCP's three primitives: tools (model-controlled), resources
              (app-controlled), and prompts (user-controlled). You know how to build each
              with the Python SDK and when to use them.
            </p>
            <p style={styles.endProse}>
              This completes Module 2: MCP Fundamentals. Next up is a reflective interlude
              before diving into advanced MCP topics.
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
