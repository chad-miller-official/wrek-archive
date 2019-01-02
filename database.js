var mongodb = require('mongodb');

const CLIENT = new mongodb.MongoClient(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
);

module.exports = {
    CLIENT: CLIENT
};