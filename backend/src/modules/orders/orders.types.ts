export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'

export interface OrderItem {
  id: string
  order_id: string
  product_id: string | null
  product_name: string
  product_sku: string | null
  quantity: number
  unit_price: string
  total_price: string
}

export interface Order {
  id: string
  user_id: string
  status: OrderStatus
  subtotal: string
  shipping_cost: string
  tax_amount: string
  total: string
  notes: string | null
  shipping_name: string | null
  shipping_address: string | null
  shipping_city: string | null
  shipping_country: string | null
  shipping_postal: string | null
  tracking_number: string | null
  shipped_at: Date | null
  delivered_at: Date | null
  cancelled_at: Date | null
  cancel_reason: string | null
  items?: OrderItem[]
  created_at: Date
  updated_at: Date
}

export interface PlaceOrderDto {
  notes?: string
  shippingName: string
  shippingAddress: string
  shippingCity: string
  shippingCountry: string
  shippingPostal: string
}

export interface UpdateOrderStatusDto {
  status: OrderStatus
  trackingNumber?: string
  cancelReason?: string
}
