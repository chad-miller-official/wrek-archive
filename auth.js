function checkLoggedIn(req, res, next)
{
  if(req.user)
    next()
  else
    res.redirect(401, '/#/login')
}

module.exports = {
  checkLoggedIn
}