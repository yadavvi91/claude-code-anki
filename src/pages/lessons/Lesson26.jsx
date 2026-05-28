import { modules } from '../../data/cardSets'
import MCQCard from '../../components/MCQCard'
import MCQSection from '../../components/MCQSection'
import Reveal from '../../components/Reveal'
import LessonNav from '../../components/LessonNav'
import NavSidebar from '../../components/NavSidebar'
import ConceptDisplay from '../../components/ConceptDisplay'
import CodeBlock from '../../components/CodeBlock'
import ComparisonTable from '../../components/ComparisonTable'
import TipCallout from '../../components/TipCallout'
import { T } from '../../theme'

const base = '/claude-code-anki/images/'
const mod = modules[7]
const lesson = mod.lessons[6]
const sets = lesson.cardSets
const C = T.setColor
const palette = [C[1], C[2], C[3], C[4], C[5], C[6]]
let ci = 0; function nc() { return palette[ci++ % 6] }
const allCards = sets.flatMap(s => s.cards)
const colors = allCards.map(() => nc())
const s1 = sets[0].cards
const s2 = sets[1].cards

const NAV_SECTIONS = [
  { id: 'set1', label: 'Architecture & Server Tools' },
  { id: 'set2', label: 'Resources, Prompts & Client' },
  { id: 'summary', label: 'Summary', divider: true },
]

