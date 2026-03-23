// Single source of truth for all card content
// Structure: modules > lessons > cardSets > cards

export const modules = [
  {
    id: 'claude-code',
    title: 'Claude Code Fundamentals',
    color: '#6366f1',
    lessons: [
      {
        id: 'cc-l1',
        title: 'Architecture & Tools',
        slug: 'claude-code/architecture',
        cardSets: [
          {
            id: 'cc-l1-s1',
            title: 'Set 1 — Tool Selection',
            cards: [
              {
                id: 'cc-l1-s1-q1',
                question: 'When Claude Code needs to read a file, which tool should it prefer?',
                codeBlock: null,
                options: [
                  { label: '`Read` tool', correct: true, feedback: 'Correct. The `Read` tool is purpose-built for reading files and provides line numbers, unlike `cat` via Bash.' },
                  { label: '`Bash` with `cat`', correct: false, feedback: 'While `cat` works, the `Read` tool is preferred because it shows line numbers and provides a better user experience for reviewing code.' },
                  { label: '`Grep` tool', correct: false, feedback: '`Grep` searches file contents for patterns — it doesn\'t read an entire file.' },
                  { label: '`Glob` tool', correct: false, feedback: '`Glob` finds files by name patterns — it returns file paths, not file contents.' },
                ]
              },
              {
                id: 'cc-l1-s1-q2',
                question: 'You need to find all TypeScript files matching `src/components/**/*.tsx`. Which tool is best?',
                codeBlock: null,
                options: [
                  { label: '`Glob` tool', correct: true, feedback: 'Correct. `Glob` is optimized for file pattern matching and returns paths sorted by modification time.' },
                  { label: '`Bash` with `find`', correct: false, feedback: '`find` works but `Glob` is preferred — it\'s faster and provides a better review experience for the user.' },
                  { label: '`Grep` tool', correct: false, feedback: '`Grep` searches file contents, not file names. Use `Glob` for name-based pattern matching.' },
                  { label: '`Agent` tool', correct: false, feedback: 'The `Agent` tool is overkill for a simple file search. Use it for complex, multi-step explorations.' },
                ]
              },
              {
                id: 'cc-l1-s1-q3',
                question: 'You want to search for all usages of `handleSubmit` across a codebase. Which tool?',
                codeBlock: null,
                options: [
                  { label: '`Grep` tool', correct: true, feedback: 'Correct. `Grep` is built on ripgrep and supports full regex, file type filtering, and context lines.' },
                  { label: '`Bash` with `grep -r`', correct: false, feedback: 'The `Grep` tool is preferred over `grep` in Bash — it has better permissions handling and the user can review the search easily.' },
                  { label: '`Read` tool on each file', correct: false, feedback: 'Reading files one by one is inefficient. `Grep` searches across the entire codebase in one call.' },
                  { label: '`Glob` tool', correct: false, feedback: '`Glob` matches file names, not file contents. You need `Grep` to search inside files.' },
                ]
              },
              {
                id: 'cc-l1-s1-q4',
                question: 'When should you use the `Agent` tool instead of direct `Grep` or `Glob`?',
                codeBlock: null,
                options: [
                  { label: 'When the search requires multiple rounds of exploration across unfamiliar code', correct: true, feedback: 'Correct. The `Agent` tool launches subagents that can autonomously chain searches, reads, and analysis — ideal for broad or uncertain explorations.' },
                  { label: 'For any search operation', correct: false, feedback: 'For simple, directed searches (specific file, class, or function), `Grep` and `Glob` are faster and more efficient.' },
                  { label: 'Only when editing files', correct: false, feedback: 'The `Agent` tool is for research and exploration, not specifically for editing.' },
                  { label: 'When you need to read a single known file', correct: false, feedback: 'For a known file path, just use `Read` directly.' },
                ]
              },
              {
                id: 'cc-l1-s1-q5',
                question: 'What is the key difference between `Edit` and `Write` tools?',
                codeBlock: null,
                options: [
                  { label: '`Edit` sends only the diff; `Write` overwrites the entire file', correct: true, feedback: 'Correct. `Edit` does exact string replacement (minimal diff), while `Write` creates or completely rewrites a file.' },
                  { label: 'They are interchangeable', correct: false, feedback: '`Edit` is preferred for modifying existing files because it sends only the changed portion, making it easy to review.' },
                  { label: '`Write` is for code, `Edit` is for text', correct: false, feedback: 'Both handle any file type. The distinction is partial update (Edit) vs full overwrite (Write).' },
                  { label: '`Edit` can create new files, `Write` cannot', correct: false, feedback: 'It\'s the opposite — `Write` creates new files, while `Edit` modifies existing ones.' },
                ]
              },
            ]
          },
          {
            id: 'cc-l1-s2',
            title: 'Set 2 — Architecture & Context',
            cards: [
              {
                id: 'cc-l1-s2-q1',
                question: 'Claude Code runs commands in a sandbox by default. What does this mean?',
                codeBlock: null,
                options: [
                  { label: 'Commands are restricted to prevent accidental damage to the system', correct: true, feedback: 'Correct. The sandbox limits what Bash commands can do — preventing destructive operations unless explicitly allowed.' },
                  { label: 'Commands run in a Docker container', correct: false, feedback: 'Claude Code doesn\'t use Docker. The sandbox is a permission-based restriction on command execution.' },
                  { label: 'Commands cannot access the internet', correct: false, feedback: 'The sandbox restricts local system damage, not network access.' },
                  { label: 'Only `Read` commands are allowed', correct: false, feedback: 'Many tools work in the sandbox. The restriction is on potentially destructive Bash commands.' },
                ]
              },
              {
                id: 'cc-l1-s2-q2',
                question: 'Why does Claude Code prefer dedicated tools over equivalent Bash commands?',
                codeBlock: null,
                options: [
                  { label: 'Dedicated tools provide a better review experience for the user', correct: true, feedback: 'Correct. When Claude uses `Read` instead of `cat`, or `Grep` instead of `rg`, the user can more easily understand and approve the action.' },
                  { label: 'Bash commands are slower', correct: false, feedback: 'Performance isn\'t the main reason — it\'s about user experience and reviewability.' },
                  { label: 'Bash is disabled by default', correct: false, feedback: 'Bash is available, but dedicated tools are preferred when they exist for the task.' },
                  { label: 'Dedicated tools have more features', correct: false, feedback: 'Bash commands are often more flexible. The preference is about UX, not features.' },
                ]
              },
              {
                id: 'cc-l1-s2-q3',
                question: 'When Claude Code calls multiple independent tools, what should it do?',
                codeBlock: null,
                options: [
                  { label: 'Call them all in parallel in a single message', correct: true, feedback: 'Correct. Independent tool calls should be parallelized for efficiency. Only sequential dependencies require waiting.' },
                  { label: 'Call them one at a time, waiting for each result', correct: false, feedback: 'Sequential execution wastes time when the calls are independent. Parallel calls are preferred.' },
                  { label: 'Use the Agent tool to handle them', correct: false, feedback: 'Direct parallel tool calls are simpler and faster than launching a subagent for independent operations.' },
                  { label: 'Combine them into a single Bash command', correct: false, feedback: 'If dedicated tools exist for each operation, use them directly rather than combining into Bash.' },
                ]
              },
              {
                id: 'cc-l1-s2-q4',
                question: 'What file does Claude Code read at startup to understand project context?',
                codeBlock: null,
                options: [
                  { label: '`CLAUDE.md`', correct: true, feedback: 'Correct. `CLAUDE.md` is the project-level context file that tells Claude about the codebase, conventions, and rules.' },
                  { label: '`README.md`', correct: false, feedback: 'Claude Code specifically looks for `CLAUDE.md`, not `README.md`. Though it can read README if asked.' },
                  { label: '`package.json`', correct: false, feedback: '`package.json` provides project metadata but `CLAUDE.md` is the dedicated context file for Claude Code.' },
                  { label: '`.claude/config.json`', correct: false, feedback: '`.claude/` contains settings, but `CLAUDE.md` is the human-readable context file.' },
                ]
              },
              {
                id: 'cc-l1-s2-q5',
                question: 'Before editing a file, what must Claude Code do first?',
                codeBlock: null,
                options: [
                  { label: 'Read the file at least once in the conversation', correct: true, feedback: 'Correct. The `Edit` tool requires that the file has been read first — this prevents blind edits and ensures Claude understands the existing code.' },
                  { label: 'Create a backup', correct: false, feedback: 'No backup is required, but reading first is mandatory to prevent edits based on assumptions.' },
                  { label: 'Get user permission', correct: false, feedback: 'Permission may be needed depending on settings, but reading first is a hard requirement of the Edit tool.' },
                  { label: 'Run the test suite', correct: false, feedback: 'Tests are good practice but not a prerequisite for using the Edit tool. Reading the file is.' },
                ]
              },
            ]
          },
          {
            id: 'cc-l1-s3',
            title: 'Set 3 — Safety & Best Practices',
            cards: [
              {
                id: 'cc-l1-s3-q1',
                question: 'Claude Code should avoid `git push --force` to main/master. Why?',
                codeBlock: null,
                options: [
                  { label: 'It can overwrite other people\'s commits and is hard to reverse', correct: true, feedback: 'Correct. Force-pushing to shared branches can destroy work. Claude should warn the user and prefer safer alternatives.' },
                  { label: 'It\'s not a valid git command', correct: false, feedback: '`git push --force` is valid but dangerous on shared branches.' },
                  { label: 'It\'s slow', correct: false, feedback: 'Speed isn\'t the issue — data loss and irreversibility are.' },
                  { label: 'It requires special permissions', correct: false, feedback: 'While some repos restrict it, the primary concern is safety, not permissions.' },
                ]
              },
              {
                id: 'cc-l1-s3-q2',
                question: 'When a pre-commit hook fails, what should Claude Code do about the commit?',
                codeBlock: null,
                options: [
                  { label: 'Fix the issue, re-stage, and create a NEW commit', correct: true, feedback: 'Correct. The failed commit never happened, so `--amend` would modify the PREVIOUS commit. Always create a new commit after fixing hook failures.' },
                  { label: 'Use `--amend` to retry', correct: false, feedback: 'Dangerous! `--amend` modifies the previous commit, not the failed one (which doesn\'t exist). This can destroy prior work.' },
                  { label: 'Use `--no-verify` to skip the hook', correct: false, feedback: 'Skipping hooks bypasses safety checks. Fix the underlying issue instead.' },
                  { label: 'Abandon the commit entirely', correct: false, feedback: 'The work should still be committed — just fix what the hook flagged and try again.' },
                ]
              },
              {
                id: 'cc-l1-s3-q3',
                question: 'Which files should Claude Code NEVER commit without warning the user?',
                codeBlock: null,
                options: [
                  { label: '`.env`, `credentials.json`, and similar secret files', correct: true, feedback: 'Correct. Files that may contain secrets should never be staged automatically. Claude should warn the user if they request it.' },
                  { label: 'Test files', correct: false, feedback: 'Test files are safe to commit. The concern is about files containing secrets.' },
                  { label: 'Documentation files', correct: false, feedback: 'Documentation is safe to commit.' },
                  { label: 'Package lock files', correct: false, feedback: 'Lock files are important to commit for reproducible builds.' },
                ]
              },
              {
                id: 'cc-l1-s3-q4',
                question: 'Claude Code encounters unfamiliar files in the working directory. What should it do?',
                codeBlock: null,
                options: [
                  { label: 'Investigate before deleting or overwriting — it may be the user\'s in-progress work', correct: true, feedback: 'Correct. Unexpected state often represents work-in-progress. Claude should investigate, not destroy.' },
                  { label: 'Delete them to clean up', correct: false, feedback: 'Never delete unfamiliar files — they could be important user work.' },
                  { label: 'Ignore them completely', correct: false, feedback: 'Ignoring is safer than deleting but investigating is better — the files may affect the task.' },
                  { label: 'Move them to a backup directory', correct: false, feedback: 'Moving files without understanding them can break things. Investigate first.' },
                ]
              },
              {
                id: 'cc-l1-s3-q5',
                question: 'When staging files for a commit, what does Claude Code prefer over `git add -A`?',
                codeBlock: null,
                options: [
                  { label: 'Adding specific files by name', correct: true, feedback: 'Correct. `git add -A` can accidentally include sensitive files or large binaries. Naming specific files is safer.' },
                  { label: 'Using `git add .`', correct: false, feedback: '`git add .` has the same problem as `-A` — it stages everything, including potentially sensitive files.' },
                  { label: 'Using `git add -p` for interactive staging', correct: false, feedback: 'Interactive mode (`-i` or `-p`) requires user input which isn\'t supported in Claude Code\'s Bash tool.' },
                  { label: 'Committing without staging', correct: false, feedback: 'Git requires staging before committing (unless using `git commit -a`, which has similar issues to `git add -A`).' },
                ]
              },
            ]
          },
          {
            id: 'cc-l1-s4',
            title: 'Set 4 — Bash & System Commands',
            cards: [
              {
                id: 'cc-l1-s4-q1',
                question: 'When should Claude Code use the `Bash` tool instead of dedicated tools?',
                codeBlock: null,
                options: [
                  { label: 'For system commands and terminal operations that require shell execution', correct: true, feedback: 'Correct. `Bash` is for commands like `npm install`, `git push`, `docker build` — operations where no dedicated tool exists.' },
                  { label: 'Whenever it wants to read a file', correct: false, feedback: 'Use the `Read` tool for reading files, not `cat` via Bash.' },
                  { label: 'For searching code', correct: false, feedback: 'Use `Grep` for content search and `Glob` for file pattern matching.' },
                  { label: 'For all operations — Bash is the most flexible', correct: false, feedback: 'Flexibility doesn\'t mean best choice. Dedicated tools provide better UX and reviewability.' },
                ]
              },
              {
                id: 'cc-l1-s4-q2',
                question: 'What flag should you NEVER use with `git rebase` in Claude Code?',
                codeBlock: null,
                options: [
                  { label: '`-i` (interactive)', correct: true, feedback: 'Correct. Interactive mode requires user input which isn\'t supported in Claude Code\'s Bash execution.' },
                  { label: '`--onto`', correct: false, feedback: '`--onto` is a valid non-interactive flag for rebasing.' },
                  { label: '`--continue`', correct: false, feedback: '`--continue` is fine — it resumes a rebase in progress.' },
                  { label: '`--abort`', correct: false, feedback: '`--abort` is fine — it cancels a rebase in progress.' },
                ]
              },
              {
                id: 'cc-l1-s4-q3',
                question: 'Claude Code\'s Bash tool has a default timeout. What is it?',
                codeBlock: null,
                options: [
                  { label: '2 minutes (120,000ms)', correct: true, feedback: 'Correct. The default timeout is 120 seconds. You can specify a longer timeout up to 10 minutes (600,000ms).' },
                  { label: '30 seconds', correct: false, feedback: 'The default is 2 minutes, not 30 seconds.' },
                  { label: '10 minutes', correct: false, feedback: '10 minutes (600,000ms) is the maximum, not the default.' },
                  { label: 'No timeout', correct: false, feedback: 'There is always a timeout — 2 minutes by default.' },
                ]
              },
              {
                id: 'cc-l1-s4-q4',
                question: 'How should Claude Code chain sequential Bash commands?',
                codeBlock: null,
                options: [
                  { label: 'Use `&&` to chain dependent commands in a single call', correct: true, feedback: 'Correct. `&&` ensures the next command only runs if the previous succeeded. Use `;` if you don\'t care about earlier failures.' },
                  { label: 'Use newlines to separate them', correct: false, feedback: 'Newlines are NOT recommended for separating commands in a Bash tool call.' },
                  { label: 'Make separate Bash calls for each', correct: false, feedback: 'For dependent sequential commands, chaining with `&&` in one call is more efficient.' },
                  { label: 'Use `|` to pipe them', correct: false, feedback: 'Pipes connect stdout→stdin, which is different from sequential execution.' },
                ]
              },
            ]
          },
        ]
      },
      {
        id: 'cc-l2',
        title: 'Context, Planning & Commands',
        slug: 'claude-code/planning',
        cardSets: []
      },
      {
        id: 'cc-l3',
        title: 'MCP Integration & GitHub Workflows',
        slug: 'claude-code/mcp-github',
        cardSets: []
      },
    ]
  },
  {
    id: 'mcp',
    title: 'MCP Fundamentals',
    color: '#8b5cf6',
    lessons: [
      { id: 'mcp-l4', title: 'MCP Architecture & Building Servers', slug: 'mcp/architecture', cardSets: [] },
      { id: 'mcp-l5', title: 'Resources, Prompts & Patterns', slug: 'mcp/resources-prompts', cardSets: [] },
    ]
  },
  {
    id: 'mcp-advanced',
    title: 'MCP Advanced',
    color: '#ec4899',
    lessons: [
      { id: 'mcp-l6', title: 'Sampling, Progress & Security', slug: 'mcp-advanced/sampling', cardSets: [] },
      { id: 'mcp-l7', title: 'Transports & Production', slug: 'mcp-advanced/transports', cardSets: [] },
    ]
  },
  {
    id: 'skills',
    title: 'Agent Skills',
    color: '#f59e0b',
    lessons: [
      { id: 'skills-l8', title: 'Skill Anatomy', slug: 'skills/anatomy', cardSets: [] },
      { id: 'skills-l9', title: 'Distribution & Troubleshooting', slug: 'skills/distribution', cardSets: [] },
    ]
  },
  {
    id: 'subagents',
    title: 'Subagents',
    color: '#14b8a6',
    lessons: [
      { id: 'sub-l10', title: 'Subagent Mechanics', slug: 'subagents/mechanics', cardSets: [] },
      { id: 'sub-l11', title: 'Effective Design', slug: 'subagents/design', cardSets: [] },
    ]
  },
  {
    id: 'copilot',
    title: 'GitHub Copilot',
    color: '#3b82f6',
    lessons: [
      { id: 'cop-l12', title: 'Core Modes', slug: 'copilot/core-modes', cardSets: [] },
      { id: 'cop-l13', title: 'Customization', slug: 'copilot/customization', cardSets: [] },
      { id: 'cop-l14', title: 'Advanced Features', slug: 'copilot/cloud-agents', cardSets: [] },
    ]
  },
]

// Flat list of all cards (computed from modules)
export const allCards = modules.flatMap(m =>
  m.lessons.flatMap(l =>
    l.cardSets.flatMap(s =>
      s.cards.map(c => ({ ...c, lessonId: l.id, moduleId: m.id, setId: s.id }))
    )
  )
)

// Initial SRS state for all cards
export const initialSRSState = Object.fromEntries(
  allCards.map(c => [c.id, { interval: 0, easeFactor: 2.5, due: null, seen: false, correct: 0, incorrect: 0 }])
)
