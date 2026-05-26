import type { Request, Response } from 'express'
import sendResponse from '../../utility/sendResponse.js'
import { userService } from './user.service.js'

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createIntoDB(req.body)

    sendResponse(res, {
      statusCode: 201,
      message: 'created',
      data: result
    })
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      message: error?.message || 'internal server error',
      error: error
    })
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllFromDB()
    sendResponse(res, {
      statusCode: 200,
      message: 'all user fetch success',
      data: result
    })
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      message: error?.message,
      error: error
    })
  }
}

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await userService.getByIdFromDB(Number(id))
    if (!result) {
      return sendResponse(res, {
        statusCode: 404,
        message: 'user not found',
        data: {}
      })
    }

    sendResponse(res, {
      statusCode: 200,
      message: 'found single user',
      data: result
    })
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      message: error?.message,
      error: error
    })
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.updateInDB(Number(req.params.id), req.body)

    if (!result) {
      return sendResponse(res, {
        statusCode: 404,
        message: 'user not found',
        data: {}
      })
    }

    sendResponse(res, {
      statusCode: 200,
      message: 'user updated',
      data: result
    })
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      message: error?.message,
      error: error
    })
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const rowCount = await userService.deleteFromDB(Number(id))

    if (rowCount === 0) {
      return sendResponse(res, {
        statusCode: 404,
        message: 'user not found',
        data: {}
      })
    }

    sendResponse(res, {
      statusCode: 200,
      message: 'user removed'
    })
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      message: error?.message,
      error: error
    })
  }
}

export const userController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
}
