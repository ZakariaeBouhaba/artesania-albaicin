import { pool } from '../../config/database'
import { User } from '../users/users.types'

export class AuthRepository {
  async findByEmail(email: string): Promise<User | null> {
    const { rows } = await pool.query<User>(
      'SELECT * FROM users WHERE email = $1 AND is_active = TRUE',
      [email]
    )
    return rows[0] ?? null
  }

  async findById(id: string): Promise<User | null> {
    const { rows } = await pool.query<User>(
      'SELECT * FROM users WHERE id = $1 AND is_active = TRUE',
      [id]
    )
    return rows[0] ?? null
  }

  async createUser(data: {
    email: string
    passwordHash: string
    firstName: string
    lastName: string
    phone?: string
  }): Promise<User> {
    const { rows } = await pool.query<User>(
      `INSERT INTO users (email, password_hash, first_name, last_name, phone)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [data.email, data.passwordHash, data.firstName, data.lastName, data.phone ?? null]
    )
    return rows[0]
  }

  async saveRefreshToken(userId: string, tokenHash: string, expiresAt: Date): Promise<void> {
    await pool.query(
      `INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3)`,
      [userId, tokenHash, expiresAt]
    )
  }

  async findRefreshToken(tokenHash: string): Promise<{ user_id: string; expires_at: Date; revoked_at: Date | null } | null> {
    const { rows } = await pool.query(
      `SELECT user_id, expires_at, revoked_at FROM refresh_tokens WHERE token_hash = $1`,
      [tokenHash]
    )
    return rows[0] ?? null
  }

  async revokeRefreshToken(tokenHash: string): Promise<void> {
    await pool.query(
      `UPDATE refresh_tokens SET revoked_at = NOW() WHERE token_hash = $1`,
      [tokenHash]
    )
  }

  async revokeAllUserTokens(userId: string): Promise<void> {
    await pool.query(
      `UPDATE refresh_tokens SET revoked_at = NOW() WHERE user_id = $1 AND revoked_at IS NULL`,
      [userId]
    )
  }
}
