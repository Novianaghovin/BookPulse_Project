// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement login logic here (API call, authentication, etc.)
    console.log('Login attempted:', { email, password });
    // After successful login, navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="auth-container">
      <h2>Login to BookPulse</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account?{' '}
        <span onClick={() => navigate('/signup')} className="auth-link">
          Sign up here
        </span>
      </p>
    </div>
  );
}

export default Login;
