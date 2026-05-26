import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../../config/index.js'
import { pool } from '../../db/index.js'

const loginIntoDB = async (payload: { email: string; password: string }) => {
  const { email, password } = payload
  const userData = await pool.query(
    `
      SELECT * FROM users WHERE email=$1
    `,
    [email]
  )

  if (userData.rows.length === 0) throw new Error('invalid things entered')

  const user = userData.rows[0]

  const matchedPassword = await bcrypt.compare(password, user.password)
  if (!matchedPassword) throw new Error('invalid things entered')

  const jwtPayload = {
    id: user.id,
    name: user.name,
    is_active: user.is_active,
    role: user.role,
    email: user.email
  }
  const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: '1d'
  })

  return { accessToken }
}

export const authService = {
  loginIntoDB
}
