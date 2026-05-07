import bcrypt from 'bcryptjs'
import { AppError } from '../../shared/errors/AppError'
import { UsersRepository } from './users.repository'
import { sanitizeUser, UserRole } from './users.types'
import { buildPaginationMeta } from '../../shared/utils/pagination'

const repo = new UsersRepository()

export async function listUsers(page = 1, limit = 20) {
  const { data, total } = await repo.findAll(page, limit)
  return { data: data.map(sanitizeUser), meta: buildPaginationMeta(page, limit, total) }
}

export async function getUser(id: string) {
  const user = await repo.findById(id)
  if (!user) throw AppError.notFound('User')
  return sanitizeUser(user)
}

export async function updateUser(id: string, data: { firstName?: string; lastName?: string; phone?: string; role?: UserRole }) {
  const user = await repo.update(id, data)
  if (!user) throw AppError.notFound('User')
  return sanitizeUser(user)
}

export async function updateProfile(id: string, data: { firstName?: string; lastName?: string; phone?: string }) {
  return updateUser(id, data)
}

export async function changePassword(id: string, currentPassword: string, newPassword: string) {
  const user = await repo.findById(id)
  if (!user) throw AppError.notFound('User')
  const valid = await bcrypt.compare(currentPassword, user.password_hash)
  if (!valid) throw AppError.badRequest('Current password is incorrect')
  const hash = await bcrypt.hash(newPassword, 12)
  await repo.updatePassword(id, hash)
}

export async function deleteUser(id: string) {
  const deleted = await repo.softDelete(id)
  if (!deleted) throw AppError.notFound('User')
}
