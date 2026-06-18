import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (password) {
      try {
        const response = await fetch('/api/admin/verify-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password })
        });
        
        if (response.ok) {
          login(password);
          navigate('/admin');
        } else {
          const data = await response.json();
          setErrorMsg(data.error || 'Invalid password');
        }
      } catch (error) {
        setErrorMsg('Failed to connect to the server');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Studio Login</h1>
        <p>Enter the master password to access the admin portal.</p>
        <form onSubmit={handleLogin} className="login-form">
          {errorMsg && <div className="status-message error" style={{marginBottom: '1rem', color: '#c62828'}}>{errorMsg}</div>}
          <input 
            type="password" 
            placeholder="Admin Password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            autoFocus
          />
          <button type="submit" className="login-btn">Log In</button>
        </form>
      </div>
    </div>
  );
}
