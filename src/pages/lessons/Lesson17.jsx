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
  { id: 'set1', label: 'AI Fluency & the 4Ds' },
  { id: 'set2', label: 'Generative AI Foundations' },
  { id: 'summary', label: 'Summary', divider: true },
]

export default function Lesson17() {
  return (
    <div style={styles.page}><NavSidebar sections={NAV_SECTIONS} /><LessonNav moduleTitle="AI Fluency (4D Framework)" moduleColor={mod.color} prevLink="/copilot/coding-agent" prevLabel="L16: Coding Agent" nextLink="/ai-fluency/delegation-description" nextLabel="L18: Delegation & Description" />
      <main style={styles.main}>
        <Reveal><div style={styles.lessonLabel}>Lesson 17</div><h1 style={styles.h1}>The 4D Framework & Gen AI</h1>
          <p style={styles.subtitle}>What AI Fluency means, the four core competencies, three collaboration modes, and how large language models actually work</p></Reveal>
        <Reveal><ConceptDisplay concept="AI Fluency · 4D Framework · Automation · Augmentation · Agency" description="A structured framework for collaborating with AI effectively, efficiently, ethically, and safely." color={mod.color} /></Reveal>

        <Reveal id="set1"><div style={{ ...styles.setLabel, color: C[1] }}>Set 1 — AI Fluency & the 4Ds</div><h2 style={styles.h2}>What it means to be AI fluent</h2></Reveal>
        <Reveal><p style={styles.prose}>Anthropic defines <strong>AI Fluency</strong> as the ability to collaborate with AI systems in ways that are <strong>effective, efficient, ethical, and safe</strong>. It's not just about getting results — it demands responsible use alongside productivity.</p></Reveal>
        <Reveal><p style={styles.prose}>The framework identifies <strong>three modes of collaboration</strong>. <strong>Automation</strong> is when AI executes specific tasks based on your instructions — template-based generation, data formatting, batch processing. <strong>Augmentation</strong> is the collaborative mode — brainstorming, co-writing, iterative refinement where both human and AI contribute creatively. <strong>Agency</strong> is when you configure AI to work independently, establishing behavior patterns it follows without step-by-step guidance.</p></Reveal>
        <Reveal><img src={`${base}aif_collab_modes.jpg`} alt="Three collaboration modes — Automation, Augmentation, Agency on a spectrum" style={styles.img} /></Reveal>
        <Reveal><ComparisonTable headers={['Mode', 'Your Role', 'AI\'s Role', 'Example']} rows={[
          ['Automation', 'Define the task', 'Execute instructions', 'Generate reports from templates'],
          ['Augmentation', 'Creative partner', 'Thinking & execution partner', 'Brainstorm product names together'],
          ['Agency', 'Set up patterns', 'Work independently', 'AI agent triages & fixes bugs autonomously'],
        ]} /></Reveal>
        <Reveal><img src={`${base}aif_4d_framework.jpg`} alt="The 4D Framework — Delegation, Description, Discernment, Diligence cycle with AI Fluency at center" style={styles.img} /></Reveal>
        <Reveal><p style={styles.prose}>The <strong>4D Framework</strong> provides four competencies for effective AI collaboration: <strong>Delegation</strong> (deciding what to hand off), <strong>Description</strong> (communicating intentions clearly), <strong>Discernment</strong> (evaluating AI outputs critically), and <strong>Diligence</strong> (ensuring responsible, ethical use). Together they cover the full cycle — from task planning through execution to quality assurance and accountability.</p></Reveal>
        <Reveal><TipCallout variant="tip">The 4Ds form a natural workflow: Delegate strategically → Describe clearly → Discern critically → Practice Diligence always. Each competency builds on the previous one.</TipCallout></Reveal>

          <MCQSection color={colors[0]} count={s1.length}>
            {s1.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[i]} /></Reveal>)}
          </MCQSection>

        <div style={styles.divider}>· · ·</div>

        <Reveal id="set2"><div style={{ ...styles.setLabel, color: C[2] }}>Set 2 — Generative AI Foundations</div><h2 style={styles.h2}>How LLMs learn and what they can't do</h2></Reveal>
        <Reveal><p style={styles.prose}><strong>Generative AI</strong> differs from traditional AI in a fundamental way: it <em>creates</em> new content (text, images, code, music) rather than just analyzing, classifying, or predicting from existing data. This creative capability is what makes tools like Claude possible.</p></Reveal>
        <Reveal><p style={styles.prose}>Three breakthroughs converged to make modern LLMs possible: the <strong>transformer architecture</strong> (2017), <strong>vast digital training data</strong> (billions of text examples), and <strong>dramatic increases in computational power</strong> (GPU clusters at scale). All three had to come together.</p></Reveal>
        <Reveal><img src={`${base}aif_llm_training.jpg`} alt="LLM training pipeline — three breakthroughs, pre-training and fine-tuning stages, hallucination warning" style={styles.img} /></Reveal>
        <Reveal><p style={styles.prose}>LLMs learn in two stages. <strong>Pre-training</strong> builds a broad knowledge base by analyzing patterns across massive text data. <strong>Fine-tuning</strong> then teaches the model to follow instructions and provide helpful, harmless, honest responses — turning raw pattern knowledge into a useful assistant.</p></Reveal>
        <Reveal><ComparisonTable headers={['AI Strength', 'Human Strength']} rows={[
          ['Speed and scale', 'Critical thinking'],
          ['Pattern recognition', 'Nuanced judgment'],
          ['Breadth of knowledge', 'Genuine creativity'],
          ['Consistency on routine tasks', 'Ethical oversight'],
        ]} /></Reveal>
        <Reveal><TipCallout variant="warning">Hallucinations are a core limitation of generative AI — confident, plausible-sounding outputs that are factually wrong. This is why Discernment (evaluating AI outputs) is a non-negotiable competency.</TipCallout></Reveal>

          <MCQSection color={colors[s1.length]} count={s2.length}>
            {s2.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + i]} /></Reveal>)}
          </MCQSection>

        <div style={styles.divider}>· · ·</div>
        <Reveal id="summary"><div style={styles.endSection}><div style={styles.endLabel}>End of Lesson 17</div>
          <p style={styles.endProse}>You now understand AI Fluency's four qualities (effective, efficient, ethical, safe), the three collaboration modes (Automation, Augmentation, Agency), the 4D competencies (Delegation, Description, Discernment, Diligence), and how LLMs are built and where they fall short. Next up: diving deep into the first two Ds.</p>
          <a href="/claude-code-anki/ai-fluency/delegation-description" style={styles.nextBtn}>Next → Lesson 18: Delegation & Description</a></div></Reveal>
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
