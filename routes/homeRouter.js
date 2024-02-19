import express from 'express'
const router = express.Router()

import { homeController } from '../controllers/homeController.js'

// The route for the starting page
router.get('/', homeController.index)

export { router } 
