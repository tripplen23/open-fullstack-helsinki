import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

// Notifications
import Notification from './components/Notification';

// Blog
import BlogList from './components/BlogList';
import Blog from './components/Blog';
import { initializeBlogs } from './reducers/blogReducer';

// Login
import LoginForm from './components/LoginForm';
import LogoutButton from './components/LogoutButton';
import { loggedUser } from './reducers/loginReducer';

// Users
import UserList from './components/UserList';
import User from './components/User';
import { initializeUsers } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(loggedUser());
    dispatch(initializeUsers());
    dispatch(initializeBlogs());
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
          <div>
            <span className='active-user'>{user.name} </span>
            logged in <LogoutButton />
          </div>
          <Routes>
            <Route path='/users' element={<UserList />} />
            <Route path='/users/:id' element={<User />} />
            <Route path='/blogs' element={<BlogList />} />
            <Route path='/blogs/:id' element={<Blog user={user} />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
