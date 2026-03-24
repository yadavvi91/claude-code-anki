# Work Packages: Claude Code & GitHub Copilot Learning Platform

**Inputs**: Design documents from `/kitty-specs/001-claude-copilot-learn/`
**Prerequisites**: plan.md (required), spec.md

---

## Work Package WP01: Project config & rename (Priority: P0) ✅ DONE

**Goal**: Rebrand project from Sanskrit learning to Claude Copilot learning.
**Independent Test**: `npm run dev` starts, page loads with new title.
**Prompt**: `/tasks/done/WP01-project-config.md`
**Requirements Refs**: FR-001

### Included Subtasks
- [x] T001 Rename package.json
- [x] T002 Update vite.config.js base path
- [x] T003 Rewrite index.html (title, meta, fonts, background)
- [x] T004 Update public/404.html
- [x] T005 Rewrite CLAUDE.md

### Dependencies
- None (starting package)

---

## Work Package WP02: Theme & core infrastructure (Priority: P0) ✅ DONE

**Goal**: Establish new design tokens and SRS engine updates.
**Independent Test**: MCQCard renders with new theme, SRS persists to new key.
**Prompt**: `/tasks/done/WP02-theme-infra.md`
**Requirements Refs**: FR-001, FR-002

### Included Subtasks
- [x] T006 Rewrite src/theme.js with new design tokens
- [x] T007 Update MCQCard.jsx (new SRS key, code support, remove Devanagari)
- [x] T008 Create unified src/data/cardSets.js with module schema + L1 cards

### Dependencies
- Depends on WP01

---

## Work Package WP03: New reusable components (Priority: P0) ✅ DONE

**Goal**: Build 9 lesson components for Quantum Country-style pages.
**Independent Test**: Each component renders in isolation.
**Prompt**: `/tasks/done/WP03-components.md`
**Requirements Refs**: FR-001, FR-002

### Included Subtasks
- [x] T009 CodeBlock
- [x] T010 TerminalAnimation
- [x] T011 ComparisonTable
- [x] T012 TipCallout
- [x] T013 FileTree
- [x] T014 KeyValueCard
- [x] T015 LessonNav
- [x] T016 ConceptDisplay
- [x] T017 SnippetBreakdown

### Dependencies
- Depends on WP02

---

## Work Package WP04: Landing page & navigation (Priority: P0) ✅ DONE

**Goal**: Complete home page with module overview and full routing.
**Independent Test**: Home page renders all sections, module grid links work.
**Prompt**: `/tasks/done/WP04-landing.md`
**Requirements Refs**: FR-005

### Included Subtasks
- [x] T018 Rewrite Hero.jsx
- [x] T019 Rewrite IntroSections.jsx
- [x] T020 Rewrite MethodBand.jsx
- [x] T021 Rewrite BeginDivider.jsx
- [x] T022 Modify NavSidebar.jsx
- [x] T023 Create ModuleOverview.jsx
- [x] T024 Rewrite App.jsx
- [x] T025 Rewrite main.jsx with full routing

### Dependencies
- Depends on WP02, WP03

---

## Work Package WP05: L1 Architecture & Tools — PoC (Priority: P0) ✅ DONE

**Goal**: First complete lesson validating the entire pattern.
**Independent Test**: Full lesson navigable, 19 cards answerable, SRS works.
**Prompt**: `/tasks/done/WP05-lesson-01.md`
**Requirements Refs**: FR-001, FR-002, FR-003

### Included Subtasks
- [x] T026 Section 1: Tool Selection (5 cards)
- [x] T027 Section 2: Architecture & Context (5 cards)
- [x] T028 Section 3: Safety & Best Practices (5 cards)
- [x] T029 Section 4: Bash & System Commands (4 cards)

### Dependencies
- Depends on WP03, WP04

---

## Work Package WP06: L2 Context, Planning & Commands (Priority: P1)

**Goal**: Lesson on context management, planning modes, slash commands, CLAUDE.md.
**Prompt**: `/tasks/planned/WP06-lesson-02.md`
**Requirements Refs**: FR-001, FR-002

### Included Subtasks
- [ ] T030 Section 1: Context management prose + cards
- [ ] T031 Section 2: Planning/thinking modes prose + cards
- [ ] T032 Section 3: Slash commands & CLAUDE.md prose + cards

### Dependencies
- Depends on WP05

---

## Work Package WP07: L3 MCP Integration & GitHub Workflows (Priority: P1)

