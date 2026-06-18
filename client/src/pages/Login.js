import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password) {
      login(password);
      navigate('/admin');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Studio Login</h1>
        <p>Enter the master password to access the admin portal.</p>
        <form onSubmit={handleLogin} className="login-form">
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
