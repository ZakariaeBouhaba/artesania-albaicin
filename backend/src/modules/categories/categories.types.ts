export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  parent_id: string | null
  sort_order: number
  children?: Category[]
  created_at: Date
  updated_at: Date
}

export interface CreateCategoryDto {
  name: string
  description?: string
  parentId?: string
  sortOrder?: number
}

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {}
