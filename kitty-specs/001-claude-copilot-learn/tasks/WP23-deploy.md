---
work_package_id: "WP23"
subtasks:
  - "T075"
  - "T076"
  - "T077"
title: "Deploy to GitHub Pages"
phase: "Phase 6 - Integration & Deploy"
lane: "planned"
assignee: ""
agent: ""
shell_pid: ""
review_status: ""
reviewed_by: ""
history:
  - timestamp: "2026-03-24T03:30:00Z"
    lane: "planned"
    agent: "system"
    shell_pid: ""
    action: "Prompt generated"
---

# Work Package Prompt: WP23 – Deploy to GitHub Pages

## Objectives & Success Criteria
- Successfully build the production bundle with npm run build
- Deploy the built assets to GitHub Pages
- Verify SPA routing works correctly on GitHub Pages (hash routing or 404.html fallback)

## Subtasks & Detailed Guidance

### Subtask T075 – Run production build
- Execute npm run build and verify zero errors and zero warnings
- Check the output bundle size is reasonable (< 5 MB total)
- Confirm all card data JSON files are included in the build output

### Subtask T076 – Deploy to GitHub Pages
- Configure the GitHub Pages deployment (gh-pages branch or GitHub Actions workflow)
- Set the correct base path in vite.config.js (or equivalent) to match the repository name
- Push the built assets and confirm the deployment succeeds via GitHub's Pages settings

### Subtask T077 – Verify SPA routing on GitHub Pages
- Test that direct navigation to nested routes (e.g., /review, /module/1) works without 404 errors
- Implement a 404.html redirect hack or hash-based routing if needed for client-side routing support
- Test on multiple browsers (Chrome, Firefox, Safari) to confirm consistent behavior

## Activity Log
- 2026-03-24T03:30:00Z – system – lane=planned – Prompt created
