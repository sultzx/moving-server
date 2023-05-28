import express from 'express'

import * as controllers from '../controllers/comment.js'
import checkAuth from '../middlewares/checkAuth.js'
import * as validations from '../services/validation.js'
import validationHandler from '../services/validationHandler.js'

const commentRouter = express.Router()

commentRouter.post('/', checkAuth, controllers.comment)
commentRouter.get('/', controllers.getAllComments)

export default commentRouter