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
              type="date"
              name="date"
              value={newEntry.date}
              onChange={handleInputChange}
            />
          </div>
          {/* Visibility */}
          <div>
            <label>Visibility:</label>
            <input
              type="radio"
              name="visibility"
              value={Visibility.Great}
              checked={newEntry.visibility === Visibility.Great}
              onChange={handleInputChange}
            />
            <label>Great</label>{" "}
            <input
              type="radio"
              name="visibility"
              value={Visibility.Good}
              checked={newEntry.visibility === Visibility.Good}
              onChange={handleInputChange}
            />
            <label>Good</label>{" "}
            <input
              type="radio"
              name="visibility"
              value={Visibility.Ok}
              checked={newEntry.visibility === Visibility.Ok}
              onChange={handleInputChange}
            />
            <label>Ok</label>
            <input
              type="radio"
              name="visibility"
              value={Visibility.Poor}
              checked={newEntry.visibility === Visibility.Poor}
              onChange={handleInputChange}
            />
            <label>Poor</label>
          </div>

          {/* Weather */}
          <div>
            <label>Weather:</label>
            <input
              type="radio"
              name="weather"
              value={Weather.Sunny}
              checked={newEntry.weather === Weather.Sunny}
              onChange={handleInputChange}
            />
            <label>Sunny</label>{" "}
            <input
              type="radio"
              name="weather"
              value={Weather.Cloudy}
              checked={newEntry.weather === Weather.Cloudy}
              onChange={handleInputChange}
            />
            <label>Cloudy</label>{" "}
            <input
              type="radio"
              name="weather"
              value={Weather.Rainy}
              checked={newEntry.weather === Weather.Rainy}
              onChange={handleInputChange}
            />
            <label>Rainy</label>{" "}
            <input
              type="radio"
              name="weather"
              value={Weather.Stormy}
              checked={newEntry.weather === Weather.Stormy}
              onChange={handleInputChange}
            />
            <label>Stormy</label>{" "}
            <input
              type="radio"
              name="weather"
              value={Weather.Windy}
              checked={newEntry.weather === Weather.Windy}
              onChange={handleInputChange}
            />
            <label>Windy</label>{" "}
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
