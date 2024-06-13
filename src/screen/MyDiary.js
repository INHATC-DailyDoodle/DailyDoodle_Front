import React, { useEffect, useState } from 'react';

const MyDiary = () => {
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    const user_id = localStorage.getItem('user_id');

    if (!user_id) {
      console.error('User ID not found');
      return;
    }

    fetch(`http://localhost:8000/api/diary/list/?user_id=${user_id}`)
      .then(response => response.json())
      .then(data => setDiaries(data))
      .catch(error => console.error('Error fetching diaries:', error));
  }, []);

  return (
    <div>
      <h2>My Diary Page</h2>
      <div>
        {diaries.length > 0 ? (
          diaries.map(diary => (
            <div key={diary.id}>
              <h3>{new Date(diary.date).toLocaleDateString()}</h3>
              <p>{diary.text}</p>
              <p>Mood: {diary.mood}</p>
            </div>
          ))
        ) : (
          <p>No diary entries found.</p>
        )}
      </div>
    </div>
  );
}

export default MyDiary;
