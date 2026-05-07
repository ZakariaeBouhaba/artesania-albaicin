import { useI18n } from '../../contexts/I18nContext'
import { HandIcon, RefreshIcon, GlobeIcon, TruckIcon } from '../ui/Icons'

export default function ValuesStrip() {
  const { t } = useI18n()
  const items = [
    { icon: <HandIcon />, title: t('values_1_t'), desc: t('values_1_p') },
    { icon: <RefreshIcon />, title: t('values_2_t'), desc: t('values_2_p') },
    { icon: <GlobeIcon />, title: t('values_3_t'), desc: t('values_3_p') },
    { icon: <TruckIcon />, title: t('values_4_t'), desc: t('values_4_p') },
  ]
  return (
    <div className="values">
      {items.map((it, i) => (
        <div className="item" key={i}>
          {it.icon}
          <h6>{it.title}</h6>
          <p>{it.desc}</p>
        </div>
      ))}
    </div>
  )
}
