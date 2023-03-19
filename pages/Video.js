"use client";
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { addEventNotification } from '../server/store/notificationsSlice';
import { addEventNotification } from '../server/store/notificationsSlice.js';
import { v4 as uuidv4 } from 'uuid';


const Video = () => {
  const videoRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [recordChunks, setRecordChunks] = useState([]);
  const dispatch = useDispatch();



  const handleStartRecording = async () => {
    try {
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

    videoRef.current.onloadedmetadata = () => {
      videoRef.current.play();
    };

    setTimeout(() => {
      handleStopRecording();
    }, 10000); // 10000 milliseconds = 10 seconds
  } catch (error) {
    console.error('Failed to start recording', error);
  }
};

const handleStopRecording = () => {
  if (videoRef.current && videoRef.current.srcObject) {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
  }
  if (videoRef.current) {
    videoRef.current.srcObject = null;
  }
  setRecording(false);
};

  dispatch(addEventNotification({
    id: 'unique-identifier',
    type: 'reply',
    reply: {
      id: 'reply-id',
      invite: 'invite-id',
      sender: 'sender-email',
      videoReceived: false
    },
    read: false
  }));

  const handlePlayRecording = () => {
    const videoBlob = new Blob(recordChunks, {
      type: ['video/mp4', 'video/webm']
    });
    videoRef.current.src = URL.createObjectURL(videoBlob);
    videoRef.current.play();
    dispatch(addEventNotification({
      id: uuidv4(),
      type: 'event',
      event: {
        id: 'event-id',
        name: 'event-name',
        date: 'event-date',
        expenses: 'event-expenses'
      },
      videoSent: true,
      read: false
    }));
  };


  return (
    <div>
      <video ref={videoRef} width="400" height="300" />
      <div>
        {!recording ? (
          <button onClick={handleStartRecording}>Start Recording</button>
        ) : (
          <button onClick={handleStopRecording}>Stop Recording</button>
        )}
        <button onClick={handlePlayRecording}>Play Recording</button>
      </div>
    </div>
  );
};

export default Video;
