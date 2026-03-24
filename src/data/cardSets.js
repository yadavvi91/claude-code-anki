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
                question: 'What is Agent Mode in GitHub Copilot?',
                codeBlock: null,
                options: [
                  { label: 'An autonomous mode where Copilot plans, edits files, runs terminal commands, and iterates on errors', correct: true, feedback: 'Correct. Agent mode operates in an agentic loop — it plans a solution, makes edits, runs commands, observes results, and self-corrects until the task is complete.' },
                  { label: 'A mode that only suggests single-line completions', correct: false, feedback: 'Single-line completions are the inline suggestion feature, not agent mode. Agent mode handles complex multi-step tasks autonomously.' },
                  { label: 'A read-only mode for asking questions about code', correct: false, feedback: 'That describes Ask mode, which is read-only. Agent mode actively modifies files and runs commands.' },
                  { label: 'A mode that only works with GitHub Issues', correct: false, feedback: 'Agent mode works from natural language prompts in the editor, not just GitHub Issues.' },
                ]
              },
              {
                id: 'cop-l12-s1-q2',
                question: 'How does the agentic loop in Copilot Agent Mode work?',
                codeBlock: null,
                options: [
                  { label: 'Plan → Edit files → Run terminal commands → Observe output → Iterate until done', correct: true, feedback: 'Correct. The agent plans its approach, makes code changes, runs commands to verify, reads the output, and loops back to fix any issues — continuing until the task succeeds.' },
                  { label: 'Read file → Suggest completion → Wait for user approval', correct: false, feedback: 'That describes inline completions, not the agentic loop. Agent mode autonomously iterates without waiting for approval at each step.' },
                  { label: 'Open PR → Run CI → Merge automatically', correct: false, feedback: 'That describes cloud/background agents. The local agentic loop edits and runs commands in your workspace.' },
                  { label: 'Parse AST → Transform code → Write output', correct: false, feedback: 'Agent mode uses an LLM-driven loop, not AST manipulation. It reasons about tasks in natural language.' },
                ]
              },
              {
                id: 'cop-l12-s1-q3',
                question: 'What are the three permission levels for Agent Mode tool execution?',
                codeBlock: null,
                options: [
                  { label: 'Default (ask every time), Bypass (allow specific tools), and Autopilot (allow all without asking)', correct: true, feedback: 'Correct. Default prompts for every tool use. Bypass lets you pre-approve specific tools like file edits. Autopilot grants blanket approval for all tool calls.' },
                  { label: 'Read, Write, and Execute', correct: false, feedback: 'Those are Unix file permissions, not Copilot permission levels. The three levels are Default, Bypass, and Autopilot.' },
                  { label: 'User, Admin, and Root', correct: false, feedback: 'Those are OS user roles. Copilot uses Default, Bypass, and Autopilot permission levels.' },
                  { label: 'Safe, Standard, and Unrestricted', correct: false, feedback: 'Those are not the actual names. The three levels are Default, Bypass, and Autopilot.' },
                ]
              },
              {
                id: 'cop-l12-s1-q4',
                question: 'What keyboard shortcut opens Agent Mode in VS Code?',
                codeBlock: null,
                options: [
                  { label: 'Ctrl+Alt+I (Cmd+Alt+I on Mac)', correct: true, feedback: 'Correct. Ctrl+Alt+I (or Cmd+Alt+I on Mac) opens the Copilot chat panel in Agent Mode, ready for multi-step tasks.' },
                  { label: 'Ctrl+Shift+P', correct: false, feedback: 'Ctrl+Shift+P opens the VS Code Command Palette, not Agent Mode directly.' },
                  { label: 'Ctrl+K', correct: false, feedback: 'Ctrl+K is a VS Code chord prefix for various commands, not the Agent Mode shortcut.' },
                  { label: 'Ctrl+Space', correct: false, feedback: 'Ctrl+Space triggers inline completions/suggestions, not Agent Mode.' },
                ]
              },
              {
                id: 'cop-l12-s1-q5',
                question: 'Which of the following can Agent Mode do that other modes cannot?',
                codeBlock: null,
                options: [
                  { label: 'Run terminal commands and iterate on their output', correct: true, feedback: 'Correct. Agent mode is the only mode that can execute terminal commands, observe results, and self-correct. Edit mode can modify files but cannot run commands; Ask mode is read-only.' },
                  { label: 'Read the contents of files in the workspace', correct: false, feedback: 'All three modes (Agent, Edit, Ask) can read files. Terminal command execution is unique to Agent mode.' },
                  { label: 'Answer questions about code', correct: false, feedback: 'Ask mode and Agent mode can both answer questions. The unique capability of Agent mode is running terminal commands and iterating.' },
                  { label: 'Suggest inline code completions', correct: false, feedback: 'Inline completions are a separate feature (Tab completions), not specific to Agent mode.' },
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
                question: 'What is Edit Mode in GitHub Copilot?',
                codeBlock: null,
                options: [
                  { label: 'A mode that makes targeted code edits across files without running terminal commands', correct: true, feedback: 'Correct. Edit mode focuses on code changes — it can modify multiple files simultaneously but does not execute terminal commands or iterate on output like Agent mode.' },
                  { label: 'A mode that only edits a single line at a time', correct: false, feedback: 'Edit mode can make changes across multiple files and multiple locations, not just single lines.' },
                  { label: 'A mode identical to Agent mode', correct: false, feedback: 'Edit mode differs from Agent mode — it cannot run terminal commands or iterate on errors.' },
                  { label: 'A mode for editing VS Code settings', correct: false, feedback: 'Edit mode edits source code files, not VS Code settings.' },
                ]
              },
              {
                id: 'cop-l12-s2-q2',
                question: 'How does Edit Mode differ from Agent Mode?',
                codeBlock: null,
                options: [
                  { label: 'Edit mode cannot run terminal commands and is user-directed rather than autonomous', correct: true, feedback: 'Correct. Edit mode makes the code changes you request but does not run commands, observe output, or self-correct. You direct each edit; the agent does not iterate on its own.' },
                  { label: 'Edit mode can only modify one file at a time', correct: false, feedback: 'Edit mode can modify multiple files. The key difference is no terminal access and user-directed workflow.' },
                  { label: 'Edit mode uses a different AI model', correct: false, feedback: 'Both modes can use the same models. The difference is in capabilities (terminal access) and autonomy level.' },
                  { label: 'Edit mode is slower than Agent mode', correct: false, feedback: 'Edit mode is often faster for targeted edits because it skips the command execution loop.' },
                ]
              },
              {
                id: 'cop-l12-s2-q3',
                question: 'When is Edit Mode most appropriate?',
                codeBlock: null,
                options: [
                  { label: 'For surgical, targeted edits where you know exactly what needs to change', correct: true, feedback: 'Correct. Edit mode excels at precise modifications — refactoring a function, updating an interface, or applying a specific pattern across files — especially in brownfield codebases where you want control.' },
                  { label: 'When you need to scaffold an entire new project', correct: false, feedback: 'Project scaffolding involves creating files, installing dependencies, and running commands — that is Agent mode territory.' },
                  { label: 'When you only want to ask questions without changing code', correct: false, feedback: 'That is Ask mode. Edit mode is specifically for making code changes.' },
                  { label: 'When you need to run tests after making changes', correct: false, feedback: 'If you need to run tests, use Agent mode — Edit mode cannot execute terminal commands.' },
                ]
              },
              {
                id: 'cop-l12-s2-q4',
                question: 'How does Edit Mode present its proposed changes?',
                codeBlock: null,
                options: [
                  { label: 'As inline diffs in the editor that you can accept or reject', correct: true, feedback: 'Correct. Edit mode shows changes as diffs directly in your editor, letting you review each change and accept or reject it before it is applied.' },
                  { label: 'By automatically committing changes to git', correct: false, feedback: 'Edit mode does not touch git. It presents diffs for your review in the editor.' },
                  { label: 'By opening a new file with the modified code', correct: false, feedback: 'Changes appear as inline diffs in the existing file, not in a separate new file.' },
                  { label: 'By printing the changes to the terminal', correct: false, feedback: 'Edit mode shows diffs in the editor UI, not in the terminal.' },
                ]
              },
              {
                id: 'cop-l12-s2-q5',
                question: 'Why might you prefer Edit Mode for working in a brownfield (existing) codebase?',
                codeBlock: null,
                options: [
                  { label: 'It gives you fine-grained control over exactly which changes are applied, reducing risk of unintended modifications', correct: true, feedback: 'Correct. In a mature codebase, you want to control each change carefully. Edit mode lets you direct specific edits and review diffs, avoiding the risk of an autonomous agent making unwanted changes.' },
                  { label: 'It automatically understands the entire codebase architecture', correct: false, feedback: 'No mode automatically understands the entire codebase. Edit mode is preferred for control, not comprehension.' },
                  { label: 'It runs all existing tests before applying changes', correct: false, feedback: 'Edit mode cannot run terminal commands, including tests. You choose it for control over individual edits.' },
                  { label: 'It only modifies files that have been recently changed', correct: false, feedback: 'Edit mode modifies whatever files you direct it to, regardless of recency.' },
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
                question: 'What is Ask Mode in GitHub Copilot?',
                codeBlock: null,
                options: [
                  { label: 'A read-only Q&A mode that answers questions about your code without making any changes', correct: true, feedback: 'Correct. Ask mode is strictly read-only — it can explore your codebase, explain code, and answer questions, but it never modifies files or runs commands.' },
                  { label: 'A mode that asks the user questions before making edits', correct: false, feedback: 'Ask mode does not make edits at all. It is a read-only mode for getting answers about your code.' },
                  { label: 'A mode that searches Stack Overflow for answers', correct: false, feedback: 'Ask mode uses the AI model to reason about your local codebase, not external Q&A sites.' },
                  { label: 'A mode only available in GitHub.com, not VS Code', correct: false, feedback: 'Ask mode is available directly in VS Code as one of the three chat modes.' },
                ]
              },
              {
                id: 'cop-l12-s3-q2',
                question: 'When is Ask Mode the best choice?',
                codeBlock: null,
                options: [
                  { label: 'When you need to understand code, explore architecture, or learn how something works without making changes', correct: true, feedback: 'Correct. Ask mode is ideal for comprehension tasks — understanding unfamiliar code, exploring call chains, learning project conventions — where you want information without any side effects.' },
                  { label: 'When you want to refactor a function', correct: false, feedback: 'Refactoring requires code changes. Use Edit mode for targeted refactors or Agent mode for larger ones.' },
                  { label: 'When you need to fix a failing test', correct: false, feedback: 'Fixing tests requires editing code and running the test suite. Use Agent mode for that workflow.' },
                  { label: 'When you want to create a new file', correct: false, feedback: 'Creating files requires write access. Ask mode is read-only — use Agent or Edit mode instead.' },
                ]
              },
              {
                id: 'cop-l12-s3-q3',
                question: 'What can Ask Mode NOT do?',
                codeBlock: null,
                options: [
                  { label: 'Modify files, run terminal commands, or make any changes to the workspace', correct: true, feedback: 'Correct. Ask mode is completely read-only. It cannot edit files, execute commands, or alter your workspace in any way.' },
                  { label: 'Read files in your workspace', correct: false, feedback: 'Ask mode can read files — that is how it answers questions about your code.' },
                  { label: 'Explain complex code patterns', correct: false, feedback: 'Explaining code is exactly what Ask mode excels at.' },
                  { label: 'Reference multiple files in a single answer', correct: false, feedback: 'Ask mode can reference and reason across multiple files in your workspace.' },
                ]
              },
              {
                id: 'cop-l12-s3-q4',
                question: 'A teammate asks "How does the authentication flow work in our app?" Which mode should they use?',
                codeBlock: null,
                options: [
                  { label: 'Ask mode — it is a comprehension question that does not require any code changes', correct: true, feedback: 'Correct. Understanding an existing flow is a pure reading/reasoning task. Ask mode will trace through the relevant files and explain the auth flow without touching anything.' },
                  { label: 'Agent mode — it needs to run the app to trace the flow', correct: false, feedback: 'Understanding a flow does not require running the app. Ask mode can trace code statically by reading files.' },
                  { label: 'Edit mode — it needs to annotate the code with comments', correct: false, feedback: 'The question is about understanding, not modifying code. Ask mode provides the explanation directly in chat.' },
                  { label: 'None — Copilot cannot explain code flows', correct: false, feedback: 'Explaining code flows is one of the core strengths of Ask mode.' },
                ]
              },
              {
                id: 'cop-l12-s3-q5',
                question: 'What is the key advantage of using Ask Mode over just reading code yourself?',
                codeBlock: null,
                options: [
                  { label: 'It can synthesize information across many files and explain relationships you might miss by reading linearly', correct: true, feedback: 'Correct. Ask mode can quickly pull together context from across the codebase — tracing imports, following call chains, connecting configuration to behavior — much faster than manual exploration.' },
                  { label: 'It automatically generates documentation for the code', correct: false, feedback: 'Ask mode does not generate documentation files. It answers questions in the chat panel.' },
                  { label: 'It runs the code to verify its explanations', correct: false, feedback: 'Ask mode is read-only and cannot execute any code.' },
                  { label: 'It always provides more accurate answers than Agent mode', correct: false, feedback: 'Accuracy depends on the model and context, not the mode. Ask mode\'s advantage is being safe (read-only) and focused on comprehension.' },
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
                question: 'You need to add a new REST endpoint, write tests, and ensure they pass. Which mode?',
                codeBlock: null,
                options: [
                  { label: 'Agent mode — it can create files, write code, run tests, and iterate on failures', correct: true, feedback: 'Correct. This is a multi-step task requiring file creation, code writing, and command execution. Agent mode handles the full loop autonomously.' },
                  { label: 'Edit mode — it can make all the code changes needed', correct: false, feedback: 'Edit mode can write the code, but it cannot run the tests or iterate on failures. You need Agent mode for the full workflow.' },
                  { label: 'Ask mode — start by understanding the existing endpoints first', correct: false, feedback: 'While understanding existing code is useful, the task requires creating and testing code. Agent mode is the right choice.' },
                  { label: 'Use all three modes in sequence', correct: false, feedback: 'While possible, Agent mode alone can handle this entire workflow — understanding, coding, and testing.' },
                ]
              },
              {
                id: 'cop-l12-s4-q2',
                question: 'You want to rename a variable across 3 files with no side effects. Which mode?',
                codeBlock: null,
                options: [
                  { label: 'Edit mode — it is a targeted, user-directed change with no need for terminal commands', correct: true, feedback: 'Correct. A rename across files is a precise, well-defined edit. Edit mode will show you diffs for each file, letting you verify the changes before applying them.' },
                  { label: 'Agent mode — let it find and replace everything', correct: false, feedback: 'Agent mode works but is overkill for a simple rename. Edit mode gives you more control and is faster for targeted changes.' },
                  { label: 'Ask mode — have it locate all usages first', correct: false, feedback: 'Ask mode can find usages but cannot make changes. Edit mode is the right tool for this task.' },
                  { label: 'Use VS Code\'s built-in rename instead', correct: false, feedback: 'VS Code rename (F2) works for simple renames, but Copilot Edit mode can handle more complex renames that involve pattern changes or context-aware modifications.' },
                ]
              },
              {
                id: 'cop-l12-s4-q3',
                question: 'You joined a new team and want to understand how their microservices communicate. Which mode?',
                codeBlock: null,
                options: [
                  { label: 'Ask mode — pure comprehension, no changes needed', correct: true, feedback: 'Correct. You want to learn, not change. Ask mode will read the codebase and explain the service communication patterns without any risk of accidental modifications.' },
                  { label: 'Agent mode — it can run the services and trace requests', correct: false, feedback: 'Running services is complex and risky in an unfamiliar codebase. Ask mode can explain the architecture from the code alone.' },
                  { label: 'Edit mode — have it add architecture comments', correct: false, feedback: 'Adding comments is a modification. The goal is understanding first — use Ask mode.' },
                  { label: 'None of these — use the team\'s wiki instead', correct: false, feedback: 'Wikis may be outdated. Ask mode reads the actual current code, providing accurate, up-to-date explanations.' },
                ]
              },
              {
                id: 'cop-l12-s4-q4',
                question: 'How does Copilot\'s Agent Mode compare to Claude Code\'s agentic mode?',
                codeBlock: null,
                options: [
                  { label: 'Both use an agentic loop with tool calls, but Copilot runs in VS Code while Claude Code runs in the terminal', correct: true, feedback: 'Correct. Both follow the same pattern — plan, act, observe, iterate — but Copilot agent mode is embedded in VS Code with GUI diffs, while Claude Code is a CLI tool that works in any terminal.' },
                  { label: 'Claude Code does not have an agentic mode', correct: false, feedback: 'Claude Code is inherently agentic — it uses the same plan-act-observe loop with tools like Read, Edit, Bash, and Grep.' },
                  { label: 'Copilot Agent Mode is more powerful because it has a GUI', correct: false, feedback: 'Both are powerful in different ways. Claude Code\'s terminal-based approach can be faster for certain workflows and works without VS Code.' },
                  { label: 'They use completely different architectures', correct: false, feedback: 'Both use an LLM-driven agentic loop with tool calls. The architecture is conceptually very similar.' },
                ]
              },
              {
                id: 'cop-l12-s4-q5',
                question: 'What is the general principle for choosing between the three modes?',
                codeBlock: null,
                options: [
                  { label: 'Use the least powerful mode that can accomplish the task — Ask for learning, Edit for targeted changes, Agent for complex multi-step work', correct: true, feedback: 'Correct. Start with Ask if you just need information, use Edit for precise changes, and reach for Agent mode only when you need autonomous multi-step execution. This minimizes risk and maximizes control.' },
                  { label: 'Always use Agent mode since it can do everything', correct: false, feedback: 'Agent mode can do everything but offers less control. For targeted edits, Edit mode is safer. For learning, Ask mode avoids accidental changes.' },
                  { label: 'Use Ask mode first, then Edit, then Agent — always in that order', correct: false, feedback: 'The sequence depends on the task, not a fixed order. A simple rename goes straight to Edit mode; a complex feature goes straight to Agent mode.' },
                  { label: 'The modes are interchangeable — pick whichever you prefer', correct: false, feedback: 'The modes have fundamentally different capabilities. Ask mode cannot edit; Edit mode cannot run commands. Choosing correctly matters.' },
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
                question: 'Where do you place repository-wide custom instructions for GitHub Copilot?',
                codeBlock: null,
                options: [
                  { label: '`.github/copilot-instructions.md`', correct: true, feedback: 'Correct. The `.github/copilot-instructions.md` file contains instructions that apply to every Copilot interaction in the repository — coding standards, preferred patterns, and project-specific rules.' },
                  { label: '`.vscode/settings.json`', correct: false, feedback: 'VS Code settings configure the editor, not Copilot\'s custom instructions. Use `.github/copilot-instructions.md` for repo-wide instructions.' },
                  { label: '`CLAUDE.md` in the repo root', correct: false, feedback: '`CLAUDE.md` is for Claude Code instructions. GitHub Copilot uses `.github/copilot-instructions.md`.' },
                  { label: '`package.json` under a "copilot" key', correct: false, feedback: 'Copilot instructions live in a dedicated markdown file, not in package.json.' },
                ]
              },
              {
                id: 'cop-l13-s1-q2',
                question: 'What are path-specific instruction files and how do they work?',
                codeBlock: '# .github/instructions/react-components.instructions.md\n---\napplyTo: "src/components/**/*.tsx"\n---\nUse functional components with hooks.\nAlways add PropTypes or TypeScript interfaces.',
                options: [
                  { label: 'Markdown files with `applyTo` globs in YAML frontmatter that provide instructions only when Copilot works on matching file paths', correct: true, feedback: 'Correct. Files named `*.instructions.md` use an `applyTo` glob to scope their instructions. Copilot only includes these instructions when working with files that match the pattern.' },
                  { label: 'Files that override all other instructions for matching paths', correct: false, feedback: 'Path-specific instructions supplement, not override, the global instructions. Both are included for matching files.' },
                  { label: 'JSON configuration files that restrict which files Copilot can access', correct: false, feedback: 'They are markdown files with instructions, not JSON access control files.' },
                  { label: 'Files that only work in Agent mode', correct: false, feedback: 'Path-specific instructions work across all Copilot modes, not just Agent mode.' },
                ]
              },
              {
                id: 'cop-l13-s1-q3',
                question: 'Can Copilot use AGENTS.md or CLAUDE.md files that already exist in a repository?',
                codeBlock: null,
                options: [
                  { label: 'Yes — Copilot can read AGENTS.md and CLAUDE.md as additional instruction sources for compatibility', correct: true, feedback: 'Correct. Copilot recognizes AGENTS.md (Cursor/Windsurf convention) and CLAUDE.md (Claude Code convention), providing cross-tool compatibility so teams can use one instruction set.' },
                  { label: 'No — Copilot only reads its own `.github/copilot-instructions.md` file', correct: false, feedback: 'Copilot also supports AGENTS.md and CLAUDE.md for cross-tool compatibility.' },
                  { label: 'Only if you rename them to `.github/copilot-instructions.md`', correct: false, feedback: 'No renaming needed. Copilot can read them directly in their original locations.' },
                  { label: 'Only AGENTS.md — CLAUDE.md is ignored', correct: false, feedback: 'Copilot supports both AGENTS.md and CLAUDE.md.' },
                ]
              },
              {
                id: 'cop-l13-s1-q4',
                question: 'What is the priority order when multiple instruction sources exist?',
                codeBlock: null,
                options: [
                  { label: 'Path-specific instructions take highest priority, then repo-level `.github/copilot-instructions.md`, then AGENTS.md/CLAUDE.md', correct: true, feedback: 'Correct. More specific instructions win. Path-specific files (scoped by glob) are most specific, followed by the repo-level Copilot file, then general-purpose instruction files.' },
                  { label: 'CLAUDE.md always takes highest priority', correct: false, feedback: 'CLAUDE.md is a compatibility source with lower priority than Copilot\'s native instruction files.' },
                  { label: 'All instruction sources have equal priority and are merged alphabetically', correct: false, feedback: 'Instructions have a defined priority order, with more specific sources taking precedence.' },
                  { label: 'Only one instruction source is ever active at a time', correct: false, feedback: 'Multiple instruction sources can be active simultaneously, combined according to their priority.' },
                ]
              },
              {
                id: 'cop-l13-s1-q5',
                question: 'Why would you use path-specific instructions instead of putting everything in the global instructions file?',
                codeBlock: null,
                options: [
                  { label: 'To avoid polluting the context window with irrelevant instructions when working on unrelated files', correct: true, feedback: 'Correct. If you have React instructions, they are irrelevant when editing Python scripts. Path-specific instructions keep the context clean by only including relevant rules for the files being worked on.' },
                  { label: 'Path-specific files are the only way to add instructions', correct: false, feedback: 'The global `.github/copilot-instructions.md` file exists for repo-wide instructions. Path-specific files are an additional mechanism.' },
                  { label: 'Global instructions are limited to 100 characters', correct: false, feedback: 'There is no such character limit. The benefit of path-specific files is relevance, not size.' },
                  { label: 'Path-specific instructions run faster', correct: false, feedback: 'Performance is not the reason. The benefit is keeping context focused and relevant.' },
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
                question: 'Where do custom agent definitions live in a Copilot repository?',
                codeBlock: null,
                options: [
                  { label: '`.github/agents/*.agent.md`', correct: true, feedback: 'Correct. Custom agents are markdown files in the `.github/agents/` directory with the `.agent.md` extension. Each file defines one reusable agent.' },
                  { label: '`.vscode/agents/`', correct: false, feedback: 'Agents live in `.github/agents/`, not `.vscode/agents/`. The `.github/` directory is the standard location for Copilot configuration.' },
                  { label: '`.claude/agents/`', correct: false, feedback: 'That is the Claude Code agent location. Copilot uses `.github/agents/`.' },
                  { label: '`.copilot/agents.json`', correct: false, feedback: 'Agents are defined as individual markdown files, not in a JSON configuration file.' },
                ]
              },
              {
                id: 'cop-l13-s2-q2',
                question: 'What goes in the YAML frontmatter of a `.agent.md` file?',
                codeBlock: '---\nname: api-designer\ndescription: Designs REST API endpoints following OpenAPI conventions\ntools:\n  - execute\n  - read\n  - search\nmodel: gpt-4o\n---',
                options: [
                  { label: 'Agent metadata: name, description, allowed tools, and preferred model', correct: true, feedback: 'Correct. The frontmatter configures the agent\'s identity (name, description), capabilities (tools list), and which model to use. The markdown body below becomes the agent\'s system prompt.' },
                  { label: 'Only the agent name — everything else goes in the body', correct: false, feedback: 'The frontmatter includes name, description, tools, and model. The body is the system prompt.' },
                  { label: 'A JSON schema defining the agent\'s input/output format', correct: false, feedback: 'The frontmatter is YAML metadata, not a JSON schema. Input/output formats are described in the system prompt body.' },
                  { label: 'Environment variables and secrets for the agent', correct: false, feedback: 'Secrets should never go in agent files (they are committed to git). The frontmatter contains metadata like name, tools, and model.' },
                ]
              },
              {
                id: 'cop-l13-s2-q3',
                question: 'What are the tool aliases available in Copilot custom agents?',
                codeBlock: null,
                options: [
                  { label: 'execute (run commands), read (read files), edit (modify files), and search (search codebase)', correct: true, feedback: 'Correct. These four aliases map to Copilot\'s internal tools: `execute` for terminal commands, `read` for file reading, `edit` for file modification, and `search` for codebase search.' },
                  { label: 'Bash, Read, Write, Grep — same as Claude Code', correct: false, feedback: 'Copilot uses its own tool aliases (execute, read, edit, search), not Claude Code\'s tool names.' },
                  { label: 'run, open, save, find', correct: false, feedback: 'The correct aliases are execute, read, edit, and search.' },
                  { label: 'There are no tool restrictions — agents can use all tools', correct: false, feedback: 'Agents specify which tools they can access in their frontmatter. Unlisted tools are not available to the agent.' },
                ]
              },
              {
                id: 'cop-l13-s2-q4',
                question: 'How do you invoke a custom agent in Copilot chat?',
                codeBlock: null,
                options: [
                  { label: 'Type `@agent-name` in the chat panel to mention and activate it', correct: true, feedback: 'Correct. Custom agents appear as mentionable participants in the chat. Type `@` followed by the agent name to invoke it for a specific task.' },
                  { label: 'Run a slash command like `/run-agent api-designer`', correct: false, feedback: 'Custom agents are invoked with the `@` mention syntax, not slash commands.' },
                  { label: 'They run automatically when matching files are opened', correct: false, feedback: 'Custom agents must be explicitly invoked with `@` mentions. They do not run automatically.' },
                  { label: 'Use the Command Palette to select and launch an agent', correct: false, feedback: 'While the Command Palette has Copilot commands, custom agents are invoked directly in chat with `@` mentions.' },
                ]
              },
              {
                id: 'cop-l13-s2-q5',
                question: 'How do Copilot custom agents compare to Claude Code custom agents?',
                codeBlock: null,
                options: [
                  { label: 'Both use markdown files with YAML frontmatter but live in different directories (`.github/agents/` vs `.claude/agents/`)', correct: true, feedback: 'Correct. The format is nearly identical — markdown files with YAML frontmatter defining name, description, tools, and model. Only the directory and tool aliases differ.' },
                  { label: 'They are completely different systems with no similarities', correct: false, feedback: 'Both use markdown files with YAML frontmatter. The systems are conceptually very similar.' },
                  { label: 'Copilot agents are more powerful because they support more tools', correct: false, feedback: 'Both systems support comparable tool sets. The difference is location and tool alias naming, not capability.' },
                  { label: 'Claude Code does not support custom agents', correct: false, feedback: 'Claude Code fully supports custom agents in `.claude/agents/` with YAML frontmatter.' },
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
                question: 'What is a Copilot Skill and where is it defined?',
                codeBlock: null,
                options: [
                  { label: 'A reusable capability defined in `.github/skills/*/SKILL.md` that can be invoked by agents or users', correct: true, feedback: 'Correct. Skills are structured capabilities with their own directory under `.github/skills/`. Each skill has a `SKILL.md` file that defines what it does and how to use it.' },
                  { label: 'A VS Code extension that adds features to Copilot', correct: false, feedback: 'Skills are markdown-based definitions in the repo, not VS Code extensions.' },
                  { label: 'An API endpoint that Copilot can call', correct: false, feedback: 'Skills are local markdown definitions, not API endpoints.' },
                  { label: 'A pre-trained model fine-tuned for specific tasks', correct: false, feedback: 'Skills are prompt-based capabilities, not fine-tuned models.' },
                ]
              },
              {
                id: 'cop-l13-s3-q2',
                question: 'What are prompt files and how do they differ from skills?',
                codeBlock: '# .github/prompts/add-api-endpoint.prompt.md\n---\nname: add-api-endpoint\ndescription: Scaffolds a new REST API endpoint\n---\nCreate a new endpoint at ${input:path} that:\n- Follows our REST conventions\n- Includes validation\n- Has error handling',
                options: [
                  { label: 'Prompt files (`.prompt.md`) are reusable prompt templates with variables, while skills are more structured capabilities with their own directories', correct: true, feedback: 'Correct. Prompt files are lightweight templates in `.github/prompts/` that support variables like `${input:name}`. Skills are more structured, living in their own directories with a `SKILL.md` definition.' },
                  { label: 'They are identical — just different file extensions', correct: false, feedback: 'Prompts are simpler templates; skills are structured capabilities with directories and more complex definitions.' },
                  { label: 'Prompt files can only be used in Ask mode', correct: false, feedback: 'Prompt files can be used across modes. They are templates, not mode-specific.' },
                  { label: 'Skills are deprecated in favor of prompt files', correct: false, feedback: 'Both coexist — skills for complex capabilities, prompts for reusable templates.' },
                ]
              },
              {
                id: 'cop-l13-s3-q3',
                question: 'How do you create a new skill or prompt interactively?',
                codeBlock: null,
                options: [
                  { label: 'Use `/create-skill` or `/create-prompt` slash commands in Copilot chat', correct: true, feedback: 'Correct. These slash commands guide you through creating a new skill or prompt file interactively, placing it in the correct directory with proper formatting.' },
                  { label: 'Use the VS Code Command Palette to generate templates', correct: false, feedback: 'While the Command Palette has Copilot commands, skills and prompts are created with the `/create-skill` and `/create-prompt` chat commands.' },
                  { label: 'Skills and prompts can only be created by manually writing markdown files', correct: false, feedback: 'You can write them manually, but the `/create-skill` and `/create-prompt` commands provide an interactive guided experience.' },
                  { label: 'Download them from the GitHub Marketplace', correct: false, feedback: 'Skills and prompts are project-specific and created locally, not downloaded from a marketplace.' },
                ]
              },
              {
                id: 'cop-l13-s3-q4',
                question: 'What variables can you use in prompt files?',
                codeBlock: null,
                options: [
                  { label: '`${selection}` for current editor selection and `${input:name}` for user-provided values at runtime', correct: true, feedback: 'Correct. `${selection}` injects the currently selected code, and `${input:name}` prompts the user to enter a value when the prompt is invoked, making prompts dynamic and reusable.' },
                  { label: 'Only environment variables like `${HOME}` and `${PATH}`', correct: false, feedback: 'Prompt variables are Copilot-specific (`${selection}`, `${input:...}`), not shell environment variables.' },
                  { label: 'No variables are supported — all content must be static', correct: false, feedback: 'Prompt files explicitly support variables like `${selection}` and `${input:name}` for dynamic content.' },
                  { label: 'Only `${file}` to reference the current file name', correct: false, feedback: 'While file context is available, the key variables are `${selection}` for selected code and `${input:name}` for user input.' },
                ]
              },
              {
                id: 'cop-l13-s3-q5',
                question: 'You want a reusable template that asks the user for a component name and scaffolds a React component. What do you create?',
                codeBlock: null,
                options: [
                  { label: 'A prompt file using `${input:componentName}` to capture the name at runtime', correct: true, feedback: 'Correct. A `.prompt.md` file with `${input:componentName}` will ask the user for the component name when invoked, then use it in the scaffolding template.' },
                  { label: 'A VS Code snippet with tab stops', correct: false, feedback: 'VS Code snippets are for inline text expansion. A Copilot prompt file provides AI-powered scaffolding with full context awareness.' },
                  { label: 'A custom agent that always creates React components', correct: false, feedback: 'An agent is overkill for a simple template. A prompt file is the lightweight, reusable solution.' },
                  { label: 'A shell script that generates the file', correct: false, feedback: 'A prompt file leverages Copilot\'s AI to generate context-aware code, which is more flexible than a static shell script.' },
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
                question: 'Where is MCP server configuration defined for Copilot in VS Code?',
                codeBlock: null,
                options: [
                  { label: '`.vscode/mcp.json`', correct: true, feedback: 'Correct. MCP server configuration for Copilot lives in `.vscode/mcp.json`, which defines which MCP servers are available and how to connect to them.' },
                  { label: '`.github/mcp-servers.yml`', correct: false, feedback: 'MCP config for the VS Code extension is in `.vscode/mcp.json`, not in the `.github/` directory.' },
                  { label: '`settings.json` under `mcp.servers`', correct: false, feedback: 'While VS Code settings can reference MCP, the dedicated config file is `.vscode/mcp.json`.' },
                  { label: '`.copilot/mcp.json`', correct: false, feedback: 'There is no `.copilot/` directory. MCP config lives in `.vscode/mcp.json`.' },
                ]
              },
              {
                id: 'cop-l13-s4-q2',
                question: 'What are the supported MCP server transport types in Copilot?',
                codeBlock: null,
                options: [
                  { label: 'stdio (local process), HTTP (streamable), and SSE (server-sent events)', correct: true, feedback: 'Correct. Copilot supports three transport types: stdio for local servers running as child processes, HTTP for streamable remote connections, and SSE for server-sent events streams.' },
                  { label: 'Only HTTP — all servers must be remote', correct: false, feedback: 'Copilot supports local servers via stdio as well as remote servers via HTTP and SSE.' },
                  { label: 'WebSocket and gRPC', correct: false, feedback: 'MCP uses stdio, HTTP, and SSE — not WebSocket or gRPC.' },
                  { label: 'Only stdio — all servers must run locally', correct: false, feedback: 'While stdio is common, Copilot also supports remote servers via HTTP and SSE transports.' },
                ]
              },
              {
                id: 'cop-l13-s4-q3',
                question: 'What security feature was added for MCP servers in VS Code 1.112+?',
                codeBlock: null,
                options: [
                  { label: 'Sandboxing — MCP server processes run in isolated sandboxes to limit system access', correct: true, feedback: 'Correct. VS Code 1.112+ introduced sandboxing for MCP servers, restricting what they can access on the system. This prevents malicious or buggy MCP servers from causing damage.' },
                  { label: 'Encryption of all MCP communication', correct: false, feedback: 'While security was improved, the key 1.112+ addition was process sandboxing, not transport encryption.' },
                  { label: 'Requiring OAuth authentication for all MCP servers', correct: false, feedback: 'The 1.112+ security feature is sandboxing, not authentication requirements.' },
                  { label: 'Automatic virus scanning of MCP server code', correct: false, feedback: 'The security feature is process sandboxing, not virus scanning.' },
                ]
              },
              {
                id: 'cop-l13-s4-q4',
                question: 'What is the maximum number of tools an MCP server can expose to Copilot?',
                codeBlock: null,
                options: [
                  { label: '128 tools', correct: true, feedback: 'Correct. Copilot limits each MCP server to 128 tools. This prevents context window bloat from tool definitions and encourages focused, well-designed server interfaces.' },
                  { label: 'Unlimited — there is no cap', correct: false, feedback: 'There is a hard limit of 128 tools per MCP server to manage context window usage.' },
                  { label: '10 tools', correct: false, feedback: 'The limit is 128, not 10. But it exists to prevent tool definition overload.' },
                  { label: '1,000 tools', correct: false, feedback: 'The limit is 128 tools per MCP server.' },
                ]
              },
              {
                id: 'cop-l13-s4-q5',
                question: 'How can you install an MCP server for Copilot?',
                codeBlock: null,
                options: [
                  { label: 'Add it to `.vscode/mcp.json`, use the VS Code MCP panel, or install via a one-click link from the server\'s documentation', correct: true, feedback: 'Correct. There are multiple methods: manually editing the JSON config, using the VS Code MCP management panel, or using one-click installation links that some MCP server authors provide.' },
                  { label: 'Only by manually editing `.vscode/mcp.json`', correct: false, feedback: 'Manual editing works, but VS Code also provides a UI panel and one-click installation links.' },
                  { label: 'Install it as a VS Code extension from the marketplace', correct: false, feedback: 'MCP servers are not VS Code extensions. They are configured in `.vscode/mcp.json` or via the MCP panel.' },
                  { label: 'Run `npm install -g @copilot/mcp-server`', correct: false, feedback: 'MCP servers are configured, not installed globally via npm. Add them to `.vscode/mcp.json`.' },
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
                question: 'What are the four types of Copilot agents?',
                codeBlock: null,
                options: [
                  { label: 'Local agent, background agent, cloud agent, and sub-agent', correct: true, feedback: 'Correct. Local runs in your VS Code. Background runs in a local worktree. Cloud runs on GitHub\'s infrastructure. Sub-agents are spawned by other agents to handle subtasks.' },
                  { label: 'Ask agent, Edit agent, Code agent, and Review agent', correct: false, feedback: 'Those are not agent types. The four types are local, background, cloud, and sub-agent.' },
                  { label: 'Free, Pro, Enterprise, and Custom', correct: false, feedback: 'Those are pricing tiers, not agent types. The four agent types are local, background, cloud, and sub-agent.' },
                  { label: 'Read, Write, Execute, and Debug', correct: false, feedback: 'Those describe capabilities, not agent types. The four types are local, background, cloud, and sub-agent.' },
                ]
              },
              {
                id: 'cop-l14-s1-q2',
                question: 'How does a background agent isolate its work from your current workspace?',
                codeBlock: null,
                options: [
                  { label: 'It creates a git worktree — a separate working directory linked to the same repo but on a different branch', correct: true, feedback: 'Correct. Background agents use git worktrees to work independently. This means they can make changes on a separate branch without interfering with your current work.' },
                  { label: 'It forks the entire repository into a new repo', correct: false, feedback: 'Background agents use git worktrees (lightweight), not full repo forks (heavyweight).' },
                  { label: 'It runs in a Docker container with a copy of the code', correct: false, feedback: 'Background agents use git worktrees for isolation, not Docker containers.' },
                  { label: 'It locks your workspace so no one else can edit', correct: false, feedback: 'Background agents specifically avoid locking your workspace — you can keep working while they operate in a separate worktree.' },
                ]
              },
              {
                id: 'cop-l14-s1-q3',
                question: 'What does a cloud agent do when it finishes its work?',
                codeBlock: null,
                options: [
                  { label: 'Creates a pull request with its changes for review', correct: true, feedback: 'Correct. Cloud agents run on GitHub\'s infrastructure and create PRs when done. This lets you assign issues or tasks to Copilot, and it delivers the changes as a reviewable PR.' },
                  { label: 'Merges changes directly into the main branch', correct: false, feedback: 'Cloud agents create PRs — they never merge directly. You still review and merge.' },
                  { label: 'Sends the changes as a patch file via email', correct: false, feedback: 'Cloud agents create GitHub pull requests, not email patches.' },
                  { label: 'Applies changes to your local workspace', correct: false, feedback: 'Cloud agents run on GitHub\'s servers and create PRs. They do not modify your local workspace.' },
                ]
              },
              {
                id: 'cop-l14-s1-q4',
                question: 'What is `copilot-setup-steps.yml` used for?',
                codeBlock: null,
                options: [
                  { label: 'A GitHub Actions workflow that defines the environment setup for cloud agents (installing dependencies, building, etc.)', correct: true, feedback: 'Correct. `copilot-setup-steps.yml` tells cloud agents how to set up the development environment — which packages to install, how to build the project, and any other setup steps needed before the agent can work.' },
                  { label: 'A configuration file for local Copilot setup in VS Code', correct: false, feedback: 'This file is specifically for cloud agents running on GitHub\'s infrastructure, not local VS Code setup.' },
                  { label: 'A YAML file listing all custom agents in the repo', correct: false, feedback: 'Custom agents are defined as individual `.agent.md` files in `.github/agents/`, not in this YAML file.' },
                  { label: 'A CI/CD pipeline configuration for deploying Copilot extensions', correct: false, feedback: 'It is an environment setup file for cloud agents, not a deployment pipeline.' },
                ]
              },
              {
                id: 'cop-l14-s1-q5',
                question: 'What does the `/delegate` command do in Copilot chat?',
                codeBlock: null,
                options: [
                  { label: 'Spawns a sub-agent to handle a subtask while the main agent continues', correct: true, feedback: 'Correct. `/delegate` creates a sub-agent that works on a specific subtask independently. The main agent can continue with other work while the sub-agent operates.' },
                  { label: 'Transfers the conversation to a human team member', correct: false, feedback: '`/delegate` spawns an AI sub-agent, not a handoff to a human.' },
                  { label: 'Moves the task to a cloud agent', correct: false, feedback: '`/delegate` creates a sub-agent within the current context, not a cloud agent on GitHub\'s servers.' },
                  { label: 'Assigns the current file to another developer', correct: false, feedback: '`/delegate` spawns a sub-agent for AI task decomposition, not developer assignment.' },
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
                question: 'What is Next Edit Suggestions (NES) in GitHub Copilot?',
                codeBlock: null,
                options: [
                  { label: 'A feature that predicts the next location in your code you\'ll want to edit and suggests the change proactively', correct: true, feedback: 'Correct. NES goes beyond autocomplete — it predicts not just what code to write, but where you\'ll want to make your next edit, jumping you to the right location with a suggested change.' },
                  { label: 'A list of suggested edits from code review', correct: false, feedback: 'NES is a real-time prediction feature in the editor, not a code review tool.' },
                  { label: 'A keyboard shortcut for navigating between edit locations', correct: false, feedback: 'NES is an AI-powered prediction feature, not just a navigation shortcut.' },
                  { label: 'A feature that auto-saves your recent edits', correct: false, feedback: 'NES predicts future edits, not saves past ones.' },
                ]
              },
              {
                id: 'cop-l14-s4-q2',
                question: 'How do you accept a Next Edit Suggestion?',
                codeBlock: null,
                options: [
                  { label: 'Press Tab to accept the suggestion, just like inline completions', correct: true, feedback: 'Correct. NES uses the familiar Tab key to accept suggestions, maintaining consistency with Copilot\'s inline completion workflow.' },
                  { label: 'Click a button in the sidebar', correct: false, feedback: 'NES suggestions appear inline in the editor and are accepted with Tab, not via sidebar buttons.' },
                  { label: 'Type `@accept` in the chat panel', correct: false, feedback: 'NES is an editor feature, not a chat feature. Press Tab to accept.' },
                  { label: 'Run a command from the Command Palette', correct: false, feedback: 'NES is designed for speed — just press Tab. No Command Palette needed.' },
                ]
              },
              {
                id: 'cop-l14-s4-q3',
                question: 'What browser debugging capability was added in VS Code 1.112+?',
                codeBlock: null,
                options: [
                  { label: 'Agent mode can read browser console logs and debug web applications by observing runtime errors', correct: true, feedback: 'Correct. VS Code 1.112+ allows agent mode to interact with a browser debugger, reading console output and runtime errors to help diagnose and fix frontend issues.' },
                  { label: 'Copilot can now render web pages inside VS Code', correct: false, feedback: 'The feature is about reading browser debug output, not rendering pages inside the editor.' },
                  { label: 'A built-in browser replaced the need for Chrome DevTools', correct: false, feedback: 'The feature integrates with browser debugging, not replaces DevTools.' },
                  { label: 'Copilot can now modify browser cookies and local storage', correct: false, feedback: 'The debugging feature reads console logs and errors, not modify browser storage.' },
                ]
              },
              {
                id: 'cop-l14-s4-q4',
                question: 'What monorepo support improvement came with recent Copilot updates?',
                codeBlock: null,
                options: [
                  { label: 'Copilot can now understand and work across multiple packages in a monorepo, respecting workspace boundaries', correct: true, feedback: 'Correct. Recent updates improved monorepo support so Copilot understands package boundaries, shared dependencies, and cross-package relationships within monorepo structures.' },
                  { label: 'Copilot now requires a monorepo structure for all projects', correct: false, feedback: 'Monorepo support is optional — Copilot works with any project structure.' },
                  { label: 'A new `/monorepo` command was added', correct: false, feedback: 'The improvement is automatic understanding of monorepo structure, not a specific command.' },
                  { label: 'Copilot can now split monorepos into separate repositories', correct: false, feedback: 'The improvement is about understanding and working within monorepos, not splitting them.' },
                ]
              },
              {
                id: 'cop-l14-s4-q5',
                question: 'What does the `/troubleshoot` command do in Copilot?',
                codeBlock: null,
                options: [
                  { label: 'Diagnoses problems with your Copilot setup, extensions, or configuration and suggests fixes', correct: true, feedback: 'Correct. `/troubleshoot` helps debug issues with Copilot itself — checking extension status, configuration problems, authentication issues, and suggesting remediation steps.' },
                  { label: 'Debugs runtime errors in your application code', correct: false, feedback: '`/troubleshoot` diagnoses Copilot configuration issues, not application bugs. For app debugging, use Agent mode.' },
                  { label: 'Runs all tests and reports failures', correct: false, feedback: '`/troubleshoot` is about Copilot health, not test execution.' },
                  { label: 'Contacts GitHub support automatically', correct: false, feedback: '`/troubleshoot` performs local diagnostics — it does not contact support.' },
                ]
              },
            ]
          },
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
