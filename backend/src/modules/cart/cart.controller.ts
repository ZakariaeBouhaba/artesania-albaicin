import { Request, Response } from 'express'
import { asyncHandler } from '../../shared/utils/asyncHandler'
import * as service from './cart.service'

function ctx(req: Request) {
  return {
    userId:    req.user?.id,
    sessionId: req.headers['x-session-id'] as string | undefined,
  }
}

export const getCart    = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await service.getCart(ctx(req).userId, ctx(req).sessionId) })
})
export const addItem    = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body
  res.json({ success: true, data: await service.addItem(productId, quantity, ctx(req).userId, ctx(req).sessionId) })
})
export const updateItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body
  res.json({ success: true, data: await service.updateItem(req.params.productId, quantity, ctx(req).userId, ctx(req).sessionId) })
})
export const removeItem = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await service.removeItem(req.params.productId, ctx(req).userId, ctx(req).sessionId) })
})
export const clearCart  = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await service.clearCart(ctx(req).userId, ctx(req).sessionId) })
})
export const mergeCart  = asyncHandler(async (req, res) => {
  const { sessionId } = req.body
  res.json({ success: true, data: await service.mergeCart(req.user!.id, sessionId) })
})