export default function Lesson26() {
  return (
    <div style={styles.page}><NavSidebar sections={NAV_SECTIONS} /><LessonNav moduleTitle="Anthropic API" moduleColor={mod.color} prevLink="/api/features" prevLabel="L25: Claude Features" nextLink="/api/agents" nextLabel="L27: Agents & Workflows" />
      <main style={styles.main}>
        <Reveal><div style={styles.lessonLabel}>Lesson 26</div><h1 style={styles.h1}>MCP with the API</h1>
          <p style={styles.subtitle}>How Model Context Protocol standardizes tool serving and connects to the Messages API</p></Reveal>
        <Reveal><ConceptDisplay concept="MCP Servers · FastMCP · Resources · Prompts · Transports" description="A standard protocol for exposing tools, data, and prompt templates — connecting any data source to Claude." color={mod.color} /></Reveal>

        <Reveal id="set1"><div style={{ ...styles.setLabel, color: C[1] }}>Set 1 — MCP Architecture & Server Tools</div><h2 style={styles.h2}>Standardizing tool integration</h2></Reveal>
        <Reveal><p style={styles.prose}><strong>MCP standardizes how tools are defined and served.</strong> An MCP server exposes tools via a protocol; the MCP client discovers them, converts their schemas to the Messages API format, and includes them in API requests. Claude doesn't know about MCP — it just sees regular tool definitions.</p></Reveal>
        <Reveal><CodeBlock title="FastMCP Server" code={`from mcp.server.fastmcp import FastMCP

mcp = FastMCP("weather")

@mcp.tool()
def get_weather(city: str) -> str:
    """Get current weather for a city.

    Args:
        city: The city name, e.g. "San Francisco"
    """
    return f"72°F, sunny in {city}"`} /></Reveal>
        <Reveal><p style={styles.prose}>With FastMCP, the <strong><code style={styles.code}>@mcp.tool()</code></strong> decorator does all the heavy lifting: the function name becomes the tool name, type hints generate the JSON Schema, and the docstring becomes the description. No manual schema writing needed.</p></Reveal>
        <Reveal><p style={styles.prose}>Two <strong>transport mechanisms</strong>:</p></Reveal>
        <Reveal><ComparisonTable headers={['Transport', 'How It Works', 'Best For']} rows={[
          ['stdio', 'Client spawns server as subprocess, communicates via stdin/stdout', 'Local development, simple setups'],
          ['StreamableHTTP', 'Client connects to server over HTTP', 'Remote servers, cloud, multi-client'],
        ]} /></Reveal>
        <Reveal><p style={styles.prose}>The <strong>MCP inspector</strong> lets you browse a server's tools, resources, and prompts, call them interactively, and verify they work — essential during development before wiring up a real client.</p></Reveal>
        <Reveal><TipCallout variant="tip">The discovery flow: client connects → <code style={styles.code}>tools/list</code> → get schemas → convert to Messages API format → include in requests. When Claude returns <code style={styles.code}>tool_use</code>, the client routes it back to the MCP server for execution.</TipCallout></Reveal>

          <MCQSection color={colors[0]} count={s1.length}>
            {s1.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[i]} /></Reveal>)}
          </MCQSection>

        <div style={styles.divider}>· · ·</div>

        <Reveal id="set2"><div style={{ ...styles.setLabel, color: C[2] }}>Set 2 — Resources, Prompts & Client Implementation</div><h2 style={styles.h2}>The full MCP ecosystem</h2></Reveal>
        <Reveal><p style={styles.prose}><strong>Resources</strong> are read-only data sources — files, configs, database records — exposed via URI patterns like <code style={styles.code}>config://app</code> or <code style={styles.code}>file://{'{path}'}</code>. Unlike tools (which perform actions), resources provide context without side effects.</p></Reveal>
        <Reveal><CodeBlock title="MCP Resource" code={`@mcp.resource("config://app")
def get_app_config() -> str:
    """Current application configuration"""
    return json.dumps(config)`} /></Reveal>
        <Reveal><p style={styles.prose}><strong>MCP prompts</strong> are reusable prompt templates exposed by servers. A code review server might expose a <code style={styles.code}>code_review</code> prompt that any client can discover and use. This standardizes how specific tasks are prompted across applications.</p></Reveal>
        <Reveal><p style={styles.prose}>A <strong>complete MCP client</strong> handles: transport setup, server connection management, tool/resource/prompt discovery, conversion to Messages API format, tool call routing back to the server, and the conversation loop.</p></Reveal>
        <Reveal><ComparisonTable headers={['MCP Primitive', 'Discovery', 'Usage']} rows={[
          ['Tools', 'tools/list', 'Convert to API format, route tool_use back'],
          ['Resources', 'resources/list', 'resources/read(uri) → inject into context'],
          ['Prompts', 'prompts/list', 'prompts/get(name, args) → use rendered text'],
        ]} /></Reveal>
        <Reveal><TipCallout variant="tip">Resources can serve dynamic data (database queries, computed values). They're "read-only" in that they don't cause side effects — but the underlying data can change between calls.</TipCallout></Reveal>

          <MCQSection color={colors[s1.length]} count={s2.length}>
            {s2.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + i]} /></Reveal>)}
          </MCQSection>

        <div style={styles.divider}>· · ·</div>
        <Reveal id="summary"><div style={styles.endSection}><div style={styles.endLabel}>End of Lesson 26</div>
          <p style={styles.endProse}>You understand how MCP standardizes tool serving, how to build servers with FastMCP, the three MCP primitives (tools, resources, prompts), transport mechanisms, and how clients orchestrate everything with the Messages API.</p>
          <a href="/claude-code-anki/api/agents" style={styles.nextBtn}>Next → Lesson 27: Agents & Workflows</a></div></Reveal>
      </main>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: T.color.bg }, main: { maxWidth: '720px', margin: '0 auto', padding: '2rem 1.5rem 6rem' },
  lessonLabel: { fontFamily: T.font.label, fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.color.ink4, marginBottom: '0.75rem' },
  h1: { fontFamily: T.font.heading, fontSize: '2.4rem', fontWeight: 700, color: T.color.ink, lineHeight: 1.15, marginBottom: '0.75rem' },
  subtitle: { fontFamily: T.font.prose, fontSize: '1.1rem', color: T.color.ink3, lineHeight: 1.6, marginBottom: '2.5rem' },
  setLabel: { fontFamily: T.font.label, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '0.35rem' },
  h2: { fontFamily: T.font.heading, fontSize: '1.55rem', fontWeight: 600, color: T.color.ink2, lineHeight: 1.3, marginBottom: '1.4rem' },
  prose: { fontFamily: T.font.prose, fontSize: '1.05rem', lineHeight: 1.85, color: T.color.ink3, marginBottom: '1.4rem', maxWidth: '65ch' },
  code: { fontFamily: T.font.code, fontSize: '0.85em', background: 'rgba(99,102,241,0.08)', padding: '0.15em 0.4em', borderRadius: '3px', color: T.color.accent },
  img: { width: '100%', maxWidth: '640px', borderRadius: '8px', margin: '1rem auto', display: 'block' },
  divider: { textAlign: 'center', color: T.color.bg3, fontSize: '1rem', margin: '3rem 0', letterSpacing: '0.5em' },
  endSection: { textAlign: 'center', padding: '2rem 0' },
  endLabel: { fontFamily: T.font.label, fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.color.ink4, marginBottom: '1.5rem' },
  endProse: { fontFamily: T.font.prose, fontSize: '1rem', lineHeight: 1.8, color: T.color.ink3, marginBottom: '1rem', maxWidth: '55ch', marginLeft: 'auto', marginRight: 'auto', textAlign: 'left' },
  nextBtn: { display: 'inline-block', marginTop: '1.5rem', padding: '0.85rem 2.5rem', border: `1px solid ${T.color.accent}`, borderRadius: '4px', fontFamily: T.font.label, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', color: T.color.accent, transition: 'background 0.25s, color 0.25s' },
}
