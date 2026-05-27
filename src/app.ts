import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { type Application, type Request, type Response } from 'express'
import config from './config/index.js'
import logger from './middleware/logger.js'
import { authRoute } from './modules/auth/auth.route.js'
import { profileRoute } from './modules/profile/profile.route.js'
import { userRoute } from './modules/user/user.route.js'
import globalErrorHandler from './utility/globalErrorHandler.js'

const app: Application = express()
const port = config.port

app.use(cookieParser())
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))

const corsOptions = {
  origin: 'http://localhost:3000'
}
app.use(cors(corsOptions))

app.use(logger)

//* user route
app.use('/api/users', userRoute)

//* profile route
app.use('/api/profiles', profileRoute)

//* auth route
app.use('/api/auth', authRoute)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'server is ongoing',
    creator: 'rafiferdos'
  })
})

app.use(globalErrorHandler)

export default app
