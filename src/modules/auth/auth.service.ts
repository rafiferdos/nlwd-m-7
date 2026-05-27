import bcrypt from 'bcryptjs'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import config from '../../config/index.js'
import { pool } from '../../db/index.js'
import AppError from '../../utility/AppError.js'

const loginIntoDB = async (payload: { email: string; password: string }) => {
  const { email, password } = payload
  const userData = await pool.query(
    `
      SELECT * FROM users WHERE email=$1
    `,
    [email]
  )
  if (userData.rows.length === 0)
    throw new AppError(400, 'invalid things entered')

  const user = userData.rows[0]
  const matchedPassword = await bcrypt.compare(password, user.password)
  if (!matchedPassword) throw new AppError(400, 'invalid things entered')

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
  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: '90d'
    }
  )

  return { accessToken, refreshToken }
}

const generateRefreshToken = async (token: string) => {
  if (!token) throw new Error('unauthorized')

  const decoded = jwt.verify(
    token as string,
    config.jwt_refresh_secret as string
  ) as JwtPayload

  const userData = pool.query(
    `
        SELECT * FROM users WHERE email=$1
      `,
    [decoded.email]
  )

  if ((await userData).rows.length === 0)
    throw new AppError(404, 'user doesnt exists')

  const user = (await userData).rows[0]
  if (!user?.is_active) throw new AppError(403, 'forbidden')

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
  login: loginIntoDB,
  generateRefreshToken
}
