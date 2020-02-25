// const User = require('../models/User')

const homeController = {}

homeController.index = (req, res) => {
  res.render('snippets/index')
}

homeController.new = (req, res) => {
  res.render('snippets/new')
}

homeController.create = (req, res) => {
  req.session.flash = { type: 'success', text: 'Snippet added to db' }
  res.redirect('.')
}
module.exports = homeController
