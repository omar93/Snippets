// const User = require('../models/User')

const homeController = {}

homeController.index = (req, res) => {
  res.render('login/index', { condition: true })
}
module.exports = homeController
