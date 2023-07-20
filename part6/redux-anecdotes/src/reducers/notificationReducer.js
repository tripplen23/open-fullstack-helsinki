import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    showNotification: (state, action) => {
      return action.payload;
    },
    hideNotification: (state) => {
      return null;
    },
  },
});

export const setNotification = (notification, timeOut) => {
  return async (dispatch) => {
    dispatch(showNotification(notification));
    setTimeout(() => dispatch(hideNotification()), timeOut * 1000);
  };
};

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
