import 'dotenv/config.js'
import express from 'express'
import hbs from 'express-hbs/lib/hbs.js'
import path from 'path'
import logger  from 'morgan'

const app = express()
const port = process.env.port || 8000 
const __dirname = import.meta.dirname;

import { router as routes } from  './routes/homeRouter.js'
import { router as register} from './routes/registerRouter.js'
import { router as login} from './routes/loginRouter.js'
import { router as snippets} from './routes/snippetsRouter.js'
import { router as logout } from './routes/logoutRouter.js'

import session from 'express-session'
import mongoose from 'mongoose'

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

// middleware
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../public')))

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
app.use('/logout', logout)

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
