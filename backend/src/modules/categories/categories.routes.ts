import { Router } from 'express'
import { authenticate } from '../../middleware/authenticate'
import { authorize } from '../../middleware/authorize'
import * as ctrl from './categories.controller'

export const categoriesRouter = Router()

categoriesRouter.get('/',        ctrl.list)
categoriesRouter.get('/:slug',   ctrl.getOne)
categoriesRouter.post('/',       authenticate, authorize('admin'), ctrl.create)
categoriesRouter.patch('/:id',   authenticate, authorize('admin'), ctrl.update)
categoriesRouter.delete('/:id',  authenticate, authorize('admin'), ctrl.remove)
