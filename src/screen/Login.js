import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSpotifyLogin = () => {
    window.location.href = 'http://localhost:8000/api/spotify-login/';
  };

  const styles = {
    app: {
      display: 'flex',
      height: '100vh',
      backgroundColor: '#F8F8F0', // Ivory color
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw', // Full width
      padding: '0 20px' // Padding to avoid touching the edges
    },
    loginBox: {
      backgroundColor: 'rgba(230, 230, 250, 0.9)', 
      padding: '60px',  // Increase padding
      borderRadius: '15px',  // Increase border-radius
      boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)',  // Increase box-shadow
      textAlign: 'center',
      width: '100%', // Use full width available
      maxWidth: '450px' // Limit the max width
    },
    input: {
      width: '80%',
      padding: '15px',  // Increase padding
      margin: '15px 0',  // Increase margin
      border: 'none',
      borderRadius: '10px',  // Increase border-radius
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    button: {
      padding: '15px 30px',  // Increase padding
      border: 'none',
      borderRadius: '10px',  // Increase border-radius
      backgroundColor: 'rgba(255, 182, 193, 0.8)', 
      color: '#FFF',
      cursor: 'pointer',
      fontSize: '18px',  // Increase font-size
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Increase box-shadow
      transition: 'background-color 0.3s ease',
      marginTop: '30px'  // Increase margin
    },
    buttonHover: {
      backgroundColor: 'rgba(255, 182, 193, 1)'
    },
    spotifyButton: {
      marginTop: '20px',  // Add some margin to separate from other buttons
      backgroundColor: '#1DB954',  // Spotify green
      color: '#FFF',
      padding: '15px 30px',  // Increase padding
      border: 'none',
      borderRadius: '10px',  // Increase border-radius
      cursor: 'pointer',
      fontSize: '18px',  // Increase font-size
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Increase box-shadow
      transition: 'background-color 0.3s ease'
    },
    spotifyButtonHover: {
      backgroundColor: '#1ED760'  // Slightly lighter green for hover effect
    }
  };

  return (
    <div style={styles.app}>
      <div style={styles.loginBox}>
        <h2>Login</h2>
        <input 
          style={styles.input}
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          style={styles.input}
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
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
  );
}

export default Login;
