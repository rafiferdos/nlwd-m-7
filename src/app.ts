import express, { type Application, type Request, type Response } from 'express'
import config from './config/index.js'
import { userController } from './modules/user/user.controller.js'
import { userRoute } from './modules/user/user.route.js'

const app: Application = express()
const port = config.port

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))

// call database
// initDatabase()

app.use('/api/users', userRoute)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'server is ongoing',
    creator: 'rafiferdos'
  })
})

//*=== get single user ===*//

app.get('/api/users/:id', userController.getSingleUser)

//*=== update a user ===*//

app.put('/api/users/:id', userController.updateSingleUser)

//*=== delete a user ===*//
app.delete('/api/users/:id', userController.deleteSingleUser)

export default app
