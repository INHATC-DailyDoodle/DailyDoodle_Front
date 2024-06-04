import React from 'react';

function Login() {
    const handleSpotifyLogin = () => {
        window.location.href = 'http://localhost:8000/api/spotify-login/';
    };

    return (
        <div>
            <button onClick={handleSpotifyLogin}>Login with Spotify</button>
        </div>
    );
}

export default Login;