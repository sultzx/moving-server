import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import cors from 'cors'

import userRouter from './routes/auth.routes.js'
import uploadRouter from './routes/upload.routes.js'
import newsRouter from './routes/news.routes.js'
import orderRouter from './routes/order.routes.js'
import commentRouter from './routes/comment.routes.js'

const app = express()

const PORT = config.get('port.1') || config.get('port.2')

app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use('/images', express.static('images'))
app.use(cors())


const start = async () => {
    try {
        await mongoose.set('strictQuery', true)
        await mongoose.connect(config.get('mongodb.url'))
        console.log(`database OK\tname: ${mongoose.connection.name}`)
    } catch (error) {
        console.log(`database ERROR\tcodename: ${error.codeName}`)
    }

    app.use('/api/auth', userRouter)
    app.use('/api/news', newsRouter)
    app.use('/api/upload', uploadRouter)
    app.use('/api/order', orderRouter)
    app.use('/api/comment', commentRouter)

    app.listen(PORT, (error) => {
        if(error) {
            console.log(`server ERROR`)
        }
        console.log(`server OK\tport: ${PORT}`)
    })
}

start()
