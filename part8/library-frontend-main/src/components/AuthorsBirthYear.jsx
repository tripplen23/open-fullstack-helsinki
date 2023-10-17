import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries.js";
import Select from "react-select";

const AuthorsBirthYear = ({ setError }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const { loading, data } = useQuery(ALL_AUTHORS);

  // Catching error
  const [changeBorn] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      error.graphQLErrors > 0
        ? setError(error.graphQLErrors[0].message)
        : setError(error.message);
    },
  });

  const submit = (event) => {
    event.preventDefault();

    changeBorn({ variables: { name, setBornTo: parseInt(born) } });
    setName("");
    setBorn("");
  };

  if (loading) return <div>Loading...</div>;

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
