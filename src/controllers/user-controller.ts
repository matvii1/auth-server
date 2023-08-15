import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import { userService } from '../services'

dotenv.config()

class UserController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    const users = await userService.getAllUsers()

    res.json(users)
  }
}

export default new UserController()
