import { Router } from 'express'
import { authenticate } from '../../middleware/authenticate'
import { authorize } from '../../middleware/authorize'
import * as ctrl from './orders.controller'

export const ordersRouter = Router()

ordersRouter.get('/',              authenticate, authorize('employee'), ctrl.listAll)
ordersRouter.get('/mine',          authenticate,                        ctrl.listMine)
ordersRouter.get('/:id',           authenticate,                        ctrl.getOne)
ordersRouter.post('/',             authenticate, authorize('client'),   ctrl.place)
ordersRouter.patch('/:id/status',  authenticate, authorize('employee'), ctrl.updateStatus)
ordersRouter.patch('/:id/cancel',  authenticate,                        ctrl.cancel)
ordersRouter.delete('/:id',        authenticate, authorize('admin'),    ctrl.remove)
