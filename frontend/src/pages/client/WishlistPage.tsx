import { useNavigate } from 'react-router-dom'
import { useI18n } from '../../contexts/I18nContext'
import { PRODUCTS } from '../../data/catalog'
import ProductCard from '../../components/product/ProductCard'
import { useLocalCart } from '../../hooks/useLocalCart'
import { useWishlist } from '../../hooks/useWishlist'
import { ArrowIcon } from '../../components/ui/Icons'

export default function WishlistPage() {
  const { lang } = useI18n()
  const navigate = useNavigate()
  const cart = useLocalCart()
  const wish = useWishlist()

  const items = PRODUCTS.filter(p => wish.has(p.id))

  return (
    <div style={{ padding: 'clamp(48px, 6vw, 80px) var(--pad) 100px', background: 'var(--bone)', minHeight: '60vh' }}>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
        <div className="crumbs" style={{ marginBottom: 12 }}>
          <a onClick={() => navigate('/')}>{lang === 'es' ? 'Inicio' : 'Home'}</a>
          <span className="sep">/</span>
          <a>{lang === 'es' ? 'Favoritos' : 'Wishlist'}</a>
        </div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 500, lineHeight: 1, marginBottom: 12 }}>
          {lang === 'es' ? 'Tus favoritos' : 'Your wishlist'}
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 14, maxWidth: '60ch', marginBottom: 40 }}>
          {lang === 'es'
            ? 'Las piezas que has guardado para volver a ellas.'
            : "The pieces you've saved for later."}
        </p>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 80, color: 'var(--muted)' }}>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 22, fontStyle: 'italic', marginBottom: 18 }}>
              {lang === 'es' ? 'Aún no has guardado nada.' : 'Nothing saved yet.'}
            </p>
            <button className="btn" onClick={() => navigate('/tienda')}>
              {lang === 'es' ? 'Explorar la tienda' : 'Browse the shop'} <ArrowIcon />
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {items.map(p => (
              <ProductCard
                key={p.id} product={p}
                onView={() => navigate(`/producto/${p.id}`)}
                onAdd={() => cart.add(p.id)}
                wished={wish.has(p.id)}
                onToggleWish={() => wish.toggle(p.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
