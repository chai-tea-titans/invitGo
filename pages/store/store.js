"use client";
import { configureStore } from "@reduxjs/toolkit";
import CalendarSlice from "./testSlice";
import notificationsSlice from "./notificationsSlice";
import SpendingSlice from "./spendingSlice";
const store = configureStore({
  reducer: {
    notifications: notificationsSlice.reducer,
    calendar: CalendarSlice,
    spending: SpendingSlice,
  },
});

export default store;
