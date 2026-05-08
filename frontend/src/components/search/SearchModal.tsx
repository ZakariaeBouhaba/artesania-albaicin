import { useState, useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '../../contexts/I18nContext'
import { PRODUCTS } from '../../data/catalog'
import ProductCard from '../product/ProductCard'
import { useLocalCart } from '../../hooks/useLocalCart'
import { useWishlist } from '../../hooks/useWishlist'
import { SearchIcon } from '../ui/Icons'

interface Props {
  open: boolean
  onClose: () => void
}

export default function SearchModal({ open, onClose }: Props) {
  const [q, setQ] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { lang, t } = useI18n()
  const navigate = useNavigate()
  const cart = useLocalCart()
  const wish = useWishlist()

  useEffect(() => {
    if (open) { setTimeout(() => inputRef.current?.focus(), 80) }
    else setQ('')
  }, [open])

  const results = useMemo(() => {
    if (!q.trim()) return []
    const ql = q.toLowerCase()
    return PRODUCTS.filter(p =>
      p.es.toLowerCase().includes(ql) ||
      p.en.toLowerCase().includes(ql) ||
      p.materials_es.toLowerCase().includes(ql) ||
      p.origin.toLowerCase().includes(ql)
    ).slice(0, 8)
  }, [q])

  const popular = lang === 'es'
    ? ['Perfume oud', 'Alfombra Beni Ourain', 'Bolso cuero', 'Farol latón', 'Té menta', 'Mano de Fátima']
    : ['Oud perfume', 'Beni Ourain rug', 'Leather bag', 'Brass lantern', 'Mint tea', 'Hand of Fatima']

  return (
    <>
      <div className={`search-overlay ${open ? 'open' : ''}`} onClick={onClose} />
      <div className={`search-modal ${open ? 'open' : ''}`}>
        <div className="search-modal__inner">
          <div className="input-wrap">
            <SearchIcon style={{ width: 22, height: 22, color: 'var(--muted)' }} />
            <input ref={inputRef} placeholder={t('search_placeholder')} value={q} onChange={e => setQ(e.target.value)} />
            <button className="close" onClick={onClose}>{t('search_close')} ✕</button>
          </div>

          {!q && (
            <>
              <h6>{t('search_popular')}</h6>
              <div className="search-suggest">
                {popular.map(p => <button key={p} onClick={() => setQ(p)}>{p}</button>)}
              </div>
            </>
          )}

          {q && results.length > 0 && (
            <>
              <h6>{results.length} {t('results')}</h6>
              <div className="search-results">
                {results.map(p => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onView={() => { onClose(); navigate(`/producto/${p.id}`) }}
                    onAdd={() => cart.add(p.id)}
                    wished={wish.has(p.id)}
                    onToggleWish={() => wish.toggle(p.id)}
                  />
                ))}
              </div>
            </>
          )}

          {q && results.length === 0 && (
            <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--muted)', fontFamily: 'var(--serif)', fontSize: 22, fontStyle: 'italic' }}>
              {t('search_empty').replace('{q}', q)}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
