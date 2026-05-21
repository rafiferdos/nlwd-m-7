import express, { type Application, type Request, type Response } from 'express'
import config from './config/index.js'
import { userRoute } from './modules/user/user.route.js'
import { profileRoute } from './modules/profile/profile.route.js'

const app: Application = express()
const port = config.port

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))

//* user route
app.use('/api/users', userRoute)

//* profile route
app.use('/api/profiles', profileRoute)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'server is ongoing',
    creator: 'rafiferdos'
  })
})

export default app
