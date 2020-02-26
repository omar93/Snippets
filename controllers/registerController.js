const User = require('../models/User')

const homeController = {}

/**
 * This is the controller for the register page
 * just a GET for the index on register.
 *
 * @param {object } req - Express request object.
 * @param {object } res - Express response object.
 */
homeController.index = (req, res) => {
  res.render('register/index', { condition: true })
}

/**
 * This is the register controller where user
 * enters their information and POSTS it to the server
 * to get an entry in the mognoDB.
 *
 * @param {object } req - Express request object.
 * @param {object } res - Express response object.
 */
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
