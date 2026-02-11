import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {connectDB} from './config/db.js';
import {router as userRouter} from './routes/user.routes.js';
import {errorHandler, notFound} from './middlewares/error.middleware.js';
const app = express()
const port = process.env.PORT || 3000

connectDB()

app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ''
    : 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('server ready')
})

app.use('/api/users', userRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`server on ${port}`)
})