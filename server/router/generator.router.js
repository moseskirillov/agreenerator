import express from 'express'
import { generateAgreement } from '../controllers/generator.controller.js'
import { fieldsNormalizer } from '../middlewares/fields.validator.js'

const router = express.Router()

router.post('/agreement/generate', fieldsNormalizer, generateAgreement)

export default router