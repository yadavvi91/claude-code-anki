import { T } from '../theme'

// Lightweight syntax-highlighted code display
// Supports optional title (e.g., filename) and language hint
export default function CodeBlock({ code, title = null, language = null }) {
  return (
    <div style={styles.wrapper}>
      {title && (
        <div style={styles.titleBar}>
          <span style={styles.dot} />
          <span style={styles.dot} />
          <span style={styles.dot} />
          <span style={styles.titleText}>{title}</span>
        </div>
      )}
      <pre style={styles.pre}>
        <code style={styles.code}>{code}</code>
      </pre>
    </div>
  )
}

const styles = {
  wrapper: {
    borderRadius: '8px',
    overflow: 'hidden',
    margin: '1.5rem 0',
    border: `1px solid ${T.color.border}`,
  },

  titleBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '0.5rem 1rem',
    background: '#171923',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },

  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.12)',
  },

  titleText: {
    fontFamily: T.font.code,
    fontSize: '0.75rem',
    color: 'rgba(255,255,255,0.5)',
    marginLeft: '8px',
  },

  pre: {
    margin: 0,
    padding: '1.25rem 1.5rem',
    background: T.color.codeBg,
    overflowX: 'auto',
  },

  code: {
    fontFamily: T.font.code,
    fontSize: '0.85rem',
    lineHeight: 1.7,
    color: T.color.codeText,
    whiteSpace: 'pre',
  },
}
