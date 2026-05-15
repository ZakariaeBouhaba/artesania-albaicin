import { useNavigate } from 'react-router-dom'
import { useI18n } from '../../contexts/I18nContext'
import { ArrowIcon, PinIcon } from '../ui/Icons'

export default function Hero() {
  const { t } = useI18n()
  const navigate = useNavigate()

  return (
    <section className="hero">
      <img
        className="hero__img"
        src="/hero-alhambra.jpg"
        alt="La Alhambra de Granada al atardecer"
        loading="eager"
      />
      <div className="hero__veil" />
      <svg className="hero__pattern" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 600">
        <defs>
          <pattern id="hero-zell" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="#d4ac5a" strokeWidth="0.6">
              <path d="M80 8 L96 40 L128 32 L120 64 L152 80 L120 96 L128 128 L96 120 L80 152 L64 120 L32 128 L40 96 L8 80 L40 64 L32 32 L64 40 Z"/>
              <circle cx="80" cy="80" r="12"/>
              <path d="M80 30 L80 50 M80 110 L80 130 M30 80 L50 80 M110 80 L130 80"/>
            </g>
          </pattern>
        </defs>
        <rect width="800" height="600" fill="url(#hero-zell)"/>
      </svg>

      <div className="hero__inner">
        <div className="eyebrow-line hero__eyebrow">{t('hero_eyebrow')}</div>
        <h1>
          {t('hero_title_pre')}<br />
          <em>{t('hero_title_em')}</em><br />
          {t('hero_title_post')}
        </h1>
        <p className="hero__sub">{t('hero_sub')}</p>
        <div className="hero__cta">
          <button className="btn btn--cream" onClick={() => navigate('/tienda')}>
            {t('hero_cta_main')} <ArrowIcon />
          </button>
          <button className="btn btn--outline" style={{ color: 'var(--bone)', borderColor: 'rgba(250,245,234,.4)' }}>
            {t('hero_cta_alt')}
          </button>
        </div>
      </div>

      <div className="hero__meta">
        <div className="left">
          <PinIcon style={{ display: 'inline', verticalAlign: '-2px', marginRight: 8 }} />
          {t('hero_meta_left')}
        </div>
        <div className="right">
          <span><strong>87</strong>&nbsp;&nbsp;{t('hero_meta_artisans')}</span>
          <span><strong>12</strong>&nbsp;&nbsp;{t('hero_meta_collections')}</span>
          <span><strong>1987</strong>&nbsp;&nbsp;EST.</span>
        </div>
      </div>
    </section>
  )
}
