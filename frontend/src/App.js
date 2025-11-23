import React, { useState } from 'react';
import Login from './components/Login';
import ItemsList from './components/ItemsList';
import './App.css';

function App() {
  const [token, setToken] = useState(null);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div className="App">
      {!token ? (
        <Login onLogin={setToken} />
      ) : (
        <ItemsList token={token} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
