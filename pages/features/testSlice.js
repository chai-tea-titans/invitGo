import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const fetchTestAsync = createAsyncThunk("AllCalendar", async () => {
  try {
    const { data } = await axios.get(`/api/calendar`);
    return data;
  } catch (err) {
    console.log(err);
  }
});

const testSlice = createSlice({
  name: "Calendar",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTestAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectTest = state => {
  return state.calendarEvents;
};

export default testSlice.reducer;
