import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Switch 대신 Routes를 사용

import Diary from './screen/Diary';
import MyDiary from './screen/MyDiary';
import Songs from './screen/Songs';
import NavBar from './component/NavBar';
import Login from './screen/Login';
function App() {
  const styles = {
    app: {
      display: 'flex',
      height: '100vh',
      backgroundColor: '#F8F8F0' // Ivory color
    }
  };


  return (
    <Router>
      <div style={styles.app}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Diary />} />
          <Route path="/my-diary" element={<MyDiary />} />
          <Route path="/songs" element={<Songs />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
