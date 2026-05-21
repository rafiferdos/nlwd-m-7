import { pool } from '../../db/index.js'
import type { IUser } from './user.interface.js'

const createUserIntoDB = async (userData: IUser) => {
  const { name, email, password, age } = userData
  const result = await pool.query(
    `
      INSERT INTO
      users(name, email, password, age)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `,
    [name, email, password, age]
  )
  return result.rows[0]
}

const getAllUsersFromDB = async () => {
  const result = await pool.query(
    `
      SELECT * FROM users 
    `
  )
  return result.rows
}

const getSingleUserFromDB = async (id: number) => {
      const result = await pool.query(
      `
        SELECT * FROM users
        WHERE id=$1
      `,
      [id]
    )
  return result.rows[0]
}

export const userService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB
}
