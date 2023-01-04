import express from 'express'
import authRouter from './auth.router.js'
import rowsRouter from './rows.router.js'
import generatorRouter from './generator.router.js'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/rows', rowsRouter)
router.use('/generator', generatorRouter)

export default router