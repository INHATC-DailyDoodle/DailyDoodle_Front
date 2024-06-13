import React, { useEffect } from 'react';

const MainPage = () => {
  const handleSpotifyLogin = () => {
    window.location.href = 'http://localhost:8000/api/spotify-login/';
  };
  const doodleImage = require('../../src/imgs/dailyDoodle로고.png'); // 이미지 경로 조정

  useEffect(() => {
    // 쿠키에서 user_id 읽고 localStorage에 저장
    const user_id = getCookie('user_id');
    if (user_id) {
      localStorage.setItem('user_id', user_id);
    }
  }, []);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const styles = {
    app: {
      display: 'flex',
      height: '100vh',
      background: 'linear-gradient(135deg, #445AF5 0%, #8ec5fc 100%)', // 원래 그라데이션 색 유지
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      width: '100vw',
    },
    header: {
      fontSize: '50px',
      fontWeight: 'bold',
      marginBottom: '5px',
      color: '#4B0082', // 인디고 색
    },
    subheader: {
      fontSize: '30px',
      marginBottom: '40px',
      color: '#8A2BE2', // 블루 바이올렛 색
    },
    button: {
      padding: '15px 30px',
      border: 'none',
      borderRadius: '10px',
      backgroundColor: '#4C3AED', // 스포티파이 그린
      color: '#FFF',
      cursor: 'pointer',
      fontSize: '25px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'background-color 0.3s ease',
      marginTop: '20px',
      marginLeft: '200px', // 버튼과 이미지 사이 간격 추가
    },
    buttonHover: {
      backgroundColor: '#6243EC', // 약간 밝은 그린 색
    },
    illustration: {
      width: '90%',
      maxWidth: '400px', // 크기 조정
      margin: '10px 0',
      borderRadius: '15px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // 그림자 추가
    },
    content: {
      backgroundColor: 'rgba(255, 255, 255, 0.5)', // 반투명 흰색 배경
      borderRadius: '15px',
      padding: '40px', // 패딩 증가
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      width: '90%', // 너비 증가
      maxWidth: '1200px', // 최대 너비 증가
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
  };

  return (
    <div style={styles.app}>
      <div style={styles.content}>
        <h1 style={styles.header}>Welcome to Doodle Daily</h1>
        <h2 style={styles.subheader}>Your emotions, your music</h2>
        <div style={styles.row}>
          <img 
            src={doodleImage}
            alt="Doodle Daily Illustration" 
            style={styles.illustration} 
          />
          <button
            style={styles.button}
            onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
            onClick={handleSpotifyLogin}
          >
            Login with Spotify
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;