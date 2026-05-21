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
  return result
}

const getSingleUserFromDB = async (id: number) => {
  const result = await pool.query(
    `
      SELECT * FROM users
      WHERE id=$1
    `,
    [id]
  )
  return result
}

const updateSingleUserOnDB = async (id: number, payload: IUser) => {
  const { name, password, age, is_active } = payload

  const result = await pool.query(
    `
      UPDATE users
      SET name=COALESCE($1, name),
      password=COALESCE($2, password),
      age=COALESCE($3, age),
      is_active=COALESCE($4, is_active)
      
      WHERE id=$5
      RETURNING *
    `,
    [name, password, age, is_active, id]
  )
  return result
}

const deleteSingleUserFromDB = async (id: number) => {
  const result = await pool.query(
    `
      DELETE FROM users WHERE id=$1
    `,
    [id]
  )
  return result
}

export const userService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserOnDB,
  deleteSingleUserFromDB
}
