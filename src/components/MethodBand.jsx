import Reveal from './Reveal'
import { T } from '../theme'

const steps = [
  { n: '1', title: 'Concept', body: 'Read a focused essay that explains the idea in context — why it exists, when to use it, and how it connects to what you already know.' },
  { n: '2', title: 'Example', body: 'See real code, commands, and workflows. Not abstract theory — concrete examples you can use tomorrow.' },
  { n: '3', title: 'Practice', body: 'Answer MCQ cards embedded in the prose. Each wrong answer explains exactly why it\'s wrong, so mistakes become learning moments.' },
  { n: '4', title: 'SRS Review', body: 'Cards you\'ve seen enter the spaced repetition queue. Come back in a day, then three days, then a week. SM-2 schedules reviews at the optimal moment.' },
]

export default function MethodBand() {
  return (
    <div style={s.band}>
      <div style={s.inner}>
        <Reveal>
          <div style={s.label}>The Method</div>
        </Reveal>
        <Reveal>
          <h2 style={s.h2}>Concept → Example → Practice → SRS Review</h2>
        </Reveal>
        <Reveal>
          <p style={s.prose}>
            Every lesson follows the same cycle: understand the idea, see it in action,
            prove you get it, then review on a schedule. The exit condition at every
            stage is mastery, not time spent.
          </p>
        </Reveal>

        <div style={s.sequence}>
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 60}>
              <div style={s.step}>
                <div style={s.dot}>{step.n}</div>
                <div style={s.stepContent}>
                  <div style={s.stepTitle}>{step.title}</div>
                  <p style={s.stepBody}>{step.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div style={s.pullQuote}>
            <p style={s.pullText}>
              Spaced repetition doesn't replace understanding — it preserves it.
              First you learn. Then you never forget.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  )
}

const s = {
  band: {
    width: '100%',
    padding: '3rem 2rem',
    background: T.color.codeBg,
  },
  inner: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  label: {
    fontFamily: T.font.label,
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: T.color.accent,
    marginBottom: '1rem',
  },
  h2: {
    fontFamily: T.font.heading,
    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
    fontWeight: 600,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 1.25,
    marginBottom: '1.5rem',
  },
  prose: {
    fontFamily: T.font.prose,
    fontSize: '1.05rem',
    lineHeight: 1.85,
    color: 'rgba(255,255,255,0.55)',
    marginBottom: '2rem',
    maxWidth: '65ch',
  },
  sequence: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    margin: '2.5rem 0',
  },
  step: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'flex-start',
    padding: '1.4rem 0',
    borderBottom: '1px solid rgba(99,102,241,0.15)',
  },
  dot: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: T.color.accent,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: T.font.label,
    fontSize: '0.75rem',
    fontWeight: 600,
    flexShrink: 0,
    marginTop: '3px',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: T.font.label,
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.12em',
    color: T.color.accent,
    textTransform: 'uppercase',
    marginBottom: '0.3rem',
  },
  stepBody: {
    fontFamily: T.font.prose,
    fontSize: '0.95rem',
    lineHeight: 1.7,
    color: 'rgba(255,255,255,0.45)',
    margin: 0,
  },
  pullQuote: {
    padding: '2rem 2.5rem',
    borderLeft: `4px solid rgba(99,102,241,0.5)`,
    margin: '3rem 0 0',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '0 8px 8px 0',
  },
  pullText: {
    fontFamily: T.font.prose,
    fontSize: '1.15rem',
    fontStyle: 'italic',
    color: 'rgba(255,255,255,0.65)',
    lineHeight: 1.7,
    margin: 0,
  },
}
