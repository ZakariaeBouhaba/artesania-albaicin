import { useNavigate } from 'react-router-dom'
import { useI18n } from '../../contexts/I18nContext'
import { ArrowIcon } from '../ui/Icons'

type Lang = 'es' | 'en'

const COLLECTIONS = [
  {
    id: 'al-andalus',
    img: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?auto=format&fit=crop&w=800&q=80',
    es: { name: 'Al-Ándalus', desc: 'Alfombras, cerámica y tejidos del legado andalusí.' },
    en: { name: 'Al-Andalus', desc: 'Rugs, ceramics and textiles of Andalusian heritage.' },
  },
  {
    id: 'bereber',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
    es: { name: 'Atlas Bereber', desc: 'Lana del Atlas, tintes naturales, nudos del tiempo.' },
    en: { name: 'Berber Atlas', desc: 'Atlas wool, natural dyes, knots of time.' },
  },
  {
    id: 'perfumeria',
    img: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=800&q=80',
    es: { name: 'Perfumería Árabe', desc: 'Aceites de argán, agua de rosas y ámbar gris.' },
    en: { name: 'Arabian Perfumery', desc: 'Argan oils, rose water and ambergris.' },
  },
] as const

export default function FeaturedCollections() {
  const { t, lang } = useI18n()
  const navigate = useNavigate()

  return (
    <section className="collections">
      <div className="collections__inner">
        <div className="eyebrow-line" style={{ marginBottom: 14 }}>{t('cols_eyebrow')}</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 500, lineHeight: 1, margin: 0, whiteSpace: 'pre-line' }}>
            {t('cols_title')}
          </h2>
          <button
            className="btn btn--ghost"
            onClick={() => navigate('/colecciones')}
            style={{ flexShrink: 0 }}
          >
            {t('cols_cta')} <ArrowIcon />
          </button>
        </div>

        <div className="col-grid">
          {COLLECTIONS.map((col) => {
            const copy = col[lang as Lang] ?? col.es
            return (
              <article
                key={col.id}
                className="col-card"
                onClick={() => navigate('/colecciones')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && navigate('/colecciones')}
                aria-label={copy.name}
              >
                <img src={col.img} alt={copy.name} loading="lazy" />
                <div className="col-card__veil" />
                <div className="col-card__body">
                  <h3>{copy.name}</h3>
                  <p>{copy.desc}</p>
                  <div className="col-card__arrow">
                    {t('view_all')} <ArrowIcon width={14} height={14} />
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
