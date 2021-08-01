const express = require("express")
const bodyParser = require('body-parser')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const config = require('../src/config')
const log = require('./modules/logger')

require('./modules/auth/bearer') //Bearer strategy
require('./modules/db/sequelize') //DB connect

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(cookieParser(config.ENV.COOKIE_SECRET))

const api = require('./routes/api')
const auth = require('./routes/auth')

app.use('/api', api)
app.use('/auth', auth)

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404)
  log.info(`${req.method}, ${res.statusCode}, ${req.url}`, {service: 'app.js'});
  res.json({
    error: 'Not found'
  })
  return;
})

module.exports = app;
