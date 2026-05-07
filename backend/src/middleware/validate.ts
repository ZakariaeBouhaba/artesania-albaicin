import { Request, Response, NextFunction } from 'express'
import { ZodSchema, ZodError } from 'zod'
import { AppError } from '../shared/errors/AppError'

export const validate = (schema: ZodSchema) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      const result = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      req.body   = result.body   ?? req.body
      req.query  = result.query  ?? req.query
      req.params = result.params ?? req.params
      next()
    } catch (err) {
      if (err instanceof ZodError) {
        throw AppError.badRequest('Validation failed', err.flatten().fieldErrors)
      }
      throw err
    }
  }
