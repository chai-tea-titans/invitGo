"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCalendarAsync = createAsyncThunk("AllCalendar", async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/calendar`);
    const data = response.data;
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const createEventAsync = createAsyncThunk(
  "calendar/add",
  async ({ month, day, year, addeditems }) => {
    try {
      const { data } = await axios.post(`http://localhost:8080/api/calendar`, {
        month,
        day,
        year,
        addeditems,
      });
      return data;
    } catch (error) {
      console.error("Error creating event fail: ", error);
      throw error; // re-throw the error to trigger the rejected state of the thunk
    }
  }
);

const CalendarSlice = createSlice({
  name: "calendar",
  initialState: [],
  reducers: { displayCalendar: (state, action) => {} },
  extraReducers: builder => {
    builder.addCase(fetchCalendarAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(createEventAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const { setCalendar } = CalendarSlice.actions;
export const selectCalendar = state => {
  return state.calendar;
};
export default CalendarSlice.reducer;
