"use client";
import { configureStore } from "@reduxjs/toolkit";
import CalendarSlice from "./testSlice";

import SpendingSlice from "./spendingSlice";


const store = configureStore({
  reducer: {
    
    calendar: CalendarSlice,
    spending: SpendingSlice,
  
  },
});

export default store;
