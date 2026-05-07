import { api } from './api'
import { ApiResponse, PaginatedResponse, Product } from '../types/api.types'

export const productsService = {
  list: (params?: Record<string, string | number>) =>
    api.get<PaginatedResponse<Product>>('/products', { params }).then(r => r.data),

  getBySlug: (slug: string) =>
    api.get<ApiResponse<Product>>(`/products/${slug}`).then(r => r.data),

  listAdmin: (params?: Record<string, string | number>) =>
    api.get<PaginatedResponse<Product>>('/products/admin', { params }).then(r => r.data),

  create: (data: unknown) =>
    api.post<ApiResponse<Product>>('/products', data).then(r => r.data),

  update: (id: string, data: unknown) =>
    api.patch<ApiResponse<Product>>(`/products/${id}`, data).then(r => r.data),

  togglePublish: (id: string) =>
    api.patch<ApiResponse<Product>>(`/products/${id}/publish`).then(r => r.data),

  delete: (id: string) =>
    api.delete(`/products/${id}`).then(r => r.data),
}
