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
    <div style={styles.container}>
      <h2 style={styles.heading}>My Diary Page</h2>
      {diaries.length > 0 ? (
        diaries.map(diary => (
          <div key={diary.id} style={styles.diaryItem}>
            <div style={styles.diaryHeader}>
            <h3>{new Date(diary.created_at).toLocaleDateString()}</h3>
            </div>
            <p style={styles.diaryText}>{diary.text}</p>
            <p style={styles.diaryMood}>Mood: {diary.mood}</p>
          </div>
        ))
      ) : (
        <p style={styles.noEntries}>No diary entries found.</p>
      )}
    </div>
  );
}

export default MyDiary;

const styles = {
  container: {
    width: '80%',
    margin: '20px auto',
    padding: '20px',
    //backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    //boxShadow: '0 2px 4px rgba(0, 0, 0, 0.0)',
  },
  heading: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '20px',
  },
  diaryItem: {
    marginBottom: '20px',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.3)', 
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  diaryHeader: {
    backgroundColor: 'rgba(135, 206, 235, 0.3)', 
    padding: '10px',
    borderRadius: '10px',
    
  },
  diaryText: {
    color: '#666',
    lineHeight: '1.6',
  },
  diaryMood: {
    color: '#666',
  },
  noEntries: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#999',
  },
};