**Goal**: Lesson on MCP in Claude Code, browser automation, GitHub PR review, hooks.
**Prompt**: `/tasks/planned/WP07-lesson-03.md`
**Requirements Refs**: FR-001, FR-002

### Included Subtasks
- [ ] T033 Section 1: MCP servers in Claude Code
- [ ] T034 Section 2: Browser automation & GitHub integration
- [ ] T035 Section 3: Hooks (pre/post tool)

### Dependencies
- Depends on WP05

---

## Work Package WP08: Interlude 1 — Claude Code Reflections (Priority: P1)

**Goal**: Reflective essay synthesizing Module 1. No SRS cards.
**Prompt**: `/tasks/planned/WP08-interlude-1.md`
**Requirements Refs**: FR-001

### Included Subtasks
- [ ] T036 Write reflective essay

### Dependencies
- Depends on WP07

---

## Work Package WP09: L4 MCP Architecture & Building Servers (Priority: P1)

**Goal**: Lesson on MCP client-server model, Python SDK, MCP Inspector.
**Prompt**: `/tasks/planned/WP09-lesson-04.md`
**Requirements Refs**: FR-001, FR-002

### Included Subtasks
- [ ] T037 Section 1: Client-server model & transport-agnostic design
- [ ] T038 Section 2: Python SDK with decorators
- [ ] T039 Section 3: MCP Inspector

### Dependencies
- Depends on WP05

---

## Work Package WP10: L5 Resources, Prompts & Patterns (Priority: P1)

**Goal**: Lesson on resources, prompts, tools vs resources vs prompts.
**Prompt**: `/tasks/planned/WP10-lesson-05.md`
**Requirements Refs**: FR-001, FR-002

### Included Subtasks
- [ ] T040 Section 1: Static/templated resources
- [ ] T041 Section 2: Pre-crafted prompts
- [ ] T042 Section 3: Decision criteria & autocomplete

### Dependencies
- Depends on WP09

---

## Work Package WP11: L6 Sampling, Progress & Security (Priority: P1)

**Goal**: Lesson on sampling, progress/logging, roots-based file access.
**Prompt**: `/tasks/planned/WP11-lesson-06.md`
**Requirements Refs**: FR-001, FR-002

### Included Subtasks
- [ ] T043 Section 1: Sampling (servers requesting LLM calls)
- [ ] T044 Section 2: Progress/logging notifications
- [ ] T045 Section 3: Roots-based file access & security

### Dependencies
- Depends on WP05

---

## Work Package WP12: L7 Transports & Production (Priority: P1)

**Goal**: Lesson on transport types, JSON messages, scaling.
**Prompt**: `/tasks/planned/WP12-lesson-07.md`
**Requirements Refs**: FR-001, FR-002

### Included Subtasks
- [ ] T046 Section 1: Stdio vs HTTP vs SSE transports
- [ ] T047 Section 2: JSON message architecture
- [ ] T048 Section 3: Scaling & transport selection criteria

### Dependencies
- Depends on WP11

---

## Work Package WP13: Interlude 2 — MCP Reflections (Priority: P1)

**Goal**: Reflective essay synthesizing Modules 2-3. No SRS cards.
**Prompt**: `/tasks/planned/WP13-interlude-2.md`
**Requirements Refs**: FR-001

### Included Subtasks
- [ ] T049 Write reflective essay

### Dependencies
- Depends on WP12

---

## Work Package WP14: L8 Skill Anatomy (Priority: P1)

**Goal**: Lesson on skill structure, SKILL.md, description writing, directories.
**Prompt**: `/tasks/planned/WP14-lesson-08.md`
**Requirements Refs**: FR-001, FR-002

### Included Subtasks
- [ ] T050 Section 1: Skills vs CLAUDE.md vs hooks vs subagents
- [ ] T051 Section 2: SKILL.md frontmatter & description writing
- [ ] T052 Section 3: Directory organization

### Dependencies
- Depends on WP05

---

## Work Package WP15: L9 Distribution & Troubleshooting (Priority: P1)

**Goal**: Lesson on allowed-tools, sharing, enterprise settings, debugging.
**Prompt**: `/tasks/planned/WP15-lesson-09.md`
**Requirements Refs**: FR-001, FR-002

### Included Subtasks
- [ ] T053 Section 1: allowed-tools & scripts without context
- [ ] T054 Section 2: Team sharing & enterprise managed settings
- [ ] T055 Section 3: Wiring into subagents & debugging

