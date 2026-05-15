import type { CollectionConfig, CollectionBeforeChangeHook } from 'payload'
import {
  canCreateContent,
  canEditContent,
  canDeleteMedia,
  publicRead,
} from '../access/index'
import { afterChangeAudit, afterDeleteAudit } from '../hooks/auditHook'

const stampCreatedBy: CollectionBeforeChangeHook = ({ req, operation, data }) => {
  if (operation === 'create' && req.user) {
    data.createdBy = req.user.id
  }
  return data
}

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: '../public/media',
    imageSizes: [
      { name: 'thumbnail', width: 300, height: 300, crop: 'centre' },
      { name: 'card',      width: 600, height: 600, crop: 'centre' },
      { name: 'hero',      width: 1400, height: 700, crop: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
  },
  admin: {
    group: 'Contenido',
    defaultColumns: ['filename', 'alt', 'mimeType', 'updatedAt'],
    description: 'Biblioteca centralizada de imágenes con redimensionado automático.',
  },
  access: {
    create: canCreateContent,
    read:   publicRead,
    update: canEditContent,
    delete: canDeleteMedia,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: { es: 'Texto alternativo (accesibilidad)', en: 'Alt text (accessibility)' },
    },
    {
      name: 'caption',
      type: 'text',
      label: { es: 'Pie de foto', en: 'Caption' },
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
        readOnly: true,
        condition: (data) => Boolean(data?.createdBy),
      },
      label: { es: 'Subido por', en: 'Uploaded by' },
    },
  ],
  hooks: {
    beforeChange: [stampCreatedBy],
    afterChange:  [afterChangeAudit],
    afterDelete:  [afterDeleteAudit],
  },
}
