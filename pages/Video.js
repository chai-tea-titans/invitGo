"use client";
import React, { useRef, useState, useEffect } from 'react';
// import { fetchVideoAsync, createEventAsync } from './store/videoslice';
// import { useDispatch, useSelector } from 'react-redux';
import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://jegrrxcwskznudgdebik.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplZ3JyeGN3c2t6bnVkZ2RlYmlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAyMDgyOTMsImV4cCI6MTk5NTc4NDI5M30._doAzzn9qvhXUF_hRpbib-EftdeFIxrcIUOz12l3KQA';
const supabase = createClient(supabaseUrl, supabaseKey);
const storage = supabase.storage;
const CDNURL = "https://jegrrxcwskznudgdebik.supabase.co/storage/v1/object/public/video/"


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

async function getVideo() {
  const {data, error} = await supabase
  .storage.from('video').list('')

  if (data !==null) {
    setVideos(data);
  } else {
    console.log(error)
  }
}

useEffect(() => {
  getVideo()
}, []);

console.log(videos)

  const handleUploadVideo = async() => {
  try {
    console.log("start video upload") 

   const { data, error } = await storage
   .from('video')
   .upload(`${Date.now()}.webm`, recordChunks )

   if (error) {
    console.log(error)
     throw new Error('Error uploading video to Supabase Storage')
   }
  
   const publicUrl = `${CDNURL}${data.Key}`;

   // Call the onVideoUpload callback with the public URL of the uploaded video
   onVideoUpload([publicUrl]);

   // Update the list of videos
setVideos((prevVideos) => [...prevVideos, publicUrl]);

   // Set the success message
   setUploadMessage('Video upload was successful!')
 } catch (error) {
   console.error(error)
   setUploadMessage('Video upload failed. Please try again.')
 }
 getVideo();
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
        {videos.map((video) => {
          console.log(video);
          if (video.name === ".emptyFolderPlaceholder") return null;
          return (
          <video key={video} src={video} width="400" height="300" controls >
            <source src={CDNURL + video.name} type="video/webm" />
          </video>
          );
          })}
      </div>
    </div>
  )}
  </>
)};


export default Video;
