import type { CollectionConfig } from 'payload'
import {
  isSuperAdmin,
  isSuperAdminField,
  canReadUsers,
  canUpdateUser,
} from '../access/index'
import { afterChangeAudit, afterDeleteAudit } from '../hooks/auditHook'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 7200,
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    },
  },
  admin: {
    useAsTitle: 'email',
    group: 'Administración',
    defaultColumns: ['email', 'firstName', 'lastName', 'role', 'updatedAt'],
    description: 'Usuarios del panel CMS. Solo super-admin puede crear o eliminar cuentas.',
  },
  access: {
    create: isSuperAdmin,
    read:   canReadUsers,
    update: canUpdateUser,
    delete: isSuperAdmin,
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
      label: { es: 'Nombre', en: 'First Name' },
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
      label: { es: 'Apellido', en: 'Last Name' },
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'viewer',
      label: { es: 'Rol', en: 'Role' },
      options: [
        { label: { es: 'Super Administrador', en: 'Super Admin' }, value: 'super-admin' },
        { label: { es: 'Administrador',        en: 'Admin'       }, value: 'admin'       },
        { label: { es: 'Editor',               en: 'Editor'      }, value: 'editor'      },
        { label: { es: 'Autor',                en: 'Author'      }, value: 'author'      },
        { label: { es: 'Lector',               en: 'Viewer'      }, value: 'viewer'      },
      ],
      access: {
        update: isSuperAdminField,
      },
    },
  ],
  hooks: {
    afterChange: [afterChangeAudit],
    afterDelete: [afterDeleteAudit],
  },
}
