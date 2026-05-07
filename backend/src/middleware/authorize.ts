import { Request, Response, NextFunction } from 'express'
import { AppError } from '../shared/errors/AppError'
import { UserRole } from '../modules/users/users.types'

const ROLE_HIERARCHY: UserRole[] = ['client', 'employee', 'admin']

export const authorize = (...allowedRoles: UserRole[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) throw AppError.unauthorized()
    const userLevel = ROLE_HIERARCHY.indexOf(req.user.role)
    const allowed = allowedRoles.some(r => ROLE_HIERARCHY.indexOf(r) <= userLevel)
    if (!allowed) throw AppError.forbidden()
    next()
  }
