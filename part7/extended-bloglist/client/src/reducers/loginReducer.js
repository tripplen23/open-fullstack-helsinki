import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blog';
import { createNotification } from './notificationReducer';

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    login(state, action) {
      return action.payload;
    },
    logout(state, action) {
      return action.payload;
    },
  },
});

export const { setUser, login, logout } = loginSlice.actions;

export const loggedUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(setUser(user));
    }
  };
};

export const handleLogin = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(login(user));
      dispatch(createNotification(`Hello ${user.name}`, 5));
    } catch (error) {
      dispatch(
        createNotification(`Error login: ${error.response.data.error}`, 5)
      );
    }
  };
};

export const handleLogout = () => {
  return async (dispatch) => {
    window.localStorage.clear();
    dispatch(logout(null));
    dispatch(
      createNotification(
        'You just logged out, login to explore the blog app!',
        5
      )
    );
  };
};

export default loginSlice.reducer;
