var aws_sdk = require('aws-sdk');

aws_sdk.config.update({region: 'us-east-2'});

function _getClient(accessKey, secretKey)
{
    return new aws_sdk.S3({
        apiVersion: '2006-03-01',
        accessKeyId: accessKey,
        secretAccessKey: secretKey
    });
}

module.exports = {
    getClient: _getClient
};