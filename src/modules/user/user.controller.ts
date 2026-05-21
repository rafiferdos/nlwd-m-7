import type { Request, Response } from 'express'
import { userService } from './user.service.js'

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUserIntoDB(req.body)

    res.status(201).json({
      success: true,
      message: 'created',
      data: result
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error
    })
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsersFromDB()
    res.status(200).json({
      success: true,
      message: 'all user fetch success',
      data: result.rows
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error
    })
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const result = await userService.getSingleUserFromDB(Number(id))
    result.rows.length === 0 &&
      res.status(404).json({
        success: false,
        message: 'user not found',
        data: {}
      })

    res.status(200).json({
      success: true,
      message: 'found single user',
      data: result.rows[0]
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error
    })
  }
}

const updateSingleUser = async (req: Request, res: Response) => {
  const result = await userService.updateSingleUserOnDB(
    Number(req.params.id),
    req.body
  )

  result.rows.length === 0 &&
    res.status(404).json({
      success: false,
      message: 'user not found',
      data: {}
    })

  try {
    res.status(200).json({
      success: true,
      message: 'user updated',
      data: result.rows[0]
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error
    })
  }
}

const deleteSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await userService.deleteSingleUserFromDB(Number(id))
  try {
    result.rowCount === 0 &&
      res.status(404).json({
        success: false,
        message: 'user not found',
        data: {}
      })

    res.status(200).json({
      success: true,
      message: 'user removed'
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error
    })
  }
}

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser
}
