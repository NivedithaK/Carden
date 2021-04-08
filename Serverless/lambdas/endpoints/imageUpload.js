import Responses from '../../API_Responses';
import * as fileType from 'file-type';
import { v4 as uuid } from 'uuid';
import * as AWS from 'aws-sdk';

const s3 = new AWS.S3();

const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'video/mp4', 'audio/mp4'];

exports.handler = async event => {
    try {
        console.log(event);
        const body = JSON.parse(event.body);
        // console.log(body);
        console.log(body.mime, body.userID);
        if (!body || !body.image || !body.mime, !body.userID) {
            console.log("if 1");
            return Responses._400({ message: 'incorrect body on request' });
        }

        if (!allowedMimes.includes(body.mime)) {
            console.log("if 2");
            return Responses._400({ message: 'mime is not allowed ' });
        }
        let imageData = body.image;
        if (body.image.substr(0, 7) === 'base64,') {
            imageData = body.image.substr(7, body.image.length);
        }
        const buffer = Buffer.from(imageData, 'base64');
        const fileInfo = await fileType.fromBuffer(buffer);
        const detectedExt = fileInfo.ext;
        const detectedMime = fileInfo.mime;

        if (detectedMime !== body.mime) {
            return Responses._400({ message: 'mime types dont match' });
        }
        var name;
        if (body.name != undefined){
            name = body.name;
        }else{
            name = uuid();
        }
        console.log('this is the userid', body.userID);
        const key = body.userID + `/${name}`;
        // body.userID

        console.log(`writing image to bucket called ${key}.${detectedExt}`);
        
        await s3
            .putObject({
                Body: buffer,
                Key: key,
                ContentType: body.mime,
                Bucket: process.env.imageUploadBucket,
                ACL: 'public-read',
            })
            .promise();
        
        const url = `https://${process.env.imageUploadBucket}.s3.amazonaws.com/${key}`;
        return Responses._200({
            imageURL: url,
        });
    } catch (error) {
        console.log('error', error);
        
        return Responses._400({ message: error.message || 'failed to upload image' });
    }
};