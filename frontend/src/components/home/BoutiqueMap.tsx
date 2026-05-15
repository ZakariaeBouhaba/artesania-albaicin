import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../../contexts/I18nContext'
import { ArrowIcon } from '../ui/Icons'

const DIRECTIONS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=Calle+Caldereria+Nueva,+18010+Albaicín,+Granada,+Spain'

const EMBED_URL =
  'https://www.google.com/maps?q=Calle+Caldereria+Nueva,+18010+Albaycin,+Granada,+Spain&output=embed&z=16'

// ─── SVG ILLUSTRATION (kept, unused) ─────────────────────────────────────────

const ALBAYCIN_BUILDINGS: [number,number,number,number][] = [
  [138,68,22,16],[165,62,18,22],[192,70,24,14],[222,58,16,22],[246,66,20,16],
  [272,54,18,22],[298,62,22,14],[326,50,16,22],[350,58,22,16],[376,48,18,20],[400,56,22,14],[426,62,16,18],
  [142,96,20,16],[167,90,18,22],[194,98,22,14],[220,88,16,20],[244,96,22,14],
  [270,84,18,22],[296,92,20,16],[322,80,16,22],[346,88,22,16],[372,78,18,20],[396,86,22,14],
  [148,124,22,16],[174,118,18,22],[200,126,24,14],[228,116,16,20],[252,124,20,16],
  [278,112,18,22],[304,120,22,14],[330,108,18,22],[354,116,20,16],[380,106,16,22],[404,114,20,14],
  [156,152,20,16],[180,146,18,22],[208,154,22,14],[234,144,16,20],[258,152,20,16],
  [284,140,18,22],[308,148,22,14],[334,138,18,22],[358,146,20,16],[382,136,16,20],
  [162,180,22,14],[188,174,18,20],[214,182,22,14],[240,172,16,20],[264,180,20,14],
  [290,168,18,22],[314,176,22,14],[338,166,18,20],[362,174,16,16],
]

