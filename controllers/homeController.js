const homeController = {}

homeController.index = (req, res) => {
  const user = req.session
  res.render('home/index', { user })
}
module.exports = homeController
