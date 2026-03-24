import { useEffect, useState } from 'react'
import { T } from '../theme'

export default function Hero() {
  const [typed, setTyped] = useState('')
  const fullText = '> claude "Help me learn AI tools"'

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTyped(fullText.slice(0, i))
        i++
      } else {
        clearInterval(timer)
      }
    }, 45)
    return () => clearInterval(timer)
  }, [])

  return (
    <section style={s.hero}>
      {/* Terminal typing animation */}
      <div className="anim-fadeUp-1" style={s.terminal}>
        <div style={s.termBar}>
          <span style={s.dot} />
          <span style={s.dot} />
          <span style={s.dot} />
        </div>
        <div style={s.termBody}>
          <code style={s.termCode}>{typed}<span style={s.cursor}>▊</span></code>
        </div>
      </div>

      {/* Title */}
      <h1 className="anim-fadeUp-2" style={s.title}>
        Claude Copilot Learn
      </h1>

      {/* Tagline */}
      <div className="anim-fadeUp-3" style={s.tagline}>
        Spaced repetition for Claude Code &amp; GitHub Copilot
      </div>

      {/* Sub-tagline */}
      <div className="anim-fadeUp-4" style={s.sub}>
        Master AI development tools through prose, practice, and review
      </div>

      {/* Scroll hint */}
      <div className="anim-fadeIn-slow" style={s.scrollHint}>
        <span style={s.scrollLabel}>Scroll</span>
        <div className="anim-pulse" style={s.scrollArrow} />
      </div>
    </section>
  )
}

const s = {
  hero: {
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '4rem 2rem',
    position: 'relative',
    background: `linear-gradient(135deg, #111318 0%, #15171e 50%, #0f1117 100%)`,
    overflow: 'hidden',
  },
  terminal: {
    width: 'min(420px, 90vw)',
    borderRadius: '10px',
    overflow: 'hidden',
    marginBottom: '2.5rem',
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 0 40px rgba(0,0,0,0.3)',
  },
  termBar: {
    display: 'flex',
    gap: '6px',
    padding: '8px 12px',
    background: 'rgba(255,255,255,0.05)',
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.12)',
  },
  termBody: {
    padding: '1rem 1.25rem',
    background: 'rgba(0,0,0,0.3)',
    minHeight: '48px',
  },
  termCode: {
    fontFamily: T.font.code,
    fontSize: '0.9rem',
    color: T.color.codeText,
  },
  cursor: {
    color: T.color.accent,
    animation: 'pulse 1s ease-in-out infinite',
  },
  title: {
    fontFamily: T.font.heading,
    fontSize: 'clamp(2.2rem, 6vw, 3.5rem)',
    fontWeight: 700,
    color: '#fff',
    letterSpacing: '-0.02em',
    marginBottom: '1rem',
    textShadow: '0 0 40px rgba(255,255,255,0.06)',
  },
  tagline: {
    fontFamily: T.font.label,
    fontSize: 'clamp(0.6rem, 1.5vw, 0.72rem)',
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    marginBottom: '1.2rem',
  },
  sub: {
    fontFamily: T.font.prose,
    fontSize: 'clamp(1rem, 2vw, 1.15rem)',
    color: 'rgba(255,255,255,0.35)',
    fontStyle: 'italic',
    maxWidth: '520px',
  },
  scrollHint: {
    position: 'absolute',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.4rem',
  },
  scrollLabel: {
    fontFamily: T.font.label,
    fontSize: '0.55rem',
    letterSpacing: '0.3em',
    color: 'rgba(255,255,255,0.2)',
    textTransform: 'uppercase',
  },
  scrollArrow: {
    width: '1px',
    height: '30px',
    background: 'linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)',
  },
}
