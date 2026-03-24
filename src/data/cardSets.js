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
                question: 'What happens when you reference a file with `@` inside your CLAUDE.md?',
                codeBlock: null,
                options: [
                  { label: 'That file\'s contents are automatically included in every request to Claude', correct: true, feedback: 'Correct. Files mentioned with `@` in CLAUDE.md are included in every request, so Claude can answer questions about that file immediately without searching for it.' },
                  { label: 'Claude reads the file once and forgets it', correct: false, feedback: 'Since CLAUDE.md is loaded on every request, the `@` reference causes the file to be included every time.' },
                  { label: 'It creates a symbolic link to the file', correct: false, feedback: '`@` in CLAUDE.md is a content inclusion mechanism, not a filesystem operation.' },
                  { label: 'It adds the file to `.gitignore`', correct: false, feedback: '`@` references have nothing to do with git.' },
                ]
              },
              {
                id: 'cc-l2-s1-q5',
                question: 'How do you enter "memory mode" to add custom instructions to CLAUDE.md?',
                codeBlock: null,
                options: [
                  { label: 'Type `#` followed by your instruction', correct: true, feedback: 'Correct. The `#` command enters memory mode. Type something like `# Use comments sparingly` and Claude will merge the instruction into your CLAUDE.md automatically.' },
                  { label: 'Type `/memory` followed by your instruction', correct: false, feedback: 'There is no `/memory` command. Use the `#` shortcut instead.' },
                  { label: 'Edit CLAUDE.md directly in your IDE', correct: false, feedback: 'While you can edit it manually, the `#` shortcut is the built-in way to intelligently merge instructions.' },
                  { label: 'Type `/init --update`', correct: false, feedback: '`/init` generates the initial CLAUDE.md. The `#` shortcut is for adding specific instructions.' },
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
                question: 'How do you enable Planning Mode in Claude Code?',
                codeBlock: null,
                options: [
                  { label: 'Press Shift+Tab twice (or once if already auto-accepting edits)', correct: true, feedback: 'Correct. Shift+Tab toggles between permission levels. Two presses from default enters Planning Mode where Claude explores thoroughly before acting.' },
                  { label: 'Type `/plan` before your prompt', correct: false, feedback: 'There\'s no `/plan` command. Use Shift+Tab to toggle into Planning Mode.' },
                  { label: 'Add "plan first" to your message', correct: false, feedback: 'While you can ask Claude to plan, the official Planning Mode is activated with Shift+Tab.' },
                  { label: 'Press Ctrl+P', correct: false, feedback: 'Ctrl+P is not the Planning Mode shortcut. Use Shift+Tab.' },
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
                question: 'Which thinking mode gives Claude the MAXIMUM reasoning capability?',
                codeBlock: null,
                options: [
                  { label: '"Ultrathink"', correct: true, feedback: 'Correct. The thinking modes from least to most: Think → Think more → Think a lot → Think longer → Ultrathink. Each gives Claude progressively more tokens for reasoning.' },
                  { label: '"Think longer"', correct: false, feedback: '"Think longer" is the second-highest. "Ultrathink" is the maximum.' },
                  { label: '"Think a lot"', correct: false, feedback: '"Think a lot" is mid-tier. "Ultrathink" is the maximum reasoning mode.' },
                  { label: '"Deep think"', correct: false, feedback: '"Deep think" is not one of the modes. The maximum is "Ultrathink".' },
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
                question: 'How do you paste a screenshot into Claude Code?',
                codeBlock: null,
                options: [
                  { label: 'Use Ctrl+V (not Cmd+V on macOS)', correct: true, feedback: 'Correct. Ctrl+V is the specific shortcut for pasting screenshots into the Claude Code chat interface, even on macOS.' },
                  { label: 'Use Cmd+V on macOS', correct: false, feedback: 'On macOS, screenshots in Claude Code specifically require Ctrl+V, not the usual Cmd+V.' },
                  { label: 'Drag and drop the image file', correct: false, feedback: 'The supported method is Ctrl+V to paste from clipboard.' },
                  { label: 'Use the `@` syntax with an image path', correct: false, feedback: '`@` references files by path but Ctrl+V is the way to paste screenshots.' },
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
                question: 'What does pressing Escape TWICE do?',
                codeBlock: null,
                options: [
                  { label: 'Shows all previous messages so you can rewind the conversation to an earlier point', correct: true, feedback: 'Correct. Double-tap Escape shows your message history and lets you jump back, keeping valuable context while removing distracting conversation history.' },
                  { label: 'Exits Claude Code', correct: false, feedback: 'Double Escape rewinds the conversation, it doesn\'t exit.' },
                  { label: 'Clears the entire conversation', correct: false, feedback: 'That\'s `/clear`. Double Escape lets you selectively rewind, preserving some context.' },
                  { label: 'Restarts Claude with a fresh session', correct: false, feedback: 'Double Escape rewinds to a chosen point, not a full restart.' },
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
                question: 'After creating a new custom command file, what must you do?',
                codeBlock: null,
                options: [
                  { label: 'Restart Claude Code for it to recognize the new command', correct: true, feedback: 'Correct. Claude Code reads available commands at startup. New `.claude/commands/` files require a restart to be discovered.' },
                  { label: 'Run `/reload-commands`', correct: false, feedback: 'There\'s no reload command. You need to restart Claude Code.' },
                  { label: 'Nothing — commands are hot-loaded', correct: false, feedback: 'Commands are not hot-loaded. You must restart Claude Code after adding new command files.' },
                  { label: 'Register it with `/register`', correct: false, feedback: 'No registration needed — just restart Claude Code after creating the file.' },
                ]
              },
              {
                id: 'cc-l2-s4-q4',
                question: 'What format are custom command files written in?',
                codeBlock: null,
                options: [
                  { label: 'Markdown (`.md` files)', correct: true, feedback: 'Correct. Custom commands are markdown files where the content becomes the prompt sent to Claude when the command is invoked.' },
                  { label: 'JSON configuration files', correct: false, feedback: 'Commands are plain markdown files, not JSON.' },
                  { label: 'YAML files', correct: false, feedback: 'Commands are markdown (`.md`), not YAML.' },
                  { label: 'Shell scripts', correct: false, feedback: 'Command files are markdown prompts for Claude, not shell scripts. Claude may run shell commands based on the prompt, but the file itself is markdown.' },
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
                question: 'What is the command to add the Playwright MCP server to Claude Code?',
                codeBlock: null,
                options: [
                  { label: '`claude mcp add playwright npx @playwright/mcp@latest`', correct: true, feedback: 'Correct. This names the server "playwright" and provides the command that starts it locally on your machine.' },
                  { label: '`npm install @playwright/mcp`', correct: false, feedback: 'npm install adds a dependency. MCP servers are added via `claude mcp add`.' },
                  { label: '`claude install playwright`', correct: false, feedback: 'The correct syntax is `claude mcp add <name> <command>`, not `claude install`.' },
                  { label: '`claude mcp install playwright`', correct: false, feedback: 'The verb is `add`, not `install`. `claude mcp add playwright npx @playwright/mcp@latest`.' },
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
                question: 'Where should you run `claude mcp add` — inside or outside Claude Code?',
                codeBlock: null,
                options: [
                  { label: 'In your terminal, NOT inside Claude Code', correct: true, feedback: 'Correct. The `claude mcp add` command is run in your regular terminal, not within a Claude Code session.' },
                  { label: 'Inside Claude Code as a prompt', correct: false, feedback: 'MCP server management commands are run in your terminal, not as prompts inside Claude Code.' },
                  { label: 'Either works the same', correct: false, feedback: 'These are CLI commands for configuring Claude Code, not prompts for Claude to process.' },
                  { label: 'Inside a CLAUDE.md file', correct: false, feedback: 'CLAUDE.md is a context file, not a command execution environment.' },
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
                question: 'What command sets up Claude\'s official GitHub integration?',
                codeBlock: null,
                options: [
                  { label: '`/install-github-app` inside Claude Code', correct: true, feedback: 'Correct. This command walks you through installing the Claude Code GitHub app, adding your API key, and generating a PR with the workflow files.' },
                  { label: '`gh extension install claude`', correct: false, feedback: 'The GitHub CLI is separate. Use `/install-github-app` inside Claude Code.' },
                  { label: '`claude github connect`', correct: false, feedback: 'The correct command is `/install-github-app` run inside a Claude Code session.' },
                  { label: '`npm install claude-github-action`', correct: false, feedback: 'The integration is set up via `/install-github-app`, which generates the workflow files automatically.' },
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
