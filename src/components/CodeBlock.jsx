import { useEffect, useRef } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-markdown'
import { T } from '../theme'
import '../prism-theme.css'

// Auto-detect language from title or content
function detectLang(title, code, language) {
  if (language) return language
  const t = (title || '').toLowerCase()
  if (t.includes('.py') || t.includes('python')) return 'python'
  if (t.includes('.json') || t.includes('settings')) return 'json'
  if (t.includes('.yaml') || t.includes('.yml')) return 'yaml'
  if (t.includes('.jsx')) return 'jsx'
  if (t.includes('.tsx')) return 'tsx'
  if (t.includes('.md')) return 'markdown'
  if (t.includes('terminal') || t.includes('bash') || t.includes('shell')) return 'bash'
  // Content heuristics
  if (code.includes('import ') && code.includes('from ')) return 'python'
  if (code.includes('@mcp.') || code.includes('def ') || code.includes('async def')) return 'python'
  if (code.trimStart().startsWith('{') || code.trimStart().startsWith('"')) return 'json'
  if (code.includes('claude ') || code.includes('npm ') || code.includes('mcp ') || code.includes('uv ')) return 'bash'
  if (code.includes('const ') || code.includes('import {')) return 'javascript'
  return 'javascript'
}

export default function CodeBlock({ code, title = null, language = null }) {
  const codeRef = useRef()
  const lang = detectLang(title, code, language)

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current)
    }
  }, [code, lang])

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
        <code ref={codeRef} className={`language-${lang}`} style={styles.code}>{code}</code>
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
