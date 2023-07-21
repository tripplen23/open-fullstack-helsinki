import { useQuery } from "react-query";
import { getAnecdotes } from "./request";
import NotificationContextProvider from "./NotificationContext";
import Notification from "./components/Notification";
import AnecdoteVote from "./components/AnecdoteVote";
import AnecdoteForm from "./components/AnecdoteForm";

const App = () => {
  // TODO: Retrieving data from the server local db:
  const result = useQuery("anecdotes", getAnecdotes, { retry: false });
  if (result.isLoading) {
    return <div>loading data...</div>;
  }
  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }
  const anecdotes = result.data;

  return (
    <NotificationContextProvider>
      <div>
        <h3>Anecdote app</h3>
        <Notification />
        <AnecdoteForm />

        {/* Anecdote List */}
        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <AnecdoteVote anecdote={anecdote} />
          </div>
        ))}
      </div>
    </NotificationContextProvider>
  );
};

export default App;
