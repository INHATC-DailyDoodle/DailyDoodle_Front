import React from 'react';
import Diary from './screen/Diary';

function App() {
  const styles = {
    app: {
      display: 'flex',
      height: '100vh',
      backgroundColor: '#F8F8F0' // Ivory color
    }
  };


  return (
    <div style={styles.app}>
      <Diary
      />
    </div>
  );
}

export default App;
