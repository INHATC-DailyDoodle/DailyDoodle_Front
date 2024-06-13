import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyDiary = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get('https://your-api-endpoint.com/diary');
        setEntries(response.data);
      } catch (error) {
        console.error('Error fetching diary entries:', error);
      }
    };

    fetchEntries();
  }, []);

  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#F8F8F0',
      height: '100vh',
      overflowY: 'auto'
    },
    entry: {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px'
    },
    user: {
      fontSize: '1.2em',
      color: '#87CEEB',
      marginBottom: '10px'
    },
    mood: {
      fontSize: '1em',
      fontStyle: 'italic',
      marginBottom: '10px'
    },
    diaryEntry: {
      fontSize: '1em'
    }
  };

  return (
    <div style={styles.container}>
      <h2>My Diary Page</h2>
      {entries.map((entry, index) => (
        <div key={index} style={styles.entry}>
          <div style={styles.user}>User: {entry.user}</div>
          <div style={styles.mood}>Mood: {entry.mood}</div>
          <div style={styles.diaryEntry}>{entry.diaryEntry}</div>
        </div>
      ))}
    </div>
  );
}

export default MyDiary;
