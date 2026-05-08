import { useI18n } from '../../contexts/I18nContext'

export default function Editorial() {
  const { t } = useI18n()
  return (
    <section style={{ background: 'var(--bone)' }}>
      <div className="editorial">
        <div className="editorial__media" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1567608198166-2a4ff21ee0ef?auto=format&fit=crop&w=1400&q=80)" }}>
          <div className="stamp" style={{ whiteSpace: 'pre-line' }}>{t('story_stamp')}</div>
        </div>
        <div>
          <div className="eyebrow-line" style={{ marginBottom: 22 }}>{t('story_eyebrow')}</div>
          <h2 style={{ whiteSpace: 'pre-line' }}>{t('story_title')}</h2>
          <p style={{ marginTop: 24, color: 'var(--ink-2)', lineHeight: 1.75, fontSize: 14 }}>{t('story_p1')}</p>
          <p style={{ marginTop: 14, color: 'var(--ink-2)', lineHeight: 1.75, fontSize: 14 }}>{t('story_p2')}</p>
          <button className="btn btn--ghost" style={{ marginTop: 24 }}>{t('story_cta')}</button>
        </div>
      </div>
    </section>
  )
}
