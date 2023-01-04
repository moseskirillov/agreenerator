import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { sequelize } from './db/connect.js'
import router from './router/index.router.js'

const app = express()
app.use(cors())
app.use(json())
app.use('/api', router)
dotenv.config()

const port = 3001

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(port, () => {
      console.log(`App start in port ${port}`)
    })
  } catch (error) {
    console.error(error)
  }
}

(() => start())()