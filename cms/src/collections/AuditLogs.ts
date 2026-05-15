import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/rbac'

export const AuditLogs: CollectionConfig = {
  slug: 'audit-logs',
  admin: {
    useAsTitle: 'action',
    group: 'Administración',
    defaultColumns: ['action', 'collection', 'documentId', 'performedBy', 'timestamp'],
    description: 'Registro inmutable de todas las operaciones CREATE, UPDATE y DELETE.',
  },
  access: {
    create: () => false,
    read: isAdmin,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: 'action',
      type: 'select',
      required: true,
      label: { es: 'Acción', en: 'Action' },
      options: [
        { label: 'CREATE', value: 'CREATE' },
        { label: 'UPDATE', value: 'UPDATE' },
        { label: 'DELETE', value: 'DELETE' },
      ],
    },
    {
      name: 'collection',
      type: 'text',
      required: true,
      label: { es: 'Colección', en: 'Collection' },
    },
    {
      name: 'documentId',
      type: 'text',
      required: true,
      label: { es: 'ID del documento', en: 'Document ID' },
    },
    {
      name: 'performedBy',
      type: 'relationship',
      relationTo: 'users',
      label: { es: 'Realizado por', en: 'Performed By' },
    },
    {
      name: 'timestamp',
      type: 'date',
      required: true,
      label: { es: 'Fecha y hora', en: 'Timestamp' },
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'snapshot',
      type: 'json',
      label: { es: 'Instantánea del documento', en: 'Document Snapshot' },
    },
  ],
}
