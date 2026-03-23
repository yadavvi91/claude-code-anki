import { T } from '../theme'

// Directory tree visualization
// tree: array of { name, type: 'file'|'dir', children?: [], highlight?: bool }
export default function FileTree({ tree, title = null }) {
  return (
    <div style={styles.wrapper}>
      {title && <div style={styles.title}>{title}</div>}
      <div style={styles.body}>
        {tree.map((node, i) => (
          <TreeNode key={i} node={node} depth={0} />
        ))}
      </div>
    </div>
  )
}

function TreeNode({ node, depth }) {
  const indent = depth * 20
  const icon = node.type === 'dir' ? '📁' : '📄'

  return (
    <>
      <div style={{
        ...styles.node,
        paddingLeft: `${indent + 12}px`,
        ...(node.highlight ? styles.highlight : {}),
      }}>
        <span style={styles.icon}>{icon}</span>
        <span style={{
          ...styles.name,
          fontWeight: node.type === 'dir' ? 500 : 400,
          color: node.highlight ? T.color.accent : T.color.ink3,
        }}>
          {node.name}
        </span>
      </div>
      {node.children && node.children.map((child, i) => (
        <TreeNode key={i} node={child} depth={depth + 1} />
      ))}
    </>
  )
}

const styles = {
  wrapper: {
    margin: '1.5rem 0',
    borderRadius: '8px',
    overflow: 'hidden',
    border: `1px solid ${T.color.border}`,
    background: T.color.codeBg,
  },

  title: {
    fontFamily: T.font.code,
    fontSize: '0.75rem',
    color: 'rgba(255,255,255,0.5)',
    padding: '0.5rem 1rem',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },

  body: {
    padding: '0.75rem 0',
  },

  node: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '3px 12px',
    fontFamily: T.font.code,
    fontSize: '0.82rem',
    lineHeight: 1.6,
  },

  icon: {
    fontSize: '0.8rem',
    flexShrink: 0,
  },

  name: {
    color: T.color.codeText,
  },

  highlight: {
    background: 'rgba(99,102,241,0.12)',
    borderRadius: '3px',
  },
}
