import { useI18n } from '../../contexts/I18nContext'

export default function NewsletterBand() {
  const { t } = useI18n()
  return (
    <section className="band">
      <div className="band__inner">
        <div>
          <div className="eyebrow-line" style={{ color: 'var(--gold-2)', marginBottom: 14 }}>{t('news_eyebrow')}</div>
          <h3 style={{ whiteSpace: 'pre-line' }}>{t('news_title')}</h3>
          <p>{t('news_p')}</p>
        </div>
        <form className="news-form" onSubmit={e => e.preventDefault()}>
          <input type="email" placeholder={t('news_placeholder')} />
          <button type="submit">{t('news_cta')}</button>
        </form>
      </div>
    </section>
  )
}
