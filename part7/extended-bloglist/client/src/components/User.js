import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const User = () => {
  const id = useParams().id;
  const users = useSelector((state) => state.users);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added Blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
