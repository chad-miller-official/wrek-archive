function checkLoggedIn(req, res, next)
{
  if(req.user)
    next()
  else
    res.status(401).end()
}

module.exports = {
  checkLoggedIn
}