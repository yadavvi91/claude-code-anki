import { useState, useEffect } from 'react'
import { T } from '../theme'

// Now accepts sections via props (previously hardcoded)
const DEFAULT_SECTIONS = [
  { id: 'hero',     label: 'Introduction' },
  { id: 'problem',  label: 'The Problem' },
  { id: 'insight',  label: 'The Insight' },
  { id: 'method',   label: 'The Method' },
  { id: 'modules',  label: 'Modules', divider: true },
]

export default function NavSidebar({ sections = DEFAULT_SECTIONS }) {
  const [active, setActive] = useState(sections[0]?.id || '')
  const [show, setShow]     = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-20% 0px -65% 0px' }
    )
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    const onScroll = () => setShow(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [sections])

  const scrollTo = id =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <nav
      aria-label="Page sections"
      style={{ ...s.nav, opacity: show ? 1 : 0, pointerEvents: show ? 'auto' : 'none' }}
    >
      {sections.map(sec => {
        const isActive = active === sec.id
        return (
          <button
            key={sec.id}
            onClick={() => scrollTo(sec.id)}
            style={{
              ...s.btn,
              paddingTop:  sec.divider ? '0.8rem' : '0.22rem',
              paddingBottom: '0.22rem',
              marginTop:   sec.divider ? '0.4rem' : 0,
              borderTop:   sec.divider ? `1px solid ${T.color.border}` : 'none',
            }}
          >
            <span style={{
              ...s.dot,
              background: isActive ? T.color.accent : 'rgba(99,102,241,0.2)',
              transform:  isActive ? 'scale(1.5)' : 'scale(1)',
            }} />
            <span style={{
              ...s.lbl,
              paddingLeft: sec.indent ? '0.4rem' : 0,
              color:       isActive ? T.color.ink2 : T.color.ink4,
              fontWeight:  (sec.divider && isActive) ? 600 : 400,
            }}>
              {sec.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

const s = {
  nav: {
    position: 'fixed',
    right: '1.2rem',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 200,
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(248,249,252,0.94)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: `1px solid ${T.color.border}`,
    borderRadius: '12px',
    padding: '0.75rem 1rem 0.75rem 0.8rem',
    transition: 'opacity 0.6s ease',
    boxShadow: '0 2px 20px rgba(0,0,0,0.07)',
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.22rem 0',
    textAlign: 'left',
    width: '100%',
  },
  dot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    flexShrink: 0,
    transition: 'all 0.3s ease',
  },
  lbl: {
    fontFamily: T.font.label,
    fontSize: '0.55rem',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    transition: 'color 0.3s ease',
    whiteSpace: 'nowrap',
  },
}
