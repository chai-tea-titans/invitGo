"use client";
import React, { useRef, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import {v4 as uuidv4} from 'uuid'


const CDNURL = "https://jegrrxcwskznudgdebik.supabase.co/storage/v1/object/public/video/"
const Video = () => {
    const videoRef = useRef(null);
    const [recording, setRecording] = useState(false);
    const [recordChunks, setRecordChunks] = useState([]);
    const [showVideoRecordingScreen, setShowVideoRecordingScreen] = useState(true);
    const [uploadMessage, setUploadMessage] = useState("");
    const [stopTimeoutId, setStopTimeoutId] = useState(null);
    const [videos, setVideos] = useState([]);
    const router = useRouter();
    const supabaseClient = useSupabaseClient();


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
  }

const handleUploadVideo = async () => {
  if (recordChunks.length > 0 || fileInputRef.current.files.length > 0) {
    const videoFile = recordChunks.length > 0 ? new Blob(recordChunks, { type: 'video/webm' }) : fileInputRef.current.files[0];
    const fileName = uuidv4() + '.webm';
    const { data, error } = await supabase.storage
    .from('video').upload(fileName, videoFile, {
      cacheControl: '3600',
      metadata: {
        filetype: 'video',
        encoding: 'webm',
      },
    });
    if (error) {
    console.error(error);
    setUploadMessage('Video upload failed. Please try again.');
    } else {
    const publicUrl = `${CDNURL}${data.Key}`;
    // // Call the onVideoUpload callback with the public URL of the uploaded video
    // onVideoUpload([publicUrl]);

      // Set the success message
      setUploadMessage('Video upload was successful!');
    }
    // Reset the recording and chunks
    setRecording(false);
    setRecordChunks([]);
  } else {
    setUploadMessage('Please select a video to upload');
  }
};



// async function getVideo() {
//   const {data, error} = await supabase
//   .storage.from('video').list('')

//   if (data !==null) {
//     setVideos(data);
//   } else {
//     console.log(error)
//   }
// }

// useEffect(() => {
//   getVideo()
// }, []);

// console.log(videos)

async function getVideo() {
  const { data, error } = await supabase.storage.from('video').list('');
  if (error) {
    console.error(error);
    return;
  }
  
  const videosWithMetadata = await Promise.all(
    data.map(async (video) => {
      const { data: metadata, error: metadataError } = await supabase
        .storage.from('video')
      if (metadataError) {
        console.error(metadataError);
        return null;
      }
  
      return { ...video, metadata };
    })
  );
  
  setVideos(videosWithMetadata.filter((video) => video !== null));
}
useEffect(() => {
getVideo();
}, []);


return (
  <>
  {showVideoRecordingScreen && (
    <div>
      <video ref={videoRef} width="600" height="425" />
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
          <video key={video} src={video} width="600" height="425" controls >
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
