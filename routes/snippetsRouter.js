const express = require('express')
const router = express.Router()

const controller = require('../controllers/snippetsController')

router.get('/', controller.index)
router.get('/new', controller.new)
router.post('/create', controller.create)
module.exports = router
