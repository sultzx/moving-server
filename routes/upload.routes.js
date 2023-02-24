import express from 'express'
import multer from 'multer'

import * as controllers from '../controllers/upload.js'
import checkAuth from '../middlewares/checkAuth.js'
import storageService from '../services/diskStorage.js'

const uploadRouter = express.Router()

const uploadAvatar = multer({
    storage: storageService('avatars')
})

uploadRouter.post('/avatar', checkAuth, uploadAvatar.single('image'), controllers.uploadAvatar)

export default uploadRouter