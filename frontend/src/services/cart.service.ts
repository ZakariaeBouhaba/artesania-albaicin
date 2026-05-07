import { api } from './api'
import { ApiResponse, Cart } from '../types/api.types'

const sessionId = () => {
  let id = localStorage.getItem('session_id')
  if (!id) { id = crypto.randomUUID(); localStorage.setItem('session_id', id) }
  return id
}
const headers = () => ({ 'x-session-id': sessionId() })

export const cartService = {
  get: () =>
    api.get<ApiResponse<Cart>>('/cart', { headers: headers() }).then(r => r.data),

  addItem: (productId: string, quantity: number) =>
    api.post<ApiResponse<Cart>>('/cart/items', { productId, quantity }, { headers: headers() }).then(r => r.data),

  updateItem: (productId: string, quantity: number) =>
    api.patch<ApiResponse<Cart>>(`/cart/items/${productId}`, { quantity }, { headers: headers() }).then(r => r.data),

  removeItem: (productId: string) =>
    api.delete<ApiResponse<Cart>>(`/cart/items/${productId}`, { headers: headers() }).then(r => r.data),

  clear: () =>
    api.delete<ApiResponse<Cart>>('/cart', { headers: headers() }).then(r => r.data),

  merge: () =>
    api.post<ApiResponse<Cart>>('/cart/merge', { sessionId: sessionId() }).then(r => r.data),
}
