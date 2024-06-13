import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useHistory 대신 useNavigate 사용
import axios from 'axios'; // Axios 라이브러리 import

const NavBar = () => {
  const styles = {
    navBar: {
      width: '200px',
      backgroundColor: 'rgba(255, 182, 193, 0.8)',
      padding: '20px',
      boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    navBarHeader: {
      color: '#FFF',
      fontSize: '1.5em',
      marginBottom: '20px'
    },
    navBarList: {
      listStyleType: 'none',
      padding: '0',
      width: '100%'
    },
    navBarItem: {
      margin: '10px 0', // 버튼 사이의 간격 조절
      color: '#FFF',
      cursor: 'pointer',
      display: 'flex', // Flexbox 사용
      alignItems: 'center', // 수직 정렬
      padding: '10px',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease',
      textDecoration: 'none' // 링크 텍스트 스타일 수정
    },
    navBarItemHover: {
      backgroundColor: 'rgba(255, 182, 193, 1)',
    },
    icon: {
      marginRight: '10px',
      fontSize: '1.2em' // 아이콘 크기 조절
    },
    userName: {
      marginTop: 'auto',
      marginBottom: '20px',
      color: '#FFF',
      fontSize: '1em',
      textAlign: 'center'
    },
    button: {
      border: 'none',
      background: 'none',
      width: '100%',
      textAlign: 'left',
      padding: '30',
      cursor: 'pointer',
      color: '#FFF',
      fontSize:17,
    
      
    }
  };

  const [userName, setUserName] = useState('');
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 가져오기

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // 토큰이 있으면 Spotify API를 호출하여 사용자 정보 가져오기
      axios.get('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setUserName(response.data.display_name); // Spotify 닉네임으로 설정
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // 토큰 제거
    navigate('/login'); // 로그인 페이지로 이동
  };

  return (
    <div style={styles.navBar}>
      <h2 style={styles.navBarHeader}>Daily Doodle</h2>
      <ul style={styles.navBarList}>
        <li>
          <Link to="/" style={styles.navBarItem}>
            <span style={styles.icon}>🏠</span>
            Home
          </Link>
        </li>
        <li>
          <Link to="/my-diary" style={styles.navBarItem}>
            <span style={styles.icon}>📄</span>
            My Diary
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} style={{...styles.navBarItem, ...styles.button}}> {/* 로그아웃 버튼 */}
            <span style={styles.icon}>🔒</span>
            Logout
          </button>
        </li>
      </ul>
      <div style={styles.userName}>
        <span style={styles.icon}>👤</span>
        {userName}
      </div>
    </div>
  );
}

export default NavBar;
