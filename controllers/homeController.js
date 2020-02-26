const homeController = {}

/**
 * This is the controller for the homepage.
 *
 * @param {object } req - Express request object.
 * @param {object } res - Express response object.
 */
homeController.index = (req, res) => {
  const user = req.session
  res.render('home/index', { user })
}
module.exports = homeController
