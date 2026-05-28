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
                question: 'You need to read lines 50-80 of a 5000-line config file without loading the entire thing into context. Which approach is most token-efficient?',
                codeBlock: null,
                options: [
                  { label: '`Read` tool with `offset` and `limit` parameters', correct: true, feedback: 'Correct. The `Read` tool supports `offset` and `limit`, letting you load only the exact line range you need — keeping the context window small on large files.' },
                  { label: '`Bash` with `cat` and pipe through `head`/`tail`', correct: false, feedback: '`cat file | tail -n +50 | head -n 30` works but outputs raw text without line numbers. `Read` with offset/limit is purpose-built for partial file reads with line numbering.' },
                  { label: '`Grep` tool searching for content near line 50', correct: false, feedback: '`Grep` finds matching patterns, not line ranges. If you don\'t know the content, you can\'t search for it.' },
                  { label: '`Read` the entire file and ignore what you don\'t need', correct: false, feedback: 'Loading all 5000 lines wastes context window tokens. Use `offset` and `limit` to read only what you need.' },
                ]
              },
              {
                id: 'cc-l1-s1-q2',
                question: 'You need to find the most recently modified test files in `src/` to understand what was last worked on. Which tool returns results sorted by modification time?',
                codeBlock: null,
                options: [
                  { label: '`Glob` tool — results are sorted by modification time by default', correct: true, feedback: 'Correct. `Glob` returns matching file paths sorted by modification time, so the most recently changed files appear first — perfect for understanding recent activity.' },
                  { label: '`Bash` with `find` and manually piping to `sort`', correct: false, feedback: '`find` requires extra piping (`-printf` + `sort`) to get modification-time ordering. `Glob` provides this out of the box.' },
                  { label: '`Grep` tool searching for test patterns', correct: false, feedback: '`Grep` searches file contents, not file names. You need pattern matching on paths, not content search.' },
                  { label: '`Bash` with `ls -lt` on the directory', correct: false, feedback: '`ls` doesn\'t support glob patterns like `**/*.test.tsx`. `Glob` handles recursive patterns and returns modification-time-sorted results.' },
                ]
              },
              {
                id: 'cc-l1-s1-q3',
                question: 'You need to find every file where `handleSubmit` is called with more than one argument (e.g., `handleSubmit(data, options)`). Which approach handles this regex-based content search across the codebase?',
                codeBlock: null,
                options: [
                  { label: '`Grep` tool with a regex pattern like `handleSubmit\\(.*,`', correct: true, feedback: 'Correct. `Grep` is built on ripgrep with full regex support, file type filtering, and context lines — ideal for pattern-based content search across many files.' },
                  { label: '`Glob` tool filtering for files containing `handleSubmit`', correct: false, feedback: '`Glob` matches file names/paths, not file contents. You need `Grep` to search inside files for content patterns.' },
                  { label: '`Read` each file and check manually', correct: false, feedback: 'Reading files one by one is extremely slow across a large codebase. `Grep` searches all files in a single call.' },
                  { label: '`Agent` tool to explore the codebase', correct: false, feedback: 'An Agent is overkill for a straightforward regex search. `Grep` handles this directly in one call.' },
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
                question: 'A user is reviewing Claude Code\'s actions and sees a `Read` tool call for `src/app.ts`. Compare this to seeing `Bash: cat src/app.ts | head -50` in the log. What is the practical difference for the reviewer?',
                codeBlock: null,
                options: [
                  { label: 'The `Read` call is easier to review — the user instantly sees what file and lines were read, whereas the Bash command requires parsing the shell pipeline', correct: true, feedback: 'Correct. Dedicated tools expose structured parameters (file, offset, limit) making actions transparent. Bash commands require the reviewer to mentally parse shell syntax to understand intent.' },
                  { label: 'No practical difference — both show the file being read', correct: false, feedback: 'The `Read` tool surfaces structured metadata (file path, line range) directly. A Bash pipeline requires the reviewer to understand `cat`, `head`, and piping to know what happened.' },
                  { label: 'The Bash version is better because it shows the exact command run', correct: false, feedback: 'Seeing the exact shell command is less reviewable, not more. Structured tool calls make intent clearer at a glance.' },
                  { label: 'The `Read` tool is faster, which is why it\'s preferred', correct: false, feedback: 'Speed isn\'t the main factor. The preference is about reviewability — how easily a human can understand and approve each action.' },
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
                question: 'Claude Code tries to run `git rebase -i HEAD~3` via the Bash tool, but the command hangs and eventually times out. What went wrong?',
                codeBlock: null,
                options: [
                  { label: 'The `-i` flag opens an interactive editor, which Claude Code\'s Bash tool cannot provide — it has no stdin for user interaction', correct: true, feedback: 'Correct. Interactive flags like `-i` (rebase), `-p` (add), and interactive `add -i` all require user input that Claude Code\'s non-interactive Bash execution cannot supply.' },
                  { label: 'The rebase had merge conflicts that need manual resolution', correct: false, feedback: 'Merge conflicts produce error output, not a hang. The hang occurs because `-i` opens an interactive editor waiting for input that will never come.' },
                  { label: 'Git rebase is not supported in Claude Code', correct: false, feedback: 'Non-interactive `git rebase` works fine. The problem is specifically the `-i` flag requiring interactive input.' },
                  { label: 'The `HEAD~3` syntax is invalid inside Claude Code', correct: false, feedback: '`HEAD~3` is standard git syntax and works fine. The issue is the `-i` flag opening an interactive editor.' },
                ]
              },
              {
                id: 'cc-l1-s4-q3',
                question: 'Claude Code runs `npm run build` via Bash, but the project is large and the build takes 4 minutes. The command fails with a timeout. What should Claude do?',
                codeBlock: null,
                options: [
                  { label: 'Re-run the command with an explicit `timeout` parameter set higher than the default 2 minutes (up to 10 minutes max)', correct: true, feedback: 'Correct. The default Bash timeout is 2 minutes (120,000ms). For long builds, set `timeout: 300000` (5 min) or up to `600000` (10 min max).' },
                  { label: 'Split the build into smaller commands that each finish within the timeout', correct: false, feedback: 'Build processes are usually not easily splittable. The correct approach is to increase the timeout parameter for the single build command.' },
                  { label: 'Use `run_in_background` and wait indefinitely', correct: false, feedback: '`run_in_background` is useful but still subject to the max timeout. For a 4-minute build, explicitly setting `timeout: 300000` is the direct fix.' },
                  { label: 'There is no way to handle this — commands that exceed the timeout always fail', correct: false, feedback: 'The Bash tool accepts an optional `timeout` parameter up to 600,000ms (10 minutes), which solves this exact problem.' },
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
        cardSets: [
          {
            id: 'cc-l2-s1',
            title: 'Set 1 — CLAUDE.md & Context Management',
            cards: [
              {
                id: 'cc-l2-s1-q1',
                question: 'What does the `/init` command do when you first start Claude in a new project?',
                codeBlock: null,
                options: [
                  { label: 'Analyzes the entire codebase and writes a summary to `CLAUDE.md`', correct: true, feedback: 'Correct. `/init` tells Claude to analyze your project\'s purpose, architecture, important commands, critical files, and coding patterns, then writes this to CLAUDE.md.' },
                  { label: 'Installs project dependencies', correct: false, feedback: '`/init` doesn\'t install anything — it creates a CLAUDE.md file that helps Claude understand your project.' },
                  { label: 'Creates a `.claude` configuration directory', correct: false, feedback: 'The `.claude` directory may already exist. `/init` specifically generates a CLAUDE.md summary of your codebase.' },
                  { label: 'Runs the test suite to verify the project works', correct: false, feedback: '`/init` is about understanding the codebase, not testing it.' },
                ]
              },
              {
                id: 'cc-l2-s1-q2',
                question: 'Claude recognizes CLAUDE.md files in three locations. Which one is NOT shared with other engineers?',
                codeBlock: null,
                options: [
                  { label: '`CLAUDE.local.md`', correct: true, feedback: 'Correct. `CLAUDE.local.md` contains personal instructions and customizations — it\'s not committed to source control.' },
                  { label: '`CLAUDE.md` in the project root', correct: false, feedback: 'The root `CLAUDE.md` is meant to be committed to source control and shared with the team.' },
                  { label: '`~/.claude/CLAUDE.md`', correct: false, feedback: 'This is your global CLAUDE.md for all projects on your machine — it\'s personal but not project-specific.' },
                  { label: 'All three are shared', correct: false, feedback: 'Only the root `CLAUDE.md` is shared. `CLAUDE.local.md` and `~/.claude/CLAUDE.md` are personal.' },
                ]
              },
              {
                id: 'cc-l2-s1-q3',
                question: 'How does the `@` symbol work when chatting with Claude Code?',
                codeBlock: null,
                options: [
                  { label: 'It includes a file\'s contents in your request — type `@` followed by a file path', correct: true, feedback: 'Correct. The `@` syntax lets you reference specific files. Claude shows matching files to choose from, then includes the selected file in the conversation.' },
                  { label: 'It mentions another user in a shared session', correct: false, feedback: 'Claude Code is single-user. `@` references files, not people.' },
                  { label: 'It runs a shell command', correct: false, feedback: 'Shell commands are handled by the Bash tool. `@` is for file references.' },
                  { label: 'It switches to a different Claude model', correct: false, feedback: '`@` is purely for including file contents in your request.' },
                ]
              },
              {
                id: 'cc-l2-s1-q4',
                question: 'Your team has a critical `API_CONVENTIONS.md` file that Claude must always know about when working in the repo. You add `@API_CONVENTIONS.md` to CLAUDE.md. What is the trade-off of this approach?',
                codeBlock: null,
                options: [
                  { label: 'The file is included in EVERY request (immediate access), but it consumes context window tokens even when irrelevant to the current task', correct: true, feedback: 'Correct. `@` references in CLAUDE.md load on every request. This guarantees Claude always has the info, but wastes tokens on tasks unrelated to API conventions.' },
                  { label: 'No trade-off — it is free to include files this way', correct: false, feedback: 'Every included file consumes context window tokens. On large files, this reduces space available for actual task work.' },
                  { label: 'Claude reads the file once and caches it permanently across sessions', correct: false, feedback: 'There is no cross-session cache. CLAUDE.md is reloaded on every request, and `@` files are re-included each time.' },
                  { label: 'The file becomes read-only and cannot be edited by Claude', correct: false, feedback: '`@` references only affect context loading. Claude can still edit the referenced file if asked.' },
                ]
              },
              {
                id: 'cc-l2-s1-q5',
                question: 'Claude keeps importing lodash in your project, but your team banned lodash in favor of native JS methods. You want this rule to persist across all future conversations. What is the best approach?',
                codeBlock: null,
                options: [
                  { label: 'Type `# Never use lodash — use native JS array/object methods` to add a persistent memory to CLAUDE.md', correct: true, feedback: 'Correct. The `#` command enters memory mode and merges your instruction into CLAUDE.md. This persists across sessions, so Claude will always know about the lodash ban.' },
                  { label: 'Correct Claude in the current conversation and hope it remembers', correct: false, feedback: 'Corrections in a single conversation don\'t persist. Use `#` to add the rule to CLAUDE.md so it applies to all future sessions.' },
                  { label: 'Add a lint rule and rely on Claude to check lint output', correct: false, feedback: 'A lint rule helps catch mistakes, but telling Claude upfront via `#` memory prevents the mistake from happening at all.' },
                  { label: 'Use `/clear` at the start of every conversation and re-state the rule', correct: false, feedback: 'Re-stating rules every session is tedious. `#` memories persist in CLAUDE.md automatically.' },
                ]
              },
            ]
          },
          {
            id: 'cc-l2-s2',
            title: 'Set 2 — Planning & Thinking Modes',
            cards: [
              {
                id: 'cc-l2-s2-q1',
                question: 'You need to refactor authentication across 15 files spanning 3 modules. Before Claude starts editing, you want it to read all relevant files and present a plan for your approval. Which mode should you activate?',
                codeBlock: null,
                options: [
                  { label: 'Planning Mode (Shift+Tab) — Claude reads broadly, creates a plan, and waits for your approval before making any changes', correct: true, feedback: 'Correct. Planning Mode makes Claude do thorough exploration first, then present a detailed plan. You review and approve before any edits happen — critical for large cross-module refactors.' },
                  { label: 'Default mode with "plan first" in your prompt — same result', correct: false, feedback: 'Asking Claude to plan in default mode is informal. Planning Mode formally prevents Claude from acting until you approve the plan — a stronger guarantee for risky refactors.' },
                  { label: 'Use a Thinking mode like "ultrathink" for the same effect', correct: false, feedback: 'Thinking modes give Claude more reasoning tokens but don\'t prevent it from acting. Planning Mode ensures Claude proposes a plan and waits for approval.' },
                  { label: 'There is no way to prevent Claude from editing immediately', correct: false, feedback: 'Planning Mode (Shift+Tab) exists specifically to make Claude explore and plan before acting.' },
                ]
              },
              {
                id: 'cc-l2-s2-q2',
                question: 'What does Planning Mode make Claude do differently?',
                codeBlock: null,
                options: [
                  { label: 'Read more files, create a detailed plan, show you what it intends to do, and wait for approval', correct: true, feedback: 'Correct. Planning Mode makes Claude do thorough exploration first, then present the plan for your review before proceeding.' },
                  { label: 'Skip reading files and start coding immediately', correct: false, feedback: 'That\'s the opposite — Planning Mode makes Claude read MORE files and plan before acting.' },
                  { label: 'Write code to a separate branch', correct: false, feedback: 'Planning Mode affects how Claude thinks, not where it writes code.' },
                  { label: 'Run tests automatically before making changes', correct: false, feedback: 'Testing isn\'t part of Planning Mode. It\'s about exploration and planning.' },
                ]
              },
              {
                id: 'cc-l2-s2-q3',
                question: 'You ask Claude to implement a complex recursive algorithm with memoization, but its first attempt has subtle off-by-one bugs in the base cases. What should you try before re-explaining the problem?',
                codeBlock: null,
                options: [
                  { label: 'Add "ultrathink" to your prompt — giving Claude maximum reasoning tokens helps it work through complex algorithmic logic more carefully', correct: true, feedback: 'Correct. Thinking modes (think → think more → think a lot → think longer → ultrathink) allocate progressively more tokens for internal reasoning. Complex algorithms with subtle edge cases benefit from deeper reasoning.' },
                  { label: 'Switch to Planning Mode so Claude reads more files first', correct: false, feedback: 'Planning Mode is for broad codebase exploration. This is a depth problem (complex logic), not a breadth problem (many files). A thinking mode is the right tool.' },
                  { label: 'Break the function into smaller pieces and ask Claude to implement each one', correct: false, feedback: 'Decomposition can help, but giving Claude more reasoning tokens with a thinking mode often solves subtle logic bugs without requiring you to manually decompose the problem.' },
                  { label: 'Start a new conversation — Claude\'s context is probably corrupted', correct: false, feedback: 'Context doesn\'t "corrupt." The issue is that the algorithm requires deeper reasoning. Thinking modes give Claude more space to work through the logic.' },
                ]
              },
              {
                id: 'cc-l2-s2-q4',
                question: 'When should you use Planning Mode vs Thinking Mode?',
                codeBlock: null,
                options: [
                  { label: 'Planning for broad codebase understanding; Thinking for complex logic and algorithmic challenges', correct: true, feedback: 'Correct. Planning Mode is for breadth (multi-file tasks, broad understanding). Thinking modes are for depth (complex logic, debugging, algorithms).' },
                  { label: 'They are interchangeable', correct: false, feedback: 'They serve different purposes: Planning = breadth across codebase, Thinking = depth on hard problems.' },
                  { label: 'Planning for small tasks; Thinking for large tasks', correct: false, feedback: 'Size isn\'t the distinction. Planning is about breadth (many files), Thinking is about depth (hard reasoning).' },
                  { label: 'Always use both together', correct: false, feedback: 'You CAN combine them, but each has distinct use cases. Both consume extra tokens, so use them purposefully.' },
                ]
              },
              {
                id: 'cc-l2-s2-q5',
                question: 'A designer sends you a screenshot of a UI bug on macOS. You try to paste it into Claude Code with Cmd+V but nothing happens. What is the correct shortcut?',
                codeBlock: null,
                options: [
                  { label: 'Ctrl+V — Claude Code uses Ctrl+V for screenshot pasting, even on macOS where Cmd+V is the system standard', correct: true, feedback: 'Correct. This is a common gotcha on macOS. Claude Code specifically uses Ctrl+V (not Cmd+V) for pasting screenshots from the clipboard.' },
                  { label: 'Cmd+Shift+V — the modified paste shortcut', correct: false, feedback: 'The correct shortcut is Ctrl+V, not Cmd+Shift+V. This differs from the standard macOS paste behavior.' },
                  { label: 'Save the screenshot to a file first, then use `@` to reference it', correct: false, feedback: 'While `@` can reference image files, Ctrl+V directly pastes from the clipboard — faster when you already have a screenshot copied.' },
                  { label: 'Screenshots are not supported in Claude Code\'s terminal interface', correct: false, feedback: 'Screenshots are fully supported. Paste with Ctrl+V (even on macOS) to include images in your conversation.' },
                ]
              },
            ]
          },
          {
            id: 'cc-l2-s3',
            title: 'Set 3 — Conversation Control',
            cards: [
              {
                id: 'cc-l2-s3-q1',
                question: 'What happens when you press Escape while Claude is responding?',
                codeBlock: null,
                options: [
                  { label: 'It stops Claude mid-response so you can redirect the conversation', correct: true, feedback: 'Correct. Escape interrupts Claude, which is useful when it heads in the wrong direction or tries to tackle too much at once.' },
                  { label: 'It exits Claude Code entirely', correct: false, feedback: 'Escape stops the current response, not the entire program.' },
                  { label: 'It undoes the last change Claude made', correct: false, feedback: 'Escape stops the response — it doesn\'t undo anything. For that, double-tap Escape to rewind.' },
                  { label: 'It saves your conversation', correct: false, feedback: 'Escape interrupts, it doesn\'t save.' },
                ]
              },
              {
                id: 'cc-l2-s3-q2',
                question: 'Claude went down a wrong path for 5 messages — you want to go back to message #3 where things were still on track, but keep the context Claude built up to that point. What do you do?',
                codeBlock: null,
                options: [
                  { label: 'Double-tap Escape to open the rewind view, then select message #3 — this preserves context up to that point and discards the wrong path', correct: true, feedback: 'Correct. Double Escape shows your message history. Selecting a point rewinds there, keeping valuable earlier context while removing the derailed portion.' },
                  { label: 'Use `/clear` and re-explain everything from scratch', correct: false, feedback: '`/clear` erases ALL context, including the useful work in messages 1-3. Double Escape lets you selectively rewind to keep the good parts.' },
                  { label: 'Use `/compact` to summarize and hope it drops the bad parts', correct: false, feedback: '`/compact` summarizes everything including the wrong path. Double Escape lets you precisely choose where to rewind.' },
                  { label: 'Just tell Claude to ignore the last 5 messages and start over', correct: false, feedback: 'Claude can\'t truly ignore messages already in context. Rewinding with double Escape actually removes them from the conversation.' },
                ]
              },
              {
                id: 'cc-l2-s3-q3',
                question: 'What is the difference between `/compact` and `/clear`?',
                codeBlock: null,
                options: [
                  { label: '`/compact` summarizes history preserving key knowledge; `/clear` removes everything', correct: true, feedback: 'Correct. `/compact` condenses the conversation while keeping what Claude learned. `/clear` is a full reset with zero prior context.' },
                  { label: 'They do the same thing', correct: false, feedback: '`/compact` preserves knowledge in a summarized form; `/clear` erases everything.' },
                  { label: '`/clear` summarizes; `/compact` removes', correct: false, feedback: 'It\'s the other way around. `/compact` summarizes, `/clear` removes.' },
                  { label: '`/compact` removes old files; `/clear` removes messages', correct: false, feedback: 'Neither removes files. `/compact` summarizes conversation history; `/clear` erases it entirely.' },
                ]
              },
              {
                id: 'cc-l2-s3-q4',
                question: 'When is `/compact` preferable to `/clear`?',
                codeBlock: null,
                options: [
                  { label: 'When Claude has learned a lot about your project and you want to continue with related tasks', correct: true, feedback: 'Correct. `/compact` preserves Claude\'s understanding of your codebase in a summarized form, ideal for transitioning between related tasks.' },
                  { label: 'When switching to a completely unrelated task', correct: false, feedback: 'For unrelated tasks, `/clear` is better — old context might confuse Claude. `/compact` is for continuing related work.' },
                  { label: 'When you want to free up disk space', correct: false, feedback: 'These commands manage conversation context, not disk space.' },
                  { label: 'Always — never use `/clear`', correct: false, feedback: '`/clear` is useful when old context would be distracting for a new, unrelated task.' },
                ]
              },
              {
                id: 'cc-l2-s3-q5',
                question: 'You notice Claude making the same mistake across different conversations. What\'s the most effective fix?',
                codeBlock: null,
                options: [
                  { label: 'Press Escape to stop, then use `#` to add a memory about the correct approach', correct: true, feedback: 'Correct. Combining Escape (stop the error) with `#` memory mode (persist the correction) prevents the mistake in all future conversations on this project.' },
                  { label: 'Use `/clear` and start over each time', correct: false, feedback: 'Starting over doesn\'t fix the root cause. Adding a memory with `#` persists the correction across sessions.' },
                  { label: 'Correct it in the current message only', correct: false, feedback: 'A one-time correction doesn\'t persist. Use `#` to add the fix to CLAUDE.md so it applies to future conversations.' },
                  { label: 'Uninstall and reinstall Claude Code', correct: false, feedback: 'The issue is project context, not the installation. Add a memory with `#` instead.' },
                ]
              },
            ]
          },
          {
            id: 'cc-l2-s4',
            title: 'Set 4 — Custom Commands',
            cards: [
              {
                id: 'cc-l2-s4-q1',
                question: 'Where do you create custom slash commands for Claude Code?',
                codeBlock: null,
                options: [
                  { label: 'In `.claude/commands/` as markdown files — the filename becomes the command name', correct: true, feedback: 'Correct. Create a file like `.claude/commands/audit.md` and it becomes the `/audit` command. You must restart Claude Code for new commands to be recognized.' },
                  { label: 'In `CLAUDE.md` under a "commands" section', correct: false, feedback: 'Commands are separate markdown files in `.claude/commands/`, not entries in CLAUDE.md.' },
                  { label: 'In `package.json` under "scripts"', correct: false, feedback: 'npm scripts and Claude Code commands are separate systems. Claude commands go in `.claude/commands/`.' },
                  { label: 'By running `/register-command`', correct: false, feedback: 'There\'s no registration command. Just create a markdown file in `.claude/commands/`.' },
                ]
              },
              {
                id: 'cc-l2-s4-q2',
                question: 'How do custom commands accept arguments?',
                codeBlock: 'Write comprehensive tests for: $ARGUMENTS',
                options: [
                  { label: 'Use the `$ARGUMENTS` placeholder in the markdown file', correct: true, feedback: 'Correct. `$ARGUMENTS` gets replaced with whatever you type after the command. `/write_tests the auth module` replaces `$ARGUMENTS` with "the auth module".' },
                  { label: 'Use `{{args}}` template syntax', correct: false, feedback: 'Claude Code uses `$ARGUMENTS`, not template syntax.' },
                  { label: 'Arguments aren\'t supported in custom commands', correct: false, feedback: 'Arguments are fully supported via the `$ARGUMENTS` placeholder.' },
                  { label: 'Use `--arg` flags after the command', correct: false, feedback: 'Custom commands use `$ARGUMENTS` as a single text replacement, not flag-style arguments.' },
                ]
              },
              {
                id: 'cc-l2-s4-q3',
                question: 'You just added `.claude/commands/deploy.md` to your project and immediately try `/deploy` in your running Claude Code session, but the command isn\'t found. Why?',
                codeBlock: null,
                options: [
                  { label: 'Claude Code reads commands at startup — you need to restart the session for new command files to be discovered', correct: true, feedback: 'Correct. Commands are loaded once at session start. Unlike CLAUDE.md changes, new command files require a restart to be picked up.' },
                  { label: 'The file extension must be `.yaml`, not `.md`', correct: false, feedback: 'Commands are markdown (`.md`) files. The issue is that Claude Code needs a restart to discover new command files.' },
                  { label: 'You need to register the command with `/register deploy`', correct: false, feedback: 'No registration is needed. Just restart Claude Code — it discovers commands from `.claude/commands/` automatically at startup.' },
                  { label: 'The command file has a syntax error', correct: false, feedback: 'Command files are plain markdown — there is no special syntax to get wrong. The issue is that Claude Code needs a restart to load new commands.' },
                ]
              },
              {
                id: 'cc-l2-s4-q4',
                question: 'Your team wants to create a `/review` command that checks code quality. A teammate suggests writing it as a shell script that runs ESLint. Why is this the wrong approach for a Claude Code custom command?',
                codeBlock: null,
                options: [
                  { label: 'Custom commands are markdown prompt files, not executable scripts — the content is sent to Claude as a prompt, and Claude decides which tools to use', correct: true, feedback: 'Correct. Command files are markdown prompts. Write something like "Review the staged changes for code quality issues, run the linter, and report findings." Claude then uses its tools (Bash, Grep, etc.) to execute the review.' },
                  { label: 'Shell scripts work fine — the teammate\'s approach is correct', correct: false, feedback: 'Claude Code commands are markdown prompts, not shell scripts. The content tells Claude what to do; Claude decides how to do it.' },
                  { label: 'You need to write it in JavaScript, not shell script', correct: false, feedback: 'Commands are markdown files, not code in any language. They contain prompt text that Claude interprets.' },
                  { label: 'Shell scripts need special permissions that Claude Code doesn\'t have', correct: false, feedback: 'The issue isn\'t permissions — command files are fundamentally markdown prompts for Claude, not executable scripts.' },
                ]
              },
              {
                id: 'cc-l2-s4-q5',
                question: 'Which is a practical use case for custom commands?',
                codeBlock: null,
                options: [
                  { label: 'Automating repetitive workflows like running audits with specific testing conventions', correct: true, feedback: 'Correct. Custom commands turn repetitive multi-step workflows into single commands, ensuring consistency and embedding project-specific conventions.' },
                  { label: 'Changing Claude\'s model', correct: false, feedback: 'Model selection isn\'t controlled by custom commands.' },
                  { label: 'Installing npm packages', correct: false, feedback: 'You can ask Claude to install packages directly. Custom commands are for reusable prompt workflows.' },
                  { label: 'Configuring git hooks', correct: false, feedback: 'Git hooks are separate from Claude Code custom commands.' },
                ]
              },
            ]
          },
        ]
      },
      {
        id: 'cc-l3',
        title: 'MCP Integration & GitHub Workflows',
        slug: 'claude-code/mcp-github',
        cardSets: [
          {
            id: 'cc-l3-s1',
            title: 'Set 1 — MCP Servers',
            cards: [
              {
                id: 'cc-l3-s1-q1',
                question: 'You want Claude Code to control a browser for visual testing, but Claude doesn\'t have browser tools built in. A colleague suggests "just npm install a browser library." Why is adding an MCP server the better approach?',
                codeBlock: null,
                options: [
                  { label: 'An MCP server (e.g., `claude mcp add playwright ...`) provides pre-built, tested browser tools that Claude can call directly — no custom code needed', correct: true, feedback: 'Correct. MCP servers come with tool definitions already built. `claude mcp add playwright npx @playwright/mcp@latest` instantly gives Claude browser control, screenshot, and navigation tools.' },
                  { label: 'npm install and MCP add do the same thing under the hood', correct: false, feedback: 'npm install adds a library to YOUR code. `claude mcp add` registers a server that provides tools Claude can call directly — no custom integration code needed.' },
                  { label: 'You can\'t use npm packages with Claude Code at all', correct: false, feedback: 'You can use npm packages via Bash, but you\'d have to write all the tool definitions and integration yourself. MCP servers provide this out of the box.' },
                  { label: 'MCP servers are faster than npm packages', correct: false, feedback: 'Speed isn\'t the differentiator. The benefit is that MCP servers provide pre-built, tested tool definitions that Claude understands immediately.' },
                ]
              },
              {
                id: 'cc-l3-s1-q2',
                question: 'How do you pre-approve an MCP server\'s tools so Claude doesn\'t ask for permission every time?',
                codeBlock: '{\n  "permissions": {\n    "allow": ["mcp__playwright"],\n    "deny": []\n  }\n}',
                options: [
                  { label: 'Add `mcp__servername` (double underscore) to the allow array in `.claude/settings.local.json`', correct: true, feedback: 'Correct. Note the double underscores in `mcp__playwright`. This goes in your local settings file.' },
                  { label: 'Run `claude mcp trust playwright`', correct: false, feedback: 'There\'s no `trust` command. Edit the permissions in settings.local.json instead.' },
                  { label: 'Add it to CLAUDE.md', correct: false, feedback: 'CLAUDE.md is for project context, not permissions. Use `.claude/settings.local.json`.' },
                  { label: 'Pass `--allow-all` when starting Claude', correct: false, feedback: 'Permissions are configured per-tool in settings files, not via command-line flags.' },
                ]
              },
              {
                id: 'cc-l3-s1-q3',
                question: 'What key advantage does the Playwright MCP server give Claude?',
                codeBlock: null,
                options: [
                  { label: 'Claude can see actual visual output in a browser, not just code', correct: true, feedback: 'Correct. The Playwright MCP server lets Claude control a browser, see rendered pages, and make informed decisions about styling based on what things actually look like.' },
                  { label: 'It makes Claude run faster', correct: false, feedback: 'Playwright doesn\'t affect speed — it gives Claude the ability to interact with a web browser.' },
                  { label: 'It replaces the need for CLAUDE.md', correct: false, feedback: 'Playwright and CLAUDE.md serve completely different purposes.' },
                  { label: 'It enables Claude to deploy code', correct: false, feedback: 'Playwright gives browser control, not deployment capabilities.' },
                ]
              },
              {
                id: 'cc-l3-s1-q4',
                question: 'You are inside a Claude Code session and type "claude mcp add playwright npx @playwright/mcp@latest" as a prompt. Claude responds with confusion. What went wrong?',
                codeBlock: null,
                options: [
                  { label: '`claude mcp add` is a terminal CLI command, not a Claude Code prompt — run it in a separate terminal window outside of Claude Code', correct: true, feedback: 'Correct. `claude mcp add` configures Claude Code itself. It must be run in your regular terminal as a CLI command, not typed as a conversation prompt inside a running Claude Code session.' },
                  { label: 'The command syntax is wrong — it should be `claude mcp install`', correct: false, feedback: 'The syntax is correct (`claude mcp add`), but you\'re running it in the wrong place. It\'s a terminal CLI command, not a Claude Code prompt.' },
                  { label: 'Claude Code doesn\'t support MCP servers', correct: false, feedback: 'Claude Code fully supports MCP servers. The issue is that `claude mcp add` is a CLI command for your terminal, not a prompt for inside Claude Code.' },
                  { label: 'You need to install Playwright with npm first', correct: false, feedback: 'No npm install is needed. The issue is that `claude mcp add` must be run in your terminal, not inside a Claude Code session.' },
                ]
              },
              {
                id: 'cc-l3-s1-q5',
                question: 'Besides Playwright, what types of MCP servers are available in the ecosystem?',
                codeBlock: null,
                options: [
                  { label: 'Database interactions, API testing, file system operations, cloud services, dev tool automation', correct: true, feedback: 'Correct. The MCP ecosystem includes servers for databases, APIs, cloud services, and more — extending Claude into a comprehensive development partner.' },
                  { label: 'Only browser automation servers', correct: false, feedback: 'Playwright is just one example. The ecosystem covers databases, APIs, cloud services, and many more.' },
                  { label: 'Only Anthropic-built servers', correct: false, feedback: 'The MCP ecosystem is open — anyone can build and share servers.' },
                  { label: 'Only JavaScript-based servers', correct: false, feedback: 'MCP servers can be built in any language. The protocol is language-agnostic.' },
                ]
              },
            ]
          },
          {
            id: 'cc-l3-s2',
            title: 'Set 2 — GitHub Integration',
            cards: [
              {
                id: 'cc-l3-s2-q1',
                question: 'Your team wants Claude to automatically review PRs and respond to `@claude` mentions in GitHub Issues. You need an API key, a GitHub App, and workflow files. What is the fastest way to set all of this up?',
                codeBlock: null,
                options: [
                  { label: 'Run `/install-github-app` inside Claude Code — it walks you through the entire setup and generates a PR with the workflow files', correct: true, feedback: 'Correct. `/install-github-app` handles the full setup: installing the GitHub App, configuring your API key, and creating a PR with the necessary workflow YAML files.' },
                  { label: 'Manually create GitHub Actions workflow files and configure secrets', correct: false, feedback: 'Manual setup works but is error-prone. `/install-github-app` automates the entire process and generates correct workflow files.' },
                  { label: 'Install a GitHub App from the marketplace and configure it in repo settings', correct: false, feedback: 'Claude\'s GitHub integration has a dedicated setup command (`/install-github-app`) that handles everything including workflow file generation.' },
                  { label: 'Add a `.github/claude.yml` config file to the repo', correct: false, feedback: 'There is no generic claude.yml config. The `/install-github-app` command generates the specific workflow files needed.' },
                ]
              },
              {
                id: 'cc-l3-s2-q2',
                question: 'The GitHub integration provides two default workflow actions. What does the Mention Action do?',
                codeBlock: null,
                options: [
                  { label: 'When you mention `@claude` in any issue or PR, Claude analyzes the request, plans a task, executes it, and responds', correct: true, feedback: 'Correct. `@claude` triggers Claude to analyze the request, create a plan, execute it with full codebase access, and respond directly in the issue or PR.' },
                  { label: 'It sends a Slack notification when Claude is mentioned', correct: false, feedback: 'The Mention Action triggers Claude to do work, not send notifications.' },
                  { label: 'It tags relevant team members', correct: false, feedback: '`@claude` triggers Claude to work on the task, not tag humans.' },
                  { label: 'It creates a new branch automatically', correct: false, feedback: 'The Mention Action makes Claude analyze and respond to your request in the issue/PR.' },
                ]
              },
              {
                id: 'cc-l3-s2-q3',
                question: 'What does the Pull Request Action do automatically?',
                codeBlock: null,
                options: [
                  { label: 'Whenever a PR is created, Claude reviews the changes and posts a detailed analysis report', correct: true, feedback: 'Correct. The PR Action triggers on every new pull request, automatically reviewing the code changes and posting feedback.' },
                  { label: 'It auto-merges PRs that pass tests', correct: false, feedback: 'The PR Action reviews and reports — it doesn\'t auto-merge.' },
                  { label: 'It assigns reviewers based on code ownership', correct: false, feedback: 'The PR Action is about Claude reviewing code, not assigning human reviewers.' },
                  { label: 'It runs the test suite', correct: false, feedback: 'The PR Action reviews code. Test execution is a separate CI concern.' },
                ]
              },
              {
                id: 'cc-l3-s2-q4',
                question: 'How do tool permissions differ in GitHub Actions vs local Claude Code?',
                codeBlock: null,
                options: [
                  { label: 'In GitHub Actions, every tool must be explicitly listed — there\'s no shortcut for permissions', correct: true, feedback: 'Correct. Unlike local development where you can approve interactively, GitHub Actions requires each tool (including MCP tools) to be individually listed in `allowed_tools`.' },
                  { label: 'GitHub Actions has more permissive defaults', correct: false, feedback: 'It\'s actually stricter — every single tool must be explicitly allowed.' },
                  { label: 'They work exactly the same way', correct: false, feedback: 'Local Claude Code can prompt for permission interactively. GitHub Actions cannot, so every tool must be pre-listed.' },
                  { label: 'GitHub Actions doesn\'t support tool permissions', correct: false, feedback: 'It does support them, but requires explicit listing of every allowed tool.' },
                ]
              },
              {
                id: 'cc-l3-s2-q5',
                question: 'You can customize the GitHub workflow with `custom_instructions`. What is this used for?',
                codeBlock: 'custom_instructions: |\n  The project is already set up.\n  The server is running at localhost:3000.',
                options: [
                  { label: 'Providing Claude with project-specific context about the environment setup', correct: true, feedback: 'Correct. `custom_instructions` tells Claude what\'s already available (installed dependencies, running servers, available tools) so it can work effectively in the CI environment.' },
                  { label: 'Configuring which branches trigger the workflow', correct: false, feedback: 'Branch triggers are GitHub Actions config, not `custom_instructions`. This field provides context to Claude.' },
                  { label: 'Setting up the CI/CD pipeline', correct: false, feedback: '`custom_instructions` is context for Claude, not CI/CD configuration.' },
                  { label: 'Defining test commands to run', correct: false, feedback: 'Test commands go in workflow steps. `custom_instructions` provides Claude with environmental context.' },
                ]
              },
            ]
          },
          {
            id: 'cc-l3-s3',
            title: 'Set 3 — Hooks Fundamentals',
            cards: [
              {
                id: 'cc-l3-s3-q1',
                question: 'What are the two primary types of hooks in Claude Code?',
                codeBlock: null,
                options: [
                  { label: 'PreToolUse (runs before a tool call) and PostToolUse (runs after a tool call)', correct: true, feedback: 'Correct. PreToolUse hooks can prevent tool calls from executing. PostToolUse hooks run after the tool has already been used and can provide feedback.' },
                  { label: 'BeforeRun and AfterRun', correct: false, feedback: 'The correct names are PreToolUse and PostToolUse.' },
                  { label: 'Input hooks and Output hooks', correct: false, feedback: 'They\'re called PreToolUse and PostToolUse, named after their timing relative to tool execution.' },
                  { label: 'Read hooks and Write hooks', correct: false, feedback: 'Hooks are categorized by timing (Pre/Post), not by read/write operations.' },
                ]
              },
              {
                id: 'cc-l3-s3-q2',
                question: 'A PreToolUse hook exits with code 2. What happens?',
                codeBlock: null,
                options: [
                  { label: 'The tool call is blocked, and any stderr message is sent to Claude as feedback', correct: true, feedback: 'Correct. Exit code 0 = allow, exit code 2 = block. Error messages written to stderr are passed to Claude explaining why the operation was blocked.' },
                  { label: 'The tool call proceeds normally', correct: false, feedback: 'Exit code 0 allows the call. Exit code 2 blocks it.' },
                  { label: 'Claude Code crashes', correct: false, feedback: 'Exit code 2 is a deliberate control signal, not a crash.' },
                  { label: 'The hook is disabled for future calls', correct: false, feedback: 'Exit code 2 blocks this specific call. The hook remains active for future calls.' },
                ]
              },
              {
                id: 'cc-l3-s3-q3',
                question: 'What data does a hook receive via standard input?',
                codeBlock: '{\n  "session_id": "2d6a...",\n  "hook_event_name": "PreToolUse",\n  "tool_name": "Read",\n  "tool_input": {\n    "file_path": "/code/.env"\n  }\n}',
                options: [
                  { label: 'JSON with session ID, hook event name, tool name, and tool input parameters', correct: true, feedback: 'Correct. The hook receives structured JSON via stdin containing all the details about the proposed tool call, including the specific parameters.' },
                  { label: 'The file contents being read', correct: false, feedback: 'Hooks receive metadata about the tool call (name, parameters), not the actual file contents.' },
                  { label: 'A plain text description of the action', correct: false, feedback: 'Hooks receive structured JSON, not plain text.' },
                  { label: 'Only the tool name as a string', correct: false, feedback: 'Hooks receive full JSON including session_id, tool_name, tool_input, and more.' },
                ]
              },
              {
                id: 'cc-l3-s3-q4',
                question: 'How do you configure a hook to trigger on BOTH Read and Grep operations?',
                codeBlock: '"matcher": "Read|Grep"',
                options: [
                  { label: 'Use the pipe `|` operator in the matcher: `"Read|Grep"`', correct: true, feedback: 'Correct. The pipe symbol acts as an OR operator in the matcher, so the hook triggers on either tool type.' },
                  { label: 'Create two separate hooks', correct: false, feedback: 'While possible, you can use the pipe operator to match multiple tools in one matcher.' },
                  { label: 'Use `"matcher": ["Read", "Grep"]`', correct: false, feedback: 'The matcher is a string with pipe-separated values, not an array.' },
                  { label: 'Use `"matcher": "*"` and check the tool name in your script', correct: false, feedback: 'While `*` matches everything, using `"Read|Grep"` is more targeted and efficient.' },
                ]
              },
              {
                id: 'cc-l3-s3-q5',
                question: 'Where can hook configurations be defined? (Select the most complete answer)',
                codeBlock: null,
                options: [
                  { label: 'Global (`~/.claude/settings.json`), project shared (`.claude/settings.json`), or project personal (`.claude/settings.local.json`)', correct: true, feedback: 'Correct. All three settings file locations support hooks — global for all projects, project-shared for team consistency, project-local for personal preferences.' },
                  { label: 'Only in CLAUDE.md', correct: false, feedback: 'CLAUDE.md is for project context. Hooks are configured in settings JSON files.' },
                  { label: 'Only in the global settings', correct: false, feedback: 'Hooks can be defined at global, project-shared, or project-personal levels.' },
                  { label: 'Only via the `/hooks` command', correct: false, feedback: 'The `/hooks` command is one way to create them, but hooks are stored in settings JSON files at any of the three levels.' },
                ]
              },
            ]
          },
          {
            id: 'cc-l3-s4',
            title: 'Set 4 — Advanced Hooks & SDK',
            cards: [
              {
                id: 'cc-l3-s4-q1',
                question: 'What practical problem does the TypeScript type-checking hook solve?',
                codeBlock: null,
                options: [
                  { label: 'When Claude modifies a function signature, it often misses updating all call sites — the hook runs `tsc --noEmit` and feeds errors back', correct: true, feedback: 'Correct. This PostToolUse hook catches type errors immediately after edits, so Claude can fix broken call sites before moving on.' },
                  { label: 'It prevents Claude from writing TypeScript', correct: false, feedback: 'The hook doesn\'t prevent writing — it validates types after edits and feeds errors back to Claude.' },
                  { label: 'It converts JavaScript to TypeScript', correct: false, feedback: 'The hook is about type-checking, not conversion.' },
                  { label: 'It formats TypeScript files', correct: false, feedback: 'The hook runs `tsc --noEmit` for type checking, not formatting.' },
                ]
              },
              {
                id: 'cc-l3-s4-q2',
                question: 'The query duplication hook launches a separate Claude Code instance. Why?',
                codeBlock: null,
                options: [
                  { label: 'To review changes and check for similar existing queries — a second instance audits the first instance\'s work', correct: true, feedback: 'Correct. The hook uses the SDK to launch a separate Claude that reviews the changes for duplicate functionality, then feeds findings back to the original instance.' },
                  { label: 'Because hooks can\'t run in the main Claude process', correct: false, feedback: 'Hooks run outside Claude, but the reason for a second instance is to get an AI-powered review of the changes.' },
                  { label: 'For performance reasons', correct: false, feedback: 'Actually it\'s slower and uses more tokens. The benefit is getting an AI-powered code review for duplicates.' },
                  { label: 'Because Claude can\'t read multiple files at once', correct: false, feedback: 'Claude can read multiple files. The second instance provides an independent review perspective.' },
                ]
              },
              {
                id: 'cc-l3-s4-q3',
                question: 'Beyond PreToolUse and PostToolUse, which of these is a valid hook type?',
                codeBlock: null,
                options: [
                  { label: 'Stop — runs when Claude Code has finished responding', correct: true, feedback: 'Correct. Other hook types include: Notification, SubagentStop, PreCompact, UserPromptSubmit, SessionStart, and SessionEnd.' },
                  { label: 'OnError — runs when Claude encounters an error', correct: false, feedback: 'There\'s no OnError hook. Valid types include Stop, Notification, SubagentStop, PreCompact, UserPromptSubmit, SessionStart, SessionEnd.' },
                  { label: 'BeforeResponse — runs before Claude generates text', correct: false, feedback: 'There\'s no BeforeResponse hook. The valid types are Stop, Notification, SubagentStop, PreCompact, UserPromptSubmit, SessionStart, SessionEnd.' },
                  { label: 'OnSave — runs when a file is saved', correct: false, feedback: 'There\'s no OnSave hook. File modifications are caught by PostToolUse hooks on Write/Edit tools.' },
                ]
              },
              {
                id: 'cc-l3-s4-q4',
                question: 'What is the recommended way to discover the exact stdin format your hook will receive?',
                codeBlock: '"command": "jq . > post-log.json"',
                options: [
                  { label: 'Create a helper hook with `jq . > log.json` to dump the input to a file for inspection', correct: true, feedback: 'Correct. Since stdin structure varies by hook type and tool, using `jq . > log.json` with a `"matcher": "*"` lets you see exactly what data your hook would receive.' },
                  { label: 'Read the documentation for every possible input format', correct: false, feedback: 'The stdin format varies by hook type AND by tool. A logging hook is the practical way to discover the exact structure.' },
                  { label: 'Ask Claude to describe the format', correct: false, feedback: 'While Claude knows the general format, a logging hook gives you the exact data for your specific setup.' },
                  { label: 'Use `console.log(process.stdin)` in your hook', correct: false, feedback: 'You need to actually read stdin. The `jq . > log.json` approach is simpler and captures the full JSON.' },
                ]
              },
              {
                id: 'cc-l3-s4-q5',
                question: 'What are the default permissions when using the Claude Code SDK?',
                codeBlock: 'import { query } from "@anthropic-ai/claude-code";\n\nfor await (const message of query({\n  prompt,\n})) {\n  console.log(message);\n}',
                options: [
                  { label: 'Read-only — can read files and search but cannot write, edit, or create files', correct: true, feedback: 'Correct. The SDK defaults to read-only. Add `allowedTools: ["Edit"]` in options to enable write permissions.' },
                  { label: 'Full access — same as interactive Claude Code', correct: false, feedback: 'The SDK is more restrictive by default — read-only. You must explicitly grant write permissions via `allowedTools`.' },
                  { label: 'No access — all tools must be explicitly enabled', correct: false, feedback: 'Read operations work by default. Only write operations need explicit enabling.' },
                  { label: 'Write-only — can create files but not read them', correct: false, feedback: 'The default is the opposite: read-only. Write permissions must be explicitly added.' },
                ]
              },
              {
                id: 'cc-l3-s4-q6',
                question: 'Why does the course recommend using absolute paths for hook scripts?',
                codeBlock: null,
                options: [
                  { label: 'To mitigate path interception and binary planting attacks', correct: true, feedback: 'Correct. Relative paths could be exploited by malicious code placing a fake script at the relative location. Absolute paths prevent this security risk.' },
                  { label: 'Because relative paths don\'t work in hooks', correct: false, feedback: 'Relative paths technically work, but absolute paths are recommended for security — preventing path interception attacks.' },
                  { label: 'For better performance', correct: false, feedback: 'The reason is security (preventing binary planting), not performance.' },
                  { label: 'Because hooks run in a different directory', correct: false, feedback: 'The security concern is about path interception and binary planting attacks, not working directory issues.' },
                ]
              },
            ]
          },
        ]
      },
      {
        id: 'cc-l15',
        title: 'The Agent Loop',
        slug: 'claude-code/agent-loop',
        cardSets: [
          {
            id: 'cc-l15-s1',
            title: 'Set 1 — The Core Loop',
            cards: [
              {
                id: 'cc-l15-s1-q1',
                question: 'What is the fundamental pattern behind every AI coding agent (Claude Code, GitHub Copilot, pi, etc.)?',
                codeBlock: null,
                options: [
                  { label: 'A continuous loop: receive input → call LLM → parse tool calls → execute tools → feed results back → repeat', correct: true, feedback: 'Correct. The agent loop is the core pattern: the LLM generates tool calls, the runtime executes them, results feed back as context, and the loop continues until no more tool calls are needed.' },
                  { label: 'A single request-response cycle where the LLM generates all code at once', correct: false, feedback: 'AI agents iterate. They make tool calls, observe results, and decide next steps — not a single shot.' },
                  { label: 'A pipeline that preprocesses code before sending it to the LLM', correct: false, feedback: 'The agent loop is iterative, not a one-way pipeline. The LLM drives the loop by requesting tool calls.' },
                  { label: 'A queue system where tasks are processed in batch', correct: false, feedback: 'Agent loops process turns interactively, not in batch. Each LLM response can trigger new tool calls that feed back immediately.' },
                ]
              },
              {
                id: 'cc-l15-s1-q2',
                question: 'In the agent loop, what determines whether the loop continues or terminates?',
                codeBlock: null,
                options: [
                  { label: 'Whether the LLM response contains tool calls — if yes, execute and loop; if no, exit with the final text', correct: true, feedback: 'Correct. The loop\'s termination condition is simple: if the assistant response includes tool calls, execute them and continue. If it\'s just text (no tool calls), the task is done.' },
                  { label: 'A fixed number of iterations set in configuration', correct: false, feedback: 'While some agents have max-turn limits as safety guards, the primary mechanism is the LLM deciding not to make more tool calls.' },
                  { label: 'The user manually pressing a "stop" button', correct: false, feedback: 'Users can cancel, but normal termination happens when the LLM produces a response with no tool calls — it decides the task is complete.' },
                  { label: 'A timer that expires after a set duration', correct: false, feedback: 'There\'s no timer-based termination. The loop ends when the LLM stops requesting tool calls.' },
                ]
              },
              {
                id: 'cc-l15-s1-q3',
                question: 'Why do agent loops maintain the full conversation history (messages array) across turns?',
                codeBlock: 'messages = [\n  { role: "user", content: "Fix the login bug" },\n  { role: "assistant", tool_calls: [{ name: "Read", args: { path: "auth.js" } }] },\n  { role: "tool", content: "// auth.js contents..." },\n  { role: "assistant", tool_calls: [{ name: "Edit", args: { ... } }] },\n  { role: "tool", content: "File edited successfully" },\n  { role: "assistant", content: "Fixed the bug by..." }\n]',
                options: [
                  { label: 'So the LLM can see what it already tried, what worked, and what the current state is — enabling multi-step reasoning', correct: true, feedback: 'Correct. The conversation history IS the agent\'s memory. Each tool result becomes context for the next decision. Without it, the LLM would repeat the same actions or lose track of progress.' },
                  { label: 'To create an audit log for debugging', correct: false, feedback: 'While useful for debugging, the primary purpose is giving the LLM context for its next decision. The history is the agent\'s working memory.' },
                  { label: 'For billing and token counting purposes', correct: false, feedback: 'Token counting is a side concern. The history exists so the LLM understands what has happened and can make informed next steps.' },
                  { label: 'To replay the conversation if the agent crashes', correct: false, feedback: 'Crash recovery is a bonus. The history\'s core purpose is providing the LLM with accumulated context for multi-step reasoning.' },
                ]
              },
              {
                id: 'cc-l15-s1-q4',
                question: 'The pi framework uses two parallel message formats: AgentMessage (app-specific) and Message (LLM-compatible). When does the conversion happen?',
                codeBlock: 'AgentMessage[] (app-specific, flexible)\n    ↓\ntransformContext()  // optional pruning\n    ↓\nconvertToLlm()      // required conversion\n    ↓\nMessage[] (LLM-compatible: user, assistant, toolResult)\n    ↓\nLLM Provider API',
                options: [
                  { label: 'Only at the LLM call boundary — the app works with AgentMessages everywhere else', correct: true, feedback: 'Correct. This is a key design principle: keep rich app-specific messages throughout, and only convert to the LLM\'s simpler format right before the API call. This allows the app to track metadata the LLM doesn\'t need.' },
                  { label: 'Immediately when any message is created', correct: false, feedback: 'Converting immediately would lose app-specific metadata. The conversion is deferred to the LLM call boundary.' },
                  { label: 'After each tool execution', correct: false, feedback: 'Tool results are stored as AgentMessages. Conversion to LLM format only happens when calling the model.' },
                  { label: 'When messages are saved to disk for session persistence', correct: false, feedback: 'Session persistence saves AgentMessages (the rich format). LLM Messages are ephemeral — created fresh for each API call.' },
                ]
              },
              {
                id: 'cc-l15-s1-q5',
                question: 'What is the role of the system prompt in the agent loop?',
                codeBlock: null,
                options: [
                  { label: 'It defines the agent\'s identity, available tools, coding conventions, and behavioral rules — sent with every LLM call', correct: true, feedback: 'Correct. The system prompt is the agent\'s "constitution." Claude Code loads CLAUDE.md, tool definitions, and safety rules into it. It shapes every decision the LLM makes throughout the session.' },
                  { label: 'It\'s only used for the first message, then discarded', correct: false, feedback: 'The system prompt persists across ALL turns. It\'s sent with every LLM API call to maintain consistent behavior.' },
                  { label: 'It contains the user\'s original task description', correct: false, feedback: 'The user\'s task goes in user messages. The system prompt contains the agent\'s identity, tools, and rules.' },
                  { label: 'It\'s an optional optimization for faster responses', correct: false, feedback: 'The system prompt is fundamental, not optional. Without it, the agent wouldn\'t know what tools it has or how to behave.' },
                ]
              },
            ]
          },
          {
            id: 'cc-l15-s2',
            title: 'Set 2 — Tool Execution Pipeline',
            cards: [
              {
                id: 'cc-l15-s2-q1',
                question: 'When the LLM returns multiple tool calls in a single response, what are the two execution strategies?',
                codeBlock: null,
                options: [
                  { label: 'Sequential (one at a time, order preserved) and Parallel (all at once via Promise.all, faster for independent ops)', correct: true, feedback: 'Correct. Sequential mode is safe for dependent operations (e.g., read then edit). Parallel mode is faster when tools are independent (e.g., reading three different files). Claude Code uses parallel by default.' },
                  { label: 'Synchronous and asynchronous', correct: false, feedback: 'Both modes are async. The distinction is whether tools run one-after-another (sequential) or concurrently (parallel).' },
                  { label: 'Local and remote', correct: false, feedback: 'Local vs remote describes WHERE tools run, not HOW they\'re orchestrated. The key distinction is sequential vs parallel execution order.' },
                  { label: 'Validated and unvalidated', correct: false, feedback: 'Validation (checking args against schema) happens before execution in both modes. The distinction is execution order.' },
                ]
              },
              {
                id: 'cc-l15-s2-q2',
                question: 'What happens during the "prepare" phase before a tool actually executes?',
                codeBlock: 'prepareToolCall()\n  → Validate arguments against JSON schema\n  → Check tool exists in registry\n  → Fire tool_execution_start event\n  → Run beforeToolCall hook (can block)\n  → If blocked: return error, skip execution\n  → If allowed: proceed to execute',
                options: [
                  { label: 'Arguments are validated against the tool\'s JSON schema, the tool is looked up, and a beforeToolCall hook can block execution', correct: true, feedback: 'Correct. The prepare phase is a preflight check: schema validation catches bad args, registry lookup ensures the tool exists, and the beforeToolCall hook lets the app block dangerous operations (like requiring user confirmation for destructive commands).' },
                  { label: 'The tool\'s source code is compiled and loaded', correct: false, feedback: 'Tools are already loaded at agent startup. The prepare phase validates arguments and runs permission checks.' },
                  { label: 'The LLM is asked to confirm the tool call', correct: false, feedback: 'The LLM initiated the tool call. The prepare phase validates it programmatically — no second LLM call needed.' },
                  { label: 'Previous tool results are cleared from memory', correct: false, feedback: 'Previous results stay in the conversation history. The prepare phase validates the incoming tool call, not cleaning up old ones.' },
                ]
              },
              {
                id: 'cc-l15-s2-q3',
                question: 'How are tools defined in the agent framework? What does a tool definition include?',
                codeBlock: 'interface AgentTool<T> {\n  name: string;          // "Read", "Edit", "Bash"\n  description: string;   // What the tool does\n  parameters: JSONSchema; // Argument schema\n  execute(\n    toolCallId: string,\n    args: T,\n    signal?: AbortSignal\n  ): Promise<AgentToolResult>;\n}',
                options: [
                  { label: 'A name, description (for the LLM), a JSON schema for arguments, and an async execute function that returns content', correct: true, feedback: 'Correct. The name and description help the LLM choose the right tool. The JSON schema validates arguments before execution. The execute function does the actual work and returns text/image content that feeds back into the conversation.' },
                  { label: 'Just a function name and callback', correct: false, feedback: 'Tools need more than that. The JSON schema ensures the LLM provides valid arguments, and the description helps it choose the right tool.' },
                  { label: 'A REST API endpoint configuration', correct: false, feedback: 'Tools are local functions with structured interfaces, not REST endpoints. They execute in the agent\'s process.' },
                  { label: 'A natural language instruction the LLM interprets', correct: false, feedback: 'Tool definitions are structured (schema + code), not natural language. The description IS natural language, but execution is programmatic.' },
                ]
              },
              {
                id: 'cc-l15-s2-q4',
                question: 'What is the purpose of the afterToolCall hook in the execution pipeline?',
                codeBlock: null,
                options: [
                  { label: 'It can transform, filter, or augment the tool\'s result before it goes back into the conversation history', correct: true, feedback: 'Correct. The afterToolCall hook is a post-processing step. You might truncate large outputs, redact sensitive data, add metadata, or convert formats — all before the result becomes part of the LLM\'s context.' },
                  { label: 'It runs cleanup code like closing file handles', correct: false, feedback: 'Resource cleanup is the tool\'s own responsibility. The afterToolCall hook transforms the result content.' },
                  { label: 'It sends a notification to the user', correct: false, feedback: 'UI notifications are handled by the event system. The afterToolCall hook specifically transforms the tool result.' },
                  { label: 'It caches the result for future identical calls', correct: false, feedback: 'Caching could be implemented here, but the hook\'s primary purpose is transforming the result before it enters the conversation history.' },
                ]
              },
              {
                id: 'cc-l15-s2-q5',
                question: 'Why does the pi framework emit events like tool_execution_start and tool_execution_end throughout the loop?',
                codeBlock: null,
                options: [
                  { label: 'To enable real-time UI updates, logging, and monitoring without coupling the core loop to any specific UI framework', correct: true, feedback: 'Correct. Event-driven architecture decouples the agent loop from the presentation layer. A terminal UI, web UI, or logging system can all subscribe to the same events independently — the core loop doesn\'t need to know about any of them.' },
                  { label: 'To synchronize multiple agents running in parallel', correct: false, feedback: 'Events are for observability (UI/logging), not inter-agent coordination.' },
                  { label: 'To persist state to disk after each operation', correct: false, feedback: 'Persistence is a separate concern. Events enable real-time observability.' },
                  { label: 'To rate-limit API calls', correct: false, feedback: 'Rate limiting is handled at the provider level, not through the event system.' },
                ]
              },
            ]
          },
          {
            id: 'cc-l15-s3',
            title: 'Set 3 — Context Management',
            cards: [
              {
                id: 'cc-l15-s3-q1',
                question: 'As a coding session grows long, what problem does context management solve?',
                codeBlock: null,
                options: [
                  { label: 'The conversation history eventually exceeds the LLM\'s context window, so older messages must be compacted or pruned to fit', correct: true, feedback: 'Correct. Every LLM has a context window limit. A long coding session with many file reads and tool results can blow past it. Context compaction summarizes older turns while preserving recent context — like a sliding window of memory.' },
                  { label: 'It prevents the agent from accessing sensitive files', correct: false, feedback: 'File access control is a permission system concern. Context management deals with fitting conversation history into the LLM\'s token limit.' },
                  { label: 'It speeds up the LLM response time', correct: false, feedback: 'While shorter context CAN mean faster responses, the primary motivation is fitting within the context window limit to avoid errors.' },
                  { label: 'It organizes code by programming language', correct: false, feedback: 'Context management is about conversation history size, not code organization.' },
                ]
              },
              {
                id: 'cc-l15-s3-q2',
                question: 'What does the transformContext function do in the agent loop pipeline?',
                codeBlock: 'transformContext: async (messages, signal) => {\n  // Prune old messages beyond a threshold\n  // Inject external context (CLAUDE.md, etc.)\n  // Summarize early conversation turns\n  // Filter out irrelevant tool results\n  return modifiedMessages;\n}',
                options: [
                  { label: 'It\'s an optional middleware that can prune, inject, summarize, or filter messages before they\'re sent to the LLM', correct: true, feedback: 'Correct. transformContext is a powerful hook that runs before each LLM call. It can compress history, inject fresh context (like re-reading CLAUDE.md), drop irrelevant tool results, or implement custom compaction strategies.' },
                  { label: 'It translates messages between programming languages', correct: false, feedback: 'It transforms the conversation context (prune/inject/summarize), not programming language translation.' },
                  { label: 'It encrypts messages before sending to the API', correct: false, feedback: 'Encryption is handled at the transport layer. transformContext manipulates the conversation history content.' },
                  { label: 'It formats code blocks for syntax highlighting', correct: false, feedback: 'Syntax highlighting is a UI concern. transformContext manages what the LLM sees in its context window.' },
                ]
              },
              {
                id: 'cc-l15-s3-q3',
                question: 'What are "steering messages" in the agent loop?',
                codeBlock: null,
                options: [
                  { label: 'User messages injected mid-execution that redirect the agent — like saying "Stop! Do this instead" while tools are running', correct: true, feedback: 'Correct. Steering messages let users interrupt and redirect. If the agent is mid-way through a wrong approach, you can steer it without waiting for the full loop to complete. The loop checks for steering messages after each tool execution.' },
                  { label: 'System-generated error messages', correct: false, feedback: 'Error messages come from tool execution failures. Steering messages are user-initiated redirections.' },
                  { label: 'Navigation commands for the UI', correct: false, feedback: 'Steering messages redirect the LLM\'s behavior, not the UI navigation.' },
                  { label: 'Logs sent to an external monitoring service', correct: false, feedback: 'Monitoring uses the event system. Steering messages are user interruptions that change the agent\'s direction.' },
                ]
              },
              {
                id: 'cc-l15-s3-q4',
                question: 'How does automatic session compaction work in coding agents like pi?',
                codeBlock: null,
                options: [
                  { label: 'When the conversation gets too long, older turns are summarized into a condensed message while recent turns are preserved in full', correct: true, feedback: 'Correct. Compaction creates a summary of early conversation history (what was discussed, what files were changed, what decisions were made) and replaces those verbose turns with the compact summary. Recent turns stay full-fidelity.' },
                  { label: 'All messages are deleted and the agent starts fresh', correct: false, feedback: 'That would lose all context. Compaction preserves the essence of the conversation through summarization.' },
                  { label: 'Messages are compressed with gzip before sending to the LLM', correct: false, feedback: 'LLMs don\'t accept compressed binary data. Compaction is semantic compression — summarizing meaning, not bytes.' },
                  { label: 'The session is split across multiple LLM calls', correct: false, feedback: 'Each LLM call needs the full relevant context. Compaction reduces history to fit in a single call.' },
                ]
              },
            ]
          },
          {
            id: 'cc-l15-s4',
            title: 'Set 4 — Anatomy of a Coding Agent',
            cards: [
              {
                id: 'cc-l15-s4-q1',
                question: 'The pi coding agent ships with 4 core tools. What are they and why this minimal set?',
                codeBlock: null,
                options: [
                  { label: 'Read, Write, Edit, and Bash — the minimum needed to read code, create files, modify files, and run commands', correct: true, feedback: 'Correct. These four tools cover the fundamental coding operations. Read observes, Write creates, Edit modifies, and Bash runs everything else (git, npm, tests). Additional tools like Grep and Find can be added, but these four are sufficient for most coding tasks.' },
                  { label: 'Git, NPM, Docker, and Deploy', correct: false, feedback: 'Those are specific commands, not tools. Git/NPM/Docker run through the Bash tool. The four core tools are Read, Write, Edit, Bash.' },
                  { label: 'Search, Replace, Compile, Test', correct: false, feedback: 'Search/Replace are subsets of Read/Edit. Compile/Test run through Bash. The four core tools are Read, Write, Edit, Bash.' },
                  { label: 'Chat, Code, Review, Commit', correct: false, feedback: 'Those describe workflows, not tools. The four core tools are primitive operations: Read, Write, Edit, Bash.' },
                ]
              },
              {
                id: 'cc-l15-s4-q2',
                question: 'What is the extension system in pi, and how does it differ from skills?',
                codeBlock: 'export default function myExtension(pi) {\n  pi.registerTool({ name: "deploy", ... });\n  pi.registerCommand("stats", { ... });\n  pi.on("tool_call", async (event) => { ... });\n}',
                options: [
                  { label: 'Extensions are TypeScript modules that register new tools, commands, and event handlers; skills are Markdown files that add domain knowledge to the system prompt', correct: true, feedback: 'Correct. Extensions add capabilities (code that runs), while skills add knowledge (context the LLM reads). An extension might add a "deploy" tool; a skill might describe your team\'s deployment conventions.' },
                  { label: 'They are the same thing with different names', correct: false, feedback: 'Extensions add executable functionality (new tools, commands). Skills add knowledge through Markdown files that augment the system prompt.' },
                  { label: 'Extensions are for the UI, skills are for the LLM', correct: false, feedback: 'Extensions can affect both UI and LLM (they register tools the LLM uses). Skills specifically augment the LLM\'s context with domain knowledge.' },
                  { label: 'Skills are more powerful than extensions', correct: false, feedback: 'Extensions are more powerful — they can register tools, commands, and event handlers. Skills are simpler: Markdown files that add context.' },
                ]
              },
              {
                id: 'cc-l15-s4-q3',
                question: 'How does pi\'s Edit tool handle the case where the text to replace appears multiple times in a file?',
                codeBlock: null,
                options: [
                  { label: 'It fails and asks for a more unique match — the old text must appear exactly once to prevent ambiguous edits', correct: true, feedback: 'Correct. This is a safety feature shared with Claude Code\'s Edit tool. If the match isn\'t unique, the edit is rejected. You must provide more surrounding context to make the match unambiguous.' },
                  { label: 'It replaces all occurrences', correct: false, feedback: 'Replacing all occurrences would be dangerous — you might change code you didn\'t intend to. The tool requires a unique match.' },
                  { label: 'It replaces only the first occurrence', correct: false, feedback: 'Silently picking the first match could edit the wrong location. Requiring uniqueness ensures the right spot is edited.' },
                  { label: 'It asks the LLM to choose which occurrence', correct: false, feedback: 'The tool doesn\'t do a second LLM call. It fails fast, and the LLM can retry with a more specific match string.' },
                ]
              },
              {
                id: 'cc-l15-s4-q4',
                question: 'Both Claude Code and pi support multiple LLM providers. What abstraction makes this possible?',
                codeBlock: null,
                options: [
                  { label: 'A unified LLM API layer that normalizes streaming, tool calls, and message formats across providers (Anthropic, OpenAI, Google, etc.)', correct: true, feedback: 'Correct. Pi\'s @mariozechner/pi-ai package and Claude Code\'s internal model layer both abstract away provider differences. Tool call formats, streaming events, and message schemas vary between providers — the abstraction normalizes them into a consistent interface.' },
                  { label: 'Each provider has its own completely separate agent loop', correct: false, feedback: 'The agent loop is provider-agnostic. The LLM abstraction layer handles provider differences so the loop doesn\'t need to change.' },
                  { label: 'They only support one provider each', correct: false, feedback: 'Both support multiple providers. Pi explicitly supports 18+ providers through its pi-ai abstraction layer.' },
                  { label: 'The tools translate between provider formats', correct: false, feedback: 'Tools don\'t know about providers. The abstraction layer sits between the agent loop and the LLM API, handling format translation.' },
                ]
              },
              {
                id: 'cc-l15-s4-q5',
                question: 'What design philosophy does pi follow that differs from Claude Code\'s approach?',
                codeBlock: null,
                options: [
                  { label: '"Minimal core, maximum extensibility" — deliberately omitting features like MCP and sub-agents, expecting users to add them via extensions', correct: true, feedback: 'Correct. Pi ships lean (4 core tools) and expects customization through extensions. Claude Code ships feature-rich (7 tools, MCP, subagents, skills, hooks built-in). Both are valid philosophies — pi prioritizes flexibility, Claude Code prioritizes out-of-box completeness.' },
                  { label: 'Pi is more feature-rich than Claude Code', correct: false, feedback: 'It\'s the opposite. Pi is deliberately minimal; Claude Code is feature-rich out of the box.' },
                  { label: 'Pi only works with one LLM provider', correct: false, feedback: 'Pi supports 18+ providers through its pi-ai abstraction layer — more than Claude Code.' },
                  { label: 'Pi doesn\'t use the agent loop pattern', correct: false, feedback: 'Pi is built entirely around the agent loop pattern — its pi-agent-core package IS the loop implementation.' },
                ]
              },
            ]
          },
        ]
      },
    ]
  },
  {
    id: 'mcp',
    title: 'MCP Fundamentals',
    color: '#8b5cf6',
    lessons: [
      {
        id: 'mcp-l4',
        title: 'MCP Architecture & Building Servers',
        slug: 'mcp/architecture',
        cardSets: [
          {
            id: 'mcp-l4-s1',
            title: 'Set 1 — MCP Fundamentals',
            cards: [
              {
                id: 'mcp-l4-s1-q1',
                question: 'What problem does MCP (Model Context Protocol) solve?',
                codeBlock: null,
                options: [
                  { label: 'It shifts the burden of defining and executing tools from your server to dedicated MCP servers', correct: true, feedback: 'Correct. Without MCP, you\'d write, test, and maintain all tool schemas and functions yourself. MCP servers handle that for you.' },
                  { label: 'It replaces the need for language models', correct: false, feedback: 'MCP works WITH language models, not instead of them. It provides tools that models can use.' },
                  { label: 'It makes APIs faster', correct: false, feedback: 'MCP isn\'t about performance — it\'s about shifting the burden of tool implementation to specialized servers.' },
                  { label: 'It encrypts communication between Claude and APIs', correct: false, feedback: 'MCP is about tool distribution, not encryption.' },
                ]
              },
              {
                id: 'mcp-l4-s1-q2',
                question: 'How is MCP different from just calling APIs directly?',
                codeBlock: null,
                options: [
                  { label: 'MCP provides tool schemas and functions already defined — you don\'t have to author them yourself', correct: true, feedback: 'Correct. If you call APIs directly, you author all tool definitions yourself. MCP servers come with tools pre-built.' },
                  { label: 'MCP is faster than direct API calls', correct: false, feedback: 'Speed isn\'t the distinction. The key difference is who implements the tools.' },
                  { label: 'MCP replaces HTTP entirely', correct: false, feedback: 'MCP can use HTTP as a transport. It\'s not a replacement for it.' },
                  { label: 'There\'s no difference — MCP IS just tool use', correct: false, feedback: 'Common misconception. MCP and tool use are complementary but different — MCP is about WHO implements the tools, not the mechanism of calling them.' },
                ]
              },
              {
                id: 'mcp-l4-s1-q3',
                question: 'Who can author MCP servers?',
                codeBlock: null,
                options: [
                  { label: 'Anyone — though service providers often create official implementations', correct: true, feedback: 'Correct. Anyone can build an MCP server. AWS, GitHub, etc. often release official ones for their services.' },
                  { label: 'Only Anthropic', correct: false, feedback: 'MCP is an open protocol. Anyone can build servers.' },
                  { label: 'Only the service provider (e.g., only GitHub can make a GitHub MCP server)', correct: false, feedback: 'Anyone can create an MCP server for any service, though official ones from providers are common.' },
                  { label: 'Only certified developers', correct: false, feedback: 'There\'s no certification required. MCP is open to all.' },
                ]
              },
              {
                id: 'mcp-l4-s1-q4',
                question: 'What does "transport agnostic" mean in the context of MCP?',
                codeBlock: null,
                options: [
                  { label: 'The client and server can communicate over different protocols — stdio, HTTP, WebSockets, etc.', correct: true, feedback: 'Correct. The most common setup runs both on the same machine via stdin/stdout, but HTTP, WebSockets, and other protocols also work.' },
                  { label: 'MCP doesn\'t use any transport protocol', correct: false, feedback: 'MCP does use protocols — the point is it supports MULTIPLE protocols.' },
                  { label: 'MCP only works over HTTP', correct: false, feedback: 'HTTP is just one option. stdio (standard input/output) is actually the most common for local setups.' },
                  { label: 'The data format can be XML, JSON, or binary', correct: false, feedback: 'Transport agnostic refers to the communication channel (stdio, HTTP, etc.), not the data format.' },
                ]
              },
              {
                id: 'mcp-l4-s1-q5',
                question: 'In a typical MCP project, do you implement both a client AND a server?',
                codeBlock: null,
                options: [
                  { label: 'No — typically you implement either a client OR a server, not both', correct: true, feedback: 'Correct. You\'d build an MCP server to expose your service\'s functionality, OR build a client that connects to existing MCP servers built by others.' },
                  { label: 'Yes — you always need both', correct: false, feedback: 'In real projects, you usually build one side. You build a server if you\'re exposing a service, or a client if you\'re consuming tools from existing servers.' },
                  { label: 'You only ever build servers', correct: false, feedback: 'You might build a client that connects to servers built by others.' },
                  { label: 'You only ever build clients', correct: false, feedback: 'You might build a server to expose your service\'s tools to others.' },
                ]
              },
            ]
          },
          {
            id: 'mcp-l4-s2',
            title: 'Set 2 — Client-Server Communication',
            cards: [
              {
                id: 'mcp-l4-s2-q1',
                question: 'What are the two key message types an MCP client exchanges with a server?',
                codeBlock: null,
                options: [
                  { label: '`ListToolsRequest/Result` (discover tools) and `CallToolRequest/Result` (execute tools)', correct: true, feedback: 'Correct. ListTools discovers what tools are available. CallTool executes a specific tool with given arguments.' },
                  { label: 'GET and POST requests', correct: false, feedback: 'MCP uses its own message types, not HTTP methods. The key ones are ListTools and CallTool.' },
                  { label: 'Connect and Disconnect messages', correct: false, feedback: 'Those relate to transport setup. The key operational messages are ListTools and CallTool.' },
                  { label: 'Query and Response messages', correct: false, feedback: 'The specific MCP message types are ListToolsRequest/Result and CallToolRequest/Result.' },
                ]
              },
              {
                id: 'mcp-l4-s2-q2',
                question: 'In the full MCP flow, what happens FIRST after a user submits a query?',
                codeBlock: null,
                options: [
                  { label: 'Your server asks the MCP client for a list of available tools to send to Claude', correct: true, feedback: 'Correct. Before sending the user\'s query to Claude, your server needs to know what tools are available, so it asks the MCP client to list them.' },
                  { label: 'Claude processes the query immediately', correct: false, feedback: 'Claude needs to receive the query along with available tools. Your server must gather the tool list first.' },
                  { label: 'The MCP server starts executing tools', correct: false, feedback: 'No tools are executed yet. First, your server needs to discover what tools exist.' },
                  { label: 'The user\'s query goes directly to the MCP server', correct: false, feedback: 'The query goes to your server first, which needs to gather tools before sending everything to Claude.' },
                ]
              },
              {
                id: 'mcp-l4-s2-q3',
                question: 'When Claude decides it needs to call a tool, who actually executes the tool?',
                codeBlock: null,
                options: [
                  { label: 'The MCP server — your server asks the MCP client, which forwards a CallToolRequest to the MCP server', correct: true, feedback: 'Correct. Claude says "I want to call this tool." Your server sends that to the MCP client, which sends a CallToolRequest to the MCP server, which executes it.' },
                  { label: 'Claude executes it directly', correct: false, feedback: 'Claude only decides WHICH tool to call. The actual execution happens on the MCP server.' },
                  { label: 'Your server executes the tool locally', correct: false, feedback: 'With MCP, tool execution is delegated to the MCP server, not your server.' },
                  { label: 'The MCP client executes it', correct: false, feedback: 'The MCP client forwards the request to the MCP server. The server does the actual execution.' },
                ]
              },
              {
                id: 'mcp-l4-s2-q4',
                question: 'What is the MCP client\'s primary role?',
                codeBlock: null,
                options: [
                  { label: 'A communication bridge between your application and MCP servers — it handles message exchange and protocol details', correct: true, feedback: 'Correct. The client is your access point to all tools in an MCP server, abstracting away communication complexity.' },
                  { label: 'It runs the language model', correct: false, feedback: 'The language model (Claude) is separate. The MCP client bridges your app and MCP servers.' },
                  { label: 'It stores tool definitions', correct: false, feedback: 'Tool definitions live on the MCP server. The client retrieves them on demand.' },
                  { label: 'It renders the user interface', correct: false, feedback: 'UI is your app\'s responsibility. The client handles MCP server communication.' },
                ]
              },
              {
                id: 'mcp-l4-s2-q5',
                question: 'Why does the MCP client typically need to be wrapped in a custom class?',
                codeBlock: null,
                options: [
                  { label: 'The underlying client session requires proper resource cleanup when the connection closes', correct: true, feedback: 'Correct. The session (actual connection to the server) needs cleanup when done. A wrapper class handles this automatically.' },
                  { label: 'The SDK doesn\'t provide a client at all', correct: false, feedback: 'The SDK provides a ClientSession. The wrapper class manages its lifecycle (cleanup, resource management).' },
                  { label: 'For security reasons', correct: false, feedback: 'The wrapper is about resource management (cleanup), not security.' },
                  { label: 'To add caching', correct: false, feedback: 'The primary reason is resource cleanup, not caching.' },
                ]
              },
            ]
          },
          {
            id: 'mcp-l4-s3',
            title: 'Set 3 — Building Servers with Python SDK',
            cards: [
              {
                id: 'mcp-l4-s3-q1',
                question: 'How do you initialize an MCP server using the Python SDK?',
                codeBlock: 'from mcp.server.fastmcp import FastMCP\n\nmcp = FastMCP("DocumentMCP", log_level="ERROR")',
                options: [
                  { label: 'Import `FastMCP` from the SDK and create an instance with a name', correct: true, feedback: 'Correct. One line creates the server. You then define tools, resources, and prompts using decorators on this instance.' },
                  { label: 'Write a JSON configuration file', correct: false, feedback: 'The Python SDK uses code, not configuration files. Import FastMCP and create an instance.' },
                  { label: 'Subclass a base server class', correct: false, feedback: 'No subclassing needed. Just create a FastMCP instance and use decorators.' },
                  { label: 'Run a CLI generator command', correct: false, feedback: 'No generator needed. Import FastMCP and create an instance in Python.' },
                ]
              },
              {
                id: 'mcp-l4-s3-q2',
                question: 'How do you define a tool in the MCP Python SDK?',
                codeBlock: '@mcp.tool(\n  name="read_doc_contents",\n  description="Read a document."\n)\ndef read_document(\n  doc_id: str = Field(description="Document ID")\n):\n  return docs[doc_id]',
                options: [
                  { label: 'Use the `@mcp.tool` decorator with name/description, and `Field` for parameter descriptions', correct: true, feedback: 'Correct. The decorator defines the tool, Python type hints provide types, and Field from Pydantic adds parameter descriptions. The SDK auto-generates the JSON schema.' },
                  { label: 'Write a JSON schema file for each tool', correct: false, feedback: 'The SDK generates JSON schemas automatically from your decorators and type hints. No manual schema writing needed.' },
                  { label: 'Register tools in a configuration dictionary', correct: false, feedback: 'Tools are defined with decorators, not configuration. The `@mcp.tool` decorator handles registration.' },
                  { label: 'Inherit from a Tool base class', correct: false, feedback: 'No class inheritance needed. Just use the `@mcp.tool` decorator on a plain function.' },
                ]
              },
              {
                id: 'mcp-l4-s3-q3',
                question: 'Where does the `Field` class come from, and what does it do in tool definitions?',
                codeBlock: 'from pydantic import Field',
                options: [
                  { label: 'From Pydantic — it provides parameter descriptions that help Claude understand each argument', correct: true, feedback: 'Correct. Field adds descriptions to function parameters, which the SDK includes in the generated tool schema for Claude to read.' },
                  { label: 'From the MCP SDK — it defines required fields', correct: false, feedback: 'Field comes from Pydantic (imported as `from pydantic import Field`), not the MCP SDK directly.' },
                  { label: 'From Python\'s standard library — it defines data types', correct: false, feedback: 'Field is from Pydantic, a third-party validation library, not Python\'s standard library.' },
                  { label: 'From FastMCP — it creates form inputs', correct: false, feedback: 'Field is from Pydantic. It provides descriptions and validation for function parameters.' },
                ]
              },
              {
                id: 'mcp-l4-s3-q4',
                question: 'What happens when a tool function raises a ValueError?',
                codeBlock: 'if doc_id not in docs:\n  raise ValueError(f"Doc with id {doc_id} not found")',
                options: [
                  { label: 'The error is returned to Claude as feedback, explaining why the tool call failed', correct: true, feedback: 'Correct. Python exceptions integrate naturally with the SDK. The error message is sent back through the MCP protocol to inform Claude.' },
                  { label: 'The MCP server crashes', correct: false, feedback: 'The SDK handles exceptions gracefully, converting them into error responses rather than crashing.' },
                  { label: 'Nothing — errors are silently ignored', correct: false, feedback: 'Errors are not ignored. They\'re returned to the caller as error messages.' },
                  { label: 'The tool is automatically removed from the server', correct: false, feedback: 'A single error doesn\'t remove the tool. The error is returned and the tool remains available.' },
                ]
              },
              {
                id: 'mcp-l4-s3-q5',
                question: 'What is the key benefit of defining tools with the Python SDK vs writing JSON schemas manually?',
                codeBlock: null,
                options: [
                  { label: 'The SDK auto-generates JSON schemas from decorators and type hints — no manual schema writing', correct: true, feedback: 'Correct. You write plain Python functions with type hints and decorators. The SDK generates proper tool schemas that Claude can understand.' },
                  { label: 'The SDK makes tools run faster', correct: false, feedback: 'The benefit is developer experience (no manual schemas), not runtime performance.' },
                  { label: 'JSON schemas are deprecated', correct: false, feedback: 'JSON schemas are still used under the hood. The SDK just generates them for you automatically.' },
                  { label: 'The SDK adds encryption to tool calls', correct: false, feedback: 'The benefit is about eliminating manual schema writing, not security.' },
                ]
              },
            ]
          },
          {
            id: 'mcp-l4-s4',
            title: 'Set 4 — Testing & Inspector',
            cards: [
              {
                id: 'mcp-l4-s4-q1',
                question: 'How do you launch the MCP Inspector to test your server?',
                codeBlock: 'mcp dev mcp_server.py',
                options: [
                  { label: 'Run `mcp dev <server_file>` — it starts a browser-based inspector', correct: true, feedback: 'Correct. This starts a development server and gives you a local URL (e.g., http://127.0.0.1:6274) to access the inspector in your browser.' },
                  { label: 'Run `pytest` on your server file', correct: false, feedback: 'The MCP Inspector is a browser-based debugger, not a test framework. Use `mcp dev`.' },
                  { label: 'Import an inspector module in your code', correct: false, feedback: 'The inspector is a standalone tool launched from the command line with `mcp dev`.' },
                  { label: 'Deploy the server first, then use a separate tool', correct: false, feedback: 'The inspector runs locally during development. No deployment needed.' },
                ]
              },
              {
                id: 'mcp-l4-s4-q2',
                question: 'What can you do in the MCP Inspector?',
                codeBlock: null,
                options: [
                  { label: 'List available tools, test them with custom inputs, and verify results — all without connecting to a real app', correct: true, feedback: 'Correct. The inspector lets you test tools, resources, and prompts interactively. State persists between calls, so you can test workflows.' },
                  { label: 'Only view tool definitions', correct: false, feedback: 'You can also EXECUTE tools, test resources, and inspect prompts — not just view definitions.' },
                  { label: 'Deploy your server to production', correct: false, feedback: 'The inspector is for development and debugging, not deployment.' },
                  { label: 'Connect to Claude directly', correct: false, feedback: 'The inspector tests your MCP server in isolation, without involving Claude.' },
                ]
              },
              {
                id: 'mcp-l4-s4-q3',
                question: 'What are the two core functions an MCP client must implement?',
                codeBlock: 'async def list_tools(self):\n  result = await self.session().list_tools()\n  return result.tools\n\nasync def call_tool(self, tool_name, tool_input):\n  return await self.session().call_tool(\n    tool_name, tool_input\n  )',
                options: [
                  { label: '`list_tools()` to discover available tools, and `call_tool()` to execute a specific tool', correct: true, feedback: 'Correct. list_tools gets the tool definitions to send to Claude. call_tool executes a tool that Claude requests.' },
                  { label: '`connect()` and `disconnect()`', correct: false, feedback: 'Connection management is handled by the session. The two KEY functions are list_tools and call_tool.' },
                  { label: '`send()` and `receive()`', correct: false, feedback: 'MCP uses higher-level abstractions: list_tools (discover) and call_tool (execute).' },
                  { label: '`query()` and `respond()`', correct: false, feedback: 'The client doesn\'t query Claude. It lists tools and calls them on behalf of your application.' },
                ]
              },
              {
                id: 'mcp-l4-s4-q4',
                question: 'How do you test your MCP client independently?',
                codeBlock: 'uv run mcp_client.py',
                options: [
                  { label: 'Run the client file directly — it includes a test harness that connects to the server and prints available tools', correct: true, feedback: 'Correct. The client file has a `__main__` block that forms a connection to the MCP server and runs basic operations like listing tools.' },
                  { label: 'You can\'t test the client independently', correct: false, feedback: 'You can run the client file directly with a test harness to verify it connects and retrieves tools.' },
                  { label: 'Use the MCP Inspector', correct: false, feedback: 'The Inspector tests the server. To test the client, run its file directly.' },
                  { label: 'Write unit tests with mocks', correct: false, feedback: 'While possible, the simplest approach is running the client directly with a test block.' },
                ]
              },
            ]
          },
        ]
      },
      {
        id: 'mcp-l5',
        title: 'Resources, Prompts & Patterns',
        slug: 'mcp/resources-prompts',
        cardSets: [
          {
            id: 'mcp-l5-s1',
            title: 'Set 1 — Resources Fundamentals',
            cards: [
              {
                id: 'mcp-l5-s1-q1',
                question: 'What are MCP resources, and how are they different from tools?',
                codeBlock: null,
                options: [
                  { label: 'Resources expose read-only data to clients — like GET endpoints in an HTTP server', correct: true, feedback: 'Correct. Resources fetch information without performing actions. They\'re app-controlled (your code decides when to read them), unlike tools which are model-controlled.' },
                  { label: 'Resources are just another name for tools', correct: false, feedback: 'Resources are distinct from tools. Resources expose data; tools perform actions. Different parts of your app control each.' },
                  { label: 'Resources replace API calls', correct: false, feedback: 'Resources provide data from MCP servers, but they serve a different purpose than general API calls.' },
                  { label: 'Resources are files stored on disk', correct: false, feedback: 'Resources are a protocol concept — they can return any data. They\'re not limited to files.' },
                ]
              },
              {
                id: 'mcp-l5-s1-q2',
                question: 'What is the difference between a direct resource and a templated resource?',
                codeBlock: '// Direct:\n@mcp.resource("docs://documents")\n\n// Templated:\n@mcp.resource("docs://documents/{doc_id}")',
                options: [
                  { label: 'Direct resources have static URIs; templated resources include parameters in their URIs', correct: true, feedback: 'Correct. Direct resources always return the same thing (e.g., list all docs). Templated resources accept parameters (e.g., fetch a specific doc by ID).' },
                  { label: 'Direct resources are faster', correct: false, feedback: 'The distinction is about parameterization, not speed. Direct = static URI, Templated = parameterized URI.' },
                  { label: 'They are interchangeable', correct: false, feedback: 'Direct resources have fixed URIs. Templated resources accept variable parameters in the URI.' },
                  { label: 'Direct resources return JSON; templated return text', correct: false, feedback: 'Both can return any data type. The difference is whether the URI accepts parameters.' },
                ]
              },
              {
                id: 'mcp-l5-s1-q3',
                question: 'What does the `mime_type` parameter do in a resource definition?',
                codeBlock: '@mcp.resource(\n  "docs://documents",\n  mime_type="application/json"\n)',
                options: [
                  { label: 'Hints to the client what kind of data is being returned so it knows how to parse it', correct: true, feedback: 'Correct. `application/json` means the client should parse it as JSON. `text/plain` means raw text. The SDK auto-serializes your return value.' },
                  { label: 'It encrypts the response', correct: false, feedback: 'MIME types are content hints, not encryption. They tell the client how to interpret the data.' },
                  { label: 'It restricts who can access the resource', correct: false, feedback: 'MIME types are about content format, not access control.' },
                  { label: 'It\'s required but has no effect', correct: false, feedback: 'It directly affects how clients parse the returned data — JSON vs plain text vs binary.' },
                ]
              },
              {
                id: 'mcp-l5-s1-q4',
                question: 'In a templated resource, how does the URI parameter get passed to the function?',
                codeBlock: '@mcp.resource("docs://documents/{doc_id}")\ndef fetch_doc(doc_id: str) -> str:\n  return docs[doc_id]',
                options: [
                  { label: 'The SDK automatically parses the URI and passes parameters as keyword arguments matching the template names', correct: true, feedback: 'Correct. `{doc_id}` in the URI becomes the `doc_id` keyword argument in the function. Names must match.' },
                  { label: 'You parse the URI manually in your function', correct: false, feedback: 'The SDK handles URI parsing automatically. Just name your function parameter to match the template.' },
                  { label: 'Parameters are passed via a separate config object', correct: false, feedback: 'Parameters come directly from the URI template. The SDK extracts them automatically.' },
                  { label: 'You access them via `request.params`', correct: false, feedback: 'There\'s no request object. The SDK passes URI parameters as function keyword arguments.' },
                ]
              },
              {
                id: 'mcp-l5-s1-q5',
                question: 'Do you need to manually serialize return values from resources to JSON?',
                codeBlock: 'def list_docs() -> list[str]:\n  return list(docs.keys())',
                options: [
                  { label: 'No — the MCP Python SDK automatically serializes return values', correct: true, feedback: 'Correct. Just return your Python data structure. The SDK handles serialization based on the mime_type.' },
                  { label: 'Yes — you must use `json.dumps()`', correct: false, feedback: 'The SDK serializes for you. Just return the Python object.' },
                  { label: 'Only for JSON responses', correct: false, feedback: 'The SDK handles all serialization automatically, regardless of MIME type.' },
                  { label: 'Only for binary data', correct: false, feedback: 'All serialization is handled by the SDK. Just return the data.' },
                ]
              },
            ]
          },
          {
            id: 'mcp-l5-s2',
            title: 'Set 2 — Prompts',
            cards: [
              {
                id: 'mcp-l5-s2-q1',
                question: 'What are MCP prompts, and why would you use them instead of letting users write their own prompts?',
                codeBlock: null,
                options: [
                  { label: 'Pre-built, well-tested instructions that give better results than what users might write on their own', correct: true, feedback: 'Correct. As the MCP server author, you can spend time crafting, testing, and evaluating prompts that work consistently, so users benefit without being prompt engineering experts.' },
                  { label: 'They replace the need for a language model', correct: false, feedback: 'Prompts are sent TO the language model. They\'re pre-crafted instructions, not a replacement for AI.' },
                  { label: 'They\'re just regular text templates', correct: false, feedback: 'MCP prompts return actual message lists (user/assistant messages) that get sent directly to Claude, not just text.' },
                  { label: 'They\'re required for all MCP servers', correct: false, feedback: 'Prompts are optional. They\'re useful when you want to provide pre-built workflows.' },
                ]
              },
              {
                id: 'mcp-l5-s2-q2',
                question: 'How do you define a prompt in the MCP Python SDK?',
                codeBlock: '@mcp.prompt(\n  name="format",\n  description="Rewrites in Markdown"\n)\ndef format_document(\n  doc_id: str = Field(...)\n) -> list[base.Message]:\n  return [base.UserMessage(prompt)]',
                options: [
                  { label: 'Use `@mcp.prompt` decorator and return a list of messages (user/assistant)', correct: true, feedback: 'Correct. The decorator defines the prompt name/description. The function returns a list of messages that get sent directly to Claude.' },
                  { label: 'Write the prompt in a YAML file', correct: false, feedback: 'Prompts are defined in code using the `@mcp.prompt` decorator, not YAML files.' },
                  { label: 'Add them to a prompts.json configuration', correct: false, feedback: 'No configuration files needed. Use the `@mcp.prompt` decorator on a function.' },
                  { label: 'Define them inside tool functions', correct: false, feedback: 'Prompts and tools are separate primitives. Prompts use their own `@mcp.prompt` decorator.' },
                ]
              },
              {
                id: 'mcp-l5-s2-q3',
                question: 'What does a prompt function return?',
                codeBlock: null,
                options: [
                  { label: 'A list of messages (user and/or assistant messages) to send directly to Claude', correct: true, feedback: 'Correct. You can include multiple user and assistant messages to create complex conversation flows. These messages are sent to Claude as-is.' },
                  { label: 'A single string', correct: false, feedback: 'Prompt functions return a list of message objects (UserMessage, AssistantMessage), not a plain string.' },
                  { label: 'A tool definition', correct: false, feedback: 'Prompts return messages, not tool definitions. They\'re separate primitives.' },
                  { label: 'An HTTP response', correct: false, feedback: 'Prompts return MCP message objects, not HTTP responses.' },
                ]
              },
              {
                id: 'mcp-l5-s2-q4',
                question: 'How do prompt arguments get passed when a client requests a prompt?',
                codeBlock: 'result = await self.session().get_prompt(\n  prompt_name, {"doc_id": "plan.md"}\n)',
                options: [
                  { label: 'As a dictionary of key-value pairs — they become keyword arguments in the prompt function', correct: true, feedback: 'Correct. The client passes `{"doc_id": "plan.md"}`, and the SDK passes `doc_id="plan.md"` to your prompt function.' },
                  { label: 'As positional arguments', correct: false, feedback: 'Arguments are passed as a dictionary, not positionally.' },
                  { label: 'They can\'t accept arguments', correct: false, feedback: 'Prompts support parameterized arguments via keyword dictionaries.' },
                  { label: 'As a JSON string in the URI', correct: false, feedback: 'That\'s resources. Prompts receive arguments as a dictionary in the get_prompt call.' },
                ]
              },
              {
                id: 'mcp-l5-s2-q5',
                question: 'What import is needed for creating prompt messages?',
                codeBlock: 'from mcp.server.fastmcp.prompts import base\n\nreturn [base.UserMessage(prompt)]',
                options: [
                  { label: '`from mcp.server.fastmcp.prompts import base` — provides `UserMessage` and other message types', correct: true, feedback: 'Correct. The `base` module provides message types like `UserMessage` and `AssistantMessage` for constructing prompt responses.' },
                  { label: '`from anthropic import Message`', correct: false, feedback: 'Prompt messages use MCP\'s own types from `mcp.server.fastmcp.prompts`, not Anthropic\'s SDK.' },
                  { label: 'No import needed — use plain strings', correct: false, feedback: 'You need to import message types from the MCP SDK to create proper prompt responses.' },
                  { label: '`from mcp import prompts`', correct: false, feedback: 'The correct import is `from mcp.server.fastmcp.prompts import base`.' },
                ]
              },
            ]
          },
          {
            id: 'mcp-l5-s3',
            title: 'Set 3 — The Three Primitives',
            cards: [
              {
                id: 'mcp-l5-s3-q1',
                question: 'Who controls MCP tools — the model, the app, or the user?',
                codeBlock: null,
                options: [
                  { label: 'Model-controlled — Claude alone decides when to call tools', correct: true, feedback: 'Correct. Tools are model-controlled. Claude autonomously decides when and which tools to use to complete tasks.' },
                  { label: 'User-controlled — the user triggers tool calls', correct: false, feedback: 'Users don\'t directly trigger tools. Claude (the model) decides when to use them.' },
                  { label: 'App-controlled — your code decides when to call tools', correct: false, feedback: 'That describes resources. Tools are controlled by the model (Claude).' },
                  { label: 'Server-controlled — the MCP server decides', correct: false, feedback: 'The MCP server executes tools, but Claude (the model) decides WHEN to call them.' },
                ]
              },
              {
                id: 'mcp-l5-s3-q2',
                question: 'Who controls MCP resources?',
                codeBlock: null,
                options: [
                  { label: 'App-controlled — your application code decides when to fetch resource data', correct: true, feedback: 'Correct. Resources are app-controlled. Your code fetches them for UI elements (autocomplete) or to augment prompts with context.' },
                  { label: 'Model-controlled — Claude fetches resources', correct: false, feedback: 'Claude controls tools, not resources. Your application code decides when to read resources.' },
                  { label: 'User-controlled — users request resources directly', correct: false, feedback: 'That describes prompts. Resources are fetched by your application code, often behind the scenes.' },
                  { label: 'They\'re automatic — always running', correct: false, feedback: 'Resources are fetched on demand by your application code, not automatically.' },
                ]
              },
              {
                id: 'mcp-l5-s3-q3',
                question: 'Who controls MCP prompts?',
                codeBlock: null,
                options: [
                  { label: 'User-controlled — users trigger prompts through UI interactions like slash commands or buttons', correct: true, feedback: 'Correct. Prompts are user-controlled. Users decide when to invoke predefined workflows via buttons, menus, or slash commands.' },
                  { label: 'Model-controlled — Claude decides when to use prompts', correct: false, feedback: 'Claude controls tools. Prompts are triggered by user actions.' },
                  { label: 'App-controlled — your code runs prompts automatically', correct: false, feedback: 'Your code controls resources. Prompts are triggered by explicit user actions.' },
                  { label: 'Server-controlled', correct: false, feedback: 'Prompts are defined on the server but triggered by user actions on the client side.' },
                ]
              },
              {
                id: 'mcp-l5-s3-q4',
                question: 'You need to give Claude the ability to query a database. Which MCP primitive should you use?',
                codeBlock: null,
                options: [
                  { label: 'Tools — they give Claude new capabilities it can use autonomously', correct: true, feedback: 'Correct. Tools are for giving Claude capabilities. Claude decides when to query the database based on the user\'s request.' },
                  { label: 'Resources — they provide data access', correct: false, feedback: 'Resources are for your app to fetch data for UI or context. For Claude to autonomously query a database, use tools.' },
                  { label: 'Prompts — they define workflows', correct: false, feedback: 'Prompts are pre-built instructions. For Claude to have database access, you need a tool.' },
                  { label: 'Any of the three would work equally well', correct: false, feedback: 'Tools are the right choice when you want to give Claude a capability it can use on its own.' },
                ]
              },
              {
                id: 'mcp-l5-s3-q5',
                question: 'You want to show a list of available documents in an autocomplete dropdown. Which primitive?',
                codeBlock: null,
                options: [
                  { label: 'Resources — they provide data for your app to use in UI elements', correct: true, feedback: 'Correct. Resources are app-controlled and perfect for fetching data to populate UI elements like autocomplete lists.' },
                  { label: 'Tools — Claude can generate the list', correct: false, feedback: 'Autocomplete is a UI concern, not a Claude concern. Resources provide data for your app to render.' },
                  { label: 'Prompts — they handle user input', correct: false, feedback: 'Prompts are pre-built instructions for Claude, not data providers for UI elements.' },
                  { label: 'None — hardcode the list', correct: false, feedback: 'Resources are designed exactly for this: exposing data from MCP servers for app use.' },
                ]
              },
            ]
          },
        ]
      },
    ]
  },
  {
    id: 'mcp-advanced',
    title: 'MCP Advanced',
    color: '#ec4899',
    lessons: [
      {
        id: 'mcp-l6',
        title: 'Sampling, Progress & Security',
        slug: 'mcp-advanced/sampling',
        cardSets: [
          {
            id: 'mcp-l6-s1',
            title: 'Set 1 — Sampling',
            cards: [
              {
                id: 'mcp-l6-s1-q1',
                question: 'What is "sampling" in MCP?',
                codeBlock: null,
                options: [
                  { label: 'An MCP server accessing a language model (like Claude) through the connected client, rather than calling the LLM directly', correct: true, feedback: 'Correct. The server sends a prompt to the client saying "Could you call Claude for me?" The client, which already has a Claude connection, makes the call and returns results.' },
                  { label: 'Taking random samples of data from a database', correct: false, feedback: 'Sampling in MCP specifically refers to the server requesting LLM access through the client.' },
                  { label: 'A testing technique for MCP servers', correct: false, feedback: 'Sampling is a production feature, not a testing technique. It lets servers use LLMs via clients.' },
                  { label: 'Collecting metrics from MCP communication', correct: false, feedback: 'Sampling is about LLM access, not metrics collection.' },
                ]
              },
              {
                id: 'mcp-l6-s1-q2',
                question: 'Why would an MCP server use sampling instead of calling Claude directly?',
                codeBlock: null,
                options: [
                  { label: 'The server needs no API keys, token costs shift to the client, and it\'s ideal for public servers', correct: true, feedback: 'Correct. With sampling, the server has no LLM integration. Each client pays for their own AI usage — critical for public servers.' },
                  { label: 'It\'s faster than direct API calls', correct: false, feedback: 'Speed isn\'t the benefit. The advantages are: no API keys on server, token costs shift to client, reduced server complexity.' },
                  { label: 'Claude requires sampling to work', correct: false, feedback: 'Claude can be called directly. Sampling is an architectural choice, not a requirement.' },
                  { label: 'Direct API calls are not supported in MCP', correct: false, feedback: 'Direct calls work fine. Sampling is preferred for public servers where you don\'t want to bear token costs.' },
                ]
              },
              {
                id: 'mcp-l6-s1-q3',
                question: 'How does sampling work on the server side?',
                codeBlock: 'result = await ctx.session.create_message(\n  messages=[SamplingMessage(\n    role="user", content=...\n  )],\n  max_tokens=500,\n  system_prompt="You are a helpful assistant"\n)',
                options: [
                  { label: 'Use `ctx.session.create_message()` inside a tool function with SamplingMessage, max_tokens, and system_prompt', correct: true, feedback: 'Correct. The context object provides the session, and create_message sends the sampling request to the connected client.' },
                  { label: 'Import the Anthropic SDK and call Claude directly', correct: false, feedback: 'That defeats the purpose of sampling. The server uses `ctx.session.create_message()` to go through the client.' },
                  { label: 'Write to stdout and hope the client picks it up', correct: false, feedback: 'Sampling uses the structured `create_message` API on the session, not raw stdout.' },
                  { label: 'Define a special sampling tool', correct: false, feedback: 'Sampling is called from within existing tool functions, not defined as a separate tool.' },
                ]
              },
              {
                id: 'mcp-l6-s1-q4',
                question: 'On the client side, how do you enable sampling support?',
                codeBlock: null,
                options: [
                  { label: 'Create a `sampling_callback` function that receives params, calls Claude, and returns a CreateMessageResult — pass it when initializing ClientSession', correct: true, feedback: 'Correct. The callback receives CreateMessageRequestParams, uses the Anthropic SDK to call Claude, and returns the result.' },
                  { label: 'Set `sampling=True` in the client config', correct: false, feedback: 'There\'s no simple flag. You must implement a sampling_callback function and pass it to the ClientSession.' },
                  { label: 'Nothing — sampling works automatically', correct: false, feedback: 'You must explicitly create a sampling callback that handles LLM calls and pass it to the session.' },
                  { label: 'Install a separate sampling package', correct: false, feedback: 'Sampling support is built into the MCP SDK. You just need to write the callback function.' },
                ]
              },
            ]
          },
          {
            id: 'mcp-l6-s2',
            title: 'Set 2 — Notifications & Progress',
            cards: [
              {
                id: 'mcp-l6-s2-q1',
                question: 'How do you send log messages and progress updates from an MCP tool?',
                codeBlock: 'await context.info("Processing file...")\nawait context.report_progress(current=5, total=10)',
                options: [
                  { label: 'Use the Context argument: `context.info()` for logs, `context.report_progress(current, total)` for progress', correct: true, feedback: 'Correct. The Context is automatically provided to tool functions. Use info() for logs and report_progress() for percentage-based updates.' },
                  { label: 'Print to stdout', correct: false, feedback: 'Stdout is used for MCP protocol messages. Use context.info() and context.report_progress() instead.' },
                  { label: 'Return progress in the tool result', correct: false, feedback: 'Progress is sent via real-time notifications during execution, not in the final result.' },
                  { label: 'Write to a shared log file', correct: false, feedback: 'MCP uses structured notifications through the context, not file-based logging.' },
                ]
              },
              {
                id: 'mcp-l6-s2-q2',
                question: 'On the client side, how do you receive logging and progress notifications?',
                codeBlock: null,
                options: [
                  { label: 'Set up callback functions: `logging_callback` on ClientSession, `progress_callback` per tool call', correct: true, feedback: 'Correct. Logging callbacks are set at session level. Progress callbacks are passed per tool call via `session.call_tool(..., progress_callback=...)`.' },
                  { label: 'Poll the server periodically', correct: false, feedback: 'Notifications are pushed to the client via callbacks, not polled.' },
                  { label: 'Read from a notification queue', correct: false, feedback: 'Callbacks are the mechanism, not queues. Logging is session-level, progress is per-call.' },
                  { label: 'They appear automatically in the tool result', correct: false, feedback: 'Notifications arrive during execution via callbacks, separate from the final result.' },
                ]
              },
              {
                id: 'mcp-l6-s2-q3',
                question: 'Are notifications required for MCP clients to implement?',
                codeBlock: null,
                options: [
                  { label: 'No — they\'re optional UX enhancements. Clients can ignore them, show certain types, or present them however they like', correct: true, feedback: 'Correct. Notifications are purely optional. CLI apps might print to terminal, web apps use WebSockets, desktop apps update progress bars.' },
                  { label: 'Yes — the MCP spec requires handling all notifications', correct: false, feedback: 'Notifications are optional. Clients choose which (if any) to display.' },
                  { label: 'Only progress notifications are required', correct: false, feedback: 'Neither logging nor progress notifications are required.' },
                  { label: 'Yes — tools fail if notifications aren\'t handled', correct: false, feedback: 'Tools work fine without notification handling. Notifications are for UX, not functionality.' },
                ]
              },
            ]
          },
          {
            id: 'mcp-l6-s3',
            title: 'Set 3 — Roots & Security',
            cards: [
              {
                id: 'mcp-l6-s3-q1',
                question: 'What are "roots" in MCP?',
                codeBlock: null,
                options: [
                  { label: 'A permission system that tells MCP servers which specific files and folders on your machine they can access', correct: true, feedback: 'Correct. Roots grant targeted filesystem access. If only Desktop is a root, the server cannot access Documents or Downloads.' },
                  { label: 'The root directory of your project', correct: false, feedback: 'Roots are a permission concept — a set of allowed directories — not necessarily the project root.' },
                  { label: 'Administrative accounts for MCP servers', correct: false, feedback: 'Roots are filesystem permission boundaries, not user accounts.' },
                  { label: 'The base URL for MCP communication', correct: false, feedback: 'Roots are about file system access, not URLs.' },
                ]
              },
              {
                id: 'mcp-l6-s3-q2',
                question: 'What problem do roots solve?',
                codeBlock: null,
                options: [
                  { label: 'Without roots, when a user says "convert biking.mp4" Claude has no way to know where the file lives — roots give context to find files without full paths', correct: true, feedback: 'Correct. Roots let Claude call list_roots → read_dir → find the file. They also limit access for security.' },
                  { label: 'They speed up file access', correct: false, feedback: 'The benefits are discoverability (find files without full paths) and security (limit access), not speed.' },
                  { label: 'They replace the file system', correct: false, feedback: 'Roots work WITH the filesystem, providing targeted access boundaries.' },
                  { label: 'They compress files for transfer', correct: false, feedback: 'Roots are about access permissions and file discovery, not compression.' },
                ]
              },
              {
                id: 'mcp-l6-s3-q3',
                question: 'Does the MCP SDK automatically enforce root restrictions?',
                codeBlock: null,
                options: [
                  { label: 'No — you must implement enforcement yourself (e.g., an `is_path_allowed()` helper that checks paths against approved roots)', correct: true, feedback: 'Correct. The SDK provides the roots mechanism, but checking if a requested path falls within approved roots is YOUR responsibility.' },
                  { label: 'Yes — all paths outside roots are automatically blocked', correct: false, feedback: 'The SDK does NOT enforce restrictions automatically. You must implement path checking yourself.' },
                  { label: 'Yes — the OS handles enforcement', correct: false, feedback: 'Root enforcement is the developer\'s responsibility, not the OS or SDK.' },
                  { label: 'Roots are just advisory — no enforcement possible', correct: false, feedback: 'You CAN enforce them — you just have to implement the checks yourself.' },
                ]
              },
              {
                id: 'mcp-l6-s3-q4',
                question: 'What are the four benefits of roots?',
                codeBlock: null,
                options: [
                  { label: 'User-friendly (no full paths), focused search (faster discovery), security (prevents sensitive access), flexible (can provide via tools or prompts)', correct: true, feedback: 'Correct. Roots make file access user-friendly, efficient, secure, and flexible in how they\'re provided to the server.' },
                  { label: 'Speed, encryption, compression, caching', correct: false, feedback: 'Those are performance/security features. Roots provide user-friendliness, focused search, security, and flexibility.' },
                  { label: 'Authentication, authorization, logging, monitoring', correct: false, feedback: 'Those are general security concepts. Roots specifically provide filesystem scoping.' },
                  { label: 'They only have one benefit: security', correct: false, feedback: 'Roots have four benefits: user-friendly paths, focused search, security, and flexibility.' },
                ]
              },
            ]
          },
        ]
      },
      {
        id: 'mcp-l7',
        title: 'Transports & Production',
        slug: 'mcp-advanced/transports',
        cardSets: [
          {
            id: 'mcp-l7-s1',
            title: 'Set 1 — JSON Messages & STDIO',
            cards: [
              {
                id: 'mcp-l7-s1-q1',
                question: 'What are the two categories of MCP message types?',
                codeBlock: null,
                options: [
                  { label: 'Request-Result messages (always in pairs) and Notification messages (one-way, no response expected)', correct: true, feedback: 'Correct. Request-Result: CallTool, ListPrompts, ReadResource, Initialize. Notifications: Progress, Logging, ToolListChanged, ResourceUpdated.' },
                  { label: 'GET and POST messages', correct: false, feedback: 'MCP has its own message types, not HTTP methods. The categories are Request-Result and Notification.' },
                  { label: 'Synchronous and asynchronous messages', correct: false, feedback: 'The distinction is Request-Result (bidirectional pairs) vs Notification (one-way).' },
                  { label: 'Client messages and server messages', correct: false, feedback: 'Both clients AND servers can send both types. The categories are Request-Result and Notification.' },
                ]
              },
              {
                id: 'mcp-l7-s1-q2',
                question: 'Why is MCP described as "bidirectional"?',
                codeBlock: null,
                options: [
                  { label: 'Both clients and servers can initiate communication — servers can send requests TO clients (like sampling), not just respond', correct: true, feedback: 'Correct. This is crucial for transport selection — some transports have limitations on which directions are supported.' },
                  { label: 'Messages can contain both text and binary data', correct: false, feedback: 'Bidirectional means both sides can initiate communication, not about data types.' },
                  { label: 'You can read and write data', correct: false, feedback: 'Bidirectional refers to communication direction: both client→server AND server→client initiation.' },
                  { label: 'Requests always require responses', correct: false, feedback: 'Notifications are one-way. Bidirectional means both client and server can initiate messages.' },
                ]
              },
              {
                id: 'mcp-l7-s1-q3',
                question: 'How does the STDIO transport work?',
                codeBlock: null,
                options: [
                  { label: 'Client launches the server as a subprocess and communicates via stdin/stdout — only works on the same machine', correct: true, feedback: 'Correct. Client writes to server\'s stdin, server responds via stdout. Either party can send at any time. Same-machine only.' },
                  { label: 'It uses HTTP endpoints on localhost', correct: false, feedback: 'STDIO uses standard input/output streams, not HTTP. The server is launched as a subprocess.' },
                  { label: 'It uses a shared file for communication', correct: false, feedback: 'STDIO uses stdin/stdout pipes between the parent (client) and child (server) processes.' },
                  { label: 'It works over the network between different machines', correct: false, feedback: 'STDIO only works when client and server are on the SAME machine. Use StreamableHTTP for remote.' },
                ]
              },
              {
                id: 'mcp-l7-s1-q4',
                question: 'What is the required three-message MCP connection handshake?',
                codeBlock: null,
                options: [
                  { label: '(1) Initialize Request (client→server), (2) Initialize Result (server→client), (3) Initialized Notification (client→server, no response)', correct: true, feedback: 'Correct. Only after this three-step handshake can you send tool calls, list resources, etc.' },
                  { label: 'SYN, SYN-ACK, ACK like TCP', correct: false, feedback: 'MCP uses its own handshake: Initialize Request → Initialize Result → Initialized Notification.' },
                  { label: 'Connect, Authenticate, Ready', correct: false, feedback: 'The MCP handshake is: Initialize Request, Initialize Result, Initialized Notification.' },
                  { label: 'No handshake is needed', correct: false, feedback: 'A three-message handshake is required before any operational messages can be sent.' },
                ]
              },
            ]
          },
          {
            id: 'mcp-l7-s2',
            title: 'Set 2 — StreamableHTTP Transport',
            cards: [
              {
                id: 'mcp-l7-s2-q1',
                question: 'What does the StreamableHTTP transport enable?',
                codeBlock: null,
                options: [
                  { label: 'MCP clients connecting to remotely hosted servers over HTTP — enabling public MCP servers anyone can access', correct: true, feedback: 'Correct. Unlike STDIO (same machine only), StreamableHTTP allows remote connections over the network.' },
                  { label: 'Faster communication than STDIO', correct: false, feedback: 'StreamableHTTP isn\'t about speed — it\'s about enabling remote connections over HTTP.' },
                  { label: 'Binary data transfer', correct: false, feedback: 'StreamableHTTP is about remote server access, not binary data support.' },
                  { label: 'Encrypted communication', correct: false, feedback: 'While HTTPS adds encryption, the main purpose is enabling remote MCP server access.' },
                ]
              },
              {
                id: 'mcp-l7-s2-q2',
                question: 'What is the core HTTP limitation that StreamableHTTP must solve?',
                codeBlock: null,
                options: [
                  { label: 'Clients can call servers (known URL), but servers cannot easily initiate requests to clients (no known URL)', correct: true, feedback: 'Correct. This breaks server→client messages like sampling requests, progress notifications, and logging. StreamableHTTP uses SSE to work around this.' },
                  { label: 'HTTP is too slow for MCP', correct: false, feedback: 'Speed isn\'t the issue. The limitation is that servers can\'t easily push messages to clients without a known URL.' },
                  { label: 'HTTP doesn\'t support JSON', correct: false, feedback: 'HTTP handles JSON fine. The issue is server→client message initiation.' },
                  { label: 'HTTP connections time out too quickly', correct: false, feedback: 'The core issue is directionality: servers can\'t easily push to clients.' },
                ]
              },
              {
                id: 'mcp-l7-s2-q3',
                question: 'How does StreamableHTTP solve server-to-client communication?',
                codeBlock: null,
                options: [
                  { label: 'Server-Sent Events (SSE) — after init, the client opens a long-lived GET connection that the server uses to stream messages at any time', correct: true, feedback: 'Correct. The session ID from initialization identifies the client. A persistent SSE connection lets the server push notifications and requests.' },
                  { label: 'WebSockets', correct: false, feedback: 'StreamableHTTP uses SSE (Server-Sent Events), not WebSockets, for server→client communication.' },
                  { label: 'Long polling', correct: false, feedback: 'StreamableHTTP uses SSE, which is more efficient than polling.' },
                  { label: 'The server calls a webhook URL', correct: false, feedback: 'SSE is used — the client opens a persistent GET connection that the server writes to.' },
                ]
              },
              {
                id: 'mcp-l7-s2-q4',
                question: 'What is the `mcp-session-id` header used for?',
                codeBlock: null,
                options: [
                  { label: 'Returned during initialization — uniquely identifies the client. Must be included in all future requests', correct: true, feedback: 'Correct. The session ID lets the server track which client is making requests and route SSE messages to the right connection.' },
                  { label: 'It\'s an authentication token', correct: false, feedback: 'It\'s a session identifier for routing, not authentication.' },
                  { label: 'It encrypts the connection', correct: false, feedback: 'Session IDs are for client identification, not encryption.' },
                  { label: 'It\'s optional metadata', correct: false, feedback: 'It\'s required — the server needs it to identify which client is making each request.' },
                ]
              },
              {
                id: 'mcp-l7-s2-q5',
                question: 'What do `stateless_http=True` and `json_response=True` do, and what are the trade-offs?',
                codeBlock: null,
                options: [
                  { label: '`stateless_http` enables horizontal scaling but loses session tracking, sampling, and notifications. `json_response` disables streaming, returning only final results', correct: true, feedback: 'Correct. Both break the SSE workaround. stateless_http removes sessions/server-initiated messages. json_response removes streaming/progress. Use only when those trade-offs are acceptable.' },
                  { label: 'They improve security', correct: false, feedback: 'They solve scaling issues but sacrifice functionality (no sampling, no progress, no server→client messages).' },
                  { label: 'They make communication faster', correct: false, feedback: 'They simplify communication but at the cost of losing SSE, progress notifications, and sampling.' },
                  { label: 'They\'re required for production', correct: false, feedback: 'They\'re optional. Use them only when you need horizontal scaling and can accept the trade-offs.' },
                ]
              },
            ]
          },
        ]
      },
    ]
  },
  {
    id: 'skills',
    title: 'Agent Skills',
    color: '#f59e0b',
    lessons: [
      {
        id: 'skills-l8',
        title: 'Skill Anatomy',
        slug: 'skills/anatomy',
        cardSets: [
          {
            id: 'skills-l8-s1',
            title: 'Set 1 — What Are Skills?',
            cards: [
              { id: 'skills-l8-s1-q1', question: 'What is a "skill" in Claude Code?', codeBlock: null, options: [
                { label: 'A folder with a SKILL.md file containing instructions that Claude discovers and uses for specific tasks', correct: true, feedback: 'Correct. Skills are folders of markdown instructions with YAML frontmatter (name + description). Claude matches them to requests via semantic matching.' },
                { label: 'A built-in Claude Code feature', correct: false, feedback: 'Skills are user-created, not built-in. They live in SKILL.md files you author.' },
                { label: 'A Python script that extends Claude', correct: false, feedback: 'Skills are markdown files with instructions, not scripts.' },
                { label: 'An MCP server plugin', correct: false, feedback: 'Skills and MCP servers are different features. Skills add knowledge; MCP servers add tools.' },
              ]},
              { id: 'skills-l8-s1-q2', question: 'How does Claude decide which skill to activate?', codeBlock: null, options: [
                { label: 'Semantic matching — Claude compares your request against all skill descriptions and activates matching ones', correct: true, feedback: 'Correct. Only the name and description are loaded initially. The full content loads only when a match is found and confirmed.' },
                { label: 'You must type the skill name explicitly', correct: false, feedback: 'That\'s slash commands. Skills activate automatically via semantic matching on the description.' },
                { label: 'All skills load into every conversation', correct: false, feedback: 'That\'s CLAUDE.md. Skills load on demand when matched, keeping the context window clean.' },
                { label: 'Skills run on a schedule', correct: false, feedback: 'Skills are request-driven, not schedule-driven.' },
              ]},
              { id: 'skills-l8-s1-q3', question: 'Where can personal skills be stored vs project skills?', codeBlock: null, options: [
                { label: 'Personal: `~/.claude/skills` (follows you across projects). Project: `.claude/skills` (committed to repo, shared with team)', correct: true, feedback: 'Correct. Personal skills are in your home directory. Project skills are in the repo and shared via version control.' },
                { label: 'Both go in the project directory', correct: false, feedback: 'Personal skills go in ~/.claude/skills so they follow you across all projects.' },
                { label: 'Skills can only be project-level', correct: false, feedback: 'Skills can be personal (~/.claude/skills) or project-level (.claude/skills).' },
                { label: 'They\'re stored in the cloud', correct: false, feedback: 'Skills are local files — either in your home directory or project directory.' },
              ]},
              { id: 'skills-l8-s1-q4', question: 'How do skills differ from CLAUDE.md?', codeBlock: null, options: [
                { label: 'CLAUDE.md loads into every conversation (always-on). Skills load on demand only when matched to a request', correct: true, feedback: 'Correct. CLAUDE.md is for always-applicable rules. Skills are for task-specific expertise that would clutter every conversation.' },
                { label: 'They\'re the same thing', correct: false, feedback: 'CLAUDE.md is always-on context. Skills are on-demand, activated by semantic matching.' },
                { label: 'Skills replace CLAUDE.md', correct: false, feedback: 'They complement each other. CLAUDE.md for always-on rules, skills for task-specific knowledge.' },
                { label: 'CLAUDE.md is for code, skills are for documentation', correct: false, feedback: 'The distinction is always-on (CLAUDE.md) vs on-demand (skills), not content type.' },
              ]},
              { id: 'skills-l8-s1-q5', question: 'How do skills differ from slash commands?', codeBlock: null, options: [
                { label: 'Slash commands require explicit user invocation. Skills activate automatically when Claude recognizes the relevant situation', correct: true, feedback: 'Correct. You type `/command` explicitly. Skills are discovered and activated by Claude based on semantic matching.' },
                { label: 'They work the same way', correct: false, feedback: 'Slash commands are explicit (/command). Skills are automatic via semantic matching.' },
                { label: 'Skills are faster', correct: false, feedback: 'The difference is invocation: explicit (commands) vs automatic (skills).' },
                { label: 'Slash commands can do more', correct: false, feedback: 'The difference is how they\'re triggered, not capability.' },
              ]},
            ]
          },
          {
            id: 'skills-l8-s2',
            title: 'Set 2 — Creating & Configuring Skills',
            cards: [
              { id: 'skills-l8-s2-q1', question: 'What are the required fields in SKILL.md frontmatter?', codeBlock: '---\nname: pr-description\ndescription: Writes pull request descriptions.\n---', options: [
                { label: '`name` (lowercase, hyphens, max 64 chars) and `description` (max 1024 chars, used for semantic matching)', correct: true, feedback: 'Correct. Name identifies the skill. Description is the most important field — Claude uses it to decide when to activate the skill.' },
                { label: 'Only `name` is required', correct: false, feedback: 'Both name and description are required. The description is critical for matching.' },
                { label: '`name`, `description`, and `version`', correct: false, feedback: 'Version is not a frontmatter field. The required fields are name and description.' },
                { label: '`name`, `description`, and `allowed-tools`', correct: false, feedback: 'allowed-tools is optional. Only name and description are required.' },
              ]},
              { id: 'skills-l8-s2-q2', question: 'What is the skill priority hierarchy when names conflict?', codeBlock: null, options: [
                { label: 'Enterprise > Personal > Project > Plugins', correct: true, feedback: 'Correct. Enterprise (managed settings) has highest priority. Use descriptive names like `frontend-review` instead of just `review` to avoid conflicts.' },
                { label: 'Project > Personal > Enterprise', correct: false, feedback: 'Enterprise has the highest priority, not project.' },
                { label: 'All skills have equal priority', correct: false, feedback: 'There\'s a clear hierarchy: Enterprise > Personal > Project > Plugins.' },
                { label: 'Most recently created wins', correct: false, feedback: 'Priority is based on source level, not creation time.' },
              ]},
              { id: 'skills-l8-s2-q3', question: 'What does the `allowed-tools` frontmatter field do?', codeBlock: 'allowed-tools: Read, Grep, Glob, Bash', options: [
                { label: 'Restricts which tools Claude can use when the skill is active — useful for read-only or security-sensitive workflows', correct: true, feedback: 'Correct. If omitted, the skill doesn\'t restrict anything. When set, Claude can only use the listed tools without asking permission.' },
                { label: 'It lists tools the skill needs installed', correct: false, feedback: 'It restricts available tools, not lists dependencies.' },
                { label: 'It\'s required for all skills', correct: false, feedback: 'It\'s optional. If omitted, Claude uses its normal permission model.' },
                { label: 'It adds new tools to Claude', correct: false, feedback: 'It restricts tools, not adds them. It\'s a guardrail.' },
              ]},
              { id: 'skills-l8-s2-q4', question: 'What is "progressive disclosure" in multi-file skills?', codeBlock: null, options: [
                { label: 'Keep SKILL.md under 500 lines with essentials, put detailed references in separate files Claude reads only when needed', correct: true, feedback: 'Correct. Use directories like scripts/, references/, assets/. Link from SKILL.md with instructions about when to load each file.' },
                { label: 'Slowly revealing information to the user', correct: false, feedback: 'In skills context, it means splitting content so Claude loads detailed references only when the specific topic comes up.' },
                { label: 'A way to version skills', correct: false, feedback: 'Progressive disclosure is about splitting skill content across files to manage context size.' },
                { label: 'Showing skills one at a time', correct: false, feedback: 'It\'s about organizing skill content: essentials in SKILL.md, details in separate files loaded on demand.' },
              ]},
              { id: 'skills-l8-s2-q5', question: 'Why should you tell Claude to RUN scripts in a skill directory rather than READ them?', codeBlock: null, options: [
                { label: 'Running a script only puts its output into context (small). Reading puts the entire source code into context (large, wasteful)', correct: true, feedback: 'Correct. Scripts\' output consumes tokens, not the source code. This is more token-efficient for data transformations and validation tasks.' },
                { label: 'Claude can\'t read scripts', correct: false, feedback: 'Claude can read scripts, but it wastes context. Running them is more token-efficient.' },
                { label: 'Scripts run faster than they read', correct: false, feedback: 'The benefit is token efficiency, not speed.' },
                { label: 'Security reasons', correct: false, feedback: 'The primary reason is context/token efficiency.' },
              ]},
            ]
          },
        ]
      },
      {
        id: 'skills-l9',
        title: 'Distribution & Troubleshooting',
        slug: 'skills/distribution',
        cardSets: [
          {
            id: 'skills-l9-s1',
            title: 'Set 1 — Skills vs Other Features',
            cards: [
              { id: 'skills-l9-s1-q1', question: 'When should you use CLAUDE.md vs a skill?', codeBlock: null, options: [
                { label: 'CLAUDE.md for always-applicable project standards. Skills for task-specific expertise that\'s only relevant sometimes', correct: true, feedback: 'Correct. "Never modify the database schema" → CLAUDE.md. "How to write a PR description" → skill.' },
                { label: 'Always use skills instead of CLAUDE.md', correct: false, feedback: 'CLAUDE.md is better for rules that apply to EVERY conversation. Skills are for on-demand expertise.' },
                { label: 'Always use CLAUDE.md instead of skills', correct: false, feedback: 'Detailed procedures that only apply sometimes would clutter CLAUDE.md. Use skills for those.' },
                { label: 'They serve the same purpose', correct: false, feedback: 'Different loading behavior: CLAUDE.md always loads; skills load on demand.' },
              ]},
              { id: 'skills-l9-s1-q2', question: 'What is the difference between skills and hooks?', codeBlock: null, options: [
                { label: 'Hooks are event-driven (fire on saves, tool calls). Skills are request-driven (activate based on what you ask)', correct: true, feedback: 'Correct. Hook: "run linter every time Claude saves a file." Skill: "knowledge about how to write PR descriptions."' },
                { label: 'They\'re the same thing', correct: false, feedback: 'Hooks fire on events (file saves, tool calls). Skills activate based on request matching.' },
                { label: 'Skills replace hooks', correct: false, feedback: 'They serve different purposes: hooks for automated side effects, skills for knowledge.' },
                { label: 'Hooks are more powerful', correct: false, feedback: 'They\'re different, not ranked. Hooks = event-driven automation, skills = request-driven knowledge.' },
              ]},
              { id: 'skills-l9-s1-q3', question: 'Do subagents automatically inherit your skills?', codeBlock: null, options: [
                { label: 'No — subagents start with a fresh context. Built-in agents can\'t access skills at all. Custom agents need skills explicitly listed in frontmatter', correct: true, feedback: 'Correct. Add `skills: accessibility-audit, performance-check` to custom agent frontmatter. Skills load at subagent start, not on demand.' },
                { label: 'Yes — all skills are inherited', correct: false, feedback: 'Subagents do NOT inherit skills. You must explicitly list them in custom agent frontmatter.' },
                { label: 'Only personal skills are inherited', correct: false, feedback: 'No skills are inherited. Custom agents must explicitly list needed skills.' },
                { label: 'Skills don\'t work with subagents', correct: false, feedback: 'Custom subagents CAN use skills, but only when explicitly listed in their frontmatter `skills` field.' },
              ]},
            ]
          },
          {
            id: 'skills-l9-s2',
            title: 'Set 2 — Sharing & Troubleshooting',
            cards: [
              { id: 'skills-l9-s2-q1', question: 'What are the three ways to distribute skills?', codeBlock: null, options: [
                { label: 'Repository commits (.claude/skills), plugin marketplaces, and enterprise managed settings', correct: true, feedback: 'Correct. Repo commits are simplest (git pull updates). Plugins are for community sharing. Enterprise settings enforce organization-wide standards with highest priority.' },
                { label: 'Only via git repositories', correct: false, feedback: 'Git repos are one method. Plugins and enterprise managed settings are also supported.' },
                { label: 'Email, download, and copy-paste', correct: false, feedback: 'The official channels are repo commits, marketplaces, and enterprise managed settings.' },
                { label: 'There\'s no way to share skills', correct: false, feedback: 'Skills can be shared via repo commits, plugins, or enterprise settings.' },
              ]},
              { id: 'skills-l9-s2-q2', question: 'Your skill doesn\'t trigger when you expect it to. What\'s the most likely cause?', codeBlock: null, options: [
                { label: 'The description doesn\'t match how you\'re phrasing requests — add more trigger phrases and keywords', correct: true, feedback: 'Correct. Claude uses semantic matching on the description. If it doesn\'t trigger, the description needs keywords matching your actual phrasing.' },
                { label: 'The skill file is corrupted', correct: false, feedback: 'It\'s almost always the description. Add trigger phrases matching how you actually ask for things.' },
                { label: 'Claude Code needs to be updated', correct: false, feedback: 'Trigger issues are description problems, not version issues.' },
                { label: 'The skill folder is in the wrong location', correct: false, feedback: 'That would prevent loading entirely. Trigger issues are about the description text.' },
              ]},
              { id: 'skills-l9-s2-q3', question: 'SKILL.md must follow specific naming rules. What are they?', codeBlock: null, options: [
                { label: 'File must be exactly `SKILL.md` (all-caps SKILL, lowercase md), inside a named directory — NOT at the skills root level', correct: true, feedback: 'Correct. The file name is case-sensitive. Run `claude --debug` to see loading errors if something\'s wrong.' },
                { label: 'Any filename ending in .md works', correct: false, feedback: 'The file must be exactly SKILL.md — no variations.' },
                { label: 'It can be at the skills root level', correct: false, feedback: 'SKILL.md must be inside a named directory, not at the root.' },
                { label: 'The name is case-insensitive', correct: false, feedback: 'SKILL must be all-caps. The .md must be lowercase.' },
              ]},
              { id: 'skills-l9-s2-q4', question: 'Two skills with similar descriptions are conflicting. How do you fix it?', codeBlock: null, options: [
                { label: 'Make the descriptions more distinct and specific — being specific prevents conflicts with similar-sounding skills', correct: true, feedback: 'Correct. If "code review" and "security review" overlap, make each description clearly specify its domain and trigger scenarios.' },
                { label: 'Delete one of the skills', correct: false, feedback: 'You can keep both — just make their descriptions more distinct.' },
                { label: 'Give them the same name', correct: false, feedback: 'Same name would cause priority conflicts. Make descriptions distinct instead.' },
                { label: 'Increase the priority of one', correct: false, feedback: 'Priority is based on source (enterprise/personal/project), not configurable per-skill. Fix the descriptions.' },
              ]},
            ]
          },
        ]
      },
    ]
  },
  {
    id: 'subagents',
    title: 'Subagents',
    color: '#14b8a6',
    lessons: [
      {
        id: 'sub-l10',
        title: 'Subagent Mechanics',
        slug: 'subagents/mechanics',
        cardSets: [
          {
            id: 'sub-l10-s1',
            title: 'Set 1 — What Are Subagents?',
            cards: [
              { id: 'sub-l10-s1-q1', question: 'What is a subagent in Claude Code?', codeBlock: null, options: [
                { label: 'A specialized assistant running in its own isolated context window — it does work independently and returns only a summary', correct: true, feedback: 'Correct. Intermediate steps (file reads, searches) stay isolated. Only the summary comes back to the main conversation. The subagent context is then discarded.' },
                { label: 'A second instance of Claude running on a different machine', correct: false, feedback: 'Subagents run locally in a separate context window, not on different machines.' },
                { label: 'A plugin that adds features to Claude', correct: false, feedback: 'That\'s MCP servers. Subagents are isolated execution contexts for delegating tasks.' },
                { label: 'A way to save conversations', correct: false, feedback: 'Subagent contexts are discarded after completion. They\'re for delegation, not persistence.' },
              ]},
              { id: 'sub-l10-s1-q2', question: 'What problem do subagents solve?', codeBlock: null, options: [
                { label: 'The context window is finite — every tool call and file read fills it up. Subagents spin up separate context windows to keep the main one clean', correct: true, feedback: 'Correct. Without subagents, exploratory work clutters the main context. Subagents isolate intermediate work and return only concise results.' },
                { label: 'They make Claude faster', correct: false, feedback: 'The benefit is context management, not speed. They keep the main context clean.' },
                { label: 'They provide internet access', correct: false, feedback: 'Internet access is a tool capability, not a subagent feature.' },
                { label: 'They allow multiple users', correct: false, feedback: 'Subagents are about context isolation, not multi-user support.' },
              ]},
              { id: 'sub-l10-s1-q3', question: 'What are the three built-in subagent types?', codeBlock: null, options: [
                { label: 'General purpose (multi-step tasks), Explore (fast codebase search), and Plan (research before presenting a plan)', correct: true, feedback: 'Correct. General purpose handles exploration + action. Explore is for fast navigation. Plan is used in plan mode for analysis.' },
                { label: 'Read, Write, and Execute', correct: false, feedback: 'Those are tool categories. The built-in subagents are General purpose, Explore, and Plan.' },
                { label: 'Researcher, Coder, and Reviewer', correct: false, feedback: 'Those could be custom subagents. The built-in ones are General purpose, Explore, and Plan.' },
                { label: 'There are no built-in subagents', correct: false, feedback: 'Claude Code has three built-in subagents: General purpose, Explore, and Plan.' },
              ]},
              { id: 'sub-l10-s1-q4', question: 'What does a subagent receive when launched?', codeBlock: null, options: [
                { label: 'A custom system prompt from your config file AND a task description written by the parent agent based on your request', correct: true, feedback: 'Correct. The system prompt defines the subagent\'s role. The task description is written by the main agent based on what you asked for.' },
                { label: 'The entire main conversation history', correct: false, feedback: 'Subagents do NOT get conversation history. They receive a system prompt and a task — that\'s it.' },
                { label: 'Only the user\'s last message', correct: false, feedback: 'They get a system prompt + a task description written by the parent agent, not the raw user message.' },
                { label: 'A copy of all project files', correct: false, feedback: 'They get a system prompt and task description. They can read files using their tools, but don\'t get files upfront.' },
              ]},
            ]
          },
          {
            id: 'sub-l10-s2',
            title: 'Set 2 — Creating Subagents',
            cards: [
              { id: 'sub-l10-s2-q1', question: 'How do you create a custom subagent?', codeBlock: null, options: [
                { label: 'Use the `/agents` slash command, or create a markdown file in `.claude/agents/` with YAML frontmatter', correct: true, feedback: 'Correct. The /agents command opens a management interface. Config files go in .claude/agents/your-agent-name.md.' },
                { label: 'Install a plugin', correct: false, feedback: 'Subagents are defined as markdown files in .claude/agents/, not plugins.' },
                { label: 'Edit CLAUDE.md', correct: false, feedback: 'CLAUDE.md is for project context. Subagents are separate .md files in .claude/agents/.' },
                { label: 'Call an API endpoint', correct: false, feedback: 'Subagents are configured via local markdown files, not API calls.' },
              ]},
              { id: 'sub-l10-s2-q2', question: 'What are the YAML frontmatter fields for a custom subagent?', codeBlock: 'name: code-reviewer\ndescription: Reviews code changes...\ntools: Bash, Glob, Grep, Read\nmodel: opus\ncolor: blue', options: [
                { label: '`name`, `description`, `tools`, `model` (haiku/sonnet/opus/inherit), and `color`', correct: true, feedback: 'Correct. The body of the markdown (below frontmatter) is the system prompt with the subagent\'s instructions.' },
                { label: 'Only `name` is required', correct: false, feedback: 'Name and description are both important. Tools, model, and color are optional but recommended.' },
                { label: 'Same fields as SKILL.md', correct: false, feedback: 'Subagents have different fields: tools, model, color. Skills have allowed-tools but no model/color.' },
                { label: 'Fields are defined in JSON', correct: false, feedback: 'Subagent config uses YAML frontmatter in a markdown file, not JSON.' },
              ]},
              { id: 'sub-l10-s2-q3', question: 'How do you make Claude use a subagent automatically (proactively)?', codeBlock: null, options: [
                { label: 'Include the word "proactively" in the description field — you can also add example conversations for specific triggers', correct: true, feedback: 'Correct. Example: `description: Proactively suggest running this agent after major code changes...`' },
                { label: 'Set `auto: true` in frontmatter', correct: false, feedback: 'There\'s no auto field. Include "proactively" in the description text.' },
                { label: 'It always runs automatically', correct: false, feedback: 'By default, Claude decides based on the description. Adding "proactively" encourages automatic delegation.' },
                { label: 'You must always invoke it manually', correct: false, feedback: 'With "proactively" in the description, Claude will suggest using it without being asked.' },
              ]},
              { id: 'sub-l10-s2-q4', question: 'What are the two scope options for subagents?', codeBlock: null, options: [
                { label: 'Project-level (current project only) or user-level (shared across all projects)', correct: true, feedback: 'Correct. Project-level agents are specific to one repo. User-level agents follow you everywhere.' },
                { label: 'Public and private', correct: false, feedback: 'The scopes are project-level and user-level, not public/private.' },
                { label: 'Global only', correct: false, feedback: 'There are two scopes: project-level and user-level.' },
                { label: 'Read-only and read-write', correct: false, feedback: 'Those are tool access levels, not scope options. Scopes are project vs user.' },
              ]},
            ]
          },
        ]
      },
      {
        id: 'sub-l11',
        title: 'Effective Design',
        slug: 'subagents/design',
        cardSets: [
          {
            id: 'sub-l11-s1',
            title: 'Set 1 — Design Patterns',
            cards: [
              { id: 'sub-l11-s1-q1', question: 'Why is defining a structured output format called "the single most important improvement" for subagents?', codeBlock: null, options: [
                { label: 'It creates natural stopping points so the subagent knows when it\'s done, and prevents it from running too long', correct: true, feedback: 'Correct. Without a defined output, subagents struggle to decide when enough research is done. A structured format (Summary, Critical Issues, Recommendations, etc.) tells it exactly what to produce.' },
                { label: 'It makes the output prettier', correct: false, feedback: 'The benefit is functional: stopping criteria and preventing runaway exploration, not aesthetics.' },
                { label: 'It\'s required by the API', correct: false, feedback: 'It\'s a best practice, not a requirement. But without it, subagents run inefficiently.' },
                { label: 'It reduces token usage', correct: false, feedback: 'The primary benefit is stopping criteria and completeness, though it may help with token usage indirectly.' },
              ]},
              { id: 'sub-l11-s1-q2', question: 'Why should subagent output templates include an "Obstacles Encountered" section?', codeBlock: null, options: [
                { label: 'Without it, the main thread rediscovers the same workarounds the subagent already found — wasting time and tokens', correct: true, feedback: 'Correct. Obstacles include: setup issues, workarounds discovered, commands needing special flags, dependency problems.' },
                { label: 'For debugging purposes only', correct: false, feedback: 'It\'s about efficiency — preventing the main thread from repeating the subagent\'s discoveries.' },
                { label: 'It\'s required by Claude Code', correct: false, feedback: 'It\'s a best practice. Without it, valuable discoveries get lost when the subagent context is discarded.' },
                { label: 'To make logs more complete', correct: false, feedback: 'The purpose is preventing redundant work in the main thread, not logging.' },
              ]},
              { id: 'sub-l11-s1-q3', question: 'How does the subagent description field serve a dual role?', codeBlock: null, options: [
                { label: 'It controls WHEN a subagent triggers AND shapes the input prompt the main agent writes when launching it', correct: true, feedback: 'Correct. A specific description (e.g., "tell the agent precisely which files to review") makes the main agent write much more specific task prompts.' },
                { label: 'It defines the name and the system prompt', correct: false, feedback: 'Name is separate. The dual role is: (1) triggering criteria and (2) shaping the input prompt.' },
                { label: 'It works for both the user and Claude', correct: false, feedback: 'The dual role is technical: controlling trigger timing AND influencing task prompt quality.' },
                { label: 'It serves as documentation and configuration', correct: false, feedback: 'The dual role is: controlling when to launch AND shaping how the task is described to the subagent.' },
              ]},
              { id: 'sub-l11-s1-q4', question: 'What tool access should a research/read-only subagent have?', codeBlock: null, options: [
                { label: 'Only Glob, Grep, and Read — cannot accidentally modify files', correct: true, feedback: 'Correct. A code reviewer adds Bash (for git diff) but NOT Edit/Write. A styling agent gets Edit/Write because its job is to change code.' },
                { label: 'All tools', correct: false, feedback: 'Limiting tools prevents unintended side effects and makes each subagent\'s role clearer.' },
                { label: 'No tools at all', correct: false, feedback: 'A research subagent needs read tools (Glob, Grep, Read) to explore the codebase.' },
                { label: 'Only Bash', correct: false, feedback: 'Glob, Grep, and Read are more appropriate for research. Bash is for commands like git diff.' },
              ]},
            ]
          },
          {
            id: 'sub-l11-s2',
            title: 'Set 2 — When to Use (and Avoid) Subagents',
            cards: [
              { id: 'sub-l11-s2-q1', question: 'What is the core decision criterion for using a subagent?', codeBlock: null, options: [
                { label: '"Does the intermediate work matter?" If no (just need the result), delegate. If yes (need to see the journey), keep in main thread', correct: true, feedback: 'Correct. Subagents shine when you need the result, not the play-by-play of how it was found.' },
                { label: 'Whether the task is complex', correct: false, feedback: 'Complexity isn\'t the criterion. It\'s whether you need to see the intermediate steps.' },
                { label: 'Whether it involves code changes', correct: false, feedback: 'Code changes can happen in main thread or subagent. The question is whether intermediate work matters.' },
                { label: 'Always use subagents for better performance', correct: false, feedback: 'Subagents have overhead. Only use when intermediate work would clutter the main context.' },
              ]},
              { id: 'sub-l11-s2-q2', question: 'Why are code reviews an ideal subagent use case?', codeBlock: null, options: [
                { label: 'Claude reviews more effectively when code is presented as written by someone else — the reviewer subagent has no history of creating the code', correct: true, feedback: 'Correct. If the main thread built the feature, it has trouble seeing its own work critically. A reviewer subagent has fresh eyes with no creation bias.' },
                { label: 'Because reviews are always simple', correct: false, feedback: 'Reviews can be complex. The key benefit is the fresh perspective — no bias from having written the code.' },
                { label: 'Because reviews don\'t need tools', correct: false, feedback: 'Review subagents need Bash (git diff), Glob, Grep, Read. The benefit is fresh perspective.' },
                { label: 'To save time', correct: false, feedback: 'The main benefit is review quality — a separate context with no creation bias gives more honest feedback.' },
              ]},
              { id: 'sub-l11-s2-q3', question: 'Which of these is an anti-pattern for subagents?', codeBlock: null, options: [
                { label: 'Sequential pipelines where each step depends on discoveries from the previous step — information gets lost in handoffs', correct: true, feedback: 'Correct. Pipelines only work when tasks are truly independent. Other anti-patterns: "expert" personas (Claude already has the knowledge) and test runners (hide output you need).' },
                { label: 'Research tasks', correct: false, feedback: 'Research is the classic ideal use case for subagents.' },
                { label: 'Code reviews', correct: false, feedback: 'Code reviews are ideal — subagents provide fresh perspective.' },
                { label: 'Tasks needing custom system prompts', correct: false, feedback: 'Custom prompts are a great reason to use subagents (e.g., copywriting, styling).' },
              ]},
              { id: 'sub-l11-s2-q4', question: 'Why are "expert" subagents (e.g., "you are a Python expert") considered an anti-pattern?', codeBlock: null, options: [
                { label: 'Claude already has that knowledge — nothing an "expert" subagent can do that the main thread can\'t do directly', correct: true, feedback: 'Correct. Claiming expertise adds no value. Use subagents for context isolation and fresh perspective, not fake expertise labels.' },
                { label: 'They cost more tokens', correct: false, feedback: 'The issue isn\'t cost — it\'s that they add zero value. Claude already knows Python, Kubernetes, etc.' },
                { label: 'They\'re not supported', correct: false, feedback: 'They work technically. They\'re just pointless — Claude already has expert knowledge.' },
                { label: 'They\'re too slow', correct: false, feedback: 'Speed isn\'t the issue. They simply don\'t add capabilities the main thread doesn\'t already have.' },
              ]},
              { id: 'sub-l11-s2-q5', question: 'Why did test runner subagents perform worst among all configurations in testing?', codeBlock: null, options: [
                { label: 'They hide test output you need for debugging — returning "tests failed" forces creating additional debug scripts for details that were directly visible', correct: true, feedback: 'Correct. Test output is exactly the kind of intermediate work that DOES matter. Keep testing in the main thread.' },
                { label: 'Tests are too slow for subagents', correct: false, feedback: 'Speed isn\'t the issue. The problem is losing visibility into test output needed for debugging.' },
                { label: 'Subagents can\'t run tests', correct: false, feedback: 'They can run tests. The problem is the results are summarized, hiding details needed for diagnosis.' },
                { label: 'It was a bug in the testing setup', correct: false, feedback: 'It\'s a fundamental design problem: test output is intermediate work that matters to the developer.' },
              ]},
            ]
          },
        ]
      },
    ]
  },
  {
    id: 'copilot',
    title: 'GitHub Copilot',
    color: '#3b82f6',
    lessons: [
      {
        id: 'cop-l12',
        title: 'Core Modes',
        slug: 'copilot/core-modes',
        cardSets: [
          {
            id: 'cop-l12-s1',
            title: 'Set 1 — Agent Mode',
            cards: [
              {
                id: 'cop-l12-s1-q1',
                question: 'You need to scaffold a new Express app, install dependencies, create routes, write tests, and make sure they pass. Which Copilot mode?',
                codeBlock: null,
                options: [
                  { label: 'Agent mode — it can create files, run npm install, execute tests, and fix failures autonomously', correct: true, feedback: 'Correct. This is a multi-step task requiring file creation, terminal commands (npm install, npm test), and iteration on failures. Agent mode handles the full loop: plan, edit, run, observe, repeat.' },
                  { label: 'Edit mode — it can generate all the code you need', correct: false, feedback: 'Edit mode can write code but cannot run npm install or execute tests. You need Agent mode for the full workflow including terminal commands.' },
                  { label: 'Ask mode — have it plan everything first, then you execute manually', correct: false, feedback: 'Ask mode is read-only and cannot create files. Agent mode can both plan and execute the entire workflow.' },
                  { label: 'Use all three modes in sequence for maximum control', correct: false, feedback: 'Agent mode alone handles this entire workflow — it plans, writes, runs, and iterates. No mode switching needed.' },
                ]
              },
              {
                id: 'cop-l12-s1-q2',
                question: 'Your Copilot agent just ran a test suite that failed with 3 errors. What happens next in Agent mode?',
                codeBlock: null,
                options: [
                  { label: 'The agent reads the error output, edits the code to fix the issues, and re-runs the tests — repeating until they pass', correct: true, feedback: 'Correct. The agentic loop is: plan, edit, run commands, observe output, iterate. When tests fail, the agent reads the errors, makes corrections, and re-runs — continuing until the task succeeds.' },
                  { label: 'The agent stops and asks you to fix the errors manually', correct: false, feedback: 'Agent mode does not stop at failures — it self-corrects. It reads the error output and iterates autonomously.' },
                  { label: 'The agent opens a GitHub Issue with the error details', correct: false, feedback: 'The local agent iterates on errors in your workspace. Opening Issues is a cloud agent behavior.' },
                  { label: 'The agent reverts all changes and starts over from scratch', correct: false, feedback: 'The agent makes targeted fixes based on error output, not full reverts. It iterates incrementally.' },
                ]
              },
              {
                id: 'cop-l12-s1-q3',
                question: 'You want Agent mode to automatically run file edits and linting without asking, but still prompt before executing shell commands. Which permission setup?',
                codeBlock: null,
                options: [
                  { label: 'Bypass for file edits and lint tools, keep Default for terminal execution', correct: true, feedback: 'Correct. Bypass lets you pre-approve specific safe tools (like file edits and linting) while Default continues to prompt for riskier operations like running arbitrary shell commands.' },
                  { label: 'Autopilot mode for everything — it is the most efficient', correct: false, feedback: 'Autopilot grants blanket approval for all tools including shell commands. You want selective control, which is what Bypass provides for specific tools.' },
                  { label: 'Default for everything — approve each action individually', correct: false, feedback: 'Default works but defeats the purpose. Bypass lets you pre-approve safe tools while keeping prompts for risky ones.' },
                  { label: 'This is not possible — permission levels are all-or-nothing', correct: false, feedback: 'Bypass is specifically designed for granular control. You can pre-approve specific tools while requiring confirmation for others.' },
                ]
              },
              {
                id: 'cop-l12-s1-q4',
                question: 'A junior developer is nervous about Agent mode "doing too much." How should they start using it safely?',
                codeBlock: null,
                options: [
                  { label: 'Use Default permissions so every tool action requires explicit approval, then gradually Bypass safe tools as confidence grows', correct: true, feedback: 'Correct. Default permissions create a "human-in-the-loop" experience — the agent proposes each action but waits for approval. This lets beginners learn what the agent does while maintaining full control.' },
                  { label: 'Avoid Agent mode entirely and only use Ask mode', correct: false, feedback: 'Agent mode with Default permissions is already safe — every action requires approval. Avoiding it entirely means missing its most powerful capabilities.' },
                  { label: 'Start with Autopilot to see everything it can do, then restrict later', correct: false, feedback: 'Starting with maximum autonomy is the opposite of a safe ramp-up. Default permissions give you a safe learning experience.' },
                  { label: 'Only use Agent mode on throwaway branches', correct: false, feedback: 'While branches help, Default permissions already make Agent mode safe by requiring approval for every action.' },
                ]
              },
              {
                id: 'cop-l12-s1-q5',
                question: 'You are debugging a test failure that involves reading error logs, tweaking config files, and re-running the test suite. Why is Agent mode better than Edit mode here?',
                codeBlock: null,
                options: [
                  { label: 'Agent mode can run the tests, read the output, and iterate — Edit mode can only change files but cannot execute commands', correct: true, feedback: 'Correct. The debug loop requires running terminal commands (test suite) and observing output. Only Agent mode can execute commands, read results, and self-correct. Edit mode is limited to file modifications.' },
                  { label: 'Agent mode uses a better AI model than Edit mode', correct: false, feedback: 'Both modes can use the same models. The difference is capability: Agent mode can run terminal commands, Edit mode cannot.' },
                  { label: 'Agent mode can read more files at once', correct: false, feedback: 'Both modes can read files. The key difference is that Agent mode can execute terminal commands and iterate on their output.' },
                  { label: 'Edit mode cannot modify config files, only source code', correct: false, feedback: 'Edit mode can modify any file type. The issue is that it cannot run the test suite to verify if the fix worked.' },
                ]
              },
            ]
          },
          {
            id: 'cop-l12-s2',
            title: 'Set 2 — Edit Mode',
            cards: [
              {
                id: 'cop-l12-s2-q1',
                question: 'You need to rename an interface and update its usage across 5 files. You already know every location. Which mode and why?',
                codeBlock: null,
                options: [
                  { label: 'Edit mode — it is a targeted, well-defined change with no need for terminal commands or iteration', correct: true, feedback: 'Correct. You know exactly what needs to change. Edit mode makes the multi-file edits and shows diffs for review. No need for Agent mode\'s command execution or autonomous iteration.' },
                  { label: 'Agent mode — it can find and replace everything automatically', correct: false, feedback: 'Agent mode works but is overkill here. You already know the locations, so Edit mode\'s targeted approach gives you more control and is faster.' },
                  { label: 'Ask mode — have it locate all usages first', correct: false, feedback: 'You already know the locations. Ask mode is read-only anyway — it cannot make the changes.' },
                  { label: 'Use VS Code Find & Replace instead — Copilot is unnecessary', correct: false, feedback: 'Copilot Edit mode understands context. A rename may need different changes at each site (e.g., updating type assertions, generics), not just string replacement.' },
                ]
              },
              {
                id: 'cop-l12-s2-q2',
                question: 'You asked Edit mode to refactor a function, but you are not sure the changes are correct. What is your safety net?',
                codeBlock: null,
                options: [
                  { label: 'Edit mode shows inline diffs — you review each change and accept or reject it before anything is applied', correct: true, feedback: 'Correct. Edit mode presents every change as an inline diff in the editor. You can accept or reject each one individually, giving you full control before any code is modified.' },
                  { label: 'Edit mode automatically runs the test suite to verify changes', correct: false, feedback: 'Edit mode cannot run terminal commands. The safety net is the diff review — you inspect each change before accepting it.' },
                  { label: 'Edit mode creates a git branch backup automatically', correct: false, feedback: 'Edit mode does not interact with git. Its safety net is the inline diff review where you accept or reject changes.' },
                  { label: 'There is no safety net — changes are applied immediately', correct: false, feedback: 'Edit mode always shows diffs for review first. Nothing is applied until you explicitly accept the changes.' },
                ]
              },
              {
                id: 'cop-l12-s2-q3',
                question: 'You are working on a large legacy codebase and need to convert a class component to a functional component with hooks. Why choose Edit mode over Agent mode?',
                codeBlock: null,
                options: [
                  { label: 'Edit mode lets you review every diff before it is applied, reducing the risk of unintended changes in unfamiliar legacy code', correct: true, feedback: 'Correct. In a legacy codebase, you want maximum control. Edit mode lets you direct the specific refactoring and inspect each diff, avoiding the risk of an autonomous agent making cascading changes you did not anticipate.' },
                  { label: 'Agent mode cannot handle React code', correct: false, feedback: 'Agent mode handles React fine. The reason to prefer Edit mode here is control over changes in risky legacy code, not technical limitations.' },
                  { label: 'Edit mode is the only mode that can modify JSX files', correct: false, feedback: 'Both Agent and Edit modes can modify any file type. Edit mode is preferred here for its controlled diff-review workflow.' },
                  { label: 'Edit mode automatically preserves backward compatibility', correct: false, feedback: 'Edit mode does not automatically ensure compatibility. Its advantage is giving you fine-grained diff review so you can verify each change.' },
                ]
              },
              {
                id: 'cop-l12-s2-q4',
                question: 'You want to add error handling to 4 API route handlers following the same pattern. Which mode is the best fit?',
                codeBlock: null,
                options: [
                  { label: 'Edit mode — it is a pattern-based change across known files with no need to run anything', correct: true, feedback: 'Correct. Applying a consistent pattern across multiple known files is Edit mode\'s sweet spot. You describe the pattern once, it applies it across all files, and you review the diffs.' },
                  { label: 'Agent mode — you need it to run the server and test each endpoint', correct: false, feedback: 'If you just want the code changes applied, Edit mode is sufficient. Only reach for Agent mode if you also need to run and verify the endpoints.' },
                  { label: 'Ask mode — have it generate the error handling code for you to copy', correct: false, feedback: 'Ask mode is read-only and would require manual copy-paste. Edit mode directly applies the changes to the actual files.' },
                  { label: 'Create a VS Code snippet and apply it manually', correct: false, feedback: 'A snippet is static text expansion. Copilot Edit mode understands each handler\'s context and adapts the error handling pattern accordingly.' },
                ]
              },
              {
                id: 'cop-l12-s2-q5',
                question: 'A developer used Agent mode to add a feature but it also reformatted unrelated files. How could they have avoided this?',
                codeBlock: null,
                options: [
                  { label: 'Use Edit mode for targeted changes — it only modifies what you direct it to, giving you diff review over every change', correct: true, feedback: 'Correct. Agent mode\'s autonomy can lead to side effects like reformatting. Edit mode is user-directed: you specify exactly what to change, and its diff review lets you catch any unintended modifications before they are applied.' },
                  { label: 'Use Ask mode to plan the changes first', correct: false, feedback: 'Planning helps but does not prevent Agent mode from making unintended changes. Edit mode\'s controlled workflow is the real solution.' },
                  { label: 'Always run Agent mode with Autopilot turned off', correct: false, feedback: 'Permission levels control tool approval, not what the agent decides to change. Edit mode is the better tool for controlled, targeted edits.' },
                  { label: 'There is no way to prevent this — Agent mode always reformats', correct: false, feedback: 'Agent mode does not always reformat. But Edit mode avoids the issue entirely by giving you control over exactly which changes are applied.' },
                ]
              },
            ]
          },
          {
            id: 'cop-l12-s3',
            title: 'Set 3 — Ask Mode',
            cards: [
              {
                id: 'cop-l12-s3-q1',
                question: 'You just joined a new team and want to understand how their payment processing module works. You do not want to accidentally change anything. Which mode?',
                codeBlock: null,
                options: [
                  { label: 'Ask mode — it is read-only, so it can explore and explain the codebase without any risk of accidental modifications', correct: true, feedback: 'Correct. Ask mode is strictly read-only. It can trace through files, explain architecture, and answer questions — but it will never modify files or run commands. Perfect for safely learning an unfamiliar codebase.' },
                  { label: 'Agent mode — it can run the app so you can see the payment flow in action', correct: false, feedback: 'Running an unfamiliar payment system is risky. Ask mode can explain the flow by reading the code, with zero risk of side effects.' },
                  { label: 'Edit mode — open each file and read through it', correct: false, feedback: 'Edit mode is for making changes, not just reading. Ask mode is purpose-built for comprehension without any modification risk.' },
                  { label: 'None of these — just read the documentation', correct: false, feedback: 'Documentation may be outdated. Ask mode reads the actual current code and synthesizes information across many files faster than manual reading.' },
                ]
              },
              {
                id: 'cop-l12-s3-q2',
                question: 'You are reviewing a pull request and want to understand what a complex regex does before approving. Which mode?',
                codeBlock: null,
                options: [
                  { label: 'Ask mode — you need an explanation, not code changes', correct: true, feedback: 'Correct. During code review, you want to understand code, not modify it. Ask mode can explain the regex pattern, describe what it matches, and flag edge cases — all without touching the codebase.' },
                  { label: 'Agent mode — have it write test cases for the regex', correct: false, feedback: 'Writing tests changes the codebase. For pure understanding during review, Ask mode is the right choice.' },
                  { label: 'Edit mode — have it add comments explaining the regex', correct: false, feedback: 'Adding comments modifies the file. You just want to understand the regex for review purposes — Ask mode provides the explanation in chat.' },
                  { label: 'Use an online regex tool instead', correct: false, feedback: 'Ask mode can explain the regex in context of the surrounding code, which an isolated regex tool cannot do.' },
                ]
              },
              {
                id: 'cop-l12-s3-q3',
                question: 'You asked Ask mode to refactor a function for you, but nothing happened. Why?',
                codeBlock: null,
                options: [
                  { label: 'Ask mode is read-only — it cannot modify files, run commands, or make any changes to your workspace', correct: true, feedback: 'Correct. Ask mode can only read and explain. For refactoring, you need Edit mode (targeted changes) or Agent mode (if you also want to run tests afterward).' },
                  { label: 'There was a bug in Copilot — Ask mode should be able to refactor', correct: false, feedback: 'This is by design, not a bug. Ask mode is intentionally read-only for safe exploration and comprehension.' },
                  { label: 'You need to select the code first before Ask mode can modify it', correct: false, feedback: 'Selecting code does not change Ask mode\'s capabilities. It is fundamentally read-only regardless of selection.' },
                  { label: 'Ask mode only refactors if you use a slash command like /refactor', correct: false, feedback: 'No slash command gives Ask mode write capabilities. It is always read-only. Switch to Edit mode for refactoring.' },
                ]
              },
              {
                id: 'cop-l12-s3-q4',
                question: 'A developer needs to trace how an API request flows from the controller through 6 middleware functions to the database. What advantage does Ask mode have over manually reading each file?',
                codeBlock: null,
                options: [
                  { label: 'It synthesizes information across all files at once — tracing imports, following call chains, and explaining the end-to-end flow faster than reading linearly', correct: true, feedback: 'Correct. Ask mode can pull context from many files simultaneously, follow the chain of calls, and present a coherent explanation of the full request flow — a task that would take much longer by manual file-by-file reading.' },
                  { label: 'It runs the API request and shows the actual execution trace', correct: false, feedback: 'Ask mode is read-only and cannot run code. Its advantage is static analysis across many files, not runtime tracing.' },
                  { label: 'It generates a UML diagram of the flow', correct: false, feedback: 'Ask mode provides text explanations in chat, not diagrams. Its strength is synthesizing information across files quickly.' },
                  { label: 'It only reads the files that matter and skips irrelevant ones', correct: false, feedback: 'While it focuses on relevant files, the key advantage is synthesizing cross-file information into a coherent explanation — something manual reading cannot easily do.' },
                ]
              },
              {
                id: 'cop-l12-s3-q5',
                question: 'Your team lead wants Copilot to explain the codebase to new hires but is worried about AI accidentally modifying production code. What is the safest setup?',
                codeBlock: null,
                options: [
                  { label: 'Have new hires use Ask mode exclusively — it is physically incapable of modifying files or running commands', correct: true, feedback: 'Correct. Ask mode is the zero-risk option. It can explain architecture, trace data flows, and answer questions, but it literally cannot write to files or execute terminal commands. Perfect for safe onboarding.' },
                  { label: 'Use Agent mode but set permissions to Default so nothing runs without approval', correct: false, feedback: 'Default permissions still allow modifications after approval. Ask mode eliminates the risk entirely — there is nothing to accidentally approve.' },
                  { label: 'Use Edit mode but tell them to reject all diffs', correct: false, feedback: 'Relying on humans to always reject is error-prone. Ask mode removes the possibility of modifications entirely.' },
                  { label: 'Disable Copilot and just use documentation', correct: false, feedback: 'Ask mode gives new hires an interactive way to explore the codebase safely. Disabling it loses that learning advantage.' },
                ]
              },
            ]
          },
          {
            id: 'cop-l12-s4',
            title: 'Set 4 — Mode Selection',
            cards: [
              {
                id: 'cop-l12-s4-q1',
                question: 'You need to migrate a database schema, update the ORM models, and verify the migration runs without errors. Which mode?',
                codeBlock: null,
                options: [
                  { label: 'Agent mode — it can edit models, run the migration command, check for errors, and fix them in a loop', correct: true, feedback: 'Correct. This task requires editing code, running terminal commands (migration scripts), observing output for errors, and iterating. Only Agent mode can execute the full loop.' },
                  { label: 'Edit mode — it can update all the model files at once', correct: false, feedback: 'Edit mode can update the model files, but it cannot run the migration or verify it succeeds. You need Agent mode for the terminal execution.' },
                  { label: 'Ask mode first to plan the migration, then Edit mode to apply it', correct: false, feedback: 'This two-step approach skips verification. Agent mode handles the entire workflow including running the migration and fixing any issues.' },
                  { label: 'Edit mode with manual terminal work between steps', correct: false, feedback: 'While possible, Agent mode handles this entire workflow autonomously — code changes, running migrations, and fixing errors — without manual intervention.' },
                ]
              },
              {
                id: 'cop-l12-s4-q2',
                question: 'You are pairing with a colleague and want to show them how a caching layer works by walking through the code together in VS Code. Which mode?',
                codeBlock: null,
                options: [
                  { label: 'Ask mode — it explains code without modifying anything, perfect for collaborative learning', correct: true, feedback: 'Correct. During a pairing session focused on understanding, Ask mode traces through the caching code and explains it without risk. No accidental edits while you are presenting to your colleague.' },
                  { label: 'Agent mode — have it instrument the code with logging to show the cache in action', correct: false, feedback: 'Adding instrumentation modifies the code. For a walkthrough focused on understanding, Ask mode is safer and more appropriate.' },
                  { label: 'Edit mode — add comments explaining each function', correct: false, feedback: 'The goal is a live explanation, not permanent code comments. Ask mode provides interactive explanations in chat.' },
                  { label: 'No Copilot needed — just read the code together', correct: false, feedback: 'Ask mode can synthesize information across many files and explain relationships that would take much longer to trace manually.' },
                ]
              },
              {
                id: 'cop-l12-s4-q3',
                question: 'You need to convert all callback-based API calls in a module to async/await. The module has 12 files and you want to verify nothing breaks. Which mode?',
                codeBlock: null,
                options: [
                  { label: 'Agent mode — the scale of changes plus the need to run tests and iterate makes it the right choice', correct: true, feedback: 'Correct. Converting 12 files is a large change that needs verification. Agent mode can systematically convert each file, run the test suite, and fix any issues — handling the full workflow autonomously.' },
                  { label: 'Edit mode — it can handle multi-file changes', correct: false, feedback: 'Edit mode can make the code changes but cannot run tests to verify nothing broke. At this scale, automated verification is essential.' },
                  { label: 'Ask mode to plan the conversion, then manual edits', correct: false, feedback: 'Manual conversion of 12 files is tedious and error-prone. Agent mode automates the entire process including verification.' },
                  { label: 'Edit mode file by file, testing manually after each one', correct: false, feedback: 'This is possible but slow. Agent mode can handle the entire batch conversion and verification loop more efficiently.' },
                ]
              },
              {
                id: 'cop-l12-s4-q4',
                question: 'You use Claude Code in the terminal and Copilot in VS Code. Both support an agentic loop. When would you pick Copilot\'s Agent mode over Claude Code?',
                codeBlock: null,
                options: [
                  { label: 'When you want inline diffs in the VS Code editor and GUI-based review of changes', correct: true, feedback: 'Correct. Both tools use the same plan-act-observe-iterate loop. Copilot\'s advantage is VS Code integration — inline diffs, GUI-based accept/reject, and visual context. Claude Code\'s advantage is terminal-based speed and editor independence.' },
                  { label: 'When the task is too complex for Claude Code', correct: false, feedback: 'Both tools handle complex tasks. The choice is about workflow preference (GUI vs terminal), not task complexity.' },
                  { label: 'When you need to run terminal commands — Claude Code cannot do that', correct: false, feedback: 'Claude Code runs terminal commands via its Bash tool. Both tools have comparable agentic capabilities.' },
                  { label: 'Always — Copilot is strictly better because of its GUI', correct: false, feedback: 'Each has strengths. Claude Code is faster for terminal-centric workflows and works without VS Code. The choice depends on your workflow.' },
                ]
              },
              {
                id: 'cop-l12-s4-q5',
                question: 'A developer always uses Agent mode for everything, even simple one-line changes. What principle are they violating and why does it matter?',
                codeBlock: null,
                options: [
                  { label: 'Use the least powerful mode for the task — Agent mode adds unnecessary autonomy risk for simple changes that Edit or Ask mode handle more safely', correct: true, feedback: 'Correct. The principle of least privilege applies: Ask for learning, Edit for targeted changes, Agent for multi-step work. Using Agent mode for a one-line change risks unintended side effects that Edit mode\'s controlled diffs would prevent.' },
                  { label: 'There is no problem — Agent mode can handle everything efficiently', correct: false, feedback: 'Agent mode works but offers less control. For simple changes, its autonomy is a liability, not an advantage. Edit mode is safer and faster.' },
                  { label: 'They should always start with Ask mode before any other mode', correct: false, feedback: 'The principle is not about always starting with Ask mode — it is about matching the mode to the task. A simple rename goes straight to Edit mode.' },
                  { label: 'Agent mode costs more API credits than other modes', correct: false, feedback: 'While Agent mode may use more tokens, the real concern is control and risk. More autonomous means more potential for unintended changes.' },
                ]
              },
            ]
          },
        ]
      },
      {
        id: 'cop-l13',
        title: 'Customization',
        slug: 'copilot/customization',
        cardSets: [
          {
            id: 'cop-l13-s1',
            title: 'Set 1 — Custom Instructions',
            cards: [
              {
                id: 'cop-l13-s1-q1',
                question: 'Your team wants every Copilot interaction to follow the project\'s coding standards — consistent naming, error handling patterns, and import ordering. Where do you put these rules?',
                codeBlock: null,
                options: [
                  { label: '`.github/copilot-instructions.md` — it applies repo-wide to every Copilot interaction', correct: true, feedback: 'Correct. The `.github/copilot-instructions.md` file is the repo-wide instruction source. Every Copilot interaction — Agent, Edit, or Ask mode — will follow these rules automatically.' },
                  { label: '`.vscode/settings.json` under a Copilot key', correct: false, feedback: 'VS Code settings configure the editor, not Copilot\'s behavior instructions. Use `.github/copilot-instructions.md` for coding standards.' },
                  { label: 'A comment block at the top of every source file', correct: false, feedback: 'Per-file comments are tedious to maintain. A single `.github/copilot-instructions.md` applies standards across the entire repo.' },
                  { label: 'The repository README.md', correct: false, feedback: 'README is for humans. Copilot reads its instructions from `.github/copilot-instructions.md`.' },
                ]
              },
              {
                id: 'cop-l13-s1-q2',
                question: 'Your repo has React components in `src/components/` and Python scripts in `scripts/`. You want Copilot to use hooks and TypeScript interfaces for React files, but follow PEP 8 for Python. How do you configure this?',
                codeBlock: '# .github/instructions/react-components.instructions.md\n---\napplyTo: "src/components/**/*.tsx"\n---\nUse functional components with hooks.\nAlways add TypeScript interfaces.',
                options: [
                  { label: 'Create path-specific instruction files with `applyTo` globs — one for `src/components/**/*.tsx` and one for `scripts/**/*.py`', correct: true, feedback: 'Correct. Path-specific files use `applyTo` globs in YAML frontmatter. Copilot only includes the relevant instructions when working on files that match each glob pattern.' },
                  { label: 'Put both React and Python rules in the global instructions file', correct: false, feedback: 'Global instructions would include irrelevant React rules when editing Python (and vice versa), wasting context window space. Path-specific files keep instructions targeted.' },
                  { label: 'Create separate VS Code workspaces for React and Python', correct: false, feedback: 'Path-specific instruction files handle this within a single workspace. No need to split into separate workspaces.' },
                  { label: 'This is not possible — Copilot applies the same rules to all file types', correct: false, feedback: 'Path-specific instruction files exist precisely for this use case. The `applyTo` glob targets rules to specific file patterns.' },
                ]
              },
              {
                id: 'cop-l13-s1-q3',
                question: 'Your team uses both Claude Code and Copilot. They already have a CLAUDE.md with project conventions. Do they need to duplicate everything into a Copilot-specific file?',
                codeBlock: null,
                options: [
                  { label: 'No — Copilot can read CLAUDE.md and AGENTS.md as additional instruction sources for cross-tool compatibility', correct: true, feedback: 'Correct. Copilot recognizes CLAUDE.md (Claude Code) and AGENTS.md (Cursor/Windsurf) automatically. Teams can maintain one instruction set that works across multiple AI tools.' },
                  { label: 'Yes — Copilot only reads `.github/copilot-instructions.md` and ignores all other files', correct: false, feedback: 'Copilot supports CLAUDE.md and AGENTS.md for cross-tool compatibility. No duplication needed.' },
                  { label: 'You must rename CLAUDE.md to copilot-instructions.md', correct: false, feedback: 'No renaming needed. Copilot reads CLAUDE.md directly from its original location.' },
                  { label: 'Only if the team switches entirely to Copilot', correct: false, feedback: 'Copilot can read CLAUDE.md even when both tools are used simultaneously. It is designed for multi-tool teams.' },
                ]
              },
              {
                id: 'cop-l13-s1-q4',
                question: 'Your repo has a CLAUDE.md, a `.github/copilot-instructions.md`, and a path-specific instruction file for tests. When Copilot works on a test file, which instructions take precedence?',
                codeBlock: null,
                options: [
                  { label: 'Path-specific instructions (highest) > `.github/copilot-instructions.md` > CLAUDE.md (lowest) — more specific wins', correct: true, feedback: 'Correct. Copilot applies a specificity hierarchy. Path-specific files scoped by glob are most specific, the repo-level Copilot file is next, and compatibility files like CLAUDE.md have the lowest priority.' },
                  { label: 'CLAUDE.md always wins because it was there first', correct: false, feedback: 'CLAUDE.md is a compatibility source with the lowest priority. Copilot\'s native files take precedence.' },
                  { label: 'All instructions are merged equally with no priority order', correct: false, feedback: 'Instructions have a defined hierarchy. More specific sources (path-scoped) take precedence over general sources.' },
                  { label: 'Only one instruction file is active at a time — the most recently modified one', correct: false, feedback: 'Multiple instruction sources are combined simultaneously, with priority determined by specificity, not modification date.' },
                ]
              },
              {
                id: 'cop-l13-s1-q5',
                question: 'Your global instructions file has grown to 500 lines covering React, Python, Go, and testing conventions. What is the problem and how do you fix it?',
                codeBlock: null,
                options: [
                  { label: 'It wastes context window on irrelevant rules — split into path-specific instruction files so each file type only loads its relevant instructions', correct: true, feedback: 'Correct. When editing a Go file, 400 lines of React/Python/testing rules are irrelevant noise in the context window. Path-specific files with `applyTo` globs ensure Copilot only loads instructions relevant to the file being edited.' },
                  { label: 'The file is too large for Copilot to read — reduce it to under 100 lines', correct: false, feedback: 'There is no strict line limit. The issue is context relevance, not file size. Path-specific files solve this by scoping instructions to matching file patterns.' },
                  { label: 'Nothing is wrong — more instructions always produce better results', correct: false, feedback: 'Irrelevant instructions dilute the context window and can confuse the model. Focused, relevant instructions produce better results than a large dump of everything.' },
                  { label: 'Move all instructions to CLAUDE.md instead for cross-tool compatibility', correct: false, feedback: 'Moving to CLAUDE.md does not solve the context pollution problem. You need path-specific files to scope instructions by file type.' },
                ]
              },
            ]
          },
          {
            id: 'cop-l13-s2',
            title: 'Set 2 — Custom Agents',
            cards: [
              {
                id: 'cop-l13-s2-q1',
                question: 'You want to create a reusable "API reviewer" agent that your whole team can invoke in Copilot chat. Where do you define it so it is version-controlled and shared?',
                codeBlock: null,
                options: [
                  { label: '`.github/agents/api-reviewer.agent.md` — agents live in `.github/agents/` and are committed to the repo', correct: true, feedback: 'Correct. Custom agents are markdown files in `.github/agents/` with the `.agent.md` extension. Since they are committed to git, the entire team automatically gets the same agent definitions.' },
                  { label: 'Each developer creates it in their local VS Code settings', correct: false, feedback: 'Local settings are not shared. Putting agents in `.github/agents/` makes them version-controlled and available to the whole team.' },
                  { label: '`.claude/agents/` so it works with both Claude Code and Copilot', correct: false, feedback: '`.claude/agents/` is for Claude Code agents. Copilot agents live in `.github/agents/`. Each tool reads from its own directory.' },
                  { label: 'Install it from the VS Code extension marketplace', correct: false, feedback: 'Custom agents are project-specific markdown files, not marketplace extensions. They live in `.github/agents/`.' },
                ]
              },
              {
                id: 'cop-l13-s2-q2',
                question: 'You are building a custom agent that should design REST APIs but should NOT be able to run shell commands. How do you restrict it?',
                codeBlock: '---\nname: api-designer\ndescription: Designs REST API endpoints following OpenAPI conventions\ntools:\n  - read\n  - edit\n  - search\nmodel: gpt-4o\n---',
                options: [
                  { label: 'List only the tools it needs in the YAML frontmatter — omit `execute` to prevent terminal access', correct: true, feedback: 'Correct. The `tools` list in the frontmatter controls what the agent can do. By including only `read`, `edit`, and `search` (and omitting `execute`), the agent cannot run terminal commands.' },
                  { label: 'Add a "no terminal" instruction in the system prompt body', correct: false, feedback: 'Instructions are not enforceable restrictions. The tools list in the frontmatter is the actual capability control — unlisted tools are unavailable to the agent.' },
                  { label: 'Set a permission level to "read-only" in the frontmatter', correct: false, feedback: 'There is no "read-only" permission level. You control capabilities by listing specific tools (read, edit, search, execute) in the frontmatter.' },
                  { label: 'This is not possible — all agents have access to all tools', correct: false, feedback: 'The tools list in the frontmatter is specifically designed to restrict agent capabilities. Unlisted tools are not available.' },
                ]
              },
              {
                id: 'cop-l13-s2-q3',
                question: 'You have a Claude Code agent in `.claude/agents/` that uses Bash, Read, and Grep tools. You want to port it to a Copilot agent. What changes?',
                codeBlock: null,
                options: [
                  { label: 'Move it to `.github/agents/`, rename tools to Copilot aliases (execute, read, search), and change the extension to `.agent.md`', correct: true, feedback: 'Correct. Both systems use markdown with YAML frontmatter, but the directory (`.github/agents/` vs `.claude/agents/`), tool aliases (execute/read/edit/search vs Bash/Read/Write/Grep), and file extension differ.' },
                  { label: 'Just copy the file to `.github/agents/` — everything else is identical', correct: false, feedback: 'The file format is similar but tool aliases differ. Claude Code uses Bash/Read/Grep while Copilot uses execute/read/search. You need to update the tools list.' },
                  { label: 'Rewrite the entire agent from scratch — the systems are incompatible', correct: false, feedback: 'Both use markdown with YAML frontmatter. The format is nearly identical — you just need to change the directory, tool aliases, and file extension.' },
                  { label: 'Copilot does not support custom agents, only Claude Code does', correct: false, feedback: 'Both Copilot and Claude Code fully support custom agents defined as markdown files with YAML frontmatter.' },
                ]
              },
              {
                id: 'cop-l13-s2-q4',
                question: 'A new developer on your team wants to use the custom "db-migrator" agent you defined. How do they invoke it?',
                codeBlock: null,
                options: [
                  { label: 'Type `@db-migrator` in the Copilot chat panel — custom agents are invoked with @ mentions', correct: true, feedback: 'Correct. Custom agents appear as mentionable participants in chat. The developer types `@db-migrator` followed by their request, and the agent handles it with its defined tools and system prompt.' },
                  { label: 'Run `/db-migrator` as a slash command', correct: false, feedback: 'Custom agents use the `@` mention syntax, not slash commands. Type `@db-migrator` in the chat panel.' },
                  { label: 'Open the agent file and click "Run" at the top', correct: false, feedback: 'Agent files are definitions, not scripts. Invoke agents by typing `@agent-name` in the Copilot chat.' },
                  { label: 'The agent runs automatically when database files are opened', correct: false, feedback: 'Custom agents must be explicitly invoked with `@` mentions. They do not trigger automatically based on file types.' },
                ]
              },
              {
                id: 'cop-l13-s2-q5',
                question: 'You want a "security auditor" agent that can read code and search for patterns but should never modify files or run commands. Which tools do you list?',
                codeBlock: null,
                options: [
                  { label: 'Only `read` and `search` — omit `edit` and `execute` to make it read-only', correct: true, feedback: 'Correct. By listing only `read` (file reading) and `search` (codebase search), the agent can audit code but cannot modify files (`edit`) or run commands (`execute`). The tools list is the enforcement mechanism.' },
                  { label: 'All four tools but add "do not modify files" to the system prompt', correct: false, feedback: 'System prompt instructions are suggestions, not hard restrictions. The tools list is what actually controls capabilities — omit `edit` and `execute` for true enforcement.' },
                  { label: 'There is no way to create a read-only agent in Copilot', correct: false, feedback: 'Omitting `edit` and `execute` from the tools list creates an effectively read-only agent. The tools list controls what capabilities are available.' },
                  { label: 'Use `read`, `search`, `edit`, and `execute` with "read-only: true" flag', correct: false, feedback: 'There is no "read-only" flag. Simply omit the tools you do not want the agent to have. Only listed tools are available.' },
                ]
              },
            ]
          },
          {
            id: 'cop-l13-s3',
            title: 'Set 3 — Skills & Prompts',
            cards: [
              {
                id: 'cop-l13-s3-q1',
                question: 'Your team has a complex multi-step deployment verification process — checking health endpoints, validating database migrations, and verifying rollback procedures. Should this be a prompt file or a skill?',
                codeBlock: null,
                options: [
                  { label: 'A skill — it is a structured capability with its own directory, supporting complex multi-step workflows that agents can invoke', correct: true, feedback: 'Correct. Skills live in `.github/skills/*/SKILL.md` and define structured capabilities. Complex multi-step processes with their own supporting files belong as skills. Prompt files are better for simpler, template-based tasks.' },
                  { label: 'A prompt file — it is just a sequence of steps', correct: false, feedback: 'Prompt files are lightweight templates. A complex multi-step process with supporting files and structured logic is better modeled as a skill with its own directory.' },
                  { label: 'Neither — use a GitHub Actions workflow instead', correct: false, feedback: 'Skills let Copilot perform the verification interactively with the developer. GitHub Actions run in CI/CD. Both have their place, but this asks about Copilot capabilities.' },
                  { label: 'A custom agent — only agents can handle multi-step tasks', correct: false, feedback: 'Skills provide the structured capability that agents (or users) can invoke. The skill defines the "what," and agents can use it as a building block.' },
                ]
              },
              {
                id: 'cop-l13-s3-q2',
                question: 'You want a reusable template that scaffolds a new API endpoint whenever a developer provides a path and HTTP method. What should you create?',
                codeBlock: '# .github/prompts/add-api-endpoint.prompt.md\n---\nname: add-api-endpoint\ndescription: Scaffolds a new REST API endpoint\n---\nCreate a new endpoint at ${input:path} with method ${input:method} that:\n- Follows our REST conventions\n- Includes validation\n- Has error handling',
                options: [
                  { label: 'A prompt file (`.prompt.md`) with `${input:...}` variables — it is a lightweight template perfect for parameterized scaffolding', correct: true, feedback: 'Correct. Prompt files in `.github/prompts/` are lightweight templates that support `${input:name}` variables. When invoked, Copilot asks the user for each input value and fills in the template.' },
                  { label: 'A full skill with its own directory', correct: false, feedback: 'A skill is overkill for a template. Prompt files are the lightweight choice for parameterized templates that do not need complex multi-step logic.' },
                  { label: 'A VS Code snippet with tab stops', correct: false, feedback: 'VS Code snippets are static text expansion. A prompt file leverages Copilot\'s AI to generate context-aware code adapted to the project.' },
                  { label: 'A custom agent dedicated to API creation', correct: false, feedback: 'A dedicated agent is overkill for a template. Prompt files are designed exactly for this use case — reusable templates with runtime variables.' },
                ]
              },
              {
                id: 'cop-l13-s3-q3',
                question: 'A developer wants to quickly create a new prompt file for their team. What is the fastest way?',
                codeBlock: null,
                options: [
                  { label: 'Type `/create-prompt` in Copilot chat — it interactively guides you through creating the file in the right directory', correct: true, feedback: 'Correct. The `/create-prompt` (and `/create-skill`) slash commands walk you through the creation process interactively, ensuring correct file placement and formatting.' },
                  { label: 'Manually write a markdown file and hope the format is correct', correct: false, feedback: 'Manual creation works but is error-prone. The `/create-prompt` command ensures correct formatting, directory placement, and frontmatter structure.' },
                  { label: 'Copy a prompt from the GitHub Marketplace', correct: false, feedback: 'Prompt files are project-specific and created locally. The `/create-prompt` command is the fastest interactive approach.' },
                  { label: 'Use Agent mode to generate the prompt file', correct: false, feedback: 'Agent mode could do this, but `/create-prompt` is purpose-built for this task and provides a guided experience.' },
                ]
              },
              {
                id: 'cop-l13-s3-q4',
                question: 'You created a prompt file that reviews code for security issues. You want it to analyze whatever code the developer has selected in the editor. Which variable do you use?',
                codeBlock: null,
                options: [
                  { label: '`${selection}` — it injects the current editor selection into the prompt', correct: true, feedback: 'Correct. `${selection}` captures whatever code is highlighted in the editor when the prompt is invoked. Combined with `${input:name}` for user-provided values, prompts become dynamic and context-aware.' },
                  { label: '`${clipboard}` — the developer copies the code first', correct: false, feedback: 'There is no `${clipboard}` variable. `${selection}` directly injects the current editor selection, no copy-paste needed.' },
                  { label: '`${file}` — it reads the entire current file', correct: false, feedback: 'The developer wants to analyze a specific selection, not the whole file. `${selection}` captures exactly what is highlighted.' },
                  { label: 'Variables cannot reference editor state — you must paste the code manually', correct: false, feedback: '`${selection}` exists precisely to reference editor state. It injects the selected code automatically.' },
                ]
              },
              {
                id: 'cop-l13-s3-q5',
                question: 'Your team has both a Claude Code custom slash command and wants the same functionality in Copilot. What is the closest Copilot equivalent to Claude Code\'s `/command` skill files?',
                codeBlock: null,
                options: [
                  { label: 'Prompt files in `.github/prompts/` — they serve the same purpose as reusable templates invokable from chat', correct: true, feedback: 'Correct. Claude Code skills (`.claude/skills/`) and Copilot prompt files (`.github/prompts/`) serve similar roles — reusable, parameterized templates that developers invoke from chat. The directory and format differ slightly.' },
                  { label: 'There is no Copilot equivalent — this is a Claude Code-only feature', correct: false, feedback: 'Copilot has prompt files (`.prompt.md`) and skills (`.github/skills/`) that provide equivalent functionality to Claude Code\'s slash commands.' },
                  { label: 'VS Code keyboard shortcuts mapped to Copilot commands', correct: false, feedback: 'Keyboard shortcuts are for editor actions. Prompt files are the reusable template equivalent of Claude Code\'s skill system.' },
                  { label: 'Custom agents are the only reusable abstraction in Copilot', correct: false, feedback: 'Copilot has prompt files and skills in addition to custom agents. Prompt files are the lightweight equivalent of Claude Code skill slash commands.' },
                ]
              },
            ]
          },
          {
            id: 'cop-l13-s4',
            title: 'Set 4 — MCP Servers',
            cards: [
              {
                id: 'cop-l13-s4-q1',
                question: 'You want your whole team to have access to a Jira MCP server when using Copilot. Where do you configure it so the config is shared via git?',
                codeBlock: null,
                options: [
                  { label: '`.vscode/mcp.json` — it is version-controlled and shared with the team when committed', correct: true, feedback: 'Correct. MCP server configuration for Copilot lives in `.vscode/mcp.json`. Since it is a file in the repo, committing it shares the MCP configuration with the whole team.' },
                  { label: '`.github/mcp-servers.yml` alongside other GitHub config', correct: false, feedback: 'MCP config for Copilot in VS Code lives in `.vscode/mcp.json`, not in the `.github/` directory.' },
                  { label: 'Each developer configures it in their personal VS Code settings', correct: false, feedback: 'Personal settings are not shared. `.vscode/mcp.json` in the repo is the team-shared location.' },
                  { label: '`.claude/settings.json` since MCP config is tool-agnostic', correct: false, feedback: '`.claude/settings.json` is for Claude Code. Copilot reads MCP config from `.vscode/mcp.json`.' },
                ]
              },
              {
                id: 'cop-l13-s4-q2',
                question: 'You have an MCP server running as a local Node.js process on your machine and another hosted on a remote API. Which transport types would you use for each?',
                codeBlock: null,
                options: [
                  { label: 'stdio for the local process (runs as a child process), HTTP or SSE for the remote server', correct: true, feedback: 'Correct. stdio launches the server as a local child process communicating via stdin/stdout. Remote servers use HTTP (streamable) or SSE (server-sent events) transports for network communication.' },
                  { label: 'HTTP for both — it is the universal transport', correct: false, feedback: 'HTTP works for remote servers, but local processes are better served by stdio, which runs them as child processes without network overhead.' },
                  { label: 'WebSocket for the local one, gRPC for the remote one', correct: false, feedback: 'MCP does not use WebSocket or gRPC. The supported transports are stdio, HTTP, and SSE.' },
                  { label: 'The same transport works for both — there is no distinction', correct: false, feedback: 'Different transports serve different needs. stdio is optimized for local processes; HTTP and SSE are designed for remote servers.' },
                ]
              },
              {
                id: 'cop-l13-s4-q3',
                question: 'Your team is worried about a third-party MCP server accessing sensitive files on developer machines. What built-in VS Code protection addresses this?',
                codeBlock: null,
                options: [
                  { label: 'MCP server sandboxing — processes run in isolated sandboxes that limit what they can access on the system', correct: true, feedback: 'Correct. VS Code sandboxes MCP server processes, restricting their system access. This prevents a malicious or buggy server from reading sensitive files or making unauthorized system changes.' },
                  { label: 'There is no protection — you must trust every MCP server completely', correct: false, feedback: 'VS Code provides sandboxing for MCP servers, limiting their system access as a security measure.' },
                  { label: 'VS Code requires OAuth approval before any MCP server can access files', correct: false, feedback: 'The protection is process sandboxing, not OAuth. Sandboxing restricts what the server process can access at the OS level.' },
                  { label: 'MCP servers cannot access the file system at all', correct: false, feedback: 'MCP servers can access files within their sandbox. The sandboxing limits the scope of that access to prevent abuse.' },
                ]
              },
              {
                id: 'cop-l13-s4-q4',
                question: 'You are designing an MCP server that provides tools for a project management system. You planned 200 tools. Why is this a problem in Copilot?',
                codeBlock: null,
                options: [
                  { label: 'Copilot limits each MCP server to 128 tools — too many tool definitions bloat the context window and degrade AI performance', correct: true, feedback: 'Correct. The 128-tool limit exists because every tool definition consumes context window space. More tools means less room for actual code context. Design focused servers with fewer, well-composed tools.' },
                  { label: 'There is no tool limit — 200 tools would work fine', correct: false, feedback: 'Copilot enforces a 128-tool limit per MCP server. You would need to redesign your server to stay under this limit.' },
                  { label: 'The problem is performance — each tool adds latency', correct: false, feedback: 'The primary concern is context window consumption, not latency. Each tool definition takes up tokens that could be used for code context.' },
                  { label: 'You can only have 10 tools per MCP server', correct: false, feedback: 'The limit is 128, not 10. But 200 exceeds it. The limit encourages focused server design.' },
                ]
              },
              {
                id: 'cop-l13-s4-q5',
                question: 'You configured an MCP server in `.vscode/mcp.json` for Copilot. Your teammate uses Claude Code and wants the same server. Do they use the same config file?',
                codeBlock: null,
                options: [
                  { label: 'No — Claude Code reads MCP config from `.claude/settings.json` or `~/.claude.json`, not `.vscode/mcp.json`', correct: true, feedback: 'Correct. Each tool has its own MCP config location. Copilot uses `.vscode/mcp.json`, Claude Code uses `.claude/settings.json` (project) or `~/.claude.json` (user). The server itself is the same, just configured in different files.' },
                  { label: 'Yes — `.vscode/mcp.json` is the universal MCP config file', correct: false, feedback: '`.vscode/mcp.json` is Copilot-specific. Claude Code uses `.claude/settings.json` for project-level MCP config.' },
                  { label: 'Claude Code does not support MCP servers', correct: false, feedback: 'Claude Code fully supports MCP servers, configured in `.claude/settings.json` or `~/.claude.json`.' },
                  { label: 'They must use the same config file or the server will conflict', correct: false, feedback: 'Each tool reads its own config file independently. The same MCP server can be configured in both tools simultaneously without conflicts.' },
                ]
              },
            ]
          },
        ]
      },
      {
        id: 'cop-l14',
        title: 'Advanced Features',
        slug: 'copilot/cloud-agents',
        cardSets: [
          {
            id: 'cop-l14-s1',
            title: 'Set 1 — Background & Cloud Agents',
            cards: [
              {
                id: 'cop-l14-s1-q1',
                question: 'You want Copilot to work on a feature while you continue coding something else in the same repo. Which agent type lets you both work simultaneously without conflicts?',
                codeBlock: null,
                options: [
                  { label: 'A background agent — it creates a separate git worktree so it works on a different branch without touching your current workspace', correct: true, feedback: 'Correct. Background agents use git worktrees for isolation. They work on a separate branch in a separate directory, so you can keep coding without conflicts or file locking issues.' },
                  { label: 'A local agent — it pauses your work and takes over the editor', correct: false, feedback: 'Local agents run in your VS Code and share your workspace. Background agents are designed for parallel work via worktree isolation.' },
                  { label: 'A cloud agent — it runs on GitHub servers and never touches your machine', correct: false, feedback: 'Cloud agents run remotely and create PRs, but background agents are the local solution for working in parallel on the same machine.' },
                  { label: 'Any agent type — they all run in isolation by default', correct: false, feedback: 'Local agents share your workspace. Only background agents create a separate worktree for isolated parallel work.' },
                ]
              },
              {
                id: 'cop-l14-s1-q2',
                question: 'Your team lead tagged a GitHub Issue with "copilot" and wants the AI to implement it without any developer opening VS Code. Which agent type handles this and what does it deliver?',
                codeBlock: null,
                options: [
                  { label: 'A cloud agent — it runs on GitHub\'s infrastructure and creates a pull request with the changes for review', correct: true, feedback: 'Correct. Cloud agents run entirely on GitHub\'s servers. They pick up Issues, implement changes, and deliver a PR. No local environment needed — the work happens in the cloud and the result is a reviewable PR.' },
                  { label: 'A background agent — it runs locally and pushes a branch', correct: false, feedback: 'Background agents need a local machine running. Cloud agents are the fully remote option that runs on GitHub infrastructure.' },
                  { label: 'A local agent that auto-merges the fix', correct: false, feedback: 'Local agents need VS Code open. Cloud agents are the hands-off option, and they create PRs for review — they never auto-merge.' },
                  { label: 'This is not possible — a developer must always be involved', correct: false, feedback: 'Cloud agents can implement Issues autonomously on GitHub\'s infrastructure and deliver PRs without any developer intervention.' },
                ]
              },
              {
                id: 'cop-l14-s1-q3',
                question: 'Your project uses a specific Node.js version, requires PostgreSQL, and needs to run `npm ci` before working. How do you tell cloud agents about this environment setup?',
                codeBlock: null,
                options: [
                  { label: 'Define the steps in `copilot-setup-steps.yml` — a GitHub Actions workflow that cloud agents run to prepare their environment', correct: true, feedback: 'Correct. `copilot-setup-steps.yml` tells cloud agents how to set up the dev environment. It runs as a GitHub Actions workflow, installing the right Node version, starting PostgreSQL, and running npm ci before the agent begins work.' },
                  { label: 'Add setup instructions to `.github/copilot-instructions.md`', correct: false, feedback: 'Instruction files guide the AI\'s behavior, not its environment setup. `copilot-setup-steps.yml` is the executable workflow that actually installs dependencies and configures the environment.' },
                  { label: 'Cloud agents automatically detect your project setup from package.json', correct: false, feedback: 'Cloud agents need explicit setup steps. They do not auto-detect environments — you define the setup in `copilot-setup-steps.yml`.' },
                  { label: 'This is not needed — cloud agents use the same environment as GitHub Actions CI', correct: false, feedback: 'Cloud agents have their own setup workflow (`copilot-setup-steps.yml`). While the format is similar to Actions, it is a separate configuration for agent environments.' },
                ]
              },
              {
                id: 'cop-l14-s1-q4',
                question: 'You are building a large feature with Agent mode and realize one subtask (writing migration scripts) is independent from the main work. How do you parallelize this?',
                codeBlock: null,
                options: [
                  { label: 'Use `/delegate` to spawn a sub-agent for the migration subtask — it works independently while the main agent continues', correct: true, feedback: 'Correct. `/delegate` creates a sub-agent that handles the subtask autonomously. The main agent keeps working on the primary feature while the sub-agent writes the migration scripts in parallel.' },
                  { label: 'Open a second VS Code window and start another Agent mode session', correct: false, feedback: 'While a second window works manually, `/delegate` is the built-in mechanism for agent-driven task decomposition without manual intervention.' },
                  { label: 'Ask the agent to finish the current task first, then handle migrations', correct: false, feedback: 'Sequential work is slower. `/delegate` enables parallel subtask execution, which is the whole point of sub-agents.' },
                  { label: 'Convert it to a cloud agent task by creating a GitHub Issue', correct: false, feedback: 'Cloud agents are for fully remote work. `/delegate` creates a local sub-agent for quick parallel subtask execution within your current session.' },
                ]
              },
              {
                id: 'cop-l14-s1-q5',
                question: 'You need to decide between a background agent and a cloud agent for a task. What is the key trade-off?',
                codeBlock: null,
                options: [
                  { label: 'Background agents run locally with access to your full environment; cloud agents run remotely but need explicit setup via `copilot-setup-steps.yml`', correct: true, feedback: 'Correct. Background agents inherit your local environment (tools, databases, configs) but use your machine\'s resources. Cloud agents run on GitHub infrastructure (no local resource cost) but need their environment explicitly defined.' },
                  { label: 'Cloud agents are faster because they run on powerful servers', correct: false, feedback: 'The key trade-off is environment access, not speed. Background agents have your local tools; cloud agents need explicit setup.' },
                  { label: 'Background agents cost more because they use local compute', correct: false, feedback: 'The trade-off is not cost but environment configuration. Background agents automatically access your local setup; cloud agents need `copilot-setup-steps.yml`.' },
                  { label: 'There is no practical difference — use whichever is available', correct: false, feedback: 'The trade-off is significant: local environment access vs. remote execution with explicit setup. Choose based on whether the task needs your local tools.' },
                ]
              },
            ]
          },
          {
            id: 'cop-l14-s2',
            title: 'Set 2 — Hooks',
            cards: [
              {
                id: 'cop-l14-s2-q1',
                question: 'Where are Copilot hooks defined?',
                codeBlock: null,
                options: [
                  { label: '`.github/hooks/hooks.json`', correct: true, feedback: 'Correct. Copilot hooks are defined in `.github/hooks/hooks.json`, which maps event types to shell commands that run at specific points in the agent\'s workflow.' },
                  { label: '`.git/hooks/` alongside git hooks', correct: false, feedback: 'Copilot hooks are separate from git hooks. They live in `.github/hooks/hooks.json`.' },
                  { label: '`.vscode/settings.json` under `copilot.hooks`', correct: false, feedback: 'Copilot hooks have their own dedicated file at `.github/hooks/hooks.json`.' },
                  { label: '`.github/workflows/` as GitHub Actions', correct: false, feedback: 'Copilot hooks are JSON-configured shell commands, not GitHub Actions workflows.' },
                ]
              },
              {
                id: 'cop-l14-s2-q2',
                question: 'How many event types can trigger a Copilot hook?',
                codeBlock: null,
                options: [
                  { label: '6 event types', correct: true, feedback: 'Correct. Copilot supports 6 hook event types that trigger at different points in the agent workflow — before and after tool execution, and at other lifecycle points.' },
                  { label: '2 — only before and after agent runs', correct: false, feedback: 'There are 6 event types, covering more granular lifecycle points than just start and end.' },
                  { label: '12 event types', correct: false, feedback: 'There are 6 hook event types, not 12.' },
                  { label: 'Unlimited — you can define custom event types', correct: false, feedback: 'The event types are predefined. There are exactly 6 of them.' },
                ]
              },
              {
                id: 'cop-l14-s2-q3',
                question: 'What special capability does the `preToolUse` hook event have?',
                codeBlock: null,
                options: [
                  { label: 'It can block a tool from executing by returning a rejection signal', correct: true, feedback: 'Correct. `preToolUse` runs before a tool executes and can prevent the execution entirely. This is useful for enforcing policies — e.g., blocking file writes to certain directories or preventing dangerous commands.' },
                  { label: 'It runs the tool faster by pre-loading resources', correct: false, feedback: '`preToolUse` is for policy enforcement (blocking), not performance optimization.' },
                  { label: 'It modifies the tool\'s output before the agent sees it', correct: false, feedback: 'That would be a post-tool hook. `preToolUse` runs before execution and can block it entirely.' },
                  { label: 'It logs all tool usage to a remote server', correct: false, feedback: 'While you could implement logging in a hook, the unique capability of `preToolUse` is blocking tool execution.' },
                ]
              },
              {
                id: 'cop-l14-s2-q4',
                question: 'How do hooks receive input and return output?',
                codeBlock: null,
                options: [
                  { label: 'JSON input via stdin, JSON output via stdout', correct: true, feedback: 'Correct. Hooks receive a JSON payload on stdin describing the event context, and return a JSON response on stdout. This standard interface works with any programming language.' },
                  { label: 'Command-line arguments for input, exit codes for output', correct: false, feedback: 'Hooks use JSON via stdin/stdout, not CLI arguments and exit codes.' },
                  { label: 'Environment variables for input, files for output', correct: false, feedback: 'Hooks use stdin/stdout JSON communication, not environment variables and files.' },
                  { label: 'HTTP requests to a webhook URL', correct: false, feedback: 'Hooks are local shell commands that communicate via stdin/stdout JSON, not HTTP webhooks.' },
                ]
              },
              {
                id: 'cop-l14-s2-q5',
                question: 'Why would you configure a timeout for a hook?',
                codeBlock: null,
                options: [
                  { label: 'To prevent a slow or hanging hook from blocking the agent\'s workflow indefinitely', correct: true, feedback: 'Correct. Hooks run synchronously — the agent waits for them to complete. A timeout ensures that a stuck hook is killed after a reasonable duration so the agent can continue.' },
                  { label: 'To limit how long the AI model can think about the response', correct: false, feedback: 'Hook timeouts apply to the external shell command, not the AI model\'s thinking time.' },
                  { label: 'To schedule hooks to run at specific times of day', correct: false, feedback: 'Timeouts are maximum durations, not scheduled times. Hooks trigger on agent events, not schedules.' },
                  { label: 'Timeouts are required — hooks won\'t work without one', correct: false, feedback: 'Timeouts are optional configuration for safety, not a requirement.' },
                ]
              },
            ]
          },
          {
            id: 'cop-l14-s3',
            title: 'Set 3 — Copilot vs Claude Code',
            cards: [
              {
                id: 'cop-l14-s3-q1',
                question: 'Where do custom instructions live in Copilot vs Claude Code?',
                codeBlock: null,
                options: [
                  { label: 'Copilot: `.github/copilot-instructions.md` · Claude Code: `CLAUDE.md`', correct: true, feedback: 'Correct. Copilot uses `.github/copilot-instructions.md` for repo-wide instructions, while Claude Code uses `CLAUDE.md` in the repo root (plus `.claude/` directory for additional config).' },
                  { label: 'Both use `CLAUDE.md`', correct: false, feedback: 'Copilot has its own instruction file at `.github/copilot-instructions.md`. It can read CLAUDE.md for compatibility, but that is not its primary location.' },
                  { label: 'Copilot: `settings.json` · Claude Code: `config.yml`', correct: false, feedback: 'Neither tool uses those files for custom instructions. Copilot uses `.github/copilot-instructions.md` and Claude Code uses `CLAUDE.md`.' },
                  { label: 'Both use `.github/instructions.md`', correct: false, feedback: 'Copilot uses `.github/copilot-instructions.md` specifically. Claude Code uses `CLAUDE.md`.' },
                ]
              },
              {
                id: 'cop-l14-s3-q2',
                question: 'How do custom agent file locations differ between Copilot and Claude Code?',
                codeBlock: null,
                options: [
                  { label: 'Copilot: `.github/agents/*.agent.md` · Claude Code: `.claude/agents/*.md`', correct: true, feedback: 'Correct. Both use markdown files with YAML frontmatter, but in different directories. Copilot agents use the `.agent.md` extension; Claude Code agents use plain `.md`.' },
                  { label: 'Both use `.github/agents/`', correct: false, feedback: 'Claude Code uses `.claude/agents/`, not `.github/agents/`.' },
                  { label: 'Both use `.claude/agents/`', correct: false, feedback: 'Copilot uses `.github/agents/`, not `.claude/agents/`.' },
                  { label: 'Copilot uses YAML files, Claude Code uses markdown files', correct: false, feedback: 'Both use markdown files with YAML frontmatter. The difference is the directory location and file extension.' },
                ]
              },
              {
                id: 'cop-l14-s3-q3',
                question: 'How do hook configurations differ between Copilot and Claude Code?',
                codeBlock: null,
                options: [
                  { label: 'Copilot: `.github/hooks/hooks.json` · Claude Code: `.claude/settings.json` under hooks key', correct: true, feedback: 'Correct. Copilot has a dedicated hooks file at `.github/hooks/hooks.json`. Claude Code configures hooks within its settings file at `.claude/settings.json`.' },
                  { label: 'Both use `.github/hooks/`', correct: false, feedback: 'Claude Code does not use `.github/hooks/`. It configures hooks in `.claude/settings.json`.' },
                  { label: 'Neither tool supports hooks', correct: false, feedback: 'Both support hooks — Copilot in `.github/hooks/hooks.json` and Claude Code in `.claude/settings.json`.' },
                  { label: 'Both use git hooks in `.git/hooks/`', correct: false, feedback: 'Copilot and Claude Code hooks are separate from git hooks and live in their respective config directories.' },
                ]
              },
              {
                id: 'cop-l14-s3-q4',
                question: 'Where does MCP server configuration live in Copilot vs Claude Code?',
                codeBlock: null,
                options: [
                  { label: 'Copilot: `.vscode/mcp.json` · Claude Code: `.claude/settings.json` or `~/.claude.json`', correct: true, feedback: 'Correct. Copilot MCP config is in `.vscode/mcp.json`. Claude Code can configure MCP servers in project settings (`.claude/settings.json`) or user settings (`~/.claude.json`).' },
                  { label: 'Both use `.vscode/mcp.json`', correct: false, feedback: 'Claude Code is a CLI tool and does not use `.vscode/` configuration files.' },
                  { label: 'Both use a `mcp.json` in the repo root', correct: false, feedback: 'Copilot uses `.vscode/mcp.json` and Claude Code uses `.claude/settings.json` or user-level config.' },
                  { label: 'MCP servers are only supported in Copilot, not Claude Code', correct: false, feedback: 'Both tools support MCP servers, just configured in different locations.' },
                ]
              },
              {
                id: 'cop-l14-s3-q5',
                question: 'What is the key philosophical difference between Copilot and Claude Code\'s approach to agent configuration?',
                codeBlock: null,
                options: [
                  { label: 'Copilot centralizes config in `.github/` (GitHub ecosystem), while Claude Code uses `.claude/` and `CLAUDE.md` (tool-specific)', correct: true, feedback: 'Correct. Copilot leverages the `.github/` directory that already holds Actions, templates, and other GitHub config. Claude Code uses its own `.claude/` directory and root-level `CLAUDE.md`, keeping its config self-contained.' },
                  { label: 'They are identical — both use the same configuration approach', correct: false, feedback: 'While conceptually similar, they use different directories and file naming conventions reflecting their different ecosystems.' },
                  { label: 'Copilot is more configurable than Claude Code', correct: false, feedback: 'Both are highly configurable. The difference is organizational philosophy, not capability.' },
                  { label: 'Claude Code does not support any of the features Copilot has', correct: false, feedback: 'Both support instructions, custom agents, hooks, and MCP — just configured in different locations.' },
                ]
              },
            ]
          },
          {
            id: 'cop-l14-s4',
            title: 'Set 4 — Next Edit Suggestions & Latest',
            cards: [
              {
                id: 'cop-l14-s4-q1',
                question: 'You just renamed a function parameter in a React component. Now 5 other files reference the old name. How does Copilot help?',
                codeBlock: null,
                options: [
                  { label: 'Next Edit Suggestions predicts the related changes across files and lets you Tab through each fix', correct: true, feedback: 'Correct. NES tracks your recent edits and predicts where related changes are needed. It jumps you to each location with a suggested fix — just press Tab to accept and move to the next.' },
                  { label: 'You must use Agent mode to find and fix all references', correct: false, feedback: 'Agent mode works but is overkill for this. NES handles cascading renames efficiently by predicting each next edit location.' },
                  { label: 'Copilot cannot help — use VS Code\'s built-in rename symbol', correct: false, feedback: 'While rename symbol works for simple renames, NES handles more complex cascading changes that go beyond simple symbol renaming.' },
                  { label: 'Edit mode will find and fix all references in one step', correct: false, feedback: 'Edit mode requires you to select files manually. NES proactively predicts and suggests each related change.' },
                ]
              },
              {
                id: 'cop-l14-s4-q2',
                question: 'Your team uses a monorepo with 4 packages. You want Copilot instructions from the root to apply to all packages. What do you need?',
                codeBlock: null,
                options: [
                  { label: 'Enable `chat.useCustomizationsInParentRepositories` so child packages inherit root instructions', correct: true, feedback: 'Correct. This setting lets Copilot discover and apply instructions, agents, and skills from parent repository directories — essential for monorepos where shared standards live at the root.' },
                  { label: 'Copy the instructions file into each package directory', correct: false, feedback: 'That works but creates maintenance burden. The monorepo setting lets all packages inherit from the root automatically.' },
                  { label: 'Monorepo support is not available in Copilot', correct: false, feedback: 'Copilot supports monorepos — enable parent repository customizations to share instructions across packages.' },
                  { label: 'Use symlinks from each package to the root instructions file', correct: false, feedback: 'Symlinks can cause issues. The built-in `useCustomizationsInParentRepositories` setting is the intended solution.' },
                ]
              },
              {
                id: 'cop-l14-s4-q3',
                question: 'Your Copilot skills aren\'t triggering when expected. How do you diagnose the issue?',
                codeBlock: null,
                options: [
                  { label: 'Run `/troubleshoot` to check if skills are being loaded, and inspect the Chat Diagnostics view for matching details', correct: true, feedback: 'Correct. `/troubleshoot` diagnoses Copilot configuration issues. The Chat Diagnostics view (right-click in Chat) shows which skills and instructions are active and why others aren\'t matching.' },
                  { label: 'Reinstall VS Code — skill loading is a known bug', correct: false, feedback: 'Skills not triggering is usually a description mismatch or path issue, not a bug. Use `/troubleshoot` to diagnose.' },
                  { label: 'Skills always trigger — the issue must be elsewhere', correct: false, feedback: 'Skills only trigger when the description semantically matches your request. If the description doesn\'t match, the skill won\'t load.' },
                  { label: 'Check the browser console for JavaScript errors', correct: false, feedback: 'Copilot has built-in diagnostics. `/troubleshoot` and Chat Diagnostics are the right tools, not browser console.' },
                ]
              },
              {
                id: 'cop-l14-s4-q4',
                question: 'You want Copilot agent to run freely without approval prompts, including auto-responding to questions. Which permission level?',
                codeBlock: null,
                options: [
                  { label: 'Autopilot — it auto-approves all tool calls AND auto-responds to agent questions, running fully autonomously', correct: true, feedback: 'Correct. Autopilot is the highest autonomy level. Unlike Bypass (which only skips tool approvals), Autopilot also auto-responds to the agent\'s clarifying questions, enabling truly hands-off execution.' },
                  { label: 'Bypass Approvals — it auto-approves everything', correct: false, feedback: 'Bypass auto-approves tool calls but still pauses when the agent asks clarifying questions. Autopilot handles both.' },
                  { label: 'Default with all tools pre-approved', correct: false, feedback: 'Pre-approving tools doesn\'t handle agent questions. Autopilot is needed for fully autonomous operation.' },
                  { label: 'There is no way to run fully autonomously', correct: false, feedback: 'Autopilot mode (Preview) enables fully autonomous operation.' },
                ]
              },
              {
                id: 'cop-l14-s4-q5',
                question: 'Your MCP server works fine in development (STDIO) but you\'re worried about security when team members add servers from the gallery. What Copilot feature helps?',
                codeBlock: null,
                options: [
                  { label: 'MCP server sandboxing — restricts file system and network access per server with `sandboxEnabled: true`', correct: true, feedback: 'Correct. Recent VS Code versions added process-level sandboxing for MCP servers. You can restrict which directories a server can write to and which domains it can access, preventing malicious servers from harming your system.' },
                  { label: 'Disable MCP entirely for team members', correct: false, feedback: 'That removes useful functionality. Sandboxing lets you keep MCP while limiting risk per server.' },
                  { label: 'Only use HTTP transport — it\'s inherently more secure', correct: false, feedback: 'Transport type doesn\'t determine security. Sandboxing restricts what a server process can do regardless of transport.' },
                  { label: 'Review each server\'s source code before installing', correct: false, feedback: 'Code review helps but doesn\'t prevent runtime misbehavior. Sandboxing provides runtime security boundaries.' },
                ]
              },
            ]
          },
        ]
      },
      {
        id: 'cop-l16',
        title: 'The Coding Agent',
        slug: 'copilot/coding-agent',
        cardSets: [
          {
            id: 'cop-l16-s1',
            title: 'Set 1 — Invoking the Coding Agent',
            cards: [
              {
                id: 'cop-l16-s1-q1',
                question: 'A teammate opens an issue asking for a bug fix. They want Copilot to handle it without anyone opening an editor. How do they trigger the coding agent?',
                codeBlock: null,
                options: [
                  { label: 'Assign the issue to Copilot — just like assigning to a human team member. Works from github.com, GitHub Mobile, or the GitHub CLI.', correct: true, feedback: 'Correct. Assigning an issue to Copilot triggers the coding agent. It analyzes the issue, creates a branch, works autonomously, and delivers a draft pull request — all without anyone opening an editor.' },
                  { label: 'Add a "copilot" label to the issue', correct: false, feedback: 'Labels don\'t trigger the coding agent. You assign the issue to Copilot directly, just as you\'d assign it to a colleague.' },
                  { label: 'Comment @copilot on the issue', correct: false, feedback: 'While @copilot mentions work in some contexts, the primary trigger for the coding agent on issues is assignment — assigning the issue to Copilot.' },
                  { label: 'Create a GitHub Actions workflow that calls the coding agent API', correct: false, feedback: 'No API call needed. Assign the issue to Copilot and the coding agent starts automatically.' },
                ]
              },
              {
                id: 'cop-l16-s1-q2',
                question: 'After you assign an issue to Copilot, what is the very first thing the coding agent does?',
                codeBlock: null,
                options: [
                  { label: 'Creates a draft pull request with an initial empty commit to establish a workspace branch, then pushes code commits as it works', correct: true, feedback: 'Correct. The coding agent immediately creates a draft PR with an empty commit. This establishes the branch and gives you a place to track progress. Subsequent commits with actual code changes follow as the agent works.' },
                  { label: 'Starts writing code directly to the main branch', correct: false, feedback: 'The coding agent never writes to main. It creates its own branch via a draft PR first, keeping all changes isolated until review.' },
                  { label: 'Sends you a plan for approval before writing any code', correct: false, feedback: 'The coding agent starts working immediately after creating the draft PR. You can monitor progress through session logs, but it doesn\'t wait for plan approval.' },
                  { label: 'Clones the repo to a local machine and opens VS Code', correct: false, feedback: 'The coding agent runs entirely in the cloud on GitHub\'s infrastructure. No local machine or VS Code is involved.' },
                ]
              },
              {
                id: 'cop-l16-s1-q3',
                question: 'You\'re working locally in VS Code and want to hand off a task to the cloud coding agent without leaving your editor. How?',
                codeBlock: null,
                options: [
                  { label: 'Use Copilot Chat in VS Code to ask it to start working — it can delegate to the cloud coding agent directly from the chat interface', correct: true, feedback: 'Correct. You can trigger the coding agent from Copilot Chat in VS Code. This creates a seamless workflow where you describe the task locally and the agent picks it up in the cloud, delivering a PR when done.' },
                  { label: 'This is not possible — you must go to github.com to use the coding agent', correct: false, feedback: 'The coding agent can be triggered from VS Code\'s Copilot Chat, GitHub Mobile, GitHub CLI, or github.com — multiple entry points.' },
                  { label: 'Run a terminal command: `gh copilot agent start`', correct: false, feedback: 'While the GitHub CLI can assign issues to Copilot, VS Code\'s Copilot Chat provides a more direct way to delegate tasks to the coding agent.' },
                  { label: 'Push your branch and the cloud agent will automatically pick it up', correct: false, feedback: 'The coding agent doesn\'t auto-detect pushed branches. You must explicitly trigger it via issue assignment or Copilot Chat.' },
                ]
              },
              {
                id: 'cop-l16-s1-q4',
                question: 'The coding agent has been working on your issue for 10 minutes. How do you see what it\'s doing?',
                codeBlock: null,
                options: [
                  { label: 'Check the session logs in the draft PR — they show every step the agent takes, including tool calls, file reads, and decisions', correct: true, feedback: 'Correct. Session logs provide full transparency into the agent\'s work. You can see what files it read, what searches it ran, what edits it made, and why — all from the draft PR page.' },
                  { label: 'You can\'t — the coding agent works in a black box until it\'s done', correct: false, feedback: 'The coding agent is fully transparent. Session logs in the draft PR show every action in real-time.' },
                  { label: 'Check the GitHub Actions tab for workflow logs', correct: false, feedback: 'While the coding agent uses GitHub Actions infrastructure, its progress is tracked via session logs on the PR, not Actions workflow logs.' },
                  { label: 'Wait for an email notification when it finishes', correct: false, feedback: 'You don\'t have to wait. Session logs let you monitor the agent\'s progress in real-time on the draft PR.' },
                ]
              },
              {
                id: 'cop-l16-s1-q5',
                question: 'Which model powers the coding agent, and can you change it?',
                codeBlock: null,
                options: [
                  { label: 'The model picker lets you choose between multiple models (including Claude Opus 4.5, GPT-4o, GPT-5.1-Codex-Max, Gemini 2.0 Flash) or set it to Auto', correct: true, feedback: 'Correct. The coding agent supports a model picker with multiple options. Auto mode lets Copilot choose the best model per task. This multi-model approach lets you optimize for speed, quality, or cost depending on the task.' },
                  { label: 'It always uses GPT-4 and cannot be changed', correct: false, feedback: 'The coding agent supports multiple models via a model picker, including non-OpenAI models like Claude Opus 4.5 and Gemini 2.0 Flash.' },
                  { label: 'You must configure the model in copilot-setup-steps.yml', correct: false, feedback: 'Model selection happens via the model picker in the UI, not in the setup steps file (which is for environment configuration).' },
                  { label: 'Only organization admins can change the model', correct: false, feedback: 'Individual users can choose models via the model picker. Organization policies may restrict available models, but the picker is user-facing.' },
                ]
              },
            ]
          },
          {
            id: 'cop-l16-s2',
            title: 'Set 2 — Environment & Security',
            cards: [
              {
                id: 'cop-l16-s2-q1',
                question: 'The coding agent needs to install dependencies, start a database, and compile your project before it can work. Where do you define these steps?',
                codeBlock: null,
                options: [
                  { label: '`copilot-setup-steps.yml` — a GitHub Actions workflow that runs before the agent starts coding, setting up the full dev environment', correct: true, feedback: 'Correct. `copilot-setup-steps.yml` is a GitHub Actions workflow that configures the coding agent\'s environment. It installs language runtimes, database services, dependencies — everything the agent needs before it starts writing code.' },
                  { label: 'A Dockerfile in the repo root', correct: false, feedback: 'While Docker can define environments, the coding agent uses `copilot-setup-steps.yml` (a GitHub Actions workflow) for its environment setup.' },
                  { label: 'Add a "setup" section to `.github/copilot-instructions.md`', correct: false, feedback: 'Instructions guide the AI\'s coding behavior, not its environment. `copilot-setup-steps.yml` handles executable environment setup.' },
                  { label: 'The coding agent auto-detects the environment from package.json or requirements.txt', correct: false, feedback: 'The coding agent needs explicit setup steps. It doesn\'t auto-detect environments — you must define them in `copilot-setup-steps.yml`.' },
                ]
              },
              {
                id: 'cop-l16-s2-q2',
                question: 'After the coding agent writes code, what security checks does it run before opening the PR?',
                codeBlock: null,
                options: [
                  { label: 'CodeQL for vulnerability scanning, secret scanning for leaked API keys, and dependency checks against the GitHub Advisory Database', correct: true, feedback: 'Correct. The coding agent runs a triple security check: CodeQL analyzes code for vulnerabilities, secret scanning catches accidentally committed API keys and tokens, and dependency scanning checks new packages against known vulnerability databases.' },
                  { label: 'No security checks — that\'s the reviewer\'s job', correct: false, feedback: 'The coding agent has built-in security validation. It runs CodeQL, secret scanning, and dependency checks automatically before finishing the PR.' },
                  { label: 'Only a basic linter check', correct: false, feedback: 'The coding agent goes far beyond linting. It runs CodeQL, secret scanning, and dependency vulnerability checks — comprehensive security analysis.' },
                  { label: 'It only runs checks if you have GitHub Advanced Security', correct: false, feedback: 'The coding agent\'s security checks (CodeQL, secret scanning, dependency checks) are included with Copilot usage and don\'t require a separate GitHub Advanced Security license.' },
                ]
              },
              {
                id: 'cop-l16-s2-q3',
                question: 'The coding agent found a security issue in its own code during self-review. What happens next?',
                codeBlock: null,
                options: [
                  { label: 'It attempts to fix the issue automatically, then summarizes what it found and how it resolved it in the PR description', correct: true, feedback: 'Correct. Self-review means the coding agent doesn\'t just flag problems — it tries to fix them. If CodeQL or secret scanning finds an issue, the agent attempts resolution and documents everything in the PR summary.' },
                  { label: 'It opens a separate issue flagging the security problem', correct: false, feedback: 'The coding agent handles security issues inline. It tries to fix them itself rather than deferring to a separate issue.' },
                  { label: 'It stops working and asks you to fix the security issue manually', correct: false, feedback: 'The coding agent attempts to resolve security issues automatically. It only escalates to humans if it can\'t fix the problem.' },
                  { label: 'It ignores the issue and opens the PR anyway', correct: false, feedback: 'The coding agent takes security seriously. It attempts to fix issues before finishing the PR and documents all findings in the summary.' },
                ]
              },
              {
                id: 'cop-l16-s2-q4',
                question: 'Who controls whether the coding agent is available in an organization?',
                codeBlock: null,
                options: [
                  { label: 'Organization owners and enterprise admins control availability through policy settings, including which repos can use it', correct: true, feedback: 'Correct. Enterprise policies and organization settings govern coding agent availability. Admins can enable or disable it per repo, set trust levels, and configure governance controls for the whole organization.' },
                  { label: 'Anyone with a Copilot license can use it on any repo', correct: false, feedback: 'While Copilot users can access the coding agent, organization and enterprise admins control availability through policy settings.' },
                  { label: 'Only repo maintainers can enable it per repository', correct: false, feedback: 'Organization-level and enterprise-level policies take precedence over individual repo settings.' },
                  { label: 'It\'s always enabled — there are no administrative controls', correct: false, feedback: 'Enterprise and organization admins have granular controls over coding agent availability and policies.' },
                ]
              },
              {
                id: 'cop-l16-s2-q5',
                question: 'What infrastructure powers the coding agent\'s isolated execution environment?',
                codeBlock: null,
                options: [
                  { label: 'GitHub Actions — the same infrastructure that runs CI/CD, providing secure, customizable compute environments', correct: true, feedback: 'Correct. The coding agent runs on GitHub Actions infrastructure, which processes over 40 million daily jobs. This gives it access to runners (GitHub-hosted or self-hosted), caching, secrets management, and the entire Actions ecosystem.' },
                  { label: 'A dedicated Copilot cloud separate from GitHub\'s infrastructure', correct: false, feedback: 'The coding agent runs on GitHub Actions infrastructure, not a separate cloud. This leverages existing Actions capabilities like runners and caching.' },
                  { label: 'Your local machine via a background process', correct: false, feedback: 'The coding agent runs entirely in the cloud on GitHub Actions infrastructure. It never touches your local machine.' },
                  { label: 'GitHub Codespaces dev containers', correct: false, feedback: 'While similar in concept, the coding agent uses GitHub Actions infrastructure, not Codespaces. Setup is via `copilot-setup-steps.yml`, not devcontainer.json.' },
                ]
              },
            ]
          },
          {
            id: 'cop-l16-s3',
            title: 'Set 3 — Custom Agents & Workflow',
            cards: [
              {
                id: 'cop-l16-s3-q1',
                question: 'You want to create a custom agent that always runs benchmarks before and after making performance changes. Where do you define it?',
                codeBlock: null,
                options: [
                  { label: 'Create a markdown file in `.github/agents/` with YAML frontmatter defining the agent\'s name, tools, and MCP servers — the markdown body is the system prompt', correct: true, feedback: 'Correct. Custom agents are defined as markdown files in `.github/agents/`. The YAML frontmatter specifies the agent\'s configuration (name, tools, MCP servers), and the markdown body below the frontmatter becomes the system prompt that guides the agent\'s behavior.' },
                  { label: 'Configure it in `.github/copilot-instructions.md`', correct: false, feedback: 'Instructions files guide general behavior. Custom agents are separate entities defined in `.github/agents/` with their own prompts and tool configurations.' },
                  { label: 'Write a GitHub Actions workflow that calls the Copilot API', correct: false, feedback: 'Custom agents are defined declaratively in markdown files, not as Actions workflows. They\'re configured in `.github/agents/`.' },
                  { label: 'Install an extension from the VS Code marketplace', correct: false, feedback: 'Custom agents are defined in your repo\'s `.github/agents/` directory, not as VS Code extensions.' },
                ]
              },
              {
                id: 'cop-l16-s3-q2',
                question: 'Your custom agent needs access to a Jira MCP server to read ticket details while coding. How do you configure this?',
                codeBlock: null,
                options: [
                  { label: 'Add the MCP server configuration directly in the agent\'s YAML frontmatter — custom agents can specify their own MCP servers', correct: true, feedback: 'Correct. Custom agent profiles can include MCP server configurations in their frontmatter. This means each agent can have access to different external services, making them highly specialized.' },
                  { label: 'MCP servers must be configured globally — agents can\'t have their own', correct: false, feedback: 'Custom agents can specify their own MCP servers in their frontmatter, in addition to any globally configured servers.' },
                  { label: 'Add it to `.vscode/mcp.json` and it applies to all agents automatically', correct: false, feedback: 'While `.vscode/mcp.json` configures global MCP servers, custom agents can also specify their own in their agent profile frontmatter.' },
                  { label: 'MCP servers are not supported in custom agents', correct: false, feedback: 'Custom agents fully support MCP server configuration in their YAML frontmatter.' },
                ]
              },
              {
                id: 'cop-l16-s3-q3',
                question: 'You want to restrict a custom agent to only read files and run searches — no editing or terminal access. How?',
                codeBlock: null,
                options: [
                  { label: 'Set the `tools` property in the frontmatter to list only the specific tools allowed (e.g., `read`, `search`), omitting `edit` and `execute`', correct: true, feedback: 'Correct. The `tools` property in the agent\'s YAML frontmatter controls which tools the agent can use. List only `read` and `search` to create a read-only agent. Omit `tools` or use `["*"]` to grant access to all tools.' },
                  { label: 'Custom agents always have access to all tools — you can\'t restrict them', correct: false, feedback: 'The `tools` property in the frontmatter explicitly controls tool access. You can restrict agents to only specific tools.' },
                  { label: 'Set file system permissions on the agent\'s markdown file', correct: false, feedback: 'Tool access is controlled via the `tools` property in the agent profile\'s YAML frontmatter, not file system permissions.' },
                  { label: 'Add a `permissions: read-only` field to the frontmatter', correct: false, feedback: 'There\'s no `permissions` field. Use the `tools` property to list only the specific tools the agent should have access to.' },
                ]
              },
              {
                id: 'cop-l16-s3-q4',
                question: 'Where can custom agent definitions be shared across all repositories in an organization?',
                codeBlock: null,
                options: [
                  { label: 'Place agent files in the `agents` folder of the organization\'s `.github` or `.github-private` repository — they apply org-wide', correct: true, feedback: 'Correct. Organization-wide custom agents live in the `.github` or `.github-private` repo under the `agents` folder. This lets you define shared agents (like a security reviewer or documentation writer) that work across all repos in the org.' },
                  { label: 'Copy the agent file into every repo\'s `.github/agents/` directory', correct: false, feedback: 'That works but doesn\'t scale. The org-level `.github` or `.github-private` repository lets you define agents once for the entire organization.' },
                  { label: 'Configure them in the organization\'s GitHub settings page', correct: false, feedback: 'Custom agents are defined as files in repositories, not through the settings UI. Use the org\'s `.github` repo for org-wide agents.' },
                  { label: 'Org-wide agents are not supported — agents are always repo-specific', correct: false, feedback: 'Agents can be shared org-wide by placing them in the organization\'s `.github` or `.github-private` repository.' },
                ]
              },
              {
                id: 'cop-l16-s3-q5',
                question: 'The coding agent supports `AGENTS.md` for custom instructions. How does this relate to `CLAUDE.md`?',
                codeBlock: null,
                options: [
                  { label: 'Both serve the same purpose — repo-level agent instructions. Copilot reads both `AGENTS.md` and `CLAUDE.md` for cross-tool compatibility', correct: true, feedback: 'Correct. `AGENTS.md` is the tool-agnostic convention for agent instructions. Copilot reads both `AGENTS.md` and `CLAUDE.md`, meaning teams using multiple AI tools can share instructions without duplication.' },
                  { label: '`AGENTS.md` replaces `CLAUDE.md` entirely', correct: false, feedback: '`AGENTS.md` doesn\'t replace `CLAUDE.md`. Copilot reads both files for compatibility. Teams can use either or both.' },
                  { label: '`AGENTS.md` is for Copilot only, `CLAUDE.md` is for Claude only', correct: false, feedback: 'Copilot reads both files. `AGENTS.md` is a cross-tool convention, and `CLAUDE.md` is supported for compatibility.' },
                  { label: 'These are unrelated files with different purposes', correct: false, feedback: 'Both files serve the same purpose: providing custom instructions to AI coding agents. Copilot supports both for cross-tool compatibility.' },
                ]
              },
            ]
          },
          {
            id: 'cop-l16-s4',
            title: 'Set 4 — Agent Mode vs Coding Agent',
            cards: [
              {
                id: 'cop-l16-s4-q1',
                question: 'You\'re debugging a tricky CSS layout issue and need the AI to iterate with you in real-time — reading files, editing code, checking the browser, and responding to your feedback. Which should you use?',
                codeBlock: null,
                options: [
                  { label: 'Agent Mode in VS Code — it runs synchronously in your editor with access to local tools (read_file, apply_edit, run_terminal) and you guide it interactively', correct: true, feedback: 'Correct. Agent Mode is the synchronous, local counterpart to the coding agent. It works inside your IDE, responds to your feedback in real-time, and has direct access to your local environment — perfect for interactive debugging and iterative work.' },
                  { label: 'The cloud coding agent — assign it as a GitHub Issue', correct: false, feedback: 'The cloud coding agent works asynchronously and delivers a PR. For real-time interactive debugging where you need to guide the AI, Agent Mode in your IDE is the right choice.' },
                  { label: 'A background agent — it works in parallel on your machine', correct: false, feedback: 'Background agents work independently in a worktree. For interactive debugging where you\'re guiding the AI step-by-step, you want Agent Mode in your editor.' },
                  { label: 'It doesn\'t matter — all agent types work the same way', correct: false, feedback: 'Agent types differ significantly: Agent Mode is synchronous and interactive, background agents are local but independent, and cloud agents are fully remote and asynchronous.' },
                ]
              },
              {
                id: 'cop-l16-s4-q2',
                question: 'A PM files a well-defined issue: "Add a /health endpoint that returns 200 OK." No developer is available. What is the most efficient way to get this done?',
                codeBlock: null,
                options: [
                  { label: 'Assign the issue to Copilot — the cloud coding agent picks it up, implements it autonomously on GitHub Actions, and delivers a draft PR for review', correct: true, feedback: 'Correct. Well-defined, self-contained tasks are ideal for the cloud coding agent. No developer needs to open an editor. The agent works on GitHub\'s infrastructure, runs security checks, and delivers a reviewed PR.' },
                  { label: 'Wait for a developer to use Agent Mode in VS Code', correct: false, feedback: 'Agent Mode requires a developer at the keyboard. The cloud coding agent can handle well-defined tasks autonomously without anyone opening an editor.' },
                  { label: 'Use a background agent on a developer\'s machine', correct: false, feedback: 'Background agents need a developer\'s machine running. The cloud coding agent is the fully remote option — no local resources needed.' },
                  { label: 'This kind of task requires human implementation', correct: false, feedback: 'The cloud coding agent can implement well-defined tasks like adding endpoints autonomously, delivering a PR for human review.' },
                ]
              },
              {
                id: 'cop-l16-s4-q3',
                question: 'What is the fundamental difference in how Agent Mode and the cloud coding agent access your development environment?',
                codeBlock: null,
                options: [
                  { label: 'Agent Mode inherits your full local environment (installed tools, running services, env vars) automatically; the coding agent needs explicit setup via `copilot-setup-steps.yml`', correct: true, feedback: 'Correct. This is the key trade-off. Agent Mode runs locally and gets everything for free — your Node version, your database, your env vars. The coding agent runs remotely and needs every dependency explicitly defined in `copilot-setup-steps.yml`.' },
                  { label: 'Both access the same environment — they share a remote VM', correct: false, feedback: 'Agent Mode runs locally in your IDE. The coding agent runs remotely on GitHub Actions. They have completely different environments.' },
                  { label: 'The coding agent has better environment access because it runs on powerful servers', correct: false, feedback: 'Server power isn\'t the distinction. Agent Mode has richer environment access (your full local setup), while the coding agent needs explicit configuration but runs remotely.' },
                  { label: 'Neither can access development tools — they only edit source files', correct: false, feedback: 'Both can run terminal commands, execute tests, and use dev tools. The difference is Agent Mode inherits your local tools while the coding agent needs explicit setup.' },
                ]
              },
              {
                id: 'cop-l16-s4-q4',
                question: 'You want to refactor a module while continuing to write tests for another module on the same machine. Which agent type enables this parallel workflow?',
                codeBlock: null,
                options: [
                  { label: 'A background agent — it creates a separate git worktree so it works on a different branch while you keep coding in your workspace', correct: true, feedback: 'Correct. Background agents use git worktrees for isolation. They work on a separate branch in a separate directory while you continue using VS Code normally. It\'s the local parallel option — between the interactive Agent Mode and the fully remote coding agent.' },
                  { label: 'Agent Mode — just open two VS Code windows', correct: false, feedback: 'Agent Mode shares your workspace and is interactive. Background agents are specifically designed for parallel local work using git worktree isolation.' },
                  { label: 'The cloud coding agent — it runs remotely so it can\'t conflict', correct: false, feedback: 'The cloud coding agent works, but background agents are the local option for parallel work when you want to leverage your existing environment without waiting for cloud setup.' },
                  { label: 'This isn\'t possible — you must finish one task before starting another', correct: false, feedback: 'Background agents exist precisely for this use case: parallel work on the same machine using git worktree isolation.' },
                ]
              },
              {
                id: 'cop-l16-s4-q5',
                question: 'Your team is choosing between Agent Mode, background agents, and cloud coding agents for different tasks. Which summary correctly maps each to its ideal use case?',
                codeBlock: null,
                options: [
                  { label: 'Agent Mode → interactive, real-time pairing · Background agent → local parallel tasks using worktrees · Cloud coding agent → autonomous issue-to-PR with no editor needed', correct: true, feedback: 'Correct. This is the spectrum: Agent Mode for interactive collaboration (you\'re driving), background agents for parallel local work (you\'re both working), and cloud coding agents for fully autonomous tasks (it works while you sleep).' },
                  { label: 'They\'re all the same — just different names for Copilot\'s agent feature', correct: false, feedback: 'Each operates differently: synchronous-local (Agent Mode), asynchronous-local (background), asynchronous-remote (cloud). They serve distinct workflows.' },
                  { label: 'Agent Mode → small tasks · Background → medium tasks · Cloud → large tasks', correct: false, feedback: 'Task size isn\'t the distinguishing factor. The choice depends on interactivity needs, environment requirements, and whether a human is actively involved.' },
                  { label: 'Agent Mode → free tier · Background → Pro tier · Cloud → Enterprise tier', correct: false, feedback: 'The distinction is workflow type, not pricing tier. All three are available with Copilot — the choice depends on the nature of the task.' },
                ]
              },
            ]
          },
          {
            id: 'cop-l16-s5',
            title: 'Set 5 — Copilot Code Review',
            cards: [
              {
                id: 'cop-l16-s5-q1',
                question: 'You\'ve opened a pull request and want Copilot to review it before your teammates do. How do you request a review on github.com?',
                codeBlock: null,
                options: [
                  { label: 'Open the Reviewers menu on the PR and select Copilot — the same way you\'d add a human reviewer. It reviews in under 30 seconds.', correct: true, feedback: 'Correct. Copilot appears as a reviewer option in the Reviewers dropdown. Select it and Copilot analyzes your PR, leaving inline comments with suggestions. It always leaves a "Comment" review — never "Approve" or "Request Changes" — so it won\'t block merging.' },
                  { label: 'Comment "@copilot review" on the PR', correct: false, feedback: 'While @copilot mentions work in some contexts, the standard way is to add Copilot as a reviewer through the Reviewers menu on the PR.' },
                  { label: 'Enable a GitHub Action that triggers Copilot reviews', correct: false, feedback: 'No Actions workflow needed. Copilot is a built-in reviewer option — just add it from the Reviewers dropdown.' },
                  { label: 'Copilot can only review code in the IDE, not on PRs', correct: false, feedback: 'Copilot code review works both on github.com PRs and locally in VS Code. On PRs, add Copilot as a reviewer from the Reviewers menu.' },
                ]
              },
              {
                id: 'cop-l16-s5-q2',
                question: 'You want Copilot to automatically review every PR in your repo without anyone manually requesting it. How do you set this up?',
                codeBlock: null,
                options: [
                  { label: 'Create a branch ruleset in the repo settings and enable "Automatically request Copilot code review" — optionally review new pushes and draft PRs too', correct: true, feedback: 'Correct. Branch rulesets let you automate Copilot reviews at the repo or org level. You can also enable "Review new pushes" (re-reviews after each push) and "Review draft pull requests" for early feedback. No per-PR manual action needed.' },
                  { label: 'Add Copilot to the CODEOWNERS file', correct: false, feedback: 'CODEOWNERS assigns human reviewers by path. Copilot automatic reviews are configured through branch rulesets in repository settings.' },
                  { label: 'Set `auto-review: true` in `.github/copilot-instructions.md`', correct: false, feedback: 'Instruction files guide Copilot\'s coding behavior, not review configuration. Automatic reviews are enabled through branch rulesets.' },
                  { label: 'This isn\'t possible — someone must always request the review manually', correct: false, feedback: 'Branch rulesets can automatically request Copilot reviews on every PR. No manual action required.' },
                ]
              },
              {
                id: 'cop-l16-s5-q3',
                question: 'You\'re writing code locally in VS Code and want Copilot to review your changes before you even create a PR. What are your options?',
                codeBlock: null,
                options: [
                  { label: 'Two options: select code and choose "Review" from the context menu for a targeted review, or click the Copilot Code Review button in the Source Control panel to review all uncommitted changes', correct: true, feedback: 'Correct. VS Code supports both targeted and broad reviews. Right-click a selection for focused feedback, or use the Source Control panel\'s Copilot Code Review button to review all uncommitted changes at once. Review comments appear inline in the editor.' },
                  { label: 'Code review is only available on github.com, not in VS Code', correct: false, feedback: 'Copilot code review works in VS Code too — both on selected code blocks and on uncommitted changes via the Source Control panel.' },
                  { label: 'Type `/review` in Copilot Chat', correct: false, feedback: 'While Copilot Chat is useful, code review has dedicated UI integration: right-click selection for targeted review, or the Source Control panel button for uncommitted changes.' },
                  { label: 'You must commit and push first — Copilot can only review committed code', correct: false, feedback: 'VS Code\'s Copilot code review works on uncommitted changes. You can get feedback before committing, making it ideal for pre-commit self-review.' },
                ]
              },
              {
                id: 'cop-l16-s5-q4',
                question: 'Your team wants to request Copilot reviews from the terminal without opening a browser. How?',
                codeBlock: null,
                options: [
                  { label: 'Use the GitHub CLI — Copilot is available as a reviewer in `gh pr create` and `gh pr edit`, just like adding a human reviewer', correct: true, feedback: 'Correct. As of March 2026, the GitHub CLI supports adding Copilot as a reviewer via `gh pr create --reviewer copilot` or `gh pr edit --add-reviewer copilot`. This fits naturally into terminal-based workflows.' },
                  { label: 'Run `copilot review` as a standalone CLI command', correct: false, feedback: 'There\'s no standalone `copilot review` command. Use the standard GitHub CLI with `--reviewer copilot` on `gh pr create` or `gh pr edit`.' },
                  { label: 'This is not possible — reviews must be requested through the web UI', correct: false, feedback: 'The GitHub CLI supports Copilot as a reviewer. You can request reviews from the terminal via `gh pr create --reviewer copilot` or `gh pr edit`.' },
                  { label: 'Create a git hook that auto-requests reviews on push', correct: false, feedback: 'While hooks can automate workflows, the direct approach is using `gh pr create --reviewer copilot` or `gh pr edit --add-reviewer copilot` from the CLI.' },
                ]
              },
              {
                id: 'cop-l16-s5-q5',
                question: 'Does Copilot\'s code review count toward required approvals in branch protection rules?',
                codeBlock: null,
                options: [
                  { label: 'No — Copilot always leaves a "Comment" review, never "Approve" or "Request Changes", so it never counts toward required approvals and never blocks merging', correct: true, feedback: 'Correct. This is by design. Copilot\'s review is advisory — it surfaces issues and suggests fixes, but the approval decision remains with human reviewers. It complements your review process without replacing it.' },
                  { label: 'Yes — Copilot\'s approval counts the same as a human\'s', correct: false, feedback: 'Copilot always leaves "Comment" reviews. It never approves or requests changes, so it cannot satisfy branch protection requirements.' },
                  { label: 'Only if the org admin enables "Trust AI reviews"', correct: false, feedback: 'There\'s no such setting. Copilot always leaves Comment reviews by design — approval authority stays with humans.' },
                  { label: 'It depends on the Copilot plan (Free vs Pro vs Enterprise)', correct: false, feedback: 'Regardless of plan, Copilot code review always leaves Comment reviews. It\'s a deliberate design choice to keep human approval as the gate.' },
                ]
              },
            ]
          },
        ]
      },
    ]
  },
  {
    id: 'ai-fluency',
    title: 'AI Fluency (4D Framework)',
    color: '#10b981',
    lessons: [
      {
        id: 'aif-l17',
        title: 'The 4D Framework & Gen AI',
        slug: 'ai-fluency/framework',
        cardSets: [
          {
            id: 'aif-l17-s1',
            title: 'Set 1 — AI Fluency & the 4Ds',
            cards: [
              {
                id: 'aif-l17-s1-q1',
                question: 'Anthropic defines "AI Fluency" as the ability to collaborate with AI systems in ways that satisfy four qualities. What are they?',
                codeBlock: null,
                options: [
                  { label: 'Effective, Efficient, Ethical, and Safe', correct: true, feedback: 'Correct. AI Fluency is not just about getting results (effective/efficient) — it also demands responsible use (ethical/safe). All four qualities work together.' },
                  { label: 'Fast, Accurate, Scalable, and Cheap', correct: false, feedback: 'Those are operational metrics. AI Fluency explicitly includes ethical and safety dimensions alongside effectiveness and efficiency.' },
                  { label: 'Creative, Analytical, Productive, and Secure', correct: false, feedback: 'AI Fluency\'s four qualities are Effective, Efficient, Ethical, and Safe — balancing outcomes with responsibility.' },
                  { label: 'Intelligent, Autonomous, Reliable, and Transparent', correct: false, feedback: 'Those describe AI system properties. AI Fluency describes human competencies: Effective, Efficient, Ethical, Safe.' },
                ]
              },
              {
                id: 'aif-l17-s1-q2',
                question: 'The AI Fluency Framework identifies three primary ways people engage with AI. Your marketing team uses AI to auto-generate social media posts from a template. Which mode is this?',
                codeBlock: null,
                options: [
                  { label: 'Automation — the AI completes specific tasks based on your instructions', correct: true, feedback: 'Correct. Automation is when AI executes tasks you define. Template-based post generation is a clear automation use case — you provide the structure, AI fills it in.' },
                  { label: 'Augmentation — you and AI collaborate as creative partners', correct: false, feedback: 'Augmentation involves back-and-forth collaboration. Auto-generating from templates is task execution (Automation), not creative partnership.' },
                  { label: 'Agency — AI works independently on your behalf', correct: false, feedback: 'Agency is when AI operates with established patterns and autonomy. Template-based generation is structured Automation, not independent Agency.' },
                  { label: 'Delegation — you assign the task to AI', correct: false, feedback: 'Delegation is one of the 4D competencies, not a collaboration mode. The three modes are Automation, Augmentation, and Agency.' },
                ]
              },
              {
                id: 'aif-l17-s1-q3',
                question: 'You\'re brainstorming product names with Claude — you suggest ideas, Claude builds on them, you refine together. Which collaboration mode?',
                codeBlock: null,
                options: [
                  { label: 'Augmentation — you and AI collaborate as creative thinking and task execution partners', correct: true, feedback: 'Correct. Augmentation is the collaborative mode where both human and AI contribute creatively. Brainstorming together is the classic augmentation scenario.' },
                  { label: 'Automation — AI generates names on command', correct: false, feedback: 'If you just said "generate 10 names" that would be Automation. Back-and-forth creative brainstorming is Augmentation.' },
                  { label: 'Agency — AI independently creates names', correct: false, feedback: 'Agency is when AI works independently with established patterns. Interactive brainstorming is collaborative Augmentation.' },
                  { label: 'Description — you\'re describing what you want', correct: false, feedback: 'Description is a 4D competency (how you communicate with AI), not a collaboration mode. This is Augmentation.' },
                ]
              },
              {
                id: 'aif-l17-s1-q4',
                question: 'What are the four core competencies (the "4Ds") of the AI Fluency Framework?',
                codeBlock: null,
                options: [
                  { label: 'Delegation, Description, Discernment, Diligence', correct: true, feedback: 'Correct. Delegation (what to hand off), Description (how to communicate), Discernment (how to evaluate outputs), Diligence (how to be responsible). Together they cover the full cycle of working with AI.' },
                  { label: 'Design, Develop, Deploy, Debug', correct: false, feedback: 'Those are software engineering phases. The 4Ds of AI Fluency are Delegation, Description, Discernment, Diligence.' },
                  { label: 'Define, Describe, Deliver, Document', correct: false, feedback: 'The 4Ds are Delegation, Description, Discernment, Diligence — covering task assignment, communication, evaluation, and responsibility.' },
                  { label: 'Data, Direction, Dialogue, Decisions', correct: false, feedback: 'The 4Ds are Delegation, Description, Discernment, Diligence — a framework for effective, responsible AI collaboration.' },
                ]
              },
              {
                id: 'aif-l17-s1-q5',
                question: 'You configure an AI coding agent to independently handle bug reports — it triages issues, writes fixes, and opens PRs without your involvement. Which collaboration mode?',
                codeBlock: null,
                options: [
                  { label: 'Agency — you configure AI to work independently on your behalf, establishing its knowledge and behavior patterns', correct: true, feedback: 'Correct. Agency is when you set up AI to operate autonomously with established patterns. You\'re not giving specific task instructions — you\'re establishing behavior patterns the AI follows independently.' },
                  { label: 'Automation — AI executes tasks on instructions', correct: false, feedback: 'Automation is task-specific execution. Agency goes further — the AI operates with established behavior patterns, making decisions independently.' },
                  { label: 'Augmentation — you collaborate with AI', correct: false, feedback: 'Augmentation requires active collaboration. Agency means the AI works independently based on patterns you\'ve established.' },
                  { label: 'Delegation — you assigned the work to AI', correct: false, feedback: 'Delegation is a 4D competency (the decision of what to hand off). The collaboration mode here is Agency — independent AI operation.' },
                ]
              },
            ]
          },
          {
            id: 'aif-l17-s2',
            title: 'Set 2 — Generative AI Foundations',
            cards: [
              {
                id: 'aif-l17-s2-q1',
                question: 'What distinguishes generative AI from traditional AI systems?',
                codeBlock: null,
                options: [
                  { label: 'Generative AI creates new content (text, images, code) rather than just analyzing or classifying existing data', correct: true, feedback: 'Correct. Traditional AI analyzes, classifies, or predicts based on existing data. Generative AI produces novel outputs — text, images, code, music — that didn\'t exist before.' },
                  { label: 'Generative AI is faster than traditional AI', correct: false, feedback: 'Speed isn\'t the distinction. Generative AI\'s defining feature is creating new content, not just analyzing existing data.' },
                  { label: 'Generative AI doesn\'t need training data', correct: false, feedback: 'Generative AI requires massive training data. What\'s different is that it produces new content rather than just analyzing existing data.' },
                  { label: 'Generative AI is always more accurate', correct: false, feedback: 'Generative AI can hallucinate and make errors. Its distinction is creating new content, not superior accuracy.' },
                ]
              },
              {
                id: 'aif-l17-s2-q2',
                question: 'Three key developments made modern large language models possible. Which combination is correct?',
                codeBlock: null,
                options: [
                  { label: 'Algorithmic breakthroughs (transformer architecture), vast digital training data, and dramatic increases in computational power', correct: true, feedback: 'Correct. The transformer architecture (2017) was the algorithmic leap, billions of text examples provided the training data, and GPU clusters provided the compute. All three had to come together.' },
                  { label: 'Faster internet, bigger databases, and cheaper storage', correct: false, feedback: 'Those are infrastructure improvements. LLMs required specific advances: the transformer architecture, massive training corpora, and GPU compute at scale.' },
                  { label: 'Better programming languages, cloud computing, and open source', correct: false, feedback: 'The three key developments were the transformer architecture, vast training data, and massive computational power.' },
                  { label: 'Neural networks, reinforcement learning, and quantum computing', correct: false, feedback: 'Quantum computing is not involved. The three developments are transformer architecture, vast training data, and computational scale.' },
                ]
              },
              {
                id: 'aif-l17-s2-q3',
                question: 'LLMs learn through two stages. What are they and what happens in each?',
                codeBlock: null,
                options: [
                  { label: 'Pre-training (analyzing patterns across billions of examples) followed by fine-tuning (learning to follow instructions and provide helpful responses)', correct: true, feedback: 'Correct. Pre-training builds the broad knowledge base from massive text data. Fine-tuning then teaches the model to be helpful, harmless, and honest in conversations — turning raw pattern knowledge into a useful assistant.' },
                  { label: 'Coding (writing the model) followed by testing (checking for bugs)', correct: false, feedback: 'Those are software development steps. LLM learning stages are pre-training (pattern learning) and fine-tuning (instruction following).' },
                  { label: 'Memorization (storing facts) followed by retrieval (looking them up)', correct: false, feedback: 'LLMs don\'t memorize and retrieve like databases. They pre-train on patterns, then fine-tune to follow instructions.' },
                  { label: 'Supervised learning followed by unsupervised learning', correct: false, feedback: 'It\'s actually closer to the reverse: pre-training is largely unsupervised (pattern learning), while fine-tuning uses supervised and reinforcement techniques.' },
                ]
              },
              {
                id: 'aif-l17-s2-q4',
                question: 'Which of these is a well-known limitation of current generative AI systems?',
                codeBlock: null,
                options: [
                  { label: 'Hallucinations — generating factually incorrect outputs that sound confident and plausible', correct: true, feedback: 'Correct. Hallucinations are a core limitation. AI can produce fluent, confident-sounding text that is factually wrong. This is why Discernment (evaluating AI outputs) is a critical AI Fluency competency.' },
                  { label: 'Inability to process natural language', correct: false, feedback: 'Natural language processing is generative AI\'s core strength. Hallucinations — confident but incorrect outputs — are the well-known limitation.' },
                  { label: 'Requiring manual programming for each new task', correct: false, feedback: 'Generative AI is versatile across tasks without reprogramming. Hallucinations are the key limitation to watch for.' },
                  { label: 'Only working with English text', correct: false, feedback: 'Modern LLMs work across many languages. The well-known limitation is hallucinations — plausible but incorrect outputs.' },
                ]
              },
              {
                id: 'aif-l17-s2-q5',
                question: 'The course emphasizes that the most effective AI applications combine human and AI strengths. What do humans uniquely contribute?',
                codeBlock: null,
                options: [
                  { label: 'Critical thinking, judgment, creativity, and ethical oversight', correct: true, feedback: 'Correct. AI brings speed, scale, and pattern recognition. Humans bring critical thinking, nuanced judgment, genuine creativity, and ethical oversight. The best outcomes emerge from combining both.' },
                  { label: 'Faster processing and larger memory', correct: false, feedback: 'Those are AI strengths. Humans uniquely contribute critical thinking, judgment, creativity, and ethical oversight.' },
                  { label: 'More training data and better algorithms', correct: false, feedback: 'Those are technical AI components. The human contribution is critical thinking, judgment, creativity, and ethical oversight.' },
                  { label: 'Nothing — AI can do everything better', correct: false, feedback: 'The course explicitly rejects this view. Humans contribute irreplaceable critical thinking, judgment, creativity, and ethical oversight.' },
                ]
              },
            ]
          },
        ]
      },
      {
        id: 'aif-l18',
        title: 'Delegation & Description',
        slug: 'ai-fluency/delegation-description',
        cardSets: [
          {
            id: 'aif-l18-s1',
            title: 'Set 1 — Delegation',
            cards: [
              {
                id: 'aif-l18-s1-q1',
                question: 'Delegation has three components. Your colleague says "I just ask AI to do everything." What component are they skipping?',
                codeBlock: null,
                options: [
                  { label: 'Problem Awareness — understanding your goals and the work involved before involving AI', correct: true, feedback: 'Correct. Problem Awareness means clearly understanding what you\'re trying to achieve before deciding what to delegate. Without it, you\'re blindly handing off work without knowing what "good" looks like.' },
                  { label: 'Platform Awareness — knowing what AI can do', correct: false, feedback: 'Platform Awareness matters, but the first missing step is Problem Awareness — understanding the goal before deciding what to delegate.' },
                  { label: 'Task Delegation — dividing work effectively', correct: false, feedback: 'Task Delegation is the final step. First you need Problem Awareness — understanding the goal and the work involved.' },
                  { label: 'Description — communicating clearly with AI', correct: false, feedback: 'Description is a separate competency. Within Delegation, the missing component is Problem Awareness.' },
                ]
              },
              {
                id: 'aif-l18-s1-q2',
                question: 'What are the three components of the Delegation competency?',
                codeBlock: null,
                options: [
                  { label: 'Problem Awareness (understanding goals), Platform Awareness (knowing AI capabilities), and Task Delegation (distributing work strategically)', correct: true, feedback: 'Correct. First understand what you need (Problem Awareness), then what AI can do (Platform Awareness), then decide who does what (Task Delegation). This sequence ensures thoughtful delegation rather than reflexive offloading.' },
                  { label: 'Planning, Prompting, and Publishing', correct: false, feedback: 'Delegation\'s three components are Problem Awareness, Platform Awareness, and Task Delegation.' },
                  { label: 'Assigning, Monitoring, and Reviewing', correct: false, feedback: 'Those are management steps. Delegation\'s components are Problem Awareness, Platform Awareness, and Task Delegation.' },
                  { label: 'Input, Processing, and Output', correct: false, feedback: 'Those describe computation. Delegation\'s components are Problem Awareness, Platform Awareness, and Task Delegation.' },
                ]
              },
              {
                id: 'aif-l18-s1-q3',
                question: 'You\'re planning a research report. What does the course say about the goal of Delegation?',
                codeBlock: null,
                options: [
                  { label: 'Not to automate everything, but to create the most effective human-AI partnership for the task', correct: true, feedback: 'Correct. Delegation is strategic, not maximal. Some tasks benefit from human expertise, others from AI speed, and some from collaboration. The goal is the right mix, not the most automation.' },
                  { label: 'To automate as much as possible to save time', correct: false, feedback: 'The course explicitly says the goal is NOT to automate everything. It\'s about creating the most effective partnership.' },
                  { label: 'To keep humans in control of every step', correct: false, feedback: 'Some tasks benefit from AI independence (Agency). The goal is the most effective partnership, which may include AI autonomy where appropriate.' },
                  { label: 'To replace human workers with AI', correct: false, feedback: 'Delegation is about partnership, not replacement. The goal is combining human and AI strengths effectively.' },
                ]
              },
              {
                id: 'aif-l18-s1-q4',
                question: 'Platform Awareness means knowing what different AI systems can do. Why does this matter for Delegation?',
                codeBlock: null,
                options: [
                  { label: 'Without knowing AI capabilities and limitations, you can\'t make informed decisions about which tasks to delegate vs. keep', correct: true, feedback: 'Correct. If you don\'t know an AI\'s strengths (speed, breadth, pattern recognition) and limitations (hallucinations, reasoning gaps, knowledge cutoffs), you\'ll either under-delegate or over-delegate.' },
                  { label: 'So you can pick the cheapest AI service', correct: false, feedback: 'Platform Awareness is about capabilities and limitations, not pricing. It informs which tasks AI can handle well.' },
                  { label: 'To impress colleagues with your AI knowledge', correct: false, feedback: 'Platform Awareness serves a practical purpose: making informed delegation decisions based on what AI can and cannot do.' },
                  { label: 'It doesn\'t matter — all AI systems are the same', correct: false, feedback: 'AI systems vary significantly in capabilities. Platform Awareness helps you match tasks to the right system.' },
                ]
              },
              {
                id: 'aif-l18-s1-q5',
                question: 'The course recommends using AI itself as a planning partner. For a multi-step project, what approach do they suggest?',
                codeBlock: null,
                options: [
                  { label: 'Share your project idea with Claude, let it ask questions to refine the vision, then collaboratively identify tasks and decide which benefit from human vs. AI strengths', correct: true, feedback: 'Correct. The course treats delegation as a collaborative conversation, not a solo planning exercise. Claude can help identify tasks, surface considerations you might miss, and challenge your assumptions about what to delegate.' },
                  { label: 'Write a detailed plan first, then hand every task to AI', correct: false, feedback: 'The course recommends collaborative planning with AI, not solo planning followed by full delegation.' },
                  { label: 'Only delegate tasks you don\'t want to do yourself', correct: false, feedback: 'Delegation should be strategic (based on strengths), not based on personal preference. The course recommends collaborative task analysis.' },
                  { label: 'Never use AI for planning — only for execution', correct: false, feedback: 'The course explicitly uses AI as a planning partner, having conversations about delegation strategy with Claude.' },
                ]
              },
            ]
          },
          {
            id: 'aif-l18-s2',
            title: 'Set 2 — Description',
            cards: [
              {
                id: 'aif-l18-s2-q1',
                question: 'Description has three components. You tell Claude "Write me a blog post." Which component(s) are you missing?',
                codeBlock: null,
                options: [
                  { label: 'All three — Product Description (what format/audience/style), Process Description (how to approach it), and Performance Description (how to behave during collaboration)', correct: true, feedback: 'Correct. "Write me a blog post" has no Product spec (topic? audience? length?), no Process guidance (research first? outline?), and no Performance direction (concise? detailed? challenging?). Clear Description across all three saves iteration time.' },
                  { label: 'Only Product Description — you didn\'t specify the topic', correct: false, feedback: 'Topic is one gap, but you\'re also missing Process Description (approach) and Performance Description (behavior style). All three matter.' },
                  { label: 'None — this is a clear enough prompt', correct: false, feedback: 'This prompt is severely underspecified. Description requires Product (what), Process (how), and Performance (behavior) clarity.' },
                  { label: 'Only Performance Description — you didn\'t say "be creative"', correct: false, feedback: 'You\'re missing all three: Product (format/audience/style), Process (approach/steps), and Performance (behavior/tone).' },
                ]
              },
              {
                id: 'aif-l18-s2-q2',
                question: 'What is Product Description?',
                codeBlock: null,
                options: [
                  { label: 'Clearly defining what you want the AI to create — outputs, format, audience, and style', correct: true, feedback: 'Correct. Product Description is the "what" — specifying the deliverable. Include format (email? report?), audience (technical? executive?), style (formal? conversational?), and any other output requirements.' },
                  { label: 'Describing a product you want to sell', correct: false, feedback: 'Product Description in the 4D Framework means defining the output you want AI to create — format, audience, style, length.' },
                  { label: 'Writing product documentation', correct: false, feedback: 'Product Description means specifying what AI should create for you — the deliverable definition, not documentation.' },
                  { label: 'Telling AI about your company\'s products', correct: false, feedback: 'Product Description is about defining the AI\'s output — what you want created, in what format, for what audience.' },
                ]
              },
              {
                id: 'aif-l18-s2-q3',
                question: 'You want Claude to write a technical guide but find it\'s being too verbose and not challenging your assumptions. Which Description component addresses this?',
                codeBlock: null,
                options: [
                  { label: 'Performance Description — defining how you want the AI to behave (concise vs. detailed, challenging vs. supportive)', correct: true, feedback: 'Correct. Performance Description shapes the AI\'s behavior during collaboration. Tell it to be concise, push back on weak arguments, or ask probing questions. It\'s not about what to create (Product) but how to interact.' },
                  { label: 'Product Description — specifying the output format', correct: false, feedback: 'Product Description defines the deliverable. The AI\'s verbosity and passivity are behavioral issues — that\'s Performance Description.' },
                  { label: 'Process Description — guiding the approach', correct: false, feedback: 'Process Description guides methodology. How the AI communicates (verbose/concise, challenging/supportive) is Performance Description.' },
                  { label: 'Delegation — you should do it yourself instead', correct: false, feedback: 'The fix is better Performance Description — tell the AI to be concise and challenge your thinking.' },
                ]
              },
              {
                id: 'aif-l18-s2-q4',
                question: 'The course describes AI systems as "interactive partners, not databases or vending machines." What does this mean for Description?',
                codeBlock: null,
                options: [
                  { label: 'You should communicate with AI the way you\'d brief a skilled colleague — providing context, goals, and expectations — not just input a query and expect a perfect answer', correct: true, feedback: 'Correct. Treating AI as a partner means giving it Product (what to create), Process (how to approach it), and Performance (how to interact) context. A vending machine needs a button press; a partner needs a briefing.' },
                  { label: 'AI will always ask follow-up questions before starting', correct: false, feedback: 'AI can be prompted to ask questions, but the insight is about YOUR approach — treating AI as a partner worth briefing, not a tool worth commanding.' },
                  { label: 'You should keep prompts as short as possible', correct: false, feedback: 'The opposite — treating AI as a partner means providing rich context (Product, Process, Performance Description), not minimal commands.' },
                  { label: 'AI has feelings and should be treated politely', correct: false, feedback: 'The point is about communication strategy, not sentiment. Brief AI like a colleague — with context, goals, and expectations.' },
                ]
              },
              {
                id: 'aif-l18-s2-q5',
                question: 'The course lists six foundational prompting techniques. Which is called the "secret weapon"?',
                codeBlock: null,
                options: [
                  { label: 'Asking the AI itself to help improve your prompt', correct: true, feedback: 'Correct. The "meta-prompting" technique — asking AI to critique and improve your prompt before you use it — is called the secret weapon. It leverages the AI\'s understanding of what makes a good prompt.' },
                  { label: 'Giving context about what you want', correct: false, feedback: 'Context is foundational but not the "secret weapon." The secret weapon is asking AI to help improve your prompt.' },
                  { label: 'Breaking complex tasks into steps', correct: false, feedback: 'Step decomposition is one of the six techniques. The "secret weapon" is asking AI to help refine your prompt.' },
                  { label: 'Defining the AI\'s role or tone', correct: false, feedback: 'Role/tone setting is one technique. The "secret weapon" is meta-prompting — asking AI to improve your prompt itself.' },
                ]
              },
            ]
          },
        ]
      },
      {
        id: 'aif-l19',
        title: 'Discernment & Diligence',
        slug: 'ai-fluency/discernment-diligence',
        cardSets: [
          {
            id: 'aif-l19-s1',
            title: 'Set 1 — Discernment',
            cards: [
              {
                id: 'aif-l19-s1-q1',
                question: 'Discernment is the "flip side" of which other competency?',
                codeBlock: null,
                options: [
                  { label: 'Description — Description helps you communicate intentions, Discernment helps you evaluate whether outputs meet those intentions', correct: true, feedback: 'Correct. Description and Discernment form a natural loop. You describe what you want, evaluate what you get, then refine your description based on what you learned. They\'re two halves of the same cycle.' },
                  { label: 'Delegation — Discernment evaluates what you delegated', correct: false, feedback: 'While Discernment can inform future Delegation decisions, the course specifically pairs Discernment as the flip side of Description.' },
                  { label: 'Diligence — Discernment is the ethical check', correct: false, feedback: 'Diligence handles ethics. Discernment is paired with Description as two sides of the communication-evaluation cycle.' },
                  { label: 'It\'s independent — it doesn\'t pair with any other competency', correct: false, feedback: 'The course explicitly calls Discernment the flip side of Description. They form a continuous feedback loop.' },
                ]
              },
              {
                id: 'aif-l19-s1-q2',
                question: 'Claude generated a market analysis for you. You notice the data supports your hypothesis but some statistics seem too convenient. Which type of Discernment are you applying?',
                codeBlock: null,
                options: [
                  { label: 'Product Discernment — evaluating the quality of AI outputs for accuracy, appropriateness, coherence, and relevance', correct: true, feedback: 'Correct. Product Discernment focuses on the output itself. Questioning suspicious statistics is evaluating accuracy and relevance — classic Product Discernment.' },
                  { label: 'Process Discernment — assessing how AI approached the task', correct: false, feedback: 'Process Discernment examines the AI\'s methodology. Checking whether specific statistics are accurate is Product Discernment — evaluating the output quality.' },
                  { label: 'Performance Discernment — evaluating how AI behaved', correct: false, feedback: 'Performance Discernment evaluates communication style and responsiveness. Checking data accuracy is Product Discernment.' },
                  { label: 'Delegation Discernment — deciding if you should have done it yourself', correct: false, feedback: 'There\'s no "Delegation Discernment." The three types are Product, Process, and Performance Discernment.' },
                ]
              },
              {
                id: 'aif-l19-s1-q3',
                question: 'You asked Claude to analyze a problem step-by-step, but it skipped a critical logical step and jumped to a conclusion. Which Discernment type catches this?',
                codeBlock: null,
                options: [
                  { label: 'Process Discernment — assessing how the AI approached the task, looking for logical errors, attention gaps, or inappropriate reasoning', correct: true, feedback: 'Correct. Process Discernment examines the AI\'s reasoning path. A skipped logical step is a process failure — the methodology was flawed even if the conclusion happened to be right.' },
                  { label: 'Product Discernment — the final answer might still be correct', correct: false, feedback: 'Even if the answer is correct, a flawed reasoning process is a Process Discernment issue. Skipped logic means the conclusion isn\'t trustworthy.' },
                  { label: 'Performance Discernment — the AI wasn\'t thorough enough', correct: false, feedback: 'Thoroughness of reasoning is Process Discernment. Performance Discernment is about communication style and behavior.' },
                  { label: 'This isn\'t a Discernment issue — just ask it to try again', correct: false, feedback: 'This is exactly what Process Discernment catches — flawed reasoning that needs to be identified before you can improve your Description.' },
                ]
              },
              {
                id: 'aif-l19-s1-q4',
                question: 'What is the Description-Discernment loop?',
                codeBlock: null,
                options: [
                  { label: 'An iterative cycle: describe what you want → evaluate what you get → refine your description → evaluate again, creating results that exceed what either human or AI could achieve alone', correct: true, feedback: 'Correct. The loop is the core workflow of AI collaboration. Each cycle improves both your Description skills and the AI\'s output. The course claims this loop can produce results beyond what either party could achieve independently.' },
                  { label: 'A one-time quality check before publishing AI output', correct: false, feedback: 'It\'s iterative, not one-time. The loop means continuous refinement through describe-evaluate-refine cycles.' },
                  { label: 'A tool that automatically checks AI responses', correct: false, feedback: 'The loop is a human practice, not an automated tool. You actively describe, evaluate, and refine in cycles.' },
                  { label: 'A way to train AI on your preferences', correct: false, feedback: 'The loop improves each interaction through iterative refinement, but it\'s not about training the AI permanently.' },
                ]
              },
              {
                id: 'aif-l19-s1-q5',
                question: 'The course says "even the most advanced AI systems benefit from human judgment and oversight." What makes human Discernment irreplaceable?',
                codeBlock: null,
                options: [
                  { label: 'Humans bring domain expertise, contextual understanding, ethical judgment, and the ability to catch subtle errors that AI cannot self-detect', correct: true, feedback: 'Correct. AI can\'t reliably evaluate its own outputs — it doesn\'t "know what it doesn\'t know." Human domain expertise catches factual errors, contextual mismatches, and ethical issues that AI would miss or generate confidently.' },
                  { label: 'Humans are smarter than AI in every way', correct: false, feedback: 'AI excels at many tasks. Human Discernment is irreplaceable specifically because of domain expertise, context, and ethical judgment — not general superiority.' },
                  { label: 'AI never makes mistakes when properly prompted', correct: false, feedback: 'AI regularly makes mistakes (hallucinations, reasoning errors) regardless of prompt quality. That\'s exactly why human Discernment matters.' },
                  { label: 'Discernment is optional for experienced AI users', correct: false, feedback: 'The course says even the most advanced AI needs human oversight. Discernment is essential regardless of experience level.' },
                ]
              },
            ]
          },
          {
            id: 'aif-l19-s2',
            title: 'Set 2 — Diligence',
            cards: [
              {
                id: 'aif-l19-s2-q1',
                question: 'Diligence addresses a different dimension than the other three competencies. What does it focus on?',
                codeBlock: null,
                options: [
                  { label: 'The ethical and safety aspects — while Delegation, Description, and Discernment address effectiveness and efficiency, Diligence ensures responsible AI use', correct: true, feedback: 'Correct. Diligence is the "ethical and safe" half of the AI Fluency definition. The other 3Ds make you effective and efficient; Diligence makes you responsible and trustworthy.' },
                  { label: 'Speed and productivity optimization', correct: false, feedback: 'Speed is about efficiency (covered by the other 3Ds). Diligence specifically addresses ethics, safety, and responsibility.' },
                  { label: 'Technical accuracy of AI outputs', correct: false, feedback: 'Technical accuracy falls under Discernment. Diligence focuses on ethical responsibility, transparency, and accountability.' },
                  { label: 'Learning more about AI technology', correct: false, feedback: 'Diligence is about responsible practice — ethics, transparency, and accountability in AI collaboration.' },
                ]
              },
              {
                id: 'aif-l19-s2-q2',
                question: 'What are the three components of Diligence?',
                codeBlock: null,
                options: [
                  { label: 'Creation Diligence (choosing AI systems thoughtfully), Transparency Diligence (being open about AI\'s role), and Deployment Diligence (taking ownership of AI-assisted outputs)', correct: true, feedback: 'Correct. Creation = thoughtful tool choice and data sharing. Transparency = honest disclosure. Deployment = taking responsibility for verifying and vouching for outputs you share.' },
                  { label: 'Legal, Ethical, and Technical diligence', correct: false, feedback: 'Diligence\'s three components are Creation (tool choice), Transparency (disclosure), and Deployment (output responsibility).' },
                  { label: 'Input, Process, and Output diligence', correct: false, feedback: 'The three components are Creation Diligence, Transparency Diligence, and Deployment Diligence.' },
                  { label: 'Privacy, Security, and Compliance', correct: false, feedback: 'Those are related concerns, but Diligence\'s specific components are Creation, Transparency, and Deployment.' },
                ]
              },
              {
                id: 'aif-l19-s2-q3',
                question: 'You used Claude to help write a report and are about to submit it to your team. Deployment Diligence requires you to:',
                codeBlock: null,
                options: [
                  { label: 'Take ownership by verifying facts, checking for biases, ensuring accuracy, and checking usage rights before sharing — you vouch for the output', correct: true, feedback: 'Correct. Deployment Diligence means you\'re personally responsible for AI-assisted outputs you share. Verify facts, check biases, ensure accuracy — if your name is on it, you own it.' },
                  { label: 'Just add a disclaimer saying "AI-generated"', correct: false, feedback: 'A disclaimer addresses Transparency but not Deployment Diligence. You must also verify facts, check biases, and take responsibility for quality.' },
                  { label: 'Submit it as-is — AI outputs are reliable enough', correct: false, feedback: 'Deployment Diligence requires active verification. AI outputs can contain errors, biases, and hallucinations that need human checking.' },
                  { label: 'Have another AI check the first AI\'s work', correct: false, feedback: 'AI checking AI doesn\'t fulfill your responsibility. Deployment Diligence means YOU verify and take ownership of what you share.' },
                ]
              },
              {
                id: 'aif-l19-s2-q4',
                question: 'Your company has no AI disclosure policy. Transparency Diligence says you should:',
                codeBlock: null,
                options: [
                  { label: 'Be honest about AI\'s role in your work with everyone who needs to know — different contexts may have different expectations, but default to transparency', correct: true, feedback: 'Correct. Transparency Diligence means proactive honesty about AI\'s involvement. Even without a formal policy, disclose to stakeholders. Context matters — academic, professional, and personal settings may have different norms.' },
                  { label: 'Keep AI use private since there\'s no policy requiring disclosure', correct: false, feedback: 'The absence of a policy doesn\'t justify secrecy. Transparency Diligence means defaulting to honest disclosure.' },
                  { label: 'Wait until someone asks before disclosing', correct: false, feedback: 'Transparency Diligence is proactive, not reactive. Be open about AI\'s role without waiting to be asked.' },
                  { label: 'Only disclose if AI wrote more than 50% of the content', correct: false, feedback: 'There\'s no percentage threshold. Transparency Diligence means being honest about AI\'s role regardless of degree.' },
                ]
              },
              {
                id: 'aif-l19-s2-q5',
                question: 'Creation Diligence involves being thoughtful about which AI systems you choose. What considerations does this include?',
                codeBlock: null,
                options: [
                  { label: 'Privacy, security, and ethical considerations — being thoughtful about what data you share with AI and which systems you trust', correct: true, feedback: 'Correct. Creation Diligence means considering: Does this system protect my data? Am I sharing sensitive information appropriately? Does this vendor\'s ethics align with my values? The choice of tool is itself an ethical decision.' },
                  { label: 'Only which AI gives the fastest responses', correct: false, feedback: 'Speed is a practical consideration, not a Diligence one. Creation Diligence focuses on privacy, security, and ethical implications of tool choice.' },
                  { label: 'Whichever AI is cheapest', correct: false, feedback: 'Cost is practical, not ethical. Creation Diligence considers privacy, security, and ethical factors in tool selection.' },
                  { label: 'Using as many different AI systems as possible', correct: false, feedback: 'Creation Diligence is about thoughtful selection, not variety. Consider privacy, security, and ethics for each system.' },
                ]
              },
            ]
          },
        ]
      },
    ]
  },
  {
    id: 'anthropic-api',
    title: 'Anthropic API',
    color: '#e11d48',
    lessons: [
      {
        id: 'api-l20',
        title: 'API Fundamentals',
        slug: 'api/fundamentals',
        cardSets: [
          {
            id: 'api-l20-s1',
            title: 'Set 1 — Models & API Access',
            cards: [
              {
                id: 'api-l20-s1-q1', question: 'What are the three Claude model families and their primary trade-offs?', codeBlock: null, options: [
                  { label: 'Haiku (fast, cheap), Sonnet (balanced), Opus (most capable but slower and costlier)', correct: true, feedback: 'Correct. Haiku optimizes for speed and cost, Sonnet balances capability with efficiency, and Opus delivers maximum intelligence for complex tasks.' },
                  { label: 'Mini (small context), Standard (medium context), Max (largest context)', correct: false, feedback: 'Not quite. The families differ in capability and cost, not context window size. All models support large context windows.' },
                  { label: 'Chat (conversations), Code (programming), Vision (images)', correct: false, feedback: 'Incorrect. All Claude models handle chat, code, and vision. The families are Haiku, Sonnet, and Opus.' },
                  { label: 'Free (rate-limited), Pro (paid), Enterprise (custom)', correct: false, feedback: 'No. Haiku, Sonnet, and Opus are capability tiers, not pricing plans.' },
                ]},
              {
                id: 'api-l20-s1-q2', question: 'What is the base URL for the Anthropic Messages API, and what required header authenticates requests?', codeBlock: 'POST https://api.anthropic.com/v1/messages\n\nHeaders:\n  x-api-key: sk-ant-...\n  anthropic-version: 2023-06-01\n  content-type: application/json', options: [
                  { label: 'https://api.anthropic.com/v1/messages with the x-api-key header', correct: true, feedback: 'Correct. The x-api-key header carries your API key. The anthropic-version header is also required to specify the API version.' },
                  { label: 'https://api.anthropic.com/v1/chat with the Authorization: Bearer header', correct: false, feedback: 'Not quite. The endpoint is /v1/messages (not /chat), and Anthropic uses x-api-key, not Bearer tokens.' },
                  { label: 'https://claude.anthropic.com/api with the api-token header', correct: false, feedback: 'Incorrect. The base URL is api.anthropic.com/v1/messages and authentication uses x-api-key.' },
                  { label: 'https://api.anthropic.com/v2/completions with the x-api-key header', correct: false, feedback: 'No. The current API uses /v1/messages. The older completions API has been deprecated.' },
                ]},
              {
                id: 'api-l20-s1-q3', question: 'What are the minimum required fields in a Messages API request body?', codeBlock: '{\n  "model": "claude-sonnet-4-20250514",\n  "max_tokens": 1024,\n  "messages": [\n    {"role": "user", "content": "Hello, Claude"}\n  ]\n}', options: [
                  { label: 'model, max_tokens, and messages', correct: true, feedback: 'Correct. model specifies which Claude to use, max_tokens caps the response length, and messages contains the conversation history.' },
                  { label: 'model, messages, and temperature', correct: false, feedback: 'Close but temperature is optional (defaults to 1.0). max_tokens is the required field you\'re missing.' },
                  { label: 'model, prompt, and max_tokens', correct: false, feedback: 'Not quite. The Messages API uses messages (an array of role/content objects), not a single prompt string.' },
                  { label: 'model, messages, system, and max_tokens', correct: false, feedback: 'Almost — system is optional. The three required fields are model, max_tokens, and messages.' },
                ]},
              {
                id: 'api-l20-s1-q4', question: 'How does the Anthropic SDK differ from making raw HTTP requests to the API?', codeBlock: '# SDK approach\nimport anthropic\nclient = anthropic.Anthropic()  # reads ANTHROPIC_API_KEY env var\nresponse = client.messages.create(\n    model="claude-sonnet-4-20250514",\n    max_tokens=1024,\n    messages=[{"role": "user", "content": "Hi"}]\n)', options: [
                  { label: 'The SDK handles auth from environment variables, provides typed responses, manages retries, and validates parameters automatically', correct: true, feedback: 'Correct. The SDK reads ANTHROPIC_API_KEY from the environment, returns typed objects instead of raw JSON, handles transient errors with retries, and validates inputs before sending.' },
                  { label: 'The SDK uses a completely different protocol than the HTTP API', correct: false, feedback: 'No — the SDK wraps the same HTTP API underneath. It provides convenience, not a different protocol.' },
                  { label: 'The SDK only works with Python; other languages must use raw HTTP', correct: false, feedback: 'Incorrect. Anthropic provides official SDKs for Python and TypeScript/JavaScript, and community SDKs exist for other languages.' },
                  { label: 'The SDK is faster because it uses a direct connection to Anthropic servers', correct: false, feedback: 'Not true. The SDK makes the same HTTP requests — it just wraps them in a more ergonomic interface.' },
                ]},
              {
                id: 'api-l20-s1-q5', question: 'What is the structure of a Messages API response, and how do you extract the text?', codeBlock: '{\n  "id": "msg_01XFDUDYJgAACzvnptvVoYEL",\n  "type": "message",\n  "role": "assistant",\n  "content": [\n    {"type": "text", "text": "Hello! How can I help?"}\n  ],\n  "model": "claude-sonnet-4-20250514",\n  "stop_reason": "end_turn",\n  "usage": {"input_tokens": 12, "output_tokens": 8}\n}', options: [
                  { label: 'response.content is an array of content blocks; extract text via response.content[0].text', correct: true, feedback: 'Correct. The content field is always an array — it can contain text blocks, tool_use blocks, or thinking blocks. The usage field tracks token counts for billing.' },
                  { label: 'response.text contains the full response as a plain string', correct: false, feedback: 'No. The response uses a content array of typed blocks, not a single text string. This design supports mixed content like text + tool calls.' },
                  { label: 'response.message.content is a string you can use directly', correct: false, feedback: 'Incorrect. content is an array of blocks (each with type and text fields), not a plain string.' },
                  { label: 'response.choices[0].message.content like the OpenAI format', correct: false, feedback: 'That\'s the OpenAI response format, not Anthropic\'s. Anthropic uses content (an array of blocks) directly on the response object.' },
                ]},
            ]},
          {
            id: 'api-l20-s2',
            title: 'Set 2 — Conversations, System Prompts & Output Control',
            cards: [
              {
                id: 'api-l20-s2-q1', question: 'How do you implement multi-turn conversations with the Messages API?', codeBlock: 'messages = [\n  {"role": "user", "content": "What is Python?"},\n  {"role": "assistant", "content": "Python is a programming language..."},\n  {"role": "user", "content": "What makes it popular?"}\n]', options: [
                  { label: 'Send the full conversation history in the messages array, alternating user and assistant roles', correct: true, feedback: 'Correct. The API is stateless — each request must include the complete conversation. Messages must alternate between user and assistant roles. You typically append the previous response to the array before sending the next user message.' },
                  { label: 'Use a session ID that the API provides to continue the conversation', correct: false, feedback: 'No. The Messages API is stateless — there are no session IDs. You must send the full history each time.' },
                  { label: 'Call a separate /v1/conversations endpoint to maintain state', correct: false, feedback: 'Incorrect. There is no conversations endpoint. The API is stateless; you manage conversation history client-side.' },
                  { label: 'Set a conversation_id parameter in the request body', correct: false, feedback: 'No such parameter exists. The API is stateless by design — you pass the full message history each time.' },
                ]},
              {
                id: 'api-l20-s2-q2', question: 'Where does the system prompt go in a Messages API request, and what is it for?', codeBlock: '{\n  "model": "claude-sonnet-4-20250514",\n  "max_tokens": 1024,\n  "system": "You are a helpful coding assistant...",\n  "messages": [...]\n}', options: [
                  { label: 'It\'s a top-level "system" field (not inside messages) that sets Claude\'s persona, instructions, and behavioral constraints', correct: true, feedback: 'Correct. The system prompt is a top-level parameter, separate from the messages array. It\'s processed before any messages and is ideal for persistent instructions, persona definition, and output format requirements.' },
                  { label: 'It goes as the first message with role "system" in the messages array', correct: false, feedback: 'Not in the Anthropic API. Unlike some other APIs, Anthropic uses a dedicated top-level system field, not a system role in messages.' },
                  { label: 'It\'s set once per API key and applies to all requests automatically', correct: false, feedback: 'Incorrect. The system prompt is per-request — you include it in each API call where you want it applied.' },
                  { label: 'It replaces the first user message and uses a special "instruction" role', correct: false, feedback: 'No. The system prompt is a separate top-level field, and the messages array only supports "user" and "assistant" roles.' },
                ]},
              {
                id: 'api-l20-s2-q3', question: 'What does the temperature parameter control, and what are appropriate values for different use cases?', codeBlock: null, options: [
                  { label: 'It controls randomness: 0.0 for deterministic/analytical tasks, ~0.7 for creative tasks, up to 1.0 for maximum variety', correct: true, feedback: 'Correct. Temperature 0 makes output nearly deterministic (best for code, math, classification). Higher values increase randomness and creativity. The range is 0.0–1.0, defaulting to 1.0.' },
                  { label: 'It controls response length: lower values produce shorter responses, higher values produce longer ones', correct: false, feedback: 'No — that\'s max_tokens. Temperature controls randomness in token selection, not length.' },
                  { label: 'It controls thinking depth: 0 for quick answers, 1.0 for deep reasoning', correct: false, feedback: 'Incorrect. Temperature affects randomness in word choice, not reasoning depth. For deeper reasoning, use extended thinking.' },
                  { label: 'It ranges from -1.0 to 1.0, where negative values make responses more concise', correct: false, feedback: 'Not true. Temperature ranges from 0.0 to 1.0 only, controlling sampling randomness.' },
                ]},
              {
                id: 'api-l20-s2-q4', question: 'How does response streaming work with the Messages API?', codeBlock: 'with client.messages.stream(\n    model="claude-sonnet-4-20250514",\n    max_tokens=1024,\n    messages=[...]\n) as stream:\n    for text in stream.text_stream:\n        print(text, end="", flush=True)', options: [
                  { label: 'Use the streaming endpoint or SDK stream method to receive server-sent events (SSE) that deliver tokens incrementally as they\'re generated', correct: true, feedback: 'Correct. Streaming uses SSE to send partial responses in real-time. Events include message_start, content_block_delta (with text chunks), and message_stop. The SDK provides convenient helpers like text_stream.' },
                  { label: 'Set stream=true in the regular request and poll a separate status endpoint', correct: false, feedback: 'No polling needed. Streaming uses server-sent events — the server pushes tokens to you over a persistent connection.' },
                  { label: 'Use WebSocket connections to receive tokens bidirectionally', correct: false, feedback: 'Incorrect. The API uses server-sent events (SSE) over HTTP, not WebSockets.' },
                  { label: 'Streaming is automatic — all API responses arrive token by token', correct: false, feedback: 'No. Streaming must be explicitly requested. By default, the API returns the complete response in a single JSON object.' },
                ]},
              {
                id: 'api-l20-s2-q5', question: 'How do you get Claude to return structured data (like JSON) reliably?', codeBlock: null, options: [
                  { label: 'Describe the desired format in the system prompt or user message, optionally use XML tags to mark sections, and prefill the assistant response with the opening character', correct: true, feedback: 'Correct. Tell Claude the exact format you want (e.g., "Respond with valid JSON"), use XML tags to delimit structured sections, and you can prefill the assistant turn with "{" to force JSON output. This combination yields highly reliable structured output.' },
                  { label: 'Set response_format: "json" in the request parameters', correct: false, feedback: 'The Anthropic API does not have a response_format parameter like some other APIs. You guide structure through prompting and optional prefilling.' },
                  { label: 'Use a separate /v1/structured endpoint designed for JSON responses', correct: false, feedback: 'No such endpoint exists. Structured output is achieved through prompt design and prefilling techniques.' },
                  { label: 'Include a JSON schema in the request and Claude validates against it automatically', correct: false, feedback: 'The Messages API doesn\'t accept output schemas directly. Use prompting + prefilling, or use tool use (which does enforce JSON schemas for tool inputs).' },
                ]},
            ]},
        ]
      },
      {
        id: 'api-l21',
        title: 'Prompt Evaluation',
        slug: 'api/prompt-eval',
        cardSets: [
          {
            id: 'api-l21-s1',
            title: 'Set 1 — Eval Workflows & Test Datasets',
            cards: [
              {
                id: 'api-l21-s1-q1', question: 'Why is prompt evaluation essential, and what problem does it solve?', codeBlock: null, options: [
                  { label: 'It provides systematic, repeatable measurement of prompt quality — replacing subjective "does this feel right?" with quantitative scoring across diverse test cases', correct: true, feedback: 'Correct. Without evals, you\'re guessing. A change that improves one response might degrade ten others. Evals let you measure the impact of prompt changes across a representative dataset before deploying.' },
                  { label: 'It prevents Claude from hallucinating by validating all outputs against a database', correct: false, feedback: 'Evals measure prompt quality, not prevent hallucination directly. They help you detect when hallucination rates increase due to prompt changes.' },
                  { label: 'It\'s required by Anthropic before you can use the API in production', correct: false, feedback: 'Evals are not required by Anthropic. They\'re a best practice for building reliable AI applications.' },
                  { label: 'It automatically optimizes your prompts using machine learning', correct: false, feedback: 'Evals measure performance — they don\'t automatically optimize. You use eval results to guide manual prompt improvements.' },
                ]},
              {
                id: 'api-l21-s1-q2', question: 'What are the key steps in a typical prompt evaluation workflow?', codeBlock: null, options: [
                  { label: 'Define the task → create test dataset (inputs + expected outputs) → run the prompt against all test cases → grade results → analyze scores → iterate', correct: true, feedback: 'Correct. The workflow is: clearly define what "good" looks like, build a representative test dataset with golden answers, run your prompt across all cases, apply grading (human, model-based, or code-based), then use the results to improve your prompt.' },
                  { label: 'Write a prompt → test it once → ship to production → monitor for errors', correct: false, feedback: 'This skips the systematic evaluation step. A single test doesn\'t catch edge cases or regressions across diverse inputs.' },
                  { label: 'A/B test two prompts in production and pick the one users prefer', correct: false, feedback: 'A/B testing in production is too late and risky. Evals let you compare prompts offline before deployment.' },
                  { label: 'Send your prompt to Anthropic\'s eval service and receive an automated score', correct: false, feedback: 'Anthropic doesn\'t provide an eval service. You build and run your own evals tailored to your specific use case.' },
                ]},
              {
                id: 'api-l21-s1-q3', question: 'How can you generate test datasets for prompt evaluation?', codeBlock: null, options: [
                  { label: 'Use Claude itself to generate diverse test cases, then manually review and curate them — supplementing with real-world examples from your application', correct: true, feedback: 'Correct. Claude can rapidly generate varied test inputs covering edge cases, different formats, and challenging scenarios. Always review generated data for quality, and mix in real examples from production to ensure the dataset is representative.' },
                  { label: 'Only use real production data — synthetic data is unreliable for evaluation', correct: false, feedback: 'Synthetic data generated by Claude is very useful, especially for covering edge cases you haven\'t seen in production yet. Best practice is to combine both.' },
                  { label: 'Use random strings as inputs since the goal is testing robustness', correct: false, feedback: 'Random strings don\'t test meaningful behavior. Test cases should represent realistic inputs your prompt will actually encounter.' },
                  { label: 'Download pre-made datasets from Anthropic\'s eval library', correct: false, feedback: 'Anthropic doesn\'t provide pre-made eval datasets for your specific use case. You need to create datasets tailored to your application.' },
                ]},
              {
                id: 'api-l21-s1-q4', question: 'What makes a good test dataset for prompt evaluation?', codeBlock: null, options: [
                  { label: 'Diverse inputs covering normal cases, edge cases, and adversarial inputs — each paired with a clear expected output or grading criteria', correct: true, feedback: 'Correct. Good datasets include: variety (different topics, lengths, formats), edge cases (ambiguous inputs, boundary conditions), adversarial examples (attempts to break the prompt), and clear "golden" answers or rubrics for grading.' },
                  { label: 'At least 10,000 examples to ensure statistical significance', correct: false, feedback: 'Quality matters more than quantity. A well-curated set of 50-100 diverse examples often outperforms a large homogeneous dataset.' },
                  { label: 'Only examples where the current prompt fails, so you can fix weaknesses', correct: false, feedback: 'You also need examples where the prompt succeeds — to catch regressions when you make changes.' },
                  { label: 'Identical inputs repeated multiple times to test consistency', correct: false, feedback: 'Repetition tests temperature variance, not prompt quality. Diverse inputs are more valuable for evaluation.' },
                ]},
              {
                id: 'api-l21-s1-q5', question: 'What is the difference between running an eval in development vs. production?', codeBlock: null, options: [
                  { label: 'Development evals use curated test datasets to compare prompt versions before deployment; production evals monitor live outputs for quality degradation', correct: true, feedback: 'Correct. In development, you run controlled experiments: same inputs, different prompts, compare scores. In production, you sample real outputs and grade them to detect drift, regressions, or emerging failure patterns.' },
                  { label: 'Development evals are faster because they use smaller models', correct: false, feedback: 'Both should use the same model you\'ll deploy with. Using a different model gives misleading results.' },
                  { label: 'Production evals are unnecessary if your development evals pass', correct: false, feedback: 'Production data can differ from test datasets in unexpected ways. Continuous monitoring catches issues that offline evals miss.' },
                  { label: 'Development evals use human graders; production evals are fully automated', correct: false, feedback: 'Both can use either approach. Development evals are often automated too (model-based or code-based grading).' },
                ]},
            ]},
          {
            id: 'api-l21-s2',
            title: 'Set 2 — Grading Strategies',
            cards: [
              {
                id: 'api-l21-s2-q1', question: 'What is model-based grading and when should you use it?', codeBlock: null, options: [
                  { label: 'Using Claude (or another LLM) as an automated grader to score outputs against rubrics — best for subjective quality assessment where exact-match checking is too rigid', correct: true, feedback: 'Correct. Model-based grading uses an LLM to evaluate responses against defined criteria (accuracy, tone, completeness). It excels at nuanced judgment: "Is this summary faithful to the source?" or "Is this response helpful?"' },
                  { label: 'Training a custom ML model specifically to grade Claude\'s outputs', correct: false, feedback: 'No custom training needed. You use an existing LLM (often Claude itself) with a grading prompt to evaluate outputs.' },
                  { label: 'Using Claude to rewrite the expected output and comparing similarity', correct: false, feedback: 'Model-based grading evaluates the output against criteria, not rewriting expected outputs. It\'s a judge, not a paraphraser.' },
                  { label: 'Only useful for binary pass/fail grading of factual responses', correct: false, feedback: 'Model-based grading excels at nuanced scoring (1-5 scales, multi-criteria rubrics), not just binary pass/fail.' },
                ]},
              {
                id: 'api-l21-s2-q2', question: 'What is code-based grading and when is it preferred over model-based grading?', codeBlock: 'def grade_response(output, expected):\n    # Exact match\n    if output.strip() == expected.strip():\n        return 1.0\n    # Contains required keywords\n    keywords = ["API key", "authentication"]\n    found = sum(1 for k in keywords if k.lower() in output.lower())\n    return found / len(keywords)', options: [
                  { label: 'Using deterministic code (exact match, regex, keyword checks, JSON validation) to score outputs — preferred when correctness is objectively verifiable', correct: true, feedback: 'Correct. Code-based grading is fast, cheap, deterministic, and perfect for: exact-match answers, structured output validation (valid JSON? correct schema?), keyword presence, numerical accuracy, and format compliance.' },
                  { label: 'Writing unit tests for the prompt itself rather than its outputs', correct: false, feedback: 'Code-based grading evaluates outputs, not the prompt. It\'s output validation, not prompt testing.' },
                  { label: 'Always preferred because it\'s more reliable than model-based grading', correct: false, feedback: 'Not always. Code-based grading can\'t assess subjective qualities like helpfulness, tone, or summary faithfulness. Use it when there\'s an objectively "right" answer.' },
                  { label: 'Running Claude\'s output as code to see if it executes without errors', correct: false, feedback: 'That\'s one specific type of code-based eval (for code generation tasks), but code-based grading is broader — any deterministic programmatic check on the output.' },
                ]},
              {
                id: 'api-l21-s2-q3', question: 'How do you design an effective model-based grading prompt?', codeBlock: null, options: [
                  { label: 'Give the grading model the original input, the output to grade, the expected answer or rubric, and clear scoring criteria with examples of each score level', correct: true, feedback: 'Correct. A good grading prompt includes: the original question, Claude\'s response, the ideal answer or rubric, and explicit criteria (e.g., "Score 5 = fully accurate with evidence, Score 1 = factually incorrect"). Examples of each score level calibrate the grader.' },
                  { label: 'Simply ask "Is this response good? Yes or No" to keep grading simple', correct: false, feedback: 'Too vague. Without criteria, the grader\'s judgment is inconsistent. Define what "good" means with specific, measurable criteria.' },
                  { label: 'Use the same model and temperature for grading as for generating responses', correct: false, feedback: 'You should typically use temperature 0 for grading (deterministic judgment) even if the generation used higher temperature. Using a stronger model for grading can also improve accuracy.' },
                  { label: 'Let the model grade its own outputs for maximum efficiency', correct: false, feedback: 'Self-grading creates bias — models tend to rate their own outputs more favorably. Use a separate call with a grading-specific prompt, or use a different model.' },
                ]},
              {
                id: 'api-l21-s2-q4', question: 'What metrics should you track across an eval run?', codeBlock: null, options: [
                  { label: 'Average score, score distribution, worst-case failures, per-category breakdowns, and comparison against baseline (previous prompt version)', correct: true, feedback: 'Correct. Average score shows overall quality. Distribution reveals consistency. Worst-case failures highlight critical risks. Category breakdowns identify weak areas. Baseline comparison shows whether changes actually improved things.' },
                  { label: 'Only the pass/fail rate — either the prompt works or it doesn\'t', correct: false, feedback: 'Binary pass/fail loses nuance. A prompt scoring 4.2/5 vs 3.8/5 both "pass" but differ meaningfully in quality.' },
                  { label: 'Response latency and token count, since those affect cost', correct: false, feedback: 'Those are operational metrics, not eval quality metrics. Eval metrics measure output quality against your success criteria.' },
                  { label: 'The number of test cases that exactly match the expected output', correct: false, feedback: 'Exact match is just one metric and often too strict. Semantic correctness, format compliance, and completeness matter too.' },
                ]},
              {
                id: 'api-l21-s2-q5', question: 'What is the recommended approach when an eval reveals that a prompt change improves some cases but degrades others?', codeBlock: null, options: [
                  { label: 'Analyze the degraded cases to understand why, try to fix the prompt to handle both, and if you can\'t — decide based on which cases are higher priority for your use case', correct: true, feedback: 'Correct. Evals reveal trade-offs. Look at what specifically degraded: are those edge cases you care about? Can you add instructions that cover both patterns? Sometimes you need different prompts for different input types (routing).' },
                  { label: 'Always keep the change if the average score improved', correct: false, feedback: 'Average improvement can mask critical regressions. If the degraded cases are high-stakes (e.g., medical or financial), you can\'t ignore them.' },
                  { label: 'Revert the change — any degradation means the prompt is worse', correct: false, feedback: 'Not necessarily. If minor cases degrade slightly while critical cases improve significantly, the change may be worthwhile.' },
                  { label: 'Run more eval iterations until both improve simultaneously', correct: false, feedback: 'Just re-running won\'t help if there\'s a fundamental tension in the prompt. You need to analyze and strategize, not retry blindly.' },
                ]},
            ]},
        ]
      },
      {
        id: 'api-l22',
        title: 'Prompt Engineering',
        slug: 'api/prompt-engineering',
        cardSets: [
          {
            id: 'api-l22-s1',
            title: 'Set 1 — Core Techniques',
            cards: [
              {
                id: 'api-l22-s1-q1', question: 'What does "being clear and direct" mean in prompt engineering, and why is it the most impactful technique?', codeBlock: null, options: [
                  { label: 'State exactly what you want Claude to do, with no ambiguity — specify the task, format, constraints, and audience upfront rather than hoping Claude infers them', correct: true, feedback: 'Correct. Ambiguity forces Claude to guess your intent. "Summarize this for a technical audience in 3 bullet points, each under 20 words" beats "Summarize this." Being direct eliminates entire categories of unwanted outputs.' },
                  { label: 'Use short, simple prompts because Claude works better with less text', correct: false, feedback: 'Length isn\'t the issue — clarity is. A long, specific prompt outperforms a short, vague one. Add detail where it removes ambiguity.' },
                  { label: 'Use formal language and avoid contractions', correct: false, feedback: 'Formality is irrelevant. Claude understands casual and formal language equally well. What matters is precision about what you want.' },
                  { label: 'Always start prompts with "Please" to get better responses', correct: false, feedback: 'Politeness doesn\'t affect output quality. Specificity and clarity do.' },
                ]},
              {
                id: 'api-l22-s1-q2', question: 'How does "being specific" differ from "being clear and direct"?', codeBlock: null, options: [
                  { label: 'Clear and direct tells Claude what to do; being specific constrains how — with details about format, length, style, audience, scope, and edge case handling', correct: true, feedback: 'Correct. Clarity is the task definition ("classify this email"). Specificity is the constraint system ("use exactly these 5 categories, output JSON, include confidence 0-1, handle empty emails by returning \'unclassifiable\'").' },
                  { label: 'They\'re the same technique described differently', correct: false, feedback: 'They\'re complementary. You can be clear ("summarize this") without being specific (how long? what format? for whom?). The best prompts are both.' },
                  { label: 'Being specific means using technical vocabulary so Claude understands the domain', correct: false, feedback: 'Domain terminology helps but isn\'t what "being specific" means. It means constraining format, scope, length, audience, and behavior for edge cases.' },
                  { label: 'Being specific means providing the full context document with every prompt', correct: false, feedback: 'Context is important, but specificity is about constraining the output — format, length, style, scope — not just providing more input.' },
                ]},
              {
                id: 'api-l22-s1-q3', question: 'Why are XML tags a powerful structuring tool for Claude prompts?', codeBlock: '<instructions>\nSummarize the article below for a non-technical reader.\nKeep it under 100 words.\n</instructions>\n\n<article>\n{{ARTICLE_TEXT}}\n</article>\n\n<output_format>\nReturn a JSON object with "summary" and "key_takeaway" fields.\n</output_format>', options: [
                  { label: 'XML tags create clear visual boundaries between instructions, data, and format requirements — Claude was trained to understand them as semantic delimiters', correct: true, feedback: 'Correct. Claude reliably recognizes XML tags as structural markers. They prevent instructions from bleeding into data, make variable injection safe, and let you reference sections by tag name. They\'re especially useful for complex prompts with multiple components.' },
                  { label: 'XML is the only format Claude can parse for structured input', correct: false, feedback: 'Claude handles many formats (JSON, YAML, markdown). XML tags are preferred for prompt structuring specifically because they\'re unambiguous delimiters, not because they\'re the only option.' },
                  { label: 'They\'re required by the API — prompts without XML tags are rejected', correct: false, feedback: 'XML tags are entirely optional. They\'re a prompt engineering technique, not an API requirement.' },
                  { label: 'They force Claude to respond in XML format automatically', correct: false, feedback: 'Not at all. XML tags in the prompt organize your input — they don\'t dictate the response format. You can use XML input tags and request JSON output.' },
                ]},
              {
                id: 'api-l22-s1-q4', question: 'How do you use few-shot examples effectively in prompts?', codeBlock: '<examples>\n<example>\n<input>The food was great but the service was slow.</input>\n<output>{"sentiment": "mixed", "food": "positive", "service": "negative"}</output>\n</example>\n<example>\n<input>Everything was perfect!</input>\n<output>{"sentiment": "positive", "food": "positive", "service": "positive"}</output>\n</example>\n</examples>', options: [
                  { label: 'Provide 2-5 representative input/output pairs that demonstrate the exact format, logic, and edge cases you expect — diverse examples are better than many similar ones', correct: true, feedback: 'Correct. Few-shot examples show Claude exactly what you want by demonstration. Include: a typical case, an edge case, and a tricky case. Wrap in XML tags for clarity. 2-5 examples usually suffice — more can waste tokens without improving quality.' },
                  { label: 'Include at least 20 examples to ensure Claude learns the pattern', correct: false, feedback: 'More isn\'t always better. 2-5 diverse, well-chosen examples usually outperform 20 similar ones, while using far fewer tokens.' },
                  { label: 'Only include positive examples — never show Claude incorrect outputs', correct: false, feedback: 'Showing both correct and incorrect examples (with labels) can be very effective for classification tasks: "This is correct: X. This is incorrect: Y."' },
                  { label: 'Put examples after your question so Claude sees them last', correct: false, feedback: 'Examples should come before the actual input — they set the pattern Claude follows. The actual input should come last.' },
                ]},
              {
                id: 'api-l22-s1-q5', question: 'What is prompt prefilling and how does it steer Claude\'s response format?', codeBlock: 'response = client.messages.create(\n    model="claude-sonnet-4-20250514",\n    max_tokens=1024,\n    messages=[\n        {"role": "user", "content": "List 3 benefits of Python as JSON"},\n        {"role": "assistant", "content": "{"}\n    ]\n)', options: [
                  { label: 'Pre-populating the start of Claude\'s response in the messages array forces it to continue from that point — putting "{" makes it output JSON, putting "<answer>" makes it use that tag', correct: true, feedback: 'Correct. By including a partial assistant message, you constrain Claude\'s response format from the very first character. This is extremely reliable for forcing JSON, XML, or any specific format. Claude continues naturally from where you left off.' },
                  { label: 'It only works with JSON — prefilling other formats is unreliable', correct: false, feedback: 'Prefilling works with any format: JSON ({), XML (<tag>), markdown (##), code (def/function), or any text pattern.' },
                  { label: 'It\'s the same as putting format instructions in the system prompt', correct: false, feedback: 'Prefilling is stronger — it physically starts the response in your chosen format, while system prompt instructions can still be overridden. They\'re complementary: use both for maximum reliability.' },
                  { label: 'It requires a special API parameter called "prefill"', correct: false, feedback: 'No special parameter. You simply add a partial assistant message to the messages array. The API continues from where it left off.' },
                ]},
            ]},
          {
            id: 'api-l22-s2',
            title: 'Set 2 — Advanced Patterns',
            cards: [
              {
                id: 'api-l22-s2-q1', question: 'What is chain-of-thought prompting and when should you use it?', codeBlock: null, options: [
                  { label: 'Asking Claude to "think step by step" or show its reasoning before answering — improves accuracy on complex reasoning, math, and multi-step logic tasks', correct: true, feedback: 'Correct. Chain-of-thought makes Claude\'s reasoning process explicit, reducing errors on complex tasks. Use it for math, logic puzzles, code debugging, multi-step analysis. Phrases like "Think step by step" or "Explain your reasoning" trigger this behavior.' },
                  { label: 'Breaking your prompt into multiple separate API calls, one step at a time', correct: false, feedback: 'That\'s prompt chaining (a workflow pattern), not chain-of-thought. CoT happens within a single response where Claude reasons before answering.' },
                  { label: 'Providing a chain of examples that build on each other progressively', correct: false, feedback: 'That\'s progressive few-shot prompting. Chain-of-thought is about asking Claude to show its reasoning process before giving a final answer.' },
                  { label: 'Using it for every prompt to maximize quality regardless of task type', correct: false, feedback: 'CoT adds latency and tokens. For simple tasks (translation, formatting), it\'s unnecessary overhead. Reserve it for tasks where reasoning matters.' },
                ]},
              {
                id: 'api-l22-s2-q2', question: 'What is role prompting and how does it affect Claude\'s outputs?', codeBlock: 'system = """You are a senior security engineer performing\na code review. Focus on:\n- SQL injection vulnerabilities\n- Authentication bypasses\n- Data exposure risks\nBe thorough and cite specific line numbers."""', options: [
                  { label: 'Assigning Claude a specific role or persona in the system prompt changes its vocabulary, depth, perspective, and what it prioritizes in responses', correct: true, feedback: 'Correct. "You are a senior security engineer" makes Claude use security terminology, prioritize vulnerabilities, and apply domain expertise. Roles are especially powerful combined with specific instructions about what the role should focus on.' },
                  { label: 'Role prompting creates a separate AI agent with different capabilities', correct: false, feedback: 'No separate agent is created. It\'s the same model — the role just biases its framing, vocabulary, and priorities.' },
                  { label: 'You must use predefined roles from Anthropic\'s role library', correct: false, feedback: 'No role library exists. You can define any role — real or fictional — that suits your task.' },
                  { label: 'Role prompting only works in the system prompt, never in user messages', correct: false, feedback: 'You can assign roles in either place, though system prompts are the convention since roles typically persist across the conversation.' },
                ]},
              {
                id: 'api-l22-s2-q3', question: 'How do you handle variable data injection in prompts safely?', codeBlock: '<task>\nClassify the customer feedback below into one of:\npositive, negative, neutral, or mixed.\n</task>\n\n<feedback>\n{{USER_FEEDBACK}}\n</feedback>\n\nClassify the feedback above.', options: [
                  { label: 'Wrap variable data in XML tags and reference it by tag name — this prevents user input from being interpreted as instructions (prompt injection defense)', correct: true, feedback: 'Correct. XML tags create a clear boundary between your instructions and the variable data. Claude treats <feedback>...</feedback> as data to process, not instructions to follow. This is a key defense against prompt injection where users try to embed instructions in their input.' },
                  { label: 'Sanitize the input by removing all special characters before injection', correct: false, feedback: 'Over-sanitization can damage legitimate input. XML delimiters are more effective — they preserve the data while clearly separating it from instructions.' },
                  { label: 'Never include user data in prompts — always process it separately', correct: false, feedback: 'That\'s impractical. Most useful applications need to process user data. The key is structuring it safely with clear delimiters.' },
                  { label: 'Use string concatenation to insert variables directly into the prompt text', correct: false, feedback: 'Direct concatenation without delimiters is dangerous — user input can contain text that looks like instructions, confusing Claude.' },
                ]},
              {
                id: 'api-l22-s2-q4', question: 'What is prompt chaining and when is it better than a single complex prompt?', codeBlock: null, options: [
                  { label: 'Breaking a complex task into sequential API calls where each call\'s output feeds the next — better when accuracy on each sub-step matters more than latency', correct: true, feedback: 'Correct. Chaining works well for: multi-step analysis (extract → classify → summarize), tasks requiring different system prompts per step, or when intermediate results need validation. Each step gets Claude\'s full attention, reducing errors on complex pipelines.' },
                  { label: 'Always better than single prompts because it reduces hallucination', correct: false, feedback: 'Not always better. Chaining adds latency and cost (multiple API calls). For simple tasks, a well-crafted single prompt is faster and cheaper.' },
                  { label: 'Sending the same prompt multiple times and picking the best response', correct: false, feedback: 'That\'s best-of-N sampling, not chaining. Chaining is sequential: step 1\'s output feeds step 2.' },
                  { label: 'A technique that only works with Claude Opus because it needs more reasoning', correct: false, feedback: 'Chaining works with any model. It\'s a workflow pattern, not a model-specific feature.' },
                ]},
              {
                id: 'api-l22-s2-q5', question: 'What are the key principles for iterating on prompts effectively?', codeBlock: null, options: [
                  { label: 'Change one thing at a time, test against your eval dataset, compare against baseline, and document what worked and what didn\'t', correct: true, feedback: 'Correct. Systematic iteration: make a single change, run evals, compare scores against the previous version. If multiple changes are needed, make them sequentially so you know which change had which effect. Keep a prompt changelog.' },
                  { label: 'Rewrite the entire prompt from scratch each time to avoid bias from previous versions', correct: false, feedback: 'Starting from scratch discards what\'s working. Incremental changes with measurement let you build on proven foundations.' },
                  { label: 'Use Claude to rewrite your prompt — AI writes better prompts than humans', correct: false, feedback: 'Claude can help brainstorm improvements, but you need to evaluate the results. AI-generated prompts aren\'t automatically better — they must be tested.' },
                  { label: 'Once a prompt scores above 80%, it\'s good enough — stop iterating', correct: false, feedback: 'There\'s no universal threshold. Whether 80% is acceptable depends entirely on your use case and the cost of errors.' },
                ]},
            ]},
        ]
      },
      {
        id: 'api-l23',
        title: 'Tool Use',
        slug: 'api/tool-use',
        cardSets: [
          {
            id: 'api-l23-s1',
            title: 'Set 1 — Tool Definitions & Execution',
            cards: [
              {
                id: 'api-l23-s1-q1', question: 'How do you define a tool for the Messages API?', codeBlock: '{\n  "name": "get_weather",\n  "description": "Get current weather for a city",\n  "input_schema": {\n    "type": "object",\n    "properties": {\n      "city": {\n        "type": "string",\n        "description": "City name, e.g. San Francisco"\n      }\n    },\n    "required": ["city"]\n  }\n}', options: [
                  { label: 'A tool has a name, description (tells Claude when/why to use it), and input_schema (JSON Schema defining the parameters Claude must provide)', correct: true, feedback: 'Correct. The name identifies the tool, the description guides Claude on when to call it, and the input_schema validates the arguments. The description is crucial — it\'s how Claude decides which tool to use.' },
                  { label: 'You register tools on Anthropic\'s server and reference them by ID', correct: false, feedback: 'Tools are defined in each API request, not registered centrally. You send the tool definitions with every call where you want them available.' },
                  { label: 'Tools are defined as Python functions with decorators', correct: false, feedback: 'That\'s how MCP servers define tools. The raw Messages API uses JSON tool definitions sent in the request body.' },
                  { label: 'You provide the actual function code and Claude executes it', correct: false, feedback: 'Claude never executes code. It returns tool_use blocks with the tool name and arguments — your code runs the actual function.' },
                ]},
              {
                id: 'api-l23-s1-q2', question: 'What happens when Claude decides to use a tool?', codeBlock: '# Claude\'s response includes a tool_use block:\n{\n  "content": [\n    {"type": "text", "text": "Let me check the weather."},\n    {\n      "type": "tool_use",\n      "id": "toolu_01A09q90qw90lq917835lq9",\n      "name": "get_weather",\n      "input": {"city": "San Francisco"}\n    }\n  ],\n  "stop_reason": "tool_use"\n}', options: [
                  { label: 'Claude returns a tool_use content block with the tool name and arguments, stop_reason becomes "tool_use", and you must execute the tool and send results back', correct: true, feedback: 'Correct. The flow is: Claude returns tool_use → you extract name and input → you execute the actual function → you send a tool_result message back → Claude incorporates the result into its response.' },
                  { label: 'Claude makes an HTTP request to your tool endpoint automatically', correct: false, feedback: 'Claude doesn\'t make external calls. It returns structured tool_use blocks that your code must intercept and execute.' },
                  { label: 'The API pauses and waits for you to provide the tool result via a webhook', correct: false, feedback: 'No webhooks or pausing. The response completes with stop_reason "tool_use" — you make a new API call with the tool result.' },
                  { label: 'Claude returns the tool result directly without needing your intervention', correct: false, feedback: 'Claude can\'t execute tools. It proposes tool calls — you execute them and return results.' },
                ]},
              {
                id: 'api-l23-s1-q3', question: 'How do you send tool results back to Claude?', codeBlock: 'messages = [\n  {"role": "user", "content": "What\'s the weather in SF?"},\n  {"role": "assistant", "content": [...]},  # includes tool_use\n  {\n    "role": "user",\n    "content": [{\n      "type": "tool_result",\n      "tool_use_id": "toolu_01A09q90qw90lq917835lq9",\n      "content": "72°F, sunny, humidity 45%"\n    }]\n  }\n]', options: [
                  { label: 'Add a user message with a tool_result content block that matches the tool_use_id — then Claude generates a natural language response incorporating the data', correct: true, feedback: 'Correct. The tool_result must reference the exact tool_use_id from Claude\'s response. After receiving the result, Claude synthesizes a final response using the tool output. The tool_result is role "user" because it\'s your code providing data to Claude.' },
                  { label: 'Call a separate /v1/tool-results endpoint with the data', correct: false, feedback: 'No separate endpoint. Tool results go in the regular messages array as a user message with tool_result content blocks.' },
                  { label: 'Add the result as a system message so Claude treats it as ground truth', correct: false, feedback: 'Tool results go as user messages with type "tool_result", not system messages. The system prompt is for instructions, not data.' },
                  { label: 'Set the result in a "tool_output" parameter on the next API call', correct: false, feedback: 'No such parameter. Results go inside the messages array as tool_result content blocks matching the tool_use_id.' },
                ]},
              {
                id: 'api-l23-s1-q4', question: 'What role does the tool description play in Claude\'s decision-making?', codeBlock: null, options: [
                  { label: 'The description tells Claude when and why to use the tool — a vague description leads to incorrect tool selection; a precise one ensures Claude calls the right tool with the right arguments', correct: true, feedback: 'Correct. Claude reads descriptions to decide: should I use this tool? With what arguments? A description like "Get weather" is far less effective than "Get current weather conditions for a specific city. Returns temperature, conditions, and humidity. Use when the user asks about weather."' },
                  { label: 'The description is only shown to users in the API documentation', correct: false, feedback: 'The description is sent to Claude and directly influences its tool-calling decisions. It\'s the primary guide for when and how Claude uses the tool.' },
                  { label: 'Claude ignores the description and decides based only on the tool name', correct: false, feedback: 'Claude uses both, but the description is far more important. A well-described tool with a generic name works better than a perfectly-named tool with no description.' },
                  { label: 'The description is optional and only needed for complex tools', correct: false, feedback: 'While technically optional, omitting the description severely degrades Claude\'s ability to use tools correctly. Always include one.' },
                ]},
              {
                id: 'api-l23-s1-q5', question: 'How does the tool use loop work for multi-step tasks?', codeBlock: 'while response.stop_reason == "tool_use":\n    tool_block = next(b for b in response.content\n                       if b.type == "tool_use")\n    result = execute_tool(tool_block.name, tool_block.input)\n    messages.append({"role": "assistant", "content": response.content})\n    messages.append({"role": "user", "content": [\n        {"type": "tool_result",\n         "tool_use_id": tool_block.id,\n         "content": str(result)}\n    ]})\n    response = client.messages.create(..., messages=messages)', options: [
                  { label: 'Loop while stop_reason is "tool_use": extract the tool call, execute it, append assistant response and tool result to messages, then call the API again', correct: true, feedback: 'Correct. This agentic loop lets Claude chain multiple tool calls: check weather → look up restaurant → book a table. Each iteration: extract tool call, run it, feed result back. The loop ends when Claude responds with text only (stop_reason "end_turn").' },
                  { label: 'Claude handles the looping internally — you only need one API call', correct: false, feedback: 'No — the API is stateless. Each tool result requires a new API call with the full conversation history including all prior tool interactions.' },
                  { label: 'Set max_tool_calls=5 and Claude will chain up to 5 tools automatically', correct: false, feedback: 'No such parameter. You implement the loop in your code, deciding whether to continue based on stop_reason.' },
                  { label: 'Use the /v1/agents endpoint which handles tool loops automatically', correct: false, feedback: 'No agents endpoint exists in the base API. You implement the tool loop yourself (though frameworks like the Agent SDK can help).' },
                ]},
            ]},
          {
            id: 'api-l23-s2',
            title: 'Set 2 — Advanced Tool Patterns',
            cards: [
              {
                id: 'api-l23-s2-q1', question: 'How do you handle multiple tools in a single conversation?', codeBlock: null, options: [
                  { label: 'Pass all tool definitions in the tools array — Claude can call multiple tools in a single response, and you process all tool_use blocks and return all tool_results together', correct: true, feedback: 'Correct. Send all available tools in every request. Claude may return multiple tool_use blocks in one response (parallel tool calls). You execute all of them and return all tool_results in a single user message, each matching its tool_use_id.' },
                  { label: 'You can only pass one tool at a time to avoid confusion', correct: false, feedback: 'Claude handles multiple tools well. The tools array can contain many definitions. Claude selects the appropriate one(s) based on context.' },
                  { label: 'Create separate API clients for each tool', correct: false, feedback: 'One client, one request. All tools go in the same tools array, and Claude picks which to call.' },
                  { label: 'Claude will always use tools one at a time in sequence', correct: false, feedback: 'Claude can make parallel tool calls — returning multiple tool_use blocks in a single response when tasks are independent.' },
                ]},
              {
                id: 'api-l23-s2-q2', question: 'What is fine-grained tool calling and how do you control when Claude uses tools?', codeBlock: '# Force Claude to use a specific tool\ntool_choice={"type": "tool", "name": "get_weather"}\n\n# Force Claude to use any tool (must call one)\ntool_choice={"type": "any"}\n\n# Let Claude decide (default)\ntool_choice={"type": "auto"}', options: [
                  { label: 'The tool_choice parameter controls whether Claude must use tools: "auto" (Claude decides), "any" (must use at least one), or {"type": "tool", "name": "..."} (must use a specific tool)', correct: true, feedback: 'Correct. "auto" is the default — Claude decides whether to use tools. "any" forces a tool call (useful when you know a tool is needed). Naming a specific tool forces that exact tool (useful for structured extraction where you always want a particular schema).' },
                  { label: 'You can\'t control this — Claude always decides on its own', correct: false, feedback: 'The tool_choice parameter gives you fine-grained control over tool-calling behavior.' },
                  { label: 'Add "You MUST use the get_weather tool" to the system prompt', correct: false, feedback: 'While prompt instructions can influence behavior, the tool_choice parameter is the reliable, structured way to force or prevent tool use.' },
                  { label: 'Set required: true in the tool definition to force Claude to use it', correct: false, feedback: 'No required field on tool definitions. Use the tool_choice parameter on the request to control tool calling behavior.' },
                ]},
              {
                id: 'api-l23-s2-q3', question: 'What is the text editor tool and what unique capability does it provide?', codeBlock: null, options: [
                  { label: 'A built-in Anthropic tool that lets Claude read and edit files via structured commands (view, create, str_replace, insert) — enabling code modification without full file rewrites', correct: true, feedback: 'Correct. The text editor tool provides file operations through Anthropic\'s tool use system. str_replace lets Claude make surgical edits by specifying old and new text. This is more reliable than asking Claude to output entire modified files.' },
                  { label: 'A VS Code extension that connects Claude to your editor', correct: false, feedback: 'It\'s an API tool, not a VS Code extension. It gives Claude file editing capabilities through the Messages API.' },
                  { label: 'An API feature that formats Claude\'s text output with syntax highlighting', correct: false, feedback: 'It\'s about file editing (read, create, replace), not output formatting.' },
                  { label: 'A parameter that lets Claude edit its previous responses in a conversation', correct: false, feedback: 'No — it\'s for editing files, not conversation history. Claude can read, create, and modify files through structured commands.' },
                ]},
              {
                id: 'api-l23-s2-q4', question: 'What is the web search tool and how does it extend Claude\'s capabilities?', codeBlock: null, options: [
                  { label: 'An Anthropic-provided tool that lets Claude search the web for real-time information, returning cited results — extending Claude beyond its training data cutoff', correct: true, feedback: 'Correct. The web search tool gives Claude access to current information. It performs searches, retrieves relevant results with citations, and lets Claude synthesize up-to-date answers. Results include source URLs for verification.' },
                  { label: 'A Chrome extension that lets Claude browse the web while you chat', correct: false, feedback: 'It\'s an API tool, not a browser extension. It performs web searches and returns results through the tool use system.' },
                  { label: 'A feature that caches popular web pages to speed up Claude\'s responses', correct: false, feedback: 'It performs live web searches, not cached lookups. The results are current, not pre-cached.' },
                  { label: 'A tool that only works with Claude Opus because it needs advanced reasoning', correct: false, feedback: 'Web search is available across Claude models, not limited to Opus.' },
                ]},
              {
                id: 'api-l23-s2-q5', question: 'What are best practices for designing tool schemas?', codeBlock: null, options: [
                  { label: 'Use descriptive names, detailed descriptions for each parameter, mark required fields, provide enum values where applicable, and keep schemas focused on single responsibilities', correct: true, feedback: 'Correct. Good schemas: descriptive parameter names (not "x" or "input"), helpful descriptions explaining valid values, required vs optional clarity, enums for fixed choices. One tool per responsibility — don\'t create a "do_everything" tool.' },
                  { label: 'Make all parameters optional to give Claude maximum flexibility', correct: false, feedback: 'Making everything optional increases errors. Required parameters ensure Claude provides essential data. Optional parameters should have sensible defaults.' },
                  { label: 'Keep descriptions minimal to reduce token usage', correct: false, feedback: 'Detailed descriptions are worth the tokens. They dramatically improve Claude\'s tool selection accuracy and argument quality.' },
                  { label: 'Use deeply nested schemas to organize parameters hierarchically', correct: false, feedback: 'Keep schemas as flat as practical. Deep nesting makes it harder for Claude to construct correct arguments.' },
                ]},
            ]},
        ]
      },
      {
        id: 'api-l24',
        title: 'RAG & Agentic Search',
        slug: 'api/rag',
        cardSets: [
          {
            id: 'api-l24-s1',
            title: 'Set 1 — RAG Pipeline & Chunking',
            cards: [
              {
                id: 'api-l24-s1-q1', question: 'What is Retrieval Augmented Generation (RAG) and why is it needed?', codeBlock: null, options: [
                  { label: 'RAG retrieves relevant documents from a knowledge base and includes them in Claude\'s context — grounding responses in your specific data rather than just training knowledge', correct: true, feedback: 'Correct. RAG solves two problems: Claude\'s knowledge cutoff (it can\'t know about your private data) and hallucination (retrieved documents provide factual anchoring). The pipeline: query → retrieve relevant chunks → inject into prompt → generate grounded response.' },
                  { label: 'RAG fine-tunes Claude on your data so it permanently learns new information', correct: false, feedback: 'RAG doesn\'t fine-tune anything. It retrieves and injects relevant context at query time. The model itself doesn\'t change.' },
                  { label: 'RAG is a database that Claude can query directly without API calls', correct: false, feedback: 'RAG is a pipeline you build. Claude doesn\'t directly access databases — you retrieve relevant data and include it in the prompt.' },
                  { label: 'RAG replaces the need for system prompts by providing all instructions through retrieved documents', correct: false, feedback: 'RAG provides data context, not instructions. You still need system prompts for behavioral instructions; RAG supplies the knowledge base.' },
                ]},
              {
                id: 'api-l24-s1-q2', question: 'What is text chunking and why can\'t you just send entire documents to Claude?', codeBlock: null, options: [
                  { label: 'Chunking splits documents into smaller pieces for embedding and retrieval — because you need to retrieve only relevant sections, not waste context window space with irrelevant content', correct: true, feedback: 'Correct. Even with large context windows, sending everything is wasteful and can dilute relevance. Chunking lets you embed individual sections, retrieve only the most relevant ones, and pack the context window with high-signal information.' },
                  { label: 'Claude can only process 500 tokens at a time, so you must split documents', correct: false, feedback: 'Claude supports very large context windows (200K+ tokens). Chunking is about retrieval precision, not API limits.' },
                  { label: 'Chunking is only needed for documents over 1MB in size', correct: false, feedback: 'Size doesn\'t determine chunking need. Even small documents benefit from chunking when you want precise retrieval across many documents.' },
                  { label: 'Chunking converts text to a format Claude can understand', correct: false, feedback: 'Claude understands raw text fine. Chunking is about creating meaningful units for embedding and precise retrieval, not format conversion.' },
                ]},
              {
                id: 'api-l24-s1-q3', question: 'What are the main text chunking strategies and their trade-offs?', codeBlock: null, options: [
                  { label: 'Fixed-size (simple, fast, may break mid-sentence), semantic (respects section boundaries, preserves meaning), and overlapping (adds context at chunk borders, reduces information loss)', correct: true, feedback: 'Correct. Fixed-size chunks (e.g., 500 tokens) are simple but can split mid-thought. Semantic chunking (by paragraph, section, or topic) preserves meaning but produces variable sizes. Overlapping chunks (e.g., 50-token overlap) ensure context isn\'t lost at boundaries.' },
                  { label: 'Only one strategy exists: split by sentences since Claude processes text sentence by sentence', correct: false, feedback: 'Multiple strategies exist for different use cases. Claude processes full context, not sentence by sentence.' },
                  { label: 'Always use the largest possible chunks to preserve maximum context', correct: false, feedback: 'Larger chunks reduce retrieval precision. If only one paragraph is relevant, a large chunk brings in irrelevant content that may confuse the response.' },
                  { label: 'Chunk size doesn\'t matter — embeddings capture meaning regardless of length', correct: false, feedback: 'Chunk size significantly affects both embedding quality and retrieval precision. Very long chunks produce diluted embeddings; very short ones lose context.' },
                ]},
              {
                id: 'api-l24-s1-q4', question: 'What are text embeddings and how are they used in RAG?', codeBlock: null, options: [
                  { label: 'Dense vector representations of text that capture semantic meaning — similar texts have similar vectors, enabling retrieval by meaning rather than keyword matching', correct: true, feedback: 'Correct. Embeddings convert text into numerical vectors (e.g., 1536 dimensions). Semantically similar texts cluster together in vector space. You embed your chunks, store them in a vector database, then embed the query and find the closest chunks by cosine similarity.' },
                  { label: 'A way to compress text so it takes fewer tokens in the API request', correct: false, feedback: 'Embeddings don\'t compress text for the API. They create vector representations for similarity search. The original text is still sent to Claude.' },
                  { label: 'The same as tokenization — converting words to numbers for the model', correct: false, feedback: 'Tokenization splits text into tokens for processing. Embeddings create holistic semantic vectors of entire text passages for similarity search.' },
                  { label: 'Claude generates embeddings internally — you don\'t need a separate model', correct: false, feedback: 'You need a dedicated embedding model (like Voyage AI, OpenAI Ada, etc.) to create vectors. Claude\'s Messages API doesn\'t provide an embedding endpoint.' },
                ]},
              {
                id: 'api-l24-s1-q5', question: 'What is the full RAG flow from user query to response?', codeBlock: 'query = "What is our refund policy?"\n\n# 1. Embed the query\nquery_vector = embed(query)\n\n# 2. Retrieve top-k similar chunks\nchunks = vector_db.search(query_vector, top_k=5)\n\n# 3. Build the prompt with retrieved context\nprompt = f"""Answer based on this context:\n{chunks}\n\nQuestion: {query}"""\n\n# 4. Generate response\nresponse = client.messages.create(..., messages=[...])', options: [
                  { label: 'Embed the query → search vector DB for similar chunks → inject top-k chunks into the prompt as context → Claude generates a grounded response', correct: true, feedback: 'Correct. The four-step pipeline: (1) convert query to vector, (2) find most similar chunk vectors (cosine similarity), (3) include retrieved chunks in Claude\'s prompt as context, (4) Claude answers using the provided context. This grounds responses in your data.' },
                  { label: 'Send the query directly to the vector database which returns the final answer', correct: false, feedback: 'The vector DB retrieves relevant chunks — it doesn\'t generate answers. Claude generates the response using the retrieved context.' },
                  { label: 'Claude searches the vector database directly using an internal connection', correct: false, feedback: 'Claude has no database access. Your code handles retrieval and passes the results to Claude as prompt context.' },
                  { label: 'Fine-tune Claude on your documents, then query it without retrieval', correct: false, feedback: 'RAG specifically avoids fine-tuning. It retrieves relevant context at query time, which is more flexible and doesn\'t require model retraining.' },
                ]},
            ]},
          {
            id: 'api-l24-s2',
            title: 'Set 2 — Search Strategies',
            cards: [
              {
                id: 'api-l24-s2-q1', question: 'What is BM25 lexical search and how does it differ from vector search?', codeBlock: null, options: [
                  { label: 'BM25 ranks documents by keyword frequency and inverse document frequency — it finds exact term matches while vector search finds semantic similarity, and they\'re complementary', correct: true, feedback: 'Correct. BM25 excels at finding exact keywords (product names, error codes, specific terms). Vector search excels at semantic similarity ("What\'s your return policy?" matching "refund procedure"). Combining both gives the best results.' },
                  { label: 'BM25 is an older, inferior technique replaced by vector search', correct: false, feedback: 'BM25 isn\'t inferior — it\'s complementary. It catches exact-match queries that vector search can miss, and vice versa.' },
                  { label: 'BM25 uses embeddings internally, just a different model', correct: false, feedback: 'BM25 is a statistical algorithm based on term frequency — it doesn\'t use embeddings or neural networks at all.' },
                  { label: 'BM25 only works with English text', correct: false, feedback: 'BM25 is language-agnostic — it works on any tokenizable text based on term frequency statistics.' },
                ]},
              {
                id: 'api-l24-s2-q2', question: 'What is a multi-index RAG pipeline?', codeBlock: null, options: [
                  { label: 'A pipeline that queries multiple retrieval strategies (vector search + BM25 + metadata filters) in parallel, then merges and re-ranks the results before sending to Claude', correct: true, feedback: 'Correct. Multi-index combines retrieval methods: vector search for semantic relevance, BM25 for keyword matching, metadata filters for structured constraints (date, author, category). Results are merged using reciprocal rank fusion or similar techniques.' },
                  { label: 'Storing documents in multiple vector databases for redundancy', correct: false, feedback: 'It\'s not about redundancy — it\'s about using different retrieval strategies that have complementary strengths.' },
                  { label: 'Creating separate Claude conversations for each document chunk', correct: false, feedback: 'Multi-index is about retrieval diversity, not conversation management. Results feed into a single Claude prompt.' },
                  { label: 'Indexing the same document at multiple chunk sizes', correct: false, feedback: 'While multi-resolution chunking exists, multi-index specifically means using multiple retrieval algorithms (semantic, lexical, metadata) together.' },
                ]},
              {
                id: 'api-l24-s2-q3', question: 'What is reciprocal rank fusion and why is it used in multi-index retrieval?', codeBlock: null, options: [
                  { label: 'A technique that combines ranked results from multiple search methods by assigning scores based on rank position, producing a single merged ranking that leverages each method\'s strengths', correct: true, feedback: 'Correct. RRF assigns each result a score of 1/(k + rank) for each retrieval method, then sums scores across methods. A document ranked #1 by vector search and #3 by BM25 gets a higher combined score than one ranked #2 by both. This naturally balances diverse retrieval signals.' },
                  { label: 'A machine learning model trained to predict the best ranking', correct: false, feedback: 'RRF is a simple mathematical formula, not a trained model. It combines rankings using rank-based scoring without any training.' },
                  { label: 'A way to remove duplicate results from multiple search engines', correct: false, feedback: 'Deduplication is a side effect, not the purpose. RRF\'s goal is to combine rankings from different retrieval methods into a single, better ranking.' },
                  { label: 'An Anthropic API feature for optimizing RAG results automatically', correct: false, feedback: 'RRF is a general technique you implement in your code. It\'s not an Anthropic API feature.' },
                ]},
              {
                id: 'api-l24-s2-q4', question: 'How do you evaluate RAG system quality?', codeBlock: null, options: [
                  { label: 'Measure both retrieval quality (are the right chunks found?) and generation quality (does Claude\'s answer correctly use the retrieved context?) — using metrics like precision, recall, and faithfulness', correct: true, feedback: 'Correct. Two dimensions: retrieval metrics (precision: are returned chunks relevant? recall: are all relevant chunks found?) and generation metrics (faithfulness: does the answer accurately reflect the sources? relevance: does it answer the question?).' },
                  { label: 'Only measure Claude\'s final answer — retrieval quality doesn\'t matter', correct: false, feedback: 'Retrieval quality directly affects answer quality. If the wrong chunks are retrieved, even a perfect generation step produces bad answers. Measure both.' },
                  { label: 'Use the same eval approach as non-RAG prompts — test datasets and grading', correct: false, feedback: 'Partially right (you still need evals), but RAG adds retrieval-specific metrics. You need to evaluate the retrieval step independently.' },
                  { label: 'Count the number of chunks retrieved — more chunks means better results', correct: false, feedback: 'More chunks can actually hurt by introducing irrelevant context. Precision (are chunks relevant?) matters more than quantity.' },
                ]},
              {
                id: 'api-l24-s2-q5', question: 'What are common failure modes in RAG systems and how do you address them?', codeBlock: null, options: [
                  { label: 'Poor chunking (losing context), irrelevant retrieval (wrong chunks), context stuffing (too many chunks diluting relevance), and unfaithful generation (Claude ignoring or contradicting sources)', correct: true, feedback: 'Correct. Fixes: improve chunk boundaries (semantic chunking), tune similarity thresholds, limit top-k and re-rank, and add instructions like "Only answer based on the provided context. If the context doesn\'t contain the answer, say so."' },
                  { label: 'RAG systems are reliable once set up — they don\'t have systematic failure modes', correct: false, feedback: 'RAG has many failure modes at each pipeline stage. Continuous monitoring and tuning are essential.' },
                  { label: 'The only failure mode is using too small a vector database', correct: false, feedback: 'Database size is rarely the issue. Chunking strategy, retrieval accuracy, and context integration are more common failure points.' },
                  { label: 'Failures are always caused by Claude hallucinating despite having the right context', correct: false, feedback: 'Hallucination is one failure mode, but poor retrieval (feeding Claude wrong context) is often the root cause. Fix retrieval first.' },
                ]},
            ]},
        ]
      },
      {
        id: 'api-l25',
        title: 'Claude Features',
        slug: 'api/features',
        cardSets: [
          {
            id: 'api-l25-s1',
            title: 'Set 1 — Thinking, Vision & Documents',
            cards: [
              {
                id: 'api-l25-s1-q1', question: 'What is extended thinking and how do you enable it?', codeBlock: '{\n  "model": "claude-sonnet-4-20250514",\n  "max_tokens": 16000,\n  "thinking": {\n    "type": "enabled",\n    "budget_tokens": 10000\n  },\n  "messages": [...]\n}', options: [
                  { label: 'Extended thinking gives Claude a private scratchpad to reason through complex problems before responding — enabled via the thinking parameter with a token budget', correct: true, feedback: 'Correct. With thinking enabled, Claude\'s response includes thinking blocks (its internal reasoning) followed by text blocks (its answer). budget_tokens caps how much reasoning Claude can do. It improves accuracy on math, coding, analysis, and multi-step problems.' },
                  { label: 'It makes Claude respond more slowly to produce higher quality output', correct: false, feedback: 'It does take longer, but the mechanism isn\'t "going slower" — it\'s giving Claude space to explicitly reason before answering. The thinking content is visible in the response.' },
                  { label: 'It\'s only available for Claude Opus', correct: false, feedback: 'Extended thinking is available on multiple Claude models, not just Opus.' },
                  { label: 'It doubles the max_tokens for the response', correct: false, feedback: 'Thinking tokens come from the budget_tokens allocation, not max_tokens. max_tokens still controls the response length.' },
                ]},
              {
                id: 'api-l25-s1-q2', question: 'How do you send images to Claude via the API?', codeBlock: '{"role": "user", "content": [\n  {\n    "type": "image",\n    "source": {\n      "type": "base64",\n      "media_type": "image/jpeg",\n      "data": "<base64_encoded_data>"\n    }\n  },\n  {"type": "text", "text": "What\'s in this image?"}\n]}', options: [
                  { label: 'Include an image content block with base64-encoded data or a URL source, alongside text blocks in the same message — Claude can analyze, describe, and reason about images', correct: true, feedback: 'Correct. Images go as content blocks with type "image". Source can be base64 (inline data) or url (publicly accessible URL). Claude handles JPEG, PNG, GIF, and WebP. You can send multiple images in one message and reference them in your text.' },
                  { label: 'Upload images to Anthropic\'s server first, then reference by upload ID', correct: false, feedback: 'No upload step needed. Images are sent inline as base64 or referenced by URL directly in the message content.' },
                  { label: 'Only JPEG images are supported via the API', correct: false, feedback: 'Claude supports JPEG, PNG, GIF, and WebP image formats.' },
                  { label: 'Image support requires a separate vision API endpoint', correct: false, feedback: 'No separate endpoint. Images are sent through the same Messages API as regular text — just use image content blocks.' },
                ]},
              {
                id: 'api-l25-s1-q3', question: 'How does Claude handle PDF documents via the API?', codeBlock: '{"role": "user", "content": [\n  {\n    "type": "document",\n    "source": {\n      "type": "base64",\n      "media_type": "application/pdf",\n      "data": "<base64_pdf>"\n    }\n  },\n  {"type": "text", "text": "Summarize this document"}\n]}', options: [
                  { label: 'Send PDFs as document content blocks with base64 encoding — Claude can read text, analyze tables, interpret charts, and process multi-page documents natively', correct: true, feedback: 'Correct. Claude processes PDFs natively, understanding both textual content and visual elements (tables, charts, diagrams). It handles multi-page documents and can reference specific pages. This eliminates the need for external PDF parsing libraries for many use cases.' },
                  { label: 'You must convert PDFs to text first using an external library', correct: false, feedback: 'Claude reads PDFs natively — no conversion needed. It can even understand visual elements that text extraction would miss.' },
                  { label: 'Only single-page PDFs are supported', correct: false, feedback: 'Claude handles multi-page PDFs and can reference specific pages in its response.' },
                  { label: 'PDF support is a beta feature that requires special API access', correct: false, feedback: 'PDF support is generally available through the standard Messages API.' },
                ]},
              {
                id: 'api-l25-s1-q4', question: 'What is the citations feature and how does it improve trustworthiness?', codeBlock: null, options: [
                  { label: 'Claude can cite specific passages from source documents in its responses, linking claims to exact locations in the provided context — enabling verification of every statement', correct: true, feedback: 'Correct. With citations enabled, Claude\'s responses include references to specific passages in the source documents. This makes claims verifiable, reduces hallucination risk, and builds trust — users can click through to verify any claim against the original source.' },
                  { label: 'Citations automatically add footnotes in MLA format to Claude\'s responses', correct: false, feedback: 'Citations reference specific passages in the provided context, not external academic sources. The format is structured data, not MLA footnotes.' },
                  { label: 'Claude searches the web for citations to support its claims', correct: false, feedback: 'Citations reference documents you provide in the prompt, not web searches. For web-backed citations, you\'d combine web search with citations.' },
                  { label: 'A formatting option that bolds key claims in the response', correct: false, feedback: 'Citations are structured references to source material, not text formatting. They enable traceability from claims to evidence.' },
                ]},
              {
                id: 'api-l25-s1-q5', question: 'What is the code execution feature and when would you use it?', codeBlock: null, options: [
                  { label: 'Claude can write and run Python code in a sandboxed environment during a conversation — useful for data analysis, math verification, chart generation, and testing code logic', correct: true, feedback: 'Correct. Code execution lets Claude run Python code and see the results, enabling it to: verify calculations, analyze data, generate visualizations, test regex patterns, and more. The sandbox is secure — no network access or persistent state.' },
                  { label: 'A feature that lets Claude execute any language in your local environment', correct: false, feedback: 'Execution happens in Anthropic\'s sandboxed environment (Python only), not your local machine. This ensures security.' },
                  { label: 'The same as tool use — just another way for Claude to call functions', correct: false, feedback: 'Code execution is different from tool use. Tool use calls your predefined functions. Code execution lets Claude write and run arbitrary Python code in a sandbox.' },
                  { label: 'A debugging mode that shows Claude\'s internal processing steps', correct: false, feedback: 'That\'s extended thinking. Code execution runs actual Python code and returns real results — it\'s computation, not introspection.' },
                ]},
            ]},
          {
            id: 'api-l25-s2',
            title: 'Set 2 — Caching & Files API',
            cards: [
              {
                id: 'api-l25-s2-q1', question: 'What is prompt caching and what problem does it solve?', codeBlock: null, options: [
                  { label: 'Prompt caching stores processed prefixes of your prompts on Anthropic\'s servers, so repeated requests with the same prefix skip re-processing — reducing latency and cost by up to 90%', correct: true, feedback: 'Correct. When you send the same system prompt, tools, or context prefix across many requests, prompt caching avoids re-processing those tokens each time. Cached tokens are 10x cheaper and much faster. Ideal for: long system prompts, large document context, or repeated tool definitions.' },
                  { label: 'A client-side cache that stores Claude\'s previous responses for identical prompts', correct: false, feedback: 'Prompt caching is server-side and caches the processed input prefix, not the output. Different questions with the same context prefix all benefit from the cache.' },
                  { label: 'A feature that compresses prompts to use fewer tokens', correct: false, feedback: 'Caching doesn\'t compress anything. It stores the processed representation of your prompt prefix so it doesn\'t need to be re-processed.' },
                  { label: 'Automatic — the API caches everything without any configuration', correct: false, feedback: 'You must explicitly mark cache breakpoints in your request to tell Anthropic what to cache.' },
                ]},
              {
                id: 'api-l25-s2-q2', question: 'What are the rules for prompt caching to work effectively?', codeBlock: '# Mark a cache breakpoint\n{"role": "user", "content": [\n  {\n    "type": "text",\n    "text": "<long context here...>",\n    "cache_control": {"type": "ephemeral"}\n  }\n]}', options: [
                  { label: 'The cached prefix must be identical across requests, at least 1024 tokens for Sonnet/Opus (2048 for Haiku), marked with cache_control, and cached content must come before dynamic content', correct: true, feedback: 'Correct. Rules: exact prefix match (any change invalidates), minimum token threshold, explicit cache_control markers, and ordering matters — put static content (system prompt, tools, reference docs) before dynamic content (conversation history, current question).' },
                  { label: 'Any prompt over 100 tokens is automatically cached', correct: false, feedback: 'Caching requires explicit opt-in via cache_control markers and has minimum token thresholds (1024 for Sonnet/Opus).' },
                  { label: 'Cached prompts persist forever once created', correct: false, feedback: 'Caches are ephemeral — they expire after a short TTL (typically 5 minutes). They\'re refreshed on each use but not permanent.' },
                  { label: 'You can cache up to 10 different prompts per API key', correct: false, feedback: 'There\'s no hard limit on cached prefixes. Caching is based on content matching, not slots.' },
                ]},
              {
                id: 'api-l25-s2-q3', question: 'How should you structure prompts to maximize cache hit rates?', codeBlock: '# Good: static content first, dynamic last\nsystem: "You are..." (cached)\ntools: [...] (cached)\nlong_context: "..." (cached)\nmessages: [\n  ...conversation history... (dynamic)\n  {"role": "user", "content": "new question"} (dynamic)\n]', options: [
                  { label: 'Put stable content first (system prompt → tools → reference docs → cache breakpoint → conversation history → current query) — the prefix must match exactly for cache hits', correct: true, feedback: 'Correct. Order by stability: most stable content first, most dynamic last. System prompt rarely changes → tool definitions change occasionally → reference docs may vary → conversation grows each turn → current query is always new. Cache breakpoints go after the stable prefix.' },
                  { label: 'Put the user\'s question first so it\'s always cached', correct: false, feedback: 'The user\'s question changes every time, so it would never cache-hit. Put stable content first.' },
                  { label: 'Cache everything including the conversation history', correct: false, feedback: 'Conversation history grows each turn, changing the prefix. Cache the stable parts (system prompt, tools, context) and let history be dynamic.' },
                  { label: 'Use shorter system prompts to maximize the cacheable ratio', correct: false, feedback: 'Longer system prompts benefit MORE from caching because you save more tokens per request. Don\'t sacrifice prompt quality for cache optimization.' },
                ]},
              {
                id: 'api-l25-s2-q4', question: 'What is the Files API and how does it relate to code execution?', codeBlock: null, options: [
                  { label: 'The Files API lets you upload files that persist across conversation turns and are accessible to Claude\'s code execution sandbox — enabling multi-step data analysis workflows', correct: true, feedback: 'Correct. Files uploaded via the Files API are available in Claude\'s sandbox environment. This enables workflows like: upload a CSV → Claude writes analysis code → executes it → generates a chart → you download the output. Files persist across turns within a session.' },
                  { label: 'A storage service for archiving Claude\'s responses as files', correct: false, feedback: 'The Files API is for uploading your files for Claude to process, not for storing Claude\'s outputs.' },
                  { label: 'The same as sending base64-encoded files in messages', correct: false, feedback: 'Base64 in messages is for inline document/image content. The Files API provides persistent file storage accessible to the code execution sandbox.' },
                  { label: 'An API for managing prompt template files on Anthropic\'s servers', correct: false, feedback: 'It\'s for data files (CSVs, images, etc.) that Claude can process in its code execution sandbox, not prompt templates.' },
                ]},
              {
                id: 'api-l25-s2-q5', question: 'How does prompt caching interact with tool definitions?', codeBlock: null, options: [
                  { label: 'Tool definitions can be cached as part of the prefix — since tools rarely change between requests, this is one of the most effective caching strategies for tool-heavy applications', correct: true, feedback: 'Correct. If you send the same 10 tool definitions with every request, caching them avoids re-processing those tokens each time. Place tools before the messages array and add a cache_control breakpoint after them. This is especially impactful when tool schemas are large.' },
                  { label: 'Tools can\'t be cached because they need to be validated each request', correct: false, feedback: 'Tools can absolutely be cached. The validation happens on the cached representation, not by re-processing the raw definitions.' },
                  { label: 'Caching tools requires a separate caching API endpoint', correct: false, feedback: 'Same endpoint, same cache_control mechanism. Tools are cached as part of the prompt prefix like any other content.' },
                  { label: 'Each tool must be cached individually with its own cache_control marker', correct: false, feedback: 'Cache breakpoints work on the entire prefix up to that point. One breakpoint after all tool definitions caches them all together.' },
                ]},
            ]},
        ]
      },
      {
        id: 'api-l26',
        title: 'MCP with the API',
        slug: 'api/mcp',
        cardSets: [
          {
            id: 'api-l26-s1',
            title: 'Set 1 — MCP Architecture & Server Tools',
            cards: [
              {
                id: 'api-l26-s1-q1', question: 'How does MCP relate to the Messages API\'s tool use feature?', codeBlock: null, options: [
                  { label: 'MCP standardizes how tools are defined and served — an MCP server exposes tools via a protocol, and the client translates them into the Messages API\'s tool format before sending to Claude', correct: true, feedback: 'Correct. MCP provides the infrastructure layer. An MCP server defines tools in a standard format. The MCP client discovers these tools, converts them to the Messages API\'s tool schema format, and includes them in API requests. Claude doesn\'t know about MCP — it just sees tool definitions.' },
                  { label: 'MCP replaces the Messages API with a more powerful protocol', correct: false, feedback: 'MCP doesn\'t replace the Messages API. It\'s a standardization layer on top of it — tools defined via MCP are ultimately sent to Claude through the regular Messages API.' },
                  { label: 'MCP tools are different from API tools — they have special capabilities', correct: false, feedback: 'MCP tools become regular API tools. The MCP client converts them to the same format. Claude processes them identically.' },
                  { label: 'You need MCP to use tools with Claude — raw tool definitions are deprecated', correct: false, feedback: 'Raw tool definitions in the API work fine and aren\'t deprecated. MCP is optional — it adds standardization and reusability for tool ecosystems.' },
                ]},
              {
                id: 'api-l26-s1-q2', question: 'How do you define tools in an MCP server?', codeBlock: 'from mcp.server.fastmcp import FastMCP\n\nmcp = FastMCP("weather")\n\n@mcp.tool()\ndef get_weather(city: str) -> str:\n    """Get current weather for a city.\n    \n    Args:\n        city: The city name, e.g. "San Francisco"\n    """\n    return f"72°F, sunny in {city}"', options: [
                  { label: 'Use the @mcp.tool() decorator on Python functions — the function name becomes the tool name, type hints become the schema, and the docstring becomes the description', correct: true, feedback: 'Correct. FastMCP introspects your function: name → tool name, type hints → JSON Schema parameters, docstring → description. This is dramatically simpler than writing raw JSON tool schemas. The server handles all protocol communication automatically.' },
                  { label: 'Write a JSON configuration file listing all tools and their schemas', correct: false, feedback: 'While you could write raw schemas, FastMCP\'s decorator approach is the recommended way — it derives schemas automatically from your Python functions.' },
                  { label: 'Register tools through the MCP web dashboard', correct: false, feedback: 'There\'s no web dashboard. Tools are defined in code using decorators and served by the MCP server process.' },
                  { label: 'Use the same format as the Messages API tools parameter', correct: false, feedback: 'MCP uses a different format (Python decorators with type hints) that\'s more developer-friendly. The MCP client handles conversion to the API format.' },
                ]},
              {
                id: 'api-l26-s1-q3', question: 'What is the MCP server inspector and what is it used for?', codeBlock: null, options: [
                  { label: 'A testing tool that lets you browse an MCP server\'s tools, resources, and prompts, call them interactively, and verify they work — without needing a full client implementation', correct: true, feedback: 'Correct. The inspector connects to your MCP server and provides a UI to: list all exposed tools/resources/prompts, test tool calls with sample arguments, view response formats, and debug issues — essential during development before connecting a real client.' },
                  { label: 'A monitoring dashboard for production MCP servers', correct: false, feedback: 'The inspector is a development tool for testing and debugging, not a production monitoring system.' },
                  { label: 'A security scanner that checks MCP servers for vulnerabilities', correct: false, feedback: 'It\'s a functional testing tool, not a security scanner. It lets you interactively call and test your MCP server\'s capabilities.' },
                  { label: 'An automated test runner that validates all tool schemas', correct: false, feedback: 'It\'s interactive, not automated. You manually explore and test tools through its interface.' },
                ]},
              {
                id: 'api-l26-s1-q4', question: 'What are the two main transport mechanisms for MCP, and when do you use each?', codeBlock: null, options: [
                  { label: 'stdio (standard I/O for local processes — simple, no network) and StreamableHTTP (HTTP-based for remote servers — supports network access and multiple clients)', correct: true, feedback: 'Correct. stdio: MCP client spawns the server as a subprocess and communicates via stdin/stdout. Simple, secure, local only. StreamableHTTP: client connects to the server over HTTP, enabling remote access, cloud deployment, and multiple concurrent clients.' },
                  { label: 'WebSocket and gRPC', correct: false, feedback: 'MCP uses stdio and StreamableHTTP (formerly SSE), not WebSocket or gRPC.' },
                  { label: 'REST API and GraphQL', correct: false, feedback: 'MCP has its own protocol — it doesn\'t use REST or GraphQL. The two transports are stdio and StreamableHTTP.' },
                  { label: 'TCP sockets for local and UDP for remote communication', correct: false, feedback: 'MCP uses stdio (process pipes) and StreamableHTTP (HTTP), not raw TCP/UDP sockets.' },
                ]},
              {
                id: 'api-l26-s1-q5', question: 'How does an MCP client discover and use tools from a server?', codeBlock: null, options: [
                  { label: 'The client connects to the server, calls tools/list to discover available tools, converts their schemas to the Messages API format, and includes them in API requests to Claude', correct: true, feedback: 'Correct. Discovery flow: connect → tools/list → get tool names, descriptions, and schemas → convert to Messages API tool format → include in the tools parameter of API calls. When Claude returns a tool_use, the client routes it back to the MCP server for execution.' },
                  { label: 'The client must know all tool names in advance — there\'s no discovery', correct: false, feedback: 'MCP\'s key feature is dynamic discovery. The client asks the server what tools are available at runtime via tools/list.' },
                  { label: 'Claude directly connects to MCP servers to discover tools', correct: false, feedback: 'Claude has no network access. The MCP client handles all server communication and translates tools into API format for Claude.' },
                  { label: 'Tools are registered in a global MCP registry that all clients query', correct: false, feedback: 'There\'s no global registry. Each client connects to specific servers and discovers their tools individually.' },
                ]},
            ]},
          {
            id: 'api-l26-s2',
            title: 'Set 2 — Resources, Prompts & Client Implementation',
            cards: [
              {
                id: 'api-l26-s2-q1', question: 'What are MCP resources and how do they differ from tools?', codeBlock: '@mcp.resource("config://app")\ndef get_app_config() -> str:\n    """Current application configuration"""\n    return json.dumps(config)\n\n@mcp.resource("file://{path}")\ndef read_file(path: str) -> str:\n    """Read a file from the project"""\n    return open(path).read()', options: [
                  { label: 'Resources are read-only data sources (files, configs, DB records) that provide context to Claude — tools perform actions, resources provide information', correct: true, feedback: 'Correct. Resources follow the URI pattern (config://app, file://path) and are read-only. Tools execute actions with side effects. Resources are ideal for: configuration data, file contents, database records, or any contextual information Claude needs to reference.' },
                  { label: 'Resources and tools are the same thing with different names', correct: false, feedback: 'Key difference: resources are read-only data providers, tools perform actions (potentially with side effects). Resources provide context; tools do work.' },
                  { label: 'Resources are cached versions of tool outputs', correct: false, feedback: 'Resources are independent data sources, not cached tool outputs. They serve different purposes in the MCP architecture.' },
                  { label: 'Resources can only serve static files, not dynamic data', correct: false, feedback: 'Resources can serve dynamic data — database queries, API responses, computed values. They\'re "read-only" in that they don\'t cause side effects, but the data can be dynamic.' },
                ]},
              {
                id: 'api-l26-s2-q2', question: 'What are MCP prompts and how do they help standardize AI interactions?', codeBlock: '@mcp.prompt()\ndef code_review(code: str, language: str) -> str:\n    """Generate a thorough code review prompt"""\n    return f"""Review this {language} code for:\n- Security vulnerabilities\n- Performance issues\n- Best practice violations\n\n```{language}\n{code}\n```"""', options: [
                  { label: 'MCP prompts are reusable prompt templates exposed by servers — clients can discover and use them to standardize how specific tasks are prompted across different applications', correct: true, feedback: 'Correct. Prompts encapsulate domain expertise into reusable templates. A code review server exposes a code_review prompt template. Any MCP client can discover and use it, ensuring consistent, expert-designed prompting across all applications that connect to that server.' },
                  { label: 'The same as system prompts in the Messages API', correct: false, feedback: 'MCP prompts are templates that can be discovered and parameterized. System prompts are static text in API requests. MCP prompts are a distribution mechanism for prompt expertise.' },
                  { label: 'Pre-written Claude responses that the server returns instead of calling Claude', correct: false, feedback: 'MCP prompts generate prompt text for Claude to process — they don\'t replace Claude\'s responses.' },
                  { label: 'A way to fine-tune Claude\'s behavior through the MCP protocol', correct: false, feedback: 'MCP prompts are templates, not fine-tuning. They provide well-crafted prompts to use with Claude, but don\'t change the model itself.' },
                ]},
              {
                id: 'api-l26-s2-q3', question: 'What are the key components of an MCP client implementation?', codeBlock: null, options: [
                  { label: 'Transport setup (stdio or HTTP), server connection management, tool/resource/prompt discovery, conversion to Messages API format, tool call routing back to the server, and the conversation loop', correct: true, feedback: 'Correct. A client: (1) establishes transport connection, (2) discovers available capabilities, (3) converts MCP tools to API format, (4) includes them in Claude requests, (5) routes tool_use responses back to the MCP server, (6) feeds results back to Claude.' },
                  { label: 'Just an HTTP client that sends requests to the MCP server', correct: false, feedback: 'An MCP client does much more than HTTP — it handles discovery, schema conversion, tool call routing, and orchestrates the entire conversation loop with Claude.' },
                  { label: 'A pre-built component from Anthropic that needs no custom code', correct: false, feedback: 'While SDKs provide client libraries, you still need custom code for your specific conversation loop, tool call handling, and application logic.' },
                  { label: 'A browser extension that connects web apps to MCP servers', correct: false, feedback: 'MCP clients are typically backend processes, not browser extensions. They manage server connections and Claude API interactions programmatically.' },
                ]},
              {
                id: 'api-l26-s2-q4', question: 'How do you access MCP resources from a client?', codeBlock: null, options: [
                  { label: 'Call resources/list to discover available resources, then resources/read with the resource URI to fetch content — inject the content into Claude\'s context as needed', correct: true, feedback: 'Correct. The client: (1) resources/list → gets available URIs and descriptions, (2) resources/read(uri) → fetches the resource content, (3) includes the content in Claude\'s prompt as context. Resources can be fetched on-demand or pre-loaded at conversation start.' },
                  { label: 'Resources are automatically included in every Claude request', correct: false, feedback: 'You must explicitly fetch and include resources. The client decides which resources are relevant and when to inject them.' },
                  { label: 'Use a SQL query syntax to request specific data from resources', correct: false, feedback: 'Resources use URI-based addressing (resource://path), not SQL queries. The server handles data retrieval internally.' },
                  { label: 'Claude directly reads resources from the MCP server during its response', correct: false, feedback: 'Claude can\'t access MCP servers. The client fetches resources and includes them in Claude\'s prompt context.' },
                ]},
              {
                id: 'api-l26-s2-q5', question: 'How do MCP prompts work from the client side?', codeBlock: null, options: [
                  { label: 'Call prompts/list to discover templates, prompts/get with arguments to render a specific template, then use the rendered prompt text in your Messages API call', correct: true, feedback: 'Correct. The client: (1) prompts/list → discover available templates with their parameter schemas, (2) prompts/get(name, args) → server renders the template with your arguments, (3) use the rendered text as the user message or system prompt in your API call.' },
                  { label: 'MCP prompts are sent directly to Claude through a special API parameter', correct: false, feedback: 'MCP prompts produce text that you include in standard API calls. There\'s no special MCP prompt parameter in the Messages API.' },
                  { label: 'The server executes the prompt against Claude and returns the result', correct: false, feedback: 'The server renders the prompt template — it doesn\'t call Claude. Your client takes the rendered text and sends it to Claude via the Messages API.' },
                  { label: 'Prompts are only used for testing in the MCP inspector', correct: false, feedback: 'Prompts are a core MCP feature for production use, not just testing. They standardize prompt templates across applications.' },
                ]},
            ]},
        ]
      },
      {
        id: 'api-l27',
        title: 'Agents & Workflows',
        slug: 'api/agents',
        cardSets: [
          {
            id: 'api-l27-s1',
            title: 'Set 1 — Workflow Patterns',
            cards: [
              {
                id: 'api-l27-s1-q1', question: 'What is the fundamental difference between workflows and agents?', codeBlock: null, options: [
                  { label: 'Workflows are predefined sequences where code orchestrates LLM calls in a fixed pattern; agents give the LLM autonomy to decide which tools to call and when, dynamically', correct: true, feedback: 'Correct. Workflows = deterministic orchestration (your code controls the flow). Agents = autonomous decision-making (Claude decides what to do next). Workflows are more predictable and debuggable; agents are more flexible but harder to control.' },
                  { label: 'Agents are just workflows with more steps', correct: false, feedback: 'The distinction isn\'t about step count — it\'s about who decides the next step. In workflows, your code decides. In agents, Claude decides.' },
                  { label: 'Workflows use the Messages API; agents use a different API', correct: false, feedback: 'Both use the same Messages API. The difference is architectural — who controls the execution flow.' },
                  { label: 'Agents replace workflows in all cases because they\'re more powerful', correct: false, feedback: 'Workflows are preferred for well-defined, predictable tasks. Agents are for open-ended tasks where the path isn\'t predetermined. Use the simplest approach that works.' },
                ]},
              {
                id: 'api-l27-s1-q2', question: 'What is the parallelization workflow pattern?', codeBlock: 'import asyncio\n\nasync def analyze_document(doc):\n    tasks = [\n        summarize(doc),\n        extract_entities(doc),\n        classify_sentiment(doc)\n    ]\n    results = await asyncio.gather(*tasks)\n    return combine_results(results)', options: [
                  { label: 'Run multiple independent LLM calls simultaneously and combine the results — useful when sub-tasks don\'t depend on each other, significantly reducing total latency', correct: true, feedback: 'Correct. Parallelization works when tasks are independent: analyze sentiment AND extract entities AND summarize — all at once. Total time = slowest single task, not sum of all tasks. Combine results with a final aggregation step.' },
                  { label: 'Running the same prompt multiple times in parallel and picking the best result', correct: false, feedback: 'That\'s best-of-N sampling. Parallelization runs different tasks simultaneously, not the same task repeatedly.' },
                  { label: 'Splitting a long document into chunks and processing them concurrently', correct: false, feedback: 'That\'s parallel processing of data, but parallelization as a workflow pattern means running different analytical tasks simultaneously on the same input.' },
                  { label: 'A multi-threaded approach that only works with Claude Opus', correct: false, feedback: 'Parallelization is an architectural pattern that works with any model. It\'s about concurrent API calls, not model-specific features.' },
                ]},
              {
                id: 'api-l27-s1-q3', question: 'What is the chaining workflow pattern?', codeBlock: 'def process_support_ticket(ticket):\n    # Step 1: Classify the issue\n    category = classify(ticket)\n    \n    # Step 2: Extract key details\n    details = extract_details(ticket, category)\n    \n    # Step 3: Generate response\n    response = generate_response(details, category)\n    \n    # Step 4: Quality check\n    return quality_check(response)', options: [
                  { label: 'Sequential LLM calls where each step\'s output feeds the next — each call can use a different prompt optimized for its specific sub-task', correct: true, feedback: 'Correct. Chaining decomposes complex tasks into focused steps. Each step has a specialized prompt and can validate/transform the output before passing it forward. This improves accuracy because each LLM call has a simpler, more focused job.' },
                  { label: 'The same as a single prompt with multiple instructions', correct: false, feedback: 'Chaining uses separate API calls, giving each step full attention and the ability to validate intermediate results. A single prompt can\'t do this.' },
                  { label: 'Connecting multiple Claude models in sequence (Haiku → Sonnet → Opus)', correct: false, feedback: 'While you could use different models per step, chaining is about sequential task decomposition, not specifically about mixing models.' },
                  { label: 'A deprecated pattern replaced by agents', correct: false, feedback: 'Chaining is actively recommended for well-defined sequential tasks. It\'s simpler and more predictable than agents for structured workflows.' },
                ]},
              {
                id: 'api-l27-s1-q4', question: 'What is the routing workflow pattern?', codeBlock: 'def handle_query(query):\n    # Step 1: Classify the query type\n    query_type = classify_query(query)\n    \n    # Step 2: Route to specialized handler\n    if query_type == "technical":\n        return technical_handler(query)\n    elif query_type == "billing":\n        return billing_handler(query)\n    elif query_type == "general":\n        return general_handler(query)', options: [
                  { label: 'A classification step that routes inputs to specialized sub-prompts based on the input type — each handler can use a different system prompt, model, or tool set optimized for that category', correct: true, feedback: 'Correct. Routing uses a fast classifier (often Haiku) to categorize the input, then routes to a specialized handler. Technical queries go to a code-focused prompt with debugging tools; billing queries go to a policy-focused prompt with account tools. Each path is optimized for its domain.' },
                  { label: 'Load balancing API calls across multiple Anthropic endpoints', correct: false, feedback: 'Routing is about directing different types of queries to specialized handlers, not load balancing across endpoints.' },
                  { label: 'Sending the same query to multiple models and returning the best response', correct: false, feedback: 'That\'s ensemble/consensus. Routing classifies the input first and sends it to ONE specialized handler based on its category.' },
                  { label: 'A network routing protocol for MCP server communication', correct: false, feedback: 'It\'s an LLM workflow pattern for directing queries to specialized handlers, not a network protocol.' },
                ]},
              {
                id: 'api-l27-s1-q5', question: 'When should you use a workflow vs. an agent?', codeBlock: null, options: [
                  { label: 'Use workflows when the task is well-defined and steps are predictable; use agents when the task is open-ended and the path depends on intermediate results that can\'t be predetermined', correct: true, feedback: 'Correct. Workflows: data pipelines, content moderation, structured extraction — you know the steps upfront. Agents: coding tasks, research, customer support — Claude needs autonomy to investigate, try approaches, and adapt based on what it finds.' },
                  { label: 'Always prefer agents because they\'re more intelligent', correct: false, feedback: 'Agents add complexity, cost, and unpredictability. For well-defined tasks, workflows are faster, cheaper, and easier to debug. Anthropic recommends starting simple.' },
                  { label: 'Use workflows for simple tasks and agents for complex tasks', correct: false, feedback: 'Complexity alone doesn\'t determine the choice. A complex but well-defined pipeline (10-step data processing) is better as a workflow. A simple but open-ended task (debug this error) is better as an agent.' },
                  { label: 'Agents are only for multi-user applications', correct: false, feedback: 'Agents vs. workflows is about task structure, not user count. A single-user coding assistant is an agent; a batch processing system for millions of users might be a workflow.' },
                ]},
            ]},
          {
            id: 'api-l27-s2',
            title: 'Set 2 — Agents & Anthropic Apps',
            cards: [
              {
                id: 'api-l27-s2-q1', question: 'How do you build an agent with the Messages API?', codeBlock: 'def agent_loop(user_task, tools):\n    messages = [{"role": "user", "content": user_task}]\n    \n    while True:\n        response = client.messages.create(\n            model="claude-sonnet-4-20250514",\n            max_tokens=4096,\n            tools=tools,\n            messages=messages\n        )\n        \n        if response.stop_reason == "end_turn":\n            return response.content[0].text\n        \n        # Process tool calls and continue\n        messages.append({"role": "assistant", "content": response.content})\n        tool_results = execute_tools(response)\n        messages.append({"role": "user", "content": tool_results})', options: [
                  { label: 'A loop that sends messages to Claude, checks if it wants to use tools (stop_reason "tool_use"), executes them, feeds results back, and repeats until Claude gives a final text response', correct: true, feedback: 'Correct. The agent loop is the same tool use loop from L23, but the key difference is intent: you give Claude an open-ended task and let it autonomously decide which tools to call, how many times, and in what order until it determines the task is complete.' },
                  { label: 'Use the /v1/agents endpoint which handles the loop internally', correct: false, feedback: 'No agents endpoint in the base API. You implement the loop yourself. The Agent SDK can help abstract this, but it still uses the Messages API underneath.' },
                  { label: 'Deploy a pre-built agent template from Anthropic\'s marketplace', correct: false, feedback: 'No marketplace exists. You build agents by implementing the tool use loop with your specific tools and system prompt.' },
                  { label: 'Set agent_mode=true in the API request to enable autonomous behavior', correct: false, feedback: 'No such parameter. Agent behavior comes from the loop architecture: giving Claude tools and letting it decide the execution path.' },
                ]},
              {
                id: 'api-l27-s2-q2', question: 'What is environment inspection in the context of agents?', codeBlock: null, options: [
                  { label: 'Giving the agent tools to observe its environment (read files, list directories, check system state) so it can make informed decisions about what to do next', correct: true, feedback: 'Correct. An effective agent needs to "look before it leaps." Environment inspection tools let Claude: read existing code before editing, check build output after changes, list available files, query database state — gathering information to make better decisions at each step.' },
                  { label: 'A debugging mode that logs all agent decisions for review', correct: false, feedback: 'While logging is important, environment inspection means giving the agent read-only tools to understand its current state — file contents, system status, etc.' },
                  { label: 'Running the agent in a sandboxed environment for security', correct: false, feedback: 'Sandboxing is a security practice. Environment inspection is about giving the agent information-gathering capabilities to make better decisions.' },
                  { label: 'Checking the API rate limits before making a request', correct: false, feedback: 'That\'s operational concern, not environment inspection. The concept refers to tools that let the agent observe and understand its working context.' },
                ]},
              {
                id: 'api-l27-s2-q3', question: 'What is Claude Code and how does it use the API concepts from this course?', codeBlock: null, options: [
                  { label: 'An agentic coding tool built on Claude that implements the agent loop pattern with tools for reading/editing files, running commands, and searching code — it\'s the API concepts materialized into a product', correct: true, feedback: 'Correct. Claude Code is essentially an agent loop (Messages API) + tools (Read, Edit, Bash, Grep) + system prompt (CLAUDE.md) + MCP servers (extensibility). It demonstrates every concept in this course working together: tool use, multi-turn conversations, environment inspection, and autonomous decision-making.' },
                  { label: 'A separate product that doesn\'t use the Messages API', correct: false, feedback: 'Claude Code is built on the Messages API. It uses tool use, multi-turn conversations, and all the patterns covered in this course.' },
                  { label: 'A VS Code extension that only provides code completion', correct: false, feedback: 'Claude Code is a CLI agentic tool that can read/edit files, run commands, and work autonomously on complex coding tasks — far beyond code completion.' },
                  { label: 'A no-code platform for building agents without API knowledge', correct: false, feedback: 'Claude Code is a developer tool, not a no-code platform. Understanding the underlying API concepts helps you use it more effectively.' },
                ]},
              {
                id: 'api-l27-s2-q4', question: 'What is computer use and how does it extend Claude\'s capabilities?', codeBlock: null, options: [
                  { label: 'A capability where Claude can view screenshots and control a computer via mouse clicks, keyboard input, and scrolling — enabling automation of GUI-based tasks that can\'t be done through APIs alone', correct: true, feedback: 'Correct. Computer use gives Claude "eyes and hands" for a desktop: take screenshots (vision), click buttons, type text, scroll. This enables automating tasks in applications that don\'t have APIs — filling forms, navigating UIs, testing web apps.' },
                  { label: 'Remote desktop access to Anthropic\'s servers', correct: false, feedback: 'Computer use controls YOUR computer (or a VM you provide), not Anthropic\'s servers. Claude observes screenshots and sends input commands.' },
                  { label: 'A feature that lets Claude write and execute code on your machine', correct: false, feedback: 'That\'s code execution. Computer use is about GUI interaction — seeing the screen and controlling mouse/keyboard.' },
                  { label: 'An API that converts voice commands into computer actions', correct: false, feedback: 'Computer use is text-based (Claude reads screenshots and outputs commands), not voice-based.' },
                ]},
              {
                id: 'api-l27-s2-q5', question: 'What is Anthropic\'s recommended approach when building AI systems: start with workflows or agents?', codeBlock: null, options: [
                  { label: 'Start with the simplest workflow that solves the problem — only add agent autonomy when the task genuinely requires dynamic decision-making that can\'t be predetermined', correct: true, feedback: 'Correct. Anthropic recommends: start simple (single prompt), add complexity only when needed (chaining, routing), and use agents only when the task demands autonomy. More complexity = more cost, latency, and debugging difficulty. "The best system is the simplest one that works."' },
                  { label: 'Always start with agents because they\'re the most flexible', correct: false, feedback: 'Agents add unnecessary complexity for well-defined tasks. A classification pipeline doesn\'t need agent autonomy — a chaining workflow is simpler and more reliable.' },
                  { label: 'Build a comprehensive agent framework first, then add workflows as optimizations', correct: false, feedback: 'This is backwards. Start simple, add complexity incrementally. Building a framework first is over-engineering.' },
                  { label: 'Use agents for prototyping, then convert to workflows for production', correct: false, feedback: 'Sometimes agents ARE the right production architecture (e.g., coding assistants). The choice depends on task structure, not development phase.' },
                ]},
            ]},
        ]
      },
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
