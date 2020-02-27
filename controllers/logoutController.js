const homeController = {}

/**
 * This is the controller for the dashboard.
 *
 * @param {object } req - Express request object.
 * @param {object } res - Express response object.
 */
homeController.index = (req, res) => {
  req.session.destroy()
  res.redirect('/')
}

module.exports = homeController
