import { useState, useEffect } from "react";
import Blogs from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
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

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
    } catch (exception) {
      setMessage("Error login: " + exception.message);
    }
  };

  const createBlog = async (title, author, url) => {
    try {
      const blog = await blogService.create({ title, author, url });

      setBlogs(blogs.concat(blog));
      setMessage(`A new blog ${title} by ${author} added`);
    } catch (exception) {
      setMessage("Error creating blog: " + exception.message);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null); // Require User to login after they logged out.
  };

  return (
    <div>
      <h1 className="title">Blogs</h1>
      <Notification message={message} />
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <p>
            <span className="active-user">{user.name}</span> logged in{" "}
            <button onClick={handleLogout}>Logout</button>
          </p>
          <BlogForm createBlog={createBlog} />
          <Blogs blogs={blogs} />
        </div>
      )}
    </div>
  );
};

export default App;
