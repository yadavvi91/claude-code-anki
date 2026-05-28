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
const lesson = mod.lessons[7]
const sets = lesson.cardSets
const C = T.setColor
const palette = [C[1], C[2], C[3], C[4], C[5], C[6]]
let ci = 0; function nc() { return palette[ci++ % 6] }
const allCards = sets.flatMap(s => s.cards)
const colors = allCards.map(() => nc())
const s1 = sets[0].cards
const s2 = sets[1].cards

const NAV_SECTIONS = [
  { id: 'set1', label: 'Workflow Patterns' },
  { id: 'set2', label: 'Agents & Apps' },
  { id: 'summary', label: 'Summary', divider: true },
]

export default function Lesson27() {
  return (
    <div style={styles.page}><NavSidebar sections={NAV_SECTIONS} /><LessonNav moduleTitle="Anthropic API" moduleColor={mod.color} prevLink="/api/mcp" prevLabel="L26: MCP with the API" nextLink="/" nextLabel="Home" />
      <main style={styles.main}>
        <Reveal><div style={styles.lessonLabel}>Lesson 27</div><h1 style={styles.h1}>Agents & Workflows</h1>
          <p style={styles.subtitle}>Workflow patterns, autonomous agents, and building production AI systems</p></Reveal>
        <Reveal><ConceptDisplay concept="Workflows · Agents · Chaining · Routing · Parallelization" description="From orchestrated pipelines to autonomous agents: choosing the right architecture for your task." color={mod.color} /></Reveal>

        <Reveal id="set1"><div style={{ ...styles.setLabel, color: C[1] }}>Set 1 — Workflow Patterns</div><h2 style={styles.h2}>Deterministic orchestration</h2></Reveal>
        <Reveal><p style={styles.prose}><strong>Workflows</strong> are predefined sequences where your code orchestrates LLM calls in a fixed pattern. <strong>Agents</strong> give the LLM autonomy to decide which tools to call and when. Workflows are predictable and debuggable; agents are flexible but harder to control.</p></Reveal>
        <Reveal><ComparisonTable headers={['Pattern', 'How It Works', 'Best For']} rows={[
          ['Chaining', 'Sequential calls, each output feeds the next', 'Multi-step analysis, pipelines'],
          ['Parallelization', 'Independent calls run simultaneously', 'Multi-angle analysis, latency reduction'],
          ['Routing', 'Classifier directs to specialized handler', 'Support tickets, multi-type inputs'],
        ]} /></Reveal>
        <Reveal><p style={styles.prose}><strong>Chaining</strong> decomposes complex tasks into focused steps. Each step has a specialized prompt and can validate output before passing it forward. A support ticket pipeline might: classify → extract details → generate response → quality check.</p></Reveal>
        <Reveal><p style={styles.prose}><strong>Parallelization</strong> runs independent LLM calls simultaneously. Analyze sentiment AND extract entities AND summarize — all at once. Total time equals the slowest single task, not the sum.</p></Reveal>
        <Reveal><p style={styles.prose}><strong>Routing</strong> uses a fast classifier (often Haiku) to categorize input, then routes to a specialized handler. Each handler can use a different system prompt, model, or tool set optimized for that category.</p></Reveal>
        <Reveal><TipCallout variant="tip">Use workflows when the task is well-defined and steps are predictable. Use agents when the task is open-ended and the path depends on intermediate results. Start simple — only add complexity when the simpler approach fails.</TipCallout></Reveal>

          <MCQSection color={colors[0]} count={s1.length}>
            {s1.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[i]} /></Reveal>)}
          </MCQSection>

        <div style={styles.divider}>· · ·</div>

        <Reveal id="set2"><div style={{ ...styles.setLabel, color: C[2] }}>Set 2 — Agents & Anthropic Apps</div><h2 style={styles.h2}>Autonomous AI systems</h2></Reveal>
        <Reveal><p style={styles.prose}>An <strong>agent</strong> is the tool use loop from L23, but with a key difference in intent: you give Claude an open-ended task and let it autonomously decide which tools to call, how many times, and in what order until it determines the task is complete.</p></Reveal>
        <Reveal><CodeBlock title="Agent Loop" code={`def agent_loop(user_task, tools):
    messages = [{"role": "user", "content": user_task}]

    while True:
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=4096,
            tools=tools,
            messages=messages
        )
        if response.stop_reason == "end_turn":
            return response.content[0].text

        # Execute tools, feed results back
        messages.append({"role": "assistant", "content": response.content})
        tool_results = execute_tools(response)
        messages.append({"role": "user", "content": tool_results})`} /></Reveal>
        <Reveal><p style={styles.prose}><strong>Environment inspection</strong> is critical for effective agents. Give them tools to observe — read files, list directories, check system state — so they can make informed decisions at each step. "Look before you leap."</p></Reveal>
        <Reveal><p style={styles.prose}><strong>Claude Code</strong> is these API concepts materialized: an agent loop (Messages API) + tools (Read, Edit, Bash, Grep) + system prompt (CLAUDE.md) + MCP servers (extensibility). Every concept from this course works together in it.</p></Reveal>
        <Reveal><p style={styles.prose}><strong>Computer use</strong> gives Claude "eyes and hands" for a desktop: take screenshots (vision), click buttons, type text, scroll. It enables automating GUI-based tasks in applications that don't have APIs.</p></Reveal>
        <Reveal><TipCallout variant="tip">Anthropic's recommendation: start with the simplest solution (a single prompt), add complexity only when needed (chaining, routing), and use agents only when the task genuinely requires dynamic decision-making. "The best system is the simplest one that works."</TipCallout></Reveal>

          <MCQSection color={colors[s1.length]} count={s2.length}>
            {s2.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + i]} /></Reveal>)}
          </MCQSection>

        <div style={styles.divider}>· · ·</div>
        <Reveal id="summary"><div style={styles.endSection}><div style={styles.endLabel}>End of Lesson 27</div>
          <p style={styles.endProse}>You've completed the Anthropic API module. You understand workflow patterns (chaining, parallelization, routing), when to use agents vs. workflows, how to build agent loops, and how products like Claude Code and computer use bring all these API concepts together.</p>
          <a href="/claude-code-anki/" style={styles.nextBtn}>← Back to Home</a></div></Reveal>
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
