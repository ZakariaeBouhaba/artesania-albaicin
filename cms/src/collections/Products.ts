import type { CollectionConfig, CollectionBeforeChangeHook } from 'payload'
import {
  canCreateContent,
  canUpdateContent,
  canDeleteContent,
  publicRead,
} from '../access/index'
import { afterChangeAudit, afterDeleteAudit } from '../hooks/auditHook'

const stampCreatedBy: CollectionBeforeChangeHook = ({ req, operation, data }) => {
  if (operation === 'create' && req.user) {
    data.createdBy = req.user.id
  }
  return data
}

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    group: 'Contenido',
    defaultColumns: ['name', 'status', 'price', 'stock', 'updatedAt'],
    description: 'Catálogo de productos artesanales con soporte bilingüe y gestión de stock.',
  },
  access: {
    create: canCreateContent,
    read:   publicRead,
    update: canUpdateContent,
    delete: canDeleteContent,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: { es: 'Nombre del producto', en: 'Product Name' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Identificador único para la URL (/productos/slug)',
      },
      label: { es: 'Slug (URL)', en: 'Slug (URL)' },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      admin: { position: 'sidebar' },
      label: { es: 'Estado', en: 'Status' },
      options: [
        { label: { es: 'Borrador',  en: 'Draft'    }, value: 'draft'     },
        { label: { es: 'Publicado', en: 'Published' }, value: 'published' },
        { label: { es: 'Archivado', en: 'Archived'  }, value: 'archived'  },
      ],
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
      label: { es: 'Destacado en portada', en: 'Featured on homepage' },
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
      label: { es: 'Descripción', en: 'Description' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'price',
          type: 'number',
          required: true,
          min: 0,
          label: { es: 'Precio (€)', en: 'Price (€)' },
        },
        {
          name: 'compareAtPrice',
          type: 'number',
          min: 0,
          label: { es: 'Precio anterior (€)', en: 'Compare-at Price (€)' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'stock',
          type: 'number',
          required: true,
          defaultValue: 0,
          min: 0,
          label: { es: 'Stock', en: 'Stock' },
        },
        {
          name: 'sku',
          type: 'text',
          label: { es: 'SKU / Referencia', en: 'SKU / Reference' },
        },
        {
          name: 'weightGrams',
          type: 'number',
          min: 0,
          label: { es: 'Peso (gramos)', en: 'Weight (grams)' },
        },
      ],
    },
    {
      name: 'images',
      type: 'array',
      label: { es: 'Imágenes del producto', en: 'Product Images' },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: { es: 'Imagen', en: 'Image' },
        },
        {
          name: 'isPrimary',
          type: 'checkbox',
          defaultValue: false,
          label: { es: 'Imagen principal', en: 'Primary Image' },
        },
        {
          name: 'altText',
          type: 'text',
          localized: true,
          label: { es: 'Texto alternativo', en: 'Alt text' },
        },
      ],
    },
    {
      name: 'artisan',
      type: 'relationship',
      relationTo: 'artisans',
      admin: { position: 'sidebar' },
      label: { es: 'Artesano', en: 'Artisan' },
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
      label: { es: 'Creado por', en: 'Created by' },
    },
    {
      name: 'seo',
      type: 'group',
      label: { es: 'SEO', en: 'SEO' },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          localized: true,
          label: { es: 'Título SEO', en: 'SEO Title' },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          localized: true,
          label: { es: 'Descripción SEO', en: 'SEO Description' },
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [stampCreatedBy],
    afterChange:  [afterChangeAudit],
    afterDelete:  [afterDeleteAudit],
  },
}
