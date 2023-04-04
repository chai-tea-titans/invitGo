"use client";
import React, { useRef, useState, useEffect } from 'react';
// import { fetchVideoAsync, createEventAsync } from './store/videoslice';
// import { useDispatch, useSelector } from 'react-redux';
import { supabase } from '../lib/supabaseClient';

  const Video = ({ onVideoUpload }) => {
    const videoRef = useRef(null);
    const [recording, setRecording] = useState(false);
    const [recordChunks, setRecordChunks] = useState([]);
    const [key, setKey] = useState(0);
    const [showVideoRecordingScreen, setShowVideoRecordingScreen] = useState(true);
    const [uploadMessage, setUploadMessage] = useState("");
    const [stopTimeoutId, setStopTimeoutId] = useState(null);
    const [videos, setVideos] = useState([]);


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
    // Store the timeout ID in a ref
  const timeoutId = setTimeout(() => {
    handleStopRecording();
    handleUploadVideo();
  }, 10000); // 10000 milliseconds = 10 seconds

  // Clear the timeout if the user stops the recording manually
  setStopTimeoutId(timeoutId);
};


  const handleUploadVideo = async () => {
    const blob = new Blob(recordChunks, { type: 'video/webm' });
    const fileName = `${Date.now()}.webm`;
    try{
   console.log("start video upload") 

   // Upload the video to Supabase Storage
   const { data, error } = await supabase.storage.
   from('video')
   .upload(fileName, blob)
   if (error) {
     throw new Error('Error uploading video to Supabase Storage')
   }

   // Get the public URL of the uploaded video
//    const { publicURL, error: urlError } = await supabase.storage
//    .from('videos')
//    .getPublicUrl(fileName)
//  if (urlError) {
//    throw new Error('Error getting public URL for uploaded video')
//  }

const { publicUrl } = supabase.storage.from('video').getPublicUrl(fileName);

      // Call the onVideoUpload callback with the public URL of the uploaded video
      onVideoUpload(publicUrl)


   // Update the list of videos
  
   setVideos((prevVideos) => [...prevVideos, publicUrl])

   // Set the success message
   setUploadMessage('Video upload was successful!')
 } catch (error) {
   console.error(error)
   setUploadMessage('Video upload failed. Please try again.')
 }
}


  
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
// Clear the timeout if it exists
if (stopTimeoutId) {
  clearTimeout(stopTimeoutId);
  setStopTimeoutId(null);
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
        {uploadMessage && <div>{uploadMessage}</div>}
        {videos.map((video) => (
          <video key={video} src={video} width="400" height="300" controls />
        ))}
      </div>
    </div>
  )}
  </>
)};


export default Video;
