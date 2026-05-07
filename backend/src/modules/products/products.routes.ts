import { Router } from 'express'
import { authenticate, optionalAuthenticate } from '../../middleware/authenticate'
import { authorize } from '../../middleware/authorize'
import { validate } from '../../middleware/validate'
import { createProductSchema, updateProductSchema, addImageSchema } from './products.schema'
import * as ctrl from './products.controller'

export const productsRouter = Router()

productsRouter.get('/',           optionalAuthenticate, ctrl.list)
productsRouter.get('/admin',      authenticate, authorize('employee'), ctrl.listAdmin)
productsRouter.get('/:slug',      optionalAuthenticate, ctrl.getBySlug)
productsRouter.post('/',          authenticate, authorize('employee'), validate(createProductSchema), ctrl.create)
productsRouter.patch('/:id',      authenticate, authorize('employee'), validate(updateProductSchema), ctrl.update)
productsRouter.patch('/:id/publish', authenticate, authorize('employee'), ctrl.togglePublish)
productsRouter.delete('/:id',     authenticate, authorize('admin'), ctrl.remove)
productsRouter.post('/:id/images',             authenticate, authorize('employee'), validate(addImageSchema), ctrl.addImage)
productsRouter.delete('/:id/images/:imageId',  authenticate, authorize('employee'), ctrl.removeImage)
