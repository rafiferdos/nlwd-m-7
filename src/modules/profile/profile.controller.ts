import type { Request, Response } from 'express'
import { profileService } from './profile.service.js'

const createProfile = async (req: Request, res: Response) => {
  try {
    const result = await profileService.createIntoDB(req.body)
    res.status(201).json({
      success: true,
      message: 'we did it bro, profile done',
      data: result
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || 'Something went wrong',
      error: error
    })
  }
}

export const profileController = {
  createProfile
}
