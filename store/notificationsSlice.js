// server/notificationsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
// import React from "react";


const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: { notifications: [] },
    reducers: {
      addEventNotification(state, action) {
        const { event, videoSent } = action.payload;
        state.notifications.push({
          id: uuidv4(),
          type: 'event',
          event,
          videoSent,
          read: false
        });
      },
      addInviteNotification(state, action) {
        state.notifications.push({
          id: uuidv4(),
          type: 'invite',
          invite: action.payload,
          read: false
        });
      },
      addReplyNotification(state, action) {
        state.notifications.push({
          id: uuidv4(),
          type: 'reply',
          reply: action.payload,
          read: false
        });
      },
      addPaymentNotification(state, action) {
        const { payment } = action.payload;
        state.notifications.push({
          id: uuidv4(),
          type: 'payment',
          payment,
          read: false
        });
      },
      markNotificationAsRead(state, action) {
        const index = state.notifications.findIndex(notification => notification.id === action.payload);
        if (index !== -1) {
          state.notifications[index].read = true;
        }
      },
      removeNotification(state, action) {
        const index = state.notifications.findIndex(notification => notification.id === action.payload);
        if (index !== -1) {
          state.notifications.splice(index, 1);
        }
      }
    },
  });

  export const setNotifications = (notifications) => ({
    type: 'notifications/setNotifications',
    payload: notifications,
  });


  export const {
    addEventNotification,
    addInviteNotification,
    addReplyNotification,
    addPaymentNotification,
    markNotificationAsRead,
    removeNotification
  } = notificationsSlice.actions;

export default notificationsSlice;
