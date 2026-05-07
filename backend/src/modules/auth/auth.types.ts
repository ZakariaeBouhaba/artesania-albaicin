import { SafeUser } from '../users/users.types'

export interface TokenPair {
  accessToken: string
  refreshToken: string
  user: SafeUser
}

export interface RegisterDto {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
}

export interface LoginDto {
  email: string
  password: string
}
