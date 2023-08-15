import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../exceptions'
import { tokenService } from '../services'
import { UserDtoType } from '../services/token-service'

declare global {
  namespace Express {
    interface Request {
      user?: UserDtoType
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeaders = req.headers['authorization']
  if (!authHeaders) throw ApiError.UnathorizedError()

  const [bearer, token] = authHeaders.split(' ')

  if (bearer !== 'Bearer' || !token) {
    throw ApiError.UnathorizedError()
  }

  const userData = tokenService.validateAccessToken(token)

  if (!userData) {
    throw ApiError.UnathorizedError()
  }

  req.user = userData as UserDtoType
  next()
}

export default authMiddleware
