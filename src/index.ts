import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { errorMiddleware } from './middlewares'
import { mainRouter } from './routes'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
)

app.use(express.json())
app.use(cookieParser())
app.use('/api', mainRouter)

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
