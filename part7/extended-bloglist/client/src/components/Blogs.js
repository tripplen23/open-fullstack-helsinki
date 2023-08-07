import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Togglable from './Togglable';
import BlogForm from './BlogForm';

import { orderBy } from 'lodash';

const Blogs = () => {
  const blogFormRef = useRef();
  const blogs = useSelector((state) => state.blogs);
  const sortedBlogs = orderBy(blogs, ['like'], ['desc']);

  const blogTitleStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      {sortedBlogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Link key={`link-${blog.id}`} to={`/blogs/${blog.id}`}>
            <div className='blog' style={blogTitleStyle}>
              {blog.title}
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Blogs;
