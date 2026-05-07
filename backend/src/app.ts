import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import { config } from './config'
import { apiLimiter } from './middleware/rateLimiter'
import { errorHandler } from './middleware/errorHandler'
import { notFound } from './middleware/notFound'
import { authRouter }       from './modules/auth/auth.routes'
import { usersRouter }      from './modules/users/users.routes'
import { categoriesRouter } from './modules/categories/categories.routes'
import { productsRouter }   from './modules/products/products.routes'
import { ordersRouter }     from './modules/orders/orders.routes'
import { cartRouter }       from './modules/cart/cart.routes'

export function createApp() {
  const app = express()

  app.use(helmet())
  app.use(cors({ origin: config.frontendUrl, credentials: true }))
  app.use(compression())
  app.use(express.json({ limit: '10kb' }))
  app.use(express.urlencoded({ extended: true, limit: '10kb' }))
  app.use('/api/', apiLimiter)

  app.get('/health', (_req, res) => res.json({ status: 'ok', env: config.NODE_ENV }))

  app.use('/api/v1/auth',       authRouter)
  app.use('/api/v1/users',      usersRouter)
  app.use('/api/v1/categories', categoriesRouter)
  app.use('/api/v1/products',   productsRouter)
  app.use('/api/v1/orders',     ordersRouter)
  app.use('/api/v1/cart',       cartRouter)

  app.use(notFound)
  app.use(errorHandler)

  return app
}
