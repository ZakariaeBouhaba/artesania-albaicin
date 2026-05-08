import { useI18n } from '../../contexts/I18nContext'

export default function AnnouncementBar() {
  const { t } = useI18n()
  return (
    <div className="announce">
      <span>{t('announce_pre')}</span>
      <span className="dot" />
      <strong>{t('announce_strong')}</strong>
      <span className="dot" />
      <span>{t('announce_post')}</span>
    </div>
  )
}
