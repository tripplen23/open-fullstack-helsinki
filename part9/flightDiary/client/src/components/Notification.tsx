import React, { useState, useEffect } from "react";
import "../index.css";

interface NotificationProps {
  message: string;
}

const Notification: React.FC<NotificationProps> = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);

      // Hide the notification after a few seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className={`notification ${isVisible ? "visible" : "hidden"}`}>
      <p style={{ color: "red" }}>{message}</p>
    </div>
  );
};

export default Notification;