### Dependencies
- Depends on WP14

---

## Work Package WP16: L10 Subagent Mechanics (Priority: P1)

**Goal**: Lesson on context windows, I/O flow, /agents, custom subagents.
**Prompt**: `/tasks/planned/WP16-lesson-10.md`
**Requirements Refs**: FR-001, FR-002

### Included Subtasks
- [ ] T056 Section 1: Separate context windows & input/output flow
- [ ] T057 Section 2: /agents command
- [ ] T058 Section 3: Creating custom subagents

### Dependencies
- Depends on WP05

---

## Work Package WP17: L11 Effective Subagent Design (Priority: P1)

**Goal**: Lesson on structured output, obstacle reporting, tool limits.
**Prompt**: `/tasks/planned/WP17-lesson-11.md`
**Requirements Refs**: FR-001, FR-002

### Included Subtasks
- [ ] T059 Section 1: Structured output patterns
- [ ] T060 Section 2: Obstacle reporting & tool limits
- [ ] T061 Section 3: When to use vs avoid subagents

### Dependencies
- Depends on WP16

---

## Work Package WP18: Interlude 3 — Agents & Skills Reflections (Priority: P1)

**Goal**: Reflective essay synthesizing Modules 4-5. No SRS cards.
**Prompt**: `/tasks/planned/WP18-interlude-3.md`
**Requirements Refs**: FR-001

### Included Subtasks
- [ ] T062 Write reflective essay

### Dependencies
- Depends on WP17

---

## Work Package WP19: L12 GitHub Copilot Core Modes (Priority: P1)

**Goal**: Lesson on agent/edit/ask modes, sessions, inline features.
**Prompt**: `/tasks/planned/WP19-lesson-12.md`
**Requirements Refs**: FR-001, FR-002, FR-004

### Included Subtasks
- [ ] T063 Section 1: Agent mode, edit mode, ask mode
- [ ] T064 Section 2: Agent sessions
- [ ] T065 Section 3: Inline chat (Cmd+I) & inline suggestions

### Dependencies
- Depends on WP05

---

## Work Package WP20: L13 GitHub Copilot Customization (Priority: P1)

**Goal**: Lesson on custom instructions, agents, MCP in Copilot, hooks.
**Prompt**: `/tasks/planned/WP20-lesson-13.md`
**Requirements Refs**: FR-001, FR-002, FR-004

### Included Subtasks
- [ ] T066 Section 1: Custom instructions
- [ ] T067 Section 2: Custom agents & MCP servers in Copilot
- [ ] T068 Section 3: Hooks & Claude Code integration with VS Code

### Dependencies
- Depends on WP19

---

## Work Package WP21: L14 Advanced Copilot Features (Priority: P1)

**Goal**: Lesson on background agents, cloud agents, browser testing.
**Prompt**: `/tasks/planned/WP21-lesson-14.md`
**Requirements Refs**: FR-001, FR-002, FR-004

### Included Subtasks
- [ ] T069 Section 1: Background agents
- [ ] T070 Section 2: Cloud agents
- [ ] T071 Section 3: Browser agent testing

### Dependencies
- Depends on WP20

---

## Work Package WP22: Review system & polish (Priority: P0)

**Goal**: Review page with due cards, progress bars, cleanup.
**Independent Test**: Review page shows due cards, progress bars match localStorage.
**Prompt**: `/tasks/planned/WP22-review-system.md`
**Requirements Refs**: FR-003, FR-005

### Included Subtasks
- [ ] T072 Create Review.jsx page + ReviewDeck.jsx component
- [ ] T073 Wire up ModuleOverview progress bars to SRS state
- [ ] T074 Delete all remaining Sanskrit-specific files

### Dependencies
- Depends on all lesson WPs (WP06-WP21)

---

## Work Package WP23: Deploy to GitHub Pages (Priority: P0)

**Goal**: Clean build and deployment.
**Independent Test**: All routes work on GitHub Pages, SRS persists.
**Prompt**: `/tasks/planned/WP23-deploy.md`
**Requirements Refs**: FR-001

### Included Subtasks
- [ ] T075 npm run build — verify clean
- [ ] T076 Deploy to GitHub Pages
- [ ] T077 Verify SPA routing via 404.html redirect

### Dependencies
- Depends on WP22

---

## Dependency & Execution Summary

