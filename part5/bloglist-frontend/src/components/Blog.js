import React from 'react';
import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, updateLikes, deleteBlog }) => {
  // Style the blog
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);

  const userId = blogService.getUserId();

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = () => {
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    updateLikes(blog.id, blogToUpdate);
  };

  const handleDelete = () => {
    // Confirmation dialog for deleting
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id);
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        <span className='title'>{blog.title} - </span>
        <span className='author'>{blog.author}</span>
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      </div>

      {/* Children prop */}
      {visible && (
        <div className='blog-details'>
          <div>{blog.url}</div>
          <div>
            likes: {blog.likes}{' '}
            <button className='like-btn' onClick={handleLike}>
              like
            </button>{' '}
          </div>
          {/* 5.8 Indicating the User information */}
          <div>
            User: {blog.user.name} - UserID: {blog.user.id}
          </div>
          {(blog.user.id === userId || blog.user === userId) && (
            <button className='delete-btn' onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
