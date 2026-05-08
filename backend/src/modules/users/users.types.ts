export type UserRole = 'admin' | 'employee' | 'client'

export interface User {
  id: string
  email: string
  password_hash: string
  first_name: string
  last_name: string
  phone: string | null
  role: UserRole
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export type SafeUser = Omit<User, 'password_hash'>

export function sanitizeUser(user: User): SafeUser {
  const { password_hash: _, ...safe } = user
  return safe
}
