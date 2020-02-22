// const User = require('../models/User')

const homeController = {}

homeController.index = (req, res) => {
  res.render('register/index', { condition: true })
}

homeController.new = (req, res) => {
  res.render('register/index', { condition: true })
}

module.exports = homeController