- **Sequence**: WP01 → WP02 → WP03/WP04 → WP05 → Lessons (parallel by module) → WP22 → WP23
- **Parallelization**: WP06-07, WP09-10, WP11-12, WP14-15, WP16-17, WP19-20 can run in parallel across modules
- **MVP Scope**: WP01-WP05 (infrastructure + L1 PoC)

---

## Subtask Index (Reference)

| Subtask | Summary | WP | Priority | Done? |
|---------|---------|-----|----------|-------|
| T001-T005 | Project config | WP01 | P0 | ✅ |
| T006-T008 | Theme & infra | WP02 | P0 | ✅ |
| T009-T017 | 9 components | WP03 | P0 | ✅ |
| T018-T025 | Landing & nav | WP04 | P0 | ✅ |
| T026-T029 | L1 lesson | WP05 | P0 | ✅ |
| T030-T032 | L2 lesson | WP06 | P1 | ⬜ |
| T033-T036 | L3 + Interlude 1 | WP07-08 | P1 | ⬜ |
| T037-T042 | L4-L5 | WP09-10 | P1 | ⬜ |
| T043-T049 | L6-L7 + Interlude 2 | WP11-13 | P1 | ⬜ |
| T050-T055 | L8-L9 | WP14-15 | P1 | ⬜ |
| T056-T062 | L10-L11 + Interlude 3 | WP16-18 | P1 | ⬜ |
| T063-T071 | L12-L14 | WP19-21 | P1 | ⬜ |
| T072-T074 | Review system | WP22 | P0 | ⬜ |
| T075-T077 | Deploy | WP23 | P0 | ⬜ |
| T078 | Tighten landing page | WP24 | P0 | ✅ |
| T079 | Add course images | WP25 | P0 | ✅ |
| T081 | Home link in LessonNav | WP27 | P0 | ✅ |
| T082 | Compact landing page more | WP28 | P0 | ✅ |
| T083 | Review/quiz page | WP29 | P0 | ✅ |
| T084 | Worktree/subagent guide | WP30 | P1 | ⬜ |
| T085 | Deploy to GitHub Pages | WP31 | P0 | ✅ |
| T080 | Fix Hero gradient | WP26 | P1 | ✅ |
| T086 | NavSidebar on all pages | WP32 | P0 | ✅ |
| T087-T089 | Syntax highlighting (Prism.js) | WP33 | P0 | ✅ |
| T090-T093 | Course images overhaul (70+ HD) | WP34 | P0 | ✅ |
| T094-T099 | Fix mismatched images and alt text | WP37 | P0 | ✅ |
| T100-T103 | Collapsible MCQ practice sections | WP38 | P0 | ✅ |
| T104 | Tone down scroll animations | WP39 | P0 | ✅ |

---

## Work Package WP24: Tighten landing page scroll (Priority: P0) ✅ DONE

**Goal**: Reduce vertical space so users reach modules faster.
**Independent Test**: Module grid visible without excessive scrolling.
**Requirements Refs**: UX feedback

### Included Subtasks
- [x] T078 Cut or compact Hero, Problem, Insight, Method sections

### Dependencies
- None

---

## Work Package WP25: Add course images to lessons (Priority: P0) ✅ DONE

**Goal**: Extract usable images from detailed course markdown files and add to lessons.
**Independent Test**: Lessons display relevant course images.
**Requirements Refs**: Content quality

### Included Subtasks
- [x] T079 Extract and add HD (1920x1080) images from Chrome scrape to L1-L11

### Dependencies
- None

---

## Work Package WP27: Home link in LessonNav (Priority: P0) ✅ DONE

**Goal**: Add a way to navigate back to home from any lesson page.
**Independent Test**: Module title in LessonNav links to home.

### Included Subtasks
- [x] T081 Make module title a Link to home

---

## Work Package WP28: Compact landing page more (Priority: P0) ✅ DONE

**Goal**: Further reduce landing page scroll.
**Independent Test**: Less scrolling to reach modules.

### Included Subtasks
- [x] T082 Tighter sections, restore stat descriptions

---

## Work Package WP29: Review/quiz page (Priority: P0) ✅ DONE

**Goal**: SRS review page with due cards queue.
**Independent Test**: /review route shows due cards with progress counter.

### Included Subtasks
- [x] T083 Build Review.jsx with SRS filtering, wire route, add button to home

---

## Work Package WP30: Worktree/subagent usage guide (Priority: P1)

