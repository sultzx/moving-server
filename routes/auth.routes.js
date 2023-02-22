import express from 'express'

import * as controllers from '../controllers/user.js'

import checkAuth from '../middlewares/checkAuth.js'

const userRouter = express.Router()

userRouter.post('/registration', controllers.registration)

userRouter.post('/login', controllers.login)

userRouter.patch('/update', checkAuth, controllers.update)

export default userRouter