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
const lesson = mod.lessons[3]
const sets = lesson.cardSets
const C = T.setColor
const palette = [C[1], C[2], C[3], C[4], C[5], C[6]]
let ci = 0; function nc() { return palette[ci++ % 6] }
const allCards = sets.flatMap(s => s.cards)
const colors = allCards.map(() => nc())
const s1 = sets[0].cards
const s2 = sets[1].cards

const NAV_SECTIONS = [
  { id: 'set1', label: 'Definitions & Execution' },
  { id: 'set2', label: 'Advanced Patterns' },
  { id: 'summary', label: 'Summary', divider: true },
]

export default function Lesson23() {
  return (
    <div style={styles.page}><NavSidebar sections={NAV_SECTIONS} /><LessonNav moduleTitle="Anthropic API" moduleColor={mod.color} prevLink="/api/prompt-engineering" prevLabel="L22: Prompt Engineering" nextLink="/api/rag" nextLabel="L24: RAG & Search" />
      <main style={styles.main}>
        <Reveal><div style={styles.lessonLabel}>Lesson 23</div><h1 style={styles.h1}>Tool Use</h1>
          <p style={styles.subtitle}>Giving Claude the ability to call functions, access data, and take actions</p></Reveal>
        <Reveal><ConceptDisplay concept="Tool Definitions · Execution Loop · tool_choice · Web Search" description="From passive text generation to active capability: Claude decides when and how to use your tools." color={mod.color} /></Reveal>

        <Reveal id="set1"><div style={{ ...styles.setLabel, color: C[1] }}>Set 1 — Tool Definitions & Execution</div><h2 style={styles.h2}>Connecting Claude to your systems</h2></Reveal>
        <Reveal><p style={styles.prose}>A tool definition has three parts: a <strong>name</strong> (identifier), a <strong>description</strong> (tells Claude when and why to use it), and an <strong><code style={styles.code}>input_schema</code></strong> (JSON Schema for the parameters). The description is crucial — it's how Claude decides which tool to call.</p></Reveal>
        <Reveal><CodeBlock title="Tool Definition" code={`{
  "name": "get_weather",
  "description": "Get current weather for a city. Returns temperature, conditions, humidity.",
  "input_schema": {
    "type": "object",
    "properties": {
      "city": {"type": "string", "description": "City name, e.g. San Francisco"}
    },
    "required": ["city"]
  }
}`} /></Reveal>
        <Reveal><p style={styles.prose}>When Claude decides to use a tool, it returns a <strong><code style={styles.code}>tool_use</code></strong> content block with the tool name and arguments. The response's <code style={styles.code}>stop_reason</code> becomes <code style={styles.code}>"tool_use"</code>. Your code executes the actual function and sends results back as a <strong><code style={styles.code}>tool_result</code></strong> message.</p></Reveal>
        <Reveal><CodeBlock title="Tool Result Message" code={`{
  "role": "user",
  "content": [{
    "type": "tool_result",
    "tool_use_id": "toolu_01A09q90qw90lq917835lq9",
    "content": "72°F, sunny, humidity 45%"
  }]
}`} /></Reveal>
        <Reveal><p style={styles.prose}>The <strong>tool use loop</strong> enables multi-step tasks: loop while <code style={styles.code}>stop_reason == "tool_use"</code>, extract the tool call, execute it, append results, and call the API again. The loop ends when Claude gives a final text response (<code style={styles.code}>stop_reason: "end_turn"</code>).</p></Reveal>
        <Reveal><TipCallout variant="tip">Claude never executes tools — it proposes calls. Your code intercepts them, runs the actual function, and feeds results back. This keeps you in control of all side effects.</TipCallout></Reveal>

          <MCQSection color={colors[0]} count={s1.length}>
            {s1.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[i]} /></Reveal>)}
          </MCQSection>

        <div style={styles.divider}>· · ·</div>

        <Reveal id="set2"><div style={{ ...styles.setLabel, color: C[2] }}>Set 2 — Advanced Tool Patterns</div><h2 style={styles.h2}>Fine-grained control</h2></Reveal>
        <Reveal><p style={styles.prose}>Claude can make <strong>parallel tool calls</strong> — returning multiple <code style={styles.code}>tool_use</code> blocks in one response when tasks are independent. Process all of them and return all <code style={styles.code}>tool_result</code> blocks in a single user message.</p></Reveal>
        <Reveal><p style={styles.prose}>The <strong><code style={styles.code}>tool_choice</code></strong> parameter controls tool-calling behavior:</p></Reveal>
        <Reveal><ComparisonTable headers={['Mode', 'Behavior']} rows={[
          ['"auto" (default)', 'Claude decides whether to use tools'],
          ['"any"', 'Claude must use at least one tool'],
          ['{"type":"tool","name":"..."}', 'Claude must use a specific tool'],
        ]} /></Reveal>
        <Reveal><p style={styles.prose}>Anthropic provides built-in tools like the <strong>text editor</strong> (read, create, edit files via <code style={styles.code}>str_replace</code>) and <strong>web search</strong> (real-time information retrieval with citations). These extend Claude's capabilities without you building the underlying functions.</p></Reveal>
        <Reveal><p style={styles.prose}>For good <strong>schema design</strong>: use descriptive parameter names, write detailed descriptions, mark required fields, provide enum values for fixed choices, and keep schemas focused on single responsibilities.</p></Reveal>
        <Reveal><TipCallout variant="tip">Force a specific tool with <code style={styles.code}>tool_choice</code> when you always need structured extraction — Claude will always call that tool, giving you a guaranteed JSON schema for the output.</TipCallout></Reveal>

          <MCQSection color={colors[s1.length]} count={s2.length}>
            {s2.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + i]} /></Reveal>)}
          </MCQSection>

        <div style={styles.divider}>· · ·</div>
        <Reveal id="summary"><div style={styles.endSection}><div style={styles.endLabel}>End of Lesson 23</div>
          <p style={styles.endProse}>You can now define tools with proper schemas, implement the tool use loop, handle parallel tool calls, control tool selection with tool_choice, and leverage Anthropic's built-in tools for file editing and web search.</p>
          <a href="/claude-code-anki/api/rag" style={styles.nextBtn}>Next → Lesson 24: RAG & Agentic Search</a></div></Reveal>
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
