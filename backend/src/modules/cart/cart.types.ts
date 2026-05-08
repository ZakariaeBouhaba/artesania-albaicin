export interface CartItem {
  id: string
  cart_id: string
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
  user_id: string | null
  session_id: string | null
  items: CartItem[]
  total: string
  item_count: number
}
