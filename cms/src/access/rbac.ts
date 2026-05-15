import type { Access } from 'payload'

export type PayloadUser = { role?: 'admin' | 'employee' }

const getRole = (user: unknown): string =>
  (user as PayloadUser)?.role ?? ''

export const isAdmin: Access = ({ req: { user } }) =>
  getRole(user) === 'admin'

export const isAdminOrEmployee: Access = ({ req: { user } }) =>
  ['admin', 'employee'].includes(getRole(user))

export const publicRead: Access = () => true

export const isAdminForDelete: Access = ({ req: { user } }) =>
  getRole(user) === 'admin'
