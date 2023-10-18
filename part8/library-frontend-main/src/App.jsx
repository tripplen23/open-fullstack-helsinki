import { useState, useEffect } from "react";

import { useApolloClient, useSubscription } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";
import Recommend from "./components/Recommend";

import { ALL_BOOKS, BOOK_ADDED } from "./queries";

// TODO: Function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  // Helper that is used to eliminate saving same book twice
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    };
  });
};

const App = () => {
  const [page, setPage] = useState("authors");
  const [message, setMessage] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      setMessage(`${addedBook.title} added`);

      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  // TODO: Set time out for error message
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  // TODO: Logout
  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  // TODO: Get user token from storage
  useEffect(() => {
    const userFromStorage = localStorage.getItem("library-user-token");
    if (userFromStorage) {
      setToken(userFromStorage);
    }
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {/* If logged in => add book, if not => login */}
        {token ? (
          <span>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>Logout</button>
          </span>
        ) : (
          <button onClick={() => setPage("login")}>Login</button>
        )}
      </div>
      <Notify message={message} />

      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setError={setMessage}
        setPage={setPage}
      />

      <Authors show={page === "authors"} setError={setMessage} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} setError={setMessage} />

      <Recommend show={page === "recommend"} />
    </div>
  );
};

export default App;
