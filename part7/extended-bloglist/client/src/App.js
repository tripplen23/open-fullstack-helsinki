import React from 'react';
import { useState, useEffect, useRef } from 'react';

// Notifications
import Notification from './components/Notification';
import { useDispatch } from 'react-redux';
import { createNotification } from './reducers/notificationReducer';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // TODO: Clear notification after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [message]);

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

  // TODO: A handle function in blogForm for helping to create a blog based on filled in the the input of "title, author, url", it took 3 inputs there and then pass them to the API for interacting with the backend and database.
  const createBlog = async (title, author, url) => {
    try {
      blogFormRef.current.toggleVisibility();
      const blog = await blogService.create({
        title,
        author,
        url,
      });
      setBlogs(blogs.concat(blog));
      dispatch(createNotification(`A new blog ${title} by ${author} added`, 5));
    } catch (exception) {
      dispatch(
        createNotification('Error creating blog: ' + exception.message, 5)
      );
    }
  };

  // TODO: Handle update like when user click on the like button.
  const updateLikes = async (id, blogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(id, blogToUpdate);
      const newBlogs = blogs.map((blog) =>
        blog.id === id ? updatedBlog : blog
      );
      setBlogs(newBlogs);
    } catch (exception) {
      dispatch(
        createNotification(
          'Error update likes: ' + exception.response.data.error,
          5
        )
      );
    }
  };

  //TODO: Handle the delete blog button
  const deleteBlog = async (blogId) => {
    try {
      await blogService.remove(blogId);
      const updatedBlogs = blogs.filter((blog) => blog.id !== blogId);
      setBlogs(updatedBlogs);
      dispatch(createNotification(`Blog ${blogId} is removed`, 5));
    } catch (exception) {
      dispatch(createNotification('Error' + exception.response.data.error, 5));
    }
  };

  // TODO: Acting as a reference to the component
  // TODO: Ensures the same reference that is kept throughout re-renders of the component.
  const blogFormRef = useRef();

  // TODO: A way to log out the current session, this way is supposed to clear every session in the local storage. There is an another way is: window.localStorage.removeItem('loggedNoteappUser')
  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null); // Require User to login after they logged out.
  };

  return (
    <div>
      <h1 className='header-title'>Blogs</h1>
      {/* Notifications */}
      <Notification message={message} />

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
          {/* Toggle the display of blogForm */}
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>

          {blogs
            // Sort the blogs by the number of likes.
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateLikes={updateLikes}
                deleteBlog={deleteBlog}
                username={blog.user.name}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
