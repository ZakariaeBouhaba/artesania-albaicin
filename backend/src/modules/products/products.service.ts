import { AppError } from '../../shared/errors/AppError'
import { ProductsRepository } from './products.repository'
import { CreateProductDto, UpdateProductDto, ProductFilters } from './products.types'
import { buildPaginationMeta } from '../../shared/utils/pagination'

const repo = new ProductsRepository()

export async function listProducts(filters: ProductFilters) {
  const page  = filters.page  ?? 1
  const limit = filters.limit ?? 20
  const { data, total } = await repo.findAll({ ...filters, page, limit })
  return { data, meta: buildPaginationMeta(page, limit, total) }
}

export async function getProduct(slug: string, isEmployee = false) {
  const product = await repo.findBySlug(slug)
  if (!product) throw AppError.notFound('Product')
  if (!product.is_published && !isEmployee) throw AppError.notFound('Product')
  return product
}

export async function createProduct(dto: CreateProductDto, userId: string) {
  return repo.create(dto, userId)
}

export async function updateProduct(id: string, dto: UpdateProductDto, userId: string) {
  const product = await repo.findById(id)
  if (!product) throw AppError.notFound('Product')
  return repo.update(id, dto, userId)
}

export async function togglePublish(id: string, userId: string) {
  const product = await repo.findById(id)
  if (!product) throw AppError.notFound('Product')
  return repo.update(id, { isPublished: !product.is_published }, userId)
}

export async function deleteProduct(id: string) {
  const deleted = await repo.delete(id)
  if (!deleted) throw AppError.notFound('Product')
}

export async function addImage(productId: string, data: { url: string; altText?: string; sortOrder?: number; isPrimary?: boolean }) {
  const product = await repo.findById(productId)
  if (!product) throw AppError.notFound('Product')
  return repo.addImage(productId, data)
}

export async function deleteImage(productId: string, imageId: string) {
  const deleted = await repo.deleteImage(productId, imageId)
  if (!deleted) throw AppError.notFound('Image')
}
