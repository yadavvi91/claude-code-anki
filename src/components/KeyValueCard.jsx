import { T } from '../theme'

// Small stat card (number + title + description)
export default function KeyValueCard({ value, title, description, color = T.color.accent }) {
  return (
    <div style={styles.card}>
      <div style={{ ...styles.value, color }}>{value}</div>
      <div style={styles.title}>{title}</div>
      {description && <div style={styles.desc}>{description}</div>}
    </div>
  )
}

const styles = {
  card: {
    background: T.color.bg2,
    borderRadius: '8px',
    padding: '1.25rem',
    border: `1px solid ${T.color.border}`,
  },

  value: {
    fontFamily: T.font.heading,
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: 1,
    marginBottom: '0.35rem',
  },

  title: {
    fontFamily: T.font.label,
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: T.color.ink2,
    marginBottom: '0.25rem',
  },

  desc: {
    fontFamily: T.font.prose,
    fontSize: '0.82rem',
    color: T.color.ink4,
    lineHeight: 1.5,
  },
}
