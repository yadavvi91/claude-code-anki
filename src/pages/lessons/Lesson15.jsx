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

const mod = modules[0] // Claude Code Fundamentals
const lesson = mod.lessons[3] // The Agent Loop
const sets = lesson.cardSets
const C = T.setColor
const palette = [C[1], C[2], C[3], C[4], C[5], C[6]]
let ci = 0; function nc() { return palette[ci++ % 6] }
const allCards = sets.flatMap(s => s.cards)
const colors = allCards.map(() => nc())
const s1 = sets[0].cards
const s2 = sets[1].cards
const s3 = sets[2].cards
const s4 = sets[3].cards

const NAV_SECTIONS = [
  { id: 'set1', label: 'The Core Loop' },
  { id: 'set2', label: 'Tool Execution' },
  { id: 'set3', label: 'Context Management' },
  { id: 'set4', label: 'Coding Agent Anatomy' },
  { id: 'summary', label: 'Summary', divider: true },
]

export default function Lesson15() {
  return (
    <div style={styles.page}><NavSidebar sections={NAV_SECTIONS} /><LessonNav moduleTitle="Claude Code Fundamentals" moduleColor={mod.color} prevLink="/copilot/cloud-agents" prevLabel="L14: Advanced" nextLink="/copilot/coding-agent" nextLabel="L16: Coding Agent" />
      <main style={styles.main}>
        <Reveal><div style={styles.lessonLabel}>Lesson 15</div><h1 style={styles.h1}>The Agent Loop</h1>
          <p style={styles.subtitle}>How AI coding agents actually work under the hood — the universal pattern behind Claude Code, GitHub Copilot, pi, and every agentic coding tool</p></Reveal>

        <Reveal><ConceptDisplay concept="Prompt → LLM → Tool Calls → Execute → Feed Back → Repeat" description="The agent loop is the heartbeat of every AI coding agent. Understand this pattern and you understand them all." color={mod.color} /></Reveal>

        {/* ══════════════ SET 1 — THE CORE LOOP ══════════════ */}
        <Reveal id="set1"><div style={{ ...styles.setLabel, color: C[1] }}>Set 1 — The Core Loop</div><h2 style={styles.h2}>The universal pattern</h2></Reveal>

        <Reveal><p style={styles.prose}>Every AI coding agent — Claude Code, GitHub Copilot agent mode, pi, Cursor, Windsurf — runs the same fundamental pattern under the hood. It's called the <strong>agent loop</strong>, and it's surprisingly simple once you see it.</p></Reveal>

        <Reveal><p style={styles.prose}>The loop works like this: you give the agent a task. It sends your message (plus conversation history and system prompt) to the LLM. The LLM responds — either with plain text (task done!) or with <strong>tool calls</strong> (requests to read files, run commands, edit code). The agent executes those tool calls, feeds the results back into the conversation, and asks the LLM again. This continues until the LLM responds with just text and no tool calls.</p></Reveal>

        <Reveal><CodeBlock title="The Agent Loop — Pseudocode" code={`while (true) {
  // Send conversation history to LLM
  response = await llm.chat(messages)
  messages.push(response)

  // Check: did the LLM request tool calls?
  if (response.toolCalls.length === 0) {
    break  // No tools → task is done
  }

  // Execute each tool call
  for (const call of response.toolCalls) {
    const result = await tools[call.name](call.args)
    messages.push({ role: "tool", content: result })
  }

  // Loop: send results back to LLM for next decision
}`} /></Reveal>

        <Reveal><p style={styles.prose}>That's it. Fifteen lines of pseudocode capture the essence of what Claude Code does when you ask it to "fix the login bug." The LLM reads files, spots the issue, proposes an edit, verifies the fix — all through this loop. The intelligence is in the LLM's decisions about <em>which</em> tools to call and <em>what arguments</em> to pass.</p></Reveal>

        <Reveal><TipCallout variant="tip">The agent loop is a <strong>state machine</strong> with two states: "waiting for LLM" and "executing tools." The conversation history (messages array) is the state. Every tool result becomes context for the LLM's next decision.</TipCallout></Reveal>

        <Reveal><p style={styles.prose}>The <a href="https://github.com/badlogic/pi-mono" target="_blank" rel="noopener noreferrer" style={styles.link}>pi framework</a> (an open-source coding agent by Mario Zechner) makes this architecture explicit. Its <code style={styles.code}>pi-agent-core</code> package implements the loop as a reusable library, separating it from any specific UI or tool set. This clean separation reveals the pattern that commercial agents obscure behind their interfaces.</p></Reveal>

        <Reveal><p style={styles.prose}>Pi uses two parallel message formats: <strong>AgentMessage</strong> (rich, app-specific, with metadata) and <strong>Message</strong> (minimal, LLM-compatible). The conversion happens only at the LLM call boundary — everywhere else, the app works with the richer format. This is a design principle worth understanding: keep your internal representation flexible, and only simplify when talking to the model.</p></Reveal>

        <Reveal><CodeBlock title="Message Format Isolation (pi architecture)" code={`AgentMessage[] (app-specific, flexible)
    ↓
transformContext()  // optional: prune, inject, summarize
    ↓
convertToLlm()      // required: filter to user/assistant/tool
    ↓
Message[] (LLM-compatible format)
    ↓
LLM Provider API (Anthropic, OpenAI, Google, etc.)`} /></Reveal>

        <MCQSection color={colors[0]} count={s1.length}>
          {s1.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[i]} /></Reveal>)}
        </MCQSection>

        <div style={styles.divider}>· · ·</div>

        {/* ══════════════ SET 2 — TOOL EXECUTION PIPELINE ══════════════ */}
        <Reveal id="set2"><div style={{ ...styles.setLabel, color: C[2] }}>Set 2 — Tool Execution Pipeline</div><h2 style={styles.h2}>How tools are defined, validated, and run</h2></Reveal>

        <Reveal><p style={styles.prose}>Tools are the agent's hands. Without them, the LLM can only talk — it can't read files, run commands, or edit code. A tool definition tells the LLM three things: what the tool does (description), what arguments it accepts (JSON schema), and what it returns.</p></Reveal>

        <Reveal><CodeBlock title="Tool Definition (pi framework)" code={`const readTool = {
  name: "Read",
  description: "Read file contents from disk",
  parameters: {
    type: "object",
    properties: {
      path:   { type: "string", description: "File path" },
      offset: { type: "number", description: "Start line" },
      limit:  { type: "number", description: "Max lines" }
    },
    required: ["path"]
  },
  async execute(id, args, signal) {
    const content = await fs.readFile(args.path, "utf8")
    return { content: [{ type: "text", text: content }] }
  }
}`} /></Reveal>

        <Reveal><p style={styles.prose}>When the LLM returns a tool call, the agent doesn't just execute it blindly. There's a <strong>preparation phase</strong>: validate arguments against the JSON schema, look up the tool in the registry, fire a <code style={styles.code}>tool_execution_start</code> event, and run a <code style={styles.code}>beforeToolCall</code> hook. That hook is where permission systems live — it can block dangerous operations (like <code style={styles.code}>rm -rf /</code>) and require user confirmation.</p></Reveal>

        <Reveal><CodeBlock title="Tool Execution Pipeline" code={`for each toolCall in response.toolCalls:
  1. prepareToolCall()
     → Validate args against JSON schema
     → Check tool exists in registry
     → Fire tool_execution_start event

  2. beforeToolCall hook
     → Can BLOCK execution (return { block: true })
     → This is where permission prompts live

  3. executePreparedToolCall()
     → Run the actual tool function
     → Stream progress via onUpdate callback

  4. afterToolCall hook
     → Transform/filter/augment the result
     → Truncate large outputs, redact secrets

  5. emitToolCallOutcome()
     → Create ToolResultMessage
     → Add to conversation history`} /></Reveal>

        <Reveal><p style={styles.prose}>When the LLM requests multiple tool calls in a single response, there are two execution strategies. <strong>Sequential</strong> mode runs them one at a time — necessary when operations have dependencies (read a file, then edit it). <strong>Parallel</strong> mode runs them concurrently via <code style={styles.code}>Promise.all</code> — faster when operations are independent (reading three different files). Claude Code defaults to parallel execution.</p></Reveal>

        <Reveal><ComparisonTable headers={['Execution Mode', 'When to Use', 'Example']} rows={[
          ['Sequential', 'Operations with dependencies', 'Read file → Edit file → Run tests'],
          ['Parallel', 'Independent operations (default)', 'Read A, Read B, Read C simultaneously'],
        ]} /></Reveal>

        <Reveal><TipCallout variant="warning">The <strong>beforeToolCall hook</strong> is your last line of defense. In Claude Code, this is where the permission system decides whether to auto-approve, prompt the user, or block a tool call entirely. In pi, you implement this hook yourself via extensions.</TipCallout></Reveal>

        <MCQSection color={colors[s1.length]} count={s2.length}>
          {s2.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + i]} /></Reveal>)}
        </MCQSection>

        <div style={styles.divider}>· · ·</div>

        {/* ══════════════ SET 3 — CONTEXT MANAGEMENT ══════════════ */}
        <Reveal id="set3"><div style={{ ...styles.setLabel, color: C[3] }}>Set 3 — Context Management</div><h2 style={styles.h2}>Keeping the conversation window alive</h2></Reveal>

        <Reveal><p style={styles.prose}>Every LLM has a finite <strong>context window</strong> — the maximum amount of text it can process in a single request. Claude's is 200K tokens; GPT-4 ranges from 8K to 128K. A long coding session with many file reads, edits, and test runs can blow past this limit. Context management is the art of keeping the conversation history within bounds.</p></Reveal>

        <Reveal><p style={styles.prose}>The simplest approach is <strong>compaction</strong>: when the history gets too long, summarize older turns into a condensed message while preserving recent turns in full. It's like a sliding window — you always have full detail on what just happened, and a summary of what came before.</p></Reveal>

        <Reveal><CodeBlock title="Context Compaction" code={`Before compaction (exceeds context window):
  [User: "Fix the auth bug"]
  [Assistant: reads 5 files, runs 3 searches]
  [Assistant: finds bug in auth.js line 42]
  [Assistant: edits auth.js]
  [Assistant: runs tests — 2 failures]
  [Assistant: fixes test expectations]
  [Assistant: runs tests — all pass]
  [User: "Now add rate limiting"]    ← recent
  [Assistant: reading rate-limit docs] ← recent

After compaction:
  [Summary: "Fixed auth bug in auth.js line 42,
   updated test expectations, all tests passing"]
  [User: "Now add rate limiting"]    ← preserved
  [Assistant: reading rate-limit docs] ← preserved`} /></Reveal>

        <Reveal><p style={styles.prose}>Pi's architecture makes this pluggable through <code style={styles.code}>transformContext</code> — an optional middleware that runs before every LLM call. It can prune messages, inject fresh context (like re-reading CLAUDE.md if it changed), summarize old turns, or filter out irrelevant tool results. Claude Code uses a similar mechanism internally.</p></Reveal>

        <Reveal><p style={styles.prose}><strong>Steering messages</strong> are another powerful concept: user messages injected while the agent is mid-execution. If the agent is going down the wrong path, you can say "Stop! Try a different approach" without waiting for the full loop to complete. The loop checks for steering messages after each tool execution.</p></Reveal>

        <Reveal><TipCallout variant="tip">Pi stores sessions as <strong>JSONL files with tree structure</strong> (id/parentId), enabling in-place branching and tree navigation. You can explore different approaches without losing the parent conversation. Claude Code supports similar branching with <code style={styles.code}>Esc Esc</code> to rewind.</TipCallout></Reveal>

        <MCQSection color={colors[s1.length + s2.length]} count={s3.length}>
          {s3.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + s2.length + i]} /></Reveal>)}
        </MCQSection>

        <div style={styles.divider}>· · ·</div>

        {/* ══════════════ SET 4 — ANATOMY OF A CODING AGENT ══════════════ */}
        <Reveal id="set4"><div style={{ ...styles.setLabel, color: C[4] }}>Set 4 — Anatomy of a Coding Agent</div><h2 style={styles.h2}>From loop to product</h2></Reveal>

        <Reveal><p style={styles.prose}>The agent loop is the engine, but a coding agent is the whole car. Let's look at what sits on top of the loop to make a real product, using pi (<code style={styles.code}>@mariozechner/pi-coding-agent</code>) as our case study — it's open source and architecturally transparent.</p></Reveal>

        <Reveal><ComparisonTable title="Pi Monorepo Architecture" headers={['Package', 'Role']} rows={[
          ['pi-ai', 'Unified LLM API — normalizes 18+ providers (Anthropic, OpenAI, Google, Mistral, etc.)'],
          ['pi-agent-core', 'The agent loop — state machine, tool execution, events, hooks'],
          ['pi-coding-agent', 'CLI coding tool — Read/Write/Edit/Bash tools, sessions, extensions'],
          ['pi-tui', 'Terminal UI library with differential rendering'],
          ['pi-web-ui', 'Web components for AI chat interfaces'],
        ]} /></Reveal>

        <Reveal><p style={styles.prose}>Pi ships with just <strong>four core tools</strong>: Read, Write, Edit, and Bash. That's deliberately minimal. The philosophy is "minimal core, maximum extensibility" — you add what you need through extensions. Claude Code takes the opposite approach: seven built-in tools, MCP support, subagents, skills, and hooks all included. Both are valid strategies.</p></Reveal>

        <Reveal><CodeBlock title="Pi's Extension System" code={`// Extensions are TypeScript modules
export default function myExtension(pi) {

  // Register new tools
  pi.registerTool({
    name: "deploy",
    execute: async (args, signal) => { ... }
  })

  // Register slash commands
  pi.registerCommand("stats", {
    execute: async (ctx) => { ... }
  })

  // Subscribe to lifecycle events
  pi.on("tool_call", async (event) => { ... })
}`} /></Reveal>

        <Reveal><p style={styles.prose}>The <strong>event-driven architecture</strong> is what makes all of this observable. Pi emits events at every lifecycle point: <code style={styles.code}>agent_start</code>, <code style={styles.code}>turn_start</code>, <code style={styles.code}>message_update</code> (streaming), <code style={styles.code}>tool_execution_start/end</code>, <code style={styles.code}>turn_end</code>, <code style={styles.code}>agent_end</code>. Any UI — terminal, web, or IDE — can subscribe to these events without the core loop knowing about the UI at all.</p></Reveal>

        <Reveal><p style={styles.prose}>Context files bridge project knowledge to the agent. Pi reads <code style={styles.code}>AGENTS.md</code> (walking up the directory tree), Claude Code reads <code style={styles.code}>CLAUDE.md</code>, GitHub Copilot reads <code style={styles.code}>.github/copilot-instructions.md</code>. Different filenames, same idea: inject project-specific conventions and rules into the system prompt so the agent codes the way <em>your team</em> codes.</p></Reveal>

        <Reveal><TipCallout variant="tip">Pi supports <strong>18+ LLM providers</strong> through its pi-ai abstraction layer — including subscription-based access (Anthropic Pro/Max, ChatGPT Plus/Pro, GitHub Copilot, Google Gemini CLI) alongside traditional API keys. Claude Code supports Anthropic models directly plus third-party models via API keys.</TipCallout></Reveal>

        <MCQSection color={colors[s1.length + s2.length + s3.length]} count={s4.length}>
          {s4.map((card, i) => <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + s2.length + s3.length + i]} /></Reveal>)}
        </MCQSection>

        <div style={styles.divider}>· · ·</div>

        {/* ── SUMMARY ── */}
        <Reveal id="summary"><div style={styles.endSection}><div style={styles.endLabel}>End of Lesson 15</div>
          <p style={styles.endProse}>You now understand the agent loop — the universal pattern powering every AI coding agent. The LLM decides, tools execute, results feed back, and the loop continues until the task is done. You've seen how tools are defined and validated, how context compaction keeps long sessions alive, and how real coding agents like pi are architected on top of this loop.</p>
          <p style={styles.endProse}>This mental model transfers everywhere. Whether you're using Claude Code, building custom agents with the SDK, or evaluating new tools — they all implement this same loop. The differences are in the tools, the UI, and the extensibility model.</p>
          <a href="/claude-code-anki/copilot/coding-agent" style={styles.nextBtn}>Next → Lesson 16: The Coding Agent</a></div></Reveal>
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
  link: { color: T.color.accent, textDecoration: 'none', fontWeight: 500 },
  divider: { textAlign: 'center', color: T.color.bg3, fontSize: '1rem', margin: '3rem 0', letterSpacing: '0.5em' },
  endSection: { textAlign: 'center', padding: '2rem 0' },
  endLabel: { fontFamily: T.font.label, fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.color.ink4, marginBottom: '1.5rem' },
  endProse: { fontFamily: T.font.prose, fontSize: '1rem', lineHeight: 1.8, color: T.color.ink3, marginBottom: '1rem', maxWidth: '55ch', marginLeft: 'auto', marginRight: 'auto', textAlign: 'left' },
  nextBtn: { display: 'inline-block', marginTop: '1.5rem', padding: '0.85rem 2.5rem', border: `1px solid ${T.color.accent}`, borderRadius: '4px', fontFamily: T.font.label, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', color: T.color.accent, transition: 'background 0.25s, color 0.25s' },
}
