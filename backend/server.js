import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectDB } from './config/db.js';
import { router as userRouter } from './routes/user.routes.js';
import { errorHandler, notFound } from './middlewares/error.middleware.js';

const app = express()

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? 'https://authentication-app-75dg.vercel.app'
    : 'http://localhost:5173',
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Route call korar somoy DB connection ensure kora
app.use('/api/users', async (req, res, next) => {
  await connectDB();
  next();
}, userRouter)

app.get('/', (req, res) => {
  res.send('server ready')
})

app.use(notFound)
app.use(errorHandler)

// VERCEL FIX: app instance export kora
export default app;

// Local-e chalanor jonno conditional listen
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000
  app.listen(port, () => {
    console.log(`Server on ${port}`)
  })
}