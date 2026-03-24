import { useState } from 'react'
import { T } from '../theme'

/**
 * Collapsible section that wraps a group of MCQ cards.
 * Keeps the reading flow clean — readers can skip practice cards
 * and come back to them later.
 */
export default function MCQSection({ children, color = T.color.accent, count }) {
  const [open, setOpen] = useState(false)

  const cardCount = count || (Array.isArray(children) ? children.length : 1)

  return (
    <div style={{ ...styles.wrapper, borderColor: `${color}30` }}>
      <button
        onClick={() => setOpen(prev => !prev)}
        style={{ ...styles.header, color }}
      >
        <span style={styles.icon}>{open ? '▾' : '▸'}</span>
        <span style={styles.label}>
          Practice questions ({cardCount})
        </span>
        <span style={{ ...styles.hint, color: T.color.ink4 }}>
          {open ? 'click to collapse' : 'click to expand'}
        </span>
      </button>

      {open && (
        <div style={styles.body}>
          {children}
        </div>
      )}
    </div>
  )
}

const styles = {
  wrapper: {
    border: '1px solid',
    borderRadius: '8px',
    margin: '2rem 0',
    overflow: 'hidden',
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    width: '100%',
    padding: '0.85rem 1.25rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
  },

  icon: {
    fontSize: '0.9rem',
    flexShrink: 0,
    width: '1rem',
  },

  label: {
    fontFamily: T.font.label,
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    flex: 1,
  },

  hint: {
    fontFamily: T.font.prose,
    fontSize: '0.75rem',
    fontStyle: 'italic',
    flexShrink: 0,
  },

  body: {
    padding: '0 0.5rem 0.5rem',
  },
}
