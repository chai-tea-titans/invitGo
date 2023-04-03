"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { supabase } from "../../../lib/supabaseClient";

export const fetchSpendingAsync = createAsyncThunk("AllSpending", async () => {
  try {
    const { data } = await supabase.from(`spendingevent`).select();
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const createSpendingAsync = createAsyncThunk(
  "spending/add",
  async ({ month, day, year, spendingname, spendingamount }) => {
    try {
      const { data } = await supabase.from(`spendingevent`).insert({
        month,
        day,
        year,
        spendingname,
        spendingamount,
      })
      .single()
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
      const { data } = await supabase
        .from(`spendingevent`)
        .delete()
        .eq("id", id);
      return { id };
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
      return state.filter(spending => spending.id !== action.payload.id);
    });
  },
});

export const { setSpending } = SpendingSlice.actions;
export const selectSpending = state => {
  return state.spending;
};
export default SpendingSlice.reducer;
