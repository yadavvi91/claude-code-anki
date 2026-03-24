import { modules } from '../../data/cardSets'
import MCQCard from '../../components/MCQCard'
import Reveal from '../../components/Reveal'
import LessonNav from '../../components/LessonNav'
import NavSidebar from '../../components/NavSidebar'
import ConceptDisplay from '../../components/ConceptDisplay'
import CodeBlock from '../../components/CodeBlock'
import ComparisonTable from '../../components/ComparisonTable'
import TipCallout from '../../components/TipCallout'
import { T } from '../../theme'

const base = '/claude-code-anki/images/'
const mod = modules[0] // Claude Code Fundamentals
const lesson = mod.lessons[1] // Context, Planning & Commands
const sets = lesson.cardSets
const C = T.setColor

const palette = [C[1], C[2], C[3], C[4], C[5], C[6]]
let ci = 0
function nc() { return palette[ci++ % 6] }
const allCards = sets.flatMap(s => s.cards)
const colors = allCards.map(() => nc())

const s1 = sets[0].cards // CLAUDE.md & Context
const s2 = sets[1].cards // Planning & Thinking
const s3 = sets[2].cards // Conversation Control
const s4 = sets[3].cards // Custom Commands

const NAV_SECTIONS = [
  { id: 'set1', label: 'CLAUDE.md & Context' },
  { id: 'set2', label: 'Planning & Thinking' },
  { id: 'set3', label: 'Conversation Control' },
  { id: 'set4', label: 'Custom Commands' },
  { id: 'summary', label: 'Summary', divider: true },
]

