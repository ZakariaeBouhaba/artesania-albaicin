export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export type UserRole = 'admin' | 'employee' | 'client'

export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  phone: string | null
  role: UserRole
  is_active: boolean
  created_at: string
}

export interface ProductImage {
  id: string
  url: string
  alt_text: string | null
  sort_order: number
  is_primary: boolean
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
  images: ProductImage[]
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  parent_id: string | null
  children?: Category[]
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'

export interface OrderItem {
  id: string
  product_name: string
  product_sku: string | null
  quantity: number
  unit_price: string
  total_price: string
}

export interface Order {
  id: string
  status: OrderStatus
  subtotal: string
  shipping_cost: string
  tax_amount: string
  total: string
  shipping_name: string | null
  shipping_city: string | null
  tracking_number: string | null
  items?: OrderItem[]
  created_at: string
}

export interface CartItem {
  product_id: string
  product_name: string
  product_slug: string
  price: string
  stock: number
  quantity: number
  image_url: string | null
  subtotal: string
}

export interface Cart {
  id: string
  items: CartItem[]
  total: string
  item_count: number
}
