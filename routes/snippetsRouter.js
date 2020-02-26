const express = require('express')
const router = express.Router()

const controller = require('../controllers/snippetsController')

// All the routes for the snippets
router.get('/', controller.index)

router.get('/new', controller.new)

router.post('/create', controller.create)

router.get('/:id/edit', controller.edit)
router.post('/:id/update', controller.update)

router.post('/:id/delete', controller.delete)
router.get('/:id/remove', controller.remove)

module.exports = router
