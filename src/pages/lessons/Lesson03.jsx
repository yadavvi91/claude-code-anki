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
const mod = modules[0] // Claude Code Fundamentals
const lesson = mod.lessons[2] // MCP Integration & GitHub Workflows
const sets = lesson.cardSets
const C = T.setColor

const palette = [C[1], C[2], C[3], C[4], C[5], C[6]]
let ci = 0
function nc() { return palette[ci++ % 6] }
const allCards = sets.flatMap(s => s.cards)
const colors = allCards.map(() => nc())

const s1 = sets[0].cards // MCP Servers
const s2 = sets[1].cards // GitHub Integration
const s3 = sets[2].cards // Hooks Fundamentals
const s4 = sets[3].cards // Advanced Hooks & SDK

const NAV_SECTIONS = [
  { id: 'set1', label: 'MCP Servers' },
  { id: 'set2', label: 'GitHub Integration' },
  { id: 'set3', label: 'Hooks Fundamentals' },
  { id: 'set4', label: 'Advanced Hooks & SDK' },
  { id: 'summary', label: 'Summary', divider: true },
]

export default function Lesson03() {
  return (
    <div style={styles.page}>
      <NavSidebar sections={NAV_SECTIONS} />
      <LessonNav
        moduleTitle="Claude Code Fundamentals"
        moduleColor={mod.color}
        prevLink="/claude-code/planning"
        prevLabel="L2: Context"
        nextLink="/claude-code/agent-loop"
        nextLabel="L15: Agent Loop"
      />

      <main style={styles.main}>
        {/* ── OPENING ── */}
        <Reveal>
          <div style={styles.lessonLabel}>Lesson 3</div>
          <h1 style={styles.h1}>MCP, GitHub & Hooks</h1>
          <p style={styles.subtitle}>
            Extending Claude Code with MCP servers, GitHub integration, hooks, and the SDK
          </p>
        </Reveal>

        <Reveal>
          <ConceptDisplay
            concept="MCP · Playwright · @claude · PreToolUse · PostToolUse · SDK"
            description="Claude Code is an extensible platform. These are the extension points."
            color={mod.color}
          />
        </Reveal>

        <Reveal>
          <img src={`${base}303239_000019s.jpg`} alt="Overview of Claude Code extension points — MCP, hooks, SDK" style={styles.img} />
        </Reveal>

        {/* ══════════════ SET 1 — MCP SERVERS ══════════════ */}
        <Reveal id="set1">
          <div style={{ ...styles.setLabel, color: C[1] }}>Set 1 — MCP Servers</div>
          <h2 style={styles.h2}>Adding new capabilities</h2>
        </Reveal>

        <Reveal>
          <img src={`${base}303239_000000s.jpg`} alt="Claude Code with default tools + Playwright MCP Server architecture" style={styles.img} />
        </Reveal>

        <Reveal><p style={styles.prose}>
          MCP (Model Context Protocol) servers extend Claude Code with tools it wouldn't normally
          have. They run either remotely or locally on your machine, giving Claude new abilities
          like controlling a browser, querying databases, or interacting with cloud services.
        </p></Reveal>

        <Reveal>
          <CodeBlock
            title="Terminal (not inside Claude Code)"
            code="claude mcp add playwright npx @playwright/mcp@latest"
          />
        </Reveal>

        <Reveal><p style={styles.prose}>
          The Playwright MCP server is one of the most popular — it gives Claude the ability to
          control a web browser. Claude can navigate to your app, see the actual rendered output,
          and make informed decisions about styling based on what things <em>look like</em>, not
          just what the code says.
        </p></Reveal>

        <Reveal>
          <img src={`${base}303239_000045s.jpg`} alt="Playwright MCP server controlling a web browser for Claude" style={styles.img} />
        </Reveal>

        <Reveal><p style={styles.prose}>
          When you first use MCP tools, Claude asks for permission each time. To pre-approve, add
          the server to your permissions in <code style={styles.code}>.claude/settings.local.json</code>:
        </p></Reveal>

        <Reveal>
          <CodeBlock
            title=".claude/settings.local.json"
            code={`{
  "permissions": {
    "allow": ["mcp__playwright"],
    "deny": []
  }
}`}
          />
        </Reveal>

        <Reveal>
          <TipCallout variant="tip">
            Note the double underscores in <code style={styles.code}>mcp__playwright</code>.
            This naming convention applies to all MCP server permissions.
          </TipCallout>
        </Reveal>

          <MCQSection color={colors[0]} count={s1.length}>


            {s1.map((card, i) => (


              <Reveal key={card.id}><MCQCard card={card} color={colors[i]} /></Reveal>


            ))}


          </MCQSection>

        <Reveal>
          <img src={`${base}303239_000128s.jpg`} alt="MCP server permissions and settings configuration" style={styles.img} />
        </Reveal>

        <div style={styles.divider}>· · ·</div>

        {/* ══════════════ SET 2 — GITHUB INTEGRATION ══════════════ */}
        <Reveal id="set2">
          <div style={{ ...styles.setLabel, color: C[2] }}>Set 2 — GitHub Integration</div>
          <h2 style={styles.h2}>Claude as a GitHub team member</h2>
        </Reveal>

        <Reveal>
          <img src={`${base}303240_000011s.jpg`} alt="VS Code terminal showing the /install-github-app command for GitHub integration" style={styles.img} />
        </Reveal>

        <Reveal><p style={styles.prose}>
          Claude Code offers an official GitHub integration that runs Claude inside GitHub Actions.
          Run <code style={styles.code}>/install-github-app</code> in Claude to set it up — it installs
          the app, adds your API key, and generates a PR with the workflow files.
        </p></Reveal>

        <Reveal>
          <img src={`${base}303240_000019s.jpg`} alt="Installing the GitHub app with /install-github-app command" style={styles.img} />
        </Reveal>

        <Reveal>
          <ComparisonTable
            headers={['Workflow', 'Trigger', 'What Claude Does']}
            rows={[
              ['Mention Action', '@claude in any issue or PR', 'Analyzes request, plans task, executes, responds'],
              ['PR Review Action', 'Any new pull request', 'Reviews changes, analyzes impact, posts report'],
            ]}
          />
        </Reveal>

        <Reveal><p style={styles.prose}>
          You can customize the workflows after merging the initial PR. Add project setup steps,
          provide <code style={styles.code}>custom_instructions</code> about your environment,
          configure MCP servers, and explicitly list allowed tools.
        </p></Reveal>

        <Reveal>
          <CodeBlock
            title="Workflow customization example"
            code={`custom_instructions: |
  The project is already set up with all
  dependencies installed. The server is running
  at localhost:3000.

allowed_tools: "Bash(npm:*),Bash(sqlite3:*),
  mcp__playwright__browser_snapshot,
  mcp__playwright__browser_click,..."`}
          />
        </Reveal>

        <Reveal>
          <TipCallout variant="warning">
            In GitHub Actions, every tool must be explicitly listed — there's no interactive
            approval. Each MCP server tool must be individually specified in <code style={styles.code}>allowed_tools</code>.
          </TipCallout>
        </Reveal>

          <MCQSection color={colors[s1.length]} count={s2.length}>


            {s2.map((card, i) => (


              <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + i]} /></Reveal>


            ))}


          </MCQSection>

        <Reveal>
          <img src={`${base}303240_000148s.jpg`} alt="Git output showing Claude Code creating workflow files and a pull request" style={styles.img} />
        </Reveal>

        <div style={styles.divider}>· · ·</div>

        {/* ══════════════ SET 3 — HOOKS FUNDAMENTALS ══════════════ */}
        <Reveal id="set3">
          <div style={{ ...styles.setLabel, color: C[3] }}>Set 3 — Hooks Fundamentals</div>
          <h2 style={styles.h2}>Intercepting tool calls</h2>
        </Reveal>

        <Reveal>
          <img src={`${base}312000_000076s.jpg`} alt="Hook lifecycle: PreToolUse → Claude Code reads file → PostToolUse" style={styles.img} />
        </Reveal>

        <Reveal><p style={styles.prose}>
          Hooks let you run commands before or after Claude uses a tool. They're defined in settings
          files and use a <strong>matcher</strong> to specify which tools to watch.
        </p></Reveal>

        <Reveal><p style={styles.prose}>
          <strong>PreToolUse</strong> hooks run before a tool executes — they can <em>block</em> the
          operation (exit code 2) or allow it (exit code 0). <strong>PostToolUse</strong> hooks run
          after execution — they can provide feedback but can't undo what happened.
        </p></Reveal>

        <Reveal>
          <img src={`${base}312000_000108s.jpg`} alt="PreToolUse and PostToolUse hook execution flow" style={styles.img} />
        </Reveal>

        <Reveal>
          <CodeBlock
            title="Hook configuration example"
            code={`"PreToolUse": [
  {
    "matcher": "Read|Grep",
    "hooks": [
      {
        "type": "command",
        "command": "node /home/hooks/read_hook.js"
      }
    ]
  }
]`}
          />
        </Reveal>

        <Reveal><p style={styles.prose}>
          Your hook script receives JSON via stdin containing the session ID, tool name, and input
          parameters. Parse it, decide whether to allow or block, and exit with the appropriate code.
        </p></Reveal>

        <Reveal>
          <CodeBlock
            title="hooks/read_hook.js — block .env access"
            code={`async function main() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  const toolArgs = JSON.parse(
    Buffer.concat(chunks).toString()
  );
  const readPath =
    toolArgs.tool_input?.file_path ||
    toolArgs.tool_input?.path || "";

  if (readPath.includes('.env')) {
    console.error("Cannot read .env file");
    process.exit(2); // Block the tool call
  }
}
main();`}
          />
        </Reveal>

          <MCQSection color={colors[s1.length + s2.length]} count={s3.length}>


            {s3.map((card, i) => (


              <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + s2.length + i]} /></Reveal>


            ))}


          </MCQSection>

        <Reveal>
          <img src={`${base}312002_000039s.jpg`} alt="VS Code showing a .env file with API keys — the kind of sensitive data hooks can protect" style={styles.img} />
        </Reveal>

        <div style={styles.divider}>· · ·</div>

        {/* ══════════════ SET 4 — ADVANCED HOOKS & SDK ══════════════ */}
        <Reveal id="set4">
          <div style={{ ...styles.setLabel, color: C[4] }}>Set 4 — Advanced Hooks & SDK</div>
          <h2 style={styles.h2}>Power patterns</h2>
        </Reveal>

        <Reveal>
          <img src={`${base}312004_000286s.jpg`} alt="TypeScript database code — a getPendingOrders function that hooks could validate" style={styles.img} />
        </Reveal>

        <Reveal><p style={styles.prose}>
          Hooks can solve real development pain points. A <strong>TypeScript type-checking hook</strong> runs
          <code style={styles.code}>tsc --noEmit</code> after every edit, catching broken call sites
          immediately. A <strong>query duplication hook</strong> launches a separate Claude instance to
          review changes for duplicate database queries.
        </p></Reveal>

        <Reveal>
          <ComparisonTable
            headers={['Hook Type', 'Purpose']}
            rows={[
              ['PreToolUse', 'Block or allow tool calls (exit 0 = allow, exit 2 = block)'],
              ['PostToolUse', 'Run follow-up actions, provide feedback'],
              ['Stop', 'Runs when Claude finishes responding'],
              ['Notification', 'Runs when Claude needs permission or has been idle 60s'],
              ['SubagentStop', 'Runs when a subagent (Task) finishes'],
              ['PreCompact', 'Runs before a compact operation'],
              ['UserPromptSubmit', 'Runs when user submits a prompt'],
              ['SessionStart', 'Runs when starting or resuming a session'],
              ['SessionEnd', 'Runs when a session ends'],
            ]}
          />
        </Reveal>

        <Reveal>
          <TipCallout variant="tip">
            To discover the exact stdin format for any hook, create a helper with
            <code style={styles.code}>"command": "jq . {'>'} log.json"</code> and matcher
            <code style={styles.code}>"*"</code>. It dumps the input so you can inspect it.
          </TipCallout>
        </Reveal>

        <Reveal>
          <img src={`${base}303240_000052s.jpg`} alt="Terminal prompt in a project directory — ready for Claude Code SDK commands" style={styles.img} />
        </Reveal>

        <Reveal>
          <img src={`${base}312001_000041s.jpg`} alt="Claude Code SDK — programmatic access to Claude from scripts" style={styles.img} />
        </Reveal>

        <Reveal><p style={styles.prose}>
          The <strong>Claude Code SDK</strong> lets you run Claude programmatically from your own
          scripts. It's available for TypeScript, Python, and CLI — same Claude Code, same tools,
          but integrated into your pipelines.
        </p></Reveal>

        <Reveal>
          <CodeBlock
            title="SDK usage — TypeScript"
            code={`import { query } from "@anthropic-ai/claude-code";

for await (const message of query({
  prompt: "Look for duplicate queries in ./src/queries",
  options: {
    allowedTools: ["Edit"] // Default is read-only
  }
})) {
  console.log(JSON.stringify(message, null, 2));
}`}
          />
        </Reveal>

        <Reveal>
          <TipCallout variant="warning">
            The SDK defaults to <strong>read-only</strong> permissions. You must explicitly add
            tools like <code style={styles.code}>Edit</code> via <code style={styles.code}>allowedTools</code> to
            enable writes.
          </TipCallout>
        </Reveal>

        <Reveal>
          <img src={`${base}312004_000468s.jpg`} alt="TypeScript database query code with date operations and type casting" style={styles.img} />
        </Reveal>

        <Reveal><p style={styles.prose}>
          Security note: the course recommends using <strong>absolute paths</strong> for hook scripts
          to prevent path interception and binary planting attacks. For team sharing, use a
          <code style={styles.code}>settings.example.json</code> with <code style={styles.code}>$PWD</code> placeholders
          and a setup script that replaces them with actual paths.
        </p></Reveal>

          <MCQSection color={colors[s1.length + s2.length + s3.length]} count={s4.length}>


            {s4.map((card, i) => (


              <Reveal key={card.id}><MCQCard card={card} color={colors[s1.length + s2.length + s3.length + i]} /></Reveal>


            ))}


          </MCQSection>

        {/* ── END ── */}
        <div style={styles.divider}>· · ·</div>

        <Reveal id="summary">
          <div style={styles.endSection}>
            <div style={styles.endLabel}>End of Lesson 3</div>
            <p style={styles.endProse}>
              You now know how to extend Claude with MCP servers, integrate it into GitHub
              workflows, build hooks that intercept and enhance tool calls, and use the SDK
              for programmatic access.
            </p>
            <p style={styles.endProse}>
              This completes Module 1: Claude Code Fundamentals. Next up is a reflective
              interlude before diving into MCP in depth.
            </p>
            <a href="/claude-code-anki/claude-code/agent-loop" style={styles.nextBtn}>
              Next → Lesson 15: The Agent Loop
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
  diagram: { width: '100%', maxWidth: '800px', borderRadius: '8px', margin: '1.5rem auto', display: 'block' },

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
