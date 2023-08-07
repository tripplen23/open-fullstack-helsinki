import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeBlogs } from '../reducers/blogReducer';

import Blogs from './Blogs';

const BlogList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <div>
      <h2>Blog List</h2>
      <Blogs />
    </div>
  );
};

export default BlogList;
