// import { useState } from "react";
// import { supabase } from "../lib/supabaseClient";
// import { v4 as uuidv4 } from "uuid";

// const VideoRecorder = () => {
//   const [isRecording, setIsRecording] = useState(false);

//   const startRecording = async () => {
//     const constraints = {
//       audio: false,
//       video: true,
//     };

//     try {
//       const stream = await navigator.mediaDevices.getUserMedia(constraints);
//       window.stream = stream;

//       const chunks = [];
//       const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });

//       recorder.addEventListener("dataavailable", (event) => {
//         if (event.data.size > 0) {
//           chunks.push(event.data);
//         }
//       });

//       recorder.addEventListener("stop", async () => {
//         const blob = new Blob(chunks, { type: "video/webm" });
//         const videoFile = new File([blob], uuidv4() + ".webm");

//         const { error } = await supabase.storage
//           .from("videos")
//           .upload(videoFile.name, videoFile);

//         if (error) {
//           console.error(error);
//           alert("Error uploading file to Supabase");
//         } else {
//           console.log("File uploaded successfully");
//         }
//       });

//       recorder.start();

//       setIsRecording(true);

//       setTimeout(() => {
//         recorder.stop();
//         setIsRecording(false);
//       }, 5000); // Stop recording after 5 seconds
//     } catch (error) {
//       console.error(error);
//       alert("Error accessing camera");
//     }
//   };

//   return (
//     <div>
//       {isRecording ? (
//         <button onClick={() => setIsRecording(false)}>Stop Recording</button>
//       ) : (
//         <button onClick={startRecording}>Start Recording</button>
//       )}
//     </div>
//   );
// };

// export default VideoRecorder;