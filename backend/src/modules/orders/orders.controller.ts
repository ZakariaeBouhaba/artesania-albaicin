import { Request, Response } from 'express'
import { asyncHandler } from '../../shared/utils/asyncHandler'
import * as service from './orders.service'

export const listAll = asyncHandler(async (req: Request, res: Response) => {
  const { status, page, limit } = req.query as Record<string, string>
  const result = await service.listAll({ status, page: +page, limit: +limit })
  res.json({ success: true, ...result })
})

export const listMine = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit } = req.query as Record<string, string>
  const result = await service.listMine(req.user!.id, +page, +limit)
  res.json({ success: true, ...result })
})

export const getOne = asyncHandler(async (req: Request, res: Response) => {
  const order = await service.getOrder(req.params.id, req.user!.id, req.user!.role)
  res.json({ success: true, data: order })
})

export const place = asyncHandler(async (req: Request, res: Response) => {
  const order = await service.placeOrder(req.user!.id, req.body)
  res.status(201).json({ success: true, data: order })
})

export const updateStatus = asyncHandler(async (req: Request, res: Response) => {
  const order = await service.updateStatus(req.params.id, req.body)
  res.json({ success: true, data: order })
})

export const cancel = asyncHandler(async (req: Request, res: Response) => {
  const order = await service.cancelOrder(req.params.id, req.user!.id, req.user!.role, req.body.reason)
  res.json({ success: true, data: order })
})

export const remove = asyncHandler(async (req: Request, res: Response) => {
  await service.deleteOrder(req.params.id)
  res.json({ success: true, message: 'Order deleted' })
})
