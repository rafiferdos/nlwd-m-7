import type { NextFunction, Request, Response } from "express"
import fs from 'fs'

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    'method, url, time - ',
    req.method,
    ', ',
    req.url,
    ', ',
    Date.now()
  )
  const log = `method -> ${req.method} | url -> ${req.url} | time -> ${Date.now()}`
  fs.appendFile('logs.txt', log + '\n', (err) => {
    if (err) {
      console.error('Error writing to log file:', err)
    }
  })
  next()
}

export default logger