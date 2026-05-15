import type { CollectionConfig } from 'payload'
import {
  isAdminOrAbove,
  canEditContent,
  publicRead,
} from '../access/index'
import { afterChangeAudit, afterDeleteAudit } from '../hooks/auditHook'

export const Collections: CollectionConfig = {
  slug: 'collections',
  admin: {
    useAsTitle: 'title',
    group: 'Contenido',
    defaultColumns: ['title', 'isActive', 'updatedAt'],
    description: 'Colecciones temáticas que agrupan productos artesanales.',
  },
  access: {
    create: isAdminOrAbove,
    read:   publicRead,
    update: canEditContent,
    delete: isAdminOrAbove,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: { es: 'Título de la colección', en: 'Collection Title' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Identificador único para la URL (/colecciones/slug)',
      },
      label: { es: 'Slug (URL)', en: 'Slug (URL)' },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
      label: { es: 'Activa', en: 'Active' },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: { es: 'Imagen de portada', en: 'Hero Image' },
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
      label: { es: 'Descripción', en: 'Description' },
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      label: { es: 'Productos', en: 'Products' },
    },
  ],
  hooks: {
    afterChange: [afterChangeAudit],
    afterDelete: [afterDeleteAudit],
  },
}
