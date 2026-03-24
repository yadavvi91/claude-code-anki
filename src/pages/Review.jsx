import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { allCards, modules } from '../data/cardSets'
import MCQCard from '../components/MCQCard'
import { T } from '../theme'

const SRS_KEY = 'claude-copilot-srs'

function getDueCards() {
  const raw = localStorage.getItem(SRS_KEY)
  if (!raw) return allCards // First visit — all cards are due
  const srs = JSON.parse(raw)
  const now = Date.now()
  return allCards.filter(c => {
    const s = srs[c.id]
    if (!s) return true // New card
    if (!s.seen) return true
    if (!s.due) return true
    return s.due <= now
  })
}

function getModuleForCard(card) {
  return modules.find(m => m.id === card.moduleId)
}

export default function Review() {
  const [due, setDue] = useState([])
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    setDue(getDueCards())
  }, [])

  const current = due[idx]
  const mod = current ? getModuleForCard(current) : null
  const done = idx >= due.length

  return (
    <div style={s.page}>
      <nav style={s.nav}>
        <Link to="/" style={s.homeLink}>← Home</Link>
        <span style={s.title}>Review — SRS Quiz</span>
        <span style={s.counter}>{done ? 'Done!' : `${idx + 1} / ${due.length}`}</span>
      </nav>

      <main style={s.main}>
        {due.length === 0 ? (
          <div style={s.empty}>
            <h2 style={s.emptyH}>No cards due</h2>
            <p style={s.emptyP}>You're all caught up! Come back later when cards are scheduled for review.</p>
            <Link to="/" style={s.btn}>← Back to Home</Link>
          </div>
        ) : done ? (
          <div style={s.empty}>
            <h2 style={s.emptyH}>Session complete</h2>
            <p style={s.emptyP}>You reviewed {due.length} card{due.length !== 1 ? 's' : ''}. Great work!</p>
            <Link to="/" style={s.btn}>← Back to Home</Link>
          </div>
        ) : (
          <div>
            <div style={{ ...s.modLabel, color: mod?.color || T.color.accent }}>
              {mod?.title || 'Review'}
            </div>
            <MCQCard
              key={current.id}
              card={current}
              accentColor={mod?.color || T.color.accent}
              onAnswer={() => {
                setTimeout(() => setIdx(i => i + 1), 1200)
              }}
            />
          </div>
        )}
      </main>
    </div>
  )
}

const s = {
  page: { minHeight: '100vh', background: T.color.bg },
  nav: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0.75rem 2rem', borderBottom: `1px solid ${T.color.border}`,
    position: 'sticky', top: 0, zIndex: 10, background: T.color.bg,
  },
  homeLink: { fontFamily: T.font.prose, fontSize: '0.85rem', color: T.color.accent, textDecoration: 'none' },
  title: { fontFamily: T.font.label, fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: T.color.ink2 },
  counter: { fontFamily: T.font.code, fontSize: '0.8rem', color: T.color.ink4 },
  main: { maxWidth: '720px', margin: '0 auto', padding: '2rem 1.5rem 6rem' },
  modLabel: { fontFamily: T.font.label, fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' },
  empty: { textAlign: 'center', padding: '4rem 2rem' },
  emptyH: { fontFamily: T.font.heading, fontSize: '1.8rem', fontWeight: 600, color: T.color.ink2, marginBottom: '1rem' },
  emptyP: { fontFamily: T.font.prose, fontSize: '1rem', color: T.color.ink4, marginBottom: '2rem' },
  btn: { display: 'inline-block', padding: '0.75rem 2rem', border: `1px solid ${T.color.accent}`, borderRadius: '4px', fontFamily: T.font.label, fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', color: T.color.accent },
}
