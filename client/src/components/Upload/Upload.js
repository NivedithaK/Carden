import React, {useState} from 'react';
import Axios from 'axios';

function Upload(props){
    const [progress, setProgress] = useState('getUpload');
    //change url to be process env
    const [url, setImageURL] = useState('https://g892ued5af.execute-api.us-east-1.amazonaws.com/dev/image-upload');
    const [errorMessage, setErrorMessage] = useState('');
	const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);
    const [fileData, setFileData] = useState();

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
        const preview = document.getElementById("preview");
        const file = document.getElementById('inputFile').files[0];
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            // convert image file to base64 string
            preview.src = reader.result;
            preview.src = preview.src.replace(";base64", ';name=' + file.name + ';base64');
            setFileData({file: file, dataURL: preview.src});
        }, true);

        if (file) {

            reader.readAsDataURL(file);
        }

	};

	const handleSubmission = async () => {
        console.log(selectedFile);
        if (selectedFile == undefined){
            console.log("No image selected");
            setErrorMessage("Please Select a File");
            setProgress('uploadError');
        }else{

        const formData = new FormData();
		formData.append('File', selectedFile);
        if (props.auth.user == null){
            console.log("User not logged in");
            setErrorMessage("Please Login as User");
            setProgress('uploadError');             
        }else {
            setProgress('uploading');
        
            try {
                const successImages = fileData;
                console.log(fileData);
                const userID = props.auth.user['_id'];
                console.log('successImages', successImages);
                const parts = successImages.dataURL.split(';');
                const mime = parts[0].split(':')[1];
                const name = parts[1].split('=')[1];
                const data = parts[2];
                console.log(data);
                console.log(name);
                console.log(mime);
                console.log(userID);
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
                props.uploadToCanvas(res.data.imageURL);
            } catch (error) {
                console.log('error in upload', error);
                setErrorMessage(error.message);
                setProgress('uploadError');
            }
            }
        }
    }
    const content = () => {
        switch (progress) {
            case 'getUpload':
                return(
                    <div>
                             <input type="file" name="Upload File" onChange={changeHandler} accept="image/png, image/jpg,
                              image/jpeg, image/gif, video/mp4, audio/mp4" id="inputFile"/>
                            <img src=""  height="200" alt="Image preview..." id="preview"></img>
                             {isSelected ? (
                                 <div>
                                     <p>Filename: {selectedFile.name}</p>
                                     <p>Filetype: {selectedFile.type}</p>
                                     <p>Size in bytes: {selectedFile.size}</p>
                                     <p>{selectedFile.data}</p>
                                     <p>
                                        {selectedFile.lastModifiedDate.toLocaleDateString()}
                                     </p>
                                 </div>
                             ) : (
                                 <p>Select a file to show details</p>
                             )}
                             <div>
                                <input type="submit" value="Send Request" onClick={handleSubmission}></input>
                             </div>
                         </div>
                     )
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
}

export default Upload;