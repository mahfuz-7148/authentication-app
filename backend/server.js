import express from 'express'
import {connectDB} from './config/db.js';
import cors from 'cors'
import {router as user} from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import {errorHandler, notFound} from './middleware/error.middleware.js';

const app = express()
const port = process.env.PORT || 3000

// database connection
connectDB()

// middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
  ? ''
  : 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


// check server
app.get('/', (req, res) => {
  res.send('server ready')
})

//Routes
app.use('/api/users', user)

// error middleware
app.use(notFound)
app.use(errorHandler)

// port
app.listen(port, () => {
  console.log(`server started on ${port}`)
})