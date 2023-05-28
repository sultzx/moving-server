import express from 'express'

import * as controllers from '../controllers/user.js'

import checkAuth from '../middlewares/checkAuth.js'

const userRouter = express.Router()

userRouter.get('/me', checkAuth, controllers.me)

userRouter.post('/registration', controllers.registration)

userRouter.post('/login', controllers.login)

userRouter.patch('/update', checkAuth, controllers.update)

userRouter.patch('/update-car', checkAuth, controllers.updateCar)

userRouter.get('/all-car', checkAuth, controllers.allCar)

userRouter.get('/one-car', checkAuth, controllers.oneCar)

export default userRouter