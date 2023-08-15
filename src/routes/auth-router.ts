import express from 'express'
import { authController } from '../controllers'
import { catchError } from '../helpers'
import { validationMiddleware } from '../middlewares'
import { loginValidationBody, registerValidationBody } from '../validators'

const router = express.Router()

router.post(
  '/register',
  registerValidationBody,
  validationMiddleware,
  catchError(authController.register)
)

router.post(
  '/login',
  loginValidationBody,
  validationMiddleware,
  catchError(authController.login)
)
router.post('/logout', catchError(authController.logout))
router.get('/refresh', catchError(authController.refresh))
router.get('/activate/:link', catchError(authController.activate))

export default router
