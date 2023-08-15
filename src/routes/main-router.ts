import express from 'express'
import { authRouter, userRouter } from '.'

const router = express.Router()

router.use(authRouter)
router.use(userRouter)

export default router
