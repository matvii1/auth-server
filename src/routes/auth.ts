import { PrismaClient } from '@prisma/client'
import express from 'express'
const prisma = new PrismaClient()

const router = express.Router()

router.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()

  res.json(users)
})

router.post('/user/:id', async (req, res) => {
  const { id } = req.params

  const founedUser = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  })

  if (founedUser) {
    return res.json({
      message: 'User already exists',
    })
  }

  const user = await prisma.user.create({
    data: {
      id: Number(id),
      name: 'Alice',
    },
  })

  res.json(user)
})

export default router
