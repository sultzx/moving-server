import express from 'express'

import * as controllers from '../controllers/newspaper.js'
import checkAuth from '../middlewares/checkAuth.js'

const newsRouter = express.Router()

newsRouter.post('/', checkAuth, controllers.create)
newsRouter.get('/all', controllers.getAllNews)

export default newsRouter