export function GranadaMap() {
  return (
    <svg className="svg-map" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id="map-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0 L0 0 L0 40" fill="none" stroke="#d9ccae" strokeWidth="0.4" opacity="0.5"/>
        </pattern>
      </defs>
      <rect width="600" height="600" fill="#efe6d3"/>
      <rect width="600" height="600" fill="url(#map-grid)"/>
      <g fill="#faf5ea" stroke="#c4b48f" strokeWidth="0.6">
        {ALBAYCIN_BUILDINGS.map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h}/>
        ))}
      </g>
      <text x="300" y="46" textAnchor="middle" fontFamily="Cormorant Garamond, serif"
        fontSize="11" fill="#8a6a23" fontStyle="italic" opacity="0.65">EL ALBAYCÍN</text>
      <line x1="60" y1="375" x2="360" y2="375" stroke="#b18a3a" strokeWidth="1.2" opacity="0.7"/>
      <text x="86" y="369" fontFamily="Inter Tight, sans-serif" fontSize="7.5"
        fill="#8a6a23" letterSpacing="1" opacity="0.75">C. ELVIRA</text>
      <line x1="60" y1="422" x2="510" y2="422" stroke="#b18a3a" strokeWidth="1.8" opacity="0.4"/>
      <text x="86" y="416" fontFamily="Inter Tight, sans-serif" fontSize="7"
        fill="#8a6a23" letterSpacing="0.4" opacity="0.55">GRAN VÍA DE COLÓN</text>
      <line x1="300" y1="202" x2="300" y2="375" stroke="#1d1a14" strokeWidth="2.5" opacity="0.88"/>
      <text x="272" y="295" textAnchor="middle" fontFamily="Inter Tight, sans-serif"
        fontSize="7.5" fill="#1d1a14" letterSpacing="1.5" fontWeight="700"
        transform="rotate(-90, 272, 295)">CALDERERÍA NUEVA</text>
      <line x1="240" y1="238" x2="362" y2="238" stroke="#b18a3a" strokeWidth="0.7" opacity="0.4"/>
      <line x1="240" y1="290" x2="362" y2="290" stroke="#b18a3a" strokeWidth="0.7" opacity="0.4"/>
      <line x1="240" y1="340" x2="362" y2="340" stroke="#b18a3a" strokeWidth="0.7" opacity="0.4"/>
      <line x1="300" y1="395" x2="460" y2="395" stroke="#b18a3a" strokeWidth="1" opacity="0.5"/>
      <rect x="358" y="362" width="88" height="56"
        fill="#e8dcc1" stroke="#b18a3a" strokeWidth="0.9" opacity="0.85"/>
      <text x="402" y="388" textAnchor="middle" fontFamily="Cormorant Garamond, serif"
        fontSize="11" fill="#5a3a1c" fontStyle="italic">Plaza</text>
      <text x="402" y="403" textAnchor="middle" fontFamily="Cormorant Garamond, serif"
        fontSize="11" fill="#5a3a1c" fontStyle="italic">Nueva</text>
      <path d="M300 454 C 340 444, 385 462, 440 452 C 478 444, 520 458, 600 448"
        fill="none" stroke="#b18a3a" strokeWidth="1.5" opacity="0.5" strokeDasharray="2 3"/>
      <text x="492" y="444" fontFamily="Cormorant Garamond, serif" fontSize="10"
        fill="#8a6a23" fontStyle="italic" opacity="0.7">río darro</text>
      <rect x="68" y="432" width="52" height="58" fill="#e8dcc1" stroke="#5a3a1c" strokeWidth="0.8"/>
      <rect x="60" y="448" width="16" height="36" fill="#e8dcc1" stroke="#5a3a1c" strokeWidth="0.6"/>
      <rect x="120" y="448" width="16" height="36" fill="#e8dcc1" stroke="#5a3a1c" strokeWidth="0.6"/>
      <rect x="82" y="406" width="22" height="28" fill="#e8dcc1" stroke="#5a3a1c" strokeWidth="0.8"/>
      <line x1="93" y1="397" x2="93" y2="408" stroke="#5a3a1c" strokeWidth="1.2"/>
      <line x1="88" y1="402" x2="98" y2="402" stroke="#5a3a1c" strokeWidth="1.2"/>
      <text x="93" y="510" textAnchor="middle" fontFamily="Cormorant Garamond, serif"
        fontSize="10" fill="#5a3a1c" fontStyle="italic" opacity="0.85">Catedral</text>
      <g opacity="0.38">
        <rect x="468" y="508" width="106" height="8" fill="#e8dcc1" stroke="#b18a3a" strokeWidth="0.6"/>
        <rect x="474" y="490" width="14" height="20" fill="#e8dcc1" stroke="#b18a3a" strokeWidth="0.6"/>
        <rect x="496" y="480" width="16" height="28" fill="#e8dcc1" stroke="#b18a3a" strokeWidth="0.6"/>
        <rect x="520" y="492" width="14" height="17" fill="#e8dcc1" stroke="#b18a3a" strokeWidth="0.6"/>
        <rect x="542" y="484" width="18" height="24" fill="#e8dcc1" stroke="#b18a3a" strokeWidth="0.6"/>
        <rect x="474" y="486" width="4" height="5" fill="#e8dcc1" stroke="#b18a3a" strokeWidth="0.5"/>
        <rect x="482" y="486" width="4" height="5" fill="#e8dcc1" stroke="#b18a3a" strokeWidth="0.5"/>
        <rect x="496" y="476" width="4" height="5" fill="#e8dcc1" stroke="#b18a3a" strokeWidth="0.5"/>
        <rect x="505" y="476" width="4" height="5" fill="#e8dcc1" stroke="#b18a3a" strokeWidth="0.5"/>
        <rect x="542" y="480" width="5" height="5" fill="#e8dcc1" stroke="#b18a3a" strokeWidth="0.5"/>
      </g>
      <text x="521" y="532" textAnchor="middle" fontFamily="Cormorant Garamond, serif"
        fontSize="10" fill="#8a6a23" fontStyle="italic" opacity="0.55">La Alhambra</text>
      <line x1="480" y1="535" x2="560" y2="535" stroke="#b18a3a" strokeWidth="0.4" opacity="0.35"/>
      <g transform="translate(300, 268)">
        <circle cx="0" cy="0" r="14" fill="#1d1a14"/>
        <circle cx="0" cy="0" r="14" fill="none" stroke="#d4ac5a" strokeWidth="1.5"/>
        <path d="M0 14 L-5 24 L5 24 Z" fill="#1d1a14"/>
        <text y="4" textAnchor="middle" fontFamily="Cormorant Garamond, serif"
          fontSize="13" fill="#d4ac5a" fontWeight="600">★</text>
      </g>
      <g transform="translate(318, 252)">
        <rect x="0" y="-10" width="126" height="44" fill="#faf5ea" stroke="#b18a3a" strokeWidth="0.5"/>
        <text x="6" y="4" fontFamily="Cormorant Garamond, serif" fontSize="11"
          fill="#1d1a14" fontWeight="600">ARTESANÍA</text>
        <text x="6" y="17" fontFamily="Cormorant Garamond, serif" fontSize="11"
          fill="#1d1a14" fontWeight="600">ALBAYCÍN</text>
        <text x="6" y="30" fontFamily="Inter Tight, sans-serif" fontSize="6.5"
          fill="#8a6a23" letterSpacing="0.8">CALLE CALDERERÍA NUEVA</text>
      </g>
      <g transform="translate(530, 80)">
        <circle cx="0" cy="0" r="22" fill="none" stroke="#b18a3a" strokeWidth="0.5"/>
        <path d="M0 -22 L4 -2 L0 0 L-4 -2 Z" fill="#5a3a1c"/>
        <path d="M0 22 L4 2 L0 0 L-4 2 Z" fill="#b18a3a"/>
        <path d="M-22 0 L-2 -4 L0 0 L-2 4 Z" fill="#b18a3a"/>
        <path d="M22 0 L2 -4 L0 0 L2 4 Z" fill="#b18a3a"/>
        <text y="-26" textAnchor="middle" fontFamily="serif" fontSize="9"
          fill="#5a3a1c" fontWeight="600">N</text>
      </g>
      <g transform="translate(300, 568)">
        <line x1="-104" y1="0" x2="-18" y2="0" stroke="#b18a3a" strokeWidth="0.5"/>
        <line x1="104" y1="0" x2="18" y2="0" stroke="#b18a3a" strokeWidth="0.5"/>
        <path d="M0 -4 L4 0 L0 4 L-4 0 Z" fill="#b18a3a"/>
        <text textAnchor="middle" y="18" fontFamily="Inter Tight, sans-serif"
          fontSize="7.5" fill="#8a6a23" letterSpacing="2.5">GRANADA · EL ALBAYCÍN · CALDERERÍA NUEVA</text>
      </g>
    </svg>
  )
}

