import { Router } from 'express'
import { optionalAuthenticate, authenticate } from '../../middleware/authenticate'
import * as ctrl from './cart.controller'

export const cartRouter = Router()

cartRouter.get('/',                    optionalAuthenticate, ctrl.getCart)
cartRouter.post('/items',              optionalAuthenticate, ctrl.addItem)
cartRouter.patch('/items/:productId',  optionalAuthenticate, ctrl.updateItem)
cartRouter.delete('/items/:productId', optionalAuthenticate, ctrl.removeItem)
cartRouter.delete('/',                 optionalAuthenticate, ctrl.clearCart)
cartRouter.post('/merge',              authenticate,         ctrl.mergeCart)
