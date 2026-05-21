import type { Request, Response } from "express"
import { pool } from "../../db/index.js"

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, age } = req.body
    const result = await pool.query(
      `
      INSERT INTO
      users(name, email, password, age)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `,
      [name, email, password, age]
    )
    console.log('🚀 ~ result:', result)

    res.status(201).json({
      success: true,
      message: 'created',
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

export const userController = {createUser}