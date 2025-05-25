import { createSlice, nanoid } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Notification, NotificationState } from '@/common/types/notification';

const initialState: NotificationState = {
  notifications: [],
  loading: false,
  error: null,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: {
      reducer: (state, action: PayloadAction<Notification>) => {
        state.notifications.push(action.payload);
      },
      prepare: (notification: Omit<Notification, 'id' | 'createdAt'>) => {
        return {
          payload: {
            ...notification,
            id: nanoid(),
            createdAt: new Date().toISOString(),
          },
        };
      },
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  addNotification,
  removeNotification,
  clearNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
