"use client";
import { configureStore } from "@reduxjs/toolkit";
import CalendarSlice from "./testSlice";
import notificationsSlice from "../../server/store/notificationsSlice";

const store = configureStore({
  reducer: {
    notifications: notificationsSlice.reducer,
    calendar: CalendarSlice,
  },
});

export default store;
