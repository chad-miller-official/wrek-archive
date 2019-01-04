require('dotenv').config();

var assert = require('assert');
var express = require('express');
var serveStatic = require('serve-static');

var database = require('./database.js');
var storage = require('./storage.js');

database.MONGODB_CLIENT.connect((err, client) => {
    assert.equal(null, err);
    console.log('Successfully connected to MongoDB');
    database.MONGODB_CLIENT.close();
});

storage.S3_CLIENT.headBucket({ Bucket: process.env.S3_BUCKET_NAME }, (err, data) => {
    assert.equal(null, err);
    console.log('Successfully connected to S3');
});

app = express();

app.use('/', serveStatic(__dirname + '/dist'));
app.post(
    '/upload',
    storage.UPLOAD.array('wrekFiles'),
    database.newFileDocument,
    (req, res) => {
        res.redirect('/#/files');
    }
);

var port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server started on port ' + port);
});