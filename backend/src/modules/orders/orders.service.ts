import { pool } from '../../config/database'
import { AppError } from '../../shared/errors/AppError'
import { OrdersRepository } from './orders.repository'
import { CartRepository } from '../cart/cart.repository'
import { PlaceOrderDto, UpdateOrderStatusDto } from './orders.types'

const repo = new OrdersRepository()
const cartRepo = new CartRepository()

export async function listAll(filters: { status?: string; page?: number; limit?: number }) {
  return repo.findAll(filters)
}

export async function listMine(userId: string, page?: number, limit?: number) {
  return repo.findByUser(userId, page, limit)
}

export async function getOrder(id: string, userId: string, role: string) {
  const order = await repo.findById(id)
  if (!order) throw AppError.notFound('Order')
  if (role === 'client' && order.user_id !== userId) throw AppError.forbidden()
  return order
}

export async function placeOrder(userId: string, dto: PlaceOrderDto) {
  const cart = await cartRepo.findByUser(userId)
  if (!cart || !cart.items.length) throw AppError.badRequest('Cart is empty')

  const items = cart.items.map(i => ({
    productId:   i.product_id,
    productName: i.product_name,
    productSku:  i.product_sku ?? null,
    quantity:    i.quantity,
    unitPrice:   parseFloat(i.price),
  }))

  const subtotal = items.reduce((s, i) => s + i.unitPrice * i.quantity, 0)
  const shippingCost = subtotal >= 50 ? 0 : 4.99
  const taxAmount = +(subtotal * 0.21).toFixed(2)
  const total = +(subtotal + shippingCost + taxAmount).toFixed(2)

  const order = await repo.create(userId, dto, items, { subtotal, shippingCost, taxAmount, total })
  await cartRepo.clearCart(cart.id)
  return order
}

export async function updateStatus(id: string, dto: UpdateOrderStatusDto) {
  const order = await repo.findById(id)
  if (!order) throw AppError.notFound('Order')
  return repo.updateStatus(id, dto)
}

export async function cancelOrder(id: string, userId: string, role: string, reason?: string) {
  const order = await repo.findById(id)
  if (!order) throw AppError.notFound('Order')
  if (role === 'client') {
    if (order.user_id !== userId) throw AppError.forbidden()
    if (order.status !== 'pending') throw AppError.badRequest('Only pending orders can be cancelled')
  }
  return repo.updateStatus(id, { status: 'cancelled', cancelReason: reason })
}

export async function deleteOrder(id: string) {
  const deleted = await repo.delete(id)
  if (!deleted) throw AppError.notFound('Order')
}
