/**
 * Seed script: creates the first super-admin user if none exists.
 *
 * Usage:
 *   npm run seed                    (uses .env defaults)
 *   SEED_EMAIL=me@example.com SEED_PASSWORD=S3cur3! npm run seed
 */
import { getPayload } from 'payload'
import config from '../payload.config'

async function seed() {
  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'users',
    where: { role: { equals: 'super-admin' } },
    limit: 1,
  })

  if (existing.totalDocs > 0) {
    payload.logger.info('Super-admin already exists — skipping seed.')
    process.exit(0)
  }

  const email    = process.env.SEED_EMAIL    ?? 'admin@artisania.es'
  const password = process.env.SEED_PASSWORD ?? 'ChangeMe2024!'

  await payload.create({
    collection: 'users',
    data: {
      firstName: 'Super',
      lastName:  'Admin',
      email,
      password,
      role: 'super-admin',
    },
  })

  payload.logger.info(`✓ Super-admin created: ${email}`)
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
