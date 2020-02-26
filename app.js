require('dotenv').config()
const express = require('express')
const hbs = require('express-hbs')
const path = require('path')
const logger = require('morgan')

const app = express()
const port = 8000

const routes = require('./routes/homeRouter')
const register = require('./routes/registerRouter')
const login = require('./routes/loginRouter')
const snippets = require('./routes/snippetsRouter')
const session = require('express-session')
const mongoose = require('mongoose')

// atlas mongodb connection
mongoose.connect(process.env.connectionsString, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

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

hbs.registerHelper('register', function (value, options) {
  return parseInt(value) + 1
})

// middleware
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// express session middleware
const sessionOptions = {
  name: 'assign2 1dv023',
  secret: 'assign2SecretKeyoa222ct',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}
app.use(session(sessionOptions))

// middleware to be executed before the routes
app.use((req, res, next) => {
  // the message shown when you register, login or handle snippets
  if (req.session.flash) {
    res.locals.flash = req.session.flash
    delete req.session.flash
  }
  next()
})

// routes
app.use('/', routes)
app.use('/register', register)
app.use('/login', login)
app.use('/snippets', snippets)

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
