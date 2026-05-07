import { createApp } from './app'
import { config } from './config'
import { pool } from './config/database'

async function start() {
  // Verify DB connection before binding
  await pool.query('SELECT 1')
  console.log('[db] connected')

  const app = createApp()
  app.listen(config.PORT, () => {
    console.log(`[server] running on http://localhost:${config.PORT} (${config.NODE_ENV})`)
  })
}

start().catch(err => {
  console.error('[startup] failed:', err)
  process.exit(1)
})
