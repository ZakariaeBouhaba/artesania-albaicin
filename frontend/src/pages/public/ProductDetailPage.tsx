import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useI18n } from '../../contexts/I18nContext'
import { PRODUCTS, CATEGORIES } from '../../data/catalog'
import ProductCard from '../../components/product/ProductCard'
import { useLocalCart } from '../../hooks/useLocalCart'
import { useWishlist } from '../../hooks/useWishlist'
import { MinusIcon, PlusIcon, HeartIcon, HeartFillIcon, HandIcon, TruckIcon, RefreshIcon } from '../../components/ui/Icons'

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER ?? '34600000000'

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { lang, t } = useI18n()
  const navigate = useNavigate()
  const cart = useLocalCart()
  const wish = useWishlist()

  const product = PRODUCTS.find(p => p.id === slug) ?? PRODUCTS[0]
  const [active, setActive] = useState(0)
  const [size, setSize] = useState<string | null>(null)
  const [colorIdx, setColorIdx] = useState(0)
  const [qty, setQty] = useState(1)

  useEffect(() => { setActive(0); setQty(1); window.scrollTo({ top: 0, behavior: 'instant' }) }, [product.id])

  const name = lang === 'es' ? product.es : product.en
  const desc = lang === 'es' ? product.desc_es : product.desc_en
  const materials = lang === 'es' ? product.materials_es : product.materials_en
  const cat = CATEGORIES.find(c => c.id === product.cat)
  const catName = cat ? (lang === 'es' ? cat.es : cat.en) : ''

  const sizes = product.cat === 'alfombras' ? ['120×80', '200×140', '250×160', '300×200']
    : product.cat === 'ropa' ? ['XS', 'S', 'M', 'L', 'XL']
    : product.cat === 'perfumes' ? ['30 ml', '50 ml', '100 ml']
    : product.cat === 'cuero' ? ['S', 'M', 'L']
    : null

  const colors = product.cat === 'perfumes'
    ? [{ c: '#d4ac5a', n: lang === 'es' ? 'Oro' : 'Gold' }, { c: '#1a2742', n: lang === 'es' ? 'Azul' : 'Blue' }]
    : product.cat === 'alfombras'
    ? [{ c: '#faf5ea', n: lang === 'es' ? 'Crudo' : 'Natural' }, { c: '#a85a32', n: 'Terracotta' }, { c: '#1a2742', n: lang === 'es' ? 'Añil' : 'Indigo' }]
    : null

  const related = PRODUCTS.filter(p => p.cat === product.cat && p.id !== product.id).slice(0, 4)

  const whatsappMsg = encodeURIComponent(
    `¡Hola! Me interesa: *${name}* · €${product.price} · Cantidad: ${qty}\n¿Podéis confirmarme la disponibilidad?`
  )

  return (
    <div className="product-page">
      <div className="product-page__inner">
        <div className="product-gal">
          <div className="thumbs">
            {product.imgs.slice(0, 5).map((src, i) => (
              <img key={i} src={src} className={i === active ? 'active' : ''} onClick={() => setActive(i)} alt="" />
            ))}
          </div>
          <div className="main">
            <img src={product.imgs[active]} alt={name} aria-label={t('view')} />
          </div>
        </div>

        <div className="product-info">
          <div className="crumbs" style={{ marginBottom: 18 }}>
            <a onClick={() => navigate('/')}>{lang === 'es' ? 'Inicio' : 'Home'}</a>
            <span className="sep">/</span>
            <a onClick={() => navigate('/tienda')}>{lang === 'es' ? 'Tienda' : 'Shop'}</a>
            <span className="sep">/</span>
            <a onClick={() => navigate(`/tienda?cat=${product.cat}`)}>{catName}</a>
          </div>

          <div className="cat-label">{catName}</div>
          <h1>{name}</h1>
          <div className="stars">
            {[1,2,3,4,5].map(i => <span key={i} style={{ color: 'var(--gold-deep)' }}>★</span>)}
            <span>· 24 {lang === 'es' ? 'reseñas' : 'reviews'}</span>
          </div>
          <div className="price-row">
            {product.old && <span className="old">€{product.old}</span>}
            <span className="price">€{product.price}</span>
          </div>
          <p className="lede">{desc}</p>

          {colors && (
            <div className="opt-row">
              <div className="label"><span>{t('color')}</span><span className="val">{colors[colorIdx].n}</span></div>
              <div className="opt-pills">
                {colors.map((c, i) => (
                  <button key={i} className={`opt-pill ${i === colorIdx ? 'active' : ''}`} onClick={() => setColorIdx(i)}
                    style={{ paddingLeft: 38, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, borderRadius: '50%', background: c.c, border: '1px solid var(--line-2)' }} />
                    {c.n}
                  </button>
                ))}
              </div>
            </div>
          )}

          {sizes && (
            <div className="opt-row">
              <div className="label"><span>{t('size')}</span><span className="val">{size || (lang === 'es' ? 'Selecciona' : 'Select')}</span></div>
              <div className="opt-pills">
                {sizes.map(s => (
                  <button key={s} className={`opt-pill ${size === s ? 'active' : ''}`} onClick={() => setSize(s)}>{s}</button>
                ))}
              </div>
            </div>
          )}

          <div className="qty-row">
            <div className="qty">
              <button onClick={() => setQty(Math.max(1, qty - 1))}><MinusIcon /></button>
              <input value={qty} readOnly />
              <button onClick={() => setQty(qty + 1)}><PlusIcon /></button>
            </div>
            <button className="btn" onClick={() => { for (let i = 0; i < qty; i++) cart.add(product.id, { size: size ?? undefined, color: colors?.[colorIdx]?.n }) }}>
              {t('add_cart')} · €{product.price * qty}
            </button>
            <button className="icon-btn" style={{ width: 52, height: 52, border: '1px solid var(--ink)' }} onClick={() => wish.toggle(product.id)}>
              {wish.has(product.id) ? <HeartFillIcon /> : <HeartIcon />}
            </button>
          </div>
          <button className="btn btn--cream btn--wide" style={{ marginTop: 10 }} onClick={() => { for (let i = 0; i < qty; i++) cart.add(product.id, { size: size ?? undefined, color: colors?.[colorIdx]?.n }); navigate('/checkout') }}>
            {t('buy_now')}
          </button>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
            target="_blank" rel="noopener noreferrer"
            className="btn btn--gold btn--wide" style={{ marginBottom: 24, display: 'flex' }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
            {lang === 'es' ? 'Pedir por WhatsApp' : 'Order via WhatsApp'}
          </a>

          <ul className="feat-list">
            <li><HandIcon /> {t('handcrafted')}</li>
            <li><TruckIcon /> {t('shipped_from')}</li>
            <li><RefreshIcon /> {t('returns_30')}</li>
            <li><TruckIcon /> {t('free_ship')}</li>
          </ul>

          <div style={{ marginTop: 36, paddingTop: 28, borderTop: '1px solid var(--line)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, fontSize: 13 }}>
            <div>
              <div className="cat-label" style={{ marginBottom: 6 }}>{t('origin')}</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 17 }}>{product.origin}</div>
            </div>
            <div>
              <div className="cat-label" style={{ marginBottom: 6 }}>{t('materials')}</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 17 }}>{materials}</div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div style={{ maxWidth: 'var(--container)', margin: '100px auto 0', padding: '0 var(--pad)' }}>
          <div className="section-head" style={{ marginBottom: 36 }}>
            <div>
              <div className="eyebrow-line" style={{ marginBottom: 14 }}>{lang === 'es' ? 'Similares' : 'You may also like'}</div>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>{lang === 'es' ? 'Más piezas de esta familia' : 'More from this family'}</h2>
            </div>
          </div>
          <div className="product-grid" style={{ marginBottom: 60 }}>
            {related.map(p => (
              <ProductCard
                key={p.id} product={p}
                onView={() => navigate(`/producto/${p.id}`)}
                onAdd={() => cart.add(p.id)}
                wished={wish.has(p.id)}
                onToggleWish={() => wish.toggle(p.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
