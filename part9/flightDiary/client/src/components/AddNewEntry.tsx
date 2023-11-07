import React, { useState } from "react";

interface DiaryEntry {
  date: string;
  visibility: string;
  weather: string;
  comment: string;
}

interface AddNewEntryProps {
  addEntry: (newEntry: DiaryEntry) => void;
}

const AddNewEntry: React.FC<AddNewEntryProps> = ({ addEntry }) => {
  const [newEntry, setNewEntry] = useState<DiaryEntry>({
    date: "",
    visibility: "",
    weather: "",
    comment: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewEntry({ ...newEntry, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addEntry(newEntry);
    setNewEntry({ date: "", visibility: "", weather: "", comment: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Date:</label>
        <input
          type="text"
          name="date"
          value={newEntry.date}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Visibility:</label>
        <input
          type="text"
          name="visibility"
          value={newEntry.visibility}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Weather:</label>
        <input
          type="text"
          name="weather"
          value={newEntry.weather}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Comment:</label>
        <input
          type="text"
          name="comment"
          value={newEntry.comment}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default AddNewEntry;
