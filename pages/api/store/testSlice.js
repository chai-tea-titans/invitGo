"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { supabase } from "../../../lib/supabaseClient";

export const fetchCalendarAsync = createAsyncThunk("AllCalendar", async () => {
  try {
    const { data } = await supabase.from(`calendarevent`).select();
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const createEventAsync = createAsyncThunk(
  "calendar/add",
  async ({ month, day, year, addeditems }) => {
    try {
      const { data } = await supabase.from(`calendarevent`).insert({
        month,
        day,
        year,
        addeditems,
      });
      return data;
    } catch (error) {
      console.error("Error creating event fail: ", error);
      throw error;
    }
  }
);

export const deleteEventAsync = createAsyncThunk(
  "calendar/delete",
  async id => {
    try {
      const { data } = await supabase
        .from(`calendarevent`)
        .delete()
        .eq("id", id);
      return { id };
    } catch (error) {
      console.error("Error deleting event: ", error);
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
    builder.addCase(deleteEventAsync.fulfilled, (state, action) => {
      console.log("this is the slicepage" + action.payload.id);
      return state.filter(calendar => calendar.id !== action.payload.id);
    });
  },
});

export const { setCalendar } = CalendarSlice.actions;
export const selectCalendar = state => {
  return state.calendar;
};
export default CalendarSlice.reducer;
