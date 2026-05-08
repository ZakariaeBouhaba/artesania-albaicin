import { AppError } from '../../shared/errors/AppError'
import { CartRepository } from './cart.repository'
import { pool } from '../../config/database'

const repo = new CartRepository()

async function getOrCreateCart(userId?: string, sessionId?: string) {
  if (userId) {
    let cart = await repo.findByUser(userId)
    if (!cart) {
      await repo.createCart({ userId })
      cart = await repo.findByUser(userId)
    }
    return cart!
  }
  if (sessionId) {
    let cart = await repo.findBySession(sessionId)
    if (!cart) {
      await repo.createCart({ sessionId })
      cart = await repo.findBySession(sessionId)
    }
    return cart!
  }
  throw AppError.badRequest('Session ID required for guest cart')
}

function computeTotal(items: Array<{ subtotal: string }>) {
  return items.reduce((sum, i) => sum + parseFloat(i.subtotal), 0).toFixed(2)
}

export async function getCart(userId?: string, sessionId?: string) {
  const cart = await getOrCreateCart(userId, sessionId)
  return { ...cart, total: computeTotal(cart.items), item_count: cart.items.length }
}

export async function addItem(productId: string, quantity: number, userId?: string, sessionId?: string) {
  const { rows: [product] } = await pool.query<{ stock: number }>(
    'SELECT stock FROM products WHERE id = $1 AND is_published = TRUE', [productId]
  )
  if (!product) throw AppError.notFound('Product')
  if (product.stock < quantity) throw AppError.badRequest('Insufficient stock')

  const cart = await getOrCreateCart(userId, sessionId)
  await repo.upsertItem(cart.id, productId, quantity)
  return getCart(userId, sessionId)
}

export async function updateItem(productId: string, quantity: number, userId?: string, sessionId?: string) {
  if (quantity <= 0) return removeItem(productId, userId, sessionId)
  const cart = await getOrCreateCart(userId, sessionId)
  await repo.upsertItem(cart.id, productId, quantity)
  return getCart(userId, sessionId)
}

export async function removeItem(productId: string, userId?: string, sessionId?: string) {
  const cart = await getOrCreateCart(userId, sessionId)
  await repo.removeItem(cart.id, productId)
  return getCart(userId, sessionId)
}

export async function clearCart(userId?: string, sessionId?: string) {
  const cart = await getOrCreateCart(userId, sessionId)
  await repo.clearCart(cart.id)
  return getCart(userId, sessionId)
}

export async function mergeCart(userId: string, sessionId: string) {
  const userCart    = await repo.findByUser(userId)
  const guestCart   = await repo.findBySession(sessionId)
  if (!guestCart) return getCart(userId)
  if (!userCart) {
    await pool.query('UPDATE carts SET user_id = $1, session_id = NULL WHERE id = $2', [userId, guestCart.id])
    return getCart(userId)
  }
  await repo.mergeGuestCart(guestCart.id, userCart.id)
  return getCart(userId)
}
