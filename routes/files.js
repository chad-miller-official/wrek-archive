var express = require('express')

var auth = require('../auth.js')
var database = require('../database.js')
var storage = require('../storage.js')

var router = express.Router()

router.get(
  '/',
  database.listFiles,
  (req, res) => {
    res.json(res.locals.archiveFiles)
  }
)

router.post(
  '/',
  auth.checkLoggedIn,
  storage.UPLOADER.array('wrekFiles'),
  database.newFileDocument,
  (req, res) => {
    res.redirect('/#/files')
  }
)

router.get(
  '/:id/download/',
  database.getFileById,
  storage.downloadFile
)

module.exports = router