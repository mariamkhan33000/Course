import express from 'express'
import connectDB from './config/db.js'
import fileUpload from 'express-fileupload'
import courseRoute from './routes/courseRoute.js'
import userRoute from './routes/userRoutes.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()

const port = process.env.PORT || 3000


app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}))

app.use('/api/v1/course', courseRoute)
app.use('/api/v1/user', userRoute)

app.listen(port, () => {
    console.log(`Server is running on Port ${port} Successfully . . . . . `)
    connectDB()
})