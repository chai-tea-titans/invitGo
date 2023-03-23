import { configureStore } from "@reduxjs/toolkit";
import testSlice from "../features/testSlice";

const store = configureStore({
  reducer: { calendarEvents: testSlice },
});

export default store;
