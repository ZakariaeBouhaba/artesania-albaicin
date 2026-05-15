import { motion } from 'framer-motion'
import { useI18n } from '../../contexts/I18nContext'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true },
  transition:  { duration: 0.8, delay },
})

export default function Editorial() {
  const { t } = useI18n()
  return (
    <section style={{ background: 'var(--bone)' }}>
      <div className="editorial">
        {/* ── Mosaic izquierda ── */}
        <div className="editorial__mosaic">
          <motion.img
            src="https://images.unsplash.com/photo-1524634126442-357e0eac3c14?auto=format&fit=crop&w=800&q=80"
            alt="Artesano bereber tejiendo una alfombra a mano"
            className="mosaic__main"
            {...fadeUp(0)}
          />
          <motion.img
            src="https://images.unsplash.com/photo-1559827291-72ee739d0d9a?auto=format&fit=crop&w=600&q=80"
            alt="Detalle de cerámica zellige tradicional"
            className="mosaic__sm mosaic__sm--top"
            {...fadeUp(0.15)}
          />
          <motion.img
            src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80"
            alt="Calle empedrada del Albaycín"
            className="mosaic__sm mosaic__sm--bot"
            {...fadeUp(0.3)}
          />
          <div className="stamp" style={{ whiteSpace: 'pre-line' }}>{t('story_stamp')}</div>
        </div>

        {/* ── Texto derecha ── */}
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
