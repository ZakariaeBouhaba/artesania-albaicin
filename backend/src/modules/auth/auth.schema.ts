import { z } from 'zod'

export const registerSchema = z.object({
  body: z.object({
    email:     z.string().email(),
    password:  z.string().min(8).max(128),
    firstName: z.string().min(1).max(100),
    lastName:  z.string().min(1).max(100),
    phone:     z.string().max(30).optional(),
  }),
})

export const loginSchema = z.object({
  body: z.object({
    email:    z.string().email(),
    password: z.string().min(1),
  }),
})

export const refreshSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1),
  }),
})
