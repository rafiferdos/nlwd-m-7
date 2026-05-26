import type { Response } from 'express'

// 1. Clean Type Definition (Strictly for Success Scenarios)
type TResponse<T> = {
  statusCode: number;
  success?: boolean;
  message?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
}

// 2. The Refactored Utility
const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  return res.status(data.statusCode).json({
    // Fallbacks guarantee consistent structure even if you forget to pass a field
    success: data.success ?? true,
    message: data.message || 'Operation successful',
    meta: data.meta || undefined,
    data: data.data,
  });
};

export default sendResponse;