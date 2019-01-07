require('dotenv').config()

var assert = require('assert')
var bcrypt = require('bcrypt')

var database = require('./database.js')

const USERNAME = process.argv[2]
const PASSWORD = process.argv[3]

if(!(USERNAME && PASSWORD))
{
  console.log('Usage: ' + process.argv[0] + ' ' + process.argv[1] + ' <username> <password>')
  process.exit(-1)
}

database.getClient().connect((err, client) => {
  assert.equal(null, err)
  console.log('Successfully connected to MongoDB')

  var db = client.db()
  console.log('Creating user "' + USERNAME + '"')

  bcrypt.hash(PASSWORD, 10, function(err, hash) {
    db.collection('users').findOne({ username: USERNAME }, (err, result) => {
      assert.equal(null, err)

      if(result)
      {
        console.log('User with username "' + USERNAME + '" already exists')
        process.exit(-1)
      }

      var params = {
        username: USERNAME,
        passwordHash: hash
      }

      db.collection('users').insertOne(params, (err, result) => {
        assert.equal(null, err)
        console.log('Created user "' + USERNAME + '"')
        client.close()
      })
    })
  })
})
