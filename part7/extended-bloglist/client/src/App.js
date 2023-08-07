import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { Container, Button } from '@mui/material';

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
    <Container>
      <h1 className='header-title'>Blogs App</h1>
      {/* Notifications */}
      <Notification />

      {/* If there is no user logged in. */}
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <div>
            <Button component={Link} to='/'>
              Home
            </Button>
            <Button component={Link} to='/blogs'>
              Blogs
            </Button>
            <Button component={Link} to='/users'>
              Users
            </Button>
            <span className='active-user'>{user.name} </span>
            logged in <LogoutButton />
          </div>

          <Routes>
            <Route
              path='/users'
              element={user ? <UserList /> : <Navigate replace to='/login' />}
            />
            <Route path='/users/:id' element={<User />} />
            <Route
              path='/blogs'
              element={user ? <BlogList /> : <Navigate replace to='/login' />}
            />
            <Route path='/blogs/:id' element={<Blog user={user} />} />
          </Routes>
        </div>
      )}
    </Container>
  );
};

export default App;
