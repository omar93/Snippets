import { User } from '../models/User.js' 

const loginController = {}

/**
 * This is the controller for the login page.
 * Just a GET for the index on login.
 *
 * @param {object } req - Express request object.
 * @param {object } res - Express response object.
 */
loginController.index = (req, res) => {
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
loginController.indexPost = async (req, res) => {
  await User.findOne({ email: req.body.email }, (err, user) => {
    if (err) { console.log(err) }
    if (!user) { 
      console.log('ingen användare?') 
      req.session.flash = { type: 'fail', text: `Welcome ${req.body.email}` }
      res.redirect('/login')
    }
    if (user) {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && isMatch === true) {
          req.session.email = user
          req.session.email = req.body.email
          req.session.flash = { type: 'success', text: `Welcome ${req.body.email}` }
          res.redirect('/')
          console.log('Password123:', isMatch) // -> Password123: true
        } else {
          console.log(err)
          req.session.flash = { type: 'failed', text: 'Wrong email or password' }
          res.redirect('./login')
        }
      })
    }
  })
}

export { loginController }