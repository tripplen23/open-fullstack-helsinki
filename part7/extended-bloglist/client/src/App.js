import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Notifications
import Notification from './components/Notification';

// Blog
import BlogList from './components/BlogList';

// Login
import LoginForm from './components/LoginForm';
import LogoutButton from './components/LogoutButton';
import { loggedUser } from './reducers/loginReducer';

// User
import { initializeUsers } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(loggedUser());
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <div>
      <h1 className='header-title'>Blogs App</h1>
      {/* Notifications */}
      <Notification />

      {/* If there is no user logged in. */}
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <p>
            <span className='active-user'>{user.name} </span>
            logged in <LogoutButton />
          </p>
          <BlogList />
        </div>
      )}
    </div>
  );
};

export default App;
