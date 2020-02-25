const User = require('../models/User')

const homeController = {}

homeController.index = (req, res) => {
  res.render('register/index', { condition: true })
}

homeController.new = (req, res) => {
  const newUser = new User()
  newUser.firstName = req.body.firstname
  newUser.lastName = req.body.lastname
  newUser.password = req.body.password
  newUser.email = req.body.email
  newUser.save()
  req.session.flash = { type: 'success', text: `${req.body.email} was registered successfully` }
  res.redirect('..')
}

module.exports = homeController
