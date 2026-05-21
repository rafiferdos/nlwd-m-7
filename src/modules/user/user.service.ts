import { pool } from '../../db/index.js'
import type { IUser } from './user.interface.js'

const createIntoDB = async (userData: IUser) => {
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

const getAllFromDB = async () => {
  const result = await pool.query(
    `
      SELECT * FROM users 
    `
  )
  return result
}

const getByIdFromDB = async (id: number) => {
  const result = await pool.query(
    `
      SELECT * FROM users
      WHERE id=$1
    `,
    [id]
  )
  return result
}

const updateInDB = async (id: number, payload: IUser) => {
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

const deleteFromDB = async (id: number) => {
  const result = await pool.query(
    `
      DELETE FROM users WHERE id=$1
    `,
    [id]
  )
  return result
}

export const userService = {
  createIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateInDB,
  deleteFromDB
}
