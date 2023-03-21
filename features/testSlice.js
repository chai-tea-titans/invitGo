import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const fetchTestAsync = createAsyncThunk(
  "AllCalendarEvents",
  async () => {
    try {
      const { data } = await axios.get(`/routes/calendarEvents`);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

const testSlice = createSlice({
  name: "calendarEvents",
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
