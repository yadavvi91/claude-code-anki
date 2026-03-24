import { Link } from 'react-router-dom'
import { modules, allCards } from '../data/cardSets'
import { T } from '../theme'

// Home page grid of modules with progress bars from SRS state
export default function ModuleOverview() {
  // Read SRS state from localStorage
  let srs = {}
  try { srs = JSON.parse(localStorage.getItem('claude-copilot-srs') || '{}') } catch {}

  const totalCards = allCards.length
  const totalSeen = allCards.filter(c => srs[c.id]?.seen).length

  return (
    <div>
      <div style={styles.grid}>
      {modules.map((m, i) => {
        const moduleCards = allCards.filter(c => c.moduleId === m.id)
        const seen = moduleCards.filter(c => srs[c.id]?.seen).length
        const total = moduleCards.length
        const pct = total > 0 ? Math.round((seen / total) * 100) : 0
        const firstLesson = m.lessons[0]

        return (
          <div key={m.id} style={{ ...styles.card, borderTopColor: m.color }}>
            <span style={{ ...styles.moduleNum, color: m.color }}>Module {i + 1}</span>
            <h3 style={styles.title}>{m.title}</h3>
            <div style={styles.lessons}>
              {m.lessons.map(l => (
                <Link key={l.id} to={`/${l.slug}`} style={{ ...styles.lessonLink, color: l.cardSets.length > 0 ? T.color.ink3 : T.color.ink4 }}>
                  {l.title}
                  {l.cardSets.length === 0 && <span style={styles.soon}> (soon)</span>}
                </Link>
              ))}
            </div>

            {/* Progress bar */}
            {total > 0 && (
              <div style={styles.progressWrap}>
                <div style={styles.progressBg}>
                  <div style={{ ...styles.progressFill, width: `${pct}%`, background: m.color }} />
                </div>
                <span style={styles.progressText}>{seen}/{total} cards seen</span>
              </div>
            )}

            {total === 0 && (
              <div style={styles.progressText}>Coming soon</div>
            )}
          </div>
        )
      })}
    </div>
    <div style={styles.reviewWrap}>
      <Link to="/review" style={styles.reviewBtn}>
        Start Review — {totalSeen} / {totalCards} cards seen
      </Link>
    </div>
    </div>
  )
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.25rem',
    maxWidth: '960px',
    margin: '0 auto',
    padding: '2rem',
  },

  card: {
    background: T.color.bg2,
    borderRadius: '8px',
    borderTop: '3px solid',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
  },

  moduleNum: {
    fontFamily: T.font.label,
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },

  title: {
    fontFamily: T.font.heading,
    fontSize: '1.15rem',
    fontWeight: 600,
    color: T.color.ink2,
    margin: '0.4rem 0 0.75rem',
  },

  lessons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
    marginBottom: '1rem',
    flex: 1,
  },

  lessonLink: {
    fontFamily: T.font.prose,
    fontSize: '0.88rem',
    textDecoration: 'none',
    lineHeight: 1.5,
    transition: 'color 0.2s',
  },

  soon: {
    fontSize: '0.75rem',
    color: T.color.ink4,
    fontStyle: 'italic',
  },

  progressWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },

  progressBg: {
    flex: 1,
    height: '4px',
    background: T.color.bg3,
    borderRadius: '2px',
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: '2px',
    transition: 'width 0.3s ease',
  },

  progressText: {
    fontFamily: T.font.code,
    fontSize: '0.7rem',
    color: T.color.ink4,
    whiteSpace: 'nowrap',
  },

  reviewWrap: {
    textAlign: 'center',
    padding: '1.5rem 2rem 2rem',
  },

  reviewBtn: {
    display: 'inline-block',
    padding: '0.85rem 2.5rem',
    background: T.color.accent,
    color: '#fff',
    borderRadius: '6px',
    fontFamily: T.font.label,
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    textDecoration: 'none',
  },
}
