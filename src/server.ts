import app from './app.js'
import config from './config/index.js'
import { initDatabase } from './db/index.js'

const main = () => {
  initDatabase()
  app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
  })
}

main()
