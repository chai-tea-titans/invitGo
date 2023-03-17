import React, { useState } from "react";

const PopupWindow = ({ onClose, dayOfMonth, monthName, currentYear }) => {
  // Define state variables for input value and saved values
  const [inputValue, setInputValue] = useState("");
  const [savedValues, setSavedValues] = useState([]);

  // Define event handler for input change
  const handleInputChange = event => {
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
  const handleRemoveClick = index => {
    // Create a copy of the saved values array
    const newValues = [...savedValues];
    newValues.splice(index, 1);
    // Update the saved values state with the new array
    setSavedValues(newValues);
  };

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
        <button className="popup-close" onClick={onClose}>
          CLOSE
        </button>
      </div>
      <div className="popup-content">
        <p>
          Enter note for day {monthName}/{dayOfMonth}:
        </p>
        {/* Render the input field with the current input value and change event handler */}
        <input type="text" value={inputValue} onChange={handleInputChange} />

        {/* Render the save button with the save click event handler */}
        <button onClick={handleSaveClick}>Save</button>

        {/* Render the saved values list */}
        {savedValues.map((value, index) => (
          <div key={index}>
            {/* Display the saved value */}
            <p>Items: {value}</p>

            {/* Render the remove button with the remove click event handler */}
            <button onClick={() => handleRemoveClick(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopupWindow;
