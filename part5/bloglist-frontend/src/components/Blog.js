import { useState } from "react";

const Blog = ({ blog, updateLikes }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    updateLikes(blog.id, updatedBlog);
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}{" "}
        <button onClick={toggleVisibility}>{visible ? "hide" : "show"}</button>
      </div>
      {visible && (
        <div>
          <div>{blog.author}</div>
          <div>{blog.url}</div>
          <div>
            likes: {blog.likes} <button onClick={handleLike}>like</button>{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
