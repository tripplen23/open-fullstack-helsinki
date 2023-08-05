import React from 'react';
import { useDispatch } from 'react-redux';
import { handleLogout } from '../reducers/loginReducer';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(handleLogout());
  };

  return (
    <div>
      <button id='logout-btn' onClick={handleLogoutClick}>
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
