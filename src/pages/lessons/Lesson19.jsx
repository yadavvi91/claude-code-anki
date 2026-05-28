import { modules } from '../../data/cardSets'
import MCQCard from '../../components/MCQCard'
import MCQSection from '../../components/MCQSection'
import Reveal from '../../components/Reveal'
import LessonNav from '../../components/LessonNav'
import NavSidebar from '../../components/NavSidebar'
import ConceptDisplay from '../../components/ConceptDisplay'
import ComparisonTable from '../../components/ComparisonTable'
import TipCallout from '../../components/TipCallout'
import { T } from '../../theme'

const base = '/claude-code-anki/images/'
const mod = modules[6]
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
  { id: 'set1', label: 'Discernment' },
  { id: 'set2', label: 'Diligence' },
  { id: 'summary', label: 'Summary', divider: true },
]

export default function Lesson19() {
  return (
    <div style={styles.page}><NavSidebar sections={NAV_SECTIONS} /><LessonNav moduleTitle="AI Fluency (4D Framework)" moduleColor={mod.color} prevLink="/ai-fluency/delegation-description" prevLabel="L18: Delegation & Description" nextLink="/api/fundamentals" nextLabel="L20: API Fundamentals" />
      <main style={styles.main}>
        <Reveal><div style={styles.lessonLabel}>Lesson 19</div><h1 style={styles.h1}>Discernment & Diligence</h1>
          <p style={styles.subtitle}>Evaluating AI outputs critically and ensuring responsible, ethical use</p></Reveal>
        <Reveal><ConceptDisplay concept="Product · Process · Performance Discernment · Creation · Transparency · Deployment Diligence" description="The final two Ds: critical evaluation of AI outputs and ethical responsibility — closing the collaboration loop." color={mod.color} /></Reveal>

        <Reveal id="set1"><div style={{ ...styles.setLabel, color: C[1] }}>Set 1 — Discernment</div><h2 style={styles.h2}>Evaluating what comes back</h2></Reveal>
        <Reveal><p style={styles.prose}>Discernment is the "flip side" of Description. Description helps you communicate intentions; Discernment helps you evaluate whether outputs meet those intentions. Together they form the <strong>Description-Discernment loop</strong> — an iterative cycle of describe → evaluate → refine → evaluate again.</p></Reveal>
        <Reveal><p style={styles.prose}>Like Description, Discernment has three components. <strong>Product Discernment</strong> evaluates the output itself — is it accurate, appropriate, coherent, and relevant? <strong>Process Discernment</strong> assesses the AI's methodology — did it reason logically, follow the right steps, or skip critical thinking? <strong>Performance Discernment</strong> evaluates the AI's behavior — was it communicating in the style you wanted?</p></Reveal>
        <Reveal><ComparisonTable headers={['Type', 'What You\'re Checking', 'Red Flag Example']} rows={[
          ['Product', 'Output quality — accuracy, coherence, relevance', 'Statistics that are too convenient or unsourced'],
          ['Process', 'Reasoning path — logical steps, methodology', 'Skipped a critical step, jumped to conclusions'],
          ['Performance', 'Behavior style — tone, challenge level, responsiveness', 'Too agreeable when you asked for pushback'],
        ]} /></Reveal>
        <Reveal><img src={`${base}aif_discernment.jpg`} alt="Discernment types — Product, Process, Performance with Description-Discernment loop" style={styles.img} /></Reveal>
        <Reveal><p style={styles.prose}>The <strong>Description-Discernment loop</strong> is the core workflow of AI collaboration. Each cycle improves both your Description skills and the AI's output. The course claims this iterative process can produce results that exceed what either human or AI could achieve independently — the whole is greater than the sum of its parts.</p></Reveal>
        <Reveal><TipCallout variant="warning">AI can't reliably evaluate its own outputs — it doesn't "know what it doesn't know." Your domain expertise, contextual understanding, and ethical judgment are what catch subtle errors, factual inaccuracies, and confident-sounding hallucinations.</TipCallout></Reveal>

          <MCQSection color={colors[0]} count={s1.length}>
            {s1.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[i]} /></Reveal>)}
          </MCQSection>

        <div style={styles.divider}>· · ·</div>

        <Reveal id="set2"><div style={{ ...styles.setLabel, color: C[2] }}>Set 2 — Diligence</div><h2 style={styles.h2}>The ethical dimension</h2></Reveal>
        <Reveal><p style={styles.prose}>Diligence addresses a different dimension than the other three competencies. While Delegation, Description, and Discernment cover <strong>effectiveness and efficiency</strong>, Diligence ensures <strong>ethical and safe</strong> AI use — the responsible half of AI Fluency's definition.</p></Reveal>
        <Reveal><p style={styles.prose}>Diligence has three components. <strong>Creation Diligence</strong> means being thoughtful about which AI systems you choose — considering privacy, security, and ethical implications of sharing your data. <strong>Transparency Diligence</strong> means being honest about AI's role in your work with everyone who needs to know. <strong>Deployment Diligence</strong> means taking ownership of AI-assisted outputs — verifying facts, checking for biases, and vouching for what you share.</p></Reveal>
        <Reveal><ComparisonTable headers={['Component', 'Core Principle', 'Practical Test']} rows={[
          ['Creation', 'Choose AI systems thoughtfully', 'Does this system protect my data? Does the vendor\'s ethics align with mine?'],
          ['Transparency', 'Be open about AI\'s role', 'Would I be comfortable if my team knew how much AI contributed?'],
          ['Deployment', 'Take ownership of outputs', 'Have I verified facts, checked biases, and ensured accuracy before sharing?'],
        ]} /></Reveal>
        <Reveal><img src={`${base}aif_diligence.jpg`} alt="Diligence components — Creation, Transparency, Deployment with ownership principle" style={styles.img} /></Reveal>
        <Reveal><p style={styles.prose}>Deployment Diligence carries a clear principle: <strong>if your name is on it, you own it</strong>. AI-assisted work is still your responsibility. A disclaimer saying "AI-generated" addresses Transparency but not Deployment — you must still verify facts, check for biases, ensure accuracy, and confirm usage rights before sharing.</p></Reveal>
        <Reveal><TipCallout variant="tip">When in doubt about Transparency, default to disclosure. Even without a formal AI policy, proactive honesty builds trust. Different contexts (academic, professional, personal) may have different norms, but transparency is always the safer default.</TipCallout></Reveal>

          <MCQSection color={colors[s1.length]} count={s2.length}>
            {s2.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + i]} /></Reveal>)}
          </MCQSection>

        <div style={styles.divider}>· · ·</div>
        <Reveal id="summary"><div style={styles.endSection}><div style={styles.endLabel}>End of Lesson 19</div>
          <p style={styles.endProse}>You've completed the AI Fluency module. You now understand all four competencies: Delegation (strategic task assignment), Description (clear communication), Discernment (critical evaluation), and Diligence (ethical responsibility). The Description-Discernment loop is the core workflow — use it every time you collaborate with AI. Remember: effective, efficient, ethical, and safe.</p>
          <a href="/claude-code-anki/api/fundamentals" style={styles.nextBtn}>Next → Lesson 20: API Fundamentals</a></div></Reveal>
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
  divider: { textAlign: 'center', color: T.color.bg3, fontSize: '1rem', margin: '3rem 0', letterSpacing: '0.5em' },
  endSection: { textAlign: 'center', padding: '2rem 0' },
  endLabel: { fontFamily: T.font.label, fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.color.ink4, marginBottom: '1.5rem' },
  endProse: { fontFamily: T.font.prose, fontSize: '1rem', lineHeight: 1.8, color: T.color.ink3, marginBottom: '1rem', maxWidth: '55ch', marginLeft: 'auto', marginRight: 'auto', textAlign: 'left' },
  img: { width: '100%', maxWidth: '720px', borderRadius: '8px', margin: '1rem auto', display: 'block' },
  nextBtn: { display: 'inline-block', marginTop: '1.5rem', padding: '0.85rem 2.5rem', border: `1px solid ${T.color.accent}`, borderRadius: '4px', fontFamily: T.font.label, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', color: T.color.accent, transition: 'background 0.25s, color 0.25s' },
}
