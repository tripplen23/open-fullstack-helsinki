import { createContext, useContext, useReducer } from "react";

const NotificationContext = createContext();

const initialState = {
  message: "",
  show: false,
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return {
        ...state,
        message: action.payload.message,
        show: true,
      };
    case "HIDE_NOTIFICATION":
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
};

const NotificationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);

export default NotificationContextProvider;
