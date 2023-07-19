import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    //TODO: Reducer to add vote
    addVote: (state, action) => {
      const anecdoteToUpdate = action.payload;
      const { id } = action.payload;

      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : anecdoteToUpdate
      );
    },

    //TODO: Reducer to append anecdote
    appendAnecdote(state, action) {
      state.push(action.payload);
    },

    //TODO: Reducer to set anecdote for replacing the anecdotes array
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.updateVote(anecdote);
    dispatch(addVote(votedAnecdote));
  };
};

export const { addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
