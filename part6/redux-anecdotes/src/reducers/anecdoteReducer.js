import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    // TODO: Reducer to add vote
    addVote: (state, action) => {
      const { id } = action.payload;
      const anecdoteToUpdate = state.find((anecdote) => anecdote.id === id);
      if (anecdoteToUpdate) {
        anecdoteToUpdate.votes += 1;
      }
    },

    // TODO: Reducer to create anecdote
    addAnecdote(state, action) {
      state.push(action.payload);
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

export const { addVote, addAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
