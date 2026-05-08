export interface ProductImage {
  id: string
  product_id: string
  url: string
  alt_text: string | null
  sort_order: number
  is_primary: boolean
  created_at: Date
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: string
  compare_at_price: string | null
  stock: number
  sku: string | null
  category_id: string | null
  category_name: string | null
  is_published: boolean
  is_featured: boolean
  weight_grams: number | null
  images: ProductImage[]
  created_by: string | null
  created_at: Date
  updated_at: Date
}

export interface CreateProductDto {
  name: string
  description?: string
  price: number
  compareAtPrice?: number
  stock: number
  sku?: string
  categoryId?: string
  isPublished?: boolean
  isFeatured?: boolean
  weightGrams?: number
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}

export interface ProductFilters {
  category?: string
  search?: string
  page?: number
  limit?: number
  published?: boolean
  featured?: boolean
}
