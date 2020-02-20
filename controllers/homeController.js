var mongoose = require('mongoose')
mongoose.connect('mongodb+srv://admin:omar93@1dv023-cspjr.mongodb.net/assign2?retryWrites=true&w=majority')

const homeController = {}

const Schema = mongoose.Schema

const userDataSchema = new Schema({
  name: String,
  pw: String
}, { collection: 'user-data' })

const UserData = mongoose.model('UserData', userDataSchema)

homeController.index = (req, res) => {
  res.render('home/index')
}

homeController.indexPost = (req, res) => {
  const item = {
    name: req.body.username,
    pw: req.body.password
  }

  const data = new UserData(item)
  data.save()

  res.redirect('/')
}

module.exports = homeController
