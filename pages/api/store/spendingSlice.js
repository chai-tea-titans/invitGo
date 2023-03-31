"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSpendingAsync = createAsyncThunk("AllSpending", async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/spending`);
    const data = response.data;
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const createSpendingAsync = createAsyncThunk(
  "spending/add",
  async ({ month, day, year, spendingname, spendingamount }) => {
    try {
      const { data } = await axios.post(`http://localhost:8080/api/spending`, {
        month,
        day,
        year,
        spendingname,
        spendingamount,
      });
      return data;
    } catch (error) {
      console.error("Error creating event fail: ", error);
      throw error;
    }
  }
);

export const deleteSpendingAsync = createAsyncThunk(
  "spending/delete",
  async id => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/spending/${id}`
      );
      return data;
    } catch (error) {
      console.error("Error deleting event: ", error);
    }
  }
);

const SpendingSlice = createSlice({
  name: "spending",
  initialState: [],
  reducers: { displaySpending: (state, action) => {} },
  extraReducers: builder => {
    builder.addCase(fetchSpendingAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(createSpendingAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(deleteSpendingAsync.fulfilled, (state, action) => {
      console.log("this is the Spending slicepage" + action.payload.id);
      return state.filter(spending => spending.id !== action.payload.id);
    });
  },
});

export const { setSpending } = SpendingSlice.actions;
export const selectSpending = state => {
  return state.spending;
};
export default SpendingSlice.reducer;
