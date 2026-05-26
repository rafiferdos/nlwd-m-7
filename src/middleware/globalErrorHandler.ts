import type { NextFunction, Request, Response } from 'express'
import sendResponse from '../utility/sendResponse.js'

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  sendResponse(res, {
    statusCode: 500,
    message: err?.message || 'internal server problem',
    error: err
  })
}

export default globalErrorHandler
