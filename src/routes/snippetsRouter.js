import express from 'express'
import { snippetsController } from '../controllers/snippetsController.js'

const router = express.Router()

// All the routes for the snippets
router.get('/', snippetsController.index)

router.get('/new', snippetsController.new)

router.post('/create', snippetsController.create)

router.get('/:id/edit', snippetsController.edit)
router.post('/:id/update', snippetsController.update)

router.post('/:id/delete', snippetsController.delete)
router.get('/:id/remove', snippetsController.remove)

export { router }
