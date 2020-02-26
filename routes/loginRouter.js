const express = require('express')
const router = express.Router()

const controller = require('../controllers/loginController.js')

// Both the routes for the login
router.get('/', controller.index)
router.post('/', controller.indexPost)

module.exports = router
