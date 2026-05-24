import { type NextFunction, type Request, type Response } from 'express'

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'unauthorized'
      })
      return
    }
    // console.log(token)
    next()
  }
}

export default auth
