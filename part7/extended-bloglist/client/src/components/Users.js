import React from 'react';
import { initializeUsers } from '../reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import User from './User';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <div>
      <h2>Users</h2>
      <User users={users} />
    </div>
  );
};

export default Users;
