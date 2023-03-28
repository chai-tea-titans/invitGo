"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCalendar } from "../store/testSlice";
import { fetchCalendarAsync } from"../store/testSlice"; 


function Calendar()  {
  const dispatch = useDispatch();
  const calendarData = useSelector(selectCalendar)
  console.log(calendarData);
  const isLoading = useSelector((state) => state.loading);
  useEffect(() => {
    dispatch(fetchCalendarAsync());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!calendarData || calendarData.length === 0) {
    return <div>No data available</div>;
  }
  return (
    <>
      {calendarData.map((event) => (
        <div key={event.id}>
          <h3>{event.month}</h3>
          <p>{event.day}</p>
          <p>{event.year}</p>
          <p>{event.addeditems}</p>
        </div>
      ))}
    </>
  );
};


export default Calendar;