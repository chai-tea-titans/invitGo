
"use client";
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
// import { fetchVideoAsync, createEventAsync } from './store/videoslice';
// import { useDispatch, useSelector } from 'react-redux';




  const Video = ({ onVideoUpload }) => {
    const videoRef = useRef(null);
    const [recording, setRecording] = useState(false);
    const [recordChunks, setRecordChunks] = useState([]);
    const [key, setKey] = useState(0);
    const [showVideoRecordingScreen, setShowVideoRecordingScreen] = useState(true);
    const [videos, setVideos] = useState([]);
  
    // useEffect(() => {
    //   fetchVideos();
    // }, []);
  
    // const fetchVideos = async () => {
    //   try {
    //     const res = await axios.get(`/api/video`);
    //     setVideos(res.data.videos);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        setRecordChunks((prev) => prev.concat(e.data));
      }
    };
    mediaRecorder.start();
    setRecording(true);

    if (videoRef.current) {
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play();
      };
    }

    setTimeout(() => {
      handleStopRecording();
      handleUploadVideo();
      }, 10000); // 10000 milliseconds = 10 seconds
    };


  const handleUploadVideo = async () => {
    const blob = new Blob(recordChunks, { type: 'video/webm' });
    

    const formData = new FormData(); formData.append('file', blob); formData.append('filename', `${Date.now()}.webm`);

    try {
      // Send the video to the server to be uploaded
      const res = await axios.post('http://localhost:8080/api/video/upload-video', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Video saved:', res.data.videoUrl);
      onVideoUpload(res.data.videoUrl);

      // Update the list of videos
      setVideos((prevVideos) => [...prevVideos, res.data.videoUrl]);
    } catch (error) {
      console.error(error);
    }
  };

  

  const handlePlayRecording = () => {
    if (videoRef.current) {
      const videoBlob = new Blob(recordChunks, {
        type: 'video/webm',
      });
      videoRef.current.src = URL.createObjectURL(videoBlob);
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play();
      };
    }
  };

  const handleRecordAgain = () => {
    setRecording(false);
    setRecordChunks([]);
    setKey(key + 1);
  };

  const handleStopRecording = async () => {
    if (videoRef.current !== null) {
  const stream = videoRef.current.srcObject;
  if (stream !== null) {
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());

    videoRef.current.srcObject = null;
    setRecording(false);
  }
}
};

// const handleAttachVideo = () => {
//   setShowVideoRecordingScreen(false);
//   onVideoUpload(recordChunks);
// };




  return (
  <>
  {showVideoRecordingScreen && (
<div>
<video ref={videoRef} width="400" height="300" />
<div>
  {!recording && recordChunks.length === 0 && (
    <button onClick={handleStartRecording}>Start Recording</button>
  )}
  {recording && (
    <button onClick={handleStopRecording}>Stop Recording</button>
  )}
  {!recording && recordChunks.length > 0 && (
    <>
      <button onClick={handlePlayRecording}>Play Recording</button>
      <button onClick={handleUploadVideo}>Attach Video to Invite</button>
      <button onClick={handleRecordAgain}>Record Again</button>
    </>
  )}
</div>
<div>
  <video src=''></video>
</div>
</div>
)}
</>
);
};

export default Video;