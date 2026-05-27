import type { Request, Response } from 'express'
import sendResponse from '../../utility/sendResponse.js'
import { userService } from './user.service.js'

const createUser = async (req: Request, res: Response) => {
  const result = await userService.create(req.body)

  sendResponse(res, {
    statusCode: 201,
    message: 'created',
    data: result
  })
}

const getAllUsers = async (req: Request, res: Response) => {
  const result = await userService.getAll()
  sendResponse(res, {
    statusCode: 200,
    message: 'all user fetch success',
    data: result
  })
}

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await userService.getById(Number(id))
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
}

const updateUser = async (req: Request, res: Response) => {
  const result = await userService.update(Number(req.params.id), req.body)

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
}

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const rowCount = await userService.delete(Number(id))

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
}

export { createUser, deleteUser, getAllUsers, getUserById, updateUser }
