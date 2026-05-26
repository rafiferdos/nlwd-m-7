import { type NextFunction, type Request, type Response } from 'express'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import config from '../config/index.js'
import { pool } from '../db/index.js'
import type { Roles } from '../types/index.js'

const auth = (...roles: Roles[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log(roles)
    try {
      const token = req.headers.authorization

      if (!token) {
        res.status(401).json({
          success: false,
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
        return res.status(404).json({
          success: false,
          message: 'user not found'
        })

      const user = (await userData).rows[0]
      if (!user?.is_active)
        return res.status(403).json({
          success: false,
          message: 'forbidden'
        })

      if (roles.length && !roles.includes(user.role))
        return res.status(403).json({
          success: false,
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
