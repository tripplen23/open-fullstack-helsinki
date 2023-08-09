import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { createNotification } from './notificationReducer';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      return [...state, action.payload];
    },
    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      );
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { setBlogs, addBlog, updateBlog, removeBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog);
      dispatch(addBlog(newBlog));
      dispatch(
        createNotification(
          `A new blog ${blog.title} by ${blog.author} added`,
          5
        )
      );
    } catch (error) {
      dispatch(createNotification(`error ${error.response.data.error}`, 5));
    }
  };
};

// TODO: Handle update like
export const updateLikes = (id, blogToUpdate) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(id, blogToUpdate);
      dispatch(updateBlog(updatedBlog));
      dispatch(
        createNotification(`Like ${blogToUpdate.title} successfully`, 5)
      );
    } catch (exception) {
      dispatch(
        createNotification(
          'Error update likes: ' + exception.response.data.error,
          5
        )
      );
    }
  };
};

//TODO: Handle the delete blog
export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id);
      dispatch(removeBlog(blog.id));
      dispatch(createNotification(`Blog ${blog.title} is removed`, 5));
    } catch (exception) {
      dispatch(createNotification('Error' + exception.response.data.error, 5));
    }
  };
};

//TODO: Handle post a comment
export const postComment = (id, comment) => {
  return async (dispatch) => {
    try {
      const commentToBlog = await blogService.addComment(id, { comment });
      dispatch(updateBlog(commentToBlog));
      dispatch(createNotification(`Comment ${comment} was posted`, 5));
    } catch (exception) {
      dispatch(createNotification('Error' + exception.response.data.error, 5));
    }
  };
};

export default blogSlice.reducer;
