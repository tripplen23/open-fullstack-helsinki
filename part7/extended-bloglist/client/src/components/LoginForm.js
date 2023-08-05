import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleLogin } from '../reducers/loginReducer';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(handleLogin(username, password));
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={onSubmit}>
      <div className='loginForm'>
        username
        <input
          id='username'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-btn' type='submit'>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
