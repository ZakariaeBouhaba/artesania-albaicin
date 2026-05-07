import { Router } from 'express'
import { authenticate } from '../../middleware/authenticate'
import { authorize } from '../../middleware/authorize'
import * as ctrl from './users.controller'

export const usersRouter = Router()

usersRouter.get('/me/profile',    authenticate,                     ctrl.getMyProfile)
usersRouter.patch('/me/profile',  authenticate,                     ctrl.updateMyProfile)
usersRouter.patch('/me/password', authenticate,                     ctrl.changePassword)
usersRouter.get('/',              authenticate, authorize('admin'), ctrl.list)
usersRouter.get('/:id',           authenticate, authorize('admin'), ctrl.getOne)
usersRouter.patch('/:id',         authenticate, authorize('admin'), ctrl.updateOne)
usersRouter.delete('/:id',        authenticate, authorize('admin'), ctrl.deleteOne)
