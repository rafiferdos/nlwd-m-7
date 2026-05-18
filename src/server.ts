import express, { type Application, type Request, type Response } from 'express'
import {Pool} from 'pg'

const app: Application = express()
const port = 5000

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended: true}))

const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_aDxSsd3yr0et@ep-autumn-paper-apsyz174-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
})

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'server is ongoing',
    creator: 'rafiferdos'
  })
})
app.post('/', (req: Request, res: Response) => {
  console.log(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
