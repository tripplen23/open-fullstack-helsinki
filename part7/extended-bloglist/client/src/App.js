import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Notifications
import Notification from './components/Notification';
import { createNotification } from './reducers/notificationReducer';

// Blog
import blogService from './services/blogs';
import BlogList from './components/BlogList';

// Login
import LoginForm from './components/LoginForm';
import loginService from './services/login';

const App = () => {
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  // TODO: The effect of when User login successfullly, the blogService will set a unique token for this user as well as set the user state of the app as this user logged in.
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      // TODO: For saving the user token into the app local storage -> The login session will be saved even after refreshing the app.
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      setUser(user);
    } catch (exception) {
      dispatch(
        createNotification('Error login: ' + exception.response.data.error, 5)
      );
    }
  };

  // TODO: A way to log out the current session, this way is supposed to clear every session in the local storage. There is an another way is: window.localStorage.removeItem('loggedNoteappUser')
  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null); // Require User to login after they logged out.
  };

  return (
    <div>
      <h1 className='header-title'>Blogs App</h1>
      {/* Notifications */}
      <Notification />

      {/* If there is no user logged in. */}
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <p>
            <span className='active-user'>{user.name} </span>
            logged in{' '}
            <button id='logout-btn' onClick={handleLogout}>
              Logout
            </button>
          </p>
          <BlogList />
        </div>
      )}
    </div>
  );
};

export default App;
