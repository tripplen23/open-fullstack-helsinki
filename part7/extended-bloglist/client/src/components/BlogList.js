import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from '../reducers/blogReducer';
import { orderBy } from 'lodash';
import Blog from './Blog';

import Togglable from './Togglable';
import BlogForm from './BlogForm';

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const sortedBlogs = orderBy(blogs, ['like'], ['desc']);

  return (
    <div>
      <h2>Blog List</h2>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      {sortedBlogs
        // Sort the blogs by the number of likes.
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} username={blog.user.name} />
        ))}
    </div>
  );
};

export default BlogList;
