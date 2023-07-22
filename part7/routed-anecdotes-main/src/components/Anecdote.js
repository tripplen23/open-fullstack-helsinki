import React from "react";

const Anecdote = ({ anecdote }) => {
  return(
    <div>
      <h2>{anecdote.content}</h2>
      <div><strong>Author:</strong> {anecdote.author}</div>
      <div><strong>Info:</strong>{anecdote.info}</div>
      <div><strong>Votes:</strong> {anecdote.votes}</div>
    </div>
  )
};

export default Anecdote;
