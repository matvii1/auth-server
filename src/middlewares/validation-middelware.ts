import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { ApiError } from '../exceptions'

const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    next(ApiError.BadRequest('Validation error', errors.array()))
  }

  next()
}

export default validationMiddleware