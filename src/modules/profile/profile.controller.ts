import type { Request, Response } from 'express'
import { profileService } from './profile.service.js'
import sendResponse from '../../utility/sendResponse.js'

const createProfile = async (req: Request, res: Response) => {
  try {
    const result = await profileService.createIntoDB(req.body)
    sendResponse(res, {
      statusCode: 201,
      data: result
    })
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      error: error
    })
  }
}

export const profileController = {
  createProfile
}
