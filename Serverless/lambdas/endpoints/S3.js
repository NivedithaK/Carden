const AWS = require('aws-sdk');

const s3Client = new AWS.S3();

const S3 = {
    async get(fileName, bucket) {
        const params = {
            Bucket: bucket,
        };

        let data = await s3Client.listObjectsV2(params).promise();

        if (!data) {
            throw Error(`Failed to get files from ${bucket}`);
        }

        return data;
    },
};

module.exports = S3;