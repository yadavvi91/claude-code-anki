import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { allCards, modules } from '../data/cardSets'
import MCQCard from '../components/MCQCard'
import { T } from '../theme'

const SRS_KEY = 'claude-copilot-srs'

function getDueCards() {
  const raw = localStorage.getItem(SRS_KEY)
  if (!raw) return allCards
  const srs = JSON.parse(raw)
  const now = Date.now()
  return allCards.filter(c => {
    const s = srs[c.id]
    if (!s) return true
    if (!s.seen) return true
    if (!s.due) return true
    return s.due <= now
  })
}

function getModuleForCard(card) {
  return modules.find(m => m.id === card.moduleId)
}

function getLessonForCard(card) {
  for (const m of modules) {
    const l = m.lessons.find(l => l.id === card.lessonId)
    if (l) return l
  }
  return null
}

// SVG progress ring
function ProgressRing({ progress, size = 56, stroke = 4, color = T.color.accent }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - progress * circ
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={T.color.bg3} strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.6s ease' }} />
    </svg>
  )
}

export default function Review() {
  const [due, setDue] = useState([])
  const [idx, setIdx] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [answered, setAnswered] = useState(false)

  useEffect(() => { setDue(getDueCards()) }, [])

  const current = due[idx]
  const mod = current ? getModuleForCard(current) : null
  const lesson = current ? getLessonForCard(current) : null
  const done = due.length > 0 && idx >= due.length
  const progress = due.length > 0 ? idx / due.length : 0
  const accuracy = idx > 0 ? Math.round((correct / idx) * 100) : 0

  function handleAnswer(isCorrect) {
    if (isCorrect) setCorrect(c => c + 1)
    setAnswered(true)
    setTimeout(() => {
      setIdx(i => i + 1)
      setAnswered(false)
    }, 1500)
  }

  return (
    <div style={s.page}>
      {/* Nav bar */}
      <nav style={s.nav}>
        <Link to="/" style={s.homeLink}>
          <span style={s.homeLogo}>◆</span> Home
        </Link>
        <div style={s.navCenter}>
          <div style={s.ringWrap}>
            <ProgressRing progress={progress} size={40} stroke={3} color={mod?.color || T.color.accent} />
            <span style={s.ringText}>{done ? '✓' : idx}</span>
          </div>
        </div>
        <span style={s.counter}>
          {done ? 'Complete' : `${idx + 1} of ${due.length}`}
        </span>
      </nav>

      {/* Progress bar */}
      <div style={s.progressTrack}>
        <div style={{ ...s.progressFill, width: `${progress * 100}%`, background: mod?.color || T.color.accent }} />
      </div>

      <main style={s.main}>
        {due.length === 0 ? (
          /* All caught up */
          <div style={s.emptyState}>
            <div style={s.emptyIcon}>🎯</div>
            <h2 style={s.emptyH}>All caught up!</h2>
            <p style={s.emptyP}>No cards are due for review right now. The SM-2 algorithm will schedule them as needed.</p>
            <div style={s.emptyStats}>
              <div style={s.statItem}>
                <div style={s.statValue}>{allCards.length}</div>
                <div style={s.statLabel}>Total Cards</div>
              </div>
              <div style={s.statItem}>
                <div style={{ ...s.statValue, color: T.color.correct }}>0</div>
                <div style={s.statLabel}>Due Now</div>
              </div>
            </div>
            <Link to="/" style={s.primaryBtn}>← Back to Lessons</Link>
          </div>
        ) : done ? (
          /* Session complete */
          <div style={s.emptyState}>
            <div style={s.emptyIcon}>🏆</div>
            <h2 style={s.emptyH}>Session Complete</h2>
            <p style={s.emptyP}>You reviewed {due.length} card{due.length !== 1 ? 's' : ''} this session.</p>
            <div style={s.emptyStats}>
              <div style={s.statItem}>
                <div style={{ ...s.statValue, color: T.color.correct }}>{correct}</div>
                <div style={s.statLabel}>Correct</div>
              </div>
              <div style={s.statItem}>
                <div style={{ ...s.statValue, color: T.color.wrong }}>{due.length - correct}</div>
                <div style={s.statLabel}>Missed</div>
              </div>
              <div style={s.statItem}>
                <div style={s.statValue}>{accuracy}%</div>
                <div style={s.statLabel}>Accuracy</div>
              </div>
            </div>
            <div style={s.btnRow}>
              <Link to="/" style={s.secondaryBtn}>← Home</Link>
              <button onClick={() => { setDue(getDueCards()); setIdx(0); setCorrect(0) }} style={s.primaryBtn}>
                Review Again
              </button>
            </div>
          </div>
        ) : (
          /* Active card */
          <div style={{ opacity: answered ? 0.6 : 1, transition: 'opacity 0.3s ease' }}>
            <div style={s.cardMeta}>
              <span style={{ ...s.modBadge, background: `${mod?.color || T.color.accent}18`, color: mod?.color || T.color.accent }}>
                {mod?.title || 'Review'}
              </span>
              {lesson && <span style={s.lessonLabel}>{lesson.title}</span>}
            </div>
            <MCQCard
              key={current.id}
              card={current}
              color={mod?.color || T.color.accent}
              onAnswer={handleAnswer}
            />
          </div>
        )}
      </main>
    </div>
  )
}

