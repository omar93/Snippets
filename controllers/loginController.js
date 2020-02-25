const User = require('../models/User')

const homeController = {}

homeController.index = (req, res) => {
  res.render('login/index')
}

homeController.indexPost = (req, res) => {
  User.findOne({ username: req.body.username, password: req.body.password }, (err, user) => {
    if (!err) {
      if (user) {
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
