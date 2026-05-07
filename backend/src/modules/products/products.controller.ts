import { Request, Response } from 'express'
import { asyncHandler } from '../../shared/utils/asyncHandler'
import * as service from './products.service'

export const list = asyncHandler(async (req: Request, res: Response) => {
  const { category, search, page, limit, featured } = req.query as Record<string, string>
  const result = await service.listProducts({
    category, search,
    page:     page     ? parseInt(page, 10)     : undefined,
    limit:    limit    ? parseInt(limit, 10)    : undefined,
    featured: featured === 'true',
    published: true,
  })
  res.json({ success: true, ...result })
})

export const listAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { category, search, page, limit } = req.query as Record<string, string>
  const result = await service.listProducts({
    category, search,
    page:  page  ? parseInt(page, 10)  : undefined,
    limit: limit ? parseInt(limit, 10) : undefined,
  })
  res.json({ success: true, ...result })
})

export const getBySlug = asyncHandler(async (req: Request, res: Response) => {
  const isEmployee = ['employee', 'admin'].includes(req.user?.role ?? '')
  const product = await service.getProduct(req.params.slug, isEmployee)
  res.json({ success: true, data: product })
})

export const create = asyncHandler(async (req: Request, res: Response) => {
  const product = await service.createProduct(req.body, req.user!.id)
  res.status(201).json({ success: true, data: product })
})

export const update = asyncHandler(async (req: Request, res: Response) => {
  const product = await service.updateProduct(req.params.id, req.body, req.user!.id)
  res.json({ success: true, data: product })
})

export const togglePublish = asyncHandler(async (req: Request, res: Response) => {
  const product = await service.togglePublish(req.params.id, req.user!.id)
  res.json({ success: true, data: product })
})

export const remove = asyncHandler(async (req: Request, res: Response) => {
  await service.deleteProduct(req.params.id)
  res.json({ success: true, message: 'Product deleted' })
})

export const addImage = asyncHandler(async (req: Request, res: Response) => {
  const image = await service.addImage(req.params.id, req.body)
  res.status(201).json({ success: true, data: image })
})

export const removeImage = asyncHandler(async (req: Request, res: Response) => {
  await service.deleteImage(req.params.id, req.params.imageId)
  res.json({ success: true, message: 'Image deleted' })
})
