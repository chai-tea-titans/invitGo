"use client";
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../server/notificationsSlice';


const Video = () => {
  const videoRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [recordChunks, setRecordChunks] = useState([]);
  const dispatch = useDispatch();

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

    videoRef.current.onloadedmetadata = () => {
      videoRef.current.play();
    };

    setTimeout(() => {
        handleStopRecording();
      }, 10000); // 10000 milliseconds = 10 seconds
    };

  const handleStopRecording = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());

    videoRef.current.srcObject = null;
    setRecording(false);

  dispatch(addNotification({
    id: 'unique identifier',
    type: 'reply',
    reply: {
      id: replyid,
      invite: inviteid,
      sender: senderEmail,
      videoReceived: false
    },
    read: false
  }));
};

  const handlePlayRecording = () => {
    const videoBlob = new Blob(recordChunks, {
      type: 'video/webm',
    });
    videoRef.current.src = URL.createObjectURL(videoBlob);
    videoRef.current.play();
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
