import express from 'express'
import { registerController } from '../controllers/registerController.js'

const router = express.Router()

// Both the routes for the register
router.get('/', registerController.index)
router.post('/new', registerController.indexPost)

export { router }
