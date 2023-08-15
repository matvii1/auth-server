import express from 'express'
import { userController } from '../controllers'
import { catchError } from '../helpers'
import { authMiddleware } from '../middlewares'
import { prisma } from '../prisma'

const router = express.Router()

router.get('/users', authMiddleware, catchError(userController.getAll))

// TODO: remove. THIS IS FOR DEV
router.delete('/delete', async (req, res) => {
  await prisma.user.deleteMany()

  res.json({
    deleted: true,
  })
})

export default router
