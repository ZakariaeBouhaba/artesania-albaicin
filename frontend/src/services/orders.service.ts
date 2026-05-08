import { api } from './api'
import { ApiResponse, Order, PaginatedResponse } from '../types/api.types'

export const ordersService = {
  listAll: (params?: Record<string, string | number>) =>
    api.get<PaginatedResponse<Order>>('/orders', { params }).then(r => r.data),

  listMine: (params?: Record<string, string | number>) =>
    api.get<PaginatedResponse<Order>>('/orders/mine', { params }).then(r => r.data),

  getOne: (id: string) =>
    api.get<ApiResponse<Order>>(`/orders/${id}`).then(r => r.data),

  place: (data: unknown) =>
    api.post<ApiResponse<Order>>('/orders', data).then(r => r.data),

  updateStatus: (id: string, status: string, trackingNumber?: string) =>
    api.patch<ApiResponse<Order>>(`/orders/${id}/status`, { status, trackingNumber }).then(r => r.data),

  cancel: (id: string, reason?: string) =>
    api.patch<ApiResponse<Order>>(`/orders/${id}/cancel`, { reason }).then(r => r.data),
}
