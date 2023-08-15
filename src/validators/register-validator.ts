import { body } from 'express-validator'

const registerValidationBody = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 3, max: 32 }),
]

export default registerValidationBody
