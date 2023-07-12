import React from "react";
import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleAddAnecdote = (event) => {
    event.preventDefault();
    const newAnecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(addAnecdote(newAnecdote));
  };

  return (
    <form onSubmit={handleAddAnecdote}>
      <div>
        <h2>Create new</h2>
        <input name="anecdote" />
      </div>
      <button>create</button>
    </form>
  );
};

export default AnecdoteForm;
