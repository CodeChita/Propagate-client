import React, {useEffect} from 'react'
import Webcam from "react-webcam";
import axios from 'axios';
import { API_URL } from '../config'


const WebcamCapture = () => {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    const videoConstraints = {
        facingMode: "user"}
  
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();

      
      setImgSrc(imageSrc);
     console.log(typeof imageSrc)
    }, [webcamRef, setImgSrc]);

    useEffect(() => {
      axios({
        method: 'post',
        url: `${API_URL}/picture/upload`,
        data: imgSrc
    })  
      .then(() => {
        console.log("YASSS")
      })
      .catch((err => console.log(err)))
    }, [imgSrc])
    return (
      <>
        <Webcam 
        videoConstraints={videoConstraints}
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/png"
        />
        <button onClick={capture}>Capture photo</button>
        {imgSrc && (
          <img
            src={imgSrc} alt='pic'
          />
        )}
      </>
    );
  };
  
  export default WebcamCapture;
  
  // https://www.npmjs.com/package/react-webcam
  