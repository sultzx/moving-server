import express from 'express'

import * as controllers from '../controllers/order.js'
import checkAuth from '../middlewares/checkAuth.js'
import * as validations from '../services/validation.js'
import validationHandler from '../services/validationHandler.js'

const orderRouter = express.Router()

orderRouter.post('/', checkAuth, validations.order, validationHandler, controllers.create)
orderRouter.get('/all', controllers.getAll)
orderRouter.get('/:id', checkAuth, controllers.getOne)
orderRouter.patch('/', checkAuth, validations.order, validationHandler, controllers.update)
orderRouter.delete('/:id', checkAuth, controllers.remove)
orderRouter.patch('/set-status/', checkAuth, controllers.setStatus)
orderRouter.patch('/select-other-driver', checkAuth, controllers.selectOtherDriver)
orderRouter.patch('/set-driver-price', checkAuth, controllers.setDriverPrice)
orderRouter.post('/comment', checkAuth, controllers.comment)
orderRouter.get('/comments', controllers.getAllComments)

export default orderRouter