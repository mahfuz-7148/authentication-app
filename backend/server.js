import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectDB } from './config/db.js';
import { router as userRouter } from './routes/user.routes.js';
import { errorHandler, notFound } from './middlewares/error.middleware.js';

const app = express()

// Database connection call
connectDB()

app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? 'https://authentication-app-75dg.vercel.app'
    : 'http://localhost:5173',
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('server ready')
})

app.use('/api/users', userRouter)

app.use(notFound)
app.use(errorHandler)

// --- Vercel Optimization Starts ---

// 1. Vercel-er runtime-er jonno app export kora mandatory
export default app;

// 2. Shudhu local-e chalanor jonno listen check (Vercel-e eta ignore hobe)
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}