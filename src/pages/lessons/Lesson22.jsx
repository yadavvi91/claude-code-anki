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
const lesson = mod.lessons[2]
const sets = lesson.cardSets
const C = T.setColor
const palette = [C[1], C[2], C[3], C[4], C[5], C[6]]
let ci = 0; function nc() { return palette[ci++ % 6] }
const allCards = sets.flatMap(s => s.cards)
const colors = allCards.map(() => nc())
const s1 = sets[0].cards
const s2 = sets[1].cards

const NAV_SECTIONS = [
  { id: 'set1', label: 'Core Techniques' },
  { id: 'set2', label: 'Advanced Patterns' },
  { id: 'summary', label: 'Summary', divider: true },
]

export default function Lesson22() {
  return (
    <div style={styles.page}><NavSidebar sections={NAV_SECTIONS} /><LessonNav moduleTitle="Anthropic API" moduleColor={mod.color} prevLink="/api/prompt-eval" prevLabel="L21: Prompt Evaluation" nextLink="/api/tool-use" nextLabel="L23: Tool Use" />
      <main style={styles.main}>
        <Reveal><div style={styles.lessonLabel}>Lesson 22</div><h1 style={styles.h1}>Prompt Engineering</h1>
          <p style={styles.subtitle}>Core techniques and advanced patterns for crafting effective prompts</p></Reveal>
        <Reveal><ConceptDisplay concept="Clarity · XML Tags · Few-Shot · Prefilling · Chaining" description="From clear instructions to sophisticated patterns: the prompt engineer's complete toolkit." color={mod.color} /></Reveal>

        <Reveal id="set1"><div style={{ ...styles.setLabel, color: C[1] }}>Set 1 — Core Techniques</div><h2 style={styles.h2}>The fundamentals of great prompts</h2></Reveal>
        <Reveal><p style={styles.prose}><strong>Being clear and direct</strong> is the most impactful technique. State exactly what you want: the task, format, constraints, and audience. "Summarize this for a technical audience in 3 bullet points, each under 20 words" beats "Summarize this."</p></Reveal>
        <Reveal><p style={styles.prose}><strong>Being specific</strong> goes further — it constrains <em>how</em> Claude executes. Clarity defines the task; specificity defines the output format, length, style, audience, scope, and edge-case handling.</p></Reveal>
        <Reveal><p style={styles.prose}><strong>XML tags</strong> create unambiguous boundaries between instructions, data, and format requirements. Claude was trained to recognize them as semantic delimiters. They prevent instructions from bleeding into data and make variable injection safe.</p></Reveal>
        <Reveal><CodeBlock title="XML-Structured Prompt" code={`<instructions>
Classify the feedback below as positive, negative, or mixed.
Return JSON with "sentiment" and "confidence" fields.
</instructions>

<feedback>
{{USER_FEEDBACK}}
</feedback>`} /></Reveal>
        <Reveal><p style={styles.prose}><strong>Few-shot examples</strong> show Claude exactly what you want by demonstration. Provide 2-5 diverse input/output pairs wrapped in XML tags. Include a typical case, an edge case, and a tricky case.</p></Reveal>
        <Reveal><p style={styles.prose}><strong>Prompt prefilling</strong> constrains the response from the first character. Add a partial assistant message — <code style={styles.code}>{"{"}</code> forces JSON, <code style={styles.code}>{"<answer>"}</code> forces that tag format. Claude continues naturally from where you left off.</p></Reveal>
        <Reveal><TipCallout variant="tip">Combine techniques for maximum reliability: XML tags for structure + few-shot examples for pattern + prefilling for format. Each technique eliminates a different category of unwanted output.</TipCallout></Reveal>

          <MCQSection color={colors[0]} count={s1.length}>
            {s1.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[i]} /></Reveal>)}
          </MCQSection>

        <div style={styles.divider}>· · ·</div>

        <Reveal id="set2"><div style={{ ...styles.setLabel, color: C[2] }}>Set 2 — Advanced Patterns</div><h2 style={styles.h2}>Beyond the basics</h2></Reveal>
        <Reveal><p style={styles.prose}><strong>Chain-of-thought</strong> asks Claude to show its reasoning before answering. "Think step by step" improves accuracy on math, logic, code debugging, and multi-step analysis. Reserve it for tasks where reasoning matters — it adds latency for simpler tasks.</p></Reveal>
        <Reveal><p style={styles.prose}><strong>Role prompting</strong> assigns Claude a persona in the system prompt: "You are a senior security engineer." This shifts vocabulary, depth, perspective, and priorities. Combine it with specific instructions about what the role should focus on.</p></Reveal>
        <Reveal><p style={styles.prose}><strong>Variable data injection</strong> should always use XML delimiters. Wrap user input in tags like <code style={styles.code}>{"<feedback>...</feedback>"}</code> to create a clear boundary between your instructions and untrusted data — this is a key defense against prompt injection.</p></Reveal>
        <Reveal><p style={styles.prose}><strong>Prompt chaining</strong> breaks complex tasks into sequential API calls where each output feeds the next. Each step gets a specialized prompt and full attention. Better when accuracy on sub-steps matters more than latency.</p></Reveal>
        <Reveal><p style={styles.prose}><strong>Iterating effectively</strong>: change one thing at a time, test against your eval dataset, compare against the baseline, and document what worked. Systematic iteration beats rewriting from scratch.</p></Reveal>
        <Reveal><TipCallout variant="tip">The most common prompt engineering mistake is being vague. Before sending any prompt, ask: "If I gave this instruction to ten different people, would they all produce the same output?" If not, add more constraints.</TipCallout></Reveal>

          <MCQSection color={colors[s1.length]} count={s2.length}>
            {s2.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + i]} /></Reveal>)}
          </MCQSection>

        <div style={styles.divider}>· · ·</div>
        <Reveal id="summary"><div style={styles.endSection}><div style={styles.endLabel}>End of Lesson 22</div>
          <p style={styles.endProse}>You now command the full prompt engineering toolkit: clarity, specificity, XML tags, few-shot examples, prefilling, chain-of-thought, role prompting, safe variable injection, prompt chaining, and systematic iteration.</p>
          <a href="/claude-code-anki/api/tool-use" style={styles.nextBtn}>Next → Lesson 23: Tool Use</a></div></Reveal>
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
