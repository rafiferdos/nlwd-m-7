import type { Request, Response } from 'express'
import sendResponse from '../../utility/sendResponse.js'
import { profileService } from './profile.service.js'

const createProfile = async (req: Request, res: Response) => {
  const result = await profileService.create(req.body)
  sendResponse(res, {
    statusCode: 201,
    data: result
  })
}

export { createProfile }
