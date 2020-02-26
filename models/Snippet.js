const mongoose = require('mongoose')

const snippetSchema = new mongoose.Schema({
  snippet: {
    type: String,
    required: true
  },
  creator: {
    type: String,
    required: false
  }
}, {
  timestamps: true
})

const Snippet = mongoose.model('Snippet', snippetSchema)

module.exports = Snippet
