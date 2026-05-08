import { useI18n } from '../../contexts/I18nContext'
import { CATEGORIES, Product } from '../../data/catalog'
import { HeartIcon, HeartFillIcon } from '../ui/Icons'

interface Props {
  product: Product
  onAdd: () => void
  onView: () => void
  wished: boolean
  onToggleWish: () => void
}

export default function ProductCard({ product, onAdd, onView, wished, onToggleWish }: Props) {
  const { lang, t } = useI18n()
  const name = lang === 'es' ? product.es : product.en
  const cat = CATEGORIES.find(c => c.id === product.cat)
  const catName = cat ? (lang === 'es' ? cat.es : cat.en) : ''

  return (
    <div className="p-card">
      <div className="imgwrap" onClick={onView}>
        <img src={product.imgs[0]} alt={name} />
        {product.imgs[1] && <img className="alt" src={product.imgs[1]} alt="" />}
        {product.tag === 'new' && <span className="tag new">{t('tag_new')}</span>}
        {product.tag === 'sale' && <span className="tag sale">{t('tag_sale')}</span>}
        <button
          className={`heart ${wished ? 'active' : ''}`}
          onClick={e => { e.stopPropagation(); onToggleWish() }}
        >
          {wished ? <HeartFillIcon /> : <HeartIcon />}
        </button>
        <button className="quick" onClick={e => { e.stopPropagation(); onAdd() }}>
          + {t('add_cart')}
        </button>
      </div>
      <div className="meta">
        <div>
          <div className="cat-label">{catName}</div>
          <h4 style={{ cursor: 'pointer' }} onClick={onView}>{name}</h4>
        </div>
        <div className="price">
          {product.old && <span className="old">€{product.old}</span>}
          €{product.price}
        </div>
      </div>
    </div>
  )
}
