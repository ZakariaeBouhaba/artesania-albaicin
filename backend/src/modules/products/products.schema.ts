import { z } from 'zod'

export const createProductSchema = z.object({
  body: z.object({
    name:            z.string().min(1).max(255),
    description:     z.string().optional(),
    price:           z.number().min(0),
    compareAtPrice:  z.number().min(0).optional(),
    stock:           z.number().int().min(0),
    sku:             z.string().max(100).optional(),
    categoryId:      z.string().uuid().optional(),
    isPublished:     z.boolean().optional().default(false),
    isFeatured:      z.boolean().optional().default(false),
    weightGrams:     z.number().int().min(0).optional(),
  }),
})

export const updateProductSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: z.object({
    name:            z.string().min(1).max(255).optional(),
    description:     z.string().optional(),
    price:           z.number().min(0).optional(),
    compareAtPrice:  z.number().min(0).optional(),
    stock:           z.number().int().min(0).optional(),
    sku:             z.string().max(100).optional(),
    categoryId:      z.string().uuid().optional(),
    isPublished:     z.boolean().optional(),
    isFeatured:      z.boolean().optional(),
    weightGrams:     z.number().int().min(0).optional(),
  }),
})

export const addImageSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: z.object({
    url:       z.string().url(),
    altText:   z.string().max(255).optional(),
    sortOrder: z.number().int().min(0).optional().default(0),
    isPrimary: z.boolean().optional().default(false),
  }),
})

export const listProductsSchema = z.object({
  query: z.object({
    category: z.string().optional(),
    search:   z.string().optional(),
    page:     z.string().optional(),
    limit:    z.string().optional(),
    featured: z.string().optional(),
  }),
})
