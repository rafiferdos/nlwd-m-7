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

export const userService = {
  createUserIntoDB
}
