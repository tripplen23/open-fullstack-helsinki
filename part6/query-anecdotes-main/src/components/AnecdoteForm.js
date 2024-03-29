import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../request";
import { useNotificationContext } from "../NotificationContext"; // Import the NotificationContext

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useNotificationContext();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote));

      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: { message: `Anecdote: ${newAnecdote.content} is created` },
      });
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    if (content.length < 5) {
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: { message: "Too short anecdote, must have length 5 or more" },
      });
      return;
    }
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
