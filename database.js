var assert = require('assert')
var mongodb = require('mongodb')

function getClient()
{
  return new mongodb.MongoClient(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
  )
}

function newFileDocument(req, res, next)
{
  getClient().connect((err, client) => {
    assert.equal(null, err)

    var db = client.db()
    var newDocuments = []

    req.files.forEach((file) => {
      var matches = file.key.match(/^(\d+)_(.+)$/)
      var dateUploadedObj = new Date(parseInt(matches[1]))

      var newDocument = {
        fileName: file.originalname,
        fileKey: file.key,
        fileSize: file.size,
        dateUploaded: dateUploadedObj,
        mimeType: file.mimetype,
      };

      newDocuments.push(newDocument)
    })

    db.collection('archiveFiles').insertMany(newDocuments, (err, result) => {
      assert.equal(null, err)
      client.close()
      next()
    })
  })
}

function listFiles(req, res, next)
{
  getClient().connect((err, client) => {
    assert.equal(null, err)
    var db = client.db()

    db.collection('archiveFiles').find().sort({ dateUploaded: -1 }).toArray((err, result) => {
      assert.equal(null, err)
      res.locals.archiveFiles = result;
      client.close()
      next()
    })
  })
}

function getFileById(req, res, next)
{
  getClient().connect((err, client) => {
    assert.equal(null, err)
    var db = client.db()

    db.collection('archiveFiles').findOne({ _id: mongodb.ObjectID(req.params.id) }, (err, result) => {
      res.locals.fileDocument = result
      client.close()
      next()
    })
  })
}

module.exports = {
  getClient: getClient,
  newFileDocument: newFileDocument,
  listFiles: listFiles,
  getFileById: getFileById,
}