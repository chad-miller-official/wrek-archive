var assert = require('assert')
var bcrypt = require('bcrypt')
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

function getUserForLogin(username, password, done)
{
  getClient().connect((err, client) => {
    assert.equal(null, err)
    var db = client.db()

    db.collection('users').findOne({ username }, (err, result) => {
      if(err)
        return done(err)

      bcrypt.compare(password, result.passwordHash, (err, res) => {
        if(err)
          return done(err)

        if(res)
        {
          delete result['passwordHash']
          return done(null, result)
        }

        return done(null, false);
      })
    })
  })
}

function getUserById(id, done)
{
  getClient().connect((err, client) => {
    assert.equal(null, err)
    var db = client.db()

    db.collection('users').findOne({ _id: mongodb.ObjectID(id) }, (err, result) => {
      if(err)
        return done(err)

      return done(null, result)
    })
  })
}

module.exports = {
  getClient,
  getFileById,
  getUserById,
  getUserForLogin,
  listFiles,
  newFileDocument
}