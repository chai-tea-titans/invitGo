"use client";
import React, { useRef, useState } from "react";
import axios from "axios";

const Video = ({ onVideoUpload, eventId }) => {
  const videoRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [recordChunks, setRecordChunks] = useState([]);
  const [key, setKey] = useState(0);
  const [showVideoRecordingScreen, setShowVideoRecordingScreen] =
    useState(true);

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = e => {
      if (e.data.size > 0) {
        setRecordChunks(prev => prev.concat(e.data));
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
    const blob = new Blob(recordChunks, { type: "video/webm" });

    const formData = new FormData();
    formData.append("file", blob);
    formData.append("filename", `${eventId}.webm`);
    formData.append("eventId", eventId);

    try {
      // Send the video to the server to be uploaded
      const res = await axios.post(
        "http://localhost:8080/api/video/upload-video",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Save the video URL to the event model
      const res2 = await axios.put(
        `http://localhost:8080/api/events/uploadVideo/${eventId}`,
        {
          videoMessage: res.data.videoUrl,
        }
      );

      // Save the video URL to the video model
      await axios.post("http://localhost:8080/api/video/save-video-url", {
        eventId,
        videoMessage: res.data.videoUrl,
      });

      console.log("Video saved:", res.data.videoUrl);
      onVideoUpload(res.data.videoUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlayRecording = () => {
    if (videoRef.current) {
      const videoBlob = new Blob(recordChunks, {
        type: "video/webm",
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
        tracks.forEach(track => track.stop());

        videoRef.current.srcObject = null;
        setRecording(false);
      }
    }
  };

  const handleAttachVideo = () => {
    setShowVideoRecordingScreen(false);
    onVideoUpload(recordChunks);
  };

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
                <button onClick={handleUploadVideo}>
                  Attach Video to Invite
                </button>
                <button onClick={handleRecordAgain}>Record Again</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Video;
