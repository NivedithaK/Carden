import * as AWS from 'aws-sdk';

const s3 = new AWS.S3();

exports.handler = async event => {
    console.log(event)
    // console.log('Received event:', JSON.stringify(event, null, 2));
    try {
        const id = event.queryStringParameters ? event.queryStringParameters.ID : null;
        console.log(id);
        var params = { 
            Bucket: process.env.imageUploadBucket,
            Prefix: id + "/"
        }
    
        console.log("Checkpoint 1");

        let s3Objects

        try {
        s3Objects = await s3.listObjectsV2(params).promise();
        console.log(s3Objects)
        } catch (e) {
        console.log(e)
        }


        console.log("Checkpoint 2");

        // Assuming you're using API Gateway
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            }, 
            body: JSON.stringify(s3Objects),
        }
    } catch (error) {
    console.log('error', error);

    return Responses._400({ message: error.message});
}
};