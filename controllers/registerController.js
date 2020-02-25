const User = require('../models/User')

const homeController = {}

homeController.index = (req, res) => {
  res.render('register/index', { condition: true })
}

homeController.indexPost = (req, res) => {
  const newUser = new User({
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    password: req.body.password,
    email: req.body.email
  })
  newUser.save()
  req.session.flash = { type: 'success', text: `${req.body.email} was registered successfully` }
  res.redirect('..')
}

module.exports = homeController
