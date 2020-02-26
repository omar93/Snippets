const express = require('express')
const router = express.Router()

const controller = require('../controllers/registerController.js')

// Both the routes for the register
router.get('/', controller.index)
router.post('/new', controller.indexPost)

module.exports = router
