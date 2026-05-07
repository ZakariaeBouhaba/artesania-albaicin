import { pool } from '../../config/database'
import { User, UserRole } from './users.types'

export class UsersRepository {
  async findAll(page = 1, limit = 20) {
    const offset = (page - 1) * limit
    const [{ rows }, { rows: count }] = await Promise.all([
      pool.query<User>('SELECT * FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2', [limit, offset]),
      pool.query<{ total: number }>('SELECT COUNT(*)::int AS total FROM users'),
    ])
    return { data: rows, total: count[0].total }
  }

  async findById(id: string): Promise<User | null> {
    const { rows } = await pool.query<User>('SELECT * FROM users WHERE id = $1', [id])
    return rows[0] ?? null
  }

  async update(id: string, data: { firstName?: string; lastName?: string; phone?: string; role?: UserRole; isActive?: boolean }): Promise<User | null> {
    const fields: string[] = []
    const values: unknown[] = []
    let idx = 1

    if (data.firstName !== undefined) { fields.push(`first_name = $${idx++}`); values.push(data.firstName) }
    if (data.lastName  !== undefined) { fields.push(`last_name  = $${idx++}`); values.push(data.lastName)  }
    if (data.phone     !== undefined) { fields.push(`phone      = $${idx++}`); values.push(data.phone)     }
    if (data.role      !== undefined) { fields.push(`role       = $${idx++}`); values.push(data.role)      }
    if (data.isActive  !== undefined) { fields.push(`is_active  = $${idx++}`); values.push(data.isActive)  }

    if (!fields.length) return this.findById(id)
    values.push(id)
    const { rows } = await pool.query<User>(
      `UPDATE users SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
      values
    )
    return rows[0] ?? null
  }

  async updatePassword(id: string, passwordHash: string): Promise<void> {
    await pool.query('UPDATE users SET password_hash = $1 WHERE id = $2', [passwordHash, id])
  }

  async softDelete(id: string): Promise<boolean> {
    const { rowCount } = await pool.query(
      'UPDATE users SET is_active = FALSE WHERE id = $1', [id]
    )
    return (rowCount ?? 0) > 0
  }
}
