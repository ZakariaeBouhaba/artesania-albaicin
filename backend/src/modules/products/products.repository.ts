import { pool } from '../../config/database'
import { Product, ProductImage, ProductFilters, CreateProductDto, UpdateProductDto } from './products.types'
import { slugify } from '../../shared/utils/slugify'
import { paginationParams } from '../../shared/utils/pagination'

export class ProductsRepository {
  async findAll(filters: ProductFilters): Promise<{ data: Product[]; total: number }> {
    const { page = 1, limit = 20 } = filters
    const { offset } = paginationParams({ page, limit })
    const conditions: string[] = []
    const params: unknown[] = []
    let idx = 1

    if (filters.published !== undefined) {
      conditions.push(`p.is_published = $${idx++}`)
      params.push(filters.published)
    }
    if (filters.featured) {
      conditions.push(`p.is_featured = $${idx++}`)
      params.push(true)
    }
    if (filters.category) {
      conditions.push(`c.slug = $${idx++}`)
      params.push(filters.category)
    }
    if (filters.search) {
      conditions.push(`p.name ILIKE $${idx++}`)
      params.push(`%${filters.search}%`)
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''

    const dataQuery = `
      SELECT p.*,
             c.name AS category_name,
             COALESCE(
               json_agg(pi ORDER BY pi.sort_order) FILTER (WHERE pi.id IS NOT NULL),
               '[]'
             ) AS images
      FROM products p
      LEFT JOIN categories c ON c.id = p.category_id
      LEFT JOIN product_images pi ON pi.product_id = p.id
      ${where}
      GROUP BY p.id, c.name
      ORDER BY p.created_at DESC
      LIMIT $${idx} OFFSET $${idx + 1}
    `
    const countQuery = `
      SELECT COUNT(DISTINCT p.id)::int AS total
      FROM products p
      LEFT JOIN categories c ON c.id = p.category_id
      ${where}
    `

    const [{ rows }, { rows: countRows }] = await Promise.all([
      pool.query<Product>(dataQuery, [...params, limit, offset]),
      pool.query<{ total: number }>(countQuery, params),
    ])

    return { data: rows, total: countRows[0].total }
  }

  async findBySlug(slug: string): Promise<Product | null> {
    const { rows } = await pool.query<Product>(`
      SELECT p.*,
             c.name AS category_name,
             COALESCE(
               json_agg(pi ORDER BY pi.sort_order) FILTER (WHERE pi.id IS NOT NULL),
               '[]'
             ) AS images
      FROM products p
      LEFT JOIN categories c ON c.id = p.category_id
      LEFT JOIN product_images pi ON pi.product_id = p.id
      WHERE p.slug = $1
      GROUP BY p.id, c.name
    `, [slug])
    return rows[0] ?? null
  }

  async findById(id: string): Promise<Product | null> {
    const { rows } = await pool.query<Product>(`
      SELECT p.*,
             c.name AS category_name,
             COALESCE(
               json_agg(pi ORDER BY pi.sort_order) FILTER (WHERE pi.id IS NOT NULL),
               '[]'
             ) AS images
      FROM products p
      LEFT JOIN categories c ON c.id = p.category_id
      LEFT JOIN product_images pi ON pi.product_id = p.id
      WHERE p.id = $1
      GROUP BY p.id, c.name
    `, [id])
    return rows[0] ?? null
  }

  async create(dto: CreateProductDto, userId: string): Promise<Product> {
    const slug = slugify(dto.name)
    const { rows } = await pool.query<Product>(`
      INSERT INTO products
        (name, slug, description, price, compare_at_price, stock, sku,
         category_id, is_published, is_featured, weight_grams, created_by, updated_by)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$12)
      RETURNING *
    `, [
      dto.name, slug, dto.description ?? null, dto.price,
      dto.compareAtPrice ?? null, dto.stock, dto.sku ?? null,
      dto.categoryId ?? null, dto.isPublished ?? false, dto.isFeatured ?? false,
      dto.weightGrams ?? null, userId,
    ])
    return { ...rows[0], category_name: null, images: [] }
  }

  async update(id: string, dto: UpdateProductDto, userId: string): Promise<Product | null> {
    const fields: string[] = []
    const values: unknown[] = []
    let idx = 1

    const map: Record<string, unknown> = {
      name: dto.name, description: dto.description, price: dto.price,
      compare_at_price: dto.compareAtPrice, stock: dto.stock, sku: dto.sku,
      category_id: dto.categoryId, is_published: dto.isPublished,
      is_featured: dto.isFeatured, weight_grams: dto.weightGrams,
    }

    for (const [col, val] of Object.entries(map)) {
      if (val !== undefined) {
        fields.push(`${col} = $${idx++}`)
        values.push(val)
      }
    }

    if (dto.name) {
      fields.push(`slug = $${idx++}`)
      values.push(slugify(dto.name))
    }

    fields.push(`updated_by = $${idx++}`)
    values.push(userId)

    if (!fields.length) return this.findById(id)

    values.push(id)
    const { rows } = await pool.query<Product>(
      `UPDATE products SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
      values
    )
    return rows[0] ? this.findById(id) : null
  }

  async delete(id: string): Promise<boolean> {
    const { rowCount } = await pool.query('DELETE FROM products WHERE id = $1', [id])
    return (rowCount ?? 0) > 0
  }

  async addImage(productId: string, data: { url: string; altText?: string; sortOrder?: number; isPrimary?: boolean }): Promise<ProductImage> {
    if (data.isPrimary) {
      await pool.query('UPDATE product_images SET is_primary = FALSE WHERE product_id = $1', [productId])
    }
    const { rows } = await pool.query<ProductImage>(`
      INSERT INTO product_images (product_id, url, alt_text, sort_order, is_primary)
      VALUES ($1, $2, $3, $4, $5) RETURNING *
    `, [productId, data.url, data.altText ?? null, data.sortOrder ?? 0, data.isPrimary ?? false])
    return rows[0]
  }

  async deleteImage(productId: string, imageId: string): Promise<boolean> {
    const { rowCount } = await pool.query(
      'DELETE FROM product_images WHERE id = $1 AND product_id = $2',
      [imageId, productId]
    )
    return (rowCount ?? 0) > 0
  }
}
