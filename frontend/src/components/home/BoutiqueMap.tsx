import { useI18n } from '../../contexts/I18nContext'
import { ArrowIcon } from '../ui/Icons'

function GranadaMap() {
  return (
    <svg className="svg-map" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="map-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0 L0 0 L0 40" fill="none" stroke="#d9ccae" strokeWidth="0.4" opacity="0.5"/>
        </pattern>
      </defs>
      <rect width="600" height="600" fill="#efe6d3"/>
      <rect width="600" height="600" fill="url(#map-grid)"/>
      <path d="M0 320 C 100 310, 180 350, 260 330 C 340 310, 420 360, 600 340" fill="none" stroke="#b18a3a" strokeWidth="1.5" opacity="0.45" strokeDasharray="2 3"/>
      <text x="60" y="312" fontFamily="Cormorant Garamond, serif" fontSize="11" fill="#8a6a23" fontStyle="italic" opacity="0.7">río darro</text>
      <g fill="#faf5ea" stroke="#c4b48f" strokeWidth="0.6">
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 7 }).map((_, col) => (
            <rect key={`${row}-${col}`} x={80 + col * 22} y={120 + row * 24} width={18 + (col % 2) * 4} height={18 + (row % 2) * 4} />
          ))
        )}
      </g>
      <path d="M340 380 Q 380 360, 420 365 Q 460 370, 510 385 Q 540 395, 560 420 L 560 460 L 340 460 Z" fill="#e8dcc1" stroke="#b18a3a" strokeWidth="0.8" opacity="0.6"/>
      <g fill="#5a3a1c" opacity="0.85">
        <rect x="358" y="350" width="14" height="32"/>
        <path d="M356 350 L 374 350 L 374 346 L 370 346 L 370 342 L 366 342 L 366 346 L 360 346 L 360 342 L 356 342 Z"/>
        <rect x="386" y="338" width="20" height="44"/>
        <path d="M384 338 L 408 338 L 408 332 L 404 332 L 404 327 L 400 327 L 400 332 L 392 332 L 392 327 L 388 327 L 388 332 L 384 332 Z"/>
        <rect x="445" y="328" width="26" height="55"/>
        <path d="M443 328 L 473 328 L 473 322 L 469 322 L 469 316 L 465 316 L 465 322 L 451 322 L 451 316 L 447 316 L 447 322 L 443 322 Z"/>
        <rect x="505" y="340" width="20" height="42"/>
      </g>
      <g transform="translate(540, 90)">
        <circle cx="0" cy="0" r="22" fill="none" stroke="#b18a3a" strokeWidth="0.5"/>
        <path d="M0 -22 L 4 -2 L 0 0 L -4 -2 Z" fill="#5a3a1c"/>
        <path d="M0 22 L 4 2 L 0 0 L -4 2 Z" fill="#b18a3a"/>
        <path d="M-22 0 L -2 -4 L 0 0 L -2 4 Z" fill="#b18a3a"/>
        <path d="M22 0 L 2 -4 L 0 0 L 2 4 Z" fill="#b18a3a"/>
        <text y="-26" textAnchor="middle" fontFamily="serif" fontSize="9" fill="#5a3a1c" fontWeight="600">N</text>
      </g>
      <g transform="translate(170, 210)">
        <circle cx="0" cy="0" r="14" fill="#1d1a14"/>
        <circle cx="0" cy="0" r="14" fill="none" stroke="#d4ac5a" strokeWidth="1.5"/>
        <path d="M0 14 L -5 22 L 5 22 Z" fill="#1d1a14"/>
        <text y="3" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="13" fill="#d4ac5a" fontWeight="600">★</text>
      </g>
      <g transform="translate(190, 215)">
        <rect x="0" y="-8" width="104" height="36" fill="#faf5ea" stroke="#b18a3a" strokeWidth="0.5"/>
        <text x="6" y="4" fontFamily="Cormorant Garamond, serif" fontSize="11" fill="#1d1a14" fontWeight="600">ARTESANÍA</text>
        <text x="6" y="16" fontFamily="Cormorant Garamond, serif" fontSize="11" fill="#1d1a14" fontWeight="600">ALBAYCÍN</text>
        <text x="6" y="26" fontFamily="Inter Tight, sans-serif" fontSize="7" fill="#8a6a23" letterSpacing="1">CUESTA DEL CHAPIZ, 14</text>
      </g>
      <g transform="translate(450, 415)">
        <text textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="14" fontStyle="italic" fill="#5a3a1c" letterSpacing="2">La Alhambra</text>
        <line x1="-30" y1="6" x2="30" y2="6" stroke="#b18a3a" strokeWidth="0.5"/>
      </g>
      <g transform="translate(300, 540)">
        <line x1="-80" y1="0" x2="-15" y2="0" stroke="#b18a3a" strokeWidth="0.5"/>
        <line x1="80" y1="0" x2="15" y2="0" stroke="#b18a3a" strokeWidth="0.5"/>
        <g fill="#b18a3a"><path d="M0 -4 L 4 0 L 0 4 L -4 0 Z"/></g>
        <text textAnchor="middle" y="22" fontFamily="Cormorant Garamond, serif" fontSize="16" fill="#1d1a14" letterSpacing="6">GRANADA</text>
        <text textAnchor="middle" y="38" fontFamily="Inter Tight, sans-serif" fontSize="8" fill="#8a6a23" letterSpacing="3">EL ALBAYCÍN · LA ALHAMBRA</text>
      </g>
    </svg>
  )
}

export default function BoutiqueMap() {
  const { t } = useI18n()
  return (
    <section className="boutique">
      <div className="boutique__map">
        <GranadaMap />
      </div>
      <div className="boutique__body">
        <div className="eyebrow-line" style={{ marginBottom: 18 }}>{t('visit_eyebrow')}</div>
        <h2 style={{ whiteSpace: 'pre-line' }}>{t('visit_title')}</h2>
        <p style={{ color: 'var(--ink-2)', lineHeight: 1.7, fontSize: 14, maxWidth: '48ch', marginTop: 16 }}>{t('visit_p')}</p>
        <dl className="boutique__addr">
          <dt>{t('visit_addr')}</dt><dd style={{ whiteSpace: 'pre-line' }}>{t('visit_addr_v')}</dd>
          <dt>{t('visit_hours')}</dt><dd style={{ whiteSpace: 'pre-line' }}>{t('visit_hours_v')}</dd>
          <dt>{t('visit_phone')}</dt><dd>{t('visit_phone_v')}</dd>
        </dl>
        <button className="btn">{t('visit_cta')} <ArrowIcon /></button>
      </div>
    </section>
  )
}
