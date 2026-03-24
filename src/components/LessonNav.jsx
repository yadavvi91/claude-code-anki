import { Link } from 'react-router-dom'
import { T } from '../theme'

// Top nav bar for lesson pages — prev/next + module title
export default function LessonNav({ moduleTitle, moduleColor, prevLink, nextLink, prevLabel, nextLabel }) {
  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        {prevLink ? (
          <Link to={prevLink} style={styles.link}>← {prevLabel || 'Previous'}</Link>
        ) : (
          <span />
        )}
      </div>
      <div style={styles.center}>
        <Link to="/" style={{ ...styles.homeLink, color: moduleColor }}>{moduleTitle}</Link>
      </div>
      <div style={styles.right}>
        {nextLink ? (
          <Link to={nextLink} style={styles.link}>{nextLabel || 'Next'} →</Link>
        ) : (
          <span />
        )}
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75rem 2rem',
    background: T.color.bg,
    borderBottom: `1px solid ${T.color.border}`,
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },

  left: {
    flex: 1,
    textAlign: 'left',
  },

  center: {
    fontFamily: T.font.label,
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
  },

  right: {
    flex: 1,
    textAlign: 'right',
  },

  link: {
    fontFamily: T.font.prose,
    fontSize: '0.85rem',
    color: T.color.accent,
    textDecoration: 'none',
    transition: 'opacity 0.2s',
  },

  homeLink: {
    textDecoration: 'none',
    fontFamily: T.font.label,
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
  },
}
