// const User = require('../models/User')

const homeController = {}

homeController.index = (req, res) => {
  res.render('register/index', { condition: true })
}

homeController.new = (req, res) => {
  console.log('grattis')
  req.session.flash = { type: 'success', text: `user ${req.body.username} was registered successfully` }
  res.redirect('../login')
}

module.exports = homeController
