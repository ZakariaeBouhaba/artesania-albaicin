import React from 'react'

const ROLE_META: Record<string, { label: string }> = {
  'super-admin': { label: 'Super Admin' },
  'admin':       { label: 'Admin'       },
  'editor':      { label: 'Editor'      },
  'author':      { label: 'Autor'       },
  'viewer':      { label: 'Lector'      },
}

type Props = {
  user?: { role?: string }
}

export function RoleBadge({ user }: Props) {
  const role = user?.role ?? 'viewer'
  const label = ROLE_META[role]?.label ?? role

  return (
    <div style={{ padding: '6px 16px 2px' }}>
      <span className={`role-badge role-badge--${role}`}>{label}</span>
    </div>
  )
}
