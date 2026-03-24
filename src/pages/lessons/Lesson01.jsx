import { modules } from '../../data/cardSets'
import MCQCard from '../../components/MCQCard'
import Reveal from '../../components/Reveal'
import LessonNav from '../../components/LessonNav'
import NavSidebar from '../../components/NavSidebar'
import ConceptDisplay from '../../components/ConceptDisplay'
import CodeBlock from '../../components/CodeBlock'
import ComparisonTable from '../../components/ComparisonTable'
import TipCallout from '../../components/TipCallout'
import FileTree from '../../components/FileTree'
import { T } from '../../theme'

const base = '/claude-code-anki/images/'
const mod = modules[0] // Claude Code Fundamentals
const lesson = mod.lessons[0] // Architecture & Tools
const sets = lesson.cardSets
const C = T.setColor

// Flatten all cards with colors
const palette = [C[1], C[2], C[3], C[4], C[5], C[6]]
let ci = 0
function nc() { return palette[ci++ % 6] }

// Pre-compute colors for all cards
const allCards = sets.flatMap(s => s.cards)
const colors = allCards.map(() => nc())

// Get cards by set
const s1 = sets[0].cards // Tool Selection
const s2 = sets[1].cards // Architecture & Context
const s3 = sets[2].cards // Safety & Best Practices
const s4 = sets[3].cards // Bash & System Commands

const NAV_SECTIONS = [
  { id: 'set1', label: 'Tool Selection' },
  { id: 'set2', label: 'Architecture' },
  { id: 'set3', label: 'Safety' },
  { id: 'set4', label: 'Bash Commands' },
  { id: 'summary', label: 'Summary', divider: true },
]

