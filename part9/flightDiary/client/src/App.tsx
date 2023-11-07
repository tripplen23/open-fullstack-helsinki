import { useState, useEffect } from "react";
import { DiaryEntry, NewDiaryEntry, Weather, Visibility } from "./types";
import { getAllDiaryEntries, createDiaryEntry } from "./diaryService";
import Notification from "./components/Notification";

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[] | null>(null);
  const [newEntry, setNewEntry] = useState<NewDiaryEntry>({
    date: "",
    visibility: Visibility.Great,
    weather: Weather.Sunny,
    comment: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // TODO: Load diary entries
  useEffect(() => {
    loadDiaryEntries();
  }, []);

  const loadDiaryEntries = () => {
    getAllDiaryEntries().then((data) => {
      setDiaryEntries(data);
    });
  };

  // TODO: Handle input change and handle submit
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewEntry({
      ...newEntry,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validate the input for visibility and weather
    if (
      !Object.values(Visibility).includes(newEntry.visibility as Visibility)
    ) {
      setErrorMessage(`Error: Incorrect visibility: ${newEntry.visibility}`);
      return; // Prevent submission on validation error
    }

    if (!Object.values(Weather).includes(newEntry.weather as Weather)) {
      setErrorMessage(`Error: Incorrect weather: ${newEntry.weather}`);
      return; // Prevent submission on validation error
    }

    if (!newEntry.date) {
      setErrorMessage("Error: Date is required.");
      return; // Prevent submission on validation error
    }

    if (!newEntry.comment) {
      setErrorMessage("Error: Comment is required.");
      return; // Prevent submission on validation error
    }

    createDiaryEntry(newEntry)
      .then(() => {
        loadDiaryEntries();
        setNewEntry({
          date: "",
          visibility: Visibility.Great,
          weather: Weather.Sunny,
          comment: "",
        });
      })
      .catch((error) => {
        setErrorMessage("Error: " + error.message);
      });
  };

  return (
    <div>
      <div>
        <h2>Add a new diary</h2>
      </div>
      <Notification message={errorMessage} />
      <div>
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
      </div>

      <div>
        <h2>Diary entries</h2>
      </div>
      <div>
        {diaryEntries?.map((diaryEntry) => (
          <div key={diaryEntry.id}>
            <div>
              <b>{diaryEntry.date}</b>
            </div>
            <br />
            <div>Visibility: {diaryEntry.visibility}</div>
            <div>Weather: {diaryEntry.weather}</div>
            <div>Comment: {diaryEntry.comment}</div>
            <br />
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
