import { Pool } from 'pg'
import config from '../config/index.js'

export const pool = new Pool({
  connectionString: config.connection_string
})

export const initDatabase = async () => {
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
