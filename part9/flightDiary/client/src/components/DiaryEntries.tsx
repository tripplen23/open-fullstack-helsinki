import { useState, useEffect } from "react";
import { DiaryEntry } from "../types";
import { getAllDiaryEntries } from "../diaryService";

function DiaryEntries() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[] | null>(null);

  useEffect(() => {
    getAllDiaryEntries().then((data) => {
      setDiaryEntries(data);
    });
  }, []);

  return (
    <div>
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
            <div>visibility: {diaryEntry.visibility}</div>
            <div>weather: {diaryEntry.weather}</div>
            <div>comment: {diaryEntry.comment}</div>
            <br />
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiaryEntries;
