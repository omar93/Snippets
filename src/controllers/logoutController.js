const logoutController = {}

/**
 * This is the controller for the dashboard.
 *
 * @param {object } req - Express request object.
 * @param {object } res - Express response object.
 */
logoutController.index = (req, res) => {
  req.session.destroy()
  res.redirect('/')
}

export { logoutController }