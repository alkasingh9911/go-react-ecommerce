import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import ItemsList from './components/ItemsList';
import './App.css';

function App() {
  const [token, setToken] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  const handleLogout = () => {
    setToken(null);
    setShowSignup(false);
  };

  const handleSignupSuccess = () => {
    setShowSignup(false);
  };

  return (
    <div className="App">
      {!token ? (
        showSignup ? (
          <Signup 
            onSignupSuccess={handleSignupSuccess}
            onBackToLogin={() => setShowSignup(false)}
          />
        ) : (
          <Login 
            onLogin={setToken}
            onShowSignup={() => setShowSignup(true)}
          />
        )
      ) : (
        <ItemsList token={token} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
