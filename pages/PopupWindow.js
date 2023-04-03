"use client";
import ExpenseTracker from "./ExpenseTracker";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCalendar } from "./api/store/testSlice";
import { useRouter } from 'next/router';
import {
  fetchCalendarAsync,
  createEventAsync,
  deleteEventAsync,
} from "./api/store/testSlice";


const PopupWindow = ({ onClose, dayOfMonth, monthName, currentYear }) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

 

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

  const filteredData = calendarData?.filter(event => {
    return (
      event && // add null check
      event.day === dayOfMonth &&
      event.month === monthName &&
      event.year === currentYear
      
    );
  }) || [];

  // Define event handler for input change
  const handleInputChange = event => {
    setInputValue(event.target.value);
  };



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

  
  const handleRemoveClick = async id => {
    dispatch(deleteEventAsync(id));
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
            filteredData.map((event, index) => (
              <div key={event.id}>
                <h3>{event.month}</h3>
                <p>{event.day}</p>
                <p>{event.year}</p>
                <p>{event.addeditems}</p>
                <p>{event.id}</p>
                <button onClick={() => handleRemoveClick(event.id)}>
                  Remove
                </button>
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
        
      </div>
     
      <ExpenseTracker
        dayOfMonth={dayOfMonth}
        monthName={monthName}
        currentYear={currentYear}
      />
    </div>
  );
};

export default PopupWindow;

