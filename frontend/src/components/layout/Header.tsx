import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useI18n } from '../../contexts/I18nContext'
import { SearchIcon, HeartIcon, BagIcon, UserIcon } from '../ui/Icons'
import logoImg from '../../assets/logo.png'

interface HeaderProps {
  cartCount: number
  wishCount: number
  onOpenCart: () => void
  onOpenSearch: () => void
}

export default function Header({ cartCount, wishCount, onOpenCart, onOpenSearch }: HeaderProps) {
  const { lang, setLang, t } = useI18n()
  const location = useLocation()
  const navigate = useNavigate()

  const isShop = location.pathname.startsWith('/tienda')

  return (
    <header className="header">
      <div className="header-inner">
        <nav className="nav">
          <Link to="/tienda" className={isShop ? 'active' : ''}>{t('nav_shop')}</Link>
          <Link to="/tienda" className="">{t('nav_collections')}</Link>
          <a>{t('nav_artisans')}</a>
          <a>{t('nav_journal')}</a>
          <a>{t('nav_visit')}</a>
        </nav>

        <Link to="/" className="brand-mark">
          <img src={logoImg} alt="Artesanía Albaycín" className="logo-img" />
        </Link>

        <div className="utility">
          <button className="icon-btn" onClick={onOpenSearch} title="Search">
            <SearchIcon />
          </button>
          <Link to="/login" className="icon-btn" title="Account">
            <UserIcon />
          </Link>
          <button className="icon-btn" title="Wishlist" onClick={() => navigate('/favoritos')}>
            <HeartIcon />
            {wishCount > 0 && <span className="badge">{wishCount}</span>}
          </button>
          <button className="icon-btn" onClick={onOpenCart} title="Cart">
            <BagIcon />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>
          <div className="lang-toggle">
            <button className={lang === 'es' ? 'active' : ''} onClick={() => setLang('es')}>ES</button>
            <span className="sep">·</span>
            <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
          </div>
        </div>
      </div>
    </header>
  )
}
