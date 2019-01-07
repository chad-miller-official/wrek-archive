require('dotenv').config()

var bodyParser = require('body-parser')
var express = require('express')
var expressSession = require('express-session')
var serveStatic = require('serve-static')
var passport = require('passport')
var passportLocal = require('passport-local')

var database = require('./database.js')
var routesFiles = require('./routes/files.js')
var routesUsers = require('./routes/users.js')

passport.use(new passportLocal.Strategy(database.getUserForLogin))

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(database.getUserById)

app = express()

app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', serveStatic(__dirname + '/dist'))
app.use('/files', routesFiles)
app.use('/users', routesUsers)

var port = process.env.PORT || 5000

app.listen(port, () => {
  console.log('Server started on port ' + port)
})