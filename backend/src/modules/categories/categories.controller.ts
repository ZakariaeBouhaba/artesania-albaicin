import { Request, Response } from 'express'
import { asyncHandler } from '../../shared/utils/asyncHandler'
import * as service from './categories.service'

export const list    = asyncHandler(async (_req: Request, res: Response) => {
  res.json({ success: true, data: await service.listCategories() })
})
export const getOne  = asyncHandler(async (req: Request, res: Response) => {
  res.json({ success: true, data: await service.getCategory(req.params.slug) })
})
export const create  = asyncHandler(async (req: Request, res: Response) => {
  res.status(201).json({ success: true, data: await service.createCategory(req.body) })
})
export const update  = asyncHandler(async (req: Request, res: Response) => {
  res.json({ success: true, data: await service.updateCategory(req.params.id, req.body) })
})
export const remove  = asyncHandler(async (req: Request, res: Response) => {
  await service.deleteCategory(req.params.id)
  res.json({ success: true, message: 'Category deleted' })
})
