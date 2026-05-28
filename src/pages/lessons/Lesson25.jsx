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
const lesson = mod.lessons[5]
const sets = lesson.cardSets
const C = T.setColor
const palette = [C[1], C[2], C[3], C[4], C[5], C[6]]
let ci = 0; function nc() { return palette[ci++ % 6] }
const allCards = sets.flatMap(s => s.cards)
const colors = allCards.map(() => nc())
const s1 = sets[0].cards
const s2 = sets[1].cards

const NAV_SECTIONS = [
  { id: 'set1', label: 'Thinking, Vision & Docs' },
  { id: 'set2', label: 'Caching & Files API' },
  { id: 'summary', label: 'Summary', divider: true },
]

export default function Lesson25() {
  return (
    <div style={styles.page}><NavSidebar sections={NAV_SECTIONS} /><LessonNav moduleTitle="Anthropic API" moduleColor={mod.color} prevLink="/api/rag" prevLabel="L24: RAG & Search" nextLink="/api/mcp" nextLabel="L26: MCP with the API" />
      <main style={styles.main}>
        <Reveal><div style={styles.lessonLabel}>Lesson 25</div><h1 style={styles.h1}>Claude Features</h1>
          <p style={styles.subtitle}>Extended thinking, vision, PDFs, citations, code execution, and prompt caching</p></Reveal>
        <Reveal><ConceptDisplay concept="Thinking · Vision · PDFs · Citations · Caching · Code Exec" description="Claude's full feature set: see images, read documents, reason deeply, cite sources, and run code." color={mod.color} /></Reveal>

        <Reveal id="set1"><div style={{ ...styles.setLabel, color: C[1] }}>Set 1 — Thinking, Vision & Documents</div><h2 style={styles.h2}>Beyond text-in, text-out</h2></Reveal>
        <Reveal><p style={styles.prose}><strong>Extended thinking</strong> gives Claude a private scratchpad to reason through complex problems. Enable it with the <code style={styles.code}>thinking</code> parameter and set a <code style={styles.code}>budget_tokens</code> cap. The response includes thinking blocks (internal reasoning) followed by text blocks (the answer).</p></Reveal>
        <Reveal><CodeBlock title="Enabling Extended Thinking" code={`{
  "model": "claude-sonnet-4-20250514",
  "max_tokens": 16000,
  "thinking": {
    "type": "enabled",
    "budget_tokens": 10000
  },
  "messages": [...]
}`} /></Reveal>
        <Reveal><p style={styles.prose}><strong>Vision</strong>: send images as content blocks with base64-encoded data or URL source. Claude handles JPEG, PNG, GIF, and WebP. Multiple images per message are supported. No separate endpoint — images go through the same Messages API.</p></Reveal>
        <Reveal><p style={styles.prose}><strong>PDF support</strong>: send PDFs as <code style={styles.code}>document</code> content blocks. Claude reads text natively, analyzes tables, interprets charts, and processes multi-page documents — often eliminating the need for external PDF parsing.</p></Reveal>
        <Reveal><p style={styles.prose}><strong>Citations</strong> let Claude reference specific passages from source documents, linking claims to exact locations. This makes every statement verifiable and dramatically reduces hallucination risk.</p></Reveal>
        <Reveal><p style={styles.prose}><strong>Code execution</strong> lets Claude write and run Python in a sandboxed environment. Ideal for data analysis, math verification, chart generation, and testing code logic. No network access or persistent state in the sandbox.</p></Reveal>
        <Reveal><TipCallout variant="tip">Extended thinking shines for math, coding, analysis, and multi-step reasoning. For simple tasks (translation, formatting), it adds unnecessary latency. Match the feature to the task complexity.</TipCallout></Reveal>

          <MCQSection color={colors[0]} count={s1.length}>
            {s1.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[i]} /></Reveal>)}
          </MCQSection>

        <div style={styles.divider}>· · ·</div>

        <Reveal id="set2"><div style={{ ...styles.setLabel, color: C[2] }}>Set 2 — Caching & Files API</div><h2 style={styles.h2}>Optimizing cost and speed</h2></Reveal>
        <Reveal><p style={styles.prose}><strong>Prompt caching</strong> stores processed prefixes on Anthropic's servers. When repeated requests share the same prefix (system prompt, tools, reference docs), cached tokens are <strong>10x cheaper</strong> and much faster to process.</p></Reveal>
        <Reveal><p style={styles.prose}>For caching to work: the prefix must be <strong>identical</strong> across requests, meet minimum token thresholds (1024 for Sonnet/Opus), be marked with <code style={styles.code}>cache_control</code>, and come <strong>before</strong> dynamic content.</p></Reveal>
        <Reveal><ComparisonTable headers={['Content', 'Stability', 'Position']} rows={[
          ['System prompt', 'Highest (rarely changes)', 'First (cached)'],
          ['Tool definitions', 'High', 'Second (cached)'],
          ['Reference docs', 'Medium', 'Third (cached)'],
          ['Conversation history', 'Low (grows each turn)', 'Fourth (dynamic)'],
          ['Current query', 'None (always new)', 'Last (dynamic)'],
        ]} /></Reveal>
        <Reveal><p style={styles.prose}>The <strong>Files API</strong> lets you upload files that persist across conversation turns and are accessible to Claude's code execution sandbox. This enables multi-step workflows: upload a CSV → Claude analyzes it → generates charts → you download results.</p></Reveal>
        <Reveal><p style={styles.prose}>Tool definitions are one of the best caching targets — they rarely change between requests. Place tools before the messages array and add a <code style={styles.code}>cache_control</code> breakpoint after them. This is especially impactful for applications with many large tool schemas.</p></Reveal>
        <Reveal><TipCallout variant="tip">Caches are ephemeral (~5 minute TTL, refreshed on use). Structure your prompts so the most stable content comes first and the cache breakpoint sits right before the dynamic conversation history.</TipCallout></Reveal>

          <MCQSection color={colors[s1.length]} count={s2.length}>
            {s2.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + i]} /></Reveal>)}
          </MCQSection>

        <div style={styles.divider}>· · ·</div>
        <Reveal id="summary"><div style={styles.endSection}><div style={styles.endLabel}>End of Lesson 25</div>
          <p style={styles.endProse}>You've mastered Claude's advanced features: extended thinking for deep reasoning, vision and PDF processing for multimodal input, citations for verifiable output, code execution for computation, and prompt caching for cost optimization.</p>
          <a href="/claude-code-anki/api/mcp" style={styles.nextBtn}>Next → Lesson 26: MCP with the API</a></div></Reveal>
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
