import { Request, Response } from 'express'
import { asyncHandler } from '../../shared/utils/asyncHandler'
import * as service from './users.service'

export const list           = asyncHandler(async (req, res) => {
  const { page, limit } = req.query as Record<string, string>
  res.json({ success: true, ...(await service.listUsers(+page, +limit)) })
})
export const getOne         = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await service.getUser(req.params.id) })
})
export const updateOne      = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await service.updateUser(req.params.id, req.body) })
})
export const deleteOne      = asyncHandler(async (req, res) => {
  await service.deleteUser(req.params.id)
  res.json({ success: true, message: 'User deactivated' })
})
export const getMyProfile   = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await service.getUser(req.user!.id) })
})
export const updateMyProfile = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await service.updateProfile(req.user!.id, req.body) })
})
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body
  await service.changePassword(req.user!.id, currentPassword, newPassword)
  res.json({ success: true, message: 'Password updated' })
})
