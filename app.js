const express = require('express')
const hbs = require('express-hbs')
const path = require('path')
const logger = require('morgan')

const app = express()
const port = 8000

const routes = require('./routes/homeRouter')

// view eninge setup
app.engine('hbs', hbs.express4({
  defaultLayout: path.join(__dirname, 'views', 'layouts', 'default'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

hbs.registerHelper('login', function (value, options) {
  return parseInt(value) + 1
})

// middleware
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/', routes)

// catch 404
app.use('*', (req, res) => {
  res.status(404)
  res.sendFile(path.join(__dirname, 'views', 'errors', '404.html'))
})

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send(err.message || 'Internal Server Error')
})

app.listen(port, () => console.log(`Server listening on: http://localhost:${port}`))
