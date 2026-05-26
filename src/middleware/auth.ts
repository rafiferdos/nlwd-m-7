import { type NextFunction, type Request, type Response } from 'express'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import config from '../config/index.js'
import { pool } from '../db/index.js'
import type { Roles } from '../types/index.js'
import sendResponse from '../utility/sendResponse.js'

const auth = (...roles: Roles[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log(roles)
    try {
      const token = req.headers.authorization

      if (!token) {
        sendResponse(res, {
          statusCode: 401,
          message: 'unauthorized'
        })
        return
      }

      const decoded = jwt.verify(
        token as string,
        config.jwt_secret as string
      ) as JwtPayload

      const userData = pool.query(
        `
        SELECT * FROM users WHERE email=$1
      `,
        [decoded.email]
      )

      if ((await userData).rows.length === 0)
        return sendResponse(res, {
          statusCode: 404,
          message: 'user not found'
        })

      const user = (await userData).rows[0]
      if (!user?.is_active)
        return sendResponse(res, {
          statusCode: 403,
          message: 'forbidden'
        })

      if (roles.length && !roles.includes(user.role))
        return sendResponse(res, {
          statusCode: 403,
          message: 'forbidden'
        })

      req.user = decoded

      next()
    } catch (error) {
      next(error)
    }
  }
}

export default auth
