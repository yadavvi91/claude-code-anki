import { useState } from 'react'
import { T } from '../theme'

// Animated terminal with play/step/reset
// steps: [{ command: string, output?: string }]
export default function TerminalAnimation({ title = 'Terminal', steps }) {
  const [currentStep, setCurrentStep] = useState(-1)

  const visibleSteps = steps.slice(0, currentStep + 1)
  const isComplete = currentStep >= steps.length - 1
  const isStarted = currentStep >= 0

  function handleStep() {
    if (!isComplete) setCurrentStep(s => s + 1)
  }

  function handleReset() {
    setCurrentStep(-1)
  }

  function handlePlayAll() {
    setCurrentStep(steps.length - 1)
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.titleBar}>
        <span style={styles.dot} />
        <span style={styles.dot} />
        <span style={styles.dot} />
        <span style={styles.titleText}>{title}</span>
      </div>
      <div style={styles.body}>
        {visibleSteps.map((step, i) => (
          <div key={i} style={styles.stepBlock}>
            <div style={styles.commandLine}>
              <span style={styles.prompt}>$</span>
              <span style={styles.command}>{step.command}</span>
            </div>
            {step.output && (
              <div style={styles.output}>{step.output}</div>
            )}
          </div>
        ))}
        {!isComplete && (
          <div style={styles.cursor}>
            <span style={styles.prompt}>$</span>
            <span style={styles.blinkCursor}>▊</span>
          </div>
        )}
      </div>
      <div style={styles.controls}>
        <button onClick={handleStep} disabled={isComplete} style={{
          ...styles.btn,
          opacity: isComplete ? 0.4 : 1,
        }}>
          Step →
        </button>
        <button onClick={handlePlayAll} disabled={isComplete} style={{
          ...styles.btn,
          opacity: isComplete ? 0.4 : 1,
        }}>
          Play all ▶
        </button>
        {isStarted && (
          <button onClick={handleReset} style={styles.btn}>
            Reset ↺
          </button>
        )}
      </div>
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

  body: {
    background: T.color.codeBg,
    padding: '1rem 1.25rem',
    minHeight: '60px',
  },

  stepBlock: {
    marginBottom: '0.5rem',
  },

  commandLine: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'baseline',
  },

  prompt: {
    fontFamily: T.font.code,
    fontSize: '0.85rem',
    color: T.color.correct,
    flexShrink: 0,
  },

  command: {
    fontFamily: T.font.code,
    fontSize: '0.85rem',
    color: T.color.codeText,
  },

  output: {
    fontFamily: T.font.code,
    fontSize: '0.8rem',
    color: 'rgba(255,255,255,0.55)',
    lineHeight: 1.6,
    whiteSpace: 'pre-wrap',
    paddingLeft: '1.25rem',
    marginTop: '0.25rem',
  },

  cursor: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'baseline',
  },

  blinkCursor: {
    fontFamily: T.font.code,
    fontSize: '0.85rem',
    color: T.color.codeText,
    animation: 'pulse 1s ease-in-out infinite',
  },

  controls: {
    display: 'flex',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: '#171923',
    borderTop: '1px solid rgba(255,255,255,0.06)',
  },

  btn: {
    fontFamily: T.font.code,
    fontSize: '0.72rem',
    padding: '0.3rem 0.75rem',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '3px',
    background: 'transparent',
    color: 'rgba(255,255,255,0.7)',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
}
