import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { config } from '../../config'
import { AppError } from '../../shared/errors/AppError'
import { AuthRepository } from './auth.repository'
import { RegisterDto, LoginDto, TokenPair } from './auth.types'
import { sanitizeUser, User } from '../users/users.types'

const repo = new AuthRepository()

// SHA-256 for O(1) refresh token lookup (token itself is 64 random bytes — high entropy)
function hashToken(raw: string): string {
  return crypto.createHash('sha256').update(raw).digest('hex')
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

function generateAccessToken(user: User): string {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    config.jwt.accessSecret,
    { expiresIn: config.jwt.accessExpiresIn }
  )
}

async function createTokenPair(user: User): Promise<TokenPair> {
  const accessToken = generateAccessToken(user)
  const rawRefresh = crypto.randomBytes(64).toString('hex')
  const tokenHash = hashToken(rawRefresh)
  await repo.saveRefreshToken(user.id, tokenHash, addDays(new Date(), config.jwt.refreshExpiresInDays))
  return { accessToken, refreshToken: rawRefresh, user: sanitizeUser(user) }
}

export async function register(dto: RegisterDto): Promise<TokenPair> {
  const existing = await repo.findByEmail(dto.email)
  if (existing) throw AppError.conflict('Email already registered')

  const passwordHash = await bcrypt.hash(dto.password, 12)
  const user = await repo.createUser({
    email: dto.email,
    passwordHash,
    firstName: dto.firstName,
    lastName: dto.lastName,
    phone: dto.phone,
  })
  return createTokenPair(user)
}

export async function login(dto: LoginDto): Promise<TokenPair> {
  const user = await repo.findByEmail(dto.email)
  if (!user) throw AppError.unauthorized('Invalid credentials')

  const valid = await bcrypt.compare(dto.password, user.password_hash)
  if (!valid) throw AppError.unauthorized('Invalid credentials')

  return createTokenPair(user)
}

export async function refresh(rawToken: string): Promise<TokenPair> {
  const tokenHash = hashToken(rawToken)
  const stored = await repo.findRefreshToken(tokenHash)

  if (!stored || stored.revoked_at || new Date() > stored.expires_at) {
    throw AppError.unauthorized('Refresh token invalid or expired')
  }

  await repo.revokeRefreshToken(tokenHash)
  const user = await repo.findById(stored.user_id)
  if (!user) throw AppError.unauthorized()

  return createTokenPair(user)
}

export async function logout(rawToken: string): Promise<void> {
  const tokenHash = hashToken(rawToken)
  await repo.revokeRefreshToken(tokenHash)
}

export async function getMe(userId: string) {
  const user = await repo.findById(userId)
  if (!user) throw AppError.notFound('User')
  return sanitizeUser(user)
}
