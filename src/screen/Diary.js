import React, { useState, useEffect } from 'react';

const Diary = () => {
  const [text, setText] = useState('');
  const [mood, setMood] = useState('');
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  useEffect(() => {
    fetchRandomPlaylist();
  }, []);

  const fetchRandomPlaylist = async () => {
    const user_id = localStorage.getItem('user_id');
    if (!user_id) {
      console.error('User ID not found');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/mood-playlists/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mood }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const playlists = data.items;
      if (playlists && playlists.length > 0) {
        const randomIndex = Math.floor(Math.random() * playlists.length);
        const randomPlaylist = playlists[randomIndex];
        setPlaylistUrl(randomPlaylist.external_urls.spotify);
        fetchPlaylistTracks(randomPlaylist.id);
      } else {
        console.error('No playlists found or items is undefined');
        setPlaylistUrl('');
        setPlaylistTracks([]);
      }
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  const fetchPlaylistTracks = async (playlistId) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const tracks = data.items;
      if (tracks && tracks.length > 0) {
        setPlaylistTracks(tracks);
      } else {
        console.error('No tracks found in the playlist');
        setPlaylistTracks([]);
      }
    } catch (error) {
      console.error('Error fetching playlist tracks:', error);
    }
  };

  const handleSubmit = async () => {
    const user_id = localStorage.getItem('user_id');
    if (!user_id) {
      console.error('User ID not found');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/diary/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, user_id }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMood(data.result);
      fetchRandomPlaylist();
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const styles = {
    app: {
      display: 'flex',
      height: '100vh',
      backgroundColor: '#F8F8F0'
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
    moodInput: {
      width: '730px', 
      height: '100px', 
      backgroundColor: 'rgba(255, 255, 255, 0.7)', 
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      position: 'absolute',
      right: '2%',
      top: '20px', 
      color: '#87CEEB',
      fontSize: '1.5em',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    musicRecommendation: {
      width: '730px', 
      height: '480px', 
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
    },
    iframe: {
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      width: '100%',
      height: '80%'
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
      <div style={styles.moodInput}>
        <h3>지금 당신의 기분은?</h3>
        {mood && <h4>{mood}</h4>}
      </div>
      <div style={styles.musicRecommendation}>
        <h3>Music</h3>
        {playlistUrl && (
          <iframe
            src={`https://open.spotify.com/embed/playlist/${playlistUrl.split('/').pop()}`}
            style={styles.iframe}
            width="300"
            height="380"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
          ></iframe>
        )}
      </div>
    </div>
  );
}

export default Diary;
