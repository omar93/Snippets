const mongoose = require('mongoose')
const express = require('express')
const app = express()
mongoose.connect('mongodb+srv://admin:omar93@1dv023-cspjr.mongodb.net/test?retryWrites=true&w=majority')

mongoose.model('users', { name: String })

app.get('/users', (req, res) => {
  mongoose.model('users').find((er, users) => {
    res.send(users)
  })
})

app.listen('7879')
