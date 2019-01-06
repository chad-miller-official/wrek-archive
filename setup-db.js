require('dotenv').config()

var assert = require('assert')
var database = require('./database.js')

const ARCHIVE_FILES_SCHEMA = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
          "fileUrl",
          "originalFileName",
          "fileKey",
          "dateAdded",
          "digitizedFormat"
      ],
      properties: {
        fileUrl: {
          bsonType: "string",
          description: "URL of the digitized archive file"
        },
        originalFileName: {
          bsonType: "string",
          description: "Original name of the digitized archive file"
        },
        fileKey: {
          bsonType: "string",
          description: "The S3 key of the digitized archive file"
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
            "DAT",
            "Cassette",
            "5_Reel",
            "7_Reel",
            "10_Reel",
            "Digital"
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
}

database.getClient().connect((err, client) => {
  assert.equal(null, err)
  console.log('Successfully connected to MongoDB')

  var db = client.db()
  console.log('Creating archiveFiles collection')

  db.createCollection('archiveFiles', ARCHIVE_FILES_SCHEMA, (err) => {
    assert.equal(null, err)
    console.log('Created collection')
    client.close()
   })
})
