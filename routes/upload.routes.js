import express from 'express'
import multer from 'multer'

import * as controllers from '../controllers/upload.js'
import checkAuth from '../middlewares/checkAuth.js'
import storageService from '../services/diskStorage.js'

const uploadRouter = express.Router()

const uploadAvatar = multer({
    storage: storageService('avatars')
})

const uploadOrderImg = multer({
    storage: storageService('orders')
})

uploadRouter.post('/avatar', checkAuth, uploadAvatar.single('image'), controllers.uploadAvatar)
uploadRouter.post('/order', checkAuth, uploadOrderImg.single('image'), controllers.uploadOrderImg)

export default uploadRouter