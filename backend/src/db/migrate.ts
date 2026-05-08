import fs from 'fs'
import path from 'path'
import { pool } from '../config/database'
import dotenv from 'dotenv'
dotenv.config()

async function migrate() {
  const client = await pool.connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id         SERIAL PRIMARY KEY,
        filename   VARCHAR(255) NOT NULL UNIQUE,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `)

    const migrationsDir = path.join(__dirname, 'migrations')
    const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort()

    const { rows: applied } = await client.query<{ filename: string }>(
      'SELECT filename FROM migrations'
    )
    const appliedSet = new Set(applied.map(r => r.filename))

    for (const file of files) {
      if (appliedSet.has(file)) {
        console.log(`  skip  ${file}`)
        continue
      }
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8')
      await client.query('BEGIN')
      try {
        await client.query(sql)
        await client.query('INSERT INTO migrations (filename) VALUES ($1)', [file])
        await client.query('COMMIT')
        console.log(`  apply ${file}`)
      } catch (err) {
        await client.query('ROLLBACK')
        throw err
      }
    }
    console.log('Migrations complete.')
  } finally {
    client.release()
    await pool.end()
  }
}

migrate().catch(err => {
  console.error('Migration failed:', err)
  process.exit(1)
})
