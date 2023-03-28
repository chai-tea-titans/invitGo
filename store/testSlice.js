'use client';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchCalendarAsync = createAsyncThunk("calendar/fetchCalendarAsync", async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/calendar`);
    const data = response.data;
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
});




const CalendarSlice = createSlice({
  name: "calendar",
  initialState:[],
  reducers: {addCalendar:(state, action)=>{

  }
},
  extraReducers: (builder) => {
    builder.addCase(fetchCalendarAsync.fulfilled, (state, action) => {
        return action.payload;
      })
   
  },
});


export const {setCalendar} = CalendarSlice.actions;
export const selectCalendar = (state)=>{return state.calendar}
export default CalendarSlice.reducer;
