import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useI18n } from '../../contexts/I18nContext'
import { CATEGORIES, PRODUCTS } from '../../data/catalog'
import ProductCard from '../../components/product/ProductCard'
import { useLocalCart } from '../../hooks/useLocalCart'
import { useWishlist } from '../../hooks/useWishlist'

const PRICE_RANGES = [
  { id: 'p1', es: '< €50',       en: '< €50',        v: [0, 50] as [number, number] },
  { id: 'p2', es: '€50 – €150',  en: '€50 – €150',   v: [50, 150] as [number, number] },
  { id: 'p3', es: '€150 – €400', en: '€150 – €400',  v: [150, 400] as [number, number] },
  { id: 'p4', es: '€400+',       en: '€400+',         v: [400, 99999] as [number, number] },
]

const SWATCHES = [
  { c: '#1a2742', id: 'navy' }, { c: '#b18a3a', id: 'gold' }, { c: '#5a3a1c', id: 'brown' },
  { c: '#a85a32', id: 'terra' }, { c: '#faf5ea', id: 'cream' }, { c: '#1d1a14', id: 'ink' },
  { c: '#8a2a2a', id: 'red' }, { c: '#3a6638', id: 'green' },
]

export default function ShopPage() {
  const { lang, t } = useI18n()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const cart = useLocalCart()
  const wish = useWishlist()

  const [activeCat, setActiveCat] = useState<string | null>(searchParams.get('cat'))
  const [activePrice, setActivePrice] = useState<[number, number] | null>(null)
  const [activeOrigin, setActiveOrigin] = useState<string | null>(null)
  const [activeColor, setActiveColor] = useState<string | null>(null)
  const [sort, setSort] = useState('relevance')
  const [activeQuick, setActiveQuick] = useState('all')

  useEffect(() => {
    const cat = searchParams.get('cat')
    if (cat) setActiveCat(cat)
  }, [searchParams])

  const origins = useMemo(() => {
    const set = new Set<string>()
    PRODUCTS.forEach(p => set.add(p.origin.split('·')[0].trim()))
    return Array.from(set)
  }, [])

  const filtered = useMemo(() => {
    let list = [...PRODUCTS]
    if (activeCat) list = list.filter(p => p.cat === activeCat)
    if (activePrice) list = list.filter(p => p.price >= activePrice[0] && p.price < activePrice[1])
    if (activeOrigin) list = list.filter(p => p.origin.startsWith(activeOrigin))
    if (activeQuick === 'new') list = list.filter(p => p.tag === 'new')
    if (activeQuick === 'sale') list = list.filter(p => p.tag === 'sale')
    if (sort === 'priceasc') list.sort((a, b) => a.price - b.price)
    else if (sort === 'pricedesc') list.sort((a, b) => b.price - a.price)
    else if (sort === 'new') list.sort((a, b) => (b.tag === 'new' ? 1 : 0) - (a.tag === 'new' ? 1 : 0))
    return list
  }, [activeCat, activePrice, activeOrigin, activeQuick, sort])

  const clearFilters = () => { setActiveCat(null); setActivePrice(null); setActiveOrigin(null); setActiveColor(null) }

  const currentCat = activeCat ? CATEGORIES.find(c => c.id === activeCat) : null

  return (
    <>
      <div className="catalog-hero">
        <div className="catalog-hero__inner">
          <div className="crumbs">
            <a onClick={() => navigate('/')}>{lang === 'es' ? 'Inicio' : 'Home'}</a>
            <span className="sep">/</span>
            <a>{lang === 'es' ? 'Tienda' : 'Shop'}</a>
            {currentCat && <>
              <span className="sep">/</span>
              <a>{lang === 'es' ? currentCat.es : currentCat.en}</a>
            </>}
          </div>
          <h1>{currentCat ? (lang === 'es' ? currentCat.es : currentCat.en) : t('cat_page_title')}</h1>
          <p>{currentCat ? (lang === 'es' ? currentCat.sub_es : currentCat.sub_en) : t('cat_page_lead')}</p>
        </div>
      </div>

      <div className="catalog-body">
        <div className="catalog-body__inner">
          <aside className="filters">
            <div className="filters__group">
              <h6>{t('filter_cat')}</h6>
              <ul>
                <li className={activeCat === null ? 'active' : ''} onClick={() => setActiveCat(null)}>
                  <span>{lang === 'es' ? 'Todo' : 'All'}</span>
                  <span className="n">{PRODUCTS.length}</span>
                </li>
                {CATEGORIES.map(c => (
                  <li key={c.id} className={activeCat === c.id ? 'active' : ''} onClick={() => setActiveCat(activeCat === c.id ? null : c.id)}>
                    <span>{lang === 'es' ? c.es : c.en}</span>
                    <span className="n">{PRODUCTS.filter(p => p.cat === c.id).length}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="filters__group">
              <h6>{t('filter_price')}</h6>
              <ul>
                {PRICE_RANGES.map(r => (
                  <li key={r.id} className={activePrice && activePrice[0] === r.v[0] ? 'active' : ''} onClick={() => setActivePrice(activePrice && activePrice[0] === r.v[0] ? null : r.v)}>
                    <span>{lang === 'es' ? r.es : r.en}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="filters__group">
              <h6>{t('filter_origin')}</h6>
              <ul>
                {origins.map(o => (
                  <li key={o} className={activeOrigin === o ? 'active' : ''} onClick={() => setActiveOrigin(activeOrigin === o ? null : o)}>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="filters__group">
              <h6>{t('filter_color')}</h6>
              <div className="swatches">
                {SWATCHES.map(s => (
                  <span key={s.id} className={`swatch ${activeColor === s.id ? 'active' : ''}`} style={{ background: s.c }} onClick={() => setActiveColor(activeColor === s.id ? null : s.id)} />
                ))}
              </div>
            </div>
            <button className="btn btn--ghost" onClick={clearFilters} style={{ marginTop: 12, width: '100%', justifyContent: 'center' }}>
              {t('filter_clear')}
            </button>
          </aside>

          <div>
            <div className="catalog-toolbar">
              <div className="count">{filtered.length} {t('results')}</div>
              <div className="right">
                <div style={{ display: 'flex', gap: 4 }}>
                  {[
                    { id: 'all', es: 'Todo', en: 'All' },
                    { id: 'new', es: 'Nuevos', en: 'New' },
                    { id: 'sale', es: 'Rebajas', en: 'Sale' },
                  ].map(q => (
                    <button key={q.id} className="select-mini"
                      style={activeQuick === q.id ? { background: 'var(--ink)', color: 'var(--bone)', borderColor: 'var(--ink)' } : {}}
                      onClick={() => setActiveQuick(q.id)}>
                      {lang === 'es' ? q.es : q.en}
                    </button>
                  ))}
                </div>
                <select className="select-mini" value={sort} onChange={e => setSort(e.target.value)}>
                  <option value="relevance">{t('sort_relevance')}</option>
                  <option value="new">{t('sort_new')}</option>
                  <option value="priceasc">{t('sort_priceasc')}</option>
                  <option value="pricedesc">{t('sort_pricedesc')}</option>
                </select>
              </div>
            </div>

            <div className="product-grid">
              {filtered.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onView={() => navigate(`/producto/${p.id}`)}
                  onAdd={() => cart.add(p.id)}
                  wished={wish.has(p.id)}
                  onToggleWish={() => wish.toggle(p.id)}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: 80, color: 'var(--muted)', fontFamily: 'var(--serif)', fontSize: 22, fontStyle: 'italic' }}>
                {lang === 'es' ? 'Ninguna pieza coincide. Prueba a aflojar los filtros.' : 'No piece matches. Try loosening the filters.'}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
