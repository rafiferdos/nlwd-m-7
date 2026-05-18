import express, { type Application, type Request, type Response } from 'express'
import { Pool } from 'pg'

const app: Application = express()
const port = 5000

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))

const pool = new Pool({
  connectionString:
    'postgresql://neondb_owner:npg_aDxSsd3yr0et@ep-autumn-paper-apsyz174-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
})

const initDatabase = async () => {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
          id SERIAL PRIMARY KEY,
          name VARCHAR(30),
          email VARCHAR(40) UNIQUE NOT NULL,
          password VARCHAR(20) NOT NULL,
          is_active BOOLEAN DEFAULT true,
          age INT,

          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        )
      `)
    console.log('🚀 db is running...')
  } catch (error) {
    console.log(error)
  }
}

// call database
initDatabase()

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'server is ongoing',
    creator: 'rafiferdos'
  })
})

//*=== create user ===*//

app.post('/api/users', async (req: Request, res: Response) => {
  try {
    const { name, email, password, age } = req.body
    const result = await pool.query(
      `
      INSERT INTO
      users(name, email, password, age)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `,
      [name, email, password, age]
    )
    console.log('🚀 ~ result:', result)

    res.status(201).json({
      success: true,
      message: 'created',
      data: result.rows[0]
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error
    })
  }
})

//*=== get all users ===*//

app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
        SELECT * FROM users 
      `)
    res.status(200).json({
      success: true,
      message: 'all user fetch success',
      data: result.rows
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error
    })
  }
})

//*=== get single user ===*//

app.get('/api/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const result = await pool.query(
      `
        SELECT * FROM users
        WHERE id=$1
      `,
      [id]
    )

    result.rows.length === 0 &&
      res.status(404).json({
        success: false,
        message: 'user not found',
        data: {}
      })

    res.status(200).json({
      success: true,
      message: 'found single user',
      data: result.rows[0]
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error
    })
  }
})

//*=== update a user ===*//

app.put('/api/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, password, age, is_active } = req.body

  const result = await pool.query(
    `
      UPDATE users
      SET name=COALESCE($1, name),
      password=COALESCE($2, password),
      age=COALESCE($3, age),
      is_active=COALESCE($4, is_active)
      
      WHERE id=$5
      RETURNING *
    `,
    [name, password, age, is_active, id]
  )
  // console.log('🚀 ~ result:', result)
  result.rows.length === 0 &&
    res.status(404).json({
      success: false,
      message: 'user not found',
      data: {}
    })

  try {
    res.status(200).json({
      success: true,
      message: 'user updated',
      data: result.rows[0]
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error
    })
  }
})

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
    console.log(result)

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
