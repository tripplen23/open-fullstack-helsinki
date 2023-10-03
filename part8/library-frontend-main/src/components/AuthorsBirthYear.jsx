import React from "react";
import { useState } from "react";
import { useMutation } from "@apollo/client";

import { EDIT_AUTHOR } from "../queries.js";

const AuthorsBirthYear = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [changeBorn] = useMutation(EDIT_AUTHOR);

  const submit = (event) => {
    event.preventDefault();

    changeBorn({ variables: { name, setBornTo: parseInt(born) } });
    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button>Update Author</button>
      </form>
    </div>
  );
};

export default AuthorsBirthYear;
