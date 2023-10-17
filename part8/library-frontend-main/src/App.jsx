import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";
import { useApolloClient } from "@apollo/client";
import Recommend from "./components/Recommend";

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  // TODO: Set time out for error message
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [errorMessage]);

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
      <Notify errorMessage={errorMessage} />

      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setError={setErrorMessage}
        setPage={setPage}
      />

      <Authors show={page === "authors"} setError={setErrorMessage} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} setError={setErrorMessage} />

      <Recommend show={page === "recommend"} />
    </div>
  );
};

export default App;
