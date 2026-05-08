import { useNavigate } from 'react-router-dom'
import { useI18n } from '../../contexts/I18nContext'
import { PRODUCTS } from '../../data/catalog'
import { CartItem } from '../../hooks/useLocalCart'
import { XIcon, ArrowIcon } from '../ui/Icons'

interface Props {
  open: boolean
  onClose: () => void
  items: CartItem[]
  count: number
  subtotal: number
  updateQty: (key: string, qty: number) => void
  remove: (key: string) => void
}

export default function CartDrawer({ open, onClose, items, count, subtotal, updateQty, remove }: Props) {
  const { lang, t } = useI18n()
  const navigate = useNavigate()

  const goCheckout = () => { onClose(); navigate('/checkout') }
  const goShop = () => { onClose(); navigate('/tienda') }

  return (
    <>
      <div className={`drawer-overlay ${open ? 'open' : ''}`} onClick={onClose} />
      <aside className={`drawer ${open ? 'open' : ''}`}>
        <div className="drawer__head">
          <h3>
            {t('cart')}
            <span className="count">{count} {lang === 'es' ? `pieza${count !== 1 ? 's' : ''}` : `item${count !== 1 ? 's' : ''}`}</span>
          </h3>
          <button className="icon-btn" onClick={onClose}><XIcon /></button>
        </div>

        <div className="drawer__body">
          {items.length === 0 ? (
            <div className="empty-cart">
              <h4>{t('cart_empty_t')}</h4>
              <p>{t('cart_empty_p')}</p>
              <button className="btn" style={{ marginTop: 20 }} onClick={goShop}>{t('cart_empty_cta')}</button>
            </div>
          ) : (
            items.map(item => {
              const p = PRODUCTS.find(x => x.id === item.id)
              if (!p) return null
              return (
                <div className="cart-line" key={item.key}>
                  <img src={p.imgs[0]} alt="" />
                  <div>
                    <h5>{lang === 'es' ? p.es : p.en}</h5>
                    <div className="meta-line">{[item.size, item.color].filter(Boolean).join(' · ')}</div>
                    <div className="qty-mini">
                      <button onClick={() => updateQty(item.key, item.qty - 1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.key, item.qty + 1)}>+</button>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                    <div className="price">€{p.price * item.qty}</div>
                    <button className="remove" onClick={() => remove(item.key)}>
                      {lang === 'es' ? 'Quitar' : 'Remove'}
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {items.length > 0 && (
          <div className="drawer__foot">
            <div className="subtotal">
              <span className="label">{t('subtotal')}</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase' }}>
              {t('shipping')}: {t('shipping_calc')}
            </div>
            <button className="btn btn--wide" onClick={goCheckout}>
              {t('checkout')} · €{subtotal.toFixed(2)} <ArrowIcon />
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
