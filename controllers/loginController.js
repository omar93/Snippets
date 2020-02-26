const User = require('../models/User')

const homeController = {}

/**
 * This is the controller for the login page.
 * Just a GET for the index on login.
 *
 * @param {object } req - Express request object.
 * @param {object } res - Express response object.
 */
homeController.index = (req, res) => {
  res.render('login/index')
}

/**
 * This is the controller for the actual login
 * where user fills out credentials and POSTs it
 * to the server to get a response.
 *
 * @param {object } req - Express request object.
 * @param {object } res - Express response object.
 */
homeController.indexPost = (req, res) => {
  User.findOne({ email: req.body.email, password: req.body.password }, (err, user) => {
    if (!err) {
      if (user) {
        req.session.email = req.body.email
        req.session.flash = { type: 'success', text: `Welcome ${req.body.email}` }
        res.redirect('..')
      } else {
        req.session.flash = { type: 'failed', text: 'Wrong email or password' }
        res.redirect('./login')
      }
    }
  })
}
module.exports = homeController
