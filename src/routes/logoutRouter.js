import express from 'express'
import { logoutController } from '../controllers/logoutController.js'

const router = express.Router()

// Route for the logout
router.get('/', logoutController.index)

export { router }
