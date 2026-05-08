import { pool } from '../../config/database'
import { Cart, CartItem } from './cart.types'

export class CartRepository {
  async findByUser(userId: string): Promise<(Cart & { items: any[] }) | null> {
    const { rows: [cart] } = await pool.query(
      'SELECT * FROM carts WHERE user_id = $1', [userId]
    )
    if (!cart) return null
    return { ...cart, items: await this.getItems(cart.id) }
  }

  async findBySession(sessionId: string): Promise<(Cart & { items: any[] }) | null> {
    const { rows: [cart] } = await pool.query(
      'SELECT * FROM carts WHERE session_id = $1', [sessionId]
    )
    if (!cart) return null
    return { ...cart, items: await this.getItems(cart.id) }
  }

  async getItems(cartId: string) {
    const { rows } = await pool.query(`
      SELECT ci.id, ci.cart_id, ci.product_id, ci.quantity,
             p.name AS product_name, p.slug AS product_slug, p.price, p.stock,
             p.sku AS product_sku,
             (SELECT url FROM product_images WHERE product_id = p.id AND is_primary = TRUE LIMIT 1) AS image_url,
             (ci.quantity * p.price::numeric)::text AS subtotal
      FROM cart_items ci
      JOIN products p ON p.id = ci.product_id
      WHERE ci.cart_id = $1
      ORDER BY ci.created_at
    `, [cartId])
    return rows
  }

  async createCart(data: { userId?: string; sessionId?: string }): Promise<{ id: string }> {
    const { rows } = await pool.query(
      'INSERT INTO carts (user_id, session_id) VALUES ($1, $2) RETURNING id',
      [data.userId ?? null, data.sessionId ?? null]
    )
    return rows[0]
  }

  async upsertItem(cartId: string, productId: string, quantity: number): Promise<void> {
    await pool.query(`
      INSERT INTO cart_items (cart_id, product_id, quantity)
      VALUES ($1, $2, $3)
      ON CONFLICT (cart_id, product_id)
      DO UPDATE SET quantity = $3, updated_at = NOW()
    `, [cartId, productId, quantity])
  }

  async removeItem(cartId: string, productId: string): Promise<void> {
    await pool.query(
      'DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2',
      [cartId, productId]
    )
  }

  async clearCart(cartId: string): Promise<void> {
    await pool.query('DELETE FROM cart_items WHERE cart_id = $1', [cartId])
  }

  async mergeGuestCart(guestCartId: string, userCartId: string): Promise<void> {
    const { rows: guestItems } = await pool.query<{ product_id: string; quantity: number }>(
      'SELECT product_id, quantity FROM cart_items WHERE cart_id = $1', [guestCartId]
    )
    for (const item of guestItems) {
      await pool.query(`
        INSERT INTO cart_items (cart_id, product_id, quantity)
        VALUES ($1, $2, $3)
        ON CONFLICT (cart_id, product_id)
        DO UPDATE SET quantity = cart_items.quantity + $3, updated_at = NOW()
      `, [userCartId, item.product_id, item.quantity])
    }
    await pool.query('DELETE FROM carts WHERE id = $1', [guestCartId])
  }
}
