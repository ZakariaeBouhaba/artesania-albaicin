import { useState, useEffect, useCallback } from 'react'
import { PRODUCTS } from '../data/catalog'

export interface CartItem {
  key: string
  id: string
  qty: number
  size?: string
  color?: string
}

function loadItems(): CartItem[] {
  try { return JSON.parse(localStorage.getItem('aa_cart') || '[]') } catch { return [] }
}

export function useLocalCart() {
  const [items, setItems] = useState<CartItem[]>(loadItems)

  useEffect(() => {
    localStorage.setItem('aa_cart', JSON.stringify(items))
  }, [items])

  const add = useCallback((productId: string, opts: { size?: string; color?: string } = {}) => {
    setItems(prev => {
      const key = productId + '|' + (opts.size || '') + '|' + (opts.color || '')
      const existing = prev.find(i => i.key === key)
      if (existing) return prev.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { key, id: productId, qty: 1, size: opts.size, color: opts.color }]
    })
  }, [])

  const updateQty = useCallback((key: string, qty: number) => {
    if (qty <= 0) return setItems(prev => prev.filter(i => i.key !== key))
    setItems(prev => prev.map(i => i.key === key ? { ...i, qty } : i))
  }, [])

  const remove = useCallback((key: string) => {
    setItems(prev => prev.filter(i => i.key !== key))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const count = items.reduce((s, i) => s + i.qty, 0)

  const subtotal = items.reduce((s, i) => {
    const p = PRODUCTS.find(p => p.id === i.id)
    return s + (p?.price || 0) * i.qty
  }, 0)

  return { items, add, updateQty, remove, clear, count, subtotal }
}
