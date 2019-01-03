var mongodb = require('mongodb');

function _getClient(mongoDbUri)
{
    return new mongodb.MongoClient(
        mongoDbUri,
        { useNewUrlParser: true }
    );
}

module.exports = {
    getClient: _getClient
};