import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { UserDto } from '../dtos'
import { ApiError } from '../exceptions'
import { prisma } from '../prisma'

export type UserDtoType = {
  email: string
  isActivated: boolean
  id: string
}

class TokenService {
  generateTokens(payload: UserDtoType) {
    const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!
    const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!

    const ACCESS_TOKEN = jwt.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: '15s',
    })

    const REFRESH_TOKEN = jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: '30s',
    })

    return {
      accessToken: ACCESS_TOKEN,
      refreshToken: REFRESH_TOKEN,
    }
  }

  async generatePairAndSave(user: User) {
    const userDto = { ...new UserDto(user) }
    const tokens = this.generateTokens(userDto)
    await this.saveToken(user.id, tokens.refreshToken)

    return {
      tokens,
      userDto,
    }
  }

  async removeToken(refreshToken: string) {
    const token = await prisma.token.findUnique({
      where: {
        refreshToken,
      },
    })

    if (!token) {
      throw ApiError.BadRequest('Something went wrong')
    }

    await prisma.token.delete({
      where: {
        refreshToken,
      },
    })
  }

  async saveToken(userId: string, refreshToken: string) {
    const token = await prisma.token.findUnique({
      where: {
        refreshToken,
      },
    })

    if (token) {
      await prisma.token.update({
        where: {
          refreshToken,
        },
        data: {
          refreshToken: refreshToken,
        },
      })
    } else {
      await prisma.token.create({
        data: {
          refreshToken: refreshToken,
          userId,
        },
      })
    }
  }

  validateRefreshToken(refreshToken: string) {
    try {
      const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!)

      return userData
    } catch {
      return null
    }
  }

  validateAccessToken(accessToken: string) {
    try {
      const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!)

      return userData
    } catch {
      return null
    }
  }

  async findToken(token: string) {
    const foundToken = await prisma.token.findUnique({
      where: {
        refreshToken: token,
      },
    })

    return foundToken
  }
}

export default new TokenService()