// ─── INTERACTIVE MAP (Google Maps iframe — no API key required) ───────────────

function MapWidget() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: 420 }}>
      {shouldLoad && (
        <iframe
          src={EMBED_URL}
          width="100%"
          height="100%"
          style={{ border: 0, display: 'block', minHeight: 420 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          title="Artesanía Albaycín — Calle Calderería Nueva, Albaycín, Granada"
        />
      )}
    </div>
  )
}

// ─── SECTION COMPONENT ────────────────────────────────────────────────────────

export default function BoutiqueMap() {
  const { t } = useI18n()
  return (
    <section style={{ background: 'var(--cream)' }}>
      <div className="boutique">
        <div className="boutique__map">
          <MapWidget />
        </div>
        <motion.div
          className="boutique__body"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="eyebrow-line" style={{ marginBottom: 18 }}>{t('visit_eyebrow')}</div>
          <h2 style={{ whiteSpace: 'pre-line' }}>{t('visit_title')}</h2>
          <p style={{ color: 'var(--ink-2)', lineHeight: 1.7, fontSize: 14, maxWidth: '48ch', marginTop: 16 }}>
            {t('visit_p')}
          </p>
          <dl className="boutique__addr">
            <dt>{t('visit_addr')}</dt><dd style={{ whiteSpace: 'pre-line' }}>{t('visit_addr_v')}</dd>
            <dt>{t('visit_hours')}</dt><dd style={{ whiteSpace: 'pre-line' }}>{t('visit_hours_v')}</dd>
            <dt>{t('visit_phone')}</dt><dd>{t('visit_phone_v')}</dd>
          </dl>
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            {t('visit_cta')} <ArrowIcon />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
