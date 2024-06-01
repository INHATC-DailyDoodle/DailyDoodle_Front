import React, { useState } from 'react';
import Diary from './screen/Diary';

function App() {
  const styles = {
    app: {
      display: 'flex',
      height: '100vh',
      backgroundColor: '#F8F8F0' // Ivory color
    }
  };

  const [entries, setEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const addEntry = (entry) => {
    setEntries([...entries, entry]);
    setCurrentPage(entries.length);
  };

  const nextPage = () => {
    if (currentPage < entries.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div style={styles.app}>
      <Diary
        entries={entries}
        addEntry={addEntry}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  );
}

export default App;
