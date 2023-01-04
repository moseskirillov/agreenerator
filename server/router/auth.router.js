import express from 'express'
import { register, login, check } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/registration', register)
router.post('/login', login)
router.get('/check', check)

export default router