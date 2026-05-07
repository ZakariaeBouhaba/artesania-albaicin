import { AppError } from '../../shared/errors/AppError'
import { CategoriesRepository } from './categories.repository'
import { Category, CreateCategoryDto, UpdateCategoryDto } from './categories.types'

const repo = new CategoriesRepository()

function buildTree(flat: Category[]): Category[] {
  const map = new Map(flat.map(c => [c.id, { ...c, children: [] as Category[] }]))
  const roots: Category[] = []
  for (const cat of map.values()) {
    if (cat.parent_id) {
      map.get(cat.parent_id)?.children!.push(cat)
    } else {
      roots.push(cat)
    }
  }
  return roots
}

export async function listCategories() {
  const flat = await repo.findAll()
  return buildTree(flat)
}

export async function getCategory(slug: string) {
  const category = await repo.findBySlug(slug)
  if (!category) throw AppError.notFound('Category')
  return category
}

export async function createCategory(dto: CreateCategoryDto) {
  return repo.create(dto)
}

export async function updateCategory(id: string, dto: UpdateCategoryDto) {
  const cat = await repo.update(id, dto)
  if (!cat) throw AppError.notFound('Category')
  return cat
}

export async function deleteCategory(id: string) {
  const deleted = await repo.delete(id)
  if (!deleted) throw AppError.notFound('Category')
}
