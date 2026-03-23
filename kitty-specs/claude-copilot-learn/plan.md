# Technical Plan: Claude Code & GitHub Copilot Learning Platform

## Architecture
- React 18 + Vite SPA (forked from sanskrit-gita-learn)
- React Router for 14 lesson routes + 3 interludes + home + review
- localStorage SM-2 SRS engine (preserved from original)
- GitHub Pages deployment

## Key Technical Decisions
1. Keep SM-2 SRS algorithm from original codebase (proven, well-tested)
2. Light developer theme (Inter, Space Grotesk, JetBrains Mono)
3. No external syntax highlighting lib — lightweight regex tokenizer for CodeBlock
4. Unified data schema in src/data/cardSets.js with module > lesson > cardSet > card hierarchy
5. spec-kitty for work package management + GitHub Project board for remote tracking

## Component Strategy
- Reuse: Reveal.jsx, ScrollToTop.jsx, MCQCard.jsx (modified)
- Replace Sanskrit-specific with developer equivalents (ShlokaDisplay → ConceptDisplay, etc.)
- New: CodeBlock, TerminalAnimation, ComparisonTable, TipCallout, FileTree, etc.

## Phases
0A. spec-kitty init → 0B. GitHub issues → 0C. SkillJar scraping (pause)
1. Project config → 2. Theme → 3. Components → 4. Landing → 5. L1 PoC
6. Lessons 2-14 + interludes (parallel) → 7. Review system → 8. Deploy
