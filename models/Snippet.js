import mongoose from 'mongoose'

// The snippet schema used in the mongoDB for snippets
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

// The model that is using the schema to be exported for snippets
const Snippet = mongoose.model('Snippet', snippetSchema)

export { Snippet }
