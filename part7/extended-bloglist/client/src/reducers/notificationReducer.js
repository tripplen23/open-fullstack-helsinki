import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

let timeoutId = null;

export const createNotification = (message, delay) => {
  return async (dispatch) => {
    // Dispatching the 'setNotification' action with the provided message
    dispatch(setNotification(message));

    // If there's a previous timeout, clear it to avoid overlapping notifications
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Setting a new timeout for clearing the notification after the specified delay
    timeoutId = setTimeout(() => dispatch(setNotification(null)), delay * 1000);
  };
};

export default notificationSlice.reducer;
