import { body } from 'express-validator'

const loginValidationBody = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 3, max: 32 }),
]

export default loginValidationBody