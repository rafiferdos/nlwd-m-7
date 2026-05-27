import type { Request, Response } from 'express'
import sendResponse from '../../utility/sendResponse.js'
import { authService } from './auth.service.js'

const loginUser = async (req: Request, res: Response) => {
  const result = await authService.login(req.body)
  const { refreshToken } = result

  res.cookie('refreshToken', refreshToken, {
    secure: false,
    httpOnly: true,
    sameSite: 'lax'
  })
  sendResponse(res, {
    statusCode: 200,
    message: 'user login done',
    data: result
  })
}

const refreshToken = async (req: Request, res: Response) => {
  const result = await authService.generateRefreshToken(
    req.cookies.refreshToken
  )

  sendResponse(res, {
    statusCode: 200,
    message: 'access token done',
    data: result
  })
}

export { loginUser, refreshToken }
