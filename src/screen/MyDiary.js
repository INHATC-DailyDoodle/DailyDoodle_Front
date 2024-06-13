import React, { useEffect, useState } from 'react';

const MyDiary = () => {
  const [diaries, setDiaries] = useState([]);
  const [expandedDiaryIds, setExpandedDiaryIds] = useState(new Set()); // Set to manage expanded diary IDs

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

  const toggleExpand = (id) => {
    const updatedIds = new Set(expandedDiaryIds); // Create a new set
    if (updatedIds.has(id)) {
      updatedIds.delete(id); // Remove from set if already expanded
    } else {
      updatedIds.add(id); // Add to set if not expanded
    }
    setExpandedDiaryIds(updatedIds); // Update state with the updated set
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Diary Page</h2>
      <div style={styles.diaryList}>
        {diaries.length > 0 ? (
          diaries.map(diary => (
            <div key={diary.id} style={styles.diaryItem}>
              <div style={styles.diaryHeader}>
                <h3>{new Date(diary.created_at).toLocaleDateString()}</h3>
              </div>
              {diary.text.length > 50 && !expandedDiaryIds.has(diary.id) ? (
                <>
                  <p style={styles.diaryText}>{diary.text.slice(0, 50)}...</p>
                  <button style={styles.button} onClick={() => toggleExpand(diary.id)}>더보기</button>
                </>
              ) : (
                <>
                  <p style={styles.diaryText}>{diary.text}</p>
                  {diary.text.length > 50 && (
                    <button style={styles.button} onClick={() => toggleExpand(diary.id)}>
                      {expandedDiaryIds.has(diary.id) ? '접기' : '간략히 보기'}
                    </button>
                  )}
                </>
              )}
              <p style={styles.diaryMood}>Mood: {diary.mood}</p>
            </div>
          ))
        ) : (
          <p style={styles.noEntries}>No diary entries found.</p>
        )}
      </div>
    </div>
  );
}

export default MyDiary;

const styles = {
  container: {
    width: '80%',
    margin: '20px auto',
    padding: '20px',
    borderRadius: '8px',
    overflowY: 'auto', // 세로 스크롤 표시
    maxHeight: '100vh', // 최대 높이 설정
  },
  heading: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '20px',
  },
  diaryList: {
    overflowY: 'auto', // 세로 스크롤 표시
  },
  diaryItem: {
    marginBottom: '20px',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.3)', 
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    position: 'relative', // 상대적 위치 설정
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
  button: {
    position: 'absolute', // 절대 위치 설정
    top: '10px', // 위쪽 여백
    right: '10px', // 오른쪽 여백
    padding: '5px 10px',
    borderRadius: '5px',
    backgroundColor: '#87CEEB', 
    color: '#333', // 검은색 텍스트
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    margin:'20px'
  },
};