export default function Lesson01() {
  return (
    <div style={styles.page}>
      <NavSidebar sections={NAV_SECTIONS} />
      <LessonNav
        moduleTitle="Claude Code Fundamentals"
        moduleColor={mod.color}
        prevLink="/"
        prevLabel="Home"
        nextLink="/claude-code/planning"
        nextLabel="L2: Planning"
      />

      <main style={styles.main}>
        {/* ── OPENING ── */}
        <Reveal>
          <div style={styles.lessonLabel}>Lesson 1</div>
          <h1 style={styles.h1}>Architecture & Tools</h1>
          <p style={styles.subtitle}>
            How Claude Code works, its multi-tool system, and when to use which tool
          </p>
        </Reveal>

        <Reveal>
          <ConceptDisplay
            concept="Read · Edit · Write · Bash · Grep · Glob · Agent"
            description="Seven tools, each purpose-built. Choosing the right one is the first skill."
            color={mod.color}
          />
        </Reveal>

        {/* ══════════════ SET 1 — TOOL SELECTION ══════════════ */}
        <Reveal id="set1">
          <div style={{ ...styles.setLabel, color: C[1] }}>Set 1 — Tool Selection</div>
          <h2 style={styles.h2}>The right tool for the job</h2>
        </Reveal>

        <Reveal>
          <img src={`${base}303235_000146s.jpg`} alt="Claude Code multi-tool architecture overview" style={styles.img} />
        </Reveal>

        <Reveal><p style={styles.prose}>
          Claude Code is not a single tool — it is a <strong>multi-tool system</strong>.
          Each tool is designed for a specific type of operation, and choosing the right one
          matters more than you might think. The choice affects not just performance, but
          the user's ability to review, approve, and understand what Claude is doing.
        </p></Reveal>

        <Reveal><p style={styles.prose}>
          The core principle is simple: <strong>use dedicated tools over Bash equivalents</strong>.
          When Claude needs to read a file, it should use the <code style={styles.code}>Read</code> tool
          instead of running <code style={styles.code}>cat</code> via Bash. When it needs to search
          code, <code style={styles.code}>Grep</code> instead of <code style={styles.code}>rg</code>.
          Why? Because dedicated tools produce structured output that the user can review at a glance.
        </p></Reveal>

        <Reveal>
          <ComparisonTable
            title="Tool Selection Guide"
            headers={['Task', 'Use This', 'Not This']}
            rows={[
              ['Read a file', 'Read tool', 'Bash with cat/head/tail'],
              ['Search file contents', 'Grep tool', 'Bash with grep/rg'],
              ['Find files by name', 'Glob tool', 'Bash with find/ls'],
              ['Edit existing file', 'Edit tool', 'Bash with sed/awk'],
              ['Create new file', 'Write tool', 'Bash with echo/cat heredoc'],
              ['Run npm/git/docker', 'Bash tool', '(no alternative)'],
            ]}
          />
        </Reveal>

        <Reveal><MCQCard card={s1[0]} color={colors[0]} /></Reveal>

        <Reveal><p style={styles.prose}>
          File discovery is one of the most common operations. The <code style={styles.code}>Glob</code> tool
          takes a pattern like <code style={styles.code}>src/components/**/*.tsx</code> and returns matching
          paths sorted by modification time. It's fast, focused, and works at any codebase scale.
        </p></Reveal>

        <Reveal><MCQCard card={s1[1]} color={colors[1]} /></Reveal>

        <Reveal><p style={styles.prose}>
          For searching <em>inside</em> files — finding function usages, tracking down imports,
          locating error messages — the <code style={styles.code}>Grep</code> tool is the right choice.
          Built on ripgrep, it supports full regex syntax, file type filtering
          (e.g., <code style={styles.code}>type: "js"</code>), and context lines around matches.
        </p></Reveal>

        <Reveal><MCQCard card={s1[2]} color={colors[2]} /></Reveal>

        <Reveal><p style={styles.prose}>
          Sometimes a simple search isn't enough. When you need to explore an unfamiliar codebase,
          understand how components connect, or trace a complex flow across multiple files — that's
          when the <code style={styles.code}>Agent</code> tool shines. It launches a subagent that can
          autonomously chain multiple searches, reads, and analyses. But for a targeted search on a
          known file or class, Grep and Glob are faster.
        </p></Reveal>

        <Reveal><MCQCard card={s1[3]} color={colors[3]} /></Reveal>

        <Reveal><p style={styles.prose}>
          The distinction between <code style={styles.code}>Edit</code> and <code style={styles.code}>Write</code> is
          subtle but important. <code style={styles.code}>Edit</code> performs exact string replacement — it sends
          only the diff, making it easy for the user to see exactly what changed. <code style={styles.code}>Write</code> overwrites
          the entire file, which is appropriate for creating new files or complete rewrites.
        </p></Reveal>

        <Reveal>
          <TipCallout variant="tip" title="Rule of Thumb">
            If the file already exists, prefer Edit. If you're creating something new, use Write.
          </TipCallout>
        </Reveal>

        <Reveal><MCQCard card={s1[4]} color={colors[4]} /></Reveal>

        <Reveal><div style={styles.divider}>◆</div></Reveal>

        {/* ══════════════ SET 2 — ARCHITECTURE & CONTEXT ══════════════ */}
        <Reveal id="set2">
          <div style={{ ...styles.setLabel, color: C[2] }}>Set 2 — Architecture & Context</div>
          <h2 style={styles.h2}>How Claude Code sees your project</h2>
        </Reveal>

        <Reveal>
          <img src={`${base}303242_000237s.jpg`} alt="Claude Code sandbox and context architecture" style={styles.img} />
        </Reveal>

        <Reveal><p style={styles.prose}>
          Claude Code operates within a <strong>sandbox</strong> by default. This means Bash commands
          are restricted to prevent accidental damage to your system. It's not a Docker container or
          a VM — it's a permission-based restriction layer. You can always grant broader permissions
          when needed, but the default is to err on the side of safety.
        </p></Reveal>

        <Reveal><MCQCard card={s2[0]} color={colors[5]} /></Reveal>

        <Reveal><p style={styles.prose}>
          The preference for dedicated tools isn't about performance — it's about <strong>reviewability</strong>.
          When you see a <code style={styles.code}>Read</code> call in the conversation, you know immediately
          what file was read and can inspect the output. A <code style={styles.code}>cat</code> command
          buried in a Bash call is harder to spot and review. This principle extends across all tools:
          make the agent's actions visible and easy to approve.
        </p></Reveal>

        <Reveal><MCQCard card={s2[1]} color={colors[6]} /></Reveal>

        <Reveal><p style={styles.prose}>
          One of Claude Code's most powerful patterns is <strong>parallel tool calls</strong>. When
          multiple operations are independent — say, reading three different files, or running a build
          and checking git status — they should all be called in a single message. This isn't just
          an optimization; it signals to the user that these operations are independent.
        </p></Reveal>

        <Reveal>
          <CodeBlock
            title="Parallel vs Sequential"
            code={`// GOOD: Independent calls in parallel
Read("src/App.jsx")          // ┐
Read("src/theme.js")         // ├─ All sent in one message
Grep("handleSubmit", "src/") // ┘

// BAD: Sequential when not needed
Read("src/App.jsx")     // wait...
Read("src/theme.js")    // wait...
Grep("handleSubmit")    // wait...`}
          />
        </Reveal>

        <Reveal><MCQCard card={s2[2]} color={colors[7]} /></Reveal>

        <Reveal><p style={styles.prose}>
          Context is everything. When Claude Code starts, it reads <code style={styles.code}>CLAUDE.md</code> from
          your project root. This file tells Claude about your codebase conventions, architectural decisions,
          and rules. Think of it as the project's constitution — it shapes every decision Claude makes.
        </p></Reveal>

        <Reveal>
          <FileTree
            title="Project Root"
            tree={[
              { name: 'CLAUDE.md', type: 'file', highlight: true },
              { name: '.claude/', type: 'dir', children: [
                { name: 'commands/', type: 'dir' },
                { name: 'settings.json', type: 'file' },
              ]},
              { name: 'src/', type: 'dir', children: [
                { name: 'App.jsx', type: 'file' },
                { name: 'theme.js', type: 'file' },
              ]},
              { name: 'package.json', type: 'file' },
            ]}
          />
        </Reveal>

        <Reveal><MCQCard card={s2[3]} color={colors[8]} /></Reveal>

        <Reveal><p style={styles.prose}>
          Before Claude Code edits any file, it must read it first. This is a hard requirement
          of the <code style={styles.code}>Edit</code> tool — not a suggestion. The reason is
          fundamental: editing without reading leads to blind changes based on assumptions. Reading
          first ensures Claude understands the existing code before proposing modifications.
        </p></Reveal>

        <Reveal><MCQCard card={s2[4]} color={colors[9]} /></Reveal>

        <Reveal><div style={styles.divider}>◆</div></Reveal>

        {/* ══════════════ SET 3 — SAFETY & BEST PRACTICES ══════════════ */}
        <Reveal id="set3">
          <div style={{ ...styles.setLabel, color: C[3] }}>Set 3 — Safety & Best Practices</div>
          <h2 style={styles.h2}>Measure twice, cut once</h2>
        </Reveal>

        <Reveal><p style={styles.prose}>
          Claude Code follows a principle of <strong>reversibility</strong>. Local, reversible actions
          like editing files or running tests can be done freely. But actions that are hard to reverse,
          affect shared systems, or could be destructive require confirmation. The cost of pausing to
          confirm is low; the cost of an unwanted force-push is very high.
        </p></Reveal>

        <Reveal><MCQCard card={s3[0]} color={colors[10]} /></Reveal>

        <Reveal><p style={styles.prose}>
          Pre-commit hooks are safety nets. When they fail, the commit <em>never happened</em>.
          This is a crucial distinction. Using <code style={styles.code}>--amend</code> after a hook
          failure would modify the <em>previous</em> commit (which succeeded), not the failed one
          (which doesn't exist). The correct response: fix the issue, re-stage, and create a
          <strong> new</strong> commit.
        </p></Reveal>

        <Reveal>
          <TipCallout variant="warning" title="Common Pitfall">
            Never use <code style={{ fontFamily: T.font.code, fontSize: '0.85em' }}>--amend</code> after
            a pre-commit hook failure. The failed commit doesn't exist — amending would modify a
            previous, unrelated commit.
          </TipCallout>
        </Reveal>

        <Reveal><MCQCard card={s3[1]} color={colors[11]} /></Reveal>

        <Reveal><p style={styles.prose}>
          Some files should never be committed without explicit user confirmation. Files like{' '}
          <code style={styles.code}>.env</code>, <code style={styles.code}>credentials.json</code>,
          or anything that might contain API keys, tokens, or passwords. Claude Code will warn you
          before staging these files.
        </p></Reveal>

        <Reveal><MCQCard card={s3[2]} color={colors[12]} /></Reveal>

        <Reveal><p style={styles.prose}>
          When Claude Code encounters unfamiliar files or unexpected state in the working directory,
          the default is to <strong>investigate, not destroy</strong>. Those files might be the user's
          work-in-progress, a feature branch experiment, or important configuration. The same applies
          to merge conflicts — resolve them rather than discarding changes, and if a lock file exists,
          investigate what process holds it rather than deleting it.
        </p></Reveal>

        <Reveal><MCQCard card={s3[3]} color={colors[13]} /></Reveal>

        <Reveal><p style={styles.prose}>
          When staging files for a commit, Claude Code prefers naming specific files over using{' '}
          <code style={styles.code}>git add -A</code> or <code style={styles.code}>git add .</code>.
          These broad commands can accidentally stage sensitive files, large binaries, or temporary
          build artifacts. Naming files explicitly is an extra step, but it's a safety habit that
          prevents costly mistakes.
        </p></Reveal>

        <Reveal><MCQCard card={s3[4]} color={colors[14]} /></Reveal>

        <Reveal><div style={styles.divider}>◆</div></Reveal>

        {/* ══════════════ SET 4 — BASH & SYSTEM COMMANDS ══════════════ */}
        <Reveal id="set4">
          <div style={{ ...styles.setLabel, color: C[4] }}>Set 4 — Bash & System Commands</div>
          <h2 style={styles.h2}>When the shell is the right tool</h2>
        </Reveal>

        <Reveal>
          <img src={`${base}303242_000619s.jpg`} alt="Bash tool usage and system command patterns" style={styles.img} />
        </Reveal>

        <Reveal><p style={styles.prose}>
          The <code style={styles.code}>Bash</code> tool is reserved for operations where no dedicated
          tool exists: running <code style={styles.code}>npm install</code>, <code style={styles.code}>git push</code>,
          {' '}<code style={styles.code}>docker build</code>, or any system command that requires shell execution.
          If a dedicated tool can do the job, use it instead.
        </p></Reveal>

        <Reveal><MCQCard card={s4[0]} color={colors[15]} /></Reveal>

        <Reveal><p style={styles.prose}>
          Some git commands require interactive input — <code style={styles.code}>git rebase -i</code>,
          {' '}<code style={styles.code}>git add -i</code>, <code style={styles.code}>git add -p</code>.
          These are not supported in Claude Code's Bash tool because the tool runs commands
          non-interactively. The <code style={styles.code}>-i</code> flag on rebase opens an editor;
          the <code style={styles.code}>-p</code> flag on add prompts for input. Neither works in
          a non-interactive shell.
        </p></Reveal>

        <Reveal><MCQCard card={s4[1]} color={colors[16]} /></Reveal>

        <Reveal><p style={styles.prose}>
          Every Bash command runs with a timeout. The default is 2 minutes (120,000ms). For
          long-running operations — large builds, complex test suites, data migrations — you
          can specify a longer timeout up to 10 minutes (600,000ms). Commands can also be run
          in the background for truly long operations.
        </p></Reveal>

        <Reveal><MCQCard card={s4[2]} color={colors[17]} /></Reveal>

        <Reveal><p style={styles.prose}>
          When chaining commands, the choice of operator matters. Use <code style={styles.code}>&&</code> when
          the second command depends on the first succeeding. Use <code style={styles.code}>;</code> when
          you want both to run regardless. Use <code style={styles.code}>|</code> only for actual piping
          (stdout → stdin). And never use newlines to separate commands in a Bash tool call.
        </p></Reveal>

        <Reveal>
          <CodeBlock
            title="Command Chaining"
            code={`# Dependent: second runs only if first succeeds
npm install && npm run build

# Independent: both run regardless
git status ; npm test

# Pipe: stdout of first feeds stdin of second
git log --oneline | head -5`}
          />
        </Reveal>

        <Reveal><MCQCard card={s4[3]} color={colors[18]} /></Reveal>

        {/* ── LESSON END ── */}
        <Reveal>
          <div style={styles.divider}>◆</div>
        </Reveal>

        <Reveal id="summary">
          <div style={styles.endSection}>
            <div style={styles.endLabel}>End of Lesson 1</div>
            <p style={styles.endProse}>
              You now understand Claude Code's multi-tool architecture: seven tools, each with a
              specific purpose. The key insight is tool selection — dedicated tools over Bash
              equivalents, parallel calls when independent, and always read before edit. Safety
              principles guide every action: investigate before deleting, confirm before
              irreversible operations, and never skip hooks.
            </p>
            <p style={styles.endProse}>
              In Lesson 2, we'll explore how Claude Code manages context — planning modes,
              custom slash commands, and the CLAUDE.md system that shapes every conversation.
            </p>
            <a href="/claude-code-anki/claude-code/planning" style={styles.nextBtn}>
              Next: Context, Planning & Commands →
            </a>
          </div>
        </Reveal>
      </main>
    </div>
  )
}

const styles = {
  page: {
    background: T.color.bg,
    minHeight: '100vh',
    color: T.color.ink,
  },

  main: {
    maxWidth: '680px',
    margin: '0 auto',
    padding: '3rem 2rem 6rem',
  },

  lessonLabel: {
    fontFamily: T.font.label,
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: T.color.accent,
    marginBottom: '0.5rem',
  },

  h1: {
    fontFamily: T.font.heading,
    fontSize: 'clamp(2rem, 5vw, 2.8rem)',
    fontWeight: 700,
    color: T.color.ink,
    letterSpacing: '-0.01em',
    marginBottom: '0.75rem',
    lineHeight: 1.2,
  },

  subtitle: {
    fontFamily: T.font.prose,
    fontSize: '1.1rem',
    color: T.color.ink4,
    fontStyle: 'italic',
    marginBottom: '2.5rem',
    lineHeight: 1.6,
  },

  setLabel: {
    fontFamily: T.font.label,
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    marginBottom: '0.6rem',
  },

  h2: {
    fontFamily: T.font.heading,
    fontSize: '1.6rem',
    fontWeight: 600,
    color: T.color.ink2,
    marginBottom: '1.5rem',
    lineHeight: 1.3,
  },

  prose: {
    fontFamily: T.font.prose,
    fontSize: '1.05rem',
    lineHeight: 1.85,
    color: T.color.ink3,
    marginBottom: '1.4rem',
    maxWidth: '65ch',
  },

  code: {
    fontFamily: T.font.code,
    fontSize: '0.85em',
    background: 'rgba(99,102,241,0.08)',
    padding: '0.15em 0.4em',
    borderRadius: '3px',
    color: T.color.accent,
  },

  img: { width: '100%', maxWidth: '720px', borderRadius: '8px', margin: '1rem auto', display: 'block' },

  divider: {
    textAlign: 'center',
    color: T.color.bg3,
    fontSize: '1rem',
    margin: '3rem 0',
    letterSpacing: '0.5em',
  },

  endSection: {
    textAlign: 'center',
    padding: '2rem 0',
  },

  endLabel: {
    fontFamily: T.font.label,
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: T.color.ink4,
    marginBottom: '1.5rem',
  },

  endProse: {
    fontFamily: T.font.prose,
    fontSize: '1rem',
    lineHeight: 1.8,
    color: T.color.ink3,
    marginBottom: '1rem',
    maxWidth: '55ch',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'left',
  },

  nextBtn: {
    display: 'inline-block',
    marginTop: '1.5rem',
    padding: '0.85rem 2.5rem',
    border: `1px solid ${T.color.accent}`,
    borderRadius: '4px',
    fontFamily: T.font.label,
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: T.color.accent,
    transition: 'background 0.25s, color 0.25s',
  },
}
