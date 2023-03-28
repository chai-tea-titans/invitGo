"use client";
import { configureStore } from "@reduxjs/toolkit";
import CalendarSlice from "./testSlice";
import notificationsSlice from "./notificationsSlice";
import videoslice from "./videoslice";

const store = configureStore({
  reducer: {
    notifications: notificationsSlice.reducer,
    calendar: CalendarSlice,
    video: videoslice,
  },
});

export default store;
