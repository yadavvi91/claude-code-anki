import { T } from '../theme'

// Show a key concept/command at the start of a lesson section
// Replaces ShlokaDisplay — shows a CLI command or concept instead of Sanskrit verse
export default function ConceptDisplay({ concept, description, color = T.color.accent }) {
  return (
    <div style={{ ...styles.wrapper, borderColor: `${color}30` }}>
      <div style={{ ...styles.concept, color }}>
        <code style={styles.code}>{concept}</code>
      </div>
      {description && (
        <p style={styles.desc}>{description}</p>
      )}
    </div>
  )
}

const styles = {
  wrapper: {
    textAlign: 'center',
    padding: '2rem 2rem 1.5rem',
    margin: '2rem 0',
    border: '1px solid',
    borderRadius: '8px',
    background: T.color.bg2,
  },

  concept: {
    marginBottom: '0.75rem',
  },

  code: {
    fontFamily: T.font.code,
    fontSize: '1.3rem',
    fontWeight: 500,
    letterSpacing: '0.02em',
  },

  desc: {
    fontFamily: T.font.prose,
    fontSize: '0.95rem',
    color: T.color.ink4,
    lineHeight: 1.6,
    maxWidth: '50ch',
    margin: '0 auto',
  },
}
