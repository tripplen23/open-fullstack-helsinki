import { useState, useEffect } from "react";
import Blogs from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
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
      setMessage("Wrong Credentials");
    }
  };

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newBlog,
      author: newAuthor,
      url: newUrl,
    };

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setNewBlog("");
      setNewAuthor("");
      setNewUrl("");
    });
  };

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  const blogForm = () => (
    <form onSubmit={addBlog}>
      Title: <input value={newBlog} onChange={handleBlogChange} />
      <br />
      Author: <input value={newAuthor} onChange={handleAuthorChange} />
      <br />
      Url: <input value={newUrl} onChange={handleUrlChange} />
      <br />
      <button type="submit">save</button>
    </form>
  );

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
          {blogForm()}
          <Blogs blogs={blogs} />
        </div>
      )}
    </div>
  );
};

export default App;
