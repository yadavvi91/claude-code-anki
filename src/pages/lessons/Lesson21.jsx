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
const mod = modules[7]
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
  { id: 'set1', label: 'Eval Workflows & Datasets' },
  { id: 'set2', label: 'Grading Strategies' },
  { id: 'summary', label: 'Summary', divider: true },
]

export default function Lesson21() {
  return (
    <div style={styles.page}><NavSidebar sections={NAV_SECTIONS} /><LessonNav moduleTitle="Anthropic API" moduleColor={mod.color} prevLink="/api/fundamentals" prevLabel="L20: API Fundamentals" nextLink="/api/prompt-engineering" nextLabel="L22: Prompt Engineering" />
      <main style={styles.main}>
        <Reveal><div style={styles.lessonLabel}>Lesson 21</div><h1 style={styles.h1}>Prompt Evaluation</h1>
          <p style={styles.subtitle}>Systematic measurement of prompt quality through test datasets and grading strategies</p></Reveal>
        <Reveal><ConceptDisplay concept="Eval Workflows · Test Datasets · Grading · Metrics" description="Replace guesswork with data: build repeatable eval pipelines that catch regressions before deployment." color={mod.color} /></Reveal>

        <Reveal id="set1"><div style={{ ...styles.setLabel, color: C[1] }}>Set 1 — Eval Workflows & Test Datasets</div><h2 style={styles.h2}>Why evals matter</h2></Reveal>
        <Reveal><p style={styles.prose}>Without evals, prompt engineering is guesswork. A change that improves one response might degrade ten others. <strong>Evaluation provides systematic, repeatable measurement</strong> — replacing "does this feel right?" with quantitative scoring across diverse test cases.</p></Reveal>
        <Reveal><ComparisonTable headers={['Step', 'What Happens']} rows={[
          ['Define the task', 'Clarify what "good" output looks like'],
          ['Create test dataset', 'Inputs paired with expected outputs'],
          ['Run prompts', 'Execute against all test cases'],
          ['Grade results', 'Score with human, model, or code graders'],
          ['Analyze & iterate', 'Compare against baseline, improve'],
        ]} /></Reveal>
        <Reveal><p style={styles.prose}><strong>Test datasets</strong> should be diverse: normal cases, edge cases, and adversarial inputs. Use Claude itself to generate varied test cases, then manually curate. Mix in real examples from production. Quality matters more than quantity — 50-100 well-chosen examples often outperform thousands of similar ones.</p></Reveal>
        <Reveal><p style={styles.prose}><strong>Development evals</strong> compare prompt versions before deployment using curated test data. <strong>Production evals</strong> monitor live outputs by sampling and grading them, catching drift and failure patterns that offline evals can't predict.</p></Reveal>
        <Reveal><TipCallout variant="tip">Each test case should have a clear "golden answer" or grading rubric. Without defined success criteria, your eval results are meaningless.</TipCallout></Reveal>

          <MCQSection color={colors[0]} count={s1.length}>
            {s1.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[i]} /></Reveal>)}
          </MCQSection>

        <div style={styles.divider}>· · ·</div>

        <Reveal id="set2"><div style={{ ...styles.setLabel, color: C[2] }}>Set 2 — Grading Strategies</div><h2 style={styles.h2}>Measuring output quality</h2></Reveal>
        <Reveal><p style={styles.prose}><strong>Model-based grading</strong> uses Claude (or another LLM) as an automated judge. It excels at subjective assessment: tone, helpfulness, summary faithfulness. Provide the grading model with the original input, the output, the rubric, and examples of each score level.</p></Reveal>
        <Reveal><p style={styles.prose}><strong>Code-based grading</strong> uses deterministic checks: exact match, regex, keyword presence, JSON schema validation. It's fast, cheap, and perfect when correctness is objectively verifiable.</p></Reveal>
        <Reveal><ComparisonTable headers={['Grading Type', 'Best For', 'Trade-off']} rows={[
          ['Model-based', 'Subjective quality, tone, faithfulness', 'Costs tokens, can be inconsistent'],
          ['Code-based', 'Exact answers, format validation', 'Can\'t assess nuanced quality'],
          ['Human', 'Complex judgment, final validation', 'Slow, expensive, doesn\'t scale'],
        ]} /></Reveal>
        <Reveal><p style={styles.prose}>Track <strong>average score</strong>, <strong>score distribution</strong>, <strong>worst-case failures</strong>, <strong>per-category breakdowns</strong>, and always compare against your baseline. When a change improves some cases but degrades others, analyze the trade-off — prioritize based on your use case, not just the average.</p></Reveal>
        <Reveal><TipCallout variant="tip">Use temperature 0 for model-based grading (deterministic judgment), even if the generation prompt used higher temperature. Consider using a stronger model for grading than for generation.</TipCallout></Reveal>

          <MCQSection color={colors[s1.length]} count={s2.length}>
            {s2.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + i]} /></Reveal>)}
          </MCQSection>

        <div style={styles.divider}>· · ·</div>
        <Reveal id="summary"><div style={styles.endSection}><div style={styles.endLabel}>End of Lesson 21</div>
          <p style={styles.endProse}>You can now build eval pipelines with diverse test datasets, choose the right grading strategy (model-based, code-based, or human), track meaningful metrics, and iterate on prompts systematically.</p>
          <a href="/claude-code-anki/api/prompt-engineering" style={styles.nextBtn}>Next → Lesson 22: Prompt Engineering</a></div></Reveal>
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
