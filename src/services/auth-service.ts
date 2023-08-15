import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { ApiError } from '../exceptions'
import { prisma } from '../prisma'
import mailService from './mail-service'
import tokenService, { UserDtoType } from './token-service'

type RegisterInput = {
  email: string
  password: string
}

class UserService {
  async register({ email, password }: RegisterInput) {
    const candidate = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (candidate) {
      throw ApiError.BadRequest('User with this email already exists')
    }

    const saltRounds = 10

    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const activationLink = uuidv4()

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        activationLink,
        name: 'name',
      },
    })

    const { tokens, userDto } = await tokenService.generatePairAndSave(user)

    await mailService.sendActivationMail(user.email, activationLink)

    return {
      ...tokens,
      userDto,
    }
  }

  async login({ email, password }: { password: string; email: string }) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      throw ApiError.BadRequest('User with this email does not exist')
    }

    if (!user.activated) {
      throw ApiError.BadRequest('Please confirm your email before logging in')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) throw ApiError.BadRequest('Email or password is wrong')

    const { tokens, userDto } = await tokenService.generatePairAndSave(user)

    return {
      ...tokens,
      userDto,
    }
  }

  async logout(refreshToken: string) {
    await tokenService.removeToken(refreshToken)
  }

  async activate(activationLink: string) {
    const user = await prisma.user.findUnique({
      where: {
        activationLink,
      },
    })

    if (!user) throw ApiError.BadRequest('Incorrect activation link')

    await prisma.user.update({
      where: {
        activationLink,
      },
      data: {
        activated: true,
      },
    })
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnathorizedError()
    }

    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = tokenService.findToken(refreshToken)

    if (!userData || !tokenFromDb) {
      throw ApiError.UnathorizedError()
    }

    const user = await prisma.user.findUnique({
      where: {
        id: (userData as UserDtoType).id,
      },
    })

    if (!user) throw ApiError.BadRequest('User is not found')

    const { tokens, userDto } = await tokenService.generatePairAndSave(user)

    return {
      ...tokens,
      userDto,
    }
  }
}

export default new UserService()
