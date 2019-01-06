require('dotenv').config()

var assert = require('assert')
var express = require('express')
var serveStatic = require('serve-static')

var database = require('./database.js')
var storage = require('./storage.js')

database.getClient().connect((err, client) => {
  assert.equal(null, err)
  console.log('Successfully connected to MongoDB')
  client.close()
})

storage.S3_CLIENT.headBucket({ Bucket: process.env.S3_BUCKET_NAME }, (err, data) => {
  assert.equal(null, err)
  console.log('Successfully connected to S3')
})

app = express()

app.use('/', serveStatic(__dirname + '/dist'))
app.route('/files')
  .get(
    database.listFiles,
    (req, res) => {
      res.json(res.locals.archiveFiles)
    }
  )
  .post(
    storage.UPLOAD.array('wrekFiles'),
    database.newFileDocument,
    (req, res) => {
      res.redirect('/#/files')
    }
  )

app.get('/file/content/:id',
  database.getFileById,
  storage.getFile,
  (req, res) => {
    res.writeHead(200, {
      'Content-Type': res.locals.fileDocument.digitizedFormat,
      'Content-disposition': 'attachment;filename=' + res.locals.fileDocument.originalFileName,
      'Content-Length': res.locals.fileData.ContentLength
    })

    res.end(res.locals.fileData.Body, 'binary')
  }
)

var port = process.env.PORT || 5000

app.listen(port, () => {
  console.log('Server started on port ' + port)
})