import { pool } from '../../config/database'
import { Order, OrderItem, PlaceOrderDto, UpdateOrderStatusDto } from './orders.types'
import { buildPaginationMeta, paginationParams } from '../../shared/utils/pagination'

export class OrdersRepository {
  async findAll(filters: { status?: string; page?: number; limit?: number }) {
    const { page = 1, limit = 20 } = filters
    const { offset } = paginationParams({ page, limit })
    const conditions: string[] = []
    const params: unknown[] = []
    let idx = 1

    if (filters.status) { conditions.push(`o.status = $${idx++}`); params.push(filters.status) }
    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''

    const [{ rows }, { rows: count }] = await Promise.all([
      pool.query<Order>(`
        SELECT o.*, u.email AS user_email, u.first_name, u.last_name
        FROM orders o
        JOIN users u ON u.id = o.user_id
        ${where}
        ORDER BY o.created_at DESC
        LIMIT $${idx} OFFSET $${idx + 1}
      `, [...params, limit, offset]),
      pool.query<{ total: number }>(`SELECT COUNT(*)::int AS total FROM orders o ${where}`, params),
    ])
    return { data: rows, total: count[0].total, meta: buildPaginationMeta(page, limit, count[0].total) }
  }

  async findByUser(userId: string, page = 1, limit = 20) {
    const { offset } = paginationParams({ page, limit })
    const [{ rows }, { rows: count }] = await Promise.all([
      pool.query<Order>(
        `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3`,
        [userId, limit, offset]
      ),
      pool.query<{ total: number }>(
        'SELECT COUNT(*)::int AS total FROM orders WHERE user_id = $1', [userId]
      ),
    ])
    return { data: rows, meta: buildPaginationMeta(page, limit, count[0].total) }
  }

  async findById(id: string): Promise<Order | null> {
    const { rows } = await pool.query<Order>(
      `SELECT o.*, u.email AS user_email, u.first_name, u.last_name
       FROM orders o JOIN users u ON u.id = o.user_id
       WHERE o.id = $1`, [id]
    )
    if (!rows[0]) return null
    const { rows: items } = await pool.query<OrderItem>(
      'SELECT * FROM order_items WHERE order_id = $1', [id]
    )
    return { ...rows[0], items }
  }

  async create(
    userId: string,
    dto: PlaceOrderDto,
    items: Array<{ productId: string; productName: string; productSku: string | null; quantity: number; unitPrice: number }>,
    totals: { subtotal: number; shippingCost: number; taxAmount: number; total: number }
  ): Promise<Order> {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')

      // Deduct stock with row-level locks
      for (const item of items) {
        const { rows } = await client.query<{ stock: number }>(
          'SELECT stock FROM products WHERE id = $1 FOR UPDATE', [item.productId]
        )
        if (!rows[0] || rows[0].stock < item.quantity) {
          throw new Error(`Insufficient stock for product ${item.productId}`)
        }
        await client.query(
          'UPDATE products SET stock = stock - $1 WHERE id = $2', [item.quantity, item.productId]
        )
      }

      const { rows: [order] } = await client.query<Order>(`
        INSERT INTO orders
          (user_id, subtotal, shipping_cost, tax_amount, total, notes,
           shipping_name, shipping_address, shipping_city, shipping_country, shipping_postal)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
        RETURNING *
      `, [
        userId, totals.subtotal, totals.shippingCost, totals.taxAmount, totals.total,
        dto.notes ?? null, dto.shippingName, dto.shippingAddress,
        dto.shippingCity, dto.shippingCountry, dto.shippingPostal,
      ])

      for (const item of items) {
        await client.query(`
          INSERT INTO order_items (order_id, product_id, product_name, product_sku, quantity, unit_price, total_price)
          VALUES ($1,$2,$3,$4,$5,$6,$7)
        `, [order.id, item.productId, item.productName, item.productSku, item.quantity, item.unitPrice, item.quantity * item.unitPrice])
      }

      await client.query('COMMIT')
      return order
    } catch (err) {
      await client.query('ROLLBACK')
      throw err
    } finally {
      client.release()
    }
  }

  async updateStatus(id: string, dto: UpdateOrderStatusDto): Promise<Order | null> {
    const extras: string[] = []
    const values: unknown[] = [dto.status]
    let idx = 2

    if (dto.status === 'shipped' && dto.trackingNumber) {
      extras.push(`tracking_number = $${idx++}`, `shipped_at = NOW()`)
      values.push(dto.trackingNumber)
    }
    if (dto.status === 'delivered') extras.push('delivered_at = NOW()')
    if (dto.status === 'cancelled') {
      extras.push(`cancelled_at = NOW()`)
      if (dto.cancelReason) { extras.push(`cancel_reason = $${idx++}`); values.push(dto.cancelReason) }
    }

    const extraSql = extras.length ? `, ${extras.join(', ')}` : ''
    values.push(id)
    const { rows } = await pool.query<Order>(
      `UPDATE orders SET status = $1 ${extraSql} WHERE id = $${idx} RETURNING *`,
      values
    )
    return rows[0] ?? null
  }

  async delete(id: string): Promise<boolean> {
    const { rowCount } = await pool.query('DELETE FROM orders WHERE id = $1', [id])
    return (rowCount ?? 0) > 0
  }
}
