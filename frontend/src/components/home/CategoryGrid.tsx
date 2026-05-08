import { useNavigate } from 'react-router-dom'
import { useI18n } from '../../contexts/I18nContext'
import { CATEGORIES } from '../../data/catalog'
import { ArrowIcon } from '../ui/Icons'

const sizes = ['size-tall', 'size-wide', 'size-md', 'size-md', 'size-tall-sm', 'size-wide-sm', 'size-sq', 'size-sq', 'size-sq']

export default function CategoryGrid() {
  const { lang, t } = useI18n()
  const navigate = useNavigate()

  return (
    <section className="section section--bone">
      <div className="inner">
        <div className="section-head">
          <div>
            <div className="eyebrow-line" style={{ marginBottom: 18 }}>{t('cats_eyebrow')}</div>
            <h2 style={{ whiteSpace: 'pre-line' }}>{t('cats_title')}</h2>
          </div>
          <div className="right">
            <p>{t('cats_lead')}</p>
          </div>
        </div>
        <div className="cat-grid">
          {CATEGORIES.map((c, i) => (
            <a
              key={c.id}
              className={`cat-card ${sizes[i] || 'size-sq'}`}
              onClick={() => navigate(`/tienda?cat=${c.id}`)}
            >
              <div className="img" style={{ backgroundImage: `url(${c.img})` }} />
              <div className="veil" />
              <div className="body">
                <div>
                  <div className="count">{String(c.count).padStart(2, '0')} {lang === 'es' ? 'piezas' : 'pieces'}</div>
                  <h3>{lang === 'es' ? c.es : c.en}</h3>
                </div>
                <div className="arrow"><ArrowIcon /></div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
