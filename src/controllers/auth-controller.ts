import { NextFunction, Request, Response } from 'express'
import { authService } from '../services'

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body

    const userData = await authService.register({ email, password })

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    })

    res.status(201).json(userData)
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body

    const userData = await authService.login({ email, password })

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    })

    res.json(userData)
  }

  async logout(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken

    await authService.logout(refreshToken)
    res.clearCookie('refreshToken')

    res.json({
      refreshToken,
    })
  }

  async activate(req: Request, res: Response) {
    const { link } = req.params
    await authService.activate(link)

    res.redirect(process.env.CLIENT_URL! + '/login')
  }

  async refresh(req: Request, res: Response) {
    const { refreshToken } = req.cookies

    const userData = await authService.refresh(refreshToken)

    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    })

    res.json(userData)
  }
}

export default new AuthController()
