// server/notificationsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';


const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: { notifications: [] },
    reducers: {
      addEventNotification(state, action) {
        state.notifications.push({
          id: uuidv4(),
          type: 'event',
          event: action.payload,
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
        state.notifications.push({
          id: uuidv4(),
          type: 'payment',
          payment: action.payload,
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
    addEventNotification(state, action) {
        state.notifications.push({
          id: uuidv4(),
          type: 'event',
          event: action.payload,
          videoSent: action.payload.videoSent,
          read: false
        });
      },
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
