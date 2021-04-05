import React, { useState } from "react";
import ImageUploader from 'react-images-upload';
import Axios from 'axios';

const UploadComponent = props => (
    <form>
        <ImageUploader
            key="image-uploader"
            withIcon={true}
            singleImage={true}
            withPreview={true}
            label="Maximum size file: 5MB"
            buttonText="Choose an image"
            onChange={props.onImage}
            imgExtension={['.jpg', '.png', '.jpeg', '.gif', '.mp4']}
            maxFileSize={5242880}
        ></ImageUploader>
    </form>
);

const Upload = (props) => {
    const [progress, setProgress] = useState('getUpload');
    const [url, setImageURL] = useState('https://g892ued5af.execute-api.us-east-1.amazonaws.com/dev/image-upload');
    const [errorMessage, setErrorMessage] = useState('');
    const onUrlChange = e => {
        setImageURL(e.target.value);
    };

    const onImage = async (failedImages, successImages) => {
        if (props.auth.user == null){
            console.log("User not logged in");
            setErrorMessage("Please Login as User");
            setProgress('uploadError');
            
        } else {
            setProgress('uploading');

            try {
                console.log(props.auth.user['_id'])
                const userID = props.auth.user['_id'];
                console.log('successImages', successImages);
                const parts = successImages[0].split(';');
                const mime = parts[0].split(':')[1];
                const name = parts[1].split('=')[1];
                const data = parts[2];
                const res = await Axios.post("https://g892ued5af.execute-api.us-east-1.amazonaws.com/dev/image-upload", { mime, name, image: data,userID});

                setImageURL(res.data.imageURL);
                setProgress('uploaded');
                const files = await Axios.get(url, { params: {ID: userID} });
                console.log(files);
                console.log(files.data);
                var index;
                for (index in files.data.Contents){
                    console.log(files.data.Contents[index].Key)
                }
                console.log(files.data.Contents);
                props.uploadToCanvas(null, 'Image', res.data.imageURL);
            } catch (error) {
                console.log('error in upload', error);
                setErrorMessage(error.message);
                setProgress('uploadError');
            }
        }
    };

    const content = () => {
        switch (progress) {
            case 'getUpload':
                return <UploadComponent onUrlChange={onUrlChange} onImage={onImage} url={url} />;
            case 'uploading':
                return <h2>Uploading....</h2>;
            case 'uploaded':
                return (<>
                        <h2>Image Successfully Uploaded </h2>
                        <img src={url} alt="uploaded"/>
                       </>);
            case 'uploadError':
                return (
                    <>
                        <div>Error Failed to Upload {errorMessage}</div>
                    </>
                );
        }
    };

    return (
        <div className="Upload">
            <h1></h1>
            {content()}
        </div>
    );
};

export default Upload;