import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateLikes, deleteBlog } from '../reducers/blogReducer';
import blogService from '../services/blogs';
import { useParams } from 'react-router-dom';
import Comments from './Comments';

const Blog = ({ user }) => {
  const id = useParams().id;
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((b) => b.id === id);

  // Style the blog
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const userId = blogService.getUserId();

  const dispatch = useDispatch();

  const handleLike = () => {
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };
    dispatch(updateLikes(blog.id, blogToUpdate));
  };

  const handleDelete = () => {
    // Confirmation dialog for deleting
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog));
    }
  };

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className='blog-details' style={blogStyle}>
      <div>Blog title: {blog.title}</div>
      <div>Author: {blog.author}</div>
      <div>Url: {blog.url}</div>
      <div>
        likes: {blog.likes}{' '}
        <button id='like-btn' onClick={handleLike}>
          like
        </button>{' '}
      </div>
      {/* 5.8 Indicating the User information */}
      <div>UserID: {userId}</div>
      <div>UserName: {user.name}</div>
      {blog.user.id === userId && (
        <button id='delete-btn' onClick={handleDelete}>
          Delete
        </button>
      )}
      <div>
        <Comments blog={blog} />
      </div>
    </div>
  );
};

export default Blog;
