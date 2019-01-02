var assert = require('assert');
var database = require('./database.js');
var express = require('express');
var serveStatic = require('serve-static');

database.CLIENT.connect(function(err) {
    assert.equal(null, err);
    console.log('Successfully connected to MongoDB');
});

app = express();
app.use(serveStatic(__dirname + '/dist'));

var port = process.env.PORT || 5000;
app.listen(port);

console.log('Server started on port ' + port);