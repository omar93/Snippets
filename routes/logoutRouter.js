const express = require('express')
const router = express.Router()

const controller = require('../controllers/logoutController.js')

// Route for the logout
router.get('/', controller.index)

module.exports = router
