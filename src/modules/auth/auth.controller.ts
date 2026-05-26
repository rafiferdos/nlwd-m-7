import type { Request, Response } from 'express'
import sendResponse from '../../utility/sendResponse.js'
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
    sendResponse<{ accessToken: string; refreshToken: string }>(res, {
      statusCode: 200,
      success: true,
      message: 'user login done',
      data: result
    })
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      error: error
    })
  }
}

const refreshToken = async (req: Request, res: Response) => {
  try {
    const result = await authService.generateRefreshToken(
      req.cookies.refreshToken
    )

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'access token done',
      data: result
    })
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      error: error
    })
  }
}

export const authController = {
  loginUser,
  refreshToken
}
