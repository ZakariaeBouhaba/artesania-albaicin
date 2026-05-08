import { useI18n } from '../../contexts/I18nContext'
import { CATEGORIES } from '../../data/catalog'
import { IGIcon, FBIcon, PinterestIcon } from '../ui/Icons'

export default function Footer() {
  const { t } = useI18n()
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="name">Artesanía<br />Albaycín</div>
            <div className="sub">Granada · Est. 1987</div>
            <p>{t('footer_about')}</p>
          </div>
          <div className="footer__col">
            <h5>{t('footer_shop')}</h5>
            <ul>
              {CATEGORIES.slice(0, 6).map(c => (
                <li key={c.id}><a>{c.es}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer__col">
            <h5>{t('footer_help')}</h5>
            <ul>
              <li><a>{t('footer_h_ship')}</a></li>
              <li><a>{t('footer_h_size')}</a></li>
              <li><a>{t('footer_h_contact')}</a></li>
              <li><a>{t('footer_h_faq')}</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h5>{t('footer_about_h')}</h5>
            <ul>
              <li><a>{t('footer_a_story')}</a></li>
              <li><a>{t('footer_a_artisans')}</a></li>
              <li><a>{t('footer_a_journal')}</a></li>
              <li><a>{t('footer_a_visit')}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>{t('footer_legal')}</span>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <a>{t('footer_terms')}</a>
            <a>{t('footer_privacy')}</a>
            <div className="socials">
              <a><IGIcon /></a>
              <a><FBIcon /></a>
              <a><PinterestIcon /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
