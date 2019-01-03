var assert = require('assert');
var express = require('express');
var serveStatic = require('serve-static');

var database = require('./src/database.js');
var storage = require('./src/storage.js');

var mongoClient = database.getClient(process.env.VUE_APP_MONGODB_URI);

mongoClient.connect(function(err) {
    assert.equal(null, err);
    console.log('Successfully connected to MongoDB');
    mongoClient.close();
});

var s3 = storage.getClient(
    process.env.VUE_APP_AWS_ACCESS_KEY.trim(),
    process.env.VUE_APP_AWS_SECRET_KEY.trim()
);

s3.headBucket(
    { Bucket: process.env.VUE_APP_S3_BUCKET_NAME },
    function(err, data) {
        assert.equal(null, err);
        console.log('Successfully connected to S3');

    }
)

app = express();
app.use(serveStatic(__dirname + '/dist'));

var port = process.env.PORT || 5000;
app.listen(port);

console.log('Server started on port ' + port);