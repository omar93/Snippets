// const User = require('../models/User')

const homeController = {}

homeController.index = (req, res) => {
  res.render('snippets/index', { condition: true })
}
module.exports = homeController
