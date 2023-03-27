"use client";
import ExpenseTracker from "./ExpenseTracker";
import React, { useState } from "react";
import Video from "./Video";

const PopupWindow = ({ onClose, dayOfMonth, monthName, currentYear}) => {
  // const PopupWindow = ({ onClose, dayOfMonth, monthName, currentYear, eventId}) => {

  // Define state variables for input value and saved values
  const [inputValue, setInputValue] = useState("");
  const [savedValues, setSavedValues] = useState([]);


  const [videoUrl, setVideoUrl] = useState("");    
  const [recordChunks, setRecordChunks] = useState(null); // New state for video recording object or URL
  const [showVideoRecordingScreen, setShowVideoRecordingScreen] = useState(false);
  //  modified by Carlos, added to set state for VIDEO

  // Define event handler for input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Define event handler for save button click
  const handleSaveClick = () => {
    // Generate a unique key for the saved value using the current date and time
    const now = new Date().toISOString();
    const key = `savedValue-${now}`;
    // Store the input value in local storage with the generated key
    localStorage.setItem(key, inputValue);
    // Add the input value to the array of saved values
    setSavedValues([...savedValues, inputValue]);
    // Clear the input value
    setInputValue("");
  };

  // Define event handler for remove button click
  const handleRemoveClick = (index) => {
    // Create a copy of the saved values array
    const newValues = [...savedValues];
    newValues.splice(index, 1);
    // Update the saved values state with the new array
    setSavedValues(newValues);
  };

    // Define event handler for video upload
    // const handleVideoUpload = url => {
    //   setVideoUrl(url);
    // };
    const handleVideoUpload = (chunks) => {
      setRecordChunks(chunks); // Set the recordChunks state with the video recording object
      setVideoUrl(""); // Clear the videoUrl state
    };
//  modified by Carlos, added to handle VIDEO

    // Define event handler for closing video
    const handleVideoClose = () => {
      setVideoUrl("");
    };
    // const handleVideoClose = () => {
    //   setRecordChunks(null); // Clear the recordChunks state
    // };
//  modified by Carlos, added to handle VIDEO


  // Define event handler for attaching video to invite
  const handleAttachVideo = () => {
    setVideoUrl(recordChunks); // Set the videoUrl state with the recordChunks
    setRecordChunks(null); // Clear the recordChunks state
  };

  // Function to handle video upload and attach to event
  // const handleVideoUpload = () => {
  //   const newEvent = Event.findByPk(eventId);
  //   newEvent.videoMessage = videoUrl;
  //   newEvent.save();
  //   setVideoUrl("");
  //   setShowVideoRecordingScreen(false);
  // };
  //  modified by Carlos, added to handle VIDEO



  // Format the date for display
  const date = new Date(`${monthName} ${dayOfMonth}, ${currentYear}`);
  const formattedDate = `${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}/${date
    .getFullYear()
    .toString()
    .slice(-2)}`;

  return (
    <div className="popup-window">
      <div className="popup-header">
        <div>
          <button className="popup-close" onClick={onClose}>
            CLOSE
          </button>
        </div>
      </div>
      <div className="popup-content">
        <p>
          Enter note for day {monthName}/{dayOfMonth}:
        </p>
        {/* Render the input field with the current input value and change event handler */}
        <input type="text" value={inputValue} onChange={handleInputChange} />

        {/* Render the save button with the save click event handler */}
        <span>
          <button onClick={handleSaveClick}>Save</button>
        </span>
        {/* Render the saved values list */}
        {savedValues.map((value, index) => (
          <div key={index}>
            {/* Display the saved value */}
            <p>Items: {value}</p>

            {/* Render the remove button with the remove click event handler */}
            <button onClick={() => handleRemoveClick(index)}>Remove</button>
          </div>
        ))}

{videoUrl ? (
          <div>
            {/* <video src={videoUrl} controls width="300" height="auto" /> */}
            <button onClick={handleVideoClose}>Close Video</button>
          </div>
        ) : (
          <div>
            <button onClick={() => setVideoUrl("start")}>Record Video</button>
          </div>
        )}
      </div>
      {videoUrl === "start" && (
        <Video
        onVideoUpload={(video) => {
          setVideoUrl(video);
          setShowVideoRecordingScreen(false);
        }}
        // eventId={eventId}
        />
      )}       
      <ExpenseTracker />
    </div>
  );
};

export default PopupWindow;


// Old code above
// {eventId && (
//   <Video
//     onVideoUpload={(video) => {
//       // add the video to the event with the given ID
//       Event.update(
//         { videoUrl: video },
//         { where: { id: eventId } }
//       );
//     }}
//   />
// )}