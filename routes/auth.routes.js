import express from 'express'

import * as controllers from '../controllers/user.js'

const userRouter = express.Router()

userRouter.post('/registration', controllers.registration)

userRouter.post('/login', controllers.login)

export default userRouter