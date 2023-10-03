import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries.js";
import Select from "react-select";

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

  const { loading, error, data } = useQuery(ALL_AUTHORS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const options = data.allAuthors.map((author) => ({
    value: author.name,
    label: author.name,
  }));
  const handleSelectChange = (selectedOption) => {
    setName(selectedOption.value);
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            value={{ value: name, label: name }}
            onChange={handleSelectChange}
            options={options}
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
