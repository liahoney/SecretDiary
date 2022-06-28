import '../App.css'
import React, {useState} from "react";
import AWS from 'aws-sdk';
import axios from 'axios'
import { Alert } from 'reactstrap';

function S3Upload ({ setUserimage, userimage }) {
  const [progress , setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const ACCESS_KEY = 'AKIASLLPFYJX2P2XRFMA';
  const SECRET_ACCESS_KEY = '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';
  const REGION = "ap-northeast-2";
  const S3_BUCKET = 'moviebox-bucket';

  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY
  });

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setUserimage(file)
    const fileExt = file.name.split('.').pop();
    if((file.type !== 'image/jpeg' || fileExt !=='jpeg' || fileExt !== 'jpg') && (file.type !== 'image/png' || fileExt !== 'png')){
      alert('jpg,png 파일만 Upload 가능합니다.');
      return;
    }
    setProgress(0);
    setSelectedFile(e.target.files[0]);
  }

  const uploadFile = (file) => {
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET,
      Key: "upload/" + file.name
    };
    myBucket.putObject(params)
      .on('httpUploadProgress', (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100))
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          setSelectedFile(null);
        }, 3000)
        axios.put('http://localhost:80/diaryimage', {
        id: window.sessionStorage.getItem('id'),
        image : userimage.name
        })
      })
      .send((err) => {
        if (err) console.log(err)
      })
    console.log(myBucket)
  }

  return (
    <div>
      <div>
      { showAlert?
              <Alert color="primary">업로드 진행률 : {progress}%</Alert>
              : 
              <Alert color="primary">파일을 선택해 주세요.</Alert> 
            }
      </div>
      <input type="file" onChange={handleFileInput} ></input>
      {selectedFile?(
        <button className="profile_image_button" onClick={() => uploadFile(selectedFile)}>프로필 사진 저장</button>
      ) : null }
    </div>
  )
}

export default S3Upload;
