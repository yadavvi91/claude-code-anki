import { T } from '../theme'

// Annotated code snippet with each part labeled
// Replaces VerseDisplay — shows code with annotations instead of Sanskrit verse breakdown
// parts: [{ code: string, label: string, color?: string }]
export default function SnippetBreakdown({ title, parts }) {
  return (
    <div style={styles.wrapper}>
      {title && <div style={styles.title}>{title}</div>}
      <div style={styles.parts}>
        {parts.map((part, i) => (
          <div key={i} style={styles.part}>
            <code style={{ ...styles.code, color: part.color || T.color.codeText }}>
              {part.code}
            </code>
            <span style={styles.label}>{part.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    margin: '1.5rem 0',
    borderRadius: '8px',
    overflow: 'hidden',
    background: T.color.codeBg,
    border: `1px solid ${T.color.border}`,
  },

  title: {
    fontFamily: T.font.code,
    fontSize: '0.75rem',
    color: 'rgba(255,255,255,0.5)',
    padding: '0.5rem 1rem',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },

  parts: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    padding: '1.25rem 1.5rem',
  },

  part: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '1.25rem',
    flexWrap: 'wrap',
  },

  code: {
    fontFamily: T.font.code,
    fontSize: '1rem',
    fontWeight: 500,
    minWidth: '120px',
  },

  label: {
    fontFamily: T.font.prose,
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.55)',
    fontStyle: 'italic',
  },
}
