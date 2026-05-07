import { useNavigate } from 'react-router-dom'
import { useI18n } from '../../contexts/I18nContext'
import { FEATURED } from '../../data/catalog'
import ProductCard from '../product/ProductCard'
import { useLocalCart } from '../../hooks/useLocalCart'
import { useWishlist } from '../../hooks/useWishlist'
import { ArrowIcon } from '../ui/Icons'

export default function FeaturedProducts() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const cart = useLocalCart()
  const wish = useWishlist()

  return (
    <section className="section section--cream">
      <div className="inner">
        <div className="section-head">
          <div>
            <div className="eyebrow-line" style={{ marginBottom: 18 }}>{t('featured_eyebrow')}</div>
            <h2 style={{ whiteSpace: 'pre-line' }}>{t('featured_title')}</h2>
          </div>
          <div className="right">
            <p style={{ marginBottom: 16 }}>{t('featured_lead')}</p>
            <button className="btn btn--ghost" onClick={() => navigate('/tienda')}>
              {t('view_all')} <ArrowIcon />
            </button>
          </div>
        </div>
        <div className="product-grid">
          {FEATURED.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              onAdd={() => cart.add(p.id)}
              onView={() => navigate(`/producto/${p.id}`)}
              wished={wish.has(p.id)}
              onToggleWish={() => wish.toggle(p.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
