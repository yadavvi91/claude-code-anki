# Feature Specification: Claude Code & GitHub Copilot Anki-Style Learning Platform

## Overview
A spaced repetition learning platform modeled after Quantum Country — prose interleaved with MCQ cards using SM-2 SRS — to help retain knowledge from 5 Anthropic SkillJar courses and GitHub Copilot.

## User Stories
1. As a developer, I want to read lesson prose that teaches Claude Code concepts so I can understand how tools, planning, and MCP work.
2. As a learner, I want MCQ cards embedded in the prose so I can test myself as I read.
3. As a learner, I want SRS-scheduled review sessions so I can retain knowledge long-term.
4. As a developer, I want GitHub Copilot lessons so I can learn the VS Code integration.
5. As a user, I want a module overview with progress bars so I can track my learning.

## Scope
- 6 modules, 14 lessons, 3 interludes, ~280+ MCQ cards
- React+Vite SPA deployed to GitHub Pages
- localStorage-based SM-2 SRS engine (no backend)

## Source Material
- Anthropic SkillJar: Claude Code in Action, MCP Intro, MCP Advanced, Agent Skills, Subagents
- VS Code docs for GitHub Copilot
- Reference UI: https://bvsiitm.github.io/sanskrit-gita-learn/
