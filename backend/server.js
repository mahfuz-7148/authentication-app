import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {connectDB} from './config/db.js';
import {router as userRouter} from './routes/user.routes.js';
import {errorHandler, notFound} from './middlewares/error.middleware.js';

const app = express()

// 1. Connection-ta ke ekta function-er bhetore niye asun
const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected");
  } catch (error) {
    console.error("DB Connection Error:", error);
  }
};

// Vercel-er jonno serverless mode-e DB connect kora
startServer();

app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? 'https://authentication-app-75dg.vercel.app'
    : 'http://localhost:5173', // Local development-er jonno
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

// 2. Vercel-e app.listen() dorkar nei, kintu export korte hoy
export default app;

// Local-e chalanor jonno eta thakতে pare
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000
  app.listen(port, () => {
    console.log(`server on ${port}`)
  })
}