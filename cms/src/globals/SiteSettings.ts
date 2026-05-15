import type { GlobalConfig } from 'payload'
import { isSuperAdmin, isAuthenticated } from '../access/index'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Administración',
    description: 'Configuración general de la tienda. Solo super-admin puede modificarla.',
  },
  access: {
    read:   isAuthenticated,
    update: isSuperAdmin,
  },
  fields: [
    {
      name: 'storeName',
      type: 'text',
      defaultValue: 'Artesanía Albaycín',
      label: { es: 'Nombre de la tienda', en: 'Store Name' },
    },
    {
      name: 'whatsappNumber',
      type: 'text',
      label: { es: 'Número de WhatsApp', en: 'WhatsApp Number' },
      admin: { description: 'Formato internacional: +34612345678' },
    },
    {
      name: 'lowStockThreshold',
      type: 'number',
      defaultValue: 5,
      min: 0,
      label: { es: 'Umbral de stock bajo', en: 'Low Stock Threshold' },
      admin: { description: 'Alerta cuando el stock cae por debajo de este número.' },
    },
    {
      name: 'announcementBar',
      type: 'text',
      localized: true,
      label: { es: 'Texto de la barra de anuncio', en: 'Announcement Bar Text' },
      admin: { description: 'Dejar vacío para ocultar la barra.' },
    },
  ],
}
