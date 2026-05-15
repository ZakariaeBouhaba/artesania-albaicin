import { motion } from 'framer-motion'

const S = '#d4ac5a'
const SW = 1.5

const RopaIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={S} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 5 Q20 10 15 12 L7 17 L12 23 L16 19 L16 43 L32 43 L32 19 L36 23 L41 17 L33 12 Q28 10 24 5Z"/>
    <line x1="24" y1="5" x2="22" y2="15"/>
    <line x1="24" y1="5" x2="26" y2="15"/>
  </svg>
)

const BolsosIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={S} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22 L9 44 L39 44 L36 22Z"/>
    <path d="M18 22 Q18 10 24 10 Q30 10 30 22"/>
    <line x1="9" y1="32" x2="39" y2="32"/>
  </svg>
)

const JoyeriaIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={S} strokeWidth={SW} strokeLinecap="round">
    <circle cx="24" cy="10" r="5"/>
    <line x1="24" y1="15" x2="24" y2="21"/>
    <path d="M24 21 Q14 27 14 37 Q14 46 24 46 Q34 46 34 37 Q34 27 24 21Z"/>
  </svg>
)

const DecoracionIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={S} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="5" r="2.5"/>
    <line x1="24" y1="7.5" x2="24" y2="11"/>
    <path d="M24 11 L32 16 L32 36 L24 41 L16 36 L16 16Z"/>
    <line x1="24" y1="41" x2="24" y2="45"/>
    <line x1="20" y1="45" x2="28" y2="45"/>
    <rect x="20" y="21" width="8" height="10" strokeDasharray="2 1.5"/>
  </svg>
)

const CeramicaIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={S} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10 Q18 6 20 4 L28 4 Q30 6 28 10"/>
    <path d="M18 10 Q8 14 8 26 Q8 38 14 42 L34 42 Q40 38 40 26 Q40 14 30 10Z"/>
    <line x1="8" y1="28" x2="40" y2="28" strokeDasharray="2 3" strokeWidth="1" opacity="0.7"/>
    <line x1="10" y1="20" x2="38" y2="20" strokeDasharray="2 3" strokeWidth="1" opacity="0.7"/>
  </svg>
)

const SouvenirsIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={S} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
    <rect x="10" y="22" width="28" height="22"/>
    <rect x="8" y="16" width="32" height="6"/>
    <line x1="24" y1="16" x2="24" y2="44"/>
    <path d="M24 16 Q22 10 16 12 Q14 17 20 19 Q23 19 24 16Z"/>
    <path d="M24 16 Q26 10 32 12 Q34 17 28 19 Q25 19 24 16Z"/>
  </svg>
)

const PerfumeriaIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={S} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
    <rect x="14" y="22" width="20" height="22" rx="2"/>
    <rect x="19" y="14" width="10" height="8"/>
    <rect x="17" y="10" width="14" height="5" rx="1"/>
    <line x1="31" y1="12" x2="39" y2="12"/>
    <circle cx="39" cy="12" r="1.5" fill={S} stroke="none"/>
    <line x1="14" y1="30" x2="34" y2="30" strokeWidth="1" opacity="0.6"/>
  </svg>
)

const PapeleriaIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={S} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
    <path d="M36 4 Q46 16 24 44"/>
    <path d="M12 4 Q2 16 24 44"/>
    <path d="M24 44 L21 37 M24 44 L27 37"/>
    <line x1="18" y1="24" x2="30" y2="24" strokeWidth="1" opacity="0.5"/>
  </svg>
)

const ComplementosIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={S} strokeWidth={SW} strokeLinecap="round">
    <circle cx="24" cy="42" r="3"/>
    <line x1="24" y1="39" x2="8" y2="15"/>
    <line x1="24" y1="39" x2="14" y2="9"/>
    <line x1="24" y1="39" x2="24" y2="7"/>
    <line x1="24" y1="39" x2="34" y2="9"/>
    <line x1="24" y1="39" x2="40" y2="15"/>
    <path d="M8 15 Q16 7 24 7 Q32 7 40 15"/>
  </svg>
)

const MaderaIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={S} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="24,4 32,8 40,16 40,32 32,40 24,44 16,40 8,32 8,16 16,8"/>
    <polygon points="24,12 28,24 24,36 20,24"/>
    <polygon points="12,24 24,20 36,24 24,28"/>
  </svg>
)

const CATEGORIAS = [
  { id: 'ropa',         label: 'Ropa',          desc: 'Tejidos andalusíes',       Icon: RopaIcon },
  { id: 'bolsos',       label: 'Bolsos',         desc: 'Cuero y bordados',         Icon: BolsosIcon },
  { id: 'joyeria',      label: 'Joyería',        desc: 'Plata de ley y filigrana', Icon: JoyeriaIcon },
  { id: 'decoracion',   label: 'Decoración',     desc: 'Para el hogar',            Icon: DecoracionIcon },
  { id: 'ceramica',     label: 'Cerámica',       desc: 'Fajalauza tradicional',    Icon: CeramicaIcon },
  { id: 'souvenirs',    label: 'Souvenirs',      desc: 'Recuerdos de Granada',     Icon: SouvenirsIcon },
  { id: 'perfumeria',   label: 'Perfumería',     desc: 'Esencias de Al-Ándalus',   Icon: PerfumeriaIcon },
  { id: 'papeleria',    label: 'Papelería',      desc: 'Papel artesanal',          Icon: PapeleriaIcon },
  { id: 'complementos', label: 'Complementos',   desc: 'Detalles únicos',          Icon: ComplementosIcon },
  { id: 'madera',       label: 'Madera',         desc: 'Talla y marquetería',      Icon: MaderaIcon },
]

export default function CategoriasGrid() {
  return (
    <section className="categorias">
      <div className="categorias__head">
        <div className="eyebrow-line">El Bazar</div>
        <h2>Nuestras categorías</h2>
      </div>
      <div className="cat-grid-items">
        {CATEGORIAS.map(({ id, label, desc, Icon }, i) => (
          <motion.div
            key={id}
            className="cat-item"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <div className="cat-item__icon"><Icon /></div>
            <div className="cat-item__name">{label}</div>
            <div className="cat-item__desc">{desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
