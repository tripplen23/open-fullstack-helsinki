import { useField, useResource } from "./hooks";
import { useEffect } from "react";

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("number");

  const [notes, noteService] = useResource("http://localhost:3005/notes");
  const [persons, personService] = useResource("http://localhost:3005/persons");

  useEffect(() => {
    noteService.getAll();
    personService.getAll();
    // eslint-disable-next-line
  }, []);

  const handleNoteSubmit = async (event) => {
    event.preventDefault();
    try {
      await noteService.create({ content: content.value });
      content.onChange({ target: { value: "" } }); // Clear the content input field
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handlePersonSubmit = async (event) => {
    event.preventDefault();
    try {
      await personService.create({ name: name.value, number: number.value });
      name.onChange({ target: { value: "" } }); // Clear the name input field
      number.onChange({ target: { value: "" } }); // Clear the number input field
    } catch (error) {
      console.error("Error creating person:", error);
    }
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;
