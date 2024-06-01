import React from 'react';
import { Link } from 'react-router-dom';

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
    }
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
          <Link to="/songs" style={styles.navBarItem}>
            <span style={styles.icon}>🎵</span>
            Songs
          </Link>
        </li>
        <li style={styles.navBarItem}>
          <span style={styles.icon}>🔒</span>
          Logout
        </li>
      </ul>
      <div style={styles.userName}>
        <span style={styles.icon}>👤</span>
        testuser
      </div>
    </div>
  );
}

export default NavBar;
