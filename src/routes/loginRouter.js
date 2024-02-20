import express from 'express'
import { loginController } from '../controllers/loginController.js'

const router = express.Router()

// Both the routes for the login
router.get('/', loginController.index)
router.post('/', loginController.indexPost)

export { router }