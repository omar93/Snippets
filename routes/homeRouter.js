const express = require('express')
const router = express.Router()

const controller = require('../controllers/homeController.js')

router.get('/', controller.index)

module.exports = router
