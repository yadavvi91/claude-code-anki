import { T } from '../theme'

// Feature comparison table with variable columns
// headers: string[], rows: string[][]
export default function ComparisonTable({ title, headers, rows }) {
  return (
    <div style={styles.wrapper}>
      {title && <div style={styles.title}>{title}</div>}
      <div style={styles.tableScroll}>
        <table style={styles.table}>
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{
                    ...styles.td,
                    ...(ci === 0 ? styles.tdFirst : {}),
                  }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    margin: '1.5rem 0',
    borderRadius: '8px',
    overflow: 'hidden',
    border: `1px solid ${T.color.border}`,
  },

  title: {
    fontFamily: T.font.label,
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: T.color.accent,
    padding: '0.75rem 1rem',
    background: T.color.bg2,
    borderBottom: `1px solid ${T.color.border}`,
  },

  tableScroll: {
    overflowX: 'auto',
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: T.font.prose,
    fontSize: '0.9rem',
  },

  th: {
    textAlign: 'left',
    padding: '0.65rem 1rem',
    background: T.color.bg2,
    fontFamily: T.font.label,
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: T.color.ink4,
    borderBottom: `1px solid ${T.color.border}`,
    whiteSpace: 'nowrap',
  },

  td: {
    padding: '0.6rem 1rem',
    borderBottom: `1px solid ${T.color.border}`,
    color: T.color.ink3,
    lineHeight: 1.5,
    verticalAlign: 'top',
  },

  tdFirst: {
    fontWeight: 500,
    color: T.color.ink2,
  },
}
