import { useState, useEffect, useCallback } from 'react'

function loadIds(): string[] {
  try { return JSON.parse(localStorage.getItem('aa_wish') || '[]') } catch { return [] }
}

export function useWishlist() {
  const [ids, setIds] = useState<string[]>(loadIds)

  useEffect(() => {
    localStorage.setItem('aa_wish', JSON.stringify(ids))
  }, [ids])

  const toggle = useCallback((id: string) => {
    setIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }, [])

  const has = useCallback((id: string) => ids.includes(id), [ids])

  return { ids, toggle, has, count: ids.length }
}
