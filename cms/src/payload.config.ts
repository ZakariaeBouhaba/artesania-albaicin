import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import { Users, Products, Artisans, Collections, Media, AuditLogs } from './collections'
import { SiteSettings } from './globals/SiteSettings'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
  serverURL: process.env.PAYLOAD_SERVER_URL ?? 'http://localhost:3002',
  secret: process.env.PAYLOAD_SECRET ?? '',
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Artisanía Albaycín',
    },
    components: {
      beforeNavLinks: [
        './components/Nav/CustomNavHeader#CustomNavHeader',
        './components/RoleBadge#RoleBadge',
      ],
      afterDashboard: [
        './components/Dashboard/CustomDashboard#default',
        './components/DashboardStats#DashboardStats',
      ],
    },
  },
  editor: lexicalEditor({}),
  collections: [Users, Products, Artisans, Collections, Media, AuditLogs],
  globals: [SiteSettings],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL ?? '',
    },
  }),
  upload: {
    limits: {
      fileSize: 10_000_000,
    },
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  cors: [
    process.env.FRONTEND_URL ?? 'http://localhost:5175',
    process.env.EXPRESS_URL ?? 'http://localhost:3001',
  ],
  csrf: [process.env.FRONTEND_URL ?? 'http://localhost:5175'],
  localization: {
    locales: [
      { label: 'Español', code: 'es' },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'es',
    fallback: true,
  },
})
