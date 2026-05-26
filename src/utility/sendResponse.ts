import type { Response } from 'express'

type TResponseData<T> = {
  statusCode: number
  success?: boolean
  message?: string
  meta?: {
    page: number
    limit: number
    total: number
  }
  data?: T | null
  error?: any
}

const sendResponse = <T>(res: Response, data: TResponseData<T>) => {
  // Auto-calculate success if not explicitly provided
  const isSuccess = data.success !== undefined 
    ? data.success 
    : (data.statusCode >= 200 && data.statusCode < 300)

  res.status(data.statusCode).json({
    success: isSuccess,
    message: data.message || (isSuccess ? 'Operation successful' : 'Operation failed'),
    meta: data.meta || undefined,
    data: data.data || null,
    error: data.error || null
  })
}

export default sendResponse