export default function Lesson02() {
  return (
    <div style={styles.page}>
      <NavSidebar sections={NAV_SECTIONS} />
      <LessonNav
        moduleTitle="Claude Code Fundamentals"
        moduleColor={mod.color}
        prevLink="/claude-code/architecture"
        prevLabel="L1: Architecture"
        nextLink="/claude-code/mcp-github"
        nextLabel="L3: MCP & GitHub"
      />

      <main style={styles.main}>
        {/* ── OPENING ── */}
        <Reveal>
          <div style={styles.lessonLabel}>Lesson 2</div>
          <h1 style={styles.h1}>Context, Planning & Commands</h1>
          <p style={styles.subtitle}>
            How to guide Claude with context, control conversations, and automate workflows
          </p>
        </Reveal>

        <Reveal>
          <ConceptDisplay
            concept="/init · CLAUDE.md · @ · # · /compact · /clear"
            description="Context is everything. Learn to give Claude exactly what it needs — no more, no less."
            color={mod.color}
          />
        </Reveal>

        <Reveal>
          <img src={`${base}303241_000019s.jpg`} alt="Overview of how context shapes Claude Code's behavior" style={styles.img} />
        </Reveal>

        {/* ══════════════ SET 1 — CLAUDE.md & CONTEXT ══════════════ */}
        <Reveal id="set1">
          <div style={{ ...styles.setLabel, color: C[1] }}>Set 1 — CLAUDE.md & Context Management</div>
          <h2 style={styles.h2}>Teaching Claude about your project</h2>
        </Reveal>

        <Reveal>
          <img src={`${base}303237_000056s.jpg`} alt="Adding memory with # command to CLAUDE.md" style={styles.img} />
        </Reveal>

        <Reveal><p style={styles.prose}>
          Your project might have dozens or hundreds of files, but Claude only needs the <strong>right
          information</strong> to help you effectively. Too much irrelevant context actually
          <em> decreases</em> Claude's performance. Learning to guide it toward relevant files and
          documentation is essential.
        </p></Reveal>

        <Reveal><p style={styles.prose}>
          The first command to run in a new project is <code style={styles.code}>/init</code>. It tells
          Claude to analyze your entire codebase — purpose, architecture, important commands, critical
          files, coding patterns — and write a summary to <code style={styles.code}>CLAUDE.md</code>.
        </p></Reveal>

        <Reveal>
          <img src={`${base}303241_000062s.jpg`} alt="Running /init to generate a CLAUDE.md file" style={styles.img} />
        </Reveal>

        <Reveal>
          <TipCallout variant="insight">
            CLAUDE.md gets included in <strong>every request</strong> you make to Claude. It's like a
            persistent system prompt for your project.
          </TipCallout>
        </Reveal>

        <Reveal><p style={styles.prose}>
          Claude recognizes <code style={styles.code}>CLAUDE.md</code> files in three locations, each
          serving a different purpose:
        </p></Reveal>

        <Reveal>
          <ComparisonTable
            headers={['File', 'Scope', 'Shared?']}
            rows={[
              ['CLAUDE.md', 'Project root — committed to source control', 'Yes — team-wide'],
              ['CLAUDE.local.md', 'Project — personal customizations', 'No — personal only'],
              ['~/.claude/CLAUDE.md', 'Global — all projects on your machine', 'No — your machine only'],
            ]}
          />
        </Reveal>

        {/* S1 cards */}
        {s1.map((card, i) => (
          <Reveal key={card.id}><MCQCard card={card} color={colors[i]} /></Reveal>
        ))}

        <Reveal>
          <img src={`${base}303241_000094s.jpg`} alt="CLAUDE.md file locations — project root, local, and global" style={styles.img} />
        </Reveal>

        <Reveal><p style={styles.prose}>
          The <code style={styles.code}>@</code> symbol is your shortcut for including file contents.
          Type <code style={styles.code}>@auth</code> and Claude shows matching files to choose from.
          You can also reference files in CLAUDE.md with <code style={styles.code}>@</code> — those
          contents are then included in <em>every</em> request.
        </p></Reveal>

        <Reveal><p style={styles.prose}>
          To add persistent instructions, use the <code style={styles.code}>#</code> shortcut.
          Typing <code style={styles.code}># Use comments sparingly. Only comment complex code.</code> enters
          "memory mode" and Claude merges the instruction into your CLAUDE.md automatically.
        </p></Reveal>

        <Reveal>
          <img src={`${base}303241_000129s.jpg`} alt="Using the @ symbol to include file context and # for memory" style={styles.img} />
        </Reveal>

        {/* S1 remaining cards */}
        <div style={styles.divider}>· · ·</div>

        {/* ══════════════ SET 2 — PLANNING & THINKING ══════════════ */}
        <Reveal id="set2">
          <div style={{ ...styles.setLabel, color: C[2] }}>Set 2 — Planning & Thinking Modes</div>
          <h2 style={styles.h2}>When Claude needs to think harder</h2>
        </Reveal>

        <Reveal>
          <img src={`${base}303237_000146s.jpg`} alt="Rewind a conversation with Esc+Esc to remove irrelevant context" style={styles.img} />
        </Reveal>

        <Reveal><p style={styles.prose}>
          For complex tasks, Claude has two distinct mechanisms for deeper work:
          <strong> Planning Mode</strong> for breadth across your codebase, and
          <strong> Thinking Modes</strong> for depth on hard problems.
        </p></Reveal>

        <Reveal>
          <img src={`${base}303236_000021s.jpg`} alt="Planning Mode and Thinking Modes in Claude Code" style={styles.img} />
        </Reveal>

        <Reveal><p style={styles.prose}>
          <strong>Planning Mode</strong> is activated by pressing <code style={styles.code}>Shift+Tab</code> twice
          (or once if you're already auto-accepting edits). In this mode, Claude reads more files,
          creates a detailed implementation plan, shows you exactly what it intends to do, and waits
          for your approval before proceeding.
        </p></Reveal>

        <Reveal>
          <ComparisonTable
            headers={['Mode', 'Best For', 'Activation']}
            rows={[
              ['Planning Mode', 'Multi-file tasks, broad codebase understanding', 'Shift+Tab × 2'],
              ['Think', 'Basic reasoning on complex logic', 'Type "think"'],
              ['Think more', 'Extended reasoning', 'Type "think more"'],
              ['Think a lot', 'Comprehensive reasoning', 'Type "think a lot"'],
              ['Think longer', 'Extended time reasoning', 'Type "think longer"'],
              ['Ultrathink', 'Maximum reasoning capability', 'Type "ultrathink"'],
            ]}
          />
        </Reveal>

        <Reveal>
          <TipCallout variant="tip">
            You can combine both modes for tasks that need breadth AND depth. But both consume
            additional tokens, so use them purposefully.
          </TipCallout>
        </Reveal>

        <Reveal><p style={styles.prose}>
          Screenshots are another powerful way to communicate. Paste a screenshot with
          <code style={styles.code}>Ctrl+V</code> (not Cmd+V on macOS) to show Claude exactly what
          you're looking at.
        </p></Reveal>

        <Reveal>
          <img src={`${base}303236_000082s.jpg`} alt="Shift+Tab activation for Planning Mode in Claude Code" style={styles.img} />
        </Reveal>

        {/* S2 cards */}
        {s2.map((card, i) => (
          <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + i]} /></Reveal>
        ))}

        <div style={styles.divider}>· · ·</div>

        {/* ══════════════ SET 3 — CONVERSATION CONTROL ══════════════ */}
        <Reveal id="set3">
          <div style={{ ...styles.setLabel, color: C[3] }}>Set 3 — Conversation Control</div>
          <h2 style={styles.h2}>Steering the conversation</h2>
        </Reveal>

        <Reveal>
          <img src={`${base}303237_000138s.jpg`} alt="Conversation control techniques — Escape, /compact, /clear" style={styles.img} />
        </Reveal>

        <Reveal><p style={styles.prose}>
          Long conversations accumulate context that can become irrelevant or distracting. Claude provides
          several techniques to keep things focused.
        </p></Reveal>

        <Reveal><p style={styles.prose}>
          <strong>Escape</strong> stops Claude mid-response — useful when it's heading in the wrong
          direction. <strong>Double-tap Escape</strong> lets you rewind the conversation to an earlier
          point, keeping valuable context while removing distracting history.
        </p></Reveal>

        <Reveal>
          <ComparisonTable
            headers={['Command', 'What It Does', 'When to Use']}
            rows={[
              ['Escape', 'Stops current response', 'Claude heading wrong direction'],
              ['Escape × 2', 'Rewind to earlier message', 'Remove distracting history'],
              ['/compact', 'Summarize history, preserve knowledge', 'Continue related tasks'],
              ['/clear', 'Remove all history completely', 'Switch to unrelated task'],
            ]}
          />
        </Reveal>

        <Reveal>
          <TipCallout variant="warning">
            Use <code style={styles.code}>/clear</code> when old context might confuse Claude for
            a new task. Use <code style={styles.code}>/compact</code> when Claude has learned
            valuable things you want to keep.
          </TipCallout>
        </Reveal>

        {/* S3 cards */}
        {s3.map((card, i) => (
          <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + s2.length + i]} /></Reveal>
        ))}

        <Reveal>
          <img src={`${base}303237_000195s.jpg`} alt="Summary of conversation control commands in Claude Code" style={styles.img} />
        </Reveal>

        <div style={styles.divider}>· · ·</div>

        {/* ══════════════ SET 4 — CUSTOM COMMANDS ══════════════ */}
        <Reveal id="set4">
          <div style={{ ...styles.setLabel, color: C[4] }}>Set 4 — Custom Commands</div>
          <h2 style={styles.h2}>Building your own slash commands</h2>
        </Reveal>

        <Reveal>
          <img src={`${base}303237_000184s.jpg`} alt="/compact command usage in Claude Code terminal" style={styles.img} />
        </Reveal>

        <Reveal><p style={styles.prose}>
          Claude Code comes with built-in commands, but you can create your own to automate repetitive
          tasks. Custom commands live in <code style={styles.code}>.claude/commands/</code> as markdown
          files. The filename becomes the command name — <code style={styles.code}>audit.md</code> becomes
          <code style={styles.code}>/audit</code>.
        </p></Reveal>

        <Reveal>
          <img src={`${base}303234_000078s.jpg`} alt="Custom commands in the .claude/commands/ directory" style={styles.img} />
        </Reveal>

        <Reveal>
          <CodeBlock
            title=".claude/commands/write_tests.md"
            code={`Write comprehensive tests for: $ARGUMENTS

Testing conventions:
* Use Vitests with React Testing Library
* Place test files in a __tests__ directory
* Name test files as [filename].test.ts(x)
* Use @/ prefix for imports

Coverage:
* Test happy paths
* Test edge cases
* Test error states`}
          />
        </Reveal>

        <Reveal><p style={styles.prose}>
          The <code style={styles.code}>$ARGUMENTS</code> placeholder gets replaced with whatever you
          type after the command. So <code style={styles.code}>/write_tests the auth module</code> sends
          the full prompt with "the auth module" substituted in.
        </p></Reveal>

        <Reveal>
          <img src={`${base}303234_000092s.jpg`} alt="$ARGUMENTS placeholder substitution in custom commands" style={styles.img} />
        </Reveal>

        <Reveal>
          <TipCallout variant="tip">
            Remember to restart Claude Code after creating new command files — commands are
            discovered at startup, not hot-loaded.
          </TipCallout>
        </Reveal>

        {/* S4 cards */}
        {s4.map((card, i) => (
          <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + s2.length + s3.length + i]} /></Reveal>
        ))}

        <Reveal>
          <img src={`${base}303236_000207s.jpg`} alt="Summary of making effective changes with Claude Code" style={styles.img} />
        </Reveal>

        {/* ── END ── */}
        <div style={styles.divider}>· · ·</div>

        <Reveal id="summary">
          <div style={styles.endSection}>
            <div style={styles.endLabel}>End of Lesson 2</div>
            <p style={styles.endProse}>
              You now understand how to shape Claude's context with CLAUDE.md, steer conversations
              with Escape and /compact, leverage Planning and Thinking modes for complex tasks,
              and create reusable custom commands.
            </p>
            <p style={styles.endProse}>
              Next, we explore how to extend Claude with MCP servers, integrate with GitHub,
              and build powerful hooks.
            </p>
            <a href="/claude-code-anki/claude-code/mcp-github" style={styles.nextBtn}>
              Next → Lesson 3: MCP Integration & GitHub
            </a>
          </div>
        </Reveal>
      </main>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: T.color.bg,
  },

  main: {
    maxWidth: '720px',
    margin: '0 auto',
    padding: '2rem 1.5rem 6rem',
  },

  lessonLabel: {
    fontFamily: T.font.label,
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: T.color.ink4,
    marginBottom: '0.75rem',
  },

  h1: {
    fontFamily: T.font.heading,
    fontSize: '2.4rem',
    fontWeight: 700,
    color: T.color.ink,
    lineHeight: 1.15,
    marginBottom: '0.75rem',
  },

  subtitle: {
    fontFamily: T.font.prose,
    fontSize: '1.1rem',
    color: T.color.ink3,
    lineHeight: 1.6,
    marginBottom: '2.5rem',
  },

  setLabel: {
    fontFamily: T.font.label,
    fontSize: '0.6rem',
    fontWeight: 700,
    letterSpacing: '0.35em',
    textTransform: 'uppercase',
    marginBottom: '0.35rem',
  },

  h2: {
    fontFamily: T.font.heading,
    fontSize: '1.55rem',
    fontWeight: 600,
    color: T.color.ink2,
    lineHeight: 1.3,
    marginBottom: '1.4rem',
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
