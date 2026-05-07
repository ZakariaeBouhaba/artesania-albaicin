import { Request, Response } from 'express'
import { asyncHandler } from '../../shared/utils/asyncHandler'
import * as authService from './auth.service'

export const registerController = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.register(req.body)
  res.status(201).json({ success: true, data: result })
})

export const loginController = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.login(req.body)
  res.json({ success: true, data: result })
})

export const refreshController = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.refresh(req.body.refreshToken)
  res.json({ success: true, data: result })
})

export const logoutController = asyncHandler(async (req: Request, res: Response) => {
  await authService.logout(req.body.refreshToken ?? '')
  res.json({ success: true, message: 'Logged out' })
})

export const meController = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.getMe(req.user!.id)
  res.json({ success: true, data: user })
})
