import { T } from '../theme'

// Accepts lesson title/subtitle/concepts as props
export default function BeginDivider({ lessonNumber = 'I', title, subtitle, concepts = [] }) {
  return (
    <div style={s.wrapper}>
      <div style={s.fade} />
      <div style={s.inner}>
        <div style={s.ornament}>◆</div>
        <div style={s.label}>Lesson {lessonNumber}</div>
        <h2 style={s.title}>{title}</h2>
        {subtitle && <p style={s.sub}>{subtitle}</p>}

        {concepts.length > 0 && (
          <div style={s.conceptRow}>
            {concepts.map(c => (
              <div key={c} style={s.concept}>{c}</div>
            ))}
          </div>
        )}

        <div style={s.rule} />
      </div>
    </div>
  )
}

const s = {
  wrapper: {
    position: 'relative',
    background: T.color.bg,
  },
  fade: {
    height: '120px',
    background: `linear-gradient(to bottom, ${T.color.codeBg}, ${T.color.bg})`,
  },
  inner: {
    textAlign: 'center',
    padding: '2rem 2rem 4rem',
  },
  ornament: {
    color: T.color.bg3,
    fontSize: '1.2rem',
    marginBottom: '1.5rem',
  },
  label: {
    fontFamily: T.font.label,
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: T.color.accent,
    marginBottom: '1rem',
  },
  title: {
    fontFamily: T.font.heading,
    fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
    fontWeight: 600,
    color: T.color.ink2,
    letterSpacing: '-0.01em',
    marginBottom: '0.5rem',
  },
  sub: {
    fontFamily: T.font.prose,
    fontSize: '1rem',
    fontStyle: 'italic',
    color: T.color.ink4,
    marginBottom: '2rem',
  },
  conceptRow: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '2.5rem',
  },
  concept: {
    fontFamily: T.font.label,
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    color: T.color.ink4,
    textTransform: 'uppercase',
    borderLeft: `2px solid ${T.color.border}`,
    paddingLeft: '0.7rem',
  },
  rule: {
    width: '60px',
    height: '1px',
    background: T.color.border,
    margin: '0 auto',
  },
}
