"use client";
import ExpenseTracker from "./ExpenseTracker";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCalendar } from "./store/testSlice";
import { fetchCalendarAsync } from "./store/testSlice";

const PopupWindow = ({ onClose, dayOfMonth, monthName, currentYear }) => {
  console.log(dayOfMonth);
  console.log(monthName);
  console.log(currentYear); //issue pass prop as undefine******
  // Define state variables for input value and saved values
  const [inputValue, setInputValue] = useState("");
  const [savedValues, setSavedValues] = useState([]);
  //******************************************** */ */
  const dispatch = useDispatch();
  const calendarData = useSelector(selectCalendar);
  const isLoading = useSelector(state => state.loading);
  useEffect(() => {
    dispatch(fetchCalendarAsync());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!calendarData || calendarData.length === 0) {
    return <div>No data available</div>;
  }

  const filteredData = calendarData.filter(event => {
    return (
      event.day === dayOfMonth &&
      event.month === monthName &&
      event.year === currentYear
    );
  });

  //******************************************** */ */
  // Define event handler for input change
  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  // // Define event handler for save button click
  // const handleSaveClick = () => {
  //   // Generate a unique key for the saved value using the current date and time
  //   const now = new Date().toISOString();
  //   const key = `savedValue-${now}`;
  //   // Store the input value in local storage with the generated key
  //   localStorage.setItem(key, inputValue);
  //   // Add the input value to the array of saved values
  //   setSavedValues([...savedValues, inputValue]);
  //   // Clear the input value
  //   setInputValue("");
  // };

  const handleSaveClick = async () => {
    try {
      await dispatch(
        createEventAsync({
          month: monthName,
          day: dayOfMonth,
          year: currentYear,
          addeditems: inputValue,
        })
      );
      // Clear the input value
      setInputValue("");
    } catch (error) {
      console.error("Error saving event: ", error);
    }
  };

  // Define event handler for remove button click
  const handleRemoveClick = index => {
    // Create a copy of the saved values array
    const newValues = [...savedValues];
    newValues.splice(index, 1);
    // Update the saved values state with the new array
    setSavedValues(newValues);
  };

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
        <>
          {filteredData.length > 0 ? (
            filteredData.map(event => (
              <div key={event.id}>
                <h3>{event.month}</h3>
                <p>{event.day}</p>
                <p>{event.year}</p>
                <p>{event.addeditems}</p>
              </div>
            ))
          ) : (
            <div>No matching events found</div>
          )}
        </>
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
      </div>
      <ExpenseTracker />
    </div>
  );
};

export default PopupWindow;
