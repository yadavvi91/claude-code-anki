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
const lesson = mod.lessons[4]
const sets = lesson.cardSets
const C = T.setColor
const palette = [C[1], C[2], C[3], C[4], C[5], C[6]]
let ci = 0; function nc() { return palette[ci++ % 6] }
const allCards = sets.flatMap(s => s.cards)
const colors = allCards.map(() => nc())
const s1 = sets[0].cards
const s2 = sets[1].cards

const NAV_SECTIONS = [
  { id: 'set1', label: 'RAG Pipeline & Chunking' },
  { id: 'set2', label: 'Search Strategies' },
  { id: 'summary', label: 'Summary', divider: true },
]

export default function Lesson24() {
  return (
    <div style={styles.page}><NavSidebar sections={NAV_SECTIONS} /><LessonNav moduleTitle="Anthropic API" moduleColor={mod.color} prevLink="/api/tool-use" prevLabel="L23: Tool Use" nextLink="/api/features" nextLabel="L25: Claude Features" />
      <main style={styles.main}>
        <Reveal><div style={styles.lessonLabel}>Lesson 24</div><h1 style={styles.h1}>RAG & Agentic Search</h1>
          <p style={styles.subtitle}>Retrieval augmented generation, chunking strategies, and multi-index search pipelines</p></Reveal>
        <Reveal><ConceptDisplay concept="RAG · Chunking · Embeddings · BM25 · Multi-Index" description="Ground Claude's responses in your data: retrieve, rank, and inject the most relevant context." color={mod.color} /></Reveal>

        <Reveal id="set1"><div style={{ ...styles.setLabel, color: C[1] }}>Set 1 — RAG Pipeline & Chunking</div><h2 style={styles.h2}>From documents to answers</h2></Reveal>
        <Reveal><p style={styles.prose}><strong>RAG</strong> retrieves relevant documents from a knowledge base and includes them in Claude's context — grounding responses in your specific data rather than training knowledge alone. It solves two problems: the knowledge cutoff and hallucination.</p></Reveal>
        <Reveal><ComparisonTable headers={['RAG Step', 'What Happens']} rows={[
          ['1. Embed query', 'Convert the question to a vector'],
          ['2. Search', 'Find most similar chunks in vector DB'],
          ['3. Inject context', 'Include top-k chunks in the prompt'],
          ['4. Generate', 'Claude answers using the provided context'],
        ]} /></Reveal>
        <Reveal><p style={styles.prose}><strong>Chunking</strong> splits documents into smaller pieces for embedding and retrieval. Even with large context windows, sending everything is wasteful. Three main strategies:</p></Reveal>
        <Reveal><ComparisonTable headers={['Strategy', 'How It Works', 'Trade-off']} rows={[
          ['Fixed-size', '500 tokens per chunk', 'Simple but may break mid-sentence'],
          ['Semantic', 'Split by paragraph/section', 'Preserves meaning, variable sizes'],
          ['Overlapping', '50-token overlap at borders', 'Reduces info loss at boundaries'],
        ]} /></Reveal>
        <Reveal><p style={styles.prose}><strong>Embeddings</strong> are dense vector representations of text that capture semantic meaning. Similar texts have similar vectors, enabling retrieval by meaning rather than keyword matching. You need a dedicated embedding model (like Voyage AI) — Claude's API doesn't provide an embedding endpoint.</p></Reveal>
        <Reveal><TipCallout variant="tip">Chunk size significantly affects both embedding quality and retrieval precision. Very long chunks produce diluted embeddings; very short ones lose context. Experiment with your specific data to find the sweet spot.</TipCallout></Reveal>

          <MCQSection color={colors[0]} count={s1.length}>
            {s1.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[i]} /></Reveal>)}
          </MCQSection>

        <div style={styles.divider}>· · ·</div>

        <Reveal id="set2"><div style={{ ...styles.setLabel, color: C[2] }}>Set 2 — Search Strategies</div><h2 style={styles.h2}>Beyond simple vector search</h2></Reveal>
        <Reveal><p style={styles.prose}><strong>BM25 lexical search</strong> ranks documents by keyword frequency. It excels at finding exact terms (product names, error codes) while vector search excels at semantic similarity. They're <strong>complementary</strong>, not competing.</p></Reveal>
        <Reveal><p style={styles.prose}>A <strong>multi-index pipeline</strong> queries multiple retrieval strategies in parallel — vector search + BM25 + metadata filters — then merges results using <strong>reciprocal rank fusion (RRF)</strong>. RRF assigns scores based on rank position across methods, producing a balanced combined ranking.</p></Reveal>
        <Reveal><CodeBlock title="Reciprocal Rank Fusion" code={`# RRF score for a document
# k is a constant (typically 60)
score = sum(1 / (k + rank_in_method) for each method)

# Example: doc ranked #1 in vector, #3 in BM25
# score = 1/(60+1) + 1/(60+3) = 0.0164 + 0.0159 = 0.0323`} /></Reveal>
        <Reveal><p style={styles.prose}>Evaluate RAG quality on <strong>two dimensions</strong>: retrieval metrics (precision — are returned chunks relevant? recall — are all relevant chunks found?) and generation metrics (faithfulness — does the answer reflect the sources? relevance — does it answer the question?).</p></Reveal>
        <Reveal><p style={styles.prose}>Common <strong>failure modes</strong>: poor chunking (losing context at boundaries), irrelevant retrieval (wrong chunks), context stuffing (too many chunks diluting relevance), and unfaithful generation (Claude ignoring or contradicting sources).</p></Reveal>
        <Reveal><TipCallout variant="tip">Add instructions like "Only answer based on the provided context. If the context doesn't contain the answer, say so." This dramatically reduces hallucination in RAG systems.</TipCallout></Reveal>

          <MCQSection color={colors[s1.length]} count={s2.length}>
            {s2.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + i]} /></Reveal>)}
          </MCQSection>

        <div style={styles.divider}>· · ·</div>
        <Reveal id="summary"><div style={styles.endSection}><div style={styles.endLabel}>End of Lesson 24</div>
          <p style={styles.endProse}>You understand the full RAG pipeline from chunking to generation, the trade-offs between search strategies, how reciprocal rank fusion merges results, and how to evaluate and debug RAG systems.</p>
          <a href="/claude-code-anki/api/features" style={styles.nextBtn}>Next → Lesson 25: Claude Features</a></div></Reveal>
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
