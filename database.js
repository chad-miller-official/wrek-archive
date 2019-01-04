var mongodb = require('mongodb');

const MONGODB_CLIENT = new mongodb.MongoClient(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
);

module.exports = {
    MONGODB_CLIENT: MONGODB_CLIENT
};