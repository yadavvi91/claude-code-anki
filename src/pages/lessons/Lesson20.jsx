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
const lesson = mod.lessons[0]
const sets = lesson.cardSets
const C = T.setColor
const palette = [C[1], C[2], C[3], C[4], C[5], C[6]]
let ci = 0; function nc() { return palette[ci++ % 6] }
const allCards = sets.flatMap(s => s.cards)
const colors = allCards.map(() => nc())
const s1 = sets[0].cards
const s2 = sets[1].cards

const NAV_SECTIONS = [
  { id: 'set1', label: 'Models & API Access' },
  { id: 'set2', label: 'Conversations & Output' },
  { id: 'summary', label: 'Summary', divider: true },
]

export default function Lesson20() {
  return (
    <div style={styles.page}><NavSidebar sections={NAV_SECTIONS} /><LessonNav moduleTitle="Anthropic API" moduleColor={mod.color} prevLink="/ai-fluency/discernment-diligence" prevLabel="L19: Discernment & Diligence" nextLink="/api/prompt-eval" nextLabel="L21: Prompt Evaluation" />
      <main style={styles.main}>
        <Reveal><div style={styles.lessonLabel}>Lesson 20</div><h1 style={styles.h1}>API Fundamentals</h1>
          <p style={styles.subtitle}>Claude model families, the Messages API, SDKs, and response structure</p></Reveal>
        <Reveal><ConceptDisplay concept="Models · Messages API · SDK · Streaming" description="The foundation: choosing a model, making requests, parsing responses, and building real-time interfaces." color={mod.color} /></Reveal>

        <Reveal id="set1"><div style={{ ...styles.setLabel, color: C[1] }}>Set 1 — Models & API Access</div><h2 style={styles.h2}>Getting started with Claude</h2></Reveal>
        <Reveal><p style={styles.prose}>Claude comes in <strong>three model families</strong> with distinct trade-offs. <strong>Haiku</strong> optimizes for speed and cost — ideal for high-volume, simpler tasks. <strong>Sonnet</strong> balances capability with efficiency. <strong>Opus</strong> delivers maximum intelligence for the hardest problems, at higher cost and latency.</p></Reveal>
        <Reveal><ComparisonTable headers={['Family', 'Strength', 'Best For']} rows={[
          ['Haiku', 'Speed & cost', 'Classification, routing, simple extraction'],
          ['Sonnet', 'Balance', 'Most production tasks, coding, analysis'],
          ['Opus', 'Max capability', 'Complex reasoning, research, hard problems'],
        ]} /></Reveal>
        <Reveal><p style={styles.prose}>Every request goes to <strong><code style={styles.code}>POST https://api.anthropic.com/v1/messages</code></strong>. Two headers are required: <strong><code style={styles.code}>x-api-key</code></strong> for authentication and <strong><code style={styles.code}>anthropic-version</code></strong> for the API version. The request body needs three fields: <code style={styles.code}>model</code>, <code style={styles.code}>max_tokens</code>, and <code style={styles.code}>messages</code>.</p></Reveal>
        <Reveal><CodeBlock title="Minimal API Request" code={`curl https://api.anthropic.com/v1/messages \\
  -H "x-api-key: $ANTHROPIC_API_KEY" \\
  -H "anthropic-version: 2023-06-01" \\
  -H "content-type: application/json" \\
  -d '{
    "model": "claude-sonnet-4-20250514",
    "max_tokens": 1024,
    "messages": [{"role": "user", "content": "Hello"}]
  }'`} /></Reveal>
        <Reveal><p style={styles.prose}>The <strong>Anthropic SDK</strong> wraps these HTTP calls in a more ergonomic interface. It reads <code style={styles.code}>ANTHROPIC_API_KEY</code> from environment variables, provides typed responses, and handles retries automatically. Available for Python and TypeScript.</p></Reveal>
        <Reveal><TipCallout variant="tip">The response <code style={styles.code}>content</code> field is always an <strong>array</strong> of content blocks (text, tool_use, thinking). Extract text via <code style={styles.code}>response.content[0].text</code>. The <code style={styles.code}>usage</code> field tracks token counts for billing.</TipCallout></Reveal>

          <MCQSection color={colors[0]} count={s1.length}>
            {s1.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[i]} /></Reveal>)}
          </MCQSection>

        <div style={styles.divider}>· · ·</div>

        <Reveal id="set2"><div style={{ ...styles.setLabel, color: C[2] }}>Set 2 — Conversations, System Prompts & Output Control</div><h2 style={styles.h2}>Shaping Claude's behavior</h2></Reveal>
        <Reveal><p style={styles.prose}>The API is <strong>stateless</strong> — there are no session IDs. To have a multi-turn conversation, send the <strong>full conversation history</strong> in the <code style={styles.code}>messages</code> array each time, alternating <code style={styles.code}>user</code> and <code style={styles.code}>assistant</code> roles.</p></Reveal>
        <Reveal><p style={styles.prose}>The <strong>system prompt</strong> is a top-level <code style={styles.code}>system</code> field (not inside messages). It sets Claude's persona, behavioral constraints, and persistent instructions. It's processed before any messages — ideal for role definitions and format requirements.</p></Reveal>
        <Reveal><p style={styles.prose}><strong>Temperature</strong> controls randomness: <code style={styles.code}>0.0</code> for deterministic output (code, math, classification), <code style={styles.code}>~0.7</code> for creative tasks, up to <code style={styles.code}>1.0</code> (the default) for maximum variety.</p></Reveal>
        <Reveal><p style={styles.prose}><strong>Streaming</strong> uses server-sent events (SSE) to deliver tokens as they're generated. The SDK provides <code style={styles.code}>client.messages.stream()</code> with a convenient <code style={styles.code}>text_stream</code> iterator. Events include <code style={styles.code}>message_start</code>, <code style={styles.code}>content_block_delta</code>, and <code style={styles.code}>message_stop</code>.</p></Reveal>
        <Reveal><TipCallout variant="tip">To force structured JSON output, combine three techniques: describe the format in instructions, use XML tags to delimit sections, and <strong>prefill</strong> the assistant response with <code style={styles.code}>{"{"}</code>.</TipCallout></Reveal>

          <MCQSection color={colors[s1.length]} count={s2.length}>
            {s2.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + i]} /></Reveal>)}
          </MCQSection>

        <div style={styles.divider}>· · ·</div>
        <Reveal id="summary"><div style={styles.endSection}><div style={styles.endLabel}>End of Lesson 20</div>
          <p style={styles.endProse}>You now know the three model families, the Messages API's required fields and headers, how the SDK simplifies integration, and techniques for multi-turn conversations, system prompts, streaming, and structured output.</p>
          <a href="/claude-code-anki/api/prompt-eval" style={styles.nextBtn}>Next → Lesson 21: Prompt Evaluation</a></div></Reveal>
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
