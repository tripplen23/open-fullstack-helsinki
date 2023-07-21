import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { updateAnecdote } from "../request";
import { useNotificationContext } from "../NotificationContext"; // Import the NotificationContext

const AnecdoteVote = ({ anecdote }) => {
  const queryClient = useQueryClient();
  const { dispatch } = useNotificationContext();

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");

      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: { message: `Anecdote: ${anecdote.content} is voted` },
      });
    },
  });

  const handleVote = () => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  return (
    <div>
      has {anecdote.votes} votes
      <button onClick={() => handleVote(anecdote)}>vote</button>
    </div>
  );
};

export default AnecdoteVote;
