import { useState, useEffect } from 'react'
import { T } from '../theme'

const DEFAULT_SECTIONS = [
  { id: 'hero',     label: 'Introduction' },
  { id: 'problem',  label: 'The Problem' },
  { id: 'insight',  label: 'The Insight' },
  { id: 'method',   label: 'The Method' },
  { id: 'modules',  label: 'Modules', divider: true },
  { id: 'compare', label: 'Compare' },
]

export default function NavSidebar({ sections = DEFAULT_SECTIONS }) {
  const [active, setActive] = useState(sections[0]?.id || '')
  const [show, setShow]     = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [mobileOpen, setMobileOpen] = useState(false)

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
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [sections])

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMobileOpen(false)
  }

  const activeLabel = sections.find(s => s.id === active)?.label || 'Sections'

  // Mobile: floating bottom pill
  if (isMobile) {
    if (!show) return null
    return (
      <>
        {/* Backdrop when menu is open */}
        {mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            style={m.backdrop}
          />
        )}

        {/* Expanded section list */}
        {mobileOpen && (
          <nav aria-label="Page sections" style={m.menu}>
            {sections.map(sec => {
              const isActive = active === sec.id
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollTo(sec.id)}
                  style={{
                    ...m.menuBtn,
                    background: isActive ? T.color.accent : 'transparent',
                    color: isActive ? '#fff' : T.color.ink2,
                    marginTop: sec.divider ? '0.5rem' : 0,
                    borderTop: sec.divider ? `1px solid ${T.color.border}` : 'none',
                    paddingTop: sec.divider ? '0.65rem' : '0.45rem',
                  }}
                >
                  {sec.label}
                </button>
              )
            })}
          </nav>
        )}

        {/* Floating pill button */}
        <button
          onClick={() => setMobileOpen(o => !o)}
          style={m.pill}
          aria-label="Jump to section"
        >
          <span style={m.pillDot} />
          <span style={m.pillLabel}>{activeLabel}</span>
          <span style={{ ...m.pillArrow, transform: mobileOpen ? 'rotate(180deg)' : 'rotate(0)' }}>▲</span>
        </button>
      </>
    )
  }

  // Desktop: fixed right sidebar
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

// Desktop styles
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

// Mobile styles
const m = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    zIndex: 198,
    background: 'rgba(0,0,0,0.2)',
  },
  menu: {
    position: 'fixed',
    bottom: '4rem',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 199,
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(248,249,252,0.97)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: `1px solid ${T.color.border}`,
    borderRadius: '14px',
    padding: '0.5rem',
    boxShadow: '0 4px 30px rgba(0,0,0,0.12)',
    minWidth: '200px',
    maxHeight: '60vh',
    overflowY: 'auto',
  },
  menuBtn: {
    border: 'none',
    cursor: 'pointer',
    padding: '0.45rem 0.9rem',
    borderRadius: '8px',
    fontFamily: T.font.label,
    fontSize: '0.7rem',
    fontWeight: 500,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    textAlign: 'left',
    transition: 'background 0.2s, color 0.2s',
  },
  pill: {
    position: 'fixed',
    bottom: '1rem',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 200,
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    background: 'rgba(248,249,252,0.95)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: `1px solid ${T.color.border}`,
    borderRadius: '999px',
    padding: '0.5rem 1rem',
    boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
    cursor: 'pointer',
  },
  pillDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: T.color.accent,
    flexShrink: 0,
  },
  pillLabel: {
    fontFamily: T.font.label,
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: T.color.ink2,
  },
  pillArrow: {
    fontSize: '0.5rem',
    color: T.color.ink4,
    transition: 'transform 0.2s ease',
  },
}
