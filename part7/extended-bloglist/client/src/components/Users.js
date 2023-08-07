import React from 'react';
import { Link } from 'react-router-dom';

const Users = ({ users }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>UserID</th>
          <th>Username</th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Users;
