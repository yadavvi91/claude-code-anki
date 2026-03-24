import { useState, useMemo } from 'react'
import { T } from '../theme'

// Shuffle array using Fisher-Yates (seeded by card id for stability)
function shuffleOptions(options, cardId) {
  const arr = options.map((opt, i) => ({ ...opt, _origIdx: i }))
  // Simple seed from card id
  let seed = 0
  for (let i = 0; i < (cardId || '').length; i++) seed = ((seed << 5) - seed + cardId.charCodeAt(i)) | 0
  function rand() { seed = (seed * 16807 + 0) % 2147483647; return (seed & 0x7fffffff) / 2147483647 }
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// States: 'unanswered' | 'answered'
export default function MCQCard({ card, color = T.color.accent }) {
  const [selected, setSelected] = useState(null) // index in shuffled array
  const [rating, setRating]     = useState(null) // 'got' | 'unsure' | 'missed'

  // Shuffle options once per card (deterministic by card id)
  const shuffled = useMemo(() => shuffleOptions(card.options, card.id), [card.id, card.options])

  const answered = selected !== null
  const chosenOption = answered ? shuffled[selected] : null

  // Left border color
  let borderColor = color
  if (answered) {
    borderColor = chosenOption.correct ? T.color.correct : T.color.wrong
  }

  function handleSelect(idx) {
    if (answered) return
    setSelected(idx)
  }

  function handleRating(r) {
    setRating(r)
    if (!card.id) return

    // Load existing SRS state
    let srs = {}
    try { srs = JSON.parse(localStorage.getItem('claude-copilot-srs') || '{}') } catch {}

    const prev = srs[card.id] || { interval: 0, easeFactor: 2.5, due: null, seen: false, correct: 0, incorrect: 0 }

    let { interval, easeFactor, correct, incorrect } = prev

    if (r === 'got') {
      correct += 1
      easeFactor = Math.min(3.0, easeFactor + 0.1)
      interval = interval < 1 ? 1 : Math.round(interval * easeFactor)
    } else if (r === 'unsure') {
      interval = Math.max(1, Math.round(interval * 0.8))
    } else { // missed
      incorrect += 1
      easeFactor = Math.max(1.3, easeFactor - 0.2)
      interval = 1
    }

    const due = new Date(Date.now() + interval * 86400000).toISOString()
    srs[card.id] = { interval, easeFactor, due, seen: true, correct, incorrect }
    localStorage.setItem('claude-copilot-srs', JSON.stringify(srs))
  }

  // Detect code blocks (backtick-wrapped text)
  function renderText(text) {
    if (!text) return text
    const parts = text.split(/(`[^`]+`)/)
    return parts.map((part, i) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} style={styles.inlineCode}>
            {part.slice(1, -1)}
          </code>
        )
      }
      return part
    })
  }

  return (
    <div style={{
      ...styles.card,
      borderLeftColor: borderColor,
      background: `${color}12`,
    }}>
      {/* Question */}
      <p style={styles.question}>{renderText(card.question)}</p>

      {/* Code block if present */}
      {card.codeBlock && (
        <pre style={styles.codeBlock}>
          <code>{card.codeBlock}</code>
        </pre>
      )}

      {/* Options */}
      <div style={styles.optionList}>
        {shuffled.map((opt, idx) => {
          const isSelected = selected === idx
          const showResult = answered && isSelected

          let optBg   = T.color.bg2
          let optBorder = T.color.border
          let optColor  = T.color.ink3

          if (showResult) {
            if (opt.correct) {
              optBg     = 'rgba(5,150,105,0.10)'
              optBorder = T.color.correct
              optColor  = '#065f46'
            } else {
              optBg     = 'rgba(220,38,38,0.08)'
              optBorder = T.color.wrong
              optColor  = '#991b1b'
            }
          } else if (answered && opt.correct) {
            optBg     = 'rgba(5,150,105,0.06)'
            optBorder = 'rgba(5,150,105,0.4)'
          }

          return (
            <div key={idx}>
              <button
                onClick={() => handleSelect(idx)}
                disabled={answered}
                style={{
                  ...styles.option,
                  backgroundColor: optBg,
                  borderColor: optBorder,
                  color: optColor,
                  cursor: answered ? 'default' : 'pointer',
                }}
              >
                <span style={styles.optionLabel}>
                  {String.fromCharCode(65 + idx)}.
                </span>
                <span style={{ fontFamily: T.font.prose, fontSize: '0.95rem' }}>
                  {renderText(opt.label)}
                </span>
              </button>

              {/* Feedback appears below the selected option */}
              {isSelected && answered && (
                <div style={{
                  ...styles.feedback,
                  borderLeftColor: opt.correct ? T.color.correct : T.color.wrong,
                  color: opt.correct ? '#065f46' : '#991b1b',
                }}>
                  {renderText(opt.feedback)}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Self-rating buttons — appear after answering */}
      {answered && rating === null && (
        <div style={styles.ratingRow}>
          <span style={styles.ratingLabel}>How did you do?</span>
          <div style={styles.ratingButtons}>
            <button
              style={{ ...styles.ratingBtn, ...styles.ratingGot }}
              onClick={() => handleRating('got')}
            >
              Got it
            </button>
            <button
              style={{ ...styles.ratingBtn, ...styles.ratingUnsure }}
              onClick={() => handleRating('unsure')}
            >
              Unsure
            </button>
            <button
              style={{ ...styles.ratingBtn, ...styles.ratingMissed }}
              onClick={() => handleRating('missed')}
            >
              Missed
            </button>
          </div>
        </div>
      )}

      {/* Confirmation after rating */}
      {rating !== null && (
        <div style={styles.ratedConfirm}>
          {rating === 'got'    && '✓ Marked as known — see you in a few days.'}
          {rating === 'unsure' && '↺ Coming back soon.'}
          {rating === 'missed' && '↺ Back tomorrow.'}
        </div>
      )}
    </div>
  )
}

const styles = {
  card: {
    background: T.color.bg2,
    border: `1px solid ${T.color.border}`,
    borderLeft: '4px solid',          // color set inline
    borderRadius: '0 6px 6px 0',
    padding: '1.5rem 1.75rem',
    margin: '2rem 0',
    transition: 'border-left-color 0.35s ease',
  },

  question: {
    fontFamily: T.font.prose,
    fontSize: '1rem',
    fontWeight: 500,
    color: T.color.ink2,
    lineHeight: 1.65,
    marginBottom: '1.1rem',
  },

  codeBlock: {
    fontFamily: T.font.code,
    fontSize: '0.85rem',
    lineHeight: 1.6,
    background: T.color.codeBg,
    color: T.color.codeText,
    padding: '1rem 1.25rem',
    borderRadius: '6px',
    marginBottom: '1.1rem',
    overflowX: 'auto',
    whiteSpace: 'pre',
  },

  inlineCode: {
    fontFamily: T.font.code,
    fontSize: '0.85em',
    background: 'rgba(99,102,241,0.08)',
    padding: '0.15em 0.4em',
    borderRadius: '3px',
    color: T.color.accent,
  },

  optionList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },

  option: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '0.65rem',
    padding: '0.6rem 0.85rem',
    border: '1px solid',
    borderRadius: '4px',
    background: 'transparent',
    textAlign: 'left',
    fontFamily: T.font.prose,
    fontSize: '0.95rem',
    lineHeight: 1.5,
    transition: 'background-color 0.25s, border-color 0.25s, color 0.25s',
  },

  optionLabel: {
    fontFamily: T.font.label,
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.05em',
    color: T.color.ink4,
    flexShrink: 0,
    minWidth: '1.1rem',
  },

  feedback: {
    marginTop: '0.35rem',
    marginLeft: '1.75rem',
    padding: '0.6rem 0.8rem',
    borderLeft: '3px solid',
    borderRadius: '0 4px 4px 0',
    background: 'rgba(0,0,0,0.02)',
    fontFamily: T.font.prose,
    fontSize: '0.88rem',
    lineHeight: 1.7,
    fontStyle: 'italic',
  },

  ratingRow: {
    marginTop: '1.1rem',
    paddingTop: '0.85rem',
    borderTop: `1px solid ${T.color.border}`,
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  },

  ratingLabel: {
    fontFamily: T.font.label,
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: T.color.ink4,
  },

  ratingButtons: {
    display: 'flex',
    gap: '0.5rem',
  },

  ratingBtn: {
    padding: '0.35rem 0.9rem',
    border: '1px solid',
    borderRadius: '3px',
    fontFamily: T.font.label,
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    cursor: 'pointer',
    transition: 'background 0.2s, color 0.2s',
  },

  ratingGot: {
    borderColor: T.color.correct,
    color: T.color.correct,
    background: 'rgba(5,150,105,0.06)',
  },

  ratingUnsure: {
    borderColor: T.color.accent,
    color: T.color.accent,
    background: 'rgba(99,102,241,0.06)',
  },

  ratingMissed: {
    borderColor: T.color.wrong,
    color: T.color.wrong,
    background: 'rgba(220,38,38,0.06)',
  },

  ratedConfirm: {
    marginTop: '0.7rem',
    fontFamily: T.font.prose,
    fontSize: '0.88rem',
    fontStyle: 'italic',
    color: T.color.ink4,
  },
}
