import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "@/models/users";
import { notificationReducer } from "@/models/notification";

// Combine all reducers into a root reducer
export const rootReducer = combineReducers({
  users: userReducer,
  notification: notificationReducer,
  // Add more reducers here
});
