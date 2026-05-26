import type { Request, Response } from 'express'
import { authService } from './auth.service.js'

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginIntoDB(req.body)

    const { refreshToken } = result

    res.cookie('refreshToken', refreshToken, {
      secure: false,
      httpOnly: true,
      sameSite: 'lax'
    })

    res.status(200).json({
      success: true,
      message: 'user login done',
      data: result
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error
    })
  }
}

const refreshToken = async (req: Request, res: Response) => {
  try {
    const result = await authService.generateRefreshToken(req.cookies.refreshToken)

    res.status(200).json({
      success: true,
      message: 'access token done',
      data: result
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error
    })
  }
}

export const authController = {
  loginUser,
  refreshToken
}
