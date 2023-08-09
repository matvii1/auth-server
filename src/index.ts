import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import authRouter from './routes/auth.js'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(express.json())
app.use(authRouter)

async function start() {
  try {
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
