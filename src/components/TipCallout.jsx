import { T } from '../theme'

// Styled callout for tips, warnings, and insights
// variant: 'tip' | 'warning' | 'insight'
export default function TipCallout({ variant = 'tip', title, children }) {
  const config = variants[variant] || variants.tip

  return (
    <div style={{ ...styles.wrapper, borderLeftColor: config.color, background: config.bg }}>
      <div style={styles.header}>
        <span style={styles.icon}>{config.icon}</span>
        <span style={{ ...styles.title, color: config.color }}>
          {title || config.defaultTitle}
        </span>
      </div>
      <div style={styles.body}>{children}</div>
    </div>
  )
}

const variants = {
  tip: {
    icon: '💡',
    color: T.color.accent,
    bg: 'rgba(99,102,241,0.05)',
    defaultTitle: 'Tip',
  },
  warning: {
    icon: '⚠️',
    color: '#d97706',
    bg: 'rgba(217,119,6,0.05)',
    defaultTitle: 'Warning',
  },
  insight: {
    icon: '🔍',
    color: T.color.accent2,
    bg: 'rgba(139,92,246,0.05)',
    defaultTitle: 'Insight',
  },
}

const styles = {
  wrapper: {
    borderLeft: '4px solid',
    borderRadius: '0 6px 6px 0',
    padding: '1rem 1.25rem',
    margin: '1.5rem 0',
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem',
  },

  icon: {
    fontSize: '1rem',
  },

  title: {
    fontFamily: T.font.label,
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },

  body: {
    fontFamily: T.font.prose,
    fontSize: '0.95rem',
    lineHeight: 1.7,
    color: T.color.ink3,
  },
}
