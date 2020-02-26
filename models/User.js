const mongoose = require('mongoose')

// The snippet schema used in the mongoDB for users
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

// The model that is using the schema to be exported for users
const User = mongoose.model('User', userSchema)

module.exports = User
