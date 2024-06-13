import React, { useState } from 'react';

const Diary = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/diary/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResult(data.result);  // 결과 저장
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const styles = {
    app: {
      display: 'flex',
      height: '100vh',
      backgroundColor: '#F8F8F0' // Ivory color
    },
    diaryEditor: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(230, 230, 250, 0.6)', 
      padding: '20px',
      position: 'relative',
      width: '400px'
    },
    textArea: {
      width: '90%', 
      height: '80%', 
      padding: '20px',
      border: 'none',
      borderRadius: '10px',
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      fontSize: '16px',
      lineHeight: '1.5',
      resize: 'none',
      marginBottom: '50px'
    },
    button: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: 'rgba(255, 182, 193, 0.8)', 
      color: '#FFF',
      cursor: 'pointer',
      fontSize: '16px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'background-color 0.3s ease'
    },
    buttonHover: {
      backgroundColor: 'rgba(255, 182, 193, 1)'
    },
    musicRecommendation: {
      width: '730px', 
      height: '640px', 
      backgroundColor: 'rgba(255, 255, 255, 0.7)', 
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      position: 'absolute',
      right: '2%',
      bottom: '20px', 
      color: '#87CEEB',
      fontSize: '1.5em',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  };

  return (
    <div style={styles.app}>
      <div style={styles.diaryEditor}>
        <textarea 
          style={styles.textArea} 
          placeholder="오늘 당신의 하루는 어땠나요?" 
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button 
          style={styles.button} 
          onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor} 
          onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <div style={styles.musicRecommendation}>
        <h3>Music</h3>
        <p>여기에 노래 추천이 들어갈 곳이야.</p>
        {result && <p>Result: {result}</p>} {/* 결과 표시 */}
      </div>
    </div>
  );
}

export default Diary;