**Goal**: Help users use worktrees and subagents correctly.

### Included Subtasks
- [ ] T084 TBD — scope not yet defined by user

---

## Work Package WP31: Deploy to GitHub Pages (Priority: P0) ✅ DONE

**Goal**: Build and deploy to yadavvi91.github.io/claude-code-anki.
**Independent Test**: Site loads at the URL.

### Included Subtasks
- [x] T085 Make repo public, enable Pages, npm run deploy

---

## Work Package WP26: Fix Hero gradient (Priority: P1) ✅ DONE

**Goal**: Replace blue-purple hero gradient with a cleaner color treatment.
**Independent Test**: Landing page looks polished without the off-putting hue.
**Requirements Refs**: UX feedback

### Included Subtasks
- [x] T080 Update Hero.jsx gradient colors

### Dependencies
- None

---

## Work Package WP32: NavSidebar on all pages (Priority: P0) ✅ DONE

**Goal**: Add section-aware scroll-tracking sidebar to all lesson and interlude pages.

### Included Subtasks
- [x] T086 Add NavSidebar to 11 lessons + 3 interludes with IntersectionObserver tracking

---

## Work Package WP33: Syntax highlighting with Prism.js (Priority: P0) ✅ DONE

**Goal**: Add code syntax highlighting to CodeBlock and MCQCard components.

### Included Subtasks
- [x] T087 Install Prism.js, add auto-detection for Python/JSON/YAML/JSX/Bash
- [x] T088 Add Prism highlighting to MCQCard code blocks
- [x] T089 Create non-purple custom theme (orange/blue/yellow/amber)

---

## Work Package WP34: Course images overhaul (Priority: P0) ✅ DONE

**Goal**: Replace 320x180 thumbnails with 1920x1080 HD screenshots, add 70+ images across L1-L7.

### Included Subtasks
- [x] T090 Extract 260 HD images from Chrome-scraped course videos
- [x] T091 Fix 7 timestamp mismatches in L1-L3
- [x] T092 Restore 29 skills/subagents images for L8-L11
- [x] T093 Add 70+ course images across L1-L7 (8-15 per lesson)

---

## Work Package WP37: Fix mismatched images and alt text (Priority: P0) ✅ DONE

**Goal**: Audit every image in all 14 lessons against its alt text and surrounding prose context. Fix images that don't match their descriptions.
**Independent Test**: Every image alt text accurately describes what the image actually shows.

### Included Subtasks
- [x] T094 Audit all ~100 lesson images against alt text (visual inspection)
- [x] T095 Fix L1: swap Set 1 hero image to tools table, fix 8 alt texts
- [x] T096 Fix L2: correct 9 demo screenshot alt texts
- [x] T097 Fix L3: correct 6 terminal/code screenshot alt texts
- [x] T098 Fix L6: correct 10 title-slide alt texts (were claiming implementation details)
- [x] T099 Fix L7: correct 14 repetitive diagram alt texts

### Dependencies
- Depends on WP34 (images overhaul)

---

## Work Package WP38: Collapsible MCQ practice sections (Priority: P0) ✅ DONE

**Goal**: Wrap all MCQ practice questions in collapsible sections so readers can focus on prose content without scrolling through cards. One collapsible section per card set, not per individual card.
**Independent Test**: Each lesson shows "Practice questions (N)" collapse headers. Clicking expands to reveal cards, clicking again collapses them.

### Included Subtasks
- [x] T100 Create MCQSection.jsx wrapper component (collapsible header + body)
- [x] T101 Update Lesson01 — collect 19 scattered individual cards into 4 MCQSection groups
- [x] T102 Update Lessons 02-14 — wrap existing .map() card blocks in MCQSection
- [x] T103 Verify all 14 lessons render correctly with collapsible sections

### Dependencies
- Depends on WP02 (MCQCard component)

---

## Work Package WP39: Tone down scroll animations (Priority: P0) ✅ DONE

**Goal**: Reduce Reveal component animation from distracting slide-up + fade to subtle fade-in only. The original translateY(18px) + 0.55s animation was visually overwhelming when many elements animated simultaneously on scroll.
**Independent Test**: Scrolling through any lesson shows smooth, non-distracting content fade-in without vertical motion.

### Included Subtasks
- [x] T104 Remove translateY motion from Reveal component, reduce duration to 0.35s

### Dependencies
- Depends on WP03 (Reveal component)
