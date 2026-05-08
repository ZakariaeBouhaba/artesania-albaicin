import { pool } from '../../config/database'
import { Category, CreateCategoryDto, UpdateCategoryDto } from './categories.types'
import { slugify } from '../../shared/utils/slugify'

export class CategoriesRepository {
  async findAll(): Promise<Category[]> {
    const { rows } = await pool.query<Category>(
      'SELECT * FROM categories ORDER BY sort_order, name'
    )
    return rows
  }

  async findBySlug(slug: string): Promise<Category | null> {
    const { rows } = await pool.query<Category>(
      'SELECT * FROM categories WHERE slug = $1', [slug]
    )
    return rows[0] ?? null
  }

  async findById(id: string): Promise<Category | null> {
    const { rows } = await pool.query<Category>(
      'SELECT * FROM categories WHERE id = $1', [id]
    )
    return rows[0] ?? null
  }

  async create(dto: CreateCategoryDto): Promise<Category> {
    const slug = slugify(dto.name)
    const { rows } = await pool.query<Category>(`
      INSERT INTO categories (name, slug, description, parent_id, sort_order)
      VALUES ($1, $2, $3, $4, $5) RETURNING *
    `, [dto.name, slug, dto.description ?? null, dto.parentId ?? null, dto.sortOrder ?? 0])
    return rows[0]
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<Category | null> {
    const fields: string[] = []
    const values: unknown[] = []
    let idx = 1

    if (dto.name !== undefined)        { fields.push(`name = $${idx++}`);        values.push(dto.name); fields.push(`slug = $${idx++}`); values.push(slugify(dto.name)) }
    if (dto.description !== undefined) { fields.push(`description = $${idx++}`); values.push(dto.description) }
    if (dto.parentId !== undefined)    { fields.push(`parent_id = $${idx++}`);   values.push(dto.parentId) }
    if (dto.sortOrder !== undefined)   { fields.push(`sort_order = $${idx++}`);  values.push(dto.sortOrder) }

    if (!fields.length) return this.findById(id)

    values.push(id)
    const { rows } = await pool.query<Category>(
      `UPDATE categories SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
      values
    )
    return rows[0] ?? null
  }

  async delete(id: string): Promise<boolean> {
    const { rowCount } = await pool.query('DELETE FROM categories WHERE id = $1', [id])
    return (rowCount ?? 0) > 0
  }
}
