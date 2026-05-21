import express, { type Application, type Request, type Response } from 'express'
import config from './config/index.js'
import { pool } from './db/index.js'
import { userRoute } from './modules/user/user.route.js'
import { userController } from './modules/user/user.controller.js'

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
app.delete('/api/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const result = await pool.query(
      `
        DELETE FROM users WHERE id=$1
      `,
      [id]
    )
    // console.log(result)

    result.rowCount === 0 &&
      res.status(404).json({
        success: false,
        message: 'user not found',
        data: {}
      })

    res.status(200).json({
      success: true,
      message: 'user removed'
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error
    })
  }
})

export default app
