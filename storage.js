var assert = require('assert')
var awsSdk = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')

awsSdk.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY.trim(),
  secretAccessKey: process.env.AWS_SECRET_KEY.trim()
})

const S3_CLIENT = new awsSdk.S3({ apiVersion: '2006-03-01' })
const UPLOAD = multer({
  storage: multerS3({
    s3: S3_CLIENT,
    bucket: process.env.S3_BUCKET_NAME,
    key: function(req, file, cb) {
      cb(null, Date.now() + '_' + file.originalname)
    }
  })
})

function downloadFile(req, res, next)
{
  var params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: res.locals.fileDocument.fileKey
  }

  res.attachment = res.locals.fileDocument.fileName
  res.writeHead(200, {
    'Content-Type': res.locals.fileDocument.mimeType,
    'Content-disposition': 'attachment;filename=' + res.locals.fileDocument.fileName,
    'Content-Length': res.locals.fileDocument.fileSize
  })

  var readStream = S3_CLIENT.getObject(params).createReadStream()
  readStream.pipe(res)
}

module.exports = {
  S3_CLIENT: S3_CLIENT,
  UPLOAD: UPLOAD,
  downloadFile: downloadFile
}