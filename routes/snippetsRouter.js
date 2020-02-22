const express = require('express')
const router = express.Router()

const controller = require('../controllers/snippetsController')

router.get('/', controller.index)
module.exports = router
