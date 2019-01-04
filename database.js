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
            var dateAddedObj = new Date(parseInt(matches[1]))

            var newDocument = {
                fileUrl: file.location,
                originalFileName: file.originalname,
                dateAdded: dateAddedObj,
                digitizedFormat: file.mimetype
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

        db.collection('archiveFiles').find().sort({ dateAdded: -1 }).toArray((err, result) => {
            assert.equal(null, err)
            res.locals.archiveFiles = result;
            client.close()
            next()
        })
    })
}

module.exports = {
    getClient: getClient,
    newFileDocument: newFileDocument,
    listFiles: listFiles,
}