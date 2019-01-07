var express = require('express')
var passport = require('passport')

var router = express.Router()

router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/#/login' }),
  (req, res) => {
    res.redirect('/#/')
  }
)

module.exports = router