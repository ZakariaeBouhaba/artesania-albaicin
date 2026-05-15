import type { CollectionConfig } from 'payload'
import {
  isAdminOrAbove,
  canEditContent,
  publicRead,
} from '../access/index'
import { afterChangeAudit, afterDeleteAudit } from '../hooks/auditHook'

export const Artisans: CollectionConfig = {
  slug: 'artisans',
  admin: {
    useAsTitle: 'name',
    group: 'Contenido',
    defaultColumns: ['name', 'specialty', 'location', 'updatedAt'],
    description: 'Perfiles de artesanos con biografía, retrato y especialidad.',
  },
  access: {
    create: isAdminOrAbove,
    read:   publicRead,
    update: canEditContent,
    delete: isAdminOrAbove,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: { es: 'Nombre del artesano', en: 'Artisan Name' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Identificador único para la URL (/artesanos/slug)',
      },
    },
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
      label: { es: 'Retrato', en: 'Portrait Photo' },
    },
    {
      name: 'specialty',
      type: 'text',
      localized: true,
      label: { es: 'Especialidad artesanal', en: 'Craft Specialty' },
    },
    {
      name: 'location',
      type: 'text',
      label: { es: 'Taller / Ubicación', en: 'Workshop / Location' },
    },
    {
      name: 'bio',
      type: 'richText',
      localized: true,
      label: { es: 'Biografía', en: 'Biography' },
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: { es: 'URL del video corto (opcional)', en: 'Short video URL (optional)' },
    },
  ],
  hooks: {
    afterChange: [afterChangeAudit],
    afterDelete: [afterDeleteAudit],
  },
}