const s = {
  page: { minHeight: '100vh', background: T.color.bg },

  // Nav
  nav: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0.6rem 1.5rem', background: T.color.bg,
    position: 'sticky', top: 0, zIndex: 10,
  },
  homeLink: {
    fontFamily: T.font.prose, fontSize: '0.85rem', color: T.color.ink3,
    textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem',
    transition: 'color 0.2s',
  },
  homeLogo: { color: T.color.accent, fontSize: '0.7rem' },
  navCenter: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  ringWrap: { position: 'relative', width: '40px', height: '40px' },
  ringText: {
    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    fontFamily: T.font.code, fontSize: '0.7rem', fontWeight: 600, color: T.color.ink2,
  },
  counter: {
    fontFamily: T.font.code, fontSize: '0.75rem', color: T.color.ink4,
    minWidth: '70px', textAlign: 'right',
  },

  // Progress bar
  progressTrack: {
    height: '2px', background: T.color.bg3, width: '100%',
  },
  progressFill: {
    height: '100%', borderRadius: '0 2px 2px 0',
    transition: 'width 0.6s ease',
  },

  // Main
  main: { maxWidth: '680px', margin: '0 auto', padding: '2rem 1.5rem 6rem' },

  // Card meta
  cardMeta: {
    display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem',
    flexWrap: 'wrap',
  },
  modBadge: {
    fontFamily: T.font.label, fontSize: '0.6rem', fontWeight: 600,
    letterSpacing: '0.12em', textTransform: 'uppercase',
    padding: '0.3rem 0.75rem', borderRadius: '20px',
  },
  lessonLabel: {
    fontFamily: T.font.prose, fontSize: '0.8rem', color: T.color.ink4,
  },

  // Empty / completion states
  emptyState: {
    textAlign: 'center', padding: '3rem 1.5rem',
  },
  emptyIcon: { fontSize: '3rem', marginBottom: '1rem' },
  emptyH: {
    fontFamily: T.font.heading, fontSize: '1.8rem', fontWeight: 700,
    color: T.color.ink, marginBottom: '0.75rem', lineHeight: 1.2,
  },
  emptyP: {
    fontFamily: T.font.prose, fontSize: '1rem', color: T.color.ink4,
    lineHeight: 1.6, marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem',
  },
  emptyStats: {
    display: 'flex', justifyContent: 'center', gap: '2.5rem', marginBottom: '2.5rem',
  },
  statItem: { textAlign: 'center' },
  statValue: {
    fontFamily: T.font.heading, fontSize: '2rem', fontWeight: 700, color: T.color.ink2,
    lineHeight: 1,
  },
  statLabel: {
    fontFamily: T.font.label, fontSize: '0.55rem', fontWeight: 600,
    letterSpacing: '0.15em', textTransform: 'uppercase', color: T.color.ink4,
    marginTop: '0.3rem',
  },

  // Buttons
  btnRow: { display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' },
  primaryBtn: {
    display: 'inline-block', padding: '0.75rem 2rem',
    background: T.color.accent, color: '#fff', border: 'none',
    borderRadius: '6px', fontFamily: T.font.label, fontSize: '0.7rem',
    fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
    textDecoration: 'none', cursor: 'pointer',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  },
  secondaryBtn: {
    display: 'inline-block', padding: '0.75rem 2rem',
    border: `1px solid ${T.color.border}`, color: T.color.ink3,
    borderRadius: '6px', fontFamily: T.font.label, fontSize: '0.7rem',
    fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
    textDecoration: 'none', background: 'none', cursor: 'pointer',
  },
}
