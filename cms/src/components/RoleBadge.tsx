import React from 'react'

const ROLE_META: Record<string, { label: string; bg: string; color: string }> = {
  'super-admin': { label: 'Super Admin', bg: '#b18a3a', color: '#faf5ea' },
  'admin':       { label: 'Admin',       bg: '#5c4720', color: '#e8dcc1' },
  'editor':      { label: 'Editor',      bg: '#2a4a20', color: '#d4ecb8' },
  'author':      { label: 'Autor',       bg: '#204a5c', color: '#b8dce8' },
  'viewer':      { label: 'Lector',      bg: '#3a3a3a', color: '#e8e8e8' },
}

type Props = {
  user?: { role?: string }
}

export function RoleBadge({ user }: Props) {
  const role = user?.role ?? 'viewer'
  const meta = ROLE_META[role] ?? ROLE_META.viewer

  return (
    <div style={{ padding: '6px 16px 2px' }}>
      <span
        style={{
          display: 'inline-block',
          background: meta.bg,
          color: meta.color,
          borderRadius: '12px',
          padding: '2px 9px',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.07em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-body)',
        }}
      >
        {meta.label}
      </span>
    </div>
  )
}
