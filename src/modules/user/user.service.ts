import bcrypt from 'bcryptjs'
import { pool } from '../../db/index.js'
import type { IUser } from './user.interface.js'

const createIntoDB = async (userData: IUser) => {
  const { name, email, password, age, role } = userData
  const hashPassword = await bcrypt.hash(password, 10)
  const result = await pool.query(
    `
      INSERT INTO
      users(name, email, password, age, role)
      VALUES($1, $2, $3, $4, COALESCE($5, 'user'))
      RETURNING *
    `,
    [name, email, hashPassword, age, role]
  )
  delete result.rows[0].password
  return result.rows[0]
}

const getAllFromDB = async () => {
  const result = await pool.query(
    `
      SELECT * FROM users 
    `
  )
  return result.rows
}

const getByIdFromDB = async (id: number) => {
  const result = await pool.query(
    `
      SELECT * FROM users
      WHERE id=$1
    `,
    [id]
  )
  return result.rows[0]
}

const updateInDB = async (id: number, payload: IUser) => {
  const { name, password, age, is_active, role } = payload

  const result = await pool.query(
    `
      UPDATE users
      SET name=COALESCE($1, name),
      password=COALESCE($2, password),
      age=COALESCE($3, age),
      is_active=COALESCE($4, is_active),
      role=COALESCE($6, role)
      
      WHERE id=$5
      RETURNING *
    `,
    [name, password, age, is_active, id, role]
  )
  return result.rows[0]
}

const deleteFromDB = async (id: number) => {
  const result = await pool.query(
    `
      DELETE FROM users WHERE id=$1
    `,
    [id]
  )
  return result.rowCount
}

export const userService = {
  createIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateInDB,
  deleteFromDB
}
