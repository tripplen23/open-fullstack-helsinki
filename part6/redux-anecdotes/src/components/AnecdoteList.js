import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const { anecdotes, filter } = state;
    if (filter === "") {
      return anecdotes;
    } else {
      return anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      );
    }
  });
  const dispatch = useDispatch();

  const handleAddVote = (anecdote) => {
    dispatch(addVote(anecdote));
    dispatch(setNotification(`You voted for ${anecdote.content}`));

    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleAddVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
