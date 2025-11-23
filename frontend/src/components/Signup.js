import React, { useState } from 'react';
import './Login.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

function Signup({ onSignupSuccess, onBackToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      window.alert('Passwords do not match!');
      return;
    }

    if (password.length < 6) {
      window.alert('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        window.alert('Account created successfully! Please login.');
        onSignupSuccess();
      } else {
        window.alert(data.error || 'Username already exists');
      }
    } catch (error) {
      window.alert('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>E-Commerce Store</h1>
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Choose a username"
              minLength="3"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Choose a password"
              minLength="6"
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
              minLength="6"
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
          <button 
            type="button" 
            onClick={onBackToLogin}
            style={{ marginTop: '10px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
