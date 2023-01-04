import express from 'express'
import { saveRows, getRows, getAddresses, getIntercityPoints } from '../controllers/rows.controller.js'

const router = express.Router()

router.post('/save', saveRows)
router.get('/get', getRows)
router.get('/addresses', getAddresses)
router.get('/intercity/points', getIntercityPoints)

export default router