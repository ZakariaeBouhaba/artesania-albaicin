import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '../../contexts/I18nContext'
import { PRODUCTS } from '../../data/catalog'
import { useLocalCart } from '../../hooks/useLocalCart'
import { ArrowIcon } from '../../components/ui/Icons'

type PayMethod = 'card' | 'paypal' | 'apple' | 'bank'

export default function CheckoutPage() {
  const { lang, t } = useI18n()
  const navigate = useNavigate()
  const cart = useLocalCart()
  const [step, setStep] = useState(0)
  const [pay, setPay] = useState<PayMethod>('card')

  const steps = [t('step_info'), t('step_ship'), t('step_pay')]
  const shipping = cart.subtotal >= 120 ? 0 : 8.5
  const total = cart.subtotal + shipping

  function handleComplete() {
    alert(lang === 'es'
      ? '¡Gracias por tu pedido! En 48 h sale del Albaycín.'
      : 'Thank you for your order! It ships from the Albaycín within 48 h.')
    cart.clear()
    navigate('/')
  }

  return (
    <div className="checkout-page">
      <div className="checkout-page__inner">
        <div>
          <div className="crumbs" style={{ marginBottom: 18 }}>
            <a onClick={() => navigate('/')}>{lang === 'es' ? 'Inicio' : 'Home'}</a>
            <span className="sep">/</span>
            <a>{t('checkout_title')}</a>
          </div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 500, marginBottom: 24, lineHeight: 1 }}>
            {t('checkout_title')}
          </h1>

          <div className="checkout-stepper">
            {steps.map((s, i) => (
              <>
                <div key={i} className={`step ${i === step ? 'active' : ''}`} onClick={() => setStep(i)} style={{ cursor: 'pointer' }}>
                  <span className="num">{i + 1}</span>{s}
                </div>
                {i < steps.length - 1 && <span key={`sep-${i}`} className="sep">———</span>}
              </>
            ))}
          </div>

          <div className="form-block">
            <h3>{t('contact')}</h3>
            <div className="sub">{t('contact_sub')}</div>
            <div className="form-grid">
              <div className="input full"><label>{t('email')}</label><input type="email" placeholder="tucorreo@ejemplo.com" /></div>
            </div>
          </div>

          <div className="form-block">
            <h3>{t('shipping_addr')}</h3>
            <div className="sub">{t('shipping_sub')}</div>
            <div className="form-grid">
              <div className="input"><label>{t('first_name')}</label><input /></div>
              <div className="input"><label>{t('last_name')}</label><input /></div>
              <div className="input full"><label>{t('addr1')}</label><input placeholder="Cuesta del Chapiz, 14" /></div>
              <div className="input full"><label>{t('addr2')}</label><input /></div>
              <div className="input"><label>{t('city')}</label><input /></div>
              <div className="input"><label>{t('postal')}</label><input /></div>
              <div className="input">
                <label>{t('country')}</label>
                <select defaultValue="ES">
                  <option value="ES">España</option>
                  <option value="FR">France</option>
                  <option value="GB">United Kingdom</option>
                  <option value="DE">Deutschland</option>
                  <option value="MA">المغرب · Maroc</option>
                  <option value="US">United States</option>
                </select>
              </div>
              <div className="input"><label>{t('phone')}</label><input type="tel" /></div>
            </div>
          </div>

          <div className="form-block">
            <h3>{t('payment')}</h3>
            <div className="sub">{t('payment_sub')}</div>
            <div className="pay-options">
              {([
                { id: 'card' as PayMethod, n: t('pay_card'), icons: 'VISA · MC · AMEX' },
                { id: 'paypal' as PayMethod, n: t('pay_paypal'), icons: 'PAYPAL' },
                { id: 'apple' as PayMethod, n: t('pay_apple'), icons: '' },
                { id: 'bank' as PayMethod, n: t('pay_bank'), icons: 'SEPA' },
              ]).map(p => (
                <div key={p.id} className={`pay-option ${pay === p.id ? 'active' : ''}`} onClick={() => setPay(p.id)}>
                  <span className="radio" />
                  <span className="name">{p.n}</span>
                  <span className="icons">{p.icons}</span>
                </div>
              ))}
            </div>
            {pay === 'card' && (
              <div className="form-grid" style={{ marginTop: 16 }}>
                <div className="input full"><label>{lang === 'es' ? 'Número de tarjeta' : 'Card number'}</label><input placeholder="•••• •••• •••• ••••" /></div>
                <div className="input"><label>{lang === 'es' ? 'Caducidad' : 'Expiry'}</label><input placeholder="MM / AA" /></div>
                <div className="input"><label>CVC</label><input placeholder="•••" /></div>
              </div>
            )}
          </div>

          <button className="btn btn--gold" style={{ padding: '18px 36px', fontSize: 13 }} onClick={handleComplete}>
            {t('complete_order')} · €{total.toFixed(2)} <ArrowIcon />
          </button>
        </div>

        <aside className="summary">
          <h4>{t('order_summary')}</h4>
          <div className="lines">
            {cart.items.length === 0 && <p style={{ color: 'var(--muted)', fontSize: 13 }}>{t('cart_empty_t')}</p>}
            {cart.items.map(item => {
              const p = PRODUCTS.find(x => x.id === item.id)
              if (!p) return null
              return (
                <div className="line" key={item.key}>
                  <img src={p.imgs[0]} alt="" />
                  <div>
                    <div className="ttl">{lang === 'es' ? p.es : p.en}</div>
                    <div className="meta">{[item.size, item.color, `× ${item.qty}`].filter(Boolean).join(' · ')}</div>
                  </div>
                  <div className="pr">€{p.price * item.qty}</div>
                </div>
              )
            })}
          </div>
          <div className="totals">
            <div className="row"><span>{t('subtotal')}</span><span>€{cart.subtotal.toFixed(2)}</span></div>
            <div className="row"><span>{t('shipping')}</span><span>{shipping === 0 ? (lang === 'es' ? 'Gratis' : 'Free') : `€${shipping.toFixed(2)}`}</span></div>
            <div className="row"><span>{t('tax')} (10%)</span><span>{t('tax_inc')}</span></div>
            <div className="row total"><span>{t('total')}</span><span>€{total.toFixed(2)}</span></div>
          </div>
          <div className="promo">
            <input placeholder={t('promo_placeholder')} />
            <button className="btn">{t('apply')}</button>
          </div>
        </aside>
      </div>
    </div>
  )
}
