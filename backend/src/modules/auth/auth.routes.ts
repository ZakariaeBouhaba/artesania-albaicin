import { Router } from 'express'
import { validate } from '../../middleware/validate'
import { authenticate } from '../../middleware/authenticate'
import { authLimiter } from '../../middleware/rateLimiter'
import { registerSchema, loginSchema, refreshSchema } from './auth.schema'
import {
  registerController,
  loginController,
  refreshController,
  logoutController,
  meController,
} from './auth.controller'

export const authRouter = Router()

authRouter.post('/register', authLimiter, validate(registerSchema), registerController)
authRouter.post('/login',    authLimiter, validate(loginSchema),    loginController)
authRouter.post('/refresh',  authLimiter, validate(refreshSchema),  refreshController)
authRouter.post('/logout',   authenticate,                          logoutController)
authRouter.get('/me',        authenticate,                          meController)
