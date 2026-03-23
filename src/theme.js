// Single source of truth for all design tokens
export const T = {
  color: {
    bg:      '#f8f9fc',   // cool off-white
    bg2:     '#eef0f5',   // card background
    bg3:     '#e2e5ed',   // muted element bg
    ink:     '#1a1d2e',   // primary text
    ink2:    '#2d3148',   // headings
    ink3:    '#4a5068',   // body text
    ink4:    '#6b7280',   // muted text
    accent:  '#6366f1',   // indigo (primary)
    accent2: '#8b5cf6',   // violet (secondary)
    correct: '#059669',   // emerald
    wrong:   '#dc2626',   // red
    border:  'rgba(99,102,241,0.15)',
    codeBg:  '#1e2030',   // dark code blocks
    codeText:'#e2e5ed',
  },
  // Accent color per module
  setColor: {
    1: '#6366f1',  // indigo  — Claude Code
    2: '#8b5cf6',  // violet  — MCP Fundamentals
    3: '#ec4899',  // pink    — MCP Advanced
    4: '#f59e0b',  // amber   — Skills
    5: '#14b8a6',  // teal    — Subagents
    6: '#3b82f6',  // blue    — GitHub Copilot
  },
  font: {
    prose:   "'Inter', system-ui, sans-serif",
    heading: "'Space Grotesk', sans-serif",
    code:    "'JetBrains Mono', 'Fira Code', monospace",
    label:   "'Space Grotesk', sans-serif",
  },
}
