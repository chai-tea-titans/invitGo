// server/store.js

import { configureStore } from '@reduxjs/toolkit';
import notificationsSlice from './notificationsSlice';

const store = configureStore({
  reducer: {
    notifications: notificationsSlice.reducer
  }
});

export default store;
