import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config'
import { AppError } from '../shared/errors/AppError'
import { asyncHandler } from '../shared/utils/asyncHandler'
import { UserRole } from '../modules/users/users.types'

interface JwtPayload {
  sub: string
  email: string
  role: UserRole
  iat: number
  exp: number
}

export const authenticate = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) throw AppError.unauthorized()

  const token = header.slice(7)
  try {
    const payload = jwt.verify(token, config.jwt.accessSecret) as JwtPayload
    req.user = { id: payload.sub, email: payload.email, role: payload.role }
    next()
  } catch {
    throw AppError.unauthorized('Token invalid or expired')
  }
})

export const optionalAuthenticate = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) return next()
  try {
    const token = header.slice(7)
    const payload = jwt.verify(token, config.jwt.accessSecret) as JwtPayload
    req.user = { id: payload.sub, email: payload.email, role: payload.role }
  } catch {
    // silently skip — optional auth
  }
  next()
})
