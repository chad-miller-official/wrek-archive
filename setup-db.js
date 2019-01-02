var assert = require('assert');
var mongodb = require('mongodb');

const mongoClient = new mongodb.MongoClient(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
);

mongoClient.connect(function(err, client) {
    assert.equal(null, err);
    console.log('Successfully connected to MongoDB');

    var db = client.db();
    console.log('Creating archiveFiles collection');

    var archiveFilesSchema = {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: [
                    "file",
                    "dateAdded",
                    "parts",
                    "originalFormat",
                    "digitizedFormat"
                ],
                properties: {
                    file: {
                        bsonType: "string",
                        description: "URI of the archive file"
                    },
                    dateAdded: {
                        bsonType: "date",
                        description: "The date the file was added to the site"
                    },
                    parts: {
                        bsonType: "array",
                        items: {
                            bsonType: "object",
                            required: [
                                "artists",
                                "date",
                                "program",
                            ],
                            properties: {
                                artists: {
                                    bsonType: "array",
                                    items: {
                                        bsonType: "string"
                                    },
                                    description: "List of artists associated with the file",
                                    uniqueItems: true,
                                    minItems: 1
                                },
                                date: {
                                    bsonType: "date",
                                    description: "Dates associated with this part of the file",
                                },
                                program: {
                                    bsonType: "string",
                                    description: "The name of the program this part of the file was originally recorded for"
                                }
                            }
                        },
                        uniqueItems: true,
                        minItems: 1
                    },
                    originalFormat: {
                        enum: [
                            "CD",
                            "VHS",
                            "Betamax",
                            "Digital Tape",
                            "Cassette",
                            "Reel"
                        ],
                        description: "The type of medium the file was originally recorded to"
                    },
                    digitizedFormat: {
                        bsonType: "string",
                        description: "The file's type"
                    },
                    notes: {
                        bsonType: "string",
                        description: "Any additional notes regarding the file's condition or contents"
                    }
                }
            }
        }
    };

    db.createCollection("archiveFiles", archiveFilesSchema, function(err) {
        console.log("Created collection");
        mongoClient.close();
    });
});