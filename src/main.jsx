import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import ScrollToTop from './components/ScrollToTop'
import Lesson01 from './pages/lessons/Lesson01'
import Lesson02 from './pages/lessons/Lesson02'
import Lesson03 from './pages/lessons/Lesson03'
import Lesson04 from './pages/lessons/Lesson04'
import Lesson05 from './pages/lessons/Lesson05'
import Lesson06 from './pages/lessons/Lesson06'
import Lesson07 from './pages/lessons/Lesson07'
import Lesson08 from './pages/lessons/Lesson08'
import Lesson09 from './pages/lessons/Lesson09'
import Lesson10 from './pages/lessons/Lesson10'
import Lesson11 from './pages/lessons/Lesson11'
import Lesson12 from './pages/lessons/Lesson12'
import Lesson13 from './pages/lessons/Lesson13'
import Lesson14 from './pages/lessons/Lesson14'
import Lesson15 from './pages/lessons/Lesson15'
import Lesson16 from './pages/lessons/Lesson16'
import Lesson17 from './pages/lessons/Lesson17'
import Lesson18 from './pages/lessons/Lesson18'
import Lesson19 from './pages/lessons/Lesson19'
import Interlude01 from './pages/interludes/Interlude01'
import Interlude02 from './pages/interludes/Interlude02'
import Interlude03 from './pages/interludes/Interlude03'
import Review from './pages/Review'
import Comparison from './pages/Comparison'

// Placeholder component for unbuilt lessons
function ComingSoon() {
  return (
    <div style={{ padding: '4rem 2rem', textAlign: 'center', fontFamily: "'Inter', sans-serif" }}>
      <h1 style={{ fontSize: '2rem', color: '#2d3148', marginBottom: '1rem' }}>Coming Soon</h1>
      <p style={{ color: '#6b7280' }}>This lesson is under development.</p>
      <a href="/" style={{ color: '#6366f1', marginTop: '1rem', display: 'inline-block' }}>← Back to Home</a>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/claude-code-anki/">
      <ScrollToTop />
      <Routes>
        {/* Home */}
        <Route path="/" element={<App />} />

        {/* Module 1: Claude Code Fundamentals */}
        <Route path="/claude-code/architecture" element={<Lesson01 />} />
        <Route path="/claude-code/planning" element={<Lesson02 />} />
        <Route path="/claude-code/mcp-github" element={<Lesson03 />} />
        <Route path="/claude-code/agent-loop" element={<Lesson15 />} />

        {/* Interlude 1 */}
        <Route path="/interlude/1" element={<Interlude01 />} />

        {/* Module 2: MCP Fundamentals */}
        <Route path="/mcp/architecture" element={<Lesson04 />} />
        <Route path="/mcp/resources-prompts" element={<Lesson05 />} />

        {/* Module 3: MCP Advanced */}
        <Route path="/mcp-advanced/sampling" element={<Lesson06 />} />
        <Route path="/mcp-advanced/transports" element={<Lesson07 />} />

        {/* Interlude 2 */}
        <Route path="/interlude/2" element={<Interlude02 />} />

        {/* Module 4: Agent Skills */}
        <Route path="/skills/anatomy" element={<Lesson08 />} />
        <Route path="/skills/distribution" element={<Lesson09 />} />

        {/* Module 5: Subagents */}
        <Route path="/subagents/mechanics" element={<Lesson10 />} />
        <Route path="/subagents/design" element={<Lesson11 />} />

        {/* Interlude 3 */}
        <Route path="/interlude/3" element={<Interlude03 />} />

        {/* Module 6: GitHub Copilot */}
        <Route path="/copilot/core-modes" element={<Lesson12 />} />
        <Route path="/copilot/customization" element={<Lesson13 />} />
        <Route path="/copilot/cloud-agents" element={<Lesson14 />} />
        <Route path="/copilot/coding-agent" element={<Lesson16 />} />

        {/* Module 7: AI Fluency */}
        <Route path="/ai-fluency/framework" element={<Lesson17 />} />
        <Route path="/ai-fluency/delegation-description" element={<Lesson18 />} />
        <Route path="/ai-fluency/discernment-diligence" element={<Lesson19 />} />

        {/* Reference */}
        <Route path="/comparison" element={<Comparison />} />

        {/* Review */}
        <Route path="/review" element={<Review />} />

        {/* Catch-all */}
        <Route path="*" element={<ComingSoon />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
