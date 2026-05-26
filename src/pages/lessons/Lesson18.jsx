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

const mod = modules[6]
const lesson = mod.lessons[1]
const sets = lesson.cardSets
const C = T.setColor
const palette = [C[1], C[2], C[3], C[4], C[5], C[6]]
let ci = 0; function nc() { return palette[ci++ % 6] }
const allCards = sets.flatMap(s => s.cards)
const colors = allCards.map(() => nc())
const s1 = sets[0].cards
const s2 = sets[1].cards

const NAV_SECTIONS = [
  { id: 'set1', label: 'Delegation' },
  { id: 'set2', label: 'Description' },
  { id: 'summary', label: 'Summary', divider: true },
]

export default function Lesson18() {
  return (
    <div style={styles.page}><NavSidebar sections={NAV_SECTIONS} /><LessonNav moduleTitle="AI Fluency (4D Framework)" moduleColor={mod.color} prevLink="/ai-fluency/framework" prevLabel="L17: 4D Framework & Gen AI" nextLink="/ai-fluency/discernment-diligence" nextLabel="L19: Discernment & Diligence" />
      <main style={styles.main}>
        <Reveal><div style={styles.lessonLabel}>Lesson 18</div><h1 style={styles.h1}>Delegation & Description</h1>
          <p style={styles.subtitle}>Deciding what to hand off to AI and communicating your intentions with precision</p></Reveal>
        <Reveal><ConceptDisplay concept="Problem Awareness · Platform Awareness · Task Delegation · Product · Process · Performance Description" description="The first two Ds: strategic task assignment and clear communication — the foundation of every AI interaction." color={mod.color} /></Reveal>

        <Reveal id="set1"><div style={{ ...styles.setLabel, color: C[1] }}>Set 1 — Delegation</div><h2 style={styles.h2}>Strategic task assignment</h2></Reveal>
        <Reveal><p style={styles.prose}>Delegation isn't about offloading everything to AI. It's about creating the <strong>most effective human-AI partnership</strong> for each task. The competency has three components: <strong>Problem Awareness</strong>, <strong>Platform Awareness</strong>, and <strong>Task Delegation</strong>.</p></Reveal>
        <Reveal><p style={styles.prose}><strong>Problem Awareness</strong> comes first — clearly understanding your goals and the work involved before deciding what to delegate. Without it, you're blindly handing off work without knowing what "good" looks like. <strong>Platform Awareness</strong> means understanding what different AI systems can and cannot do — their strengths (speed, breadth, pattern recognition) and limitations (hallucinations, reasoning gaps, knowledge cutoffs).</p></Reveal>
        <Reveal><ComparisonTable headers={['Component', 'Key Question', 'What It Prevents']} rows={[
          ['Problem Awareness', 'What am I actually trying to achieve?', 'Delegating before understanding the goal'],
          ['Platform Awareness', 'What can this AI system do well (and poorly)?', 'Over-delegating or under-delegating'],
          ['Task Delegation', 'Who should do what — human, AI, or together?', 'Inefficient allocation of effort'],
        ]} /></Reveal>
        <Reveal><p style={styles.prose}>The course recommends using <strong>AI itself as a planning partner</strong>. Share your project idea with Claude, let it ask questions to refine the vision, then collaboratively identify tasks and decide which benefit from human vs. AI strengths. Delegation becomes a conversation, not a solo planning exercise.</p></Reveal>
        <Reveal><TipCallout variant="tip">Before delegating, ask yourself: "Do I understand this well enough to evaluate the result?" If not, build Problem Awareness first — even if that means using AI to help you understand the problem before using AI to solve it.</TipCallout></Reveal>

          <MCQSection color={colors[0]} count={s1.length}>
            {s1.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[i]} /></Reveal>)}
          </MCQSection>

        <div style={styles.divider}>· · ·</div>

        <Reveal id="set2"><div style={{ ...styles.setLabel, color: C[2] }}>Set 2 — Description</div><h2 style={styles.h2}>Communicating with precision</h2></Reveal>
        <Reveal><p style={styles.prose}>Description is how you communicate your intentions to AI. The course frames AI systems as <strong>"interactive partners, not databases or vending machines"</strong> — you should brief them like a skilled colleague, providing context, goals, and expectations. Description has three components:</p></Reveal>
        <Reveal><ComparisonTable headers={['Component', 'What It Covers', 'Example']} rows={[
          ['Product Description', 'What to create — format, audience, style, length', '"Write a 500-word blog post for developers in a casual tone"'],
          ['Process Description', 'How to approach it — methodology, steps, constraints', '"Research first, outline, then draft. Cite primary sources only"'],
          ['Performance Description', 'How to behave — tone, challenge level, interaction style', '"Be concise. Push back on weak arguments. Ask probing questions"'],
        ]} /></Reveal>
        <Reveal><p style={styles.prose}>A vague prompt like "Write me a blog post" is missing all three. It has no Product spec (topic? audience? length?), no Process guidance (research first? outline?), and no Performance direction (concise? detailed? challenging?). Clear Description across all three components saves iteration time.</p></Reveal>
        <Reveal><p style={styles.prose}>The course identifies <strong>six foundational prompting techniques</strong>: giving context, breaking complex tasks into steps, defining role or tone, providing examples, specifying output format, and the "secret weapon" — <strong>asking AI to help improve your prompt</strong>. This meta-prompting technique leverages the AI's understanding of what makes a good prompt.</p></Reveal>
        <Reveal><TipCallout variant="tip">Performance Description is the most overlooked component. If Claude is too verbose, too agreeable, or not challenging enough — that's a Performance Description gap. Tell it explicitly how you want it to behave.</TipCallout></Reveal>

          <MCQSection color={colors[s1.length]} count={s2.length}>
            {s2.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + i]} /></Reveal>)}
          </MCQSection>

        <div style={styles.divider}>· · ·</div>
        <Reveal id="summary"><div style={styles.endSection}><div style={styles.endLabel}>End of Lesson 18</div>
          <p style={styles.endProse}>You now understand Delegation's three components (Problem Awareness, Platform Awareness, Task Delegation) and Description's three components (Product, Process, Performance). Together they cover the "input" side of AI collaboration — what to hand off and how to communicate it. Next: how to evaluate what comes back.</p>
          <a href="/claude-code-anki/ai-fluency/discernment-diligence" style={styles.nextBtn}>Next → Lesson 19: Discernment & Diligence</a></div></Reveal>
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
  nextBtn: { display: 'inline-block', marginTop: '1.5rem', padding: '0.85rem 2.5rem', border: `1px solid ${T.color.accent}`, borderRadius: '4px', fontFamily: T.font.label, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', color: T.color.accent, transition: 'background 0.25s, color 0.25s' },
}
