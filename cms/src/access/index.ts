import type { Access, FieldAccess } from 'payload'

export type PayloadUser = {
  id: string
  role?: 'super-admin' | 'admin' | 'editor' | 'author' | 'viewer'
}

const getRole = (user: unknown): string =>
  (user as PayloadUser)?.role ?? ''

const getId = (user: unknown): string =>
  (user as PayloadUser)?.id ?? ''

// ── Collection-level access ───────────────────────────────

export const isSuperAdmin: Access = ({ req: { user } }) =>
  getRole(user) === 'super-admin'

export const isAdminOrAbove: Access = ({ req: { user } }) =>
  ['super-admin', 'admin'].includes(getRole(user))

export const canEditContent: Access = ({ req: { user } }) =>
  ['super-admin', 'admin', 'editor'].includes(getRole(user))

export const canCreateContent: Access = ({ req: { user } }) =>
  ['super-admin', 'admin', 'author'].includes(getRole(user))

export const isAuthenticated: Access = ({ req: { user } }) => Boolean(user)

export const publicRead: Access = () => true

// Admins can update anything; authors can update only their own docs
export const canUpdateContent: Access = ({ req: { user } }) => {
  if (!user) return false
  const role = getRole(user)
  if (['super-admin', 'admin', 'editor'].includes(role)) return true
  if (role === 'author') return { createdBy: { equals: getId(user) } }
  return false
}

// Admins can delete anything; authors can delete only their own docs
export const canDeleteContent: Access = ({ req: { user } }) => {
  if (!user) return false
  const role = getRole(user)
  if (['super-admin', 'admin'].includes(role)) return true
  if (role === 'author') return { createdBy: { equals: getId(user) } }
  return false
}

// Media: super-admin/admin delete any; author deletes own
export const canDeleteMedia: Access = ({ req: { user } }) => {
  if (!user) return false
  const role = getRole(user)
  if (['super-admin', 'admin'].includes(role)) return true
  if (role === 'author') return { createdBy: { equals: getId(user) } }
  return false
}

// Users: admins see all; others see only themselves
export const canReadUsers: Access = ({ req: { user } }) => {
  if (!user) return false
  if (['super-admin', 'admin'].includes(getRole(user))) return true
  return { id: { equals: getId(user) } }
}

// Users: super-admin can update anyone; others only themselves
export const canUpdateUser: Access = ({ req: { user } }) => {
  if (!user) return false
  if (getRole(user) === 'super-admin') return true
  return { id: { equals: getId(user) } }
}

// ── Field-level access ────────────────────────────────────

export const isSuperAdminField: FieldAccess = ({ req: { user } }) =>
  getRole(user) === 'super-admin'

export const isAdminOrAboveField: FieldAccess = ({ req: { user } }) =>
  ['super-admin', 'admin'].includes(getRole(user))

// ── Legacy aliases (backward compat for any leftover imports) ─
export const isAdmin = isAdminOrAbove
export const isAdminOrEmployee = canEditContent
export const isAdminForDelete = canDeleteContent
