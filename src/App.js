import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';

import Diary from './screen/Diary';
import MyDiary from './screen/MyDiary';
import Songs from './screen/Songs';
import NavBar from './component/NavBar';
import Login from './screen/Login';
// import SignUp from './screen/SignUp';

function App() {
  const styles = {
    app: {
      display: 'flex',
      height: '100vh',
      backgroundColor: '#F8F8F0', // Ivory color
    },
  };

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get('access_token');
    if (accessToken) {
      localStorage.setItem('token', accessToken);
      navigate('/diary');
    }
  }, [location, navigate]);

  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <div style={styles.app}>
      {isAuthenticated && <NavBar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/diary"
          element={isAuthenticated ? <Diary /> : <Navigate to="/login" />}
        />
        <Route
          path="/my-diary"
          element={isAuthenticated ? <MyDiary /> : <Navigate to="/login" />}
        />
        <Route
          path="/songs"
          element={isAuthenticated ? <Songs /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/diary" : "/login"} />}
        />
      </Routes>
    </div>
  );
}

export default App;
