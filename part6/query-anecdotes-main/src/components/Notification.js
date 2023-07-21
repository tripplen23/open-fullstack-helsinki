import React, { useEffect } from "react";
import { useNotificationContext } from "../NotificationContext";

const Notification = () => {
  const { state, dispatch } = useNotificationContext();

  useEffect(() => {
    if (state.show) {
      setTimeout(() => {
        dispatch({ type: "HIDE_NOTIFICATION" });
      }, 5000); // Hides the notification after 5 seconds
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.show]);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!state.show) return null;

  return <div style={style}>{state.message}</div>;
};

export default Notification;
