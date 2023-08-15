import { ErrorRequestHandler } from 'express'
import { ApiError } from '../exceptions'

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err)

  if (err instanceof ApiError) {
    res.status(err.status).json({
      message: err.message,
      errors: err.errors,
    })
  }

  res.status(500).json({
    message: 'Unexpected error',
  })
}

export default errorMiddleware
