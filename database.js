var assert = require('assert');
var mongodb = require('mongodb');

const MONGODB_CLIENT = new mongodb.MongoClient(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
);

function newFileDocument(req, res, next)
{
    MONGODB_CLIENT.connect((err, client) => {
        assert.equal(null, err);

        var db = client.db();
        var newDocuments = [];

        req.files.forEach((file) => {
            var matches = file.key.match(/^(\d+)_(.+)$/);
            var dateAddedObj = new Date(parseInt(matches[1]));

            var newDocument = {
                fileUrl: file.location,
                originalFileName: file.originalname,
                dateAdded: dateAddedObj,
                digitizedFormat: file.mimetype
            };

            newDocuments.push(newDocument);
        });

        db.collection('archiveFiles').insertMany(newDocuments, (err, res) => {
            assert.equal(null, err);
            client.close();
        });
    });

    next();
}

module.exports = {
    MONGODB_CLIENT: MONGODB_CLIENT,
    newFileDocument: newFileDocument,